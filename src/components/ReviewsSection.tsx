import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'David & Karen Miller',
      location: 'Plano, TX',
      project: '34 Squares Timberline HDZ + Ridge Vent',
      rating: 5,
      date: '3 weeks ago',
      review:
        'After the spring hail storm, three different companies knocked on our door. ApexShield was the only one that didn’t use high-pressure tactics. They flew a drone, sent us a 4K video showing the fractured shingles, and helped our insurance adjuster approve the full replacement. Paid our $500 deposit online via Apple Pay and the crew finished in exactly 1 day!',
    },
    {
      name: 'Michael R. Vance',
      location: 'Highland Park, Dallas',
      project: 'Integrated Solar Shingle Installation',
      rating: 5,
      date: '1 month ago',
      review:
        'We wanted solar without having those ugly industrial racks bolted through our roof. The integrated solar shingles look stunning and our electric bill dropped from $420 to under $60/month. The Whop financing plan at 0% made this an absolute no-brainer.',
    },
    {
      name: 'Sarah Jenkins',
      location: 'Southlake, TX',
      project: 'Emergency Leak Mitigation & Flashing Repair',
      rating: 5,
      date: '2 months ago',
      review:
        'Water was dripping into our master bedroom closet during Sunday night storms. Booked the $149 emergency inspection online at 7 AM; crew arrived by 8:45 AM, tarped the area, and sealed the failed chimney flashing. The $149 was credited right toward the repair bill. Lifesavers!',
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-slate-950 font-sans border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-current" />
            Verified Homeowner Proof
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Trusted by 640+ Texas Homeowners
          </h2>
          <p className="mt-3 text-slate-400 text-base">
            Real feedback from local residents who experienced our certified drone diagnostics, 1-day builds, and seamless digital billing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-navy-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-xl relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                    <span className="text-[11px] text-slate-400">{rev.location}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Job
                  </span>
                </div>
                <div className="mt-2 text-[10px] text-amber-400/90 font-mono bg-navy-950 px-2.5 py-1 rounded-md border border-slate-800/80 truncate">
                  {rev.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
