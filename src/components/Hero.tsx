import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { siteImages } from '../assets/images';
import { siteConfig } from '../config/site';

interface HeroProps {
  onRequestEstimate: () => void;
  onBookInspection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestEstimate, onBookInspection }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-white font-sans border-b border-slate-200">
      
      {/* Edge-to-Edge Architectural Photography with Luminous White Atmosphere */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source type="image/webp" srcSet={siteImages.hero.webpSrcset} sizes="100vw" />
          <img
            src={siteImages.hero.src}
            srcSet={siteImages.hero.srcset}
            sizes="100vw"
            alt={siteImages.hero.alt}
            width={siteImages.hero.width}
            height={siteImages.hero.height}
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        {/* Crisp Light-Mode Overlay: Preserves Architectural Detail while Delivering True White Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/75 to-white" />
      </div>

      {/* Top / Center Headline & Copy in Deep Contrast Charcoal */}
      <div className="relative z-10 pt-20 sm:pt-28 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>GAF Master Elite® Certified Contractor • Dallas-Fort Worth</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#171A20] tracking-tight leading-[1.08] font-display">
          Architectural Roofing
        </h1>
        <p className="mt-4 sm:mt-5 text-base sm:text-xl text-slate-700 font-normal max-w-2xl mx-auto tracking-normal">
          {siteConfig.business.tagline || 'Engineered for Extremes. Built for Generations.'}
        </p>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Certified manufacturer-backed contractor. Transparent milestone pricing powered by Whop.
        </p>

        {/* Dual High-Contrast Action Pills */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-md mx-auto">
          <button
            type="button"
            onClick={onRequestEstimate}
            className="w-full sm:w-auto min-w-[200px] h-12 px-7 rounded-full bg-[#171A20] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            type="button"
            onClick={onBookInspection}
            className="w-full sm:w-auto min-w-[200px] h-12 px-7 rounded-full bg-white text-[#171A20] hover:bg-slate-50 border border-slate-300 font-semibold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Drone Scan $149</span>
          </button>
        </div>
      </div>

      {/* Tesla-Style Bottom Spec Metrics Bar in High-Contrast Light Mode */}
      <div className="relative z-10 w-full pb-10 sm:pb-12 pt-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center text-[#171A20] border-t border-slate-200/90 pt-6">
          <div>
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-[#171A20]">50-Yr</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Warranty
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-[#171A20]">Class 4</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Impact Rated
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-[#171A20]">24-Hr</div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wider uppercase mt-0.5">
              Rapid Dispatch
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
