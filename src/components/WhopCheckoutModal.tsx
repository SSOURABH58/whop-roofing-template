import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Lock, Zap } from 'lucide-react';
import { createDepositSetupIntent } from '../lib/invoices';

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
  const [email, setEmail] = useState('alex.henderson@example.com');
  const [name, setName] = useState('Alex Henderson');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'apple_pay' | 'klarna'>('card');
  const [saveCardOnFile, setSaveCardOnFile] = useState(true);

  if (!isOpen) return null;

  const isDeposit = plan.price === 500;

  const handleSimulatedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (isDeposit && saveCardOnFile) {
        await createDepositSetupIntent(email, plan.price);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Whop Secure Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white">Payment Confirmed</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs max-w-xs mx-auto">
              Your payment of <strong className="text-slate-900 dark:text-white">${plan.price.toLocaleString()}</strong> for{' '}
              {plan.name} was successfully processed via Whop.
            </p>
            {isDeposit && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-xs text-slate-700 dark:text-slate-300 text-left space-y-1">
                <span className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Card Vaulted for Balance Invoicing
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Payment method secured via Whop SetupIntent. The project balance will only be billed upon final drone inspection.
                </p>
              </div>
            )}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="w-full py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            {/* Plan Info */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Selected Plan</span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{plan.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">${plan.price}</div>
                <div className="text-[10px] text-slate-400 font-mono">USD ONE-TIME</div>
              </div>
            </div>

            {/* Whop Express Checkout Element */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('apple_pay')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    selectedMethod === 'apple_pay'
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                   Pay / GPay
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('klarna')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    selectedMethod === 'klarna'
                      ? 'bg-[#FFB3C7] text-slate-950 border-[#FFB3C7]'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Klarna. / Splitit
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase tracking-wider font-mono">Or Card Payment</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSimulatedCheckout} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5" />
                    Card Details
                  </label>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> PCI Level 1
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span>•••• •••• •••• 4242</span>
                  <span className="text-slate-400">12/28 • 123</span>
                </div>
              </div>

              {isDeposit && (
                <label className="flex items-start gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveCardOnFile}
                    onChange={(e) => setSaveCardOnFile(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-slate-900 dark:text-white"
                  />
                  <div className="text-xs">
                    <span className="font-semibold block text-slate-900 dark:text-white">Save card via Whop SetupIntent</span>
                    <span className="text-[11px] text-slate-500">Milestone balance billed via Whop Invoices upon final inspection sign-off.</span>
                  </div>
                </label>
              )}

              {/* Required BrandingElement */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#FF6243] text-white flex items-center justify-center font-bold text-[9px]">W</span>
                  <span>Powered by <strong>Whop Payments</strong></span>
                </div>
                <span className="font-mono text-[9px] text-slate-400">&lt;BrandingElement /&gt;</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
              >
                {isProcessing ? (
                  <span>Processing with Whop...</span>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Pay ${plan.price.toLocaleString()} via Whop</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
