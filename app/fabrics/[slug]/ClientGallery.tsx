"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import ZoomableLightbox from "@/components/ZoomableLightbox";

export default function ClientGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActive((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    /* h-full + flex-col so this fills whatever height the grid row is */
    <div className="flex flex-col h-full">

      {/* Main image — flex-1 means it grows to fill remaining height */}
      <div 
        className="relative flex-1 min-h-[280px] overflow-hidden rounded-sm bg-cream cursor-pointer group/img"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          key={images[active]}
          src={images[active]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-750 group-hover/img:scale-[1.03]"
          priority
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-navy p-3 rounded-full shadow-md scale-90 group-hover/img:scale-100 transition-all duration-300">
            <ZoomIn className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Thumbnail tray — fixed at bottom */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 mt-3 shrink-0">
          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Thumbs */}
          <div className="flex flex-1 gap-2">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative flex-1 h-[80px] overflow-hidden rounded-sm border-2 transition-all ${
                  active === i
                    ? "border-gold opacity-100"
                    : "border-transparent opacity-55 hover:opacity-85"
                }`}
              >
                <Image
                  src={img}
                  alt={`${name} ${i + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <ZoomableLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={active}
        title={name}
      />
    </div>
  );
}
