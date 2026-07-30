import { getGallery, getProducts } from "@/lib/content";
import GalleryManager from "./GalleryManager";

export default async function AdminGalleryPage() {
  const [items, products] = await Promise.all([getGallery(), getProducts()]);
  return <GalleryManager initial={items} products={products} />;
}
