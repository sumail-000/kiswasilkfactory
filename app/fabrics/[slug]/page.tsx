import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FileText, MessageCircle, Package, Fingerprint, Target,
  Palette, Printer, Scissors, Dumbbell, Sun,
  ClipboardList, Crown, Factory, PenTool,
} from "lucide-react";
import ClientGallery from "./ClientGallery";
import { PRODUCTS, getProduct, type Product } from "@/lib/products";
import { SITE } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: `${p.name} — White Base Silk Fabric`,
    description: p.shortDesc,
  };
}

/* ── shared ornament ── */
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-1.5">
      <span className="w-5 h-px bg-gold" />
      <svg width="14" height="8" viewBox="0 0 60 20" fill="currentColor" className="text-gold">
        <path d="M30 10C20 4 8 14 0 10c8-4 20 6 30 0 10-6 22 4 30 0-8-4-20 6-30 0z" opacity=".85" />
      </svg>
      <span className="w-5 h-px bg-gold" />
    </div>
  );
}

/* ── helpers ── */
function yes(bool: boolean) {
  return bool ? "Yes" : "On Request";
}

function buildSpecs(p: Product) {
  return [
    { label: "Fabric Name",   value: p.name },
    { label: "Fabric Type",   value: `${p.composition} (White Base)` },
    { label: "Composition",   value: p.composition },
    { label: "Weave",         value: "Plain Weave" },
    { label: "Texture",       value: p.features[0] ?? "Smooth" },
    { label: "Width",         value: p.width },
    { label: "GSM",           value: p.gsm },
    { label: "Finish",        value: p.finish },
    { label: "Shrinkage",     value: "Minimal" },
    { label: "Color",         value: "White Base" },
    { label: "Dyeing",        value: p.tags.includes("Dyeing")     ? "Excellent" : "On Request" },
    { label: "Printing",      value: p.tags.includes("Printing")   ? "Excellent" : "On Request" },
    { label: "Embroidery",    value: p.tags.includes("Embroidery") ? "Excellent" : "On Request" },
    { label: "Heavy Work",    value: p.tags.includes("Heavy Work") ? "Excellent" : "On Request" },
  ];
}

