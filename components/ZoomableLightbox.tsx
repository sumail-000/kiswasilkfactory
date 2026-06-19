"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2, Minimize2, Move } from "lucide-react";

type ZoomableLightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
};

export default function ZoomableLightbox({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title = "Fabric Visualizer",
}: ZoomableLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const touchStartDist = useRef(0);
  const touchStartScale = useRef(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Synchronize index when initialIndex changes
  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Handle auto-zoom-in entry animation when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger smooth transition
      const timer = setTimeout(() => {
        setScale(1.15); // Auto-zooms slightly to show detail & responsiveness
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, images]);

  // Bind raw non-passive event listeners to bypass browser defaults & prevent warnings
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isOpen) return;

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
  }, [isOpen]);

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

  const handleNext = () => {
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % images.length);
    setScale(1.15); // Auto zoom on next image
    setPosition({ x: 0, y: 0 });
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1.15); // Auto zoom on prev image
    setPosition({ x: 0, y: 0 });
    setTimeout(() => setIsTransitioning(false), 200);
  };

  // Drag Handlers for Panning
  const startDrag = (clientX: number, clientY: number) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    // Bounds check to avoid dragging too far out of screen
    let newX = clientX - dragStart.current.x;
    let newY = clientY - dragStart.current.y;

    // Estimate boundary limits based on container and scale
    if (containerRef.current) {
      const maxW = (containerRef.current.clientWidth * (scale - 1)) / 2;
      const maxH = (containerRef.current.clientHeight * (scale - 1)) / 2;
      newX = Math.max(-maxW - 100, Math.min(maxW + 100, newX));
      newY = Math.max(-maxH - 100, Math.min(maxH + 100, newY));
    }

    setPosition({ x: newX, y: newY });
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    moveDrag(e.clientX, e.clientY);
  };

  // Touch handlers for mobile (Pinch & Single touch pan)
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

  if (!isOpen || !images || images.length === 0) return null;

  const activeImage = images[activeIndex];
  const hasMultiple = images.length > 1;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 transition-all duration-300">
      
      {/* Background Close Area */}
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose} 
      />

      {/* Header Controls (Title + Close) */}
      <div className="w-full flex items-center justify-between text-white max-w-6xl border-b border-white/10 pb-3.5 z-10">
        <div>
          <span className="text-gold text-[0.62rem] font-bold tracking-[0.22em] uppercase">
            Interactive Texture Visualizer
          </span>
          <h3 className="font-display font-medium text-base text-white/90 truncate max-w-[280px] sm:max-w-md">
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
          title="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Frame with Zoom/Pan */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-hidden my-4 z-10"
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons */}
        {hasMultiple && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full border border-white/5 hover:scale-105 transition-all shadow-lg"
              title="Previous Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-30 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full border border-white/5 hover:scale-105 transition-all shadow-lg"
              title="Next Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Zoomable Target Container */}
        <div
          ref={imageRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`relative w-full h-full max-h-[75vh] flex items-center justify-center select-none ${
            scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isTransitioning ? "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          }}
        >
          <Image
            src={activeImage}
            alt={title}
            fill
            sizes="90vw"
            className="object-contain pointer-events-none"
            priority
          />
        </div>

        {/* Drag Helper Cue (Displays only when zoomed in) */}
        {scale > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-navy/80 backdrop-blur-xs text-white text-[10px] font-medium py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-md z-20 pointer-events-none">
            <Move className="w-3.5 h-3.5 text-gold" />
            Drag or swipe to pan the fabric texture
          </div>
        )}
      </div>

      {/* Zoom Toolbar & Counter */}
      <div className="w-full max-w-md bg-navy/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 flex items-center justify-between text-white z-10 shadow-xl mb-2">
        {/* Zoom Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 p-2 rounded-full transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span 
            onClick={resetZoom}
            className="text-[10px] font-bold tracking-wider text-gold hover:text-white cursor-pointer select-none bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all uppercase"
            title="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 4}
            className="text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 p-2 rounded-full transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Info / Navigation Indicators */}
        <div className="text-[10px] font-bold tracking-widest text-white/50 uppercase select-none">
          {hasMultiple ? `Fabric ${activeIndex + 1} of ${images.length}` : "Texture Preview"}
        </div>
      </div>
    </div>
  );
}
