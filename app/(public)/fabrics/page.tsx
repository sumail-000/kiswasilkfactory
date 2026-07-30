import type { Metadata } from "next";
import { getProducts, getSite } from "@/lib/content";
import FabricsClient from "./FabricsClient";

export const metadata: Metadata = {
  title: "Our White-Base Fabric Collection",
  description:
    "Premium white-base silk fabrics manufactured in bulk for dyeing, printing, embroidery and heavy work.",
};

export default async function FabricsPage() {
  const [products, site] = await Promise.all([getProducts(), getSite()]);
  return <FabricsClient products={products} site={site} />;
}
