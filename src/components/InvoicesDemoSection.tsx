import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, ExternalLink, Loader2, CreditCard } from 'lucide-react';
import { createFinalBalanceInvoice, type WhopInvoice, type StoredPaymentMethod } from '../lib/invoices';

export const InvoicesDemoSection: React.FC = () => {
  const [savedCard, setSavedCard] = useState<StoredPaymentMethod | null>(null);
  const [contractTotal, setContractTotal] = useState<number>(2950);
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [customerEmail] = useState<string>('alex.henderson@example.com');
  const [autoCharge, setAutoCharge] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedInvoice, setGeneratedInvoice] = useState<WhopInvoice | null>(null);

  const invoicePlanId = import.meta.env.VITE_WHOP_PLAN_MILESTONE || 'plan_dmwzyzVK4eRCh';
  const environment: 'sandbox' | 'production' = (typeof window !== 'undefined' && (new URLSearchParams(window.location.search).get('env') === 'production' || new URLSearchParams(window.location.search).get('sandbox') === 'false'))
    ? 'production'
    : ((import.meta.env.VITE_WHOP_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox');
  const checkoutBaseUrl = environment === 'sandbox' ? 'https://sandbox.whop.com' : 'https://whop.com';
  const hostedInvoiceCheckoutUrl = `${checkoutBaseUrl}/checkout/${invoicePlanId}`;

  // Load saved card if available from deposit checkout
  useEffect(() => {
    const checkCard = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('whop_roofing_saved_card');
        if (stored) {
          try {
            setSavedCard(JSON.parse(stored));
          } catch (e) {
            // ignore
          }
        }
      }
    };
    checkCard();
    window.addEventListener('storage', checkCard);
    return () => window.removeEventListener('storage', checkCard);
  }, []);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const invoice = await createFinalBalanceInvoice({
        customerEmail,
        customerName: 'Alex Henderson',
        jobTitle: 'Timberline HDZ Architectural Replacement (32 Squares)',
        contractTotal,
        depositPaid: depositAmount,
        autoCharge,
        environment,
      });
      setGeneratedInvoice(invoice);
    } catch (err) {
      console.error('Invoice creation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const balanceDue = contractTotal - depositAmount;

  return (
    <section id="invoices" className="py-24 bg-[#F8F9FA] font-sans border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
            Contractor Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] font-display">
            Milestone Billing via Whop Invoices
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            High-ticket exterior renovations require multi-stage milestone billing. See how Whop Setup Intents and the Invoices API seamlessly manage deposit-to-completion billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 3-Stage Lifecycle Explanation */}
          <div className="lg:col-span-5 space-y-4">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171A20] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-[#171A20]">
                  Deposit &amp; Setup Intent
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                Homeowner reserves project with a $500 deposit. Whop Payment Elements securely vaults the card on-file via <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">setup_future_usage: 'off_session'</code>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171A20] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-[#171A20]">
                  Tear-off &amp; Build Execution
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                Roofing crew arrives on-site, strips degraded shingles, installs underlayment, and completes architectural installation. Post-build drone scan certifies completion.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171A20] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-[#171A20]">
                  Final Balance Invoice (Whop API)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                Contractor issues final completion invoice via <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">POST /v1/invoices</code>. The vaulted card can be charged automatically or sent as a hosted Whop payment link.
              </p>
            </div>
          </div>

          {/* Right Column: Live Interactive Demo Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 p-7 sm:p-8 bg-white shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  Milestone Billing Console
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Whop Invoices API
                </span>
              </div>

              {/* Card on File Status Indicator */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    Vaulted Card on File:
                  </span>
                  {savedCard ? (
                    <span className="font-mono text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                      Ready for Auto-Charge
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      Captured at Reservation
                    </span>
                  )}
                </div>

                {savedCard ? (
                  <div className="font-mono text-xs text-slate-800 flex items-center justify-between">
                    <span>
                      <strong className="uppercase">{savedCard.brand}</strong> •••• {savedCard.last4} (Exp: {savedCard.expMonth}/{savedCard.expYear})
                    </span>
                    <span className="text-[10px] text-slate-400">SetupIntent: {savedCard.setupIntentId?.substring(0, 10)}...</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    Payment method is saved securely off-session on Whop when the customer reserves their project deposit.
                  </p>
                )}
              </div>

              {/* Form Controls */}
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Total Job Value ($)
                    </label>
                    <input
                      type="number"
                      value={contractTotal}
                      onChange={(e) => setContractTotal(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Deposit Credited ($)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:border-slate-900"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600">Remaining Milestone Balance:</span>
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    ${balanceDue.toLocaleString()} USD
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="auto-charge-check"
                    checked={autoCharge}
                    onChange={(e) => setAutoCharge(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-0"
                  />
                  <label htmlFor="auto-charge-check" className="text-xs text-slate-600 cursor-pointer">
                    Auto-charge vaulted SetupIntent card on completion
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full h-11 rounded-full text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 bg-[#171A20] hover:bg-black"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Invoice via Whop Invoices API...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Issue Final Invoice (${balanceDue.toLocaleString()})
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Generated Invoice View */}
              {generatedInvoice && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between font-semibold text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Invoice Generated: {generatedInvoice.id}
                    </span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-mono">
                      {generatedInvoice.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1 font-mono bg-white/70 p-2.5 rounded-lg border border-emerald-100">
                    <div>Customer: {generatedInvoice.customerName} ({generatedInvoice.customerEmail})</div>
                    <div>Balance: ${(generatedInvoice.amountDue ?? generatedInvoice.totalAmount).toLocaleString()} USD (Auto-charged: {generatedInvoice.autoCharge ? 'Yes' : 'No'})</div>
                    <div>Hosted Invoice: {invoicePlanId}</div>
                  </div>

                  <div className="pt-1">
                    <a
                      href={hostedInvoiceCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white border border-slate-900 hover:bg-black shadow-xs transition-all"
                    >
                      <span>Open Hosted Invoice Checkout (whop.com)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
