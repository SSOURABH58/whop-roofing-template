import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FinancingSectionProps {
  onExplorePlans: () => void;
}

export const FinancingSection: React.FC<FinancingSectionProps> = ({ onExplorePlans }) => {
  const [projectEstimate, setProjectEstimate] = useState<number>(18000);
  const [termMonths] = useState<number>(84);

  // Simple monthly estimate formula: 84mo @ ~8.99% APR, or 0% APR promo terms
  const estimatedMonthly = Math.round((projectEstimate / termMonths) * 1.08);

  return (
    <section id="financing" className="py-24 bg-white dark:bg-[#0D0E12] font-sans border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Financing Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400">
              Flexible Capital
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] dark:text-white font-display leading-[1.15]">
              $0 Down Financing. <br />
              <span className="font-normal text-slate-600 dark:text-slate-400">
                Instant Approval via Whop.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Major exterior renovations shouldn't tie up emergency cash. Through integrated Whop Payment Elements, qualifying homeowners can split project costs into manageable monthly installments with leading BNPL partners.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>$0 down payment options</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Soft credit check (no score hit)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Klarna, Affirm &amp; Splitit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>1-tap Apple Pay &amp; Google Pay</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onExplorePlans}
                className="h-11 px-7 rounded-full bg-[#171A20] text-white hover:bg-black dark:bg-white dark:text-[#171A20] dark:hover:bg-slate-200 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <span>View Plans &amp; Deposits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Monthly Payment Calculator Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-7 sm:p-8 bg-[#F8F9FA] dark:bg-[#13151A] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  Payment Estimator
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  84-Month Term
                </span>
              </div>

              {/* Slider for Project Scope */}
              <div className="space-y-6 pt-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                    <span>Project Scope</span>
                    <span className="text-base font-bold text-[#171A20] dark:text-white tabular-nums">
                      ${projectEstimate.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8000"
                    max="45000"
                    step="1000"
                    value={projectEstimate}
                    onChange={(e) => setProjectEstimate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#171A20] dark:accent-white"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1.5">
                    <span>$8k (Repair)</span>
                    <span>$22k (Full Shingle)</span>
                    <span>$45k (Architectural Slate)</span>
                  </div>
                </div>

                {/* Calculated Result Box */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D0E12] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-medium">
                      Estimated Monthly
                    </span>
                    <span className="text-3xl font-bold text-[#171A20] dark:text-white tabular-nums">
                      ${estimatedMonthly}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400"> / month</span>
                  </div>

                  <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                    <div>0% APR promo terms</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium">Instant Pre-Check</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  Estimates are based on standard 84-month amortization or 0% interest promotional periods. Actual financing rates are surfaced dynamically during Whop checkout.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
