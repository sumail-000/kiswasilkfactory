import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHead({
  eyebrow,
  title,
  lede,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  breadcrumb: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-charcoal text-ivory relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="page-head-pattern pointer-events-none absolute inset-0" />
      <div className="container-x relative">
        <nav className="text-ivory/55 mb-8 flex flex-wrap items-center gap-2 text-[0.74rem] tracking-[0.18em] uppercase">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              {b.href ? (
                <Link href={b.href} className="text-gold-soft">
                  {b.label}
                </Link>
              ) : (
                <span>{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span className="opacity-60">/</span>}
            </span>
          ))}
        </nav>
        <p className="eyebrow text-gold-soft mb-6">{eyebrow}</p>
        <h1 className="text-ivory mb-6 max-w-[18ch]">{title}</h1>
        <p className="lede text-ivory/75">{lede}</p>
      </div>
    </section>
  );
}
