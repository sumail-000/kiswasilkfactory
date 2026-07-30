import { notFound } from "next/navigation";
import { getProduct } from "@/lib/content";
import ProductEditor from "./ProductEditor";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // "new" is a reserved slug for the create form; a real fabric cannot use it
  // because that would make its edit URL unreachable.
  if (slug === "new") return <ProductEditor product={null} isNew />;

  const product = await getProduct(slug);
  if (!product) notFound();

  return <ProductEditor product={product} isNew={false} />;
}
