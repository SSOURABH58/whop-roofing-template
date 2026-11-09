import React, { useState, useEffect } from 'react';
import { Receipt, CreditCard, CheckCircle2, Send, ExternalLink } from 'lucide-react';
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
          setSavedCard(JSON.parse(stored));
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
    <section id="invoices-demo" className="py-20 bg-slate-900/80 font-sans border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Receipt className="w-3.5 h-3.5" />
            Whop Invoices API &amp; Setup Intent Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            The Deposit ➔ Job ➔ Final Invoice Flow
          </h2>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">
            Roofing jobs require high-ticket milestone management. See how a homeowner's card is vaulted at deposit via Whop SetupIntent, then billed for the final completion balance via the Whop Invoices API.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3-Stage Lifecycle Explanation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Deposit &amp; Setup Intent</h3>
                  <p className="text-xs text-slate-400">Homeowner pays $500 project deposit</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                At deposit checkout, Whop Payment Elements attaches a <code className="text-amber-400 font-mono">setup_future_usage: 'off_session'</code> SetupIntent. The payment method is securely vaulted without holding merchant liability.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Materials &amp; 1-Day Tear-Off</h3>
                  <p className="text-xs text-slate-400">Work is completed and drone-inspected</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                Certified crew completes the tear-off, underlayment, shingle installation, and cleanup. A post-install thermal drone scan verifies zero leaks before invoice dispatch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900 border border-emerald-500/40 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Whop Invoices API Balance Billing</h3>
                  <p className="text-xs text-slate-400">Auto-charge or manual invoice link</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                Using <code className="text-emerald-400 font-mono">POST /v1/invoices</code>, the contractor issues the remaining balance invoice ($14,000) directly charging the vaulted card or emailing the hosted invoice link.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Balance Invoice Generator */}
          <div className="lg:col-span-7">
            <div className="bg-navy-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    Whop Invoices Generator
                  </h3>
                  <p className="text-xs text-slate-400">Generate a final balance bill for reviewer demo</p>
                </div>

                {/* Vaulted Card Status Pill */}
                {savedCard ? (
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Card Vaulted: Visa •••• {savedCard.last4}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSimulateVaultCard}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <span>Simulate Vaulting Card</span>
                  </button>
                )}
              </div>

              {/* Form to configure balance invoice */}
              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Total Job Contract ($)
                    </label>
                    <input
                      type="number"
                      value={contractTotal}
                      onChange={(e) => setContractTotal(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Deposit Already Paid ($)
                    </label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block font-mono">Net Remaining Balance Due</span>
                    <span className="text-2xl font-black text-amber-400 tabular-nums">
                      ${balanceDue.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 font-mono block">Milestone Trigger</span>
                    <span className="text-emerald-400 font-semibold">Drone Scan Approved</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Collection Method (Whop Invoices API)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAutoCharge(true)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        autoCharge
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-white">Auto-Charge Vaulted Card</span>
                      <span className="text-[10px] text-slate-400">Off-session charge via SetupIntent</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAutoCharge(false)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        !autoCharge
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold block text-white">Send Hosted Invoice Link</span>
                      <span className="text-[10px] text-slate-400">Homeowner pays via Klarna/Card link</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm"
                >
                  {isGenerating ? (
                    <span>Issuing Invoice on Whop API...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Issue Final Balance Invoice (${balanceDue.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </form>

              {/* Rendered Invoice Result */}
              {generatedInvoice && (
                <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Whop Invoice {generatedInvoice.status === 'paid' ? 'Paid & Collected' : 'Issued & Pending'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{generatedInvoice.id}</span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Memo:</span>
                      <span className="font-medium">{generatedInvoice.memo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Amount Charged:</span>
                      <span className="font-bold text-white tabular-nums">${generatedInvoice.totalAmount.toLocaleString()} USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Method:</span>
                      <span className="font-mono text-amber-300">
                        {generatedInvoice.paymentMethodId ? `Stored Method (${generatedInvoice.paymentMethodId})` : 'Hosted Link Dispatched'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-800 text-slate-400">
                    <span>Receipt sent to {generatedInvoice.customerEmail}</span>
                    <a
                      href={generatedInvoice.hostedInvoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                    >
                      <span>View Whop Receipt</span>
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
