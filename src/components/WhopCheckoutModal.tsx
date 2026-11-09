import React, { useState, useMemo } from 'react';
import { X, ShieldCheck, ExternalLink, CreditCard, Sparkles } from 'lucide-react';
import {
  WhopElements,
  Payments,
  PaymentElement,
  BrandingElement,
  Checkout,
  CheckoutElement,
  ExpressCheckoutElement,
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
  onSuccess,
}) => {
  const [environment, setEnvironment] = useState<'production' | 'sandbox'>('production');
  const [activeTab, setActiveTab] = useState<'elements' | 'hosted'>('elements');

  const loader = useMemo(() => getWhopElementsLoader(), []);

  if (!isOpen) return null;

  const isDeposit = plan.price === 500;
  const whopPlanId = plan.whopPlanId || 'plan_1oCv6OCreiCsG';
  const hostedCheckoutUrl = `https://whop.com/checkout/${whopPlanId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-[#171A20] font-sans flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-700">
              Whop Payment Elements
            </span>
          </div>

          {/* Environment Switcher: Production vs Sandbox */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-[11px]">
              <button
                type="button"
                onClick={() => setEnvironment('production')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  environment === 'production'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Live
              </button>
              <button
                type="button"
                onClick={() => setEnvironment('sandbox')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  environment === 'sandbox'
                    ? 'bg-amber-100 text-amber-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Test Mode
              </button>
            </div>

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
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Plan: {whopPlanId}
              </span>
              {isDeposit && (
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Card-on-File Vaulting
                </span>
              )}
            </div>
            <h4 className="font-bold text-[#171A20] text-base mt-0.5">{plan.name}</h4>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#171A20] tabular-nums">${plan.price}</div>
            <div className="text-[10px] text-slate-500 font-mono">USD ONE-TIME</div>
          </div>
        </div>

        {/* Sandbox Test Card Notice */}
        {environment === 'sandbox' && (
          <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Sandbox Card:</strong> <code>4242 4242 4242 4242</code> • Exp <code>12/28</code> • CVC <code>123</code>
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-amber-200/70 px-1.5 py-0.5 rounded text-amber-800">
              Zero Charge
            </span>
          </div>
        )}

        {/* View Selection Tabs: Embedded Elements vs Direct Hosted */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between bg-white text-xs">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('elements')}
              className={`pb-1.5 font-semibold border-b-2 transition-colors ${
                activeTab === 'elements'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Whop Elements
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hosted')}
              className={`pb-1.5 font-semibold border-b-2 transition-colors ${
                activeTab === 'hosted'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Whop Hosted Checkout
            </button>
          </div>

          <a
            href={hostedCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-black"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'hosted' ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="max-w-xs mx-auto space-y-1">
                <h5 className="font-bold text-sm text-[#171A20]">Whop Official Checkout</h5>
                <p className="text-xs text-slate-600">
                  Opens the merchant-of-record checkout page for <strong>{plan.name}</strong> (${plan.price} USD) on Whop.com.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={hostedCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (onSuccess) onSuccess();
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#171A20] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase shadow-sm transition-all"
                >
                  <span>Proceed to Whop Checkout (${plan.price})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[11px] text-slate-400">
                Supports Apple Pay, Google Pay, Credit/Debit cards, Klarna, and Splitit installments.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Whop Elements Provider Mounting Real Checkout & Payments */}
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
                {/* Method 1: Whop Payments Container with PaymentElement + BrandingElement */}
                <div className="space-y-3">
                  <Payments
                    accountId="biz_FYZfrBxoUa70IZ"
                    plan={whopPlanId}
                    setupFutureUsage={isDeposit ? 'off_session' : undefined}
                    returnUrl={typeof window !== 'undefined' ? window.location.href : undefined}
                    fallback={
                      <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                        Connecting to Whop Payments Elements...
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      {/* Real Whop Payment Element (Cards, Apple Pay, Google Pay, BNPL) */}
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                        <PaymentElement />
                      </div>

                      {/* Required Branding Element */}
                      <div className="pt-1">
                        <BrandingElement />
                      </div>
                    </div>
                  </Payments>
                </div>

                {/* Method 2: Whop Checkout with ExpressCheckoutElement & CheckoutElement */}
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    Express Wallets &amp; Full Checkout
                  </div>
                  <Checkout plan={whopPlanId}>
                    <ExpressCheckoutElement />
                    <CheckoutElement />
                  </Checkout>
                </div>
              </WhopElements>

              {/* Deposit Card-on-File Notice */}
              {isDeposit && (
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1 border border-slate-200">
                  <span className="font-semibold flex items-center gap-1.5 text-slate-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Card-on-File SetupIntent
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    By submitting this $500 deposit, your payment method is saved off-session on Whop. The remaining milestone balance will be billed via Whop Invoices upon final inspection.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-[#F8F9FA] flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[10px]">Merchant ID: biz_FYZfrBxoUa70IZ</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>PCI-DSS Level 1 Encrypted</span>
          </span>
        </div>
      </div>
    </div>
  );
};