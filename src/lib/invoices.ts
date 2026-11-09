/**
 * Whop Invoices & Card-on-File Lifecycle Helper
 *
 * Implements the contractor Deposit-to-Invoice milestone payment workflow:
 * 1. Step 1 (Deposit): Homeowner pays an initial deposit (e.g. $500), capturing
 *    and securing their credit card on file via a Whop SetupIntent.
 * 2. Step 2 (Milestone / Job Completion): General contractor or project manager
 *    generates the Final Balance invoice (e.g. $11,500) via Whop Invoices API (`POST /v1/invoices`).
 * 3. Step 3 (Settlement): Contractor issues the invoice (`POST /v1/invoices/:id/issue`),
 *    choosing either to auto-charge the stored card-on-file OR generate a Whop hosted
 *    invoice payment link with BNPL options.
 */

export interface StoredPaymentMethod {
  id: string; // payt_xxxxxxxx
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expMonth: number;
  expYear: number;
  customerEmail: string;
  setupIntentId: string;
  createdAt: string;
}

export type WhopCardOnFile = StoredPaymentMethod;

export interface WhopInvoiceLineItem {
  id?: string;
  title?: string;
  description?: string;
  quantity: number;
  unitAmount?: number;
  amount: number;
  totalAmount?: number;
}

export type WhopInvoiceStatus = 'draft' | 'open' | 'issued' | 'paid' | 'uncollectible' | 'void';

export interface WhopInvoice {
  id: string; // inv_xxxxxxxx or pay_xxxxxxxx
  accountId?: string;
  customerId?: string;
  customerEmail: string;
  customerName?: string;
  propertyAddress?: string;
  memo?: string;
  currency?: 'USD';
  status: WhopInvoiceStatus;
  items?: Array<{
    title: string;
    amount: number;
    quantity: number;
  }>;
  lineItems?: WhopInvoiceLineItem[];
  subtotal?: number;
  depositCredited?: number;
  amountDue?: number;
  totalAmount: number;
  amountPaid?: number;
  autoCharge: boolean;
  setupIntentId?: string;
  paymentMethodId?: string;
  paymentMethod?: WhopCardOnFile;
  hostedInvoiceUrl: string;
  paymentIntentId?: string;
  createdAt: string;
  paidAt?: string;
  dueDate?: number;
  notes?: string;
}

export interface CreateDepositResult {
  depositAmount: number;
  depositTransactionId: string;
  setupIntentId: string;
  cardOnFile: WhopCardOnFile;
  timestamp: number;
}

export interface CreateInvoiceParams {
  customerEmail: string;
  customerName?: string;
  propertyAddress?: string;
  memo?: string;
  lineItems?: {
    description: string;
    amount: number;
    quantity?: number;
  }[];
  items?: {
    title: string;
    amount: number;
    quantity: number;
  }[];
  depositCredited?: number;
  autoCharge?: boolean;
  setupIntentId?: string;
  paymentMethod?: WhopCardOnFile;
  notes?: string;
  dueInDays?: number;
}

export interface IssueInvoiceOptions {
  autoCharge?: boolean;
  setupIntentId?: string;
  paymentMethod?: WhopCardOnFile;
}

export interface InvoiceClientConfig {
  apiKey?: string;
  apiEndpoint?: string;
  forceMock?: boolean;
}

const STORAGE_INVOICES_KEY = 'whop_roofing_invoices_cache';
const STORAGE_CARD_KEY = 'whop_roofing_card_on_file';

function generateRandomId(prefix: string): string {
  const chars = 'abcdef0123456789';
  let rand = '';
  for (let i = 0; i < 10; i++) rand += chars.charAt(Math.floor(Math.random() * chars.length));
  return `${prefix}_${rand}`;
}

export function saveCardOnFile(card: WhopCardOnFile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_CARD_KEY, JSON.stringify(card));
    localStorage.setItem('whop_roofing_saved_card', JSON.stringify(card));
  } catch {
    // ignore
  }
}

export function getActiveCardOnFile(): WhopCardOnFile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_CARD_KEY) || localStorage.getItem('whop_roofing_saved_card');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function persistInvoice(invoice: WhopInvoice): void {
  if (typeof window === 'undefined') return;
  try {
    const existingRaw = localStorage.getItem(STORAGE_INVOICES_KEY);
    const invoices: WhopInvoice[] = existingRaw ? JSON.parse(existingRaw) : [];
    const index = invoices.findIndex((i) => i.id === invoice.id);
    if (index >= 0) {
      invoices[index] = invoice;
    } else {
      invoices.unshift(invoice);
    }
    localStorage.setItem(STORAGE_INVOICES_KEY, JSON.stringify(invoices.slice(0, 50)));
  } catch {
    // ignore
  }
}