/* ── page ── */
export default async function FabricDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const specs = buildSpecs(p);

  const featureRows = [
    { icon: Fingerprint,   label: "Texture / Feel",           value: p.finish },
    { icon: Target,        label: "Best Use",                  value: p.tags.join(", ") },
    { icon: Palette,       label: "Suitable for Dyeing?",      value: yes(p.tags.includes("Dyeing")) },
    { icon: Printer,       label: "Suitable for Printing?",    value: yes(p.tags.includes("Printing")) },
    { icon: Scissors,      label: "Suitable for Embroidery?",  value: yes(p.tags.includes("Embroidery")) },
    { icon: Dumbbell,      label: "Suitable for Heavy Work?",  value: yes(p.tags.includes("Heavy Work")) },
    { icon: Sun,           label: "Available in White Base",   value: "Yes" },
    { icon: Package,       label: "Bulk Order Availability",   value: "Yes" },
    { icon: ClipboardList, label: "Sample Option",             value: "Available" },
  ];

  const appCards = [
    {
      icon: Palette,
      title: p.uses[0] ?? "Printed Suits & Sarees",
      body: "Takes dyes and prints beautifully for vibrant, long-lasting results.",
      highlight: false,
    },
    {
      icon: Crown,
      title: p.uses[1] ?? "Formal & Festive Wear",
      body: "Soft sheen and smooth fall make it perfect for elegant formal and festive outfits.",
      highlight: false,
    },
    {
      icon: PenTool,
      title: p.uses[2] ?? "Embroidery-Ready Base",
      body: "Strong yet soft fabric foundation suitable for detailed embroidery and handwork.",
      highlight: false,
    },
    {
      icon: Factory,
      title: "Bulk Orders & Customization",
      body: "We offer competitive pricing for bulk orders with flexible width, GSM & finishing options.",
      highlight: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── BREADCRUMB ─────────────────────────────── */}
      <div className="border-b border-border/40 py-3">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center gap-1.5 text-[0.82rem] text-foreground/50">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/fabrics" className="hover:text-navy transition-colors">Fabrics</Link>
          <span>/</span>
          <span className="text-navy font-medium">{p.name}</span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="py-7">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* items-stretch = both columns same height; left col is flex so ClientGallery fills it */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

            {/* LEFT — image fills the full column height */}
            <div className="flex flex-col">
              <ClientGallery images={p.images} name={p.name} />
            </div>

            {/* RIGHT — details */}
            <div>
              {/* Name */}
              <h1 className="font-display font-bold text-navy text-[clamp(2rem,4vw,46px)] leading-tight mb-3">
                {p.name}
              </h1>

              {/* Ornament */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-10 h-px bg-gold" />
                <svg width="22" height="12" viewBox="0 0 60 20" fill="currentColor" className="text-gold">
                  <path d="M30 10C20 4 8 14 0 10c8-4 20 6 30 0 10-6 22 4 30 0-8-4-20 6-30 0z" opacity=".85"/>
                </svg>
                <span className="w-10 h-px bg-gold" />
              </div>

              {/* Description */}
              <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-5">
                {p.shortDesc}
              </p>

              {/* Feature rows — full-width list with dividers */}
              <div className="border border-border rounded-sm overflow-hidden mb-5">
                {featureRows.map(({ icon: Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between gap-4 px-4 py-2.5 ${
                      i < featureRows.length - 1 ? "border-b border-border/60" : ""
                    }`}
                  >
                    {/* Icon + Label (left) */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <Icon className="w-4 h-4 text-gold shrink-0" strokeWidth={1.2} />
                      <span className="text-navy font-semibold text-[0.82rem]">{label}</span>
                    </div>
                    {/* Value (right) */}
                    <span className="text-foreground/65 text-[0.82rem] text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                <Link
                  href={`/bulk-supply?fabric=${p.slug}`}
                  className="flex flex-1 items-center justify-center gap-2 bg-navy text-primary-foreground px-5 py-3.5 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold"
                >
                  <FileText className="w-4 h-4" />
                  Get Quote for This Fabric
                </Link>
                <a
                  href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(`Hi, I want to inquire about ${p.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 border-2 border-navy/25 text-navy bg-white px-5 py-3.5 rounded-md hover:bg-navy/5 transition-colors text-sm font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECS + APPLICATIONS ────────────────────────
           Both boxes are flex-col. Grid defaults to stretch
           so they're always the same height.
           Right box cards each get flex-1 → they grow to
           fill the box height instead of leaving empty space.
      ─────────────────────────────────────────────────── */}
      <section className="py-7">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* LEFT BOX */}
            <div className="border border-border/60 rounded-sm flex flex-col">
              <div className="px-5 pt-4 pb-3 text-center border-b border-border/60 shrink-0">
                <h2 className="font-display font-bold text-navy text-[1.25rem]">Fabric Specifications</h2>
                <Ornament />
              </div>
              <div className="flex-1 divide-y divide-border/60">
                {specs.map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[160px_1fr] text-[0.84rem]">
                    <div className="px-5 py-3 text-foreground/55 font-medium">{label}</div>
                    <div className="px-5 py-3 text-navy font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT BOX — cards stretch to fill same height */}
            <div className="border border-border/60 rounded-sm flex flex-col">
              <div className="px-5 pt-4 pb-3 text-center border-b border-border/60 shrink-0">
                <h2 className="font-display font-bold text-navy text-[1.25rem]">Recommended Applications</h2>
                <Ornament />
              </div>
              {/* flex-1 flex-col = fills remaining box height; children share it */}
              <div className="flex-1 flex flex-col divide-y divide-border/60">
                {appCards.map((a) => (
                  <div
                    key={a.title}
                    className={`flex items-center gap-5 px-6 flex-1 ${
                      a.highlight ? "bg-[oklch(0.975_0.018_80)]" : ""
                    }`}
                  >
                    {/* Rounded-square icon — matches mockup */}
                    <span className="w-14 h-14 rounded-xl border border-gold/35 bg-cream flex items-center justify-center shrink-0">
                      <a.icon className="w-7 h-7 text-gold" strokeWidth={1.2} />
                    </span>
                    <div className="py-4">
                      <h4 className="font-display font-bold text-navy text-[1rem] mb-1">{a.title}</h4>
                      <p className="text-foreground/60 text-[0.8rem] leading-relaxed">{a.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SAMPLE STRIP ───────────────────────────── */}
      <section className="pb-7">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="border border-border/60 rounded-sm bg-[oklch(0.97_0.012_85)] grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 px-7 py-5">
            <div className="flex items-center gap-5">
              <span className="w-14 h-14 rounded-full border-2 border-gold/50 flex items-center justify-center shrink-0 bg-white">
                <Package className="w-6 h-6 text-gold" strokeWidth={1.2} />
              </span>
              <div>
                <h3 className="font-display font-bold text-navy text-[1.1rem] mb-1">Want to feel the quality?</h3>
                <p className="text-foreground/65 text-[0.83rem] leading-snug">
                  Request a sample swatch to check the texture, fall and finish of {p.name}.
                </p>
              </div>
            </div>
            <Link
              href={`/sample-request?fabric=${p.slug}`}
              className="flex items-center gap-2 bg-navy text-primary-foreground px-8 py-3.5 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              <ClipboardList className="w-4 h-4" />
              Request Sample
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────── */}
      <section className="py-6 border-t border-border/30">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display font-bold text-navy text-[1.4rem]">Gallery</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-px bg-gold" />
              <svg width="12" height="8" viewBox="0 0 60 20" fill="currentColor" className="text-gold">
                <path d="M30 10C20 4 8 14 0 10c8-4 20 6 30 0 10-6 22 4 30 0-8-4-20 6-30 0z" opacity=".85"/>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {p.images.map((img, i) => (
              <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream">
                <Image
                  src={img}
                  alt={`${p.name} — ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA (bordered card) ───────────────── */}
      <section className="py-7">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="border border-border rounded-sm grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 px-6 py-5">
            <div className="flex items-center gap-5">
              <span className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center shrink-0 bg-cream">
                <Package className="w-5 h-5 text-gold" strokeWidth={1.2} />
              </span>
              <div>
                <h3 className="font-display font-bold text-navy text-[1.1rem] mb-0.5">
                  Ready to place a bulk order or need more details?
                </h3>
                <p className="text-foreground/65 text-[0.82rem] leading-snug">
                  Our team is here to help you with pricing, specifications, and custom requirements.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/bulk-supply"
                className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                Send Bulk Inquiry
              </Link>
              <a
                href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(`Hi, I want bulk supply of ${p.name}.`)}`}
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

    </div>
  );
}
