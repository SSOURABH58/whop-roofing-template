import React, { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/site';

export const ServiceAreaSection: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [checkedResult, setCheckedResult] = useState<null | { covered: boolean; message: string }>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;

    const trimmed = zipInput.trim();
    const isLocal = trimmed.startsWith('75') || trimmed.startsWith('76');

    if (isLocal) {
      setCheckedResult({
        covered: true,
        message: `Priority coverage active for ZIP ${trimmed}. Dedicated inspection and emergency crews stationed within range.`,
      });
    } else {
      setCheckedResult({
        covered: true,
        message: `ZIP ${trimmed} is within our regional extended service corridor. Dispatch scheduling available within 24–48 hours.`,
      });
    }
  };

  return (
    <section id="service-area" className="py-24 bg-[#F8F9FA] font-sans border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Direct Zip Check */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">
              Regional Dispatch
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] font-display leading-[1.15]">
              Service Area &amp; <br />
              <span className="font-normal text-slate-600">
                Rapid Storm Coverage.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Mobile diagnostic units and fully equipped installation teams operate daily across the metro region, providing same-day storm damage inspections and rapid emergency response.
            </p>

            {/* Clean Zip Search Form */}
            <form onSubmit={handleZipCheck} className="space-y-3 pt-2">
              <label htmlFor="zip-input" className="block text-xs font-medium text-slate-600">
                Verify Crew Availability in Your ZIP Code
              </label>
              
              <div className="flex gap-2 max-w-md">
                <input
                  id="zip-input"
                  type="text"
                  maxLength={5}
                  placeholder="Enter 5-digit ZIP"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value.replace(/[^0-9]/g, ''))}
                  className="flex-1 bg-white border border-slate-300 rounded-full px-5 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                />
                <button
                  type="submit"
                  className="h-10 px-6 rounded-full bg-[#171A20] text-white hover:bg-black text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.98]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              </div>

              {checkedResult && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 flex items-start gap-2.5 animate-in fade-in duration-200 max-w-md shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Coverage Verified</span>
                    <span className="text-emerald-700">{checkedResult.message}</span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Clean Operating Sectors Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 p-7 sm:p-8 bg-white shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  Primary Coverage Zones
                </span>
                <span className="text-xs text-emerald-600 font-medium">
                  {siteConfig.business.serviceRadiusMiles}-Mile Radius
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {siteConfig.business.citiesServed.map((city: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-[#F8F9FA] text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors"
                  >
                    {city}
                  </span>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-200">
                Operating under State License <strong className="text-slate-800">{siteConfig.business.licenseNumber}</strong> with comprehensive {siteConfig.business.insuranceCoverage} liability protection.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
