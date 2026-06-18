"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Layers, Package, Printer, Scissors, MessageCircle, Crown, Wind, Grid, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";
import { GALLERY_ITEMS } from "@/lib/gallery-items";

/* ─── filter tabs ─────────────────────────────────────────── */
type TabId = "all" | "raw-silk" | "chiffon-crinkle" | "fine-silk" | "organza-net" | "prints-sublimation" | "lining";

const TABS: { id: TabId; label: string; sub?: string; icon: React.ElementType }[] = [
  { id: "all",                label: "All Fabrics",                icon: Package },
  { id: "raw-silk",           label: "Raw Silks",    sub: "Textured & Matte", icon: Layers },
  { id: "chiffon-crinkle",    label: "Chiffon & Crinkle", sub: "Light & Flowy",    icon: Wind },
  { id: "fine-silk",          label: "Fine & Shiny",      sub: "Premium Silks",    icon: Crown },
  { id: "organza-net",        label: "Organza & Net",     sub: "Sheer & Crisp",    icon: Grid },
  { id: "prints-sublimation", label: "Prints & Sublimation", sub: "Ready for Print", icon: Printer },
  { id: "lining",             label: "Lining & Inners",    sub: "Soft Underlayers", icon: Scissors },
];

type GalleryItem = {
  src: string;
  label: string;
  cat: TabId[];
  ask: boolean; // show "ASK ABOUT THIS FABRIC" button
  slug?: string; // product slug
};

const BASE_ITEMS: GalleryItem[] = [
  { src: "/assets/silk-rolls.jpg",        label: "Premium White-Base Silk Rolls",  cat: ["all"],      ask: true  },
  { src: "/assets/silk-swirl.jpg",        label: "White-Base Fabric Textures",      cat: ["all"],   ask: true  },
  { src: "/assets/silk-drape.jpg",        label: "Smooth Silk Drape",               cat: ["all"],   ask: true  },
];

