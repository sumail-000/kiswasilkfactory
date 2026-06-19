import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle, FileText, Factory, Users, Settings2,
  ShieldCheck, Package, Check, Shirt, BookOpen,
  Scissors, Home, Store, Truck, Globe,
} from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Kiswa Silk Factory",
  description:
    "Kiswa Silk Factory manufactures premium white-base silk fabrics using advanced looms, skilled craftsmanship and strict quality control.",
};

/* ── data ── */
const WHO_WE_ARE_ICONS = [
  { icon: Factory,    label: "In-House Manufacturing" },
  { icon: Users,      label: "Skilled Workforce" },
  { icon: Settings2,  label: "Advanced Looms" },
  { icon: ShieldCheck,label: "Quality First Approach" },
  { icon: Package,    label: "Consistent Supply" },
];

const WHAT_WE_MAKE = [
  { name: "Dull Raw Silk",      img: "/products/special-dull-raw-silk/img1.jpeg" },
  { name: "Bright Raw Silk",    img: "/products/raw-silk-shine/img1.jpeg" },
  { name: "Resham Cotton",      img: "/products/dull-resham-cotton/img1.jpeg" },
  { name: "Bright Resham",      img: "/products/bright-resham-cotton/img1.jpeg" },
  { name: "30D Bemberg",        img: "/products/30d-bemberg-crinkle/img1.jpeg" },
  { name: "Korean Raw Silk",    img: "/products/korean-raw-silk/img1.jpeg" },
  { name: "Sheesha Silk",       img: "/products/sheesha-silk/img1.jpeg" },
  { name: "Poly Organza",       img: "/products/poly-organza/img1.jpeg" },
];

const APPLICATIONS = [
  { icon: Shirt,   label: "Apparel & Ethnic Wear" },
  { icon: Home,    label: "Home Textiles & Furnishings" },
  { icon: Scissors,label: "Scarves, Stoles & Dupattas" },
  { icon: BookOpen,label: "Decor & Event Draping" },
  { icon: Package, label: "Lining, Interlining & More" },
];

const QUALITY_CHECKS = [
  "Fabric construction & weave check",
  "GSM (Weight) verification",
  "Width & shrinkage control",
  "Shade & surface inspection",
  "Defect checking (holes, slubs, stains)",
  "Final rolling & packing check",
];

const PROCESS_STEPS = [
  { n: 1, icon: Package,    title: "Yarn Preparation",      body: "Carefully selected yarns are prepared for strength and evenness.", img: "/factory/step1/img1.jpeg" },
  { n: 2, icon: Settings2,  title: "Weaving Setup",          body: "Looms are set with precision for the desired fabric construction.", img: "/factory/step4/img1.jpeg" },
  { n: 3, icon: Factory,    title: "Power Loom Weaving",     body: "Advanced power looms weave fabric with consistency and speed.", img: "/factory/step6/img1.jpeg" },
  { n: 4, icon: ShieldCheck,title: "Fabric Checking",        body: "Grey fabric is checked on-screen and manually for defects.", img: "/factory/step7/img1.jpeg" },
  { n: 5, icon: Scissors,   title: "Washing & Calendering",  body: "Fabric is washed for cleanliness and finished for better texture.", img: "/factory/step8/img1.jpeg" },
  { n: 6, icon: Truck,      title: "Measuring",              body: "Width, length and weight are measured as per requirement.", img: "/factory/step10/img1.jpeg" },
  { n: 7, icon: Package,    title: "Packing & Dispatch",     body: "Fabric is rolled, packed carefully and dispatched on time.", img: "/factory/step12/img1.jpeg" },
];

const WHO_WE_SERVE = [
  { icon: Factory, label: "Garment & Apparel Manufacturers" },
  { icon: Truck,   label: "Textile Wholesalers & Distributors" },
  { icon: Globe,   label: "Export Oriented Buyers" },
  { icon: Home,    label: "Home Textile Producers" },
  { icon: Store,   label: "Boutique & Private Label Brands" },
  { icon: Scissors,label: "Tailoring & Stitching Units" },
];

