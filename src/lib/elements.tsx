/**
 * Whop Elements React Integration Module
 *
 * Exposes declarative React components and helpers for embedded payments,
 * accelerated checkouts, BNPL financing badges, and mandatory Whop trust badges.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { WhopElements, useWhop } from '@whop/elements-react';
import type { Theme, AccentColor } from '@whop/elements';
import { loadWhop } from '@whop/elements';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { WhopCheckoutModal } from '../components/WhopCheckoutModal';

export { WhopCheckoutModal };
export type { WhopCheckoutModalProps, CheckoutModalPlan } from '../components/WhopCheckoutModal';

let globalWhopPromise: ReturnType<typeof loadWhop> | null = null;

/**
 * Get or initialize the singleton loader promise for `@whop/elements`
 */
export function getWhopElementsLoader(): ReturnType<typeof loadWhop> | null {
  if (typeof window === 'undefined') return null;
  if (!globalWhopPromise) {
    globalWhopPromise = loadWhop();
  }
  return globalWhopPromise;
}

interface WhopContextValue {
  loader: ReturnType<typeof loadWhop> | null;
  whopInstance: ReturnType<typeof useWhop>;
}

const WhopContext = createContext<WhopContextValue>({
  loader: null,
  whopInstance: null,
});

export const useWhopContext = () => useContext(WhopContext);

export interface WhopElementsProviderProps {
  children: React.ReactNode;
  appearance?: {
    theme?: Theme;
  };
}

/**
 * Root Whop Elements Provider for ApexRoof & Solar.
 * Pre-configures the Dark Slate / Amber architectural contractor theme.
 */
export const WhopElementsProvider: React.FC<WhopElementsProviderProps> = ({
  children,
  appearance,
}) => {
  const loader = useMemo(() => getWhopElementsLoader(), []);

  const defaultTheme: Theme = {
    appearance: 'dark',
    accentColor: 'amber' as AccentColor,
    grayColor: 'slate',
  };

  return (
    <WhopElements
      elements={loader}
      appearance={{
        theme: appearance?.theme || defaultTheme,
      }}
    >
      {children}
    </WhopElements>
  );
};

/**
 * Standalone Whop Trust Badge Component.
 * Can be placed in hero, pricing tables, or footer to assure homeowners of PCI Level 1 security.
 */
export const WhopBrandingBadge: React.FC<{
  variant?: 'pill' | 'banner' | 'minimal';
  className?: string;
}> = ({ variant = 'pill', className = '' }) => {
  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs text-slate-400 ${className}`}>
        <Lock className="w-3 h-3 text-emerald-400" />
        <span>Payments powered by</span>
        <strong className="text-white font-bold tracking-tight">whop</strong>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={`flex items-center justify-between p-3 rounded-xl bg-[#0B192C]/80 border border-[#1E293B] text-xs text-slate-300 ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-1.5">
              Whop Merchant of Record Escrow Protection
            </div>
            <p className="text-[11px] text-slate-400">
              Deposits held securely until crew dispatch verification. Encrypted via TLS 1.3.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">PCI-DSS L1</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">256-BIT AES</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1420] border border-[#1E293B] text-xs text-slate-300 shadow-sm ${className}`}
    >
      <Lock className="w-3 h-3 text-emerald-400" />
      <span>Secured by</span>
      <span className="font-bold text-white tracking-wide">whop</span>
      <span className="text-slate-500">•</span>
      <span className="text-[11px] text-slate-400">Apple Pay • Google Pay • Klarna</span>
    </div>
  );
};

/**
 * BNPL Financing Calculation Strip
 * Calculates 4 interest-free installments for any roofing project or deposit.
 */
export const WhopBNPLSummary: React.FC<{
  amount: number;
  className?: string;
}> = ({ amount, className = '' }) => {
  const installment = (amount / 4).toFixed(2);

  return (
    <div
      className={`flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 text-slate-300">
        <CreditCard className="w-3.5 h-3.5 text-amber-400" />
        <span>Or 4 interest-free payments of</span>
        <strong className="text-amber-400 font-semibold">${installment}</strong>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold">
        <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
          Klarna
        </span>
        <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Splitit
        </span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Afterpay
        </span>
      </div>
    </div>
  );
};
