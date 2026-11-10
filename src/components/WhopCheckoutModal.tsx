import React, { useState, useMemo } from 'react';
import { X, ShieldCheck, ExternalLink, CreditCard, Lock } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'payment' | 'express' | 'checkout' | 'hosted'>('payment');

  const loader = useMemo(() => getWhopElementsLoader(), []);

  if (!isOpen) return null;

  const isDeposit = plan.price === 500;
  const standardPlanId = plan.whopPlanId || 'plan_1oCv6OCreiCsG';
  const environment = (import.meta.env.VITE_WHOP_ENVIRONMENT as 'sandbox' | 'production') || 'production';
  const baseCheckoutUrl = environment === 'sandbox'
    ? 'https://sandbox.whop.com/checkout'
    : 'https://whop.com/checkout';
  const hostedCheckoutUrl = `${baseCheckoutUrl}/${standardPlanId}`;

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
              Whop Secure Checkout
            </span>
          </div>

          <div className="flex items-center gap-3">
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
                Plan: {standardPlanId}
              </span>
              {isDeposit && (
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Card-on-File Vaulting
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

        {/* View Selection Tabs */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 flex items-center justify-between bg-white text-xs">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('payment')}
              className={`pb-1.5 font-semibold border-b-2 transition-colors ${
                activeTab === 'payment'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Payment Elements
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className={`pb-1.5 font-semibold border-b-2 transition-colors ${
                activeTab === 'checkout'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Checkout Element
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('express')}
              className={`pb-1.5 font-semibold border-b-2 transition-colors ${
                activeTab === 'express'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Express Wallets
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
              Hosted Link
            </button>
          </div>

          <a
            href={hostedCheckoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium"
          >
            <span>whop.com ↗</span>
          </a>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)] space-y-4">
          {activeTab === 'hosted' ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 mx-auto flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-base">Whop Hosted Checkout</h5>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Prefer a full-page checkout? Click below to complete your order on the official Whop hosted payment portal.
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
              {/* Whop Elements Provider */}
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
                {/* Method 1: Payment Element + Mandatory Branding Element */}
                {activeTab === 'payment' && (
                  <Payments
                    accountId="biz_FYZfrBxoUa70IZ"
                    plan={standardPlanId}
                    setupFutureUsage={isDeposit ? 'off_session' : undefined}
                    returnUrl={typeof window !== 'undefined' ? window.location.href : undefined}
                    fallback={
                      <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                        Connecting to Whop Payment Elements...
                      </div>
                    }
                  >
                    <div className="space-y-3">
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                        <PaymentElement />
                      </div>
                      <div className="pt-1">
                        <BrandingElement />
                      </div>
                    </div>
                  </Payments>
                )}

                {/* Method 2: Checkout Element (Mounted solely inside Checkout handle) */}
                {activeTab === 'checkout' && (
                  <div className="space-y-3">
                    <Checkout plan={standardPlanId}>
                      <CheckoutElement />
                    </Checkout>
                  </div>
                )}

                {/* Method 3: Express Checkout Element (Mounted solely inside Checkout handle) */}
                {activeTab === 'express' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500">
                      One-touch wallet payments (Apple Pay, Google Pay, PayPal). Automatically detects device compatibility.
                    </p>
                    <Checkout plan={standardPlanId}>
                      <ExpressCheckoutElement />
                    </Checkout>
                  </div>
                )}
              </WhopElements>

              {/* Deposit Card-on-File Notice */}
              {isDeposit && (
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1 border border-slate-200">
                  <span className="font-semibold flex items-center gap-1.5 text-slate-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Card-on-File SetupIntent
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    By submitting this $500 deposit, your payment method is saved securely off-session on Whop. The remaining milestone balance will be billed via Whop Invoices upon final inspection.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-[#F8F9FA] flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[10px]">Merchant: ApexShield (biz_FYZfrBxoUa70IZ)</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>PCI-DSS Level 1 Encrypted</span>
          </span>
        </div>
      </div>
    </div>
  );
};
