"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FileText, MessageCircle, Headphones, Check, ZoomIn } from "lucide-react";
import type { AppTag, Product, SiteInfo } from "@/lib/content";
import SmartImage from "@/components/SmartImage";
import ZoomableLightbox from "@/components/ZoomableLightbox";

/* ─── filter tabs ────────────────────────────────── */
const FILTERS: { id: AppTag | "all"; label: string }[] = [
  { id: "all",        label: "All Fabrics" },
  { id: "Dyeing",     label: "Ready to Dye" },
  { id: "Printing",   label: "Ready to Print" },
  { id: "Embroidery", label: "Embroidery" },
  { id: "Heavy Work", label: "Heavy Work" },
  { id: "Sublimation",label: "Sublimation" },
  { id: "Lining",     label: "Lining" },
];

/* tag colour map */
const TAG_STYLES: Record<string, string> = {
  Dyeing:      "border-navy/30 text-navy",
  Printing:    "border-navy/30 text-navy",
  Embroidery:  "border-navy/30 text-navy",
  "Heavy Work":"border-navy/30 text-navy",
  Sublimation: "border-navy/30 text-navy",
  Lining:      "border-navy/30 text-navy",
};

export default function FabricsClient({
  products,
  site,
}: {
  products: Product[];
  site: SiteInfo;
}) {
  const [active, setActive] = useState<AppTag | "all">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const triggerLightbox = (images: string[], index: number, title: string) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const visible = active === "all"
    ? products
    : products.filter((p) => p.tags.includes(active as AppTag));

  return (
    <div className="min-h-screen bg-background">

      {/* ══════════ HERO BANNER ══════════ */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

          {/* Left */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14">
            <h1 className="font-display font-bold text-navy text-[clamp(2.2rem,4vw,52px)] leading-[1.1] mb-5">
              Our White-Base<br />Fabric Collection
            </h1>
            {/* Gold ornament */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold text-sm">❖</span>
              <span className="w-10 h-px bg-gold" />
            </div>
            <p className="text-navy/80 text-base font-semibold mb-3">
              Premium fabrics prepared for dyeing, printing,<br className="hidden sm:block" /> embroidery and heavy work.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed mb-8 max-w-lg">
              At Kiswa Silk Factory, we manufacture and supply high-quality white-base silk fabrics in bulk for brands, boutiques, designers, printing units, embroidery houses and textile businesses across the globe.
            </p>

            {/* Feature tags strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10 text-sm font-medium text-navy">
              {["Ready to Dye", "Ready to Print", "Ready to Embroider", "Bulk Supply"].map((t, i) => (
                <span key={t} className="flex items-center gap-1.5">
                  {i > 0 && <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />}
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/bulk-supply"
                className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold"
              >
                <FileText className="w-4 h-4" />
                Request Bulk Quote
              </Link>
              <a
                href={`https://wa.me/${site.phoneIntl}?text=${encodeURIComponent("Hi, I need help choosing the right fabric.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-navy/40 text-navy px-6 py-3 rounded-md hover:bg-navy/5 transition-colors text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                View Fabric Guide
              </a>
            </div>
          </div>

          {/* Right — fabric rolls hero image with left-edge cream blend overlay */}
          <div className="relative hidden lg:block min-h-[420px]">
            <Image
              src="/assets/silk-rolls.jpg"
              alt="White base silk fabric rolls"
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            {/* Gradient overlay: cream → transparent, creates seamless blend with left panel */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, oklch(0.97 0.015 85 / 0.7) 15%, oklch(0.97 0.015 85 / 0.2) 35%, transparent 55%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ══════════ COLLECTION HEADER ══════════ */}
      <section className="bg-background pt-16 pb-4">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-display font-bold text-navy text-[clamp(1.8rem,3vw,40px)] mb-3">
            Our Fabric Collection
          </h2>
          <p className="text-foreground/65 text-sm max-w-xl mx-auto mb-8">
            Explore our wide range of premium white-base silk fabrics, manufactured for superior performance
            in dyeing, printing, embroidery and heavy work.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`px-4 py-2 rounded-full border text-xs font-semibold transition-colors ${
                  active === f.id
                    ? "bg-navy text-primary-foreground border-navy"
                    : "border-navy/30 text-navy hover:bg-navy/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRODUCT GRID ══════════ */}
      <section className="bg-background py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map((p) => (
              <div
                key={p.slug}
                className="bg-white rounded-sm border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product image */}
                <div 
                  className="relative aspect-[4/3] w-full overflow-hidden bg-cream cursor-pointer group/img"
                  onClick={() => triggerLightbox(p.images, 0, p.name)}
                >
                  <SmartImage
                    src={p.heroImage}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-navy p-2.5 rounded-full shadow-md scale-90 group-hover/img:scale-100 transition-all duration-300">
                      <ZoomIn className="w-4 h-4 text-navy" />
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-navy text-lg mb-1.5">{p.name}</h3>
                  <p className="text-foreground/65 text-xs leading-relaxed mb-4">{p.cardDesc}</p>

                  {/* Specs row */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-foreground/60 mb-4">
                    <span>Width: <strong className="text-navy">{p.width}</strong></span>
                    {p.gsm !== "Lightweight" && (
                      <span>GSM: <strong className="text-navy">{p.gsm}</strong></span>
                    )}
                  </div>

                  {/* Application tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-0.5 rounded-sm border text-[11px] font-medium ${TAG_STYLES[tag] || "border-navy/30 text-navy"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Spacer */}
                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`/fabrics/${p.slug}`}
                      className="flex-1 border border-navy text-navy text-xs font-semibold py-2.5 rounded-sm hover:bg-navy/5 transition-colors text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(`Hi, I want to ask about the price and availability of ${p.name}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-primary-foreground text-xs font-semibold py-2.5 rounded-sm hover:bg-navy/90 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Ask Price
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="text-center py-20 text-foreground/50">
              No fabrics match this filter.
            </div>
          )}
        </div>
      </section>

      {/* ══════════ NEED HELP CTA STRIP ══════════ */}
      <section className="bg-background py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Card — grid forces icon+text left, buttons right — no wrap breakage */}
          <div className="border border-gold/25 rounded-md bg-[oklch(0.985_0.008_85)] px-8 py-7 shadow-sm grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6">

            {/* Left: icon + text */}
            <div className="flex items-center gap-5">
              <span className="w-14 h-14 rounded-full border-2 border-gold/60 flex items-center justify-center shrink-0 bg-white">
                <Headphones className="w-6 h-6 text-gold" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display font-bold text-navy text-[1.3rem] mb-1">
                  Need Help Choosing Fabric?
                </h3>
                <p className="text-foreground/65 text-sm leading-snug">
                  Share your purpose and quantity. Our team will guide you to the
                  right fabric for dyeing, printing, embroidery or heavy work.
                </p>
              </div>
            </div>

            {/* Right: buttons — always on right, side by side */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/bulk-supply"
                className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                Request Bulk Quote
              </Link>
              <a
                href={`https://wa.me/${site.phoneIntl}?text=${encodeURIComponent("Hi, I need help choosing the right fabric.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-navy/25 text-navy bg-white px-6 py-3 rounded-md hover:bg-navy/5 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Inquiry
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ WHY OUR FABRICS ══════════ */}
      <section className="bg-background py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-widest">WHY OUR FABRICS</span>
              <span className="w-10 h-px bg-gold" />
            </div>
            <h2 className="font-display font-bold text-navy text-[clamp(1.6rem,2.5vw,32px)]">
              What Makes Kiswa Silk Fabrics Different
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "High Whiteness Base", body: "Our white-base fabrics have superior whiteness and uniform surface — ideal for bright, even dyeing results." },
              { title: "Bulk Manufacturing", body: "In-house production capacity handles large orders with consistent quality across every batch and roll." },
              { title: "Custom Specifications", body: "Width, GSM, finish or weave — we adjust production to match your exact application requirements." },
              { title: "Ready to Process", body: "All fabrics are RFD (Ready for Dyeing), RFP (Ready for Printing) and embroidery-ready straight from the mill." },
            ].map((w) => (
              <div key={w.title} className="border border-gold/25 rounded-sm p-6">
                <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center mb-4">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </span>
                <h4 className="font-display font-bold text-navy text-base mb-2">{w.title}</h4>
                <p className="text-foreground/65 text-xs leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ZoomableLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxIndex}
        title={lightboxTitle}
      />
    </div>
  );
}
