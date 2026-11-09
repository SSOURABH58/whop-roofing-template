# UX Architecture & User Behavior Specification
## ApexShield Roofing & Restoration — Whop-Powered US Roofing Bounty Template

> **Author**: UX & User Behavior Architect  
> **Status**: Approved for Implementation  
> **Target Audience**: US Homeowners, Commercial Property Managers, Insurance Claimants, and Roofing Contractors  
> **Platform & Stack**: Next.js 14 / React 18, Tailwind CSS, TypeScript, Whop Payments Ecosystem (`@whop/elements-react`, Whop Leads API, Whop Invoices API, `whop.track`)

---

## 1. Executive Summary & Conversion Philosophy

Roofing is one of the highest-stakes, highest-ticket home services in North America ($8,000 – $45,000 average replacement contract). Unlike consumer e-commerce, **homeowners approaching a roofing website are typically experiencing one of two emotional extremes: acute panic (leaks, active storm damage, falling branches) or intense financial skepticism (fear of contractor fraud, confusing estimates, pushy salespeople).**

To win the bounty and deliver a template that real US roofing companies will immediately buy, our UX architecture operates on three core design tenets:
1. **Radical Transparency & Certainty**: Clear pricing anchors, visible license numbers, verified reviews, and real-time financing calculators eliminate homeowner distrust within the first 5 seconds.
2. **Bifurcated Mental Model Routing (The Dual-Fork Hero)**: Instantly splits traffic between the panic-driven "Emergency Homeowner" (needs immediate dispatch and instant booking) and the analytical "Planned Replacement Buyer" (needs estimates, social proof, and financing options).
3. **Frictionless Whop Commercial Engine**: Seamlessly embeds Whop's modern fintech infrastructure (`ExpressCheckoutElement`, `PaymentElement`, `BrandingElement`, Card-on-File `SetupIntent`, and `Whop Invoices API`) into an authentic, highly credible contractor website.

---

## 2. User Behavioral Archetypes & Mental Models

```
                                  ┌─────────────────────────────┐
                                  │   Homeowner Visits Website  │
                                  └──────────────┬──────────────┘
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        ▼                                                 ▼
        ┌───────────────────────────────┐                 ┌───────────────────────────────┐
        │     EMERGENCY HOMEOWNER       │                 │   PLANNED REPLACEMENT BUYER   │
        ├───────────────────────────────┤                 ├───────────────────────────────┤
        │ • Active leak / ceiling drip  │                 │ • 15–25 year old roof         │
        │ • Recent hail/wind storm      │                 │ • Missing shingles / moss     │
        │ • High cortisol / anxious     │                 │ • Researching costs & options │
        │ • Goal: Stop water NOW        │                 │ • Goal: Fair price & warranty │
        │ • Needs: 1-tap call or $149   │                 │ • Needs: Estimate calculator, │
        │   same-day inspection booking │                 │   Whop financing, reviews     │
        └───────────────┬───────────────┘                 └───────────────┬───────────────┘
                        │                                                 │
                        ▼                                                 ▼
        ┌───────────────────────────────┐                 ┌───────────────────────────────┐
        │ Fast Path:                    │                 │ Value Path:                   │
        │ • Emergency Banner / Hot Call │                 │ • Interactive Estimate Funnel │
        │ • 1-Click $149 Drone Booking  │                 │ • Financing ($0 Down Klarna)  │
        │ • 45-Min Dispatch Confirmation│                 │ • $500 Project Deposit Lock   │
        └───────────────────────────────┘                 └───────────────────────────────┘
```

### Archetype 1: The Emergency Homeowner (Active Crisis)
* **Emotional State**: High anxiety, feeling vulnerable to gouging, urgent need for relief.
* **Behavior Pattern**: 78% on mobile devices while standing in the hallway looking at water damage. Scans furiously for a phone number or guaranteed immediate arrival time. Will bounce within 4 seconds if forced to read paragraphs of marketing copy.
* **Primary UX Path**:
  1. Sticky top emergency dispatch bar with one-tap phone dialing (`tel:800-555-ROOF`).
  2. Live status indicator: `"⚡ 2 Crews on Standby in [Metro Area] • 45-Min Avg Response"`.
  3. Emergency Tarping ($499) or Drone Inspection ($149) with 1-tap Apple Pay/Google Pay via `ExpressCheckoutElement`.
