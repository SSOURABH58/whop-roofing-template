import React, { useState } from 'react';
import { DollarSign, Percent, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FinancingSectionProps {
  onExplorePlans: () => void;
}

export const FinancingSection: React.FC<FinancingSectionProps> = ({ onExplorePlans }) => {
  const [projectEstimate, setProjectEstimate] = useState<number>(18000);
  const [termMonths, setTermMonths] = useState<number>(84);

  // Simple monthly estimate formula: 84mo @ ~8.99% APR, or 0% APR promo terms
  const estimatedMonthly = Math.round((projectEstimate / termMonths) * 1.08);

  return (
    <section id="financing" className="py-20 bg-navy-950 font-sans border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Financing Callout Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5" />
              0% Interest for 18 Months Available
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight font-display">
              Protect Your Home Today. <br />
              <span className="text-amber-400">Pay Over Time via Whop.</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Roofing is a high-ticket investment. Because our checkout runs entirely on Whop Payment Elements, premium financing partners surface automatically at checkout for approved homeowners.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-200">
              <div className="p-3 bg-navy-900 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>$0 Down Payment Options</span>
              </div>
              <div className="p-3 bg-navy-900 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Soft-Pull Rate Check (No Credit Hit)</span>
              </div>
              <div className="p-3 bg-navy-900 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Klarna, Splitit &amp; Affirm</span>
              </div>
              <div className="p-3 bg-navy-900 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Apple Pay &amp; Google Pay 1-Click</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplorePlans}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>View Plans &amp; Deposits</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Payment Slider Card */}
          <div className="lg:col-span-6">
            <div className="bg-navy-900 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="font-bold text-white text-lg">Instant Payment Estimator</h3>
                  <p className="text-xs text-slate-400">Estimate your monthly payment based on project scope</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              {/* Slider for Project Scope */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                    <span>Estimated Project Size</span>
                    <span className="text-base font-bold text-amber-400 tabular-nums">
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
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>$8,000 (Repair/Tune)</span>
                    <span>$22,000 (Full Shingle)</span>
                    <span>$45,000 (Solar Slate)</span>
                  </div>
                </div>

                {/* Term Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Financing Horizon
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: '18 Mo (0% APR)', months: 18 },
                      { label: '60 Months', months: 60 },
                      { label: '84 Months', months: 84 },
                    ].map((term) => (
                      <button
                        key={term.months}
                        type="button"
                        onClick={() => setTermMonths(term.months)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          termMonths === term.months
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        {term.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-center space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                    Estimated Monthly Investment
                  </span>
                  <div className="text-4xl font-black text-white tabular-nums">
                    ${termMonths === 18 ? Math.round(projectEstimate / 18).toLocaleString() : estimatedMonthly.toLocaleString()}
                    <span className="text-sm font-normal text-slate-400"> / month</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center justify-center gap-1 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Qualifies for Whop BNPL split installments at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
