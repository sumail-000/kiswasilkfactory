"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-background sticky top-0 z-50 border-b border-border/40">
      <div className="max-w-[1440px] mx-auto px-10 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center bg-cream shrink-0">
            <div className="text-center leading-none">
              <div className="font-display font-bold text-navy text-xl">KSF</div>
              <div className="text-[6px] text-gold font-semibold tracking-wider mt-0.5">PREMIUM QUALITY</div>
              <div className="text-[6px] text-gold font-semibold tracking-wider">SILK FABRIC</div>
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-navy text-2xl tracking-wide">KISWA SILK FACTORY</h1>
            <p className="text-sm text-foreground/70">{SITE.brandSubtitle}</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] font-medium transition-colors relative pb-1 whitespace-nowrap ${
                isActive(l.href) ? "text-gold" : "text-navy hover:text-gold"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          ))}
          <a
            href={`https://wa.me/${SITE.phoneIntl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-navy text-primary-foreground px-4 py-2.5 rounded-md hover:bg-navy/90 transition-colors text-[13px] font-medium shrink-0 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Inquiry
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center rounded border border-border"
        >
          <span className="block h-px w-5 bg-navy" />
          <span className="block h-px w-5 bg-navy" />
          <span className="block h-px w-5 bg-navy" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[200] bg-background flex flex-col px-6 py-6 transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center bg-cream">
              <div className="text-center leading-none">
                <div className="font-display font-bold text-navy text-base">KSF</div>
                <div className="text-[5px] text-gold font-semibold tracking-wider">PREMIUM QUALITY</div>
              </div>
            </div>
            <span className="font-display font-bold text-navy text-lg">KISWA SILK FACTORY</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="text-2xl text-navy w-9 h-9 flex items-center justify-center rounded border border-border"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-col">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setDrawerOpen(false)}
              className={`border-b border-border/50 py-4 text-base font-medium ${
                isActive(l.href) ? "text-gold" : "text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 space-y-3">
          <Link
            href="/bulk-supply"
            onClick={() => setDrawerOpen(false)}
            className="flex w-full items-center justify-center rounded-md bg-navy text-primary-foreground py-3 text-sm font-semibold"
          >
            Get Bulk Quote
          </Link>
          <a
            href={`https://wa.me/${SITE.phoneIntl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp text-white py-3 text-sm font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Inquiry
          </a>
        </div>
      </div>
    </header>
  );
}