* **Conversion Metric**: Time-to-Call < 10 seconds or Inspection Scheduled < 60 seconds.

### Archetype 2: The Planned Replacement Buyer (High Consideration)
* **Emotional State**: Deliberate, budget-conscious, dreading high-pressure sales visits.
* **Behavior Pattern**: 60% desktop/tablet in the evening. Reads reviews, checks licenses, analyzes warranty details, and wants to understand financing before giving out their personal phone number.
* **Primary UX Path**:
  1. Interactive Estimate Calculator (4 quick visual taps: pitch, size, material, urgency).
  2. Whop Financing Breakdown: Transparent monthly payment visualization ($0 Down, $119/mo with Klarna / Splitit / Afterpay).
  3. Interactive Before/After slider showing verified local transformations.
  4. Project Reservation Deposit ($500) that locks labor pricing and material allocations for 60 days.
* **Conversion Metric**: Completed Lead Form (`estimate_requested`) or Paid Project Deposit (`deposit_started`).

### Archetype 3: The Insurance Claim Homeowner (Storm Restoration)
* **Emotional State**: Frustrated by insurance adjuster pushback; needs a licensed advocate who understands Xactimate estimating and code supplements.
* **Primary UX Path**: Dedicated insurance claims assistance badge, proof of manufacturer certifications (GAF Master Elite), and zero-out-of-pocket deductible guidance.

---

## 3. Information Architecture & Page Hierarchy Blueprint

### Section 1: Sticky Utility Header & Emergency Banner
* **Emergency Top Banner** (Subtle red-accented dark slate bar):
  * Left: `🚨 24/7 Storm Response & Emergency Tarping Active`
  * Center: Real-time city dispatch ticker: `Dispatching in Dallas-Fort Worth Metro`
  * Right: Direct 1-tap call: `(800) 555-7663`
* **Main Navigation Bar** (Sticky, semi-transparent blur on scroll):
  * **Brand Identity**: `ApexShield Roofing & Restoration` with certified GAF badge icon.
  * **Nav Links**: Services, Before & After, Financing ($0 Down), Service Area, Reviews, About.
  * **Direct Actions**:
    * Secondary Outline Button: `Book $149 Inspection` (Opens Whop Express Checkout).
    * Primary Accent Button: `Get Free Estimate` (Smooth scrolls to multi-step estimator).

### Section 2: Dual-Action Hero Section (Tesla-Level Clarity)
* **Headline**: *Mastercraft Protection. Engineered for Generations.*
* **Sub-headline**: US-Certified roofing & restoration specialists. Over 4,200 roofs installed with lifetime transferable warranties, same-day drone inspections, and $0-down Whop financing.
* **Dual-Action Fork (The Cognitive Split)**:
  * **Action A (Primary Amber/Gold)**: `Calculate Instant Estimate →`  
    *Subtitle: 60-second interactive quote, no salesperson spam.*
  * **Action B (Ghost / Emergency Outline)**: `🚨 Emergency Leak / Book Inspection ($149)`  
    *Subtitle: Guaranteed 2-hour dispatch window or next-day 4K drone audit.*
* **Trust Credential Micro-Pill**:
  * ⭐⭐⭐⭐⭐ `4.9/5 Rating across 640+ Google & BBB Reviews • GAF Master Elite® (Top 2% in US)`
* **Hero Background**: High-definition architectural slate shingle photography with high contrast, crisp typography, and high performance (WebP, fetchpriority="high").

### Section 3: Credibility & Manufacturer Accreditation Strip
A clean, horizontal trust ribbon featuring vector badges of the most recognized certifications in the US roofing industry:
* **GAF Master Elite® Contractor** (Only top 2% of US roofers qualify)
* **Owens Corning Platinum Preferred**
* **CertainTeed 5-Star Select ShingleMaster**
* **BBB Accredited Business (A+ Rating)**
* **$2,000,000 General Liability & Workman's Comp Insured**
* **Director of Drone Operations — FAA Part 107 Certified**

### Section 4: Interactive Services Matrix (With Whop Pricing Anchors)
Three core service pillars presented in card format with diagnostic self-selection criteria:

