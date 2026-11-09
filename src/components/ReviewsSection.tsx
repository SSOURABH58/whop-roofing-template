import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'David & Karen Miller',
      location: 'Plano, TX',
      project: '34 Squares Architectural Shingle Replacement',
      rating: 5,
      date: 'Verified Homeowner',
      review:
        'After the spring hail storms, other companies flooded our street with pushy sales pitches. ApexShield flew a thermal drone within 4 hours, sent us a 4K damage assessment video for our insurance adjuster, and had the claim approved without hesitation. We paid the $500 deposit online via Apple Pay, and the crew completed the full build in a single day.',
    },
    {
      name: 'Michael R. Vance',
      location: 'Highland Park, Dallas',
      project: 'Premium Architectural Slate Installation',
      rating: 5,
      date: 'Verified Homeowner',
      review:
        'We wanted a roof engineered to withstand 130 MPH gusts and severe hail without sacrificing architectural aesthetics. The new shingles look exceptional and have completely transformed our curb appeal. Being able to finance through Whop with zero down made the decision effortless.',
    },
    {
      name: 'Sarah Jenkins',
      location: 'Southlake, TX',
      project: 'Emergency Leak Mitigation & Flashing Repair',
      rating: 5,
      date: 'Verified Homeowner',
      review:
        'Water was penetrating our ceiling during severe Sunday evening storms. I scheduled the $149 emergency drone inspection online; the crew was on our roof within 90 minutes, tarped the breach, and repaired the failed chimney flashing the next morning. The $149 fee was credited straight toward the repair.',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-[#0D0E12] font-sans border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Homeowner Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] dark:text-white font-display">
            Built on Trust &amp; Craft
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Real feedback from property owners who experienced our certified drone diagnostics and digital milestone payments.
          </p>
        </div>

        {/* 3 Understated Editorial Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 p-7 bg-[#F8F9FA] dark:bg-[#13151A] flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-slate-800 dark:text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#171A20] dark:text-white text-xs sm:text-sm">
                    {rev.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {rev.date}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {rev.location} • <span className="font-medium">{rev.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
