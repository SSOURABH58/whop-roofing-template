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
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-slate-100 dark:bg-slate-950 font-sans transition-colors">
      
      {/* Edge-to-Edge Full-Bleed Background Photography */}
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
        {/* Understated Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75 dark:from-black/60 dark:via-black/40 dark:to-black/85" />
      </div>

      {/* Top / Center Headline & Copy */}
      <div className="relative z-10 pt-20 sm:pt-28 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.08] font-display">
          Architectural Roofing
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-xl text-slate-100/90 font-normal max-w-2xl mx-auto tracking-normal">
          {siteConfig.business.tagline || 'Engineered for Extremes. Built for Generations.'}
        </p>
        <p className="mt-1 text-xs sm:text-sm text-slate-200/75 max-w-xl mx-auto">
          Certified Master Elite® contractor. Transparent milestone pricing powered by Whop.
        </p>

        {/* Dual High-Contrast Action Pills */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-md mx-auto">
          <button
            type="button"
            onClick={onRequestEstimate}
            className="w-full sm:w-auto min-w-[200px] h-12 px-7 rounded-full bg-white text-[#171A20] hover:bg-slate-100 font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          
          <button
            type="button"
            onClick={onBookInspection}
            className="w-full sm:w-auto min-w-[200px] h-12 px-7 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/30 font-semibold text-xs tracking-wider uppercase transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Drone Scan $149</span>
          </button>
        </div>
      </div>

      {/* Tesla-Style Bottom Spec Metrics Bar */}
      <div className="relative z-10 w-full pb-10 sm:pb-12 pt-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center text-white border-t border-white/20 pt-6 backdrop-blur-[2px]">
          <div>
            <div className="text-xl sm:text-3xl font-bold tracking-tight">50-Yr</div>
            <div className="text-[10px] sm:text-xs text-slate-200 tracking-wider uppercase mt-0.5">
              Warranty
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tracking-tight">Class 4</div>
            <div className="text-[10px] sm:text-xs text-slate-200 tracking-wider uppercase mt-0.5">
              Impact Rated
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold tracking-tight">24-Hr</div>
            <div className="text-[10px] sm:text-xs text-slate-200 tracking-wider uppercase mt-0.5">
              Rapid Dispatch
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
