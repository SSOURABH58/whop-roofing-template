import React from 'react';
import { Camera, Hammer, Wrench, Check, ArrowRight, Zap, Info } from 'lucide-react';
import { siteConfig } from '../config/site';
import { siteImages } from '../assets/images';
import { trackServiceViewed, trackDepositStarted } from '../lib/tracking';

interface ServicesSectionProps {
  onSelectPlan: (plan: { id: string; name: string; price: number; badge?: string; whopPlanId?: string }) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectPlan }) => {

  const handlePlanClick = (
    planKey: 'inspection' | 'deposit' | 'maintenance',
    category: 'inspection' | 'deposit' | 'maintenance' | 'replacement'
  ) => {
    const plan = siteConfig.plans[planKey];
    
    // Fire Whop Pixel custom event: service_viewed
    trackServiceViewed({
      serviceId: plan.id,
      serviceTitle: plan.name,
      price: plan.price,
      category,
    });

    // If deposit, also fire deposit_started
    if (planKey === 'deposit') {
      trackDepositStarted({
        planId: plan.whopPlanId,
        planName: plan.name,
        amount: plan.price,
        setupIntentRequested: true,
      });
    }

    onSelectPlan({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      badge: plan.tagline,
      whopPlanId: plan.whopPlanId,
    });
  };

  return (
    <section id="services" className="py-20 bg-slate-900/60 font-sans border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Whop Certified Services &amp; Transparent Plans
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Upfront Pricing. Zero Surprises.
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            High-ticket roofing simplified into transparent milestone plans. Book directly via Whop Payments with flexible BNPL financing (Klarna, Splitit, Apple Pay).
          </p>
        </div>

        {/* The 3 Core Plans Grid (Required by Bounty) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Plan 1: 21-Point Drone Inspection ($149) */}
          <div className="bg-navy-900 border border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-xl hover:shadow-2xl relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
                  100% Credited
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{siteConfig.plans.inspection.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {siteConfig.plans.inspection.tagline}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white tabular-nums">${siteConfig.plans.inspection.price}</span>
                <span className="text-xs text-slate-400 uppercase font-mono ml-1.5">USD One-Time</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                {siteConfig.plans.inspection.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <button
                onClick={() => handlePlanClick('inspection', 'inspection')}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:text-slate-950"
              >
                <span>{siteConfig.plans.inspection.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Plan 2: Project Work Order Deposit ($500) - Featured Plan */}
          <div className="bg-navy-900 border-2 border-amber-500 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative group transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              Most Popular • Job Reservation
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Hammer className="w-5 h-5 fill-slate-950" />
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                  SetupIntent Vaulted
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{siteConfig.plans.deposit.name}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {siteConfig.plans.deposit.tagline}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white tabular-nums">${siteConfig.plans.deposit.price}</span>
                <span className="text-xs text-amber-400 uppercase font-mono ml-1.5 font-bold">Locks Job &amp; Crew</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-200 pt-3 border-t border-slate-800">
                {siteConfig.plans.deposit.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <button
                onClick={() => handlePlanClick('deposit', 'deposit')}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
              >
                <span>{siteConfig.plans.deposit.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
                <Info className="w-3 h-3 text-slate-500" />
                Remaining balance billed via Whop Invoices on completion.
              </p>
            </div>
          </div>

          {/* Plan 3: Flat-Rate Roof Tune-Up & Flashing Seal ($299) */}
          <div className="bg-navy-900 border border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-xl hover:shadow-2xl relative group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-bold font-mono">
                  Leak Prevention
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">{siteConfig.plans.maintenance.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {siteConfig.plans.maintenance.tagline}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-black text-white tabular-nums">${siteConfig.plans.maintenance.price}</span>
                <span className="text-xs text-slate-400 uppercase font-mono ml-1.5">Flat-Rate Fix</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                {siteConfig.plans.maintenance.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80">
              <button
                onClick={() => handlePlanClick('maintenance', 'maintenance')}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:text-slate-950"
              >
                <span>{siteConfig.plans.maintenance.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Showcase: Residential Architectural & Solar Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="relative rounded-2xl overflow-hidden group border border-slate-800 bg-navy-950">
            <img 
              src={siteImages.restored.medium} 
              alt={siteImages.restored.alt} 
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
            />
            <div className="p-5">
              <h4 className="text-base font-bold text-white">Full Roof Replacements</h4>
              <p className="text-xs text-slate-400 mt-1">
                Class 4 impact-resistant architectural shingles engineered to withstand 130 MPH winds and severe Texas hail.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group border border-slate-800 bg-navy-950">
            <img 
              src={siteImages.solar.medium} 
              alt={siteImages.solar.alt} 
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
            />
            <div className="p-5">
              <h4 className="text-base font-bold text-white">Integrated Solar Shingles</h4>
              <p className="text-xs text-slate-400 mt-1">
                Zero bulky racks. Nailable solar shingles that generate clean electricity while qualifying for the 30% Federal Tax Credit.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group border border-slate-800 bg-navy-950">
            <img 
              src={siteImages.drone.medium} 
              alt={siteImages.drone.alt} 
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" 
              loading="lazy"
            />
            <div className="p-5">
              <h4 className="text-base font-bold text-white">Thermal Drone Diagnostics</h4>
              <p className="text-xs text-slate-400 mt-1">
                Infrared moisture detection identifies hidden deck rot and hail fractures without damaging your delicate roof tiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
