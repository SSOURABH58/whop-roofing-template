import React from 'react';
import { Shield, Star, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { siteImages } from '../assets/images';

interface HeroProps {
  onRequestEstimate: () => void;
  onBookInspection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestEstimate, onBookInspection }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      {/* Background Image with responsive srcset and progressive blur-up */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteImages.hero.src}
          srcSet={siteImages.hero.srcset}
          sizes="100vw"
          alt={siteImages.hero.alt}
          width={siteImages.hero.width}
          height={siteImages.hero.height}
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform duration-1000"
        />
        {/* Architectural Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-navy-950/85 to-navy-950/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        {/* Verified Social Proof Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-amber-500/40 text-xs text-slate-200 mb-6 backdrop-blur-md shadow-lg shadow-amber-500/10">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-white">4.9 / 5.0</span>
          <span className="text-slate-400">• Over 640+ Verified Homeowners</span>
          <span className="hidden sm:inline text-amber-400 font-semibold">• Top 2% US Contractor</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-[1.1] font-display">
          Architectural Roofing &amp; Solar. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            Built to Weather Any Storm.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Certified Master Elite® contractor. Transparent milestone pricing powered by Whop, 
          0% financing for 18 months, and lifetime non-prorated warranties.
        </p>

        {/* Dual-Action Conversion Fork */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md sm:max-w-xl mx-auto">
          {/* Primary Action: Free Estimate */}
          <button
            onClick={onRequestEstimate}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold text-base transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 group"
          >
            <span>Request Instant Estimate</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Action: Book $149 Drone Inspection */}
          <button
            onClick={onBookInspection}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-white font-semibold text-base border border-slate-700 hover:border-slate-500 backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Book Drone Inspection ($149)</span>
          </button>
        </div>

        {/* Key Guarantees Row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-slate-300 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-navy-950/40 backdrop-blur-sm border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>$149 100% Credited to Work</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-navy-950/40 backdrop-blur-sm border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>0% APR via Whop Payments</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-navy-950/40 backdrop-blur-sm border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>50-Year Non-Prorated Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-navy-950/40 backdrop-blur-sm border border-slate-800/60">
            <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>$2M Fully Insured &amp; Bonded</span>
          </div>
        </div>
      </div>
    </section>
  );
};
