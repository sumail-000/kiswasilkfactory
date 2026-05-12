"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { FABRICS } from "@/lib/fabrics";

const FILTERS = [
  { id: "all", label: "All Silks" },
  { id: "formalwear", label: "Formalwear" },
  { id: "bridal", label: "Bridal" },
  { id: "lining", label: "Lining" },
  { id: "scarves", label: "Scarves & Dupatta" },
  { id: "upholstery", label: "Upholstery" },
];

export default function FabricsIndex() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all"
      ? FABRICS
      : FABRICS.filter((f) => f.tags.includes(filter));

  return (
    <>
      <PageHead
        eyebrow="Catalogue"
        title={
          <>
            Eight signature silks, <em className="italic-accent text-gold-soft font-light">woven in-house.</em>
          </>
        }
        lede="Each fabric is produced on our own looms and dyed in our own dye-house. Stock colours ship in two weeks; custom shade-matched orders begin at 200 metres."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Fabrics" }]}
      />

      <section className="section-y">
        <div className="container-x">
          {/* Filters */}
          <div className="border-line mb-12 flex flex-wrap gap-2 border-b pb-10">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-5 py-2 text-[0.78rem] font-medium tracking-[0.06em] transition ${
                  filter === f.id
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-line bg-ivory hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          <div>
            {visible.map((f) => (
              <Reveal
                key={f.slug}
                className="border-line mb-12 grid grid-cols-1 gap-8 border-b pb-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-12"
              >
                <Link
                  href={`/fabrics/${f.slug}`}
                  className="group bg-cream relative block aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src={f.heroImg.replace("w=1600", "w=900")}
                    alt={f.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="ease-silk object-cover transition-transform duration-1000 group-hover:scale-104"
                  />
                </Link>
                <div>
                  <p className="font-display text-gold-deep mb-2 text-[0.9rem] tracking-[0.15em] italic">
                    {f.number} / {f.shortName}
                  </p>
                  <h3 className="mb-4 text-[clamp(1.8rem,3vw,2.6rem)]">
                    {f.name}
                  </h3>
                  <p className="lede mb-6">{f.blurb}</p>
                  <dl className="border-line grid grid-cols-2 gap-x-8 gap-y-4 border-y py-6 sm:grid-cols-4">
                    <SpecItem dt="Weight" dd={f.weight.split("(")[0].trim()} />
                    <SpecItem dt="Width" dd={f.width.split("(")[0].trim()} />
                    <SpecItem dt="Weaves" dd={f.weaves.split("·")[0].trim()} />
                    <SpecItem dt="MOQ" dd={f.moq.split("per")[0].trim()} />
                  </dl>
                  <Link
                    href={`/fabrics/${f.slug}`}
                    className="btn-text mt-6 inline-flex"
                  >
                    View Specifications <span>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream section-y">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">Cannot Find What You Need?</p>
            <h2>
              Bespoke weaves &amp;{" "}
              <span className="italic-accent">custom blends</span>.
            </h2>
          </Reveal>
          <Reveal>
            <p className="lede mb-6">
              We weave to spec — different weights, widths, dye-recipes, blends
              with viscose or cotton, custom jacquard motifs from your artwork.
              Tell us what you need and we will return a sample plan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/bulk-inquiry" className="btn">
                Open RFQ <span className="arrow">→</span>
              </Link>
              <Link href="/sample-request" className="btn btn-outline">
                Order Swatches
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SpecItem({ dt, dd }: { dt: string; dd: string }) {
  return (
    <div>
      <dt className="text-muted mb-1 text-[0.68rem] tracking-[0.18em] uppercase">
        {dt}
      </dt>
      <dd className="font-display text-charcoal text-[1.15rem]">{dd}</dd>
    </div>
  );
}
