import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { createFinalBalanceInvoice, WhopInvoice, StoredPaymentMethod } from '../lib/invoices';

export const InvoicesDemoSection: React.FC = () => {
  const [savedCard, setSavedCard] = useState<StoredPaymentMethod | null>(null);
  const [contractTotal, setContractTotal] = useState<number>(14500);
  const [depositAmount, setDepositAmount] = useState<number>(500);
  const [customerEmail] = useState<string>('alex.henderson@example.com');
  const [autoCharge, setAutoCharge] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedInvoice, setGeneratedInvoice] = useState<WhopInvoice | null>(null);

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
    <section id="invoices-demo" className="py-24 bg-[#F8F9FA] dark:bg-[#0D0E12] font-sans border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Contractor Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] dark:text-white font-display">
            Milestone Billing via Whop Invoices
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            High-ticket exterior renovations require multi-stage milestone billing. See how Whop Setup Intents and the Invoices API seamlessly manage deposit-to-completion billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 3-Stage Lifecycle Explanation */}
          <div className="lg:col-span-5 space-y-4">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13151A] space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171A20] text-white dark:bg-white dark:text-[#171A20] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-[#171A20] dark:text-white">
                  Deposit &amp; Setup Intent
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Homeowner reserves project with a $500 deposit. Whop Payment Elements securely vaults the card on-file via <code className="font-mono text-slate-800 dark:text-slate-200">setup_future_usage: 'off_session'</code>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13151A] space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171A20] text-white dark:bg-white dark:text-[#171A20] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-[#171A20] dark:text-white">
                  Tear-off &amp; Build Execution
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Roofing crew arrives on-site, strips degraded shingles, installs underlayment, and completes architectural installation. Post-build drone scan certifies completion.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13151A] space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171A20] text-white dark:bg-white dark:text-[#171A20] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-[#171A20] dark:text-white">
                  Final Balance Invoice (Whop API)
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                Contractor issues final completion invoice via <code className="font-mono text-slate-800 dark:text-slate-200">POST /v1/invoices</code>. The vaulted card can be charged automatically or sent as a hosted Whop payment link.
              </p>
            </div>
          </div>

          {/* Right Column: Live Interactive Demo Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-7 sm:p-8 bg-white dark:bg-[#13151A] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  Interactive API Console
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  POST /v1/invoices
                </span>
              </div>

              {/* Card Vault Status */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0D0E12] flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
                    Customer Card Vaulted Status
                  </span>
                  <div className="text-xs font-mono text-[#171A20] dark:text-white mt-0.5">
                    {savedCard ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
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
                    className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  >
                    Simulate SetupIntent
                  </button>
                )}
              </div>

              {/* Invoice Parameter Controls */}
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Total Contract Value
                    </label>
                    <input
                      type="number"
                      value={contractTotal}
                      onChange={(e) => setContractTotal(Number(e.target.value))}
                      className="w-full bg-[#F8F9FA] dark:bg-[#0D0E12] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-[#171A20] dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Deposit Paid (Credited)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full bg-[#F8F9FA] dark:bg-[#0D0E12] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-[#171A20] dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8F9FA] dark:bg-[#0D0E12] flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    Remaining Completion Balance Due:
                  </span>
                  <span className="text-base font-bold text-[#171A20] dark:text-white font-mono">
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
                  <label htmlFor="auto-charge-check" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    Auto-charge vaulted SetupIntent card on completion
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full h-11 rounded-full bg-[#171A20] text-white hover:bg-black dark:bg-white dark:text-[#171A20] dark:hover:bg-slate-200 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Invoice via Whop API...</span>
                    </>
                  ) : (
                    <>
                      <span>Issue Final Invoice (${balanceDue.toLocaleString()})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Generated Invoice View */}
              {generatedInvoice && (
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Invoice Generated: {generatedInvoice.id}
                    </span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                      {generatedInvoice.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-1 font-mono">
                    <div>Customer: {generatedInvoice.customerName} ({generatedInvoice.customerEmail})</div>
                    <div>Balance: ${(generatedInvoice.amountDue ?? generatedInvoice.totalAmount).toLocaleString()} USD (Auto-charged: {generatedInvoice.autoCharge ? 'Yes' : 'No'})</div>
                  </div>

                  {generatedInvoice.hostedInvoiceUrl && (
                    <a
                      href={generatedInvoice.hostedInvoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline pt-1"
                    >
                      <span>View Hosted Whop Invoice Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
