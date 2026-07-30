import type { Metadata } from "next";
import { getGallery, getProducts, getSite } from "@/lib/content";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inspect the texture, drape and finish of our white-base silk fabrics — raw silks, chiffons, crinkles, organzas and linings.",
};

export default async function GalleryPage() {
  const [items, products, site] = await Promise.all([getGallery(), getProducts(), getSite()]);
  return <GalleryClient items={items} products={products} site={site} />;
}
