/**
 * Content validation.
 *
 * Nothing is written to storage, and nothing loaded from storage is trusted,
 * until it passes through here. This is what stops a bad edit — or a corrupted
 * blob — from breaking a public page at render time.
 *
 * Hand-rolled rather than pulling in a schema library: the shapes are small,
 * fixed, and this keeps the dependency surface at zero.
 */

import { APP_TAGS, type AppTag, type GalleryItem, type Product, type SiteInfo } from "./types";

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: string[] };

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(str).filter(Boolean) : [];

/** Slugs become URLs (`/fabrics/<slug>`), so they must be URL-safe. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Slugs the admin panel uses for its own routes. A product called "new" would
 * sit at /admin/products/new and be permanently unreachable for editing.
 */
export const RESERVED_SLUGS = ["new"];

export function slugify(input: string): string {
  return str(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * An image reference is valid if it is a root-relative path (an existing file
 * in /public) or an absolute http(s) URL (a link pasted into the admin).
 */
export function isValidImageRef(value: unknown): boolean {
  const s = str(value);
  if (!s) return false;
  if (s.startsWith("/")) return !s.startsWith("//");
  try {
    const url = new URL(s);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/* ─── products ─────────────────────────────────────────────── */

function validateProduct(raw: unknown, index: number, errors: string[]): Product | null {
  const where = `Product #${index + 1}`;
  if (!isObject(raw)) {
    errors.push(`${where}: not an object.`);
    return null;
  }

  const slug = str(raw.slug);
  const name = str(raw.name);

  if (!slug) errors.push(`${where}: slug is required.`);
  else if (!SLUG_PATTERN.test(slug))
    errors.push(`${where} ("${slug}"): slug may only contain lowercase letters, numbers and hyphens.`);
  else if (RESERVED_SLUGS.includes(slug))
    errors.push(`${where}: "${slug}" is a reserved word — please choose a different slug.`);
  if (!name) errors.push(`${where}: name is required.`);

  const images = strArray(raw.images).filter(isValidImageRef);
  const heroCandidate = str(raw.heroImage);
  const heroImage = isValidImageRef(heroCandidate) ? heroCandidate : images[0] ?? "";

  if (!heroImage)
    errors.push(`${where} ("${name || slug}"): at least one valid image link is required.`);

  const tags = (Array.isArray(raw.tags) ? raw.tags : [])
    .map(str)
    .filter((t): t is AppTag => (APP_TAGS as string[]).includes(t));

  if (!slug || !name || !heroImage) return null;

  return {
    slug,
    name,
    cardDesc: str(raw.cardDesc),
    shortDesc: str(raw.shortDesc),
    composition: str(raw.composition),
    width: str(raw.width),
    gsm: str(raw.gsm),
    category: str(raw.category),
    finish: str(raw.finish),
    dyeable: raw.dyeable !== false,
    uses: strArray(raw.uses),
    features: strArray(raw.features),
    tags,
    heroImage,
    // Guarantee the hero is always present in the gallery strip.
    images: images.length ? images : [heroImage],
  };
}

export function validateProducts(raw: unknown): ValidationResult<Product[]> {
  const errors: string[] = [];

  if (!Array.isArray(raw)) return { ok: false, errors: ["Products must be a list."] };
  if (raw.length === 0) return { ok: false, errors: ["At least one product is required."] };

  const products: Product[] = [];
  const seen = new Set<string>();

  raw.forEach((item, i) => {
    const product = validateProduct(item, i, errors);
    if (!product) return;
    if (seen.has(product.slug)) {
      errors.push(`Duplicate slug "${product.slug}" — each product needs a unique slug.`);
      return;
    }
    seen.add(product.slug);
    products.push(product);
  });

  if (errors.length) return { ok: false, errors };
  return { ok: true, data: products };
}

/* ─── gallery ──────────────────────────────────────────────── */

export function validateGallery(raw: unknown): ValidationResult<GalleryItem[]> {
  const errors: string[] = [];

  if (!Array.isArray(raw)) return { ok: false, errors: ["Gallery must be a list."] };

  const items: GalleryItem[] = raw.reduce<GalleryItem[]>((acc, item, i) => {
    if (!isObject(item)) {
      errors.push(`Gallery image #${i + 1}: not an object.`);
      return acc;
    }
    const src = str(item.src);
    if (!isValidImageRef(src)) {
      errors.push(`Gallery image #${i + 1}: "${src || "(empty)"}" is not a valid image link.`);
      return acc;
    }
    const cat = strArray(item.cat);
    acc.push({
      src,
      label: str(item.label) || "Kiswa Silk Factory",
      // "all" drives the default filter tab, so it must always be present.
      cat: cat.includes("all") ? cat : ["all", ...cat],
      ask: item.ask === true,
      slug: str(item.slug),
    });
    return acc;
  }, []);

  if (errors.length) return { ok: false, errors };
  return { ok: true, data: items };
}

/* ─── site ─────────────────────────────────────────────────── */

export function validateSite(raw: unknown): ValidationResult<SiteInfo> {
  const errors: string[] = [];

  if (!isObject(raw)) return { ok: false, errors: ["Site info must be an object."] };

  const brand = str(raw.brand);
  const phoneIntl = str(raw.phoneIntl).replace(/[^0-9]/g, "");
  const email = str(raw.email);

  if (!brand) errors.push("Brand name is required.");
  if (!phoneIntl) errors.push("WhatsApp number is required (digits only, including country code).");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push(`"${email}" is not a valid email address.`);

  if (errors.length) return { ok: false, errors };

  const address = isObject(raw.address) ? raw.address : {};
  const line1 = str(address.line1);
  const line2 = str(address.line2);
  const year = Number(raw.year);

  return {
    ok: true,
    data: {
      brand,
      brandShort: str(raw.brandShort) || brand,
      brandSubtitle: str(raw.brandSubtitle),
      tagline: str(raw.tagline),
      phone: str(raw.phone),
      phoneIntl,
      email,
      instagram: str(raw.instagram),
      location: str(raw.location),
      address: {
        line1,
        line2,
        full: str(address.full) || [line1, line2].filter(Boolean).join(", "),
      },
      year: Number.isFinite(year) && year > 2000 ? Math.trunc(year) : new Date().getFullYear(),
    },
  };
}
