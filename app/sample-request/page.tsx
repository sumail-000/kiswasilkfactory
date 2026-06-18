import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import SampleForm from "./SampleForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sample / Swatch Request",
  description:
    "Request a swatch box of Kiswa Silk's eight signature silks. Free for verified design studios; modest courier fee for individual buyers.",
};

const STEPS = [
  {
    n: "i.",
    title: "Select fabrics",
    body: "Choose the silks you would like to feel and see in real light.",
  },
  {
    n: "ii.",
    title: "Verify your business",
    body: "Tell us about your studio, brand or store. Verified studios receive their swatch box at no charge.",
  },
  {
    n: "iii.",
    title: "We ship within 3 days",
    body: "Tracked courier. International ship typically arrives in 7–10 working days.",
  },
];

export default function SampleRequestPage() {
  return (
    <>
      <PageHead
        eyebrow="Swatches & Samples"
        title={
          <>
            Order a swatch box <em className="italic-accent text-gold-soft font-light">of our silks.</em>
          </>
        }
        lede="Mill-cut swatches of the silks you select, labelled with weight, weave and dye reference. Most buyers receive their box within 7–10 working days."
        imageSrc="/assets/silk-drape.jpg"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Sample Request" }]}
      />

      <section className="section-y">
        <div className="container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <Reveal as="aside" className="space-y-6">
            <div>
              <p className="eyebrow mb-3">How It Works</p>
              <h3 className="font-display font-bold text-navy text-[1.8rem] mb-2 leading-tight">Three steps.</h3>
            </div>

            <div className="space-y-6">
              {STEPS.map((s) => (
                <div key={s.n} className="border-line border-t pt-5">
                  <div className="text-gold-deep mb-2 text-[0.82rem] font-semibold tracking-[0.18em] uppercase">
                    {s.n}
                  </div>
                  <h4 className="font-display font-semibold text-navy text-[1.1rem] mb-1.5 leading-snug">{s.title}</h4>
                  <p className="text-muted m-0 text-[0.88rem] leading-relaxed font-sans">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-cream border-l-gold border-l-[3px] p-5 flex items-start gap-3 rounded-r-sm shadow-sm mt-6">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="#8E6C3E"
                strokeWidth="1.4"
                className="mt-1 shrink-0"
              >
                <circle cx="9" cy="9" r="7" />
                <path d="M9 5v5M9 13v0.1" />
              </svg>
              <p className="text-charcoal-soft m-0 text-[0.88rem] leading-relaxed font-sans">
                Need samples for a tight deadline? Note your required-by date —
                we can priority-courier most boxes.
              </p>
            </div>
          </Reveal>

          <Suspense fallback={<div className="bg-ivory border border-gold/15 p-12 rounded-md shadow-sm">Loading form…</div>}>
            <SampleForm />
          </Suspense>
        </div>
      </section>

      <section className="bg-cream py-16 border-t border-border/40">
        <div className="container-x text-center">
          <p className="eyebrow mb-3 justify-center">Prefer to talk first?</p>
          <h3 className="font-display font-bold text-navy text-[1.8rem] mb-6 leading-tight">Reach our trade desk on WhatsApp.</h3>
          <Link
            href={`https://wa.me/${SITE.phoneIntl}`}
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
