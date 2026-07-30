/**
 * Seed content — the safety net.
 *
 * These JSON files are committed to the repository and bundled into the build.
 * If Vercel Blob is unconfigured, unreachable, empty or returns malformed data,
 * every loader falls back to these values. The public site therefore renders
 * correctly even when the admin panel's storage is completely unavailable.
 *
 * They are also used to seed Blob on the first save.
 */

import galleryJson from "@/content/gallery.json";
import productsJson from "@/content/products.json";
import siteJson from "@/content/site.json";
import type { GalleryItem, Product, SiteInfo } from "./types";

export const SEED_PRODUCTS = productsJson as Product[];
export const SEED_GALLERY = galleryJson as GalleryItem[];
export const SEED_SITE = siteJson as SiteInfo;
