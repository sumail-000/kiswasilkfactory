import Link from "next/link";
import { SITE, FOOTER_FABRIC_LINKS } from "@/lib/site";
import BrandMark from "./BrandMark";

const COMPANY_LINKS = [
  { href: "/about", label: "About Kiswa" },
  { href: "/quality", label: "Quality & Production" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Fabric Guide" },
];

const INQUIRE_LINKS = [
  { href: "/sample-request", label: "Sample Request" },
  { href: "/bulk-inquiry", label: "Bulk Inquiry / RFQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/78 pt-20 pb-6">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <BrandMark light />
            <p className="mt-6 max-w-[38ch] text-[0.92rem] leading-[1.7]">
              Pakistan-based silk textile mill producing finished fabric end-to-end —
              from raw thread to finished cloth — for fashion houses, designers, and
              wholesale buyers worldwide.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { label: "Instagram", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Facebook", href: "#" },
                { label: "WhatsApp", href: `https://wa.me/${SITE.phoneIntl}` },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="hover:bg-gold-deep border-ivory/20 hover:border-gold-deep grid h-10 w-10 place-items-center rounded-full border transition"
                >
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Fabrics" links={FOOTER_FABRIC_LINKS} />
          <FooterCol title="Company" links={COMPANY_LINKS} />
          <div>
            <h5 className="text-ivory mb-4 text-[0.78rem] font-semibold tracking-[0.22em] uppercase">
              Inquire
            </h5>
            {INQUIRE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-gold block py-1 text-[0.92rem] transition"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-5">
              <p className="text-ivory font-display mb-1 text-[1.05rem]">Email</p>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-gold text-[0.92rem] transition"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-ivory/10 mt-16 flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-[0.78rem] tracking-[0.06em] text-white/50">
          <span>
            © {new Date().getFullYear()} {SITE.brand} Textile Mills · All rights reserved.
          </span>
          <span>{SITE.address.full}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h5 className="text-ivory mb-4 text-[0.78rem] font-semibold tracking-[0.22em] uppercase">
        {title}
      </h5>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="hover:text-gold block py-1 text-[0.92rem] transition"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const stroke = "currentColor";
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.4,
  } as const;
  if (name === "Instagram") {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    );
  }
  if (name === "LinkedIn") {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="18" height="18" />
        <path d="M7 10v7M7 7v0M11 17v-4a3 3 0 016 0v4M11 10v7" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg {...props}>
        <path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V8z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M3 21l1.7-5A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1L3 21z" />
    </svg>
  );
}
