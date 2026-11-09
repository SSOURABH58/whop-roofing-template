import React from 'react';
import { badges } from '../assets/images';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-navy-950 border-y border-slate-800 py-6 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold block">
            National Contractor Standards
          </span>
          <span className="text-sm font-bold text-white">
            Manufactured &amp; Backed by North America's Top Roofing Authorities
          </span>
        </div>

        {/* Badges Container */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <img 
            src={badges.gafMasterElite} 
            alt="GAF Master Elite Certified Contractor" 
            className="h-10 w-auto hover:opacity-95 transition-opacity" 
            loading="lazy"
          />
          <img 
            src={badges.owensCorningPlatinum} 
            alt="Owens Corning Platinum Preferred Contractor" 
            className="h-10 w-auto hover:opacity-95 transition-opacity" 
            loading="lazy"
          />
          <img 
            src={badges.warranty50yr} 
            alt="50-Year Non-Prorated Warranty" 
            className="h-10 w-auto hover:opacity-95 transition-opacity" 
            loading="lazy"
          />
          <img 
            src={badges.licensedInsured} 
            alt="$2,000,000 Bonded and Insured" 
            className="h-10 w-auto hover:opacity-95 transition-opacity" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
