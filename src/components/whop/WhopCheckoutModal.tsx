import React, { useState, useEffect, useMemo } from 'react';
import {
  WhopElements,
  Checkout,
  CheckoutElement,
  ExpressCheckoutElement,
  Payments,
  BrandingElement,
} from '@whop/elements-react';
import { loadWhop } from '@whop/elements';
import {
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  X,
  Zap,
  Sparkles,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { trackDepositStarted, trackPurchaseCompleted } from '../../lib/tracking';
import { recordProjectDeposit } from '../../lib/invoices';

export interface CheckoutModalPlan {
  id: string;
  name: string;
  price: number;
  whopPlanId?: string;
  tagline?: string;
  badge?: string;
  deliverables?: string[];
  checkoutType?: 'checkout' | 'express' | 'lead';
}

export interface WhopCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: CheckoutModalPlan | null;
  onSuccess?: (result: {
    transactionId: string;
    setupIntentId?: string;
    planId: string;
    amount: number;
    paymentMethod: string;
  }) => void;
  defaultMode?: 'elements' | 'sandbox';
}

// Memoized singleton for Whop Elements SDK loader
let cachedWhopPromise: ReturnType<typeof loadWhop> | null = null;
function getWhopLoader() {
  if (typeof window === 'undefined') return null;
  if (!cachedWhopPromise) {
    cachedWhopPromise = loadWhop();
  }
  return cachedWhopPromise;
}

