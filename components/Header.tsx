"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";
import BrandMark from "./BrandMark";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/fabrics") return pathname.startsWith("/fabrics");
    return pathname === href;
  };

  return (
    <header
      className={`bg-ivory/92 sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150 transition ${scrolled ? "border-line border-b" : "border-b border-transparent"}`}
    >
      <div className="bg-charcoal text-ivory-soft px-4 py-2 text-center text-[0.78rem] tracking-[0.12em] uppercase">
        Premium silks crafted in Pakistan —{" "}
        <span className="text-gold-soft">now shipping worldwide for B2B</span>
      </div>

      <nav
        className="container-x flex items-center justify-between gap-6 py-4"
        aria-label="Primary"
      >
        <BrandMark />

        <ul className="hidden items-center gap-8 xl:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`group relative inline-block py-2 text-[0.85rem] font-medium tracking-[0.05em] transition ${isActive(l.href) ? "text-charcoal" : "text-charcoal-soft hover:text-charcoal"}`}
              >
                {l.label}
                <span
                  className={`bg-gold absolute bottom-0 left-0 h-px transition-all duration-500 ${isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/bulk-inquiry" className="btn btn-outline hidden xl:inline-flex">
            Request Quote
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="border-line grid h-11 w-11 place-items-center border xl:hidden"
          >
            <span className="relative block h-px w-[18px] bg-current">
              <span className="absolute -top-[6px] left-0 block h-px w-[18px] bg-current" />
              <span className="absolute top-[6px] left-0 block h-px w-[18px] bg-current" />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`bg-ivory fixed inset-0 z-[200] flex flex-col px-6 py-8 transition-transform duration-500 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!drawerOpen}
      >
        <div className="mb-10 flex items-center justify-between">
          <BrandMark />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="border-line grid h-11 w-11 place-items-center border"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M4 4 L16 16 M16 4 L4 16" />
            </svg>
          </button>
        </div>
        <ul className="space-y-0">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} className="border-line border-b">
              <Link
                href={l.href}
                onClick={() => setDrawerOpen(false)}
                className="font-display flex items-center justify-between py-4 text-[1.6rem]"
              >
                {l.label}
                <span className="text-gold text-[0.8rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
          <li className="border-line border-b">
            <Link
              href="/sample-request"
              onClick={() => setDrawerOpen(false)}
              className="font-display flex items-center justify-between py-4 text-[1.6rem]"
            >
              Sample Request<span className="text-gold text-[0.8rem]">08</span>
            </Link>
          </li>
          <li className="border-line border-b">
            <Link
              href="/bulk-inquiry"
              onClick={() => setDrawerOpen(false)}
              className="font-display flex items-center justify-between py-4 text-[1.6rem]"
            >
              Bulk Inquiry<span className="text-gold text-[0.8rem]">09</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto pt-8">
          <Link
            href="/bulk-inquiry"
            onClick={() => setDrawerOpen(false)}
            className="btn"
          >
            Request Quote <span className="arrow">→</span>
          </Link>
          <p className="text-muted mt-4 text-sm">
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a> ·{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
      </div>
    </header>
  );
}
