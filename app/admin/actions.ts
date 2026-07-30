"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  checkCredentials,
  createSessionToken,
  getSession,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth";
import {
  getGallery,
  getProducts,
  getSite,
  saveGallery,
  saveProducts,
  saveSite,
  type GalleryItem,
  type Product,
  type SiteInfo,
} from "@/lib/content";
import { listBackups, readBackup, storageBackend } from "@/lib/content/storage";
import {
  validateGallery,
  validateProducts,
  validateSite,
} from "@/lib/content/validate";
import type { ContentKind } from "@/lib/content/types";

export type ActionResult = { ok: true; message?: string } | { ok: false; errors: string[] };

/**
 * Every mutation re-checks the session itself.
 *
 * `proxy.ts` already redirects signed-out visitors, but the Next.js docs are
 * explicit that Proxy is not an authorisation boundary — a server action is
 * reachable by direct POST regardless of what Proxy did.
 */
async function requireSession(): Promise<ActionResult | null> {
  const session = await getSession();
  if (!session) return { ok: false, errors: ["Your session has expired. Please sign in again."] };
  if (!storageBackend().writable) {
    return {
      ok: false,
      errors: [
        "Saving is disabled: BLOB_READ_WRITE_TOKEN is not configured on this deployment.",
      ],
    };
  }
  return null;
}

/* ─── authentication ───────────────────────────────────────── */

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!checkCredentials(username, password)) {
    return { ok: false, errors: ["Incorrect username or password."] };
  }

  const token = await createSessionToken(username);
  if (!token) {
    return {
      ok: false,
      errors: ["Admin credentials are not configured on this deployment."],
    };
  }

  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions);
  // Only allow same-site relative redirects, never an absolute URL from input.
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ─── products ─────────────────────────────────────────────── */

/**
 * Insert or update a single product inside the full catalogue.
 *
 * The whole array is re-validated and re-written on every save so the stored
 * document is always internally consistent (unique slugs, valid images).
 */
export async function saveProductAction(
  originalSlug: string | null,
  product: Product,
): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  const products = await getProducts();
  const index = originalSlug ? products.findIndex((p) => p.slug === originalSlug) : -1;

  const next = [...products];
  if (index >= 0) next[index] = product;
  else next.push(product);

  const result = await saveProducts(next);
  if (!result.ok) return result;

  revalidatePath("/admin/products");
  return { ok: true, message: `“${product.name}” saved.` };
}

export async function deleteProductAction(slug: string): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  const products = await getProducts();
  const next = products.filter((p) => p.slug !== slug);

  if (next.length === products.length) return { ok: false, errors: ["That fabric no longer exists."] };
  if (next.length === 0) return { ok: false, errors: ["You cannot delete the last fabric."] };

  const result = await saveProducts(next);
  if (!result.ok) return result;

  revalidatePath("/admin/products");
  return { ok: true, message: "Fabric deleted." };
}

/** Persist a new display order. Order drives the home page's featured eight. */
export async function reorderProductsAction(slugs: string[]): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  const products = await getProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const ordered = slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));

  // Anything not named in the incoming order is appended rather than dropped.
  for (const p of products) if (!slugs.includes(p.slug)) ordered.push(p);

  const result = await saveProducts(ordered);
  if (!result.ok) return result;

  revalidatePath("/admin/products");
  return { ok: true, message: "Order saved." };
}

/* ─── gallery ──────────────────────────────────────────────── */

export async function saveGalleryAction(items: GalleryItem[]): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  const result = await saveGallery(items);
  if (!result.ok) return result;

  revalidatePath("/admin/gallery");
  return { ok: true, message: `Gallery saved — ${items.length} images.` };
}

/* ─── site info ────────────────────────────────────────────── */

export async function saveSiteAction(site: SiteInfo): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  const result = await saveSite(site);
  if (!result.ok) return result;

  revalidatePath("/admin/site");
  return { ok: true, message: "Site details saved." };
}

/* ─── history ──────────────────────────────────────────────── */

export async function restoreBackupAction(pathname: string, kind: ContentKind): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  // Only restore from a backup we actually listed, so an arbitrary path can
  // never be pulled in through this action.
  const known = await listBackups(kind);
  if (!known.some((b) => b.pathname === pathname)) {
    return { ok: false, errors: ["That backup no longer exists."] };
  }

  const data = await readBackup(pathname);
  if (data === null) return { ok: false, errors: ["That backup could not be read."] };

  // Validate before restoring: an old backup could predate a schema change.
  const result =
    kind === "products"
      ? await restore(validateProducts(data), saveProducts)
      : kind === "gallery"
        ? await restore(validateGallery(data), saveGallery)
        : await restore(validateSite(data), saveSite);

  if (!result.ok) return result;

  revalidatePath("/admin", "layout");
  return { ok: true, message: "Version restored." };
}

async function restore<T>(
  validation: { ok: true; data: T } | { ok: false; errors: string[] },
  save: (input: unknown) => Promise<ActionResult>,
): Promise<ActionResult> {
  if (!validation.ok) return validation;
  return save(validation.data);
}

/* ─── export ───────────────────────────────────────────────── */

/** Everything the admin manages, as one downloadable object. */
export async function exportAllAction(): Promise<
  { ok: true; data: { products: Product[]; gallery: GalleryItem[]; site: SiteInfo } } | { ok: false; errors: string[] }
> {
  const session = await getSession();
  if (!session) return { ok: false, errors: ["Your session has expired."] };

  const [products, gallery, site] = await Promise.all([getProducts(), getGallery(), getSite()]);
  return { ok: true, data: { products, gallery, site } };
}
