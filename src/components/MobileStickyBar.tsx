import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';

interface MobileStickyBarProps {
  onRequestEstimate: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onRequestEstimate }) => {
  const rawPhone = siteConfig.business.phone.replace(/[^0-9]/g, '');
  const displayPhone = siteConfig.business.phone || '(888) 720-ROOF';

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/90 dark:bg-[#0D0E12]/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 shadow-lg transition-colors"
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Direct Call Action Pill */}
        <a
          href={`tel:${rawPhone}`}
          aria-label={`Call ${displayPhone}`}
          className="flex-1 h-11 px-3 rounded-full border border-slate-300 dark:border-slate-700 bg-[#F8F9FA] dark:bg-[#16181F] text-[#171A20] dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
        >
          <Phone className="w-3.5 h-3.5" />
          <span className="truncate">Call {displayPhone}</span>
        </a>

        {/* Request Estimate Action Pill */}
        <button
          type="button"
          onClick={onRequestEstimate}
          aria-label="Request Estimate"
          className="flex-1 h-11 px-3 rounded-full bg-[#171A20] text-white dark:bg-white dark:text-[#171A20] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] shadow-sm"
        >
          <span>Estimate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
