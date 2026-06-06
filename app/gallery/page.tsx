"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Layers, Factory, Package, Droplets, Printer, Scissors, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

/* ─── filter tabs ─────────────────────────────────────────── */
type TabId = "all" | "rolls" | "textures" | "factory" | "packing" | "dyeing" | "printing" | "embroidery";

const TABS: { id: TabId; label: string; sub?: string; icon: React.ElementType }[] = [
  { id: "all",        label: "Fabric Rolls",                icon: Package },
  { id: "textures",   label: "White-Base",  sub: "Fabric Textures", icon: Layers },
  { id: "factory",    label: "Factory /",   sub: "Stock",            icon: Factory },
  { id: "packing",    label: "Packing",                    icon: Package },
  { id: "dyeing",     label: "Dyeing",      sub: "Ready Fabric",    icon: Droplets },
  { id: "printing",   label: "Printing",    sub: "Ready Fabric",    icon: Printer },
  { id: "embroidery", label: "Embroidery",  sub: "Ready Fabric",    icon: Scissors },
];

/* ─── all gallery items ───────────────────────────────────── */
type GalleryItem = {
  src: string;
  label: string;
  cat: TabId[];
  ask: boolean; // show "ASK ABOUT THIS FABRIC" button
};

const ITEMS: GalleryItem[] = [
  // Fabric Rolls
  { src: "/assets/silk-rolls.jpg",        label: "Premium White-Base Silk Rolls",  cat: ["all", "rolls"],      ask: true  },
  { src: "/assets/silk-warehouse.jpg",    label: "Factory Silk Roll Stock",         cat: ["all", "rolls", "factory"], ask: false },

  // Textures
  { src: "/assets/silk-swirl.jpg",        label: "White-Base Fabric Textures",      cat: ["all", "textures"],   ask: true  },
  { src: "/assets/silk-drape.jpg",        label: "Smooth Silk Drape",               cat: ["all", "textures"],   ask: true  },

  // Factory / Stock
  { src: "/factory/step6/img3.jpeg",      label: "Factory Stock",                   cat: ["all", "factory"],    ask: false },
  { src: "/gallery/img30.jpeg",           label: "Power Loom Weaving Floor",        cat: ["all", "factory"],    ask: false },
  { src: "/gallery/img1.jpeg",            label: "Production Floor Overview",       cat: ["all", "factory"],    ask: false },

  // Packing
  { src: "/factory/step10/img1.jpeg",     label: "Packing & Quality Check",         cat: ["all", "packing"],    ask: false },
  { src: "/factory/step11/img1.jpeg",     label: "Secure Packing",                  cat: ["all", "packing"],    ask: false },
  { src: "/factory/step12/img1.jpeg",     label: "Global Dispatch Ready",           cat: ["all", "packing"],    ask: false },
  { src: "/gallery/img60.jpeg",           label: "Bulk Orders — Ready to Ship",     cat: ["all", "packing"],    ask: false },

  // Dyeing Ready
  { src: "/factory/step8/img2.jpeg",      label: "Dyeing Ready Fabric",             cat: ["all", "dyeing"],     ask: true  },
  { src: "/factory/step8/img1.jpeg",      label: "Fabric Washing Section",          cat: ["all", "dyeing"],     ask: false },

  // Printing Ready
  { src: "/factory/step9/img2.jpeg",      label: "Printing Ready Fabric",           cat: ["all", "printing"],   ask: true  },
  { src: "/factory/step9/img1.jpeg",      label: "Calendering — Smooth Finish",     cat: ["all", "printing"],   ask: false },

  // Embroidery Ready
  { src: "/products/sheesha-silk/img1.jpeg",  label: "Embroidery Ready Fabric",    cat: ["all", "embroidery"], ask: true  },
  { src: "/products/raw-silk-shine/img2.jpeg",label: "Heavy Work Base Fabric",     cat: ["all", "embroidery"], ask: true  },
];

/* ─── WhatsApp ask button ─────────────────────────────────── */
function AskBtn({ label }: { label: string }) {
  return (
    <a
      href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(`Hi, I want to ask about: ${label}.`)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 bg-navy text-white text-[0.68rem] font-semibold px-3 py-1.5 rounded-sm hover:bg-navy/90 transition-colors"
    >
      <MessageCircle className="w-3 h-3" />
      ASK ABOUT THIS FABRIC
    </a>
  );
}

