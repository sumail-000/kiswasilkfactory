"use client";

import { useState, useEffect, useRef } from "react";
import SmartImage from "@/components/SmartImage";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Move } from "lucide-react";

type ZoomableVisualAreaProps = {
  src: string;
  alt: string;
  onPrev: () => void;
  onNext: () => void;
  hasMultiple: boolean;
};

export default function ZoomableVisualArea({
  src,
  alt,
  onPrev,
  onNext,
  hasMultiple,
}: ZoomableVisualAreaProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const touchStartDist = useRef(0);
  const touchStartScale = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Reset zoom on image change
  useEffect(() => {
    setScale(1.15); // Auto zoom slightly on image load for feedback
    setPosition({ x: 0, y: 0 });
  }, [src]);

  // Bind raw non-passive event listeners to bypass browser defaults & prevent warnings
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 0.08;
      setScale((prev) => {
        const delta = e.deltaY < 0 ? zoomFactor : -zoomFactor;
        const nextScale = Math.max(1, Math.min(prev + delta, 4));
        if (nextScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return nextScale;
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        if (touchStartDist.current > 0) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const dist = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );
          const ratio = dist / touchStartDist.current;
          const nextScale = Math.max(1, Math.min(touchStartScale.current * ratio, 4));
          setScale(nextScale);
          if (nextScale === 1) {
            setPosition({ x: 0, y: 0 });
          }
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const resetZoom = () => {
    setIsTransitioning(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handleZoomIn = () => {
    setIsTransitioning(true);
    setScale((prev) => Math.min(prev + 0.3, 4));
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handleZoomOut = () => {
    setIsTransitioning(true);
    setScale((prev) => {
      const nextScale = Math.max(prev - 0.3, 1);
      if (nextScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return nextScale;
    });
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPrev();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNext();
  };

  // Panning logic
  const startDrag = (clientX: number, clientY: number) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    let newX = clientX - dragStart.current.x;
    let newY = clientY - dragStart.current.y;

    if (containerRef.current) {
      const maxW = (containerRef.current.clientWidth * (scale - 1)) / 2;
      const maxH = (containerRef.current.clientHeight * (scale - 1)) / 2;
      newX = Math.max(-maxW - 50, Math.min(maxW + 50, newX));
      newY = Math.max(-maxH - 50, Math.min(maxH + 50, newY));
    }
    setPosition({ x: newX, y: newY });
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Touch triggers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsDragging(false);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      touchStartDist.current = dist;
      touchStartScale.current = scale;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    touchStartDist.current = 0;
    endDrag();
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden min-h-[320px] md:min-h-[400px] select-none"
      onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Controls */}
      {hasMultiple && (
        <>
          <button
            onClick={handlePrevClick}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/60 text-white p-2.5 rounded-full border border-white/5 z-20 transition-all hover:scale-105"
            title="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/60 text-white p-2.5 rounded-full border border-white/5 z-20 transition-all hover:scale-105"
            title="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Zoomable Image Wrapper */}
      <div
        ref={imageRef}
        onMouseDown={(e) => {
          e.preventDefault();
          startDrag(e.clientX, e.clientY);
        }}
        onTouchStart={handleTouchStart}
        className={`relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center ${
          scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isTransitioning ? "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
        }}
      >
        <SmartImage
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-contain pointer-events-none"
          priority
        />
      </div>

      {/* Floating Zoom Controls Overlay */}
      <div className="absolute bottom-3 right-3 bg-navy/85 backdrop-blur-xs border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2 text-white z-20 shadow-md">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          disabled={scale <= 1}
          className="hover:text-gold disabled:opacity-35 p-1 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span 
          onClick={(e) => { e.stopPropagation(); resetZoom(); }}
          className="text-[9px] font-bold tracking-wider text-gold hover:text-white cursor-pointer select-none bg-white/5 px-2.5 py-1 rounded-full uppercase"
          title="Reset Zoom"
        >
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          disabled={scale >= 4}
          className="hover:text-gold disabled:opacity-35 p-1 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Panning Instruction overlay */}
      {scale > 1 && (
        <div className="absolute bottom-3 left-3 bg-navy/85 backdrop-blur-xs text-white text-[9px] font-semibold py-1.5 px-3 rounded-full flex items-center gap-1 shadow-md z-20 pointer-events-none">
          <Move className="w-3 h-3 text-gold" />
          Drag or swipe to pan
        </div>
      )}
    </div>
  );
}