| Service Pillar | Diagnostic Trigger | Standard Price | Whop Checkout Integration | Core Deliverables |
| :--- | :--- | :--- | :--- | :--- |
| **01. Drone Roof & Attic Inspection** | Hail storm, suspected leak, pre-purchase audit | **$149** (100% credited to work) | `ExpressCheckoutElement` (1-Tap Apple/Google Pay) | 4K Thermal Drone Scan, 24-Page Xactimate-ready PDF report, Attic ventilation & moisture check. |
| **02. Complete Roof Replacement** | Roof > 18 yrs, curling shingles, storm loss | **$500 Deposit** (Custom balance) | `CheckoutElement` + Card-on-File `SetupIntent` | Full architectural shingle tear-off, synthetic underlayment, ice & water shield, 50-year warranty. |
| **03. Roof Tune-Up & Maintenance** | Minor leaks, loose flashing, preventative care | **$299** Flat | `CheckoutElement` (Direct payment) | 10-shingle replacement, pipe boot resealing, full gutter cleanout, 2-year leak-free warranty. |

* **Interactive Modal Drawer**: Clicking any card opens a slide-over drawer with full scope of work, material specs, warranty comparison, and instant Whop checkout trigger.
* **Tracking Hook**: Triggers `whop.track('service_viewed', { service_name, price, currency: 'USD' })`.

### Section 5: Interactive Before / After Transformation Slider
* **Visual Component**: Split-image interactive drag slider comparing severe hail/storm deterioration vs. a completed architectural charcoal slate installation.
* **Context Micro-Badges**:
  * Location: *Plano, TX — Hail Damage Restoration*
  * Insurance Payout: *$18,450 approved via supplement*
  * Homeowner Out-of-Pocket: *$0 Deductible Assistance*
  * Duration: *1-Day Tear-off & Installation*

### Section 6: Transparent Financing & ROI Calculator (Whop BNPL Powered)
A critical conversion section that demystifies project cost and brings Whop financing front and center:
* **Interactive Sliders**:
  * Roof Footprint Slider: 1,500 sq ft → 4,500 sq ft.
  * Material Quality Toggle: Architectural Asphalt, Impact-Resistant Class 4, Standing Seam Metal.
* **Live Calculation Output**:
  * Estimated Investment: `$9,500 – $14,200`
  * Whop Buy-Now-Pay-Later Breakdown:
    * `Klarna / Splitit / Afterpay`: **$0 Down, $129/month** (36-month term at 0% APR on approved credit)
    * Or 4 bi-weekly payments of **$0 interest** for repairs.
* **Financing Value Proposition Cards**:
  * 0% Interest introductory options
  * No prepayment penalties
  * Instant pre-qualification with soft credit pull (no credit score impact)
* **Direct CTA**: `Pre-Qualify in 90 Seconds via Whop →`

### Section 7: Interactive Service Area & Instant Zip Code Verification
* **Homeowner Problem**: "Do they actually service my neighborhood or will I pay a travel surcharge?"
* **Solution**:
  * Live Zip Code input with real-time feedback:
    * E.g., User enters `75001` → Instant green badge: `✅ Yes! We have 2 crews active in Addison & North Dallas. Standard dispatch: Under 2 hours.`
    * If outside direct radius → `⚠️ Extended Coverage Area: Remote drone consultation available.`
  * Clickable county/city badges displaying local past project counts (e.g. *Dallas (412 roofs)*, *Fort Worth (328 roofs)*, *Frisco (289 roofs)*, *Plano (350 roofs)*).

### Section 8: Multi-Step "Request an Estimate" Funnel (Whop Leads API)
A progressive disclosure form designed to achieve a 45%+ completion rate by reducing cognitive fatigue:
* **Step 1: Service Type** (Large visual cards with icons)
  * Complete Replacement | Leak Repair | Storm Damage Assessment | Commercial
* **Step 2: Property Architecture & Stories**
  * 1 Story | 2 Stories | 3+ Stories | Flat / Commercial Roof
* **Step 3: Roof Age & Timing Urgency**
  * Age: Under 10 yrs | 10–20 yrs | 20+ yrs | Unknown
  * Urgency: Emergency (Active Leak) | Within 30 days | Researching for next season
* **Step 4: Property Details & Verified Contact**
  * Street Address (with Google Places autocomplete for accurate aerial sizing)
  * Full Name, Cell Phone (with SMS opt-in for dispatch updates), Email