const GALLERY_IMAGES = [
  "/gallery/img1.jpeg",
  "/gallery/img5.jpeg",
  "/gallery/img30.jpeg",
  "/gallery/img50.jpeg",
  "/gallery/img70.jpeg",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[440px]">
          {/* Left */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14">
            <h1 className="font-display font-bold text-navy text-[clamp(2.4rem,5vw,58px)] leading-tight mb-3">
              About<br />Kiswa Silk Factory
            </h1>
            <p className="text-gold font-display font-semibold text-[1.1rem] leading-snug mb-5">
              Premium White-Base Silk Fabrics,<br />Crafted with Precision
            </p>
            <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-8 max-w-md">
              At Kiswa Silk Factory, we manufacture high-quality white-base silk fabrics using advanced looms, skilled craftsmanship, and strict quality control—delivering consistency you can rely on, every time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fabrics" className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold">
                <FileText className="w-4 h-4" strokeWidth={1.2} />
                View Fabrics
              </Link>
              <a
                href={`https://wa.me/${SITE.phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-navy/25 text-navy bg-white px-6 py-3 rounded-md hover:bg-navy/5 transition-colors text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.2} />
                WhatsApp Inquiry
              </a>
            </div>
          </div>
          {/* Right */}
          <div className="relative hidden lg:block">
            <Image src="/assets/silk-rolls.jpg" alt="Kiswa Silk Factory — silk fabric rolls" fill sizes="50vw" className="object-cover" priority />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, transparent 40%)" }} />
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream">
            <Image src="/gallery/img1.jpeg" alt="Kiswa Silk Factory power loom floor" fill sizes="50vw" className="object-cover" />
          </div>
          <div>
            <p className="text-gold text-[0.72rem] font-bold tracking-[0.22em] uppercase mb-2">WHO WE ARE</p>
            <h2 className="font-display font-bold text-navy text-[clamp(1.7rem,3vw,36px)] leading-tight mb-5">
              Manufacturers of Reliable,<br />Consistent &amp; Quality Silk Fabrics
            </h2>
            <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-8">
              We are a dedicated silk fabric manufacturer focused on white-base woven silk fabrics. From yarn to finished roll, every stage is managed in-house to ensure strength, smooth finish, precise width, and uniform quality.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-5 mb-8">
              {WHO_WE_ARE_ICONS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center w-[80px]">
                  <span className="w-12 h-12 rounded-full border border-gold/30 bg-cream flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                  </span>
                  <span className="text-[0.68rem] font-semibold text-navy leading-tight">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/fabrics" className="flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold">
                View Fabric Collection
              </Link>
              <Link href="/sample-request" className="flex items-center gap-2 border-2 border-navy/25 text-navy bg-white px-6 py-3 rounded-md hover:bg-navy/5 transition-colors text-sm font-semibold">
                Request Sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE MAKE ──────────────────────────── */}
      <section className="bg-cream py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="w-12 h-px bg-gold" />
            <h2 className="font-display font-bold text-navy text-[clamp(1.4rem,2.5vw,28px)] tracking-wide uppercase">What We Make</h2>
            <span className="w-12 h-px bg-gold" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {WHAT_WE_MAKE.map((f) => (
              <Link href="/fabrics" key={f.name} className="group flex flex-col gap-2">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-background">
                  <Image src={f.img} alt={f.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-center text-navy text-[0.72rem] font-semibold">{f.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATIONS + QUALITY CHECK ──────────── */}
      <section className="py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — Multiple Applications */}
          <div>
            <p className="text-gold text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-2">PREPARED FOR</p>
            <h2 className="font-display font-bold text-navy text-[clamp(1.7rem,3vw,34px)] leading-tight mb-7">Multiple Applications</h2>
            <div className="flex flex-wrap gap-6 mb-7">
              {APPLICATIONS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center w-[90px]">
                  <span className="w-12 h-12 rounded-full border border-gold/30 bg-cream flex items-center justify-center">
                    <Icon className="w-5 h-5 text-navy" strokeWidth={1.2} />
                  </span>
                  <span className="text-[0.68rem] font-semibold text-navy leading-tight">{label}</span>
                </div>
              ))}
            </div>
            <p className="text-foreground/65 text-[0.85rem] leading-relaxed">
              Our white-base silk fabrics are widely used by manufacturers, converters, and brands who value quality, consistency, and long-term reliability.
            </p>
          </div>

          {/* Right — Quality Checked Before Packing */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-5 items-start">
            <div>
              <p className="text-gold text-[0.7rem] font-bold tracking-[0.22em] uppercase mb-2">QUALITY CHECKED</p>
              <h2 className="font-display font-bold text-navy text-[clamp(1.7rem,3vw,34px)] leading-tight mb-6">Before Packing</h2>
              <ul className="space-y-3">
                {QUALITY_CHECKS.map((q) => (
                  <li key={q} className="flex items-start gap-3 text-[0.85rem] text-foreground/75">
                    <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-cream hidden sm:block">
              <Image src="/factory/step7/img1.jpeg" alt="Quality checking" fill sizes="160px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE PREPARE YOUR FABRIC (Process) ──── */}
      <section className="bg-cream py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="w-12 h-px bg-gold" />
            <h2 className="font-display font-bold text-navy text-[clamp(1.3rem,2vw,24px)] tracking-wide uppercase text-center">How We Prepare Your Fabric</h2>
            <span className="w-12 h-px bg-gold" />
          </div>

          {/* Steps — numbered with connecting line */}
          <div className="relative">
            {/* Connecting dots line */}
            <div className="absolute top-[26px] left-[6%] right-[6%] h-px border-t-2 border-dashed border-gold/30 hidden lg:block" />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
              {PROCESS_STEPS.map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center gap-3">
                  <span className="w-12 h-12 rounded-full border-2 border-gold bg-white flex items-center justify-center shrink-0 shadow-sm relative">
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-navy text-primary-foreground text-[0.62rem] font-bold flex items-center justify-center">{s.n}</span>
                    <s.icon className="w-5 h-5 text-gold" strokeWidth={1.2} />
                  </span>
                  <h4 className="font-display font-bold text-navy text-[0.82rem] leading-tight">{s.title}</h4>
                  <p className="text-foreground/60 text-[0.7rem] leading-snug">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ──────────────────────────── */}
      <section className="py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="w-12 h-px bg-gold" />
            <h2 className="font-display font-bold text-navy text-[clamp(1.3rem,2vw,24px)] tracking-wide uppercase">Who We Serve</h2>
            <span className="w-12 h-px bg-gold" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-center">
            {WHO_WE_SERVE.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 px-2">
                <span className="w-14 h-14 rounded-full border border-gold/30 bg-cream flex items-center justify-center">
                  <Icon className="w-6 h-6 text-navy" strokeWidth={1.2} />
                </span>
                <span className="text-[0.75rem] font-semibold text-navy leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ─────────────────────────── */}
      <section className="pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-0">
          <div className="grid grid-cols-5 gap-1">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden bg-cream">
                <Image src={src} alt={`Factory ${i + 1}`} fill sizes="20vw" className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────── */}
      <section className="bg-navy py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-8">
          {/* KSF logo badge */}
          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 hidden lg:flex relative">
            <Image
              src="/logos/header_logo.jpeg"
              alt="Kiswa Silk Factory Logo"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-primary-foreground text-[1.6rem] mb-2">Let&apos;s Build Quality Together</h3>
            <p className="text-primary-foreground/65 text-sm">
              Looking for a reliable silk fabric manufacturing partner?<br />We are ready to support your business with quality and consistency.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent("Hi, I want to partner with Kiswa Silk Factory for fabric supply.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 bg-gold text-navy px-8 py-4 rounded-md hover:bg-gold/90 transition-colors shrink-0"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" strokeWidth={1.2} />
              <span className="font-bold text-sm">WhatsApp Inquiry</span>
            </div>
            <span className="text-[0.7rem] text-navy/75">Get a quick response on your requirements.</span>
          </a>
        </div>
      </section>

    </div>
  );
}
