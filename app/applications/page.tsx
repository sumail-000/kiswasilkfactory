import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets, Printer, Scissors, Diamond, Crown, PenTool,
  Package, BookOpen, ClipboardList, ShieldCheck, HelpCircle, ArrowRight,
  MessageCircle, FileText,
} from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Applications — Kiswa Silk Factory",
  description:
    "White-base silk fabrics for dyeing, printing, embroidery, heavy work, bridal wear and designer collections.",
};

/* ── application cards ── */
const APPS = [
  {
    icon: Droplets,
    title: "Ready to Dye",
    desc: "Consistent white-base fabrics with excellent absorbency for vibrant, even dyeing results.",
    img: "/products/dull-resham-cotton/img1.jpeg",
    filter: "Dyeing",
  },
  {
    icon: Printer,
    title: "Ready to Print",
    desc: "Smooth surfaces and stable weaves that ensure sharp, clear and long-lasting print quality.",
    img: "/products/30d-bemberg-crinkle/img1.jpeg",
    filter: "Printing",
  },
  {
    icon: Scissors,
    title: "Ready to Embroider",
    desc: "Ideal texture and strength for fine embroidery, resham, zari and intricate detailing.",
    img: "/products/sheesha-silk/img1.jpeg",
    filter: "Embroidery",
  },
  {
    icon: Diamond,
    title: "Heavy Work / Adda Work",
    desc: "Strong, durable fabrics that hold structure and support heavy handiwork beautifully.",
    img: "/products/raw-silk-shine/img2.jpeg",
    filter: "Heavy Work",
  },
  {
    icon: Crown,
    title: "Bridal & Formal Wear",
    desc: "Elegant drape, luxurious feel and premium finish for bridal and occasion wear.",
    img: "/products/korean-raw-silk/img1.jpeg",
    filter: "Printing",
  },
  {
    icon: PenTool,
    title: "Designer Collections",
    desc: "Versatile bases that inspire creativity and bring designer visions to life.",
    img: "/products/poly-2-tone/img1.jpeg",
    filter: "Printing",
  },
];

/* ── FAQ ── */
const FAQS = [
  {
    q: "Which fabric for printing?",
    a: "We recommend tightly woven bases like Riyon, Viscose Muslin or Modal Satin for sharp prints.",
  },
  {
    q: "Which base for heavy embroidery?",
    a: "Choose strong weaves like Katan, Rawsilk or Satin that support zari, sequins and adda work.",
  },
  {
    q: "Can I request samples?",
    a: "Yes, we provide fabric swatches so you can check quality, texture and suitability first.",
  },
];

