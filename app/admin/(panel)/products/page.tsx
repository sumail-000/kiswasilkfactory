import { getProducts } from "@/lib/content";
import ProductsManager from "./ProductsManager";

export default async function AdminProductsPage() {
  const products = await getProducts();
  return <ProductsManager initial={products} />;
}
