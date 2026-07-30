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

import { revalidatePath } from "next/cache";
import { SEED_GALLERY, SEED_PRODUCTS, SEED_SITE } from "./seed";
import { readDocument, writeDocument } from "./storage";
import type { ContentKind, GalleryItem, Product, SiteInfo } from "./types";
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
 * Write a validated document and refresh every page that renders it.
 *
 * Storage failures are returned, never thrown: an uncaught error here becomes
 * an opaque 500 with a digest, leaving the operator staring at a spinner with
 * no idea what went wrong. The message is surfaced in the admin UI and logged
 * for the server-side record.
 *
 * Content reads are not `fetch` calls, so they carry no cache tag; the pages
 * that render them are refreshed with `revalidatePath` on the root layout,
 * which covers every route beneath it.
 */
async function persist(kind: ContentKind, data: unknown): Promise<SaveResult> {
  try {
    await writeDocument(kind, data);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`[content] failed to save ${kind}:`, error);
    return { ok: false, errors: [`Could not save to storage. ${detail}`] };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function saveProducts(input: unknown): Promise<SaveResult> {
  const result = validateProducts(input);
  if (!result.ok) return result;
  return persist("products", result.data);
}

export async function saveGallery(input: unknown): Promise<SaveResult> {
  const result = validateGallery(input);
  if (!result.ok) return result;
  return persist("gallery", result.data);
}

export async function saveSite(input: unknown): Promise<SaveResult> {
  const result = validateSite(input);
  if (!result.ok) return result;
  return persist("site", result.data);
}
