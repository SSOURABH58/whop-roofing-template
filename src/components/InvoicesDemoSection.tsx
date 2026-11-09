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
  const [environment, setEnvironment] = useState<'sandbox' | 'production'>('sandbox');

  const invoicePlanId = 'plan_NZMM5QxZFVsoL';
  const sandboxCheckoutUrl = `https://sandbox.whop.com/checkout/${invoicePlanId}`;
  const productionCheckoutUrl = `https://whop.com/checkout/${invoicePlanId}`;

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

  const handleSimulateVaultCard = () => {
    const mockCard: StoredPaymentMethod = {
      id: `payt_${Math.random().toString(36).substring(2, 10)}`,
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2028,
      customerEmail,
      setupIntentId: `seti_${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
    };
    setSavedCard(mockCard);
    if (typeof window !== 'undefined') {
      localStorage.setItem('whop_roofing_saved_card', JSON.stringify(mockCard));
    }
  };

  const balanceDue = contractTotal - depositAmount;

  return (
    <section id="invoices-demo" className="py-24 bg-[#F8F9FA] font-sans border-b border-slate-200/80">
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
            High-ticket exterior renovations require multi-stage milestone billing. See how Whop Setup Intents and the Invoices API seamlessly manage deposit-to-completion billing across sandbox and production.
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

            {/* Step 4: Environment Callout */}
            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/60 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  Dual Sandbox &amp; Production Support
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded">
                  Official Whop
                </span>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                Test checkout safely via <strong>sandbox.whop.com</strong> without trigger of Stripe live fraud filters. Invoices switch instantly between Sandbox simulation and live Whop MoR checkout.
              </p>
            </div>
          </div>

          {/* Right Column: Live Interactive Demo Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 p-7 sm:p-8 bg-white shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  Interactive API Console
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  POST /v1/invoices
                </span>
              </div>

              {/* Environment Toggle: Sandbox vs Production */}
              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Environment:
                  </span>
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-200/80 border border-slate-300/60 text-xs">
                    <button
                      type="button"
                      onClick={() => setEnvironment('sandbox')}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        environment === 'sandbox'
                          ? 'bg-white text-indigo-700 shadow-sm border border-indigo-100'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${environment === 'sandbox' ? 'bg-indigo-600 animate-pulse' : 'bg-slate-400'}`} />
                      <span>Sandbox (sandbox.whop.com)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnvironment('production')}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        environment === 'production'
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${environment === 'production' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>Production (whop.com)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {environment === 'sandbox' ? (
                    <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md font-medium">
                      Simulated Funds
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      Live Merchant of Record
                    </span>
                  )}
                </div>
              </div>

              {/* Sandbox Test Card Notice if Sandbox is active */}
              {environment === 'sandbox' && (
                <div className="p-3 bg-indigo-50/90 rounded-xl border border-indigo-200 text-xs text-indigo-950 space-y-1.5">
                  <div className="flex items-center justify-between font-semibold text-indigo-900">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                      Sandbox Test Payment Card (Simulated Funds):
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-indigo-200/80 px-1.5 py-0.5 rounded text-indigo-900">
                      No Live Charge
                    </span>
                  </div>
                  <div className="font-mono text-[11px] bg-white/90 p-2 rounded-lg border border-indigo-200 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                    <span>Card: <strong className="select-all">4242 4242 4242 4242</strong></span>
                    <span>Exp: <strong className="select-all">12/28</strong></span>
                    <span>CVC: <strong className="select-all">123</strong></span>
                    <span>ZIP: <strong className="select-all">75201</strong></span>
                  </div>
                </div>
              )}

              {/* Direct Checkout Links to view both Sandbox and Production */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-slate-600 font-medium text-[11px]">
                  Direct Whop Invoice Checkouts:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={sandboxCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <span>Sandbox Checkout ↗</span>
                  </a>
                  <a
                    href={productionCheckoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <span>Production Checkout ↗</span>
                  </a>
                </div>
              </div>

              {/* Card Vault Status */}
              <div className="p-4 rounded-xl border border-slate-200 bg-[#F8F9FA] flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                    Customer Card Vaulted Status
                  </span>
                  <div className="text-xs font-mono text-[#171A20] mt-0.5">
                    {savedCard ? (
                      <span className="text-emerald-600 font-medium">
                        Visa •••• {savedCard.last4} ({savedCard.setupIntentId})
                      </span>
                    ) : (
                      <span className="text-slate-500">No card vaulted yet</span>
                    )}
                  </div>
                </div>

                {!savedCard && (
                  <button
                    type="button"
                    onClick={handleSimulateVaultCard}
                    className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Simulate SetupIntent
                  </button>
                )}
              </div>

              {/* Invoice Parameter Controls */}
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Total Contract Value
                    </label>
                    <input
                      type="number"
                      value={contractTotal}
                      onChange={(e) => setContractTotal(Number(e.target.value))}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-[#171A20] focus:outline-none focus:border-[#171A20]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Deposit Paid (Credited)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-[#171A20] focus:outline-none focus:border-[#171A20]"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-[#F8F9FA] flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">
                    Remaining Completion Balance Due:
                  </span>
                  <span className="text-base font-bold text-[#171A20] font-mono">
                    ${balanceDue.toLocaleString()} USD
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="auto-charge-check"
                    checked={autoCharge}
                    onChange={(e) => setAutoCharge(e.target.checked)}
                    className="w-4 h-4 rounded text-[#171A20] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="auto-charge-check" className="text-xs text-slate-600 cursor-pointer">
                    Auto-charge vaulted SetupIntent card on completion
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full h-11 rounded-full text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 ${
                    environment === 'sandbox'
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-[#171A20] hover:bg-black'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Invoice via Whop {environment === 'sandbox' ? 'Sandbox' : ''} API...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        Issue Final Invoice (${balanceDue.toLocaleString()}) — {environment === 'sandbox' ? 'Sandbox' : 'Production'}
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
                    <div>Invoice Target: <strong className="uppercase">{environment}</strong></div>
                  </div>

                  {/* Checkout Options to view both sandbox checkout and production invoice checkout */}
                  <div className="pt-1 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-700">
                      View Hosted Invoice Checkout:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={sandboxCheckoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          environment === 'sandbox'
                            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-xs'
                            : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'
                        }`}
                      >
                        <span>View Sandbox Checkout (sandbox.whop.com)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={productionCheckoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          environment === 'production'
                            ? 'bg-slate-900 text-white border-slate-900 hover:bg-black shadow-xs'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span>View Production Invoice Checkout (whop.com)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
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