* **Submission Action**:
  * Asynchronously dispatches to `/api/leads` ➔ forwards payload to **Whop Leads API** (`POST https://api.whop.com/v5/leads`).
  * Fires custom pixel event: `whop.track('estimate_requested', { ... })`.
  * Renders an immediate interactive confirmation card displaying:
    * Lead reference number.
    * Assigned local project estimator profile with photo and license badge.
    * Option to instantly jump the line by locking a $149 inspection.

### Section 9: Whop Elements Checkout Modal Experience
When the homeowner clicks any of the 3 plan purchase actions, a sleek, accessible modal opens:
* **Left Column / Top**: Order Summary Card:
  * Selected Service (e.g., *Project Reservation Deposit: $500* or *Drone Inspection: $149*).
  * Guaranteed Lock Terms: *"Locks crew scheduling date & material supplier prices for 60 calendar days. 100% credited to your final project invoice."*
  * Security reassurance: 256-bit SSL encrypted, GAF Master Elite Guarantee.
* **Right Column / Payment Elements**:
  1. `<ExpressCheckoutElement />`: Instant Apple Pay / Google Pay button for 1-click conversion without typing credit card numbers.
  2. `<PaymentElement />`: Comprehensive card form supporting Visa, Mastercard, Amex, plus dynamic Whop BNPL options (Klarna, Splitit, Afterpay).
  3. `<BrandingElement />`: Mandatory Whop trust badge establishing payment security.
* **Event Hook**: Fires `whop.track('deposit_started', { plan_id, amount: 500, currency: 'USD' })` upon modal opening.

### Section 10: Post-Deposit Experience & Whop Invoices API Lifecycle Demo
A dedicated educational section illustrating the modern, transparent billing process that solves the contractor industry's biggest trust issue (hidden charges and surprise balances):

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HOW BILLING WORKS WITH APEXSHIELD                    │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ 1. DEPOSIT ($500)  │ 2. TEAR-OFF & BUILD│ 3. FINAL MILESTONE INVOICE   │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Homeowner pays     │ Work begins. 4K    │ Final quality walkthrough.   │
│ $500 reservation.  │ drone photos taken │ Whop Invoices API generates  │
│ Card stored        │ at deck-level and  │ itemized balance. Stored card│
│ securely via Whop  │ sent daily to      │ charged automatically OR     │
│ SetupIntent vault. │ homeowner portal.  │ split over Klarna/Splitit.   │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

* **Interactive Feature**: Live interactive preview of a sample Whop Invoice with itemized line items (Square footage, GAF Timberline HDZ shingles, ice & water shield, disposal fee, credit of $500 deposit).

### Section 11: Real Customer Proof & Verified Reviews
* Real reviews pulled from Google My Business and BBB.
* Each review contains:
  * Customer name and verified homeowner tag.
  * Neighborhood / City.
  * Service performed (e.g., *Full Replacement & Gutter Shield*).
  * Star rating (5/5) and photo of the completed home.

### Section 12: High-Converting FAQ & Contractor Transparency
Directly tackles the 6 biggest homeowner objections:
1. *Do you assist with insurance claims and deductibles?*
2. *Why do you charge $149 for a drone inspection, and is it refundable?* (Answer: Yes, 100% credited toward any repair or replacement).
3. *How does the $500 deposit work? Is my money protected?* (Answer: Held securely in escrow via Whop Payments, locks material pricing, fully refundable prior to material order).
4. *How long does a typical roof replacement take?* (Answer: 95% of residential roofs completed in a single day with magnetic nail sweep).
5. *What warranties do you provide?* (Answer: 50-Year Non-Prorated GAF Golden Pledge + 25-Year Workmanship).
6. *Can I finance the entire balance through Whop?* (Answer: Yes, 0% APR and low-monthly options available via Klarna and Splitit).

### Section 13: Footer & Mobile Bottom Sticky Bar
* **Footer**: License numbers, insurance policy numbers, physical headquarters address, emergency hotline, service area sitemap, privacy policy, and Whop merchant disclosure.
* **Mobile Bottom Sticky Bar** (Fixed on mobile screens < 768px):
  * Left: `📞 Call (800) 555-ROOF` (Immediate emergency dialer).
  * Right: `⚡ Free Estimate` (Expands estimate funnel).

---

