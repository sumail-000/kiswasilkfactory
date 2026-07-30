/**
 * Content loaders and mutations.
 *
 * Every public page reads through these functions. They are the only place that
 * knows content might come from storage rather than from the bundle.
 *
 * Guarantee: a loader never throws and never returns empty. If storage is
 * missing, unreachable or corrupt, it returns the committed seed content, so a
 * storage problem can never take the public site down.
 *
 * Server-only. This module reaches `node:fs` through `./storage`, so importing
 * any *value* from it in a client component breaks the browser bundle. Client
 * components should import from `./types` (types and `APP_TAGS`) instead.
 */

import { revalidatePath, updateTag } from "next/cache";
import { SEED_GALLERY, SEED_PRODUCTS, SEED_SITE } from "./seed";
import { CONTENT_TAG, readDocument, writeDocument } from "./storage";
import type { GalleryItem, Product, SiteInfo } from "./types";
import { validateGallery, validateProducts, validateSite } from "./validate";

export type { AppTag, GalleryItem, Product, SiteInfo } from "./types";
export { APP_TAGS } from "./types";

/* ─── read ─────────────────────────────────────────────────── */

export async function getProducts(): Promise<Product[]> {
  const stored = await readDocument("products");
  if (stored === null) return SEED_PRODUCTS;
  const result = validateProducts(stored);
  return result.ok ? result.data : SEED_PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

/** The eight fabrics shown on the home page. */
export async function getFeaturedProducts(): Promise<Product[]> {
  return (await getProducts()).slice(0, 8);
}

export async function getGallery(): Promise<GalleryItem[]> {
  const stored = await readDocument("gallery");
  if (stored === null) return SEED_GALLERY;
  const result = validateGallery(stored);
  return result.ok && result.data.length ? result.data : SEED_GALLERY;
}

export async function getSite(): Promise<SiteInfo> {
  const stored = await readDocument("site");
  if (stored === null) return SEED_SITE;
  const result = validateSite(stored);
  return result.ok ? result.data : SEED_SITE;
}

/* ─── write ────────────────────────────────────────────────── */

export type SaveResult = { ok: true } | { ok: false; errors: string[] };

/**
 * Refresh every cached read so the operator immediately sees what they saved.
 *
 * `updateTag` (not `revalidateTag`) is deliberate: it expires the tag straight
 * away, whereas `revalidateTag` serves stale content while refreshing in the
 * background — which would mean saving a change and still seeing the old one.
 * It is only callable from a Server Action, which is the only way saves happen.
 *
 * `revalidatePath` additionally covers the local-file backend, whose reads are
 * filesystem calls and therefore carry no fetch tag.
 */
function refreshContentCaches(): void {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

export async function saveProducts(input: unknown): Promise<SaveResult> {
  const result = validateProducts(input);
  if (!result.ok) return result;
  await writeDocument("products", result.data);
  refreshContentCaches();
  return { ok: true };
}

export async function saveGallery(input: unknown): Promise<SaveResult> {
  const result = validateGallery(input);
  if (!result.ok) return result;
  await writeDocument("gallery", result.data);
  refreshContentCaches();
  return { ok: true };
}

export async function saveSite(input: unknown): Promise<SaveResult> {
  const result = validateSite(input);
  if (!result.ok) return result;
  await writeDocument("site", result.data);
  refreshContentCaches();
  return { ok: true };
}
