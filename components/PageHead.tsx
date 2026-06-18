import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHead({
  eyebrow,
  title,
  lede,
  imageSrc = "/assets/silk-swirl.jpg",
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  imageSrc?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="bg-cream border-b border-border/40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-14">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <p className="eyebrow text-gold text-xs font-semibold tracking-widest leading-none m-0">{eyebrow}</p>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-navy text-[clamp(2.2rem,4.5vw,48px)] leading-[1.15] mb-4">
            {title}
          </h1>

          {/* Gold Wave Ornament Divider */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-px bg-gold/30" />
            <svg width="20" height="10" viewBox="0 0 60 20" fill="currentColor" className="text-gold/60">
              <path d="M30 10C20 4 8 14 0 10c8-4 20 6 30 0 10-6 22 4 30 0-8-4-20 6-30 0z" opacity=".85"/>
            </svg>
            <span className="w-12 h-px bg-gold/30" />
          </div>

          {/* Lede description */}
          <p className="text-foreground/75 text-[0.92rem] leading-relaxed max-w-[480px] font-sans">
            {lede}
          </p>
        </div>

        {/* Right Fabric Image */}
        <div className="relative hidden lg:block min-h-[360px]">
          <Image
            src={imageSrc}
            alt="Premium silk fabric"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
          {/* Gradient overlay to smoothly blend fabric into the cream background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, oklch(0.97 0.015 85) 0%, transparent 40%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