## 4. Whop Custom Pixel Tracking Blueprint (`whop.track`)

To ensure superior attribution and analytics for contractor marketing campaigns, custom pixel events must fire at deterministic interaction milestones:

### 1. `estimate_requested`
* **Trigger Point**: Fired immediately upon successful submission of Step 4 in the Request an Estimate form (after the `/api/leads` endpoint responds with `200 OK`).
* **Payload Architecture**:
  ```typescript
  whop.track('estimate_requested', {
    service: formState.serviceType,          // 'replacement' | 'repair' | 'inspection'
    property_type: formState.propertyType,  // 'single_family' | 'commercial'
    stories: formState.stories,              // 1 | 2 | 3
    roof_age: formState.roofAge,            // '10-20_years'
    urgency: formState.urgency,              // 'emergency' | 'standard'
    zip_code: formState.zipCode,            // '75001'
    source_url: window.location.href,
    timestamp: new Date().toISOString()
  });
  ```

### 2. `service_viewed`
* **Trigger Point**: Fired when a user clicks on any service card, opens a service detail drawer, or selects a plan in the comparison matrix.
* **Payload Architecture**:
  ```typescript
  whop.track('service_viewed', {
    service_id: 'plan_inspection_149',      // or 'plan_deposit_500', 'plan_tuneup_299'
    service_name: 'Drone Roof & Attic Inspection',
    price: 149.00,
    currency: 'USD',
    category: 'residential_roofing'
  });
  ```

### 3. `deposit_started`
* **Trigger Point**: Fired when the user clicks the CTA to open the Whop Checkout Modal for either the $500 Deposit, $149 Inspection, or $299 Tune-Up.
* **Payload Architecture**:
  ```typescript
  whop.track('deposit_started', {
    plan_id: selectedPlan.id,                // 'plan_deposit_500'
    plan_name: selectedPlan.name,            // 'Project Reservation Deposit'
    amount: selectedPlan.price,              // 500.00
    currency: 'USD',
    checkout_mode: 'whop_elements_modal'
  });
  ```

### 4. Supporting Interaction Events
* `zip_checked`: `{ zip: '75001', in_service_area: true }` (Tracks local geographic interest).
* `financing_calculator_used`: `{ estimated_sqft: 2800, monthly_estimate: 149 }`.

---

## 5. Mobile-First Friction Reduction & Ergonomics

1. **Thumb Zone Engineering**:
   - 78% of emergency roofing searches happen on smartphones during adverse weather. All primary CTAs (phone dial, submit button, payment action) reside in the lower 40% of the viewport (the natural thumb sweep zone).
2. **Zero Form Dead Ends**:
   - In the multi-step estimate form, hitting "Back" never wipes previous inputs. Inputs persist in browser `sessionStorage` with instant autosave.
3. **Optimistic Feedback & Skeleton States**:
   - The Whop Payment Element modal shows custom shimmer skeletons matching the dark slate contractor theme while Whop scripts initialize, preventing visual layout jumps (CLS 0.000).
4. **Click-to-Call Accessibility**:
   - Every phone number uses semantic `<a href="tel:...">` with instant touch feedback and micro-copy: *"Average wait: Under 30 seconds"*.
5. **No Wall-of-Text Copy**:
   - Every technical roofing specification (flashing, drip edge, ridge cap, underlayment) is broken into 3-word bullet points accompanied by iconography.

---

## 6. Implementation Readiness Checklist

- [x] Dual-Action Hero Fork with Emergency Callout
- [x] GAF Master Elite & Manufacturer Trust Strip
- [x] 3 Default Whop Plans ($149 Inspection, $500 Deposit, $299 Tune-Up)
- [x] Interactive Before / After Comparison Slider
- [x] Whop BNPL Financing Calculator ($0 Down, Klarna/Splitit)
- [x] Instant Zip Code Coverage Checker
- [x] 4-Step Progressive Lead Capture Funnel wired to Whop Leads API
- [x] Whop Elements Checkout Modal (`ExpressCheckoutElement`, `PaymentElement`, `BrandingElement`)
- [x] Card-on-File SetupIntent and Invoices API Milestone Showcase
- [x] Strict `whop.track` Event Telemetry Integration
- [x] Mobile Sticky Emergency Action Bar

*This blueprint is finalized and ready for code implementation.*
