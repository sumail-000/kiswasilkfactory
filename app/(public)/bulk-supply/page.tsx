import type { Metadata } from "next";
import { getProducts, getSite } from "@/lib/content";
import BulkSupplyClient from "./BulkSupplyClient";

export const metadata: Metadata = {
  title: "Bulk Supply & Wholesale Inquiry",
  description:
    "Partner with Kiswa Silk Factory for premium white-base silk fabrics in bulk. Competitive pricing, sample support and reliable delivery.",
};

export default async function BulkSupplyPage() {
  const [products, site] = await Promise.all([getProducts(), getSite()]);

  return (
    <BulkSupplyClient
      fabricNames={products.map((p) => p.name)}
      // Falls back to a bundled asset so the showcase panel is never empty,
      // even if every product were removed.
      showcaseImage={products[0]?.heroImage ?? "/assets/silk-rolls.jpg"}
      site={site}
    />
  );
}