const ITEMS: GalleryItem[] = [
  ...BASE_ITEMS,
  ...GALLERY_ITEMS.filter(item => !BASE_ITEMS.some(base => base.src === item.src)) as GalleryItem[]
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
function GalleryImg({ item, onClick, className = "" }: { item: GalleryItem; onClick?: () => void; className?: string }) {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden group bg-cream cursor-pointer border border-border/40 rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${className}`}
      suppressHydrationWarning
    >
      <div className="aspect-[4/3] relative w-full overflow-hidden bg-cream">
        <Image
          src={item.src}
          alt={item.label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      {/* Label and Details indicator */}
      <div className="p-4 bg-white flex flex-col justify-between border-t border-border/30 flex-1 min-h-[96px]">
        <p className="text-navy text-[0.82rem] font-semibold line-clamp-2 leading-tight mb-2">{item.label}</p>
        <div className="flex items-center justify-between">
          <span className="text-gold text-[10px] font-bold tracking-wider uppercase">View Detail</span>
          {item.ask && (
            <div onClick={(e) => e.stopPropagation()}>
              <AskBtn label={item.label} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState<TabId>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Items for current tab
  const filtered = ITEMS.filter((i) => i.cat.includes(active));

  const activeItem = selectedIndex !== null ? filtered[selectedIndex] : null;
  const product = activeItem?.slug ? PRODUCTS.find(p => p.slug === activeItem.slug) : null;

  // Find suggestions (other products in the same category)
  const suggestions = product 
    ? PRODUCTS.filter(p => p.slug !== product.slug && p.category === product.category).slice(0, 3)
    : [];

  const finalSuggestions = suggestions.length >= 3 
    ? suggestions 
    : [
        ...suggestions, 
        ...PRODUCTS.filter(p => p.slug !== product?.slug && !suggestions.some(s => s.slug === p.slug)).slice(0, 3 - suggestions.length)
      ];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex - 1 + filtered.length) % filtered.length;
    });
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex + 1) % filtered.length;
    });
  };

  const handleSelectProduct = (slug: string) => {
    const itemIndex = filtered.findIndex(item => item.slug === slug);
    if (itemIndex !== -1) {
      setSelectedIndex(itemIndex);
    } else {
      setActive("all");
      // Find index in complete ITEMS (which will be filtered when active is "all")
      setTimeout(() => {
        const globalIndex = ITEMS.findIndex(item => item.slug === slug);
        if (globalIndex !== -1) {
          setSelectedIndex(globalIndex);
        }
      }, 50);
    }
  };

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
              Explore our gallery to inspect the texture, drape, and premium quality of our white-base fabrics. Browse through raw silks, chiffons, crinkles, organzas, and linings — all prepared to meet the highest B2B standards.
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
                  onClick={() => {
                    setActive(tab.id);
                    setSelectedIndex(null); // Reset visual selection on tab switch
                  }}
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
      <section className="py-10 bg-cream">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, idx) => (
              <GalleryImg
                key={item.src + item.label + idx}
                item={item}
                onClick={() => setSelectedIndex(idx)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-foreground/40 text-sm">
              No images in this category.
            </div>
          )}

        </div>
      </section>

      {/* ── LIGHTBOX MODAL ────────────────────────────────────── */}
      {selectedIndex !== null && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Close Area */}
          <div className="absolute inset-0 cursor-default" onClick={() => setSelectedIndex(null)} />
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/75 transition-colors p-2.5 rounded-full z-50 border border-white/10"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Card */}
          <div className="relative bg-cream rounded-sm max-w-5xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr] shadow-2xl z-10 border border-gold/10">
            
            {/* Visual Area */}
            <div className="relative bg-black flex items-center justify-center aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
              <Image
                src={activeItem.src}
                alt={activeItem.label}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
                priority
              />

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 transition-colors p-3 rounded-full border border-white/5"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 transition-colors p-3 rounded-full border border-white/5"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Details Sidebar */}
            <div className="p-6 md:p-8 overflow-y-auto flex flex-col justify-between bg-cream border-t md:border-t-0 md:border-l border-border/40 max-h-[50vh] md:max-h-[90vh]">
              <div>
                {/* Product/Fabric Header */}
                <span className="text-gold text-[10px] font-bold tracking-widest uppercase mb-1 inline-block">
                  {product?.category ?? "Premium White-Base"}
                </span>
                <h2 className="text-xl md:text-2xl font-display font-bold text-navy mb-2">
                  {product?.name ?? activeItem.label}
                </h2>
                
                {/* Gold ornament divider */}
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-6 h-px bg-gold" />
                  <span className="text-gold text-[8px]">❖</span>
                  <span className="w-6 h-px bg-gold" />
                </div>

                {/* Description */}
                <p className="text-foreground/70 text-xs md:text-sm leading-relaxed mb-6">
                  {product?.shortDesc ?? "High quality fabric roll ready for processing, prepared to meet standard B2B whiteness and durability specs."}
                </p>

                {/* Technical Specifications */}
                {product && (
                  <div className="mb-6">
                    <h3 className="text-[10px] font-bold tracking-wider text-navy uppercase mb-2">
                      Technical Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 bg-white border border-border/40 p-4 rounded-sm text-xs">
                      <div>
                        <span className="text-foreground/50 block text-[10px] uppercase font-semibold">Composition</span>
                        <strong className="text-navy">{product.composition}</strong>
                      </div>
                      <div>
                        <span className="text-foreground/50 block text-[10px] uppercase font-semibold">GSM / Weight</span>
                        <strong className="text-navy">{product.gsm}</strong>
                      </div>
                      <div>
                        <span className="text-foreground/50 block text-[10px] uppercase font-semibold">Width</span>
                        <strong className="text-navy">{product.width}</strong>
                      </div>
                      <div>
                        <span className="text-foreground/50 block text-[10px] uppercase font-semibold">Finish</span>
                        <strong className="text-navy">{product.finish}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Uses Tags */}
                {product && (
                  <div className="mb-6">
                    <h3 className="text-[10px] font-bold tracking-wider text-navy uppercase mb-2">
                      Recommended Applications
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {product.uses.map(use => (
                        <span key={use} className="px-2.5 py-1 rounded-sm bg-white border border-border/40 text-[10px] font-medium text-navy">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Fabric Suggestions */}
                {product && finalSuggestions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-[10px] font-bold tracking-wider text-navy uppercase mb-2">
                      Related Fabrics Suggestions
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {finalSuggestions.map((sug) => (
                        <button
                          key={sug.slug}
                          onClick={() => handleSelectProduct(sug.slug)}
                          className="group text-left border border-border/40 hover:border-gold p-1 bg-white rounded-sm transition-all flex flex-col h-full"
                          title={`Click to view ${sug.name}`}
                        >
                          <div className="aspect-[4/3] relative w-full overflow-hidden rounded-sm bg-cream mb-1">
                            <Image
                              src={sug.heroImage}
                              alt={sug.name}
                              fill
                              sizes="100px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <span className="text-navy text-[9px] font-semibold truncate block w-full px-0.5">
                            {sug.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* B2B Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 shrink-0 pt-4 border-t border-border/40">
                <a
                  href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(`Hi, I'm viewing your Gallery and want to ask about: ${product?.name ?? activeItem.label}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-navy text-primary-foreground text-xs font-semibold py-3 px-4 rounded-sm hover:bg-navy/90 transition-colors uppercase tracking-wider text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Ask Price / Inquiry
                </a>
                {product && (
                  <Link
                    href={`/fabrics/${product.slug}`}
                    className="flex-1 border border-navy text-navy hover:bg-navy/5 text-xs font-semibold py-3 px-4 rounded-sm transition-colors uppercase tracking-wider text-center"
                    onClick={() => setSelectedIndex(null)}
                  >
                    Full Specs Sheet
                  </Link>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

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