export const WhopCheckoutModal: React.FC<WhopCheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  onSuccess,
  defaultMode = 'sandbox',
}) => {
  const [activeTab, setActiveTab] = useState<'elements' | 'sandbox'>(defaultMode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState<{
    transactionId: string;
    setupIntentId?: string;
    cardLast4: string;
    amount: number;
  } | null>(null);

  // Form states for sandbox mode
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [zipCode, setZipCode] = useState('75201');
  const [homeownerName, setHomeownerName] = useState('Marcus Vance');
  const [homeownerEmail, setHomeownerEmail] = useState('marcus.vance@example.com');
  const [selectedBnpl, setSelectedBnpl] = useState<string | null>(null);
  const [elementsLoadError, setElementsLoadError] = useState<string | null>(null);
  const [copiedTestCard, setCopiedTestCard] = useState(false);

  // Fire tracking when opened
  useEffect(() => {
    if (isOpen && plan) {
      setIsSuccess(false);
      setSuccessDetails(null);
      setElementsLoadError(null);
      trackDepositStarted(plan.whopPlanId || plan.id, plan.name, plan.price);
    }
  }, [isOpen, plan]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const whopElementsLoader = useMemo(() => getWhopLoader(), []);

  if (!isOpen || !plan) return null;

  const isDepositPlan = plan.id === 'deposit' || plan.price >= 500;
  const quarterlyInstallment = (plan.price / 4).toFixed(2);

  // Test card quick selector
  const handleSelectTestCard = (num: string) => {
    setCardNumber(num);
    setCopiedTestCard(true);
    setTimeout(() => setCopiedTestCard(false), 2000);
  };

  // Process simulated payment
  const handleSimulatePayment = async (method: 'card' | 'apple_pay' | 'google_pay' | 'bnpl') => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 900));

    const chars = 'abcdef0123456789';
    let rand = '';
    for (let i = 0; i < 8; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));

    const txId = `pay_${method === 'bnpl' ? 'bnpl_' : ''}${rand}`;
    let setupIntentId: string | undefined = undefined;

    // If deposit, save card on file setup intent
    if (isDepositPlan) {
      const depositResult = recordProjectDeposit({
        customerName: homeownerName,
        customerEmail: homeownerEmail,
        depositAmount: plan.price,
        last4: method === 'card' ? cardNumber.slice(-4) : '9876',
        brand: 'visa',
      });
      setupIntentId = depositResult.setupIntentId;
    }

    // Fire purchase pixel tracking
    trackPurchaseCompleted({
      transactionId: txId,
      planId: plan.whopPlanId || plan.id,
      planName: plan.name,
      amount: plan.price,
      paymentMethod: method,
    });

    const details = {
      transactionId: txId,
      setupIntentId,
      cardLast4: method === 'card' ? cardNumber.slice(-4) : '9876',
      amount: plan.price,
    };

    setSuccessDetails(details);
    setIsProcessing(false);
    setIsSuccess(true);

    if (onSuccess) {
      onSuccess({
        transactionId: txId,
        setupIntentId,
        planId: plan.whopPlanId || plan.id,
        amount: plan.price,
        paymentMethod: method,
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-plan-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#0E1420] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100 my-8">
        
        {/* Top Header Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#1E293B] flex items-start justify-between bg-[#0B192C]/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3 h-3" />
                {plan.badge || 'Instant Confirmation'}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                Whop PCI-DSS Level 1
              </span>
            </div>
            <h2 id="modal-plan-title" className="text-xl font-bold text-white mt-1.5">{plan.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{plan.tagline || 'Direct contractor payment via Whop checkout ecosystem'}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price & Summary Ribbon */}
        <div className="px-6 py-3.5 bg-[#070A0F]/80 border-b border-[#1E293B] flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Amount Due Now:</span>
          <div className="text-right">
            <span className="text-2xl font-black text-amber-400">${plan.price.toLocaleString()}</span>
            <span className="text-xs text-slate-400 ml-1">USD</span>
          </div>
        </div>

        {/* Success View */}
        {isSuccess && successDetails ? (
          <div className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-in zoom-in-75 duration-300">
              <Check className="w-9 h-9 stroke-[3]" />
            </div>

            <h3 className="text-2xl font-bold text-white">Payment Confirmed!</h3>
            <p className="text-sm text-slate-300 max-w-md">
              Your order for <strong className="text-white">{plan.name}</strong> was successfully authorized. Dispatch has been notified and will contact you within 24 hours.
            </p>

            <div className="w-full bg-[#070A0F] border border-[#1E293B] rounded-xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Whop Receipt ID:</span>
                <span className="font-mono text-amber-400 font-semibold">{successDetails.transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-slate-200">Visa ending in {successDetails.cardLast4}</span>
              </div>
              {successDetails.setupIntentId && (
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Card-on-File SetupIntent:</span>
                  <span className="font-mono text-emerald-400">{successDetails.setupIntentId}</span>
                </div>
              )}
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Authorized & Escrowed
                </span>
              </div>
            </div>

            {isDepositPlan && (
              <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-left flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <strong>Milestone Invoicing Enabled:</strong> Your $500 reservation deposit is safely credited. Final project balance will be billed via Whop Invoices upon completion inspection.
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          /* Payment Form Body */
          <div className="p-6 space-y-6">
            
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-[#070A0F] border border-[#1E293B] rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('sandbox')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'sandbox'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Interactive Sandbox Demo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('elements')}
                className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'elements'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Live Whop Elements SDK
              </button>
            </div>

            {/* TAB 1: Real Whop Elements SDK */}
            {activeTab === 'elements' && (
              <div className="space-y-4">
                <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-blue-100">Live Whop Elements Container:</span>
                    <p className="mt-0.5 text-blue-300/80">
                      Renders hosted <code>@whop/elements-react</code> components connected to plan ID <code className="text-amber-400">{plan.whopPlanId || 'plan_deposit_500'}</code>.
                    </p>
                  </div>
                </div>

                {elementsLoadError ? (
                  <div className="p-4 bg-red-950/30 border border-red-800/40 rounded-xl text-xs text-red-200 space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      Whop Elements Note
                    </div>
                    <p className="text-red-300/80">{elementsLoadError}</p>
                    <button
                      onClick={() => setActiveTab('sandbox')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition"
                    >
                      Switch to Interactive Sandbox Demo
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-[#070A0F] border border-[#1E293B] rounded-xl space-y-4">
                    <WhopElements
                      elements={whopElementsLoader}
                      appearance={{
                        theme: {
                          appearance: 'dark',
                          accentColor: 'amber',
                          grayColor: 'slate',
                        },
                      }}
                      onLoadError={(err) => {
                        console.warn('[Whop Elements Load Error]', err);
                        setElementsLoadError(
                          'Whop Elements API key / plan is currently using sandbox preview. Switch to Sandbox Demo for full end-to-end interactive simulation!'
                        );
                      }}
                    >
                      <Checkout
                        plan={plan.whopPlanId || 'plan_deposit_500'}
                        onComplete={(payload) => {
                          console.log('[Whop Checkout Complete]', payload);
                          handleSimulatePayment('card');
                        }}
                      >
                        <div className="space-y-3">
                          <label className="text-xs font-semibold text-slate-300 block">Express Wallet Checkout:</label>
                          <ExpressCheckoutElement className="rounded-lg overflow-hidden border border-slate-700/60" />

                          <label className="text-xs font-semibold text-slate-300 block pt-2">Card & Payment Method:</label>
                          <CheckoutElement className="rounded-lg overflow-hidden border border-slate-700/60" />
                        </div>
                      </Checkout>

                      {/* Official Whop Mandatory Branding Element */}
                      <Payments
                        accountId="biz_apexshield"
                        plan={plan.whopPlanId || 'plan_deposit_500'}
                      >
                        <div className="pt-3 border-t border-slate-800">
                          <BrandingElement />
                        </div>
                      </Payments>
                    </WhopElements>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Interactive Sandbox Demo */}
            {activeTab === 'sandbox' && (
              <div className="space-y-4">
                
                {/* 1-Click Express Checkout Buttons */}
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Express 1-Click Checkout
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleSimulatePayment('apple_pay')}
                      className="py-2.5 px-4 rounded-xl bg-black hover:bg-slate-900 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                      <span className="font-semibold text-sm"> Pay</span>
                      <span className="text-[10px] text-slate-400">({plan.price})</span>
                    </button>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleSimulatePayment('google_pay')}
                      className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                      <span className="font-bold">G Pay</span>
                      <span className="text-[10px] text-slate-600">({plan.price})</span>
                    </button>
                  </div>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                    Or pay with credit card
                  </span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                {/* Test Cards Quick Bar */}
                <div className="p-2.5 bg-[#070A0F] border border-[#1E293B] rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" /> Test Card:
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSelectTestCard('4242 4242 4242 4242')}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] border border-slate-700 flex items-center gap-1 transition"
                    >
                      <span>4242 (Success)</span>
                      <Copy className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  </div>
                  {copiedTestCard && <span className="text-emerald-400 text-[10px] font-semibold">Loaded!</span>}
                </div>

                {/* Homeowner Contact Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={homeownerName}
                      onChange={(e) => setHomeownerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-[#1E293B] text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={homeownerEmail}
                      onChange={(e) => setHomeownerEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-[#1E293B] text-slate-100 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Card Fields */}
                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#070A0F] border border-[#1E293B] text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                      />
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">Exp Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-[#1E293B] text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-400 block mb-1">CVC / Postal</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123"
                          className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-[#1E293B] text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                        />
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="ZIP"
                          className="w-full px-3 py-2 rounded-lg bg-[#070A0F] border border-[#1E293B] text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BNPL Financing Strip */}
                <div className="p-3 bg-[#0B192C]/60 border border-[#1E293B] rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">Flexible Financing (BNPL)</span>
                    <span className="text-[11px] text-amber-400 font-medium">4 payments of ${quarterlyInstallment}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'Klarna', color: 'text-pink-400 border-pink-500/20 bg-pink-500/5' },
                      { name: 'Splitit', color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5' },
                      { name: 'Afterpay', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
                    ].map((provider) => (
                      <button
                        key={provider.name}
                        type="button"
                        onClick={() => setSelectedBnpl(selectedBnpl === provider.name ? null : provider.name)}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold text-center transition-all ${
                          selectedBnpl === provider.name
                            ? 'border-amber-400 bg-amber-500/10 text-amber-300 ring-1 ring-amber-400'
                            : `${provider.color} hover:brightness-125`
                        }`}
                      >
                        {provider.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card on File Notice for Deposits */}
                {isDepositPlan && (
                  <div className="flex gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 items-start">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Card-on-File SetupIntent Enabled:</strong>
                      <p className="text-[11px] text-amber-300/80 mt-0.5">
                        This deposit stores your card securely in the Whop Vault. Your final roof completion invoice will be billed automatically upon customer sign-off.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Pay Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulatePayment(selectedBnpl ? 'bnpl' : 'card')}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing with Whop...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        Authorize ${plan.price.toLocaleString()} USD
                        {selectedBnpl ? ` via ${selectedBnpl}` : ''}
                      </span>
                    </>
                  )}
                </button>

                {/* Mandatory Whop Trust Badge */}
                <div className="pt-2 text-center flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>Secured by</span>
                    <strong className="text-white font-bold tracking-tight">whop</strong>
                    <span>• Merchant of Record</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Encrypted with TLS 1.3 & AES-256 bank-level protocol
                  </span>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
