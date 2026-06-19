"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import ZoomableLightbox from "@/components/ZoomableLightbox";

type StepImageViewerProps = {
  images: string[];
  title: string;
  stepNumber: number;
};

export default function StepImageViewer({
  images,
  title,
  stepNumber,
}: StepImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  const activeImage = images[activeIndex];
  const hasMultiple = images.length > 1;

  return (
    <div className="w-full space-y-4">
      {/* Primary Image Viewport */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-cream border border-border/30 shadow-sm group">
        <Image
          src={activeImage}
          alt={`${title} — Step ${stepNumber}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
          priority={stepNumber <= 3}
        />

        {/* Hover Controls */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Fullscreen Trigger Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white text-navy p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 z-10"
          title="Expand Visual"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Chevron Navigation (Only if multiple images) */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Miniature counter badge */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-3 bg-navy/80 backdrop-blur-xs text-white text-[0.62rem] font-bold px-2 py-1 rounded-sm tracking-wider">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Bar (Only if multiple images) */}
      {hasMultiple && (
        <div className="flex flex-wrap gap-2 pt-1">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 sm:w-20 aspect-[4/3] rounded-sm overflow-hidden bg-cream border transition-all duration-200 ${
                  isActive
                    ? "border-gold ring-1 ring-gold shadow-xs scale-102"
                    : "border-border/60 opacity-60 hover:opacity-100 hover:scale-102"
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      <ZoomableLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        initialIndex={activeIndex}
        title={`Step ${stepNumber} — ${title}`}
      />
    </div>
  );
}
