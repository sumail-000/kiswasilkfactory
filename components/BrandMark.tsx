import Link from "next/link";
import { SITE } from "@/lib/site";

export default function BrandMark({
  light = false,
}: {
  light?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        className={`font-display relative grid h-10 w-10 place-items-center text-[1.25rem] italic ${light ? "border-ivory/50 text-ivory border" : "border-charcoal text-charcoal border"}`}
      >
        K
        <span
          className={`pointer-events-none absolute inset-1 ${light ? "border-gold border" : "border-gold border"}`}
        />
      </span>
      <span className="leading-none">
        <span
          className={`font-display block text-[1.55rem] font-medium tracking-[0.02em] ${light ? "text-ivory" : "text-charcoal"}`}
        >
          {SITE.brand}
        </span>
        <span
          className={`mt-1 block text-[0.62rem] font-medium tracking-[0.32em] uppercase ${light ? "text-ivory/60" : "text-muted"}`}
        >
          {SITE.brandSubtitle}
        </span>
      </span>
    </Link>
  );
}
