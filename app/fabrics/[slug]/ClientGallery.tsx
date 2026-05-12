"use client";

import Image from "next/image";
import { useState } from "react";

export default function ClientGallery({
  hero,
  thumbs,
  alt,
}: {
  hero: string;
  thumbs: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const heroSrc =
    active === 0
      ? hero
      : thumbs[active]?.replace("w=600", "w=1600") || hero;

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="bg-cream relative aspect-[4/5] overflow-hidden">
        <Image
          key={heroSrc}
          src={heroSrc}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {thumbs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`relative aspect-square w-full overflow-hidden transition-opacity ${active === i ? "opacity-100" : "opacity-65 hover:opacity-100"}`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={t}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
