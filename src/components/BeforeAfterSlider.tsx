import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';
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
    <section className="py-20 bg-slate-950 font-sans border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curb Appeal Transformation
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Interactive Storm Damage vs. Master Restoration
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Drag the slider to see how our certified crews transform weathered, storm-compromised shingles into 50-year architectural slate.
          </p>
        </div>

        {/* The Interactive Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl select-none cursor-ew-resize group"
          >
            {/* "After" Image (Background Full View) */}
            <img
              src={siteImages.restored.large}
              srcSet={siteImages.restored.srcset}
              sizes="(max-width: 1024px) 100vw, 900px"
              alt="After: Pristine architectural slate roof"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              loading="lazy"
            />
            {/* After Tag */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-navy-950/90 border border-emerald-500/50 text-emerald-400 text-xs font-bold font-mono tracking-wider flex items-center gap-1.5 shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              AFTER: RESTORED SLATE
            </div>

            {/* "Before" Image (Clipped Left Side) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={siteImages.stormDamaged.large}
                srcSet={siteImages.stormDamaged.srcset}
                sizes="(max-width: 1024px) 100vw, 900px"
                alt="Before: Storm damaged weathered roof"
                className="absolute inset-y-0 left-0 h-full object-cover object-center max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                loading="lazy"
              />
              {/* Before Tag */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-amber-500/50 text-amber-400 text-xs font-bold font-mono tracking-wider shadow-lg">
                BEFORE: STORM DAMAGED
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute inset-y-0 z-20 w-1 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-slate-950/50">
                <MoveHorizontal className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Metric Badges Below Slider */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-center">
              <span className="font-bold text-white block text-sm">$8,450 Recovered</span>
              <span className="text-slate-400 text-[11px]">Via Certified Insurance Claim Supplement</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-center">
              <span className="font-bold text-white block text-sm">1-Day Turnaround</span>
              <span className="text-slate-400 text-[11px]">Complete Tear-Off &amp; Installation</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 text-center">
              <span className="font-bold text-white block text-sm">Class 4 Hail Rating</span>
              <span className="text-slate-400 text-[11px]">Up to 28% Discount on Home Insurance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
