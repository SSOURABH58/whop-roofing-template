import React from 'react';
import { badges } from '../assets/images';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#F8F9FA] border-b border-slate-200 py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-mono text-slate-500 font-semibold block">
            National Contractor Standards
          </span>
          <span className="text-sm font-semibold text-slate-800">
            Backed by North America’s Leading Roofing Manufacturers
          </span>
        </div>

        {/* Minimal Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 opacity-90 hover:opacity-100 transition-opacity">
          <img 
            src={badges.gafMasterElite} 
            alt="GAF Master Elite Certified Contractor" 
            className="h-9 w-auto" 
            loading="lazy"
          />
          <img 
            src={badges.owensCorningPlatinum} 
            alt="Owens Corning Platinum Preferred Contractor" 
            className="h-9 w-auto" 
            loading="lazy"
          />
          <img 
            src={badges.warranty50yr} 
            alt="50-Year Non-Prorated Warranty" 
            className="h-9 w-auto" 
            loading="lazy"
          />
          <img 
            src={badges.licensedInsured} 
            alt="$2,000,000 Bonded and Insured" 
            className="h-9 w-auto" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
