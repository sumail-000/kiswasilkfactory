import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const FABRIC_LINKS = [
  { label: "Dull Raw Silk",        href: "/fabrics/special-dull-raw-silk" },
  { label: "Bright Raw Silk",      href: "/fabrics/raw-silk-shine" },
  { label: "Dull Resham Cotton",   href: "/fabrics/dull-resham-cotton" },
  { label: "Bright Resham Cotton", href: "/fabrics/bright-resham-cotton" },
  { label: "30D Bemberg",          href: "/fabrics/30d-bemberg-crinkle" },
  { label: "40D Crinkle",          href: "/fabrics/40d-red-stone-crinkle" },
  { label: "Korean Raw Silk",      href: "/fabrics/korean-raw-silk" },
  { label: "Sheesha Silk",         href: "/fabrics/sheesha-silk" },
];

const QUICK_LINKS = ["About Us", "Fabrics", "Applications", "Gallery", "Bulk Supply", "Contact Us"];
const USEFUL_LINKS = ["Request Bulk Quote", "Request Sample", "WhatsApp Inquiry", "Privacy Policy", "Terms & Conditions"];

export default function Footer() {
  return (
    <footer className="bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="col-span-1">
          <div className="relative w-full max-w-[240px] h-16 mb-4">
            <Image
              src="/logos/footer_logo.png"
              alt="Kiswa Silk Factory Logo"
              fill
              sizes="240px"
              className="object-contain object-left"
            />
          </div>
          <p className="text-foreground/70 text-xs leading-relaxed mb-5">
            Serving global clients with premium quality white-base silk fabrics for dyeing, printing, embroidery and heavy work.
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: "Facebook",  href: "#", svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6.5c0-.8.2-1 1-1h3V2h-4.3C10.5 2 9 3.5 9 6.5V8z"/></svg> },
              { label: "Instagram", href: `https://instagram.com/${SITE.instagram.replace("@", "")}`, svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { label: "LinkedIn",  href: "#", svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
              { label: "YouTube",   href: "#", svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.556a3.003 3.003 0 00-2.11 2.107C0 8.02 0 12 0 12s0 3.98.502 5.837a3.003 3.003 0 002.11 2.107C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.556a3.003 3.003 0 002.11-2.107C24 15.98 24 12 24 12s0-3.98-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
            ].map(({ label, href, svg }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-navy text-primary-foreground flex items-center justify-center hover:bg-navy/90 transition-colors">
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-navy text-sm tracking-wide mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-foreground/75 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <Link href={`/${l.toLowerCase().replace(/\s+/g, "-").replace("contact-us", "contact").replace("about-us", "about")}`}
                  className="hover:text-gold transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Fabric Categories */}
        <div>
          <h4 className="font-display font-bold text-navy text-sm tracking-wide mb-4">FABRIC CATEGORIES</h4>
          <ul className="space-y-2 text-foreground/75 text-sm">
            {FABRIC_LINKS.map((f) => (
              <li key={f.label}>
                <Link href={f.href} className="hover:text-gold transition-colors">{f.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-display font-bold text-navy text-sm tracking-wide mb-4">USEFUL LINKS</h4>
          <ul className="space-y-2 text-foreground/75 text-sm">
            {USEFUL_LINKS.map((l) => (
              <li key={l}>
                <a href={l === "WhatsApp Inquiry" ? `https://wa.me/${SITE.phoneIntl}` : "#"}
                  className="hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Need Bulk Supply? */}
        <div>
          <h4 className="font-display font-bold text-navy text-sm tracking-wide mb-4">NEED BULK SUPPLY?</h4>
          <p className="text-foreground/75 text-xs leading-relaxed mb-5">
            Our team is ready to assist you with wholesale inquiries &amp; custom needs.
          </p>
          <a
            href={`https://wa.me/${SITE.phoneIntl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-whatsapp text-whatsapp px-5 py-2.5 rounded-sm hover:bg-whatsapp/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs font-semibold">WhatsApp Inquiry</span>
          </a>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-navy text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-center sm:text-left text-xs">
          <span>© {new Date().getFullYear()} Kiswa Silk Factory. All Rights Reserved.</span>
          <span className="text-gold hidden sm:inline">❖</span>
          <span>Design with Passion. Crafted for Excellence.</span>
        </div>
      </div>
    </footer>
  );
}
