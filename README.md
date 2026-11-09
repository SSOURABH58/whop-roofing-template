# ApexRoof & Solar - Production-Ready US Roofing & Solar Website Template for Whop Websites

[![Built for Whop Websites](https://img.shields.io/badge/Whop-Websites-FF6243?style=for-the-badge&logo=whop&logoColor=white)](https://whop.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js / React](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A high-converting, enterprise-grade contractor website template built specifically for US residential & commercial roofing and solar companies. Engineered from the ground up to integrate seamlessly with the **Whop Payments Ecosystem**, utilizing Whop Payment Elements, Whop Leads API, Card-on-File Setup Intents, Invoicing, and Custom Pixel Tracking.

---

## 🌟 Bounty Highlights & Architecture

ApexRoof & Solar satisfies all Whop Website bounty requirements with a turnkey, production-ready codebase:

### 1. Whop Payment Elements Integration
- **`CheckoutElement`**: Embedded full checkout flow with localized payment methods (Credit Card, ACH, Klarna/Afterpay).
- **`ExpressCheckoutElement`**: 1-click accelerated checkout via Apple Pay and Google Pay for instant deposit and inspection reservations.
- **`BrandingElement`**: Cohesive contractor branding integrated directly into the Whop payment container.

### 2. Whop Leads API for Estimates
- Interactive 4-step residential & solar estimate calculator.
- Automatically captures roof type, square footage, solar interest, address, and homeowner contact info.
- Syncs directly to Whop via `POST /api/leads` and fires custom CRM triggers.

### 3. Card-on-File Setup Intent & Invoices API
- **Setup Intent on Deposit**: Saves homeowner credit card securely on file via Whop Vault when paying initial project deposits.
- **Milestone Invoicing**: Generates automated progress invoices for material delivery, tear-off completion, and final sign-off using Whop Invoices API.

### 4. Custom Pixel Tracking (`whop.track`)
Integrated conversion tracking script for maximum ad attribution across Meta, Google, and Whop Analytics:
- `whop.track('Lead', { service: 'Roof Replacement', est_sqft: 2800 })`
- `whop.track('InitiateCheckout', { plan_id: 'plan_inspection_149', value: 149 })`
- `whop.track('Purchase', { transaction_id: '...', value: 500, currency: 'USD' })`
- Custom contractor events: `ScheduleInspection`, `CalculateEstimate`, `ContractSigned`.

---

## 📦 Default Products & Service Plans

The template comes pre-configured with 3 high-converting contractor offerings:

| Tier | Service | Price | Payment Flow | Features |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Drone Roof & Solar Inspection** | **$149** (Flat) | `ExpressCheckoutElement` (Apple/Google Pay) | 4K Thermal Drone Imaging, 15-Point Inspection Report, Attic Ventilation Analysis |
| **02** | **Project Reservation Deposit** | **$500** (Hold) | `CheckoutElement` + Card-on-File `SetupIntent` | Locks crew scheduling, locks material pricing for 60 days, credited towards final invoice |
| **03** | **Seasonal Gutter & Maintenance Tune-Up** | **$299** (Flat) | `CheckoutElement` (Direct Purchase) | Full gutter flush, 10-shingle minor repair, flashing reseal, storm readiness certification |

---

## 🏗️ Project Structure

```
whop-roofing-template/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/
│   │   │   ├── checkout/         # Whop Checkout Session handler
│   │   │   ├── leads/            # Whop Leads submission endpoint
│   │   │   ├── setup-intent/     # Card-on-file Setup Intent generation
│   │   │   └── webhooks/         # Whop Webhook event processor
│   │   ├── estimate/             # Instant Roof & Solar Quote Calculator
│   │   ├── services/             # Roofing, Solar, & Storm Damage pages
│   │   ├── page.tsx              # High-converting Homepage
│   │   └── layout.tsx            # Global Layout with Whop Pixel integration
│   ├── components/
│   │   ├── whop/
│   │   │   ├── WhopCheckoutModal.tsx
│   │   │   ├── WhopExpressCheckout.tsx
│   │   │   ├── WhopPixelTracker.tsx
│   │   │   └── WhopBranding.tsx
│   │   ├── sections/             # Hero, Trust Badges, Before/After Slider, Testimonials
│   │   └── ui/                   # Reusable accessible UI primitives
│   ├── lib/
│   │   ├── whop-client.ts        # Whop SDK & API client helpers
│   │   ├── tracking.ts           # whop.track client utility
│   │   └── constants.ts          # Default plans, prices, and company metadata
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/SSOURABH58/whop-roofing-template.git
cd whop-roofing-template
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Whop credentials:

```bash
cp .env.example .env.local
```

```env
# Whop API Credentials
NEXT_PUBLIC_WHOP_APP_ID=app_xxxxxxxxxxxx
WHOP_API_KEY=whop_sk_xxxxxxxxxxxxxxxxxxxxxxxx
WHOP_WEBHOOK_SECRET=whop_whsec_xxxxxxxxxxxx

# Whop Product Plan IDs
NEXT_PUBLIC_PLAN_INSPECTION=plan_xxxxxx_149
NEXT_PUBLIC_PLAN_DEPOSIT=plan_xxxxxx_500
NEXT_PUBLIC_PLAN_TUNEUP=plan_xxxxxx_299

# Whop Tracking Pixel ID
NEXT_PUBLIC_WHOP_PIXEL_ID=px_xxxxxxxxxxxx
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔒 Security & Compliance
- **PCI-DSS Level 1**: Zero sensitive card numbers hit your server; all tokenization happens inside isolated Whop Payment Elements.
- **Webhook Signature Verification**: Automated cryptographic validation on incoming Whop webhooks for invoice and membership events.
- **Strict TypeScript Validation**: Full typing for Whop API payloads, webhooks, and customer records.

---

## 📄 License
MIT License. Built for the Whop Websites Bounty.
