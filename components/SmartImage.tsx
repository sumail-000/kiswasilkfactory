"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { canOptimize } from "@/lib/image-hosts";

/**
 * Drop-in replacement for `next/image` that tolerates arbitrary image links.
 *
 * Images can now come from anywhere the operator pasted a URL from, which
 * creates two failure modes plain `next/image` handles badly:
 *
 *   1. A host missing from `remotePatterns` makes the optimizer return 400.
 *      → Unknown hosts are rendered unoptimised instead.
 *   2. A dead or mistyped link renders as a browser "broken image" icon.
 *      → Failures fall back to a neutral branded placeholder.
 *
 * Same props as `next/image`, so call sites stay unchanged.
 */
export default function SmartImage({ src, alt, className, ...rest }: ImageProps) {
  const source = typeof src === "string" ? src : "";

  // The failure is recorded against the URL that failed, rather than as a plain
  // boolean reset by an effect. A new src is therefore retried automatically,
  // so correcting a bad link in the admin panel recovers without a remount.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === source;

  if (!source || failed) {
    return (
      <span
        aria-label={typeof alt === "string" ? alt : undefined}
        role="img"
        className={`flex items-center justify-center bg-cream text-gold/40 ${className ?? ""}`}
        style={rest.fill ? { position: "absolute", inset: 0 } : undefined}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </span>
    );
  }

  return (
    <Image
      {...rest}
      src={source}
      alt={alt}
      className={className}
      unoptimized={rest.unoptimized ?? !canOptimize(source)}
      onError={() => setFailedSrc(source)}
    />
  );
}
