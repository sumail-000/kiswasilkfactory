import type { Metadata } from "next";
import { Suspense } from "react";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import TrustBand from "@/components/TrustBand";
import BulkForm from "./BulkForm";

export const metadata: Metadata = {
  title: "Bulk Inquiry / RFQ",
  description:
    "Open a Request for Quotation with Kiswa Silk. Wholesale silk fabric for fashion brands, manufacturers and distributors worldwide.",
};

const PROMISES = [
  {
    title: "Itemised pricing",
    body: "Per-metre pricing in USD or your local currency, broken out by fabric, weight and shade.",
  },
  {
    title: "Production lead time",
    body: "Stock vs custom-dye vs custom-weave — clear dates from order confirmation to ex-mill.",
  },
  {
    title: "Freight options",
    body: "FOB Karachi or CIF to your port. Air freight for urgent lots.",
  },
  {
    title: "Payment terms",
    body: "L/C, T/T or net-30 against verified trade history.",
  },
];

export default function BulkInquiryPage() {
  return (
    <>
      <PageHead
        eyebrow="Wholesale & Bulk"
        title={
          <>
            Open a <em className="italic-accent text-gold-soft font-light">Request for Quotation.</em>
          </>
        }
        lede="For orders over 200 m, we open a dedicated RFQ file: shade matching, custom widths, finishing options, lead times and freight to your nearest port — all in one document."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Bulk Inquiry" }]}
      />

      <section className="section-y">
        <div className="container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <Reveal as="aside">
            <p className="eyebrow mb-5">What You Receive</p>
            <h3 className="mb-2">A complete proposal.</h3>

            <ul className="mt-8 space-y-5">
              {PROMISES.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <span className="font-display text-gold-deep mt-1 text-[1.1rem] italic">
                    →
                  </span>
                  <div>
                    <strong>{p.title}</strong>
                    <p className="text-muted m-0 mt-1 text-[0.92rem]">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-cream border-l-gold mt-10 border-l-[3px] p-5">
              <p className="text-charcoal-soft m-0 text-[0.9rem]">
                <strong>Response time:</strong> Our trade desk replies to every
                RFQ within one working day. Most full proposals are returned in
                2–4 working days.
              </p>
            </div>
          </Reveal>

          <Suspense fallback={<div className="bg-charcoal text-ivory p-12">Loading form…</div>}>
            <BulkForm />
          </Suspense>
        </div>
      </section>

      <TrustBand
        label="Active Buyer Relationships"
        marks={[
          { name: "Maison Levant", note: "Dubai" },
          { name: "Atelier Veris", note: "Paris" },
          { name: "House of Adira", note: "London" },
          { name: "Soraya Couture", note: "Riyadh" },
          { name: "Lila Studio", note: "Karachi" },
        ]}
      />
    </>
  );
}