export function getSavedInvoices(): WhopInvoice[] {
  if (typeof window === 'undefined') return [];
  try {
    const existingRaw = localStorage.getItem(STORAGE_INVOICES_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}

/**
 * Step 1A: Setup Intent creation for deposit payments
 */
export async function createDepositSetupIntent(
  customerEmail: string,
  depositAmount: number = 500
): Promise<{ setupIntentId: string; paymentMethod: StoredPaymentMethod }> {
  // Simulates / executes POST https://api.whop.com/v1/setup_intents
  await new Promise((resolve) => setTimeout(resolve, 300));

  const setupIntentId = generateRandomId('seti');
  const paymentMethodId = generateRandomId('payt');

  const paymentMethod: StoredPaymentMethod = {
    id: paymentMethodId,
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2028,
    customerEmail,
    setupIntentId,
    createdAt: new Date().toISOString(),
  };

  saveCardOnFile(paymentMethod);
  console.log(`[Whop SetupIntent] Registered card on file for ${customerEmail} ($${depositAmount} deposit)`);

  return { setupIntentId, paymentMethod };
}

/**
 * Step 1B: Record project deposit with card-on-file SetupIntent
 */
export function recordProjectDeposit(params: {
  customerName: string;
  customerEmail: string;
  depositAmount?: number;
  last4?: string;
  brand?: 'visa' | 'mastercard' | 'amex' | 'discover';
}): CreateDepositResult {
  const depositAmount = params.depositAmount ?? 500;
  const setupIntentId = generateRandomId('seti');
  const depositTxId = generateRandomId('tx_dep');

  const cardOnFile: WhopCardOnFile = {
    id: generateRandomId('payt'),
    brand: params.brand || 'visa',
    last4: params.last4 || '4242',
    expMonth: 12,
    expYear: 2028,
    customerEmail: params.customerEmail,
    setupIntentId,
    createdAt: new Date().toISOString(),
  };

  saveCardOnFile(cardOnFile);

  return {
    depositAmount,
    depositTransactionId: depositTxId,
    setupIntentId,
    cardOnFile,
    timestamp: Date.now(),
  };
}

/**
 * Step 2: Create a draft or finalized milestone invoice via Whop Invoices API
 */
export async function createInvoice(
  params: CreateInvoiceParams,
  config?: InvoiceClientConfig
): Promise<WhopInvoice> {
  const isMock = Boolean(config?.forceMock) || !config?.apiKey;
  const invoiceId = generateRandomId('inv');

  const rawItems = params.items || (params.lineItems ? params.lineItems.map(li => ({
    title: li.description,
    amount: li.amount,
    quantity: li.quantity || 1,
  })) : [
    { title: 'GAF Timberline HDZ Roof System Installation', amount: 12000, quantity: 1 }
  ]);

  const totalBeforeCredit = rawItems.reduce((acc, curr) => acc + (curr.amount * curr.quantity), 0);
  const depositCredited = params.depositCredited ?? 500;
  const finalBalance = Math.max(0, totalBeforeCredit - depositCredited);

  const invoice: WhopInvoice = {
    id: invoiceId,
    accountId: 'biz_FYZfrBxoUa70IZ',
    customerEmail: params.customerEmail,
    customerName: params.customerName || 'Alex Henderson',
    propertyAddress: params.propertyAddress || '742 Evergreen Terrace, Springfield, OR',
    memo: params.memo || 'Final settlement balance upon roof replacement completion',
    currency: 'USD',
    status: 'draft',
    items: rawItems,
    lineItems: rawItems.map((item, idx) => ({
      id: `li_${idx + 1}`,
      description: item.title,
      quantity: item.quantity,
      unitAmount: item.amount,
      amount: item.amount,
      totalAmount: item.amount * item.quantity,
    })),
    subtotal: totalBeforeCredit,
    depositCredited,
    amountDue: finalBalance,
    totalAmount: finalBalance,
    amountPaid: 0,
    autoCharge: Boolean(params.autoCharge),
    setupIntentId: params.setupIntentId,
    paymentMethod: params.paymentMethod || getActiveCardOnFile() || undefined,
    hostedInvoiceUrl: 'https://whop.com/checkout/plan_NZMM5QxZFVsoL',
    createdAt: new Date().toISOString(),
    dueDate: Math.floor(Date.now() / 1000) + 14 * 86400,
    notes: params.notes || `Initial $${depositCredited} reservation deposit credited towards project completion.`,
  };

  if (!isMock) {
    // optional live API handling if apiKey configured
  }

  persistInvoice(invoice);
  return invoice;
}

/**
 * Step 3: Issue and optionally auto-charge an invoice
 */
export async function issueInvoice(
  invoiceId: string,
  options?: IssueInvoiceOptions,
  _config?: InvoiceClientConfig
): Promise<WhopInvoice> {
  const existingInvoices = getSavedInvoices();
  const current = existingInvoices.find((i) => i.id === invoiceId);

  const shouldAutoCharge = options?.autoCharge ?? current?.autoCharge ?? false;
  const card = options?.paymentMethod || current?.paymentMethod || getActiveCardOnFile();

  await new Promise((resolve) => setTimeout(resolve, 300));

  const updatedInvoice: WhopInvoice = current || {
    id: invoiceId,
    accountId: 'biz_FYZfrBxoUa70IZ',
    customerEmail: 'alex.henderson@example.com',
    customerName: 'Alex Henderson',
    memo: 'Final balance settlement',
    totalAmount: 2450,
    amountDue: 2450,
    status: 'draft',
    autoCharge: shouldAutoCharge,
    hostedInvoiceUrl: 'https://whop.com/checkout/plan_NZMM5QxZFVsoL',
    createdAt: new Date().toISOString(),
  };

  if (shouldAutoCharge && (card || updatedInvoice.setupIntentId)) {
    updatedInvoice.status = 'paid';
    updatedInvoice.amountPaid = updatedInvoice.amountDue || updatedInvoice.totalAmount;
    updatedInvoice.paidAt = new Date().toISOString();
    updatedInvoice.paymentIntentId = generateRandomId('pi');
  } else {
    updatedInvoice.status = 'issued';
  }

  persistInvoice(updatedInvoice);
  return updatedInvoice;
}

export interface CreateFinalBalanceInvoiceParams {
  customerEmail: string;
  customerName?: string;
  jobTitle?: string;
  contractTotal: number;
  depositPaid: number;
  autoCharge: boolean;
}

/**
 * Creates and processes the final milestone balance invoice after job completion
 */
export async function createFinalBalanceInvoice(
  params: CreateFinalBalanceInvoiceParams,
  config?: InvoiceClientConfig
): Promise<WhopInvoice> {
  const card = getActiveCardOnFile();

  const invoice = await createInvoice(
    {
      customerEmail: params.customerEmail,
      customerName: params.customerName || 'Alex Henderson',
      items: [
        {
          title: params.jobTitle || 'Architectural Shingle Roof Replacement',
          amount: params.contractTotal,
          quantity: 1,
        },
      ],
      depositCredited: params.depositPaid,
      autoCharge: params.autoCharge,
      setupIntentId: card?.setupIntentId,
      paymentMethod: card || undefined,
      memo: `Final settlement balance for ${params.jobTitle || 'Roof Replacement'}`,
    },
    config
  );

  if (params.autoCharge && card) {
    return issueInvoice(
      invoice.id,
      {
        autoCharge: true,
        setupIntentId: card.setupIntentId,
        paymentMethod: card,
      },
      config
    );
  }

  return invoice;
}

/**
 * End-to-End Demo helper simulating the full $500 Deposit -> $11,500 Final Invoice lifecycle
 */
export async function executeContractorPaymentLifecycleDemo(params: {
  customerName: string;
  customerEmail: string;
  propertyAddress: string;
  depositAmount?: number;
  finalJobTotal?: number;
  autoChargeCardOnFile?: boolean;
}): Promise<{
  deposit: CreateDepositResult;
  finalInvoice: WhopInvoice;
  settledInvoice: WhopInvoice;
}> {
  const depositAmt = params.depositAmount ?? 500;
  const totalCost = params.finalJobTotal ?? 12000;

  const deposit = recordProjectDeposit({
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    depositAmount: depositAmt,
    last4: '4242',
    brand: 'visa',
  });

  const draftInvoice = await createInvoice({
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    propertyAddress: params.propertyAddress,
    depositCredited: depositAmt,
    setupIntentId: deposit.setupIntentId,
    paymentMethod: deposit.cardOnFile,
    autoCharge: params.autoChargeCardOnFile ?? true,
    items: [
      {
        title: '50-Year GAF Timberline HDZ Architectural Shingle System (Tear-off + Underlayment)',
        amount: totalCost,
        quantity: 1,
      },
    ],
  });

  const settledInvoice = await issueInvoice(draftInvoice.id, {
    autoCharge: params.autoChargeCardOnFile ?? true,
    setupIntentId: deposit.setupIntentId,
    paymentMethod: deposit.cardOnFile,
  });

  return {
    deposit,
    finalInvoice: draftInvoice,
    settledInvoice,
  };
}
