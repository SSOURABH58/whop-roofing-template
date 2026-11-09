import React, { useState, useRef, useCallback } from 'react';
import { siteImages } from '../assets/images';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min((x / rect.width) * 100, 95));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 bg-[#F8F9FA] font-sans border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
            Restoration Precision
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] font-display">
            Before &amp; After
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Slide horizontally to compare storm-weathered shingles with certified architectural replacement.
          </p>
        </div>

        {/* Minimalist Split Slider */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative h-[340px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-200 shadow-md select-none cursor-ew-resize group bg-slate-100"
        >
          {/* "After" Image (Right / Base) */}
          <img
            src={siteImages.restored.large}
            srcSet={siteImages.restored.srcset}
            sizes="(max-width: 1024px) 100vw, 960px"
            alt="After: Restored architectural roof"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            loading="lazy"
          />

          {/* Understated "After" Pill */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/90 text-[#171A20] border border-slate-200/80 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase shadow-sm">
            After: Restored
          </div>

          {/* "Before" Image (Clipped Left Layer) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={siteImages.stormDamaged.large}
              srcSet={siteImages.stormDamaged.srcset}
              sizes="(max-width: 1024px) 100vw, 960px"
              alt="Before: Storm damaged weathered roof"
              className="absolute inset-y-0 left-0 h-full object-cover object-center max-w-none"
              style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              loading="lazy"
            />
            {/* Understated "Before" Pill */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/90 text-[#171A20] border border-slate-200/80 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase shadow-sm">
              Before: Storm Impact
            </div>
          </div>

          {/* Clean Vertical Divider & Tesla-Style Circular Knob */}
          <div
            className="absolute inset-y-0 z-20 w-0.5 bg-white pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#171A20] flex items-center justify-center shadow-lg border border-slate-200">
              <span className="text-xs font-bold select-none tracking-tighter">⬌</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
