/**
 * Static site structure.
 *
 * Navigation is part of the site's information architecture, not editable
 * content, so it stays in code. Everything the admin panel can change —
 * brand, phone, email, Instagram, address — now lives in `content/site.json`
 * and is read via `getSite()` from `@/lib/content`.
 */

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/fabrics", label: "Fabrics" },
  { href: "/applications", label: "Applications" },
  { href: "/process", label: "Process" },
  { href: "/gallery", label: "Gallery" },
  { href: "/bulk-supply", label: "Bulk Supply" },
  { href: "/contact", label: "Contact Us" },
];

export const FOOTER_QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/fabrics", label: "Fabrics" },
  { href: "/applications", label: "Applications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/bulk-supply", label: "Bulk Supply" },
  { href: "/contact", label: "Contact Us" },
];

export const FOOTER_USEFUL_LINKS = [
  { href: "/bulk-supply", label: "Request Bulk Quote" },
  { href: "/sample-request", label: "Request Sample" },
  { href: "/applications", label: "Applications" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Privacy Policy" },
  { href: "/contact", label: "Terms & Conditions" },
];
