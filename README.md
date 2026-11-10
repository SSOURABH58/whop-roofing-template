# 🏠 ApexShield Roofing — Whop Websites Template

> **Production-ready US roofing contractor website template built natively for Whop Websites.**  
> Demonstrates the complete high-ticket contractor lifecycle: **$149 Inspection → $500 Deposit (Card-on-File) → Job → $8,500 Final Balance Invoicing**.

---

## 🔗 Key Links & Submission Details

| Resource | Link / Identifier |
| :--- | :--- |
| **🌐 Live Deployed Website** | [https://apexshield-roof.whop.site](https://apexshield-roof.whop.site) |
| **💻 GitHub Repository** | [https://github.com/SSOURABH58/whop-roofing-template](https://github.com/SSOURABH58/whop-roofing-template) |
| **🆔 Whop App ID** | `app_hDKSrzcvMnY3Lf` |
| **🏢 Whop Business Account** | `ApexShield Roofing` (`biz_FYZfrBxoUa70IZ`) |
| **🎥 Video Demo (3–5 min)** | *Add your Loom / unlisted video link here* |

---

## 💳 Verified Sandbox Plans

| Plan | Price | Type | Whop Plan ID | Description |
| :--- | :--- | :--- | :--- | :--- |
| **21-Point Roof Inspection** | **$149** | One-time | `plan_l16eM5wNPlPGS` | Attic & shingle drone inspection |
| **Project Reservation Deposit** | **$500** | One-time + Card-on-File | `plan_3qJhOgSXJrogE` | Setup intent for off-session milestone billing |
| **Seasonal Gutter & Tune-Up** | **$299** | Flat-rate | `plan_PUymlsjRn7YJN` | Standard seasonal maintenance service |
| **Final Balance Invoice Demo** | **$8,500** | Invoiced | `plan_dmwzyzVK4eRCh` | Programmatic draw/milestone invoice |

---

## ✨ Whop Features Implemented

1. **Whop Payment Elements (100% Native Checkout)**:
   - Uses `@whop/elements` & `@whop/elements-react`
   - `CheckoutElement` / `PaymentElement` with automatic BNPL financing (Klarna, Affirm)
   - `ExpressCheckoutElement` for one-touch Apple Pay & Google Pay
   - Required `BrandingElement` included
   - **Zero custom card forms** — strictly PCI compliant.

2. **"Request an Estimate" Form → Whop Leads API**:
   - Ingests customer name, email, phone, roof age, and address directly into Whop's CRM leads via `POST /api/v1/leads`.

3. **Card-on-File & Invoices API**:
   - Saves payment method off-session during the $500 project deposit.
   - Programmatically creates milestone & final balance invoices via the Whop Invoices API.

4. **Telemetry & Conversion Pixel (`whop.track`)**:
   - Fires verified custom tracking events:
     - `service_viewed`: When viewing roofing service tiers
     - `deposit_started`: When launching the project reservation checkout
     - `estimate_requested`: When the lead form is submitted

5. **Turnkey Reusable Template**:
   - Company branding, phone, address, and Whop plan IDs are configured via `.env` and simple config files. Non-technical contractors can rebrand in under 2 minutes.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/SSOURABH58/whop-roofing-template.git
cd whop-roofing-template

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Deploy via Whop CLI
npm run deploy
```

---

## 📄 License
MIT License. Built for the Whop Websites Roofing Template Bounty.
