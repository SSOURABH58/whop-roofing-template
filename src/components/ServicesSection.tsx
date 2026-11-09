import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
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
    <section id="services" className="py-24 bg-white dark:bg-[#0D0E12] font-sans border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header - Understated & Minimal */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] dark:text-white font-display">
            Direct Online Scheduling
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Select a service package below to book instantly through Whop Payments with flexible BNPL financing or reserve your installation crew.
          </p>
        </div>

        {/* 3 Clean Plan Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Plan 1: 4K Drone Inspection ($149) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-7 flex flex-col justify-between bg-[#F8F9FA] dark:bg-[#13151A] hover:border-slate-400 dark:hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Diagnostics
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  100% Credited
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#171A20] dark:text-white">
                  {siteConfig.plans.inspection.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {siteConfig.plans.inspection.tagline}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-bold text-[#171A20] dark:text-white tabular-nums">
                  ${siteConfig.plans.inspection.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">one-time</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                {siteConfig.plans.inspection.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handlePlanClick('inspection', 'inspection')}
                className="w-full h-11 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-[#171A20] dark:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book Drone Scan ($149)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Plan 2: Project Work Order Deposit ($500) - Featured Column */}
          <div className="rounded-2xl border-2 border-[#171A20] dark:border-white p-7 flex flex-col justify-between bg-white dark:bg-[#16181F] shadow-lg relative transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#171A20] text-white dark:bg-white dark:text-[#171A20] text-[11px] font-semibold uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Crew Reservation
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  Refundable
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#171A20] dark:text-white">
                  {siteConfig.plans.deposit.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {siteConfig.plans.deposit.tagline}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-bold text-[#171A20] dark:text-white tabular-nums">
                  ${siteConfig.plans.deposit.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">applied to project</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                {siteConfig.plans.deposit.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#171A20] dark:text-white flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handlePlanClick('deposit', 'deposit')}
                className="w-full h-11 rounded-full bg-[#171A20] text-white hover:bg-black dark:bg-white dark:text-[#171A20] dark:hover:bg-slate-200 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>Reserve Crew ($500)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Plan 3: Roof Maintenance Tune-Up ($299) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-7 flex flex-col justify-between bg-[#F8F9FA] dark:bg-[#13151A] hover:border-slate-400 dark:hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Maintenance
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Seasonal
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#171A20] dark:text-white">
                  {siteConfig.plans.maintenance.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {siteConfig.plans.maintenance.tagline}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-4xl font-bold text-[#171A20] dark:text-white tabular-nums">
                  ${siteConfig.plans.maintenance.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">flat rate</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 pt-4 border-t border-slate-200 dark:border-slate-800">
                {siteConfig.plans.maintenance.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handlePlanClick('maintenance', 'maintenance')}
                className="w-full h-11 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-[#171A20] dark:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book Tune-Up ($299)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
