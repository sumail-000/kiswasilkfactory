/**
 * Shared content types.
 *
 * These mirror the shapes that were previously hard-coded in `lib/products.ts`,
 * `lib/gallery-items.ts` and `lib/site.ts`. They are intentionally unchanged so
 * that every existing page keeps compiling against the same fields.
 */

export type AppTag =
  | "Dyeing"
  | "Printing"
  | "Embroidery"
  | "Heavy Work"
  | "Sublimation"
  | "Lining";

export const APP_TAGS: AppTag[] = [
  "Dyeing",
  "Printing",
  "Embroidery",
  "Heavy Work",
  "Sublimation",
  "Lining",
];

export type Product = {
  slug: string;
  name: string;
  cardDesc: string;
  shortDesc: string;
  composition: string;
  width: string;
  gsm: string;
  category: string;
  finish: string;
  dyeable: boolean;
  uses: string[];
  features: string[];
  tags: AppTag[];
  heroImage: string;
  images: string[];
};

export type GalleryItem = {
  src: string;
  label: string;
  cat: string[];
  ask: boolean;
  slug: string;
};

export type SiteAddress = {
  line1: string;
  line2: string;
  full: string;
};

export type SiteInfo = {
  brand: string;
  brandShort: string;
  brandSubtitle: string;
  tagline: string;
  phone: string;
  phoneIntl: string;
  email: string;
  instagram: string;
  location: string;
  address: SiteAddress;
  year: number;
};

/** The three documents the admin panel can edit. */
export type ContentKind = "products" | "gallery" | "site";

export type ContentShape = {
  products: Product[];
  gallery: GalleryItem[];
  site: SiteInfo;
};

/** Metadata about a stored backup version. */
export type BackupEntry = {
  pathname: string;
  kind: ContentKind;
  savedAt: string;
  size: number;
};