/* ── How We Help ── */
const HOW_WE_HELP = [
  { icon: Package,       title: "Bulk Supply",       desc: "Reliable capacity, on-time delivery and consistent fabric quality." },
  { icon: BookOpen,      title: "Fabric Guidance",   desc: "Expert recommendations for the right fabric for your application." },
  { icon: ClipboardList, title: "Sample Support",    desc: "Quick sample turnaround to help you decide with confidence." },
  { icon: ShieldCheck,   title: "Quality Checking",  desc: "Every lot is inspected for consistency in weave, finish and measurements." },
];

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ──────────────────────────────────── */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
          {/* Left */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-gold text-[0.7rem] font-bold tracking-[0.25em] uppercase">BUILT FOR CREATIVITY. MADE FOR PROFESSIONALS.</span>
              <span className="w-8 h-px bg-gold shrink-0" />
            </div>
            <h1 className="font-display font-bold text-navy text-[clamp(2.4rem,5vw,54px)] leading-tight mb-5">
              Applications<br />We Support
            </h1>
            <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-8 max-w-md">
              Our white-base silk and blended fabrics are engineered for versatility—perfect for dyeing, printing, embroidery, heavy work, bridal couture, and designer collections.
            </p>
            <div>
              <Link
                href="/fabrics"
                className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-md hover:bg-navy/90 transition-colors text-sm font-semibold"
              >
                Explore Our Fabrics
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
          {/* Right — fabric rolls */}
          <div className="relative hidden lg:block">
            <Image src="/assets/silk-rolls.jpg" alt="Silk fabric rolls" fill sizes="50vw" className="object-cover" priority />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, transparent 40%)" }}
            />
          </div>
        </div>
      </section>

      {/* ── 6 APPLICATION CARDS ───────────────────── */}
      <section className="py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPS.map((a) => (
              <div key={a.title} className="border border-border/50 rounded-sm overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group">
                {/* Image with icon badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-cream">
                  <Image
                    src={a.img}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Navy icon badge top-left */}
                  <span className="absolute top-4 left-4 w-11 h-11 rounded-full bg-navy flex items-center justify-center shadow-md">
                    <a.icon className="w-5 h-5 text-white" strokeWidth={1.3} />
                  </span>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-navy text-[1.15rem] mb-2">{a.title}</h3>
                  <p className="text-foreground/65 text-[0.85rem] leading-relaxed mb-4">{a.desc}</p>
                  <Link
                    href={`/fabrics?filter=${a.filter}`}
                    className="inline-flex items-center gap-1.5 text-navy text-[0.8rem] font-semibold hover:text-gold transition-colors group/link"
                  >
                    View Fabrics
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ STRIP ─────────────────────────────── */}
      <section className="bg-cream py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white border border-border/40 rounded-sm p-6 flex gap-4 items-start">
                <span className="w-10 h-10 rounded-full border-2 border-gold/50 flex items-center justify-center shrink-0 bg-cream mt-0.5">
                  <HelpCircle className="w-5 h-5 text-gold" strokeWidth={1.3} />
                </span>
                <div>
                  <h4 className="font-display font-bold text-navy text-[0.98rem] mb-1.5">{f.q}</h4>
                  <p className="text-foreground/65 text-[0.82rem] leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP BUYERS ────────────────────── */}
      <section className="py-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold text-[0.7rem] font-bold tracking-[0.25em] uppercase">PARTNERING FOR YOUR SUCCESS</span>
              <span className="w-10 h-px bg-gold" />
            </div>
            <h2 className="font-display font-bold text-navy text-[clamp(1.7rem,3vw,36px)]">How We Help Buyers</h2>
          </div>

          {/* 4 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {HOW_WE_HELP.map((h) => (
              <div key={h.title} className="flex flex-col items-center gap-4">
                {/* Large outline icon */}
                <span className="w-20 h-20 rounded-full border-2 border-gold/35 bg-cream flex items-center justify-center">
                  <h.icon className="w-9 h-9 text-gold" strokeWidth={1.1} />
                </span>
                <h4 className="font-display font-bold text-navy text-[1.05rem]">{h.title}</h4>
                <p className="text-foreground/60 text-[0.82rem] leading-relaxed max-w-[200px]">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ─────────────────────── */}
      <section className="bg-navy py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-8">
          {/* Left text */}
          <div>
            <h3 className="font-display font-bold text-primary-foreground text-[1.4rem] mb-1.5">
              Let&apos;s Find the Right Fabric for Your Next Collection
            </h3>
            <p className="text-primary-foreground/65 text-[0.87rem]">
              Tell us your requirement and we&apos;ll suggest the best options.
            </p>
          </div>
          {/* Right buttons */}
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/sample-request"
              className="flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-5 py-3 rounded-sm hover:bg-primary-foreground/10 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              Need Help Choosing Fabric?
            </Link>
            <Link
              href="/bulk-supply"
              className="flex items-center gap-2 bg-gold text-navy px-5 py-3 rounded-sm hover:bg-gold/90 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              <FileText className="w-4 h-4" strokeWidth={1.5} />
              Request Bulk Quote
            </Link>
            <a
              href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent("Hi, I need help choosing the right fabric for my application.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-sm hover:bg-[#20b858] transition-colors text-sm font-semibold whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
