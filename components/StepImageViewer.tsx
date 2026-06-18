"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

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

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-300">
          {/* Header */}
          <div className="w-full flex items-center justify-between text-white max-w-5xl border-b border-white/10 pb-4">
            <div>
              <p className="text-gold text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                Step {stepNumber} Visual Gallery
              </p>
              <h3 className="font-display font-medium text-lg text-white/90">
                {title}
              </h3>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Display Area */}
          <div className="relative w-full max-w-4xl aspect-[4/3] my-auto flex items-center justify-center">
            {/* Left Button */}
            {hasMultiple && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image frame */}
            <div className="relative w-full h-full max-h-[70vh] rounded-sm overflow-hidden border border-white/10">
              <Image
                src={activeImage}
                alt={`${title} full size`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Right Button */}
            {hasMultiple && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Footer Counter */}
          <div className="text-white/55 text-xs tracking-widest uppercase pb-2">
            Image {activeIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
