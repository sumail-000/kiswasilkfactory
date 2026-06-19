import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

export default function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
        <Image
          src="/logos/header_logo.jpeg"
          alt="Kiswa Silk Factory Logo"
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
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