/* ─── single gallery item ─────────────────────────────────── */
function GalleryImg({ item, className = "" }: { item: GalleryItem; className?: string }) {
  return (
    <div className={`relative overflow-hidden group bg-cream ${className}`}>
      <Image
        src={item.src}
        alt={item.label}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {/* Always-visible bottom label */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
        <p className="text-white text-[0.78rem] font-semibold mb-2">{item.label}</p>
        {item.ask && <AskBtn label={item.label} />}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState<TabId>("all");

  // Items for current tab
  const filtered = ITEMS.filter((i) => i.cat.includes(active));

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-cream overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
          {/* Left */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14">
            <h1 className="font-display font-bold text-navy text-[clamp(3rem,6vw,72px)] leading-tight mb-3">
              Gallery
            </h1>
            {/* Gold ornament */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-10 h-px bg-gold" />
              <svg width="22" height="12" viewBox="0 0 60 20" fill="currentColor" className="text-gold">
                <path d="M30 10C20 4 8 14 0 10c8-4 20 6 30 0 10-6 22 4 30 0-8-4-20 6-30 0z" opacity=".85"/>
              </svg>
              <span className="w-10 h-px bg-gold" />
            </div>
            <p className="text-foreground/70 text-[0.9rem] leading-relaxed mb-8 max-w-[420px]">
              Explore our gallery to see the craftsmanship, quality, and consistency behind every roll. From real white-base silk fabric rolls and textures to preparation, stock, packing, and application-ready materials — this is Kiswa Silk Factory.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fabrics" className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-6 py-3 rounded-sm text-sm font-semibold hover:bg-navy/90 transition-colors uppercase tracking-wide">
                View Fabrics
              </Link>
              <Link href="/sample-request" className="inline-flex items-center gap-2 border-2 border-navy/30 text-navy px-6 py-3 rounded-sm text-sm font-semibold hover:bg-navy/5 transition-colors uppercase tracking-wide">
                Request Sample
              </Link>
            </div>
          </div>
          {/* Right */}
          <div className="relative hidden lg:block min-h-[360px]">
            <Image src="/assets/silk-drape.jpg" alt="White silk fabric" fill sizes="50vw" className="object-cover" priority />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, transparent 40%)" }} />
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────── */}
      <section className="bg-background border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex overflow-x-auto scrollbar-hide gap-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex flex-col items-center gap-2 px-6 py-5 text-center shrink-0 border-b-2 transition-all ${
                    isActive
                      ? "border-gold text-gold"
                      : "border-transparent text-foreground/55 hover:text-navy"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${isActive ? "text-gold" : "text-foreground/40"}`}
                    strokeWidth={1.2}
                  />
                  <span className="text-[0.75rem] font-semibold leading-tight">
                    {tab.label}
                    {tab.sub && (
                      <>
                        <br />
                        <span className="font-normal">{tab.sub}</span>
                      </>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GALLERY GRID ──────────────────────────────────────── */}
      <section className="py-1 bg-cream">
        <div className="max-w-[1440px] mx-auto">

          {/* DEFAULT "all/rolls" VIEW — exact mosaic from mockup */}
          {(active === "all") && (
            <>
              {/* ── ROW 1: large left | center | right-2-stacked ── */}
              <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: "43fr 35fr 22fr" }}>
                {/* Silk rolls — tall left */}
                <GalleryImg item={ITEMS[0]} className="h-[480px]" />
                {/* Silk swirl — center */}
                <GalleryImg item={ITEMS[2]} className="h-[480px]" />
                {/* Right: factory + packing stacked */}
                <div className="flex flex-col gap-1">
                  <GalleryImg item={ITEMS[4]} className="flex-1 h-[238px]" />
                  <GalleryImg item={ITEMS[7]} className="flex-1 h-[238px]" />
                </div>
              </div>

              {/* ── ROW 2: 3 equal ── */}
              <div className="grid grid-cols-3 gap-1 mb-1">
                <GalleryImg item={ITEMS[3]} className="h-[340px]" />
                <GalleryImg item={ITEMS[11]} className="h-[340px]" />
                <GalleryImg item={ITEMS[13]} className="h-[340px]" />
              </div>

              {/* ── ROW 3: 4 equal ── */}
              <div className="grid grid-cols-4 gap-1">
                <GalleryImg item={ITEMS[15]} className="h-[260px]" />
                <GalleryImg item={ITEMS[10]} className="h-[260px]" />
                <GalleryImg item={ITEMS[8]} className="h-[260px]" />
                <GalleryImg item={ITEMS[9]} className="h-[260px]" />
              </div>
            </>
          )}

          {/* FILTERED VIEW — simple responsive grid */}
          {active !== "all" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 px-0">
              {filtered.map((item) => (
                <GalleryImg key={item.src + item.label} item={item} className="h-[320px]" />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-3 py-20 text-center text-foreground/40 text-sm">
                  No images in this category.
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section className="bg-background py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="border border-gold/25 rounded-sm bg-cream grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-6 px-8 py-7 shadow-sm">
            {/* Silk ornament icon */}
            <div className="hidden lg:flex w-16 h-16 items-center justify-center shrink-0">
              <svg viewBox="0 0 64 64" width="64" height="64" fill="none" className="text-gold">
                <path d="M8 32 Q16 20 32 32 Q48 44 56 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M8 24 Q16 12 32 24 Q48 36 56 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".5"/>
                <path d="M8 40 Q16 28 32 40 Q48 52 56 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity=".5"/>
              </svg>
            </div>
            <div>
              <h3 className="font-display font-bold text-navy text-[1.2rem] mb-1">
                Need a specific fabric or bulk requirement?
              </h3>
              <p className="text-foreground/65 text-[0.85rem]">
                Our team is ready to assist you with details, pricing, and samples.
              </p>
            </div>
            <a
              href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent("Hi, I have a fabric inquiry from the Gallery page.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-navy text-primary-foreground px-7 py-3.5 rounded-sm hover:bg-navy/90 transition-colors text-sm font-semibold uppercase tracking-wide whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              Send Inquiry on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
