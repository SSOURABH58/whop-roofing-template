import React, { useMemo, useEffect } from 'react';
import { X, ExternalLink, Lock } from 'lucide-react';
import {
  WhopElements,
  Checkout,
  CheckoutElement,
  BrandingElement,
} from '@whop/elements-react';
import { getWhopElementsLoader } from '../lib/elements';

export interface CheckoutModalPlan {
  id: string;
  name: string;
  price: number;
  badge?: string;
  whopPlanId?: string;
  tagline?: string;
  deliverables?: string[];
  checkoutType?: 'checkout' | 'express' | 'lead';
}

export interface WhopCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: CheckoutModalPlan;
  onSuccess?: () => void;
}

export const WhopCheckoutModal: React.FC<WhopCheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  const loader = useMemo(() => getWhopElementsLoader(), []);

  if (!isOpen) return null;

  const isDeposit = plan.price === 500;
  const standardPlanId = plan.whopPlanId || import.meta.env.VITE_WHOP_PLAN_INSPECTION || 'plan_l16eM5wNPlPGS';

  // When opening deposit checkout, prime card-on-file vault for the milestone invoices demo
  useEffect(() => {
    if (isOpen && isDeposit && typeof window !== 'undefined') {
      const existing = localStorage.getItem('whop_roofing_saved_card');
      if (!existing) {
        localStorage.setItem(
          'whop_roofing_saved_card',
          JSON.stringify({
            id: 'payt_4242vaulted',
            brand: 'visa',
            last4: '4242',
            expMonth: 12,
            expYear: 2028,
            customerEmail: 'alex.henderson@example.com',
            setupIntentId: 'seti_deposit_vault_500',
            createdAt: new Date().toISOString(),
          })
        );
        window.dispatchEvent(new Event('storage'));
      }
    }
  }, [isOpen, isDeposit]);
  
  const environment: 'sandbox' | 'production' = (typeof window !== 'undefined' && (new URLSearchParams(window.location.search).get('env') === 'production' || new URLSearchParams(window.location.search).get('sandbox') === 'false'))
    ? 'production'
    : ((import.meta.env.VITE_WHOP_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox');

  const baseCheckoutUrl = environment === 'sandbox'
    ? 'https://sandbox.whop.com/checkout'
    : 'https://whop.com/checkout';
  const hostedCheckoutUrl = `${baseCheckoutUrl}/${standardPlanId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-[#171A20] font-sans flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-700">
              Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={hostedCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium transition-colors"
              title="Open full-page checkout"
            >
              <span>Full page</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Plan Header Strip */}
        <div className="p-5 bg-[#F8F9FA] border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                {isDeposit ? 'Reservation Deposit' : 'Direct Booking'}
              </span>
              {isDeposit && (
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  100% Credited to Project
                </span>
              )}
            </div>
            <h4 className="font-bold text-[#171A20] text-base mt-0.5">
              {plan.name}
            </h4>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#171A20] tabular-nums">
              ${plan.price}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">USD ONE-TIME</div>
          </div>
        </div>

        {/* Single Unified Checkout View (No Tabs) */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-180px)]">
          <WhopElements
            elements={loader}
            environment={environment}
            appearance={{
              theme: {
                appearance: 'light',
                accentColor: 'gray',
                grayColor: 'slate',
              },
            }}
          >
            <Checkout plan={standardPlanId}>
              <CheckoutElement />
              <div className="pt-2">
                <BrandingElement />
              </div>
            </Checkout>
          </WhopElements>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-[#F8F9FA] flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-[11px] text-slate-600">ApexShield Roofing &amp; Restoration</span>
          <span className="flex items-center gap-1 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted Checkout</span>
          </span>
        </div>
      </div>
    </div>
  );
};
