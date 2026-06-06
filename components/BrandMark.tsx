import Link from "next/link";
import { SITE } from "@/lib/site";

export default function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      {/* KSF seal badge SVG */}
      <span className={`shrink-0 ${light ? "text-white" : "text-[#1a2340]"}`}>
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.5"/>
          <text 
            x="50" 
            y="57" 
            textAnchor="middle" 
            fill="currentColor" 
            fontSize="22" 
            fontWeight="bold" 
            fontFamily="var(--font-serif-var), Georgia, serif"
            letterSpacing="1"
          >
            KSF
          </text>
          {/* Simulating circular text */}
          <path id="textPathTop" d="M 22 50 A 28 28 0 0 1 78 50" fill="none" />
          <path id="textPathBottom" d="M 78 50 A 28 28 0 0 1 22 50" fill="none" />
          <text fontSize="6.5" fontWeight="bold" fill="currentColor" letterSpacing="1.2">
            <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
              PREMIUM QUALITY
            </textPath>
          </text>
          <text fontSize="6.5" fontWeight="bold" fill="currentColor" letterSpacing="1.2">
            <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
              SILK FABRIC
            </textPath>
          </text>
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block text-[1.2rem] font-bold tracking-wide uppercase font-serif ${
            light ? "text-white" : "text-[#1a2340]"
          }`}
          style={{ fontFamily: "var(--font-serif-var), Georgia, serif" }}
        >
          {SITE.brand}
        </span>
        <span
          className={`mt-1.5 block text-[0.62rem] font-medium tracking-[0.05em] ${
            light ? "text-white/60" : "text-gray-500"
          }`}
        >
          {SITE.brandSubtitle}
        </span>
      </span>
    </Link>
  );
}
