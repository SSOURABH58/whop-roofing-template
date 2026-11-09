# ApexShield Roofing & Restoration — Design Framework & Brand Specification

> **Target Vertical**: High-End US Residential & Commercial Roofing & Architectural Solar  
> **Platform**: Whop Websites (`*.whop.app`), Whop Elements (`@whop/elements`), Whop Leads & Invoices  
> **Design Philosophy**: Tesla-Grade Structural Minimalism + US Contractor Mastercraft Authority (Navy, Charcoal Slate & Architectural Amber)

---

## 1. Brand Identity & Positioning

### Brand Name & Entity
* **Primary Brand Name**: **ApexShield Roofing & Restoration** (Configurable alias: **ApexGuard Architectural Roofing**)
* **Tagline**: *“Engineered for Extremes. Built for Generations.”*
* **Sub-Tagline / Value Hook**: *“Certified GAF Master Elite® contractor. Storm-resilient architectural roofing, thermal drone inspections, and turnkey solar shingle integration across the USA.”*
* **Tone of Voice**: Authoritative, reassuring, precision-engineered, transparent, high-ticket contractor craftsmanship.

### Why We Eliminated Tesla's Crimson Red
1. **The Psychology of US Home Improvement**: In home renovation and construction, red signals emergency warnings, code violations, structural failure, or financial panic (budget overruns).
2. **Contractor Authority Standards**: The highest-converting US roofing companies (e.g. Owens Corning Platinum, GAF Master Elite, Baker Roofing, Aspen Contracting) anchor their identity in **Deep Mastercraft Navy** (structural integrity, water tightness, calm insurance trust) combined with **Architectural Charcoal** (asphalt slate realism) and **Safety/Craft Amber** (high-visibility certified master contractor seals, solar energy harvest, and urgent CTA conversion).
3. **Universal White-Label Appeal**: While Tesla Red is polarizing, Navy + Amber + Slate Charcoal is universally respected by residential homeowners, HOA boards, and commercial property managers alike.

---

## 2. Complete Color System & Design Tokens

The color system is organized into dynamic CSS custom properties (`var(--...)`) mapped to Tailwind CSS tokens, allowing **instant 10-second white-label re-theming** by altering 3 hex variables.

### A. Primary Brand: Mastercraft Navy (Integrity & Structural Security)
Evokes 50-year non-prorated architectural warranties, water shedding, and corporate stability.

| Token | HEX | HSL | RGB | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `navy-950` | `#08101C` | `217° 56% 7%` | `rgb(8, 16, 28)` | Deepest page canvas underlay |
| `navy-900` | `#0B192C` | `215° 60% 11%` | `rgb(11, 25, 44)` | Dark header, navigation bar, hero backing |
| `navy-800` | `#0F2744` | `213° 64% 16%` | `rgb(15, 39, 68)` | Elevated container card surface |
| `navy-700` | `#1B3B6F` | `217° 61% 27%` | `rgb(27, 59, 111)` | Card borders, secondary buttons, interactive highlights |
| `navy-500` | `#2563EB` | `221° 83% 53%` | `rgb(37, 99, 235)` | Active state indicator, technical links |

### B. Accent & Conversion: Warm Architectural Amber / Hard-Hat Gold
The primary conversion engine. Used for primary CTAs, 5-star ratings, warranty badges, and drone inspection callouts.

| Token | HEX | HSL | RGB | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `amber-600` | `#D97706` | `38° 92% 44%` | `rgb(217, 119, 6)` | Button hover state, deep badge border |
| `amber-500` | `#F59E0B` | `38° 92% 50%` | `rgb(245, 158, 11)` | **Primary CTA Button**, Star ratings, Featured Badges |
| `amber-400` | `#FBBF24` | `43° 96% 56%` | `rgb(251, 191, 36)` | Glowing rim lights, toggle highlights |
| `amber-100` | `#FEF3C7` | `48° 96% 89%` | `rgb(254, 243, 199)` | Pill badge background (high contrast text) |

### C. Canvas, Surfaces & Shingle Slate (Tesla-Inspired Minimalist Dark)
Dark, sleek, premium architectural surfaces modeled after matte standing-seam zinc and architectural shingles.

| Token | HEX | HSL | Tailwind Equivalent | Role |
| :--- | :--- | :--- | :--- | :--- |
| `canvas-base` | `#070A0F` | `220° 40% 4%` | `bg-slate-950` / `bg-[#070A0F]` | Global body background |
| `surface-1` | `#0E1420` | `220° 39% 9%` | `bg-[#0E1420]` | Main section cards, service modules |
| `surface-2` | `#161F30` | `220° 37% 14%` | `bg-[#161F30]` | Hovered cards, payment element wrapper |
| `border-subtle`| `#1E293B` | `217° 33% 17%` | `border-slate-800` | Default card and divider borders |
| `border-focus` | `rgba(245, 158, 11, 0.4)` | — | `border-amber-500/40` | Active form inputs, featured plans |

### D. Semantic & Status Colors
* **Insurance Claim / Warranty Verified**: `Emerald-500` (`#10B981`) — Signals 100% covered claims, approved financing, and 0-deductible status.
* **Storm Alert / Emergency Tarping**: `Orange-500` (`#F97316`) — Signals 24/7 rapid response without the anxiety of harsh neon red.
* **Muted Copy / Secondary Specs**: `Slate-400` (`#94A3B8`) — Optimal 4.5:1+ WCAG AA contrast against `#0E1420`.
* **Crisp Headings / Primary Copy**: `White / Slate-50` (`#F8FAFC`) — High contrast readability.

---

## 3. Typography Scale & Hierarchy

Engineered for architectural authority and razor-sharp pricing display.

* **Primary Font (Headings & Brand Display)**: `Plus Jakarta Sans` or `Inter Display`
  * Features: Geometric curves, tall x-height, aggressive modern tracking (`tracking-tight` / `-0.03em`).
* **Body Font (Copy, Specifications, Form Labels)**: `Inter`
  * Features: Neutral, highly legible at 14px on mobile screens in direct sunlight on a job site.
* **Technical & Pricing Font**: `font-mono tabular-nums` (`JetBrains Mono` or native system mono)
  * Ensures pricing figures (`$149`, `$500`, `$12,850`) and technical specs (`130 MPH`, `50-Yr`) never jump or shift layout during animations.

### Typographic Hierarchy Scale
```css
/* Hero Headline */
text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]

/* Section Header (H2) */
text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight

/* Card Header (H3) */
text-xl sm:text-2xl font-bold text-slate-100 tracking-normal

/* Feature / Metric Label */
text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-500

/* Body Copy */
text-base sm:text-lg text-slate-300 leading-relaxed font-normal

/* Microcopy & Disclaimers */
text-xs text-slate-400 font-medium
```

---

## 4. Component Design System Specification

### 1. High-Converting CTA Buttons
* **Primary Conversion Button (`btn-primary`)**:
  ```html
  <button class="relative inline-flex items-center justify-center px-7 py-3.5 text-base font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950">
    <span>Get Instant Roof Estimate</span>
    <svg class="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" ...></svg>
  </button>
  ```
* **Secondary / Architectural Button (`btn-secondary`)**:
  ```html
  <button class="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 rounded-xl backdrop-blur-sm transition-all duration-150">
    <span>Explore Materials & Solar</span>
  </button>
  ```
* **Emergency Storm Service Hotline**:
  ```html
  <a href="tel:..." class="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 rounded-full hover:bg-amber-900/50 transition-colors">
    <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
    24/7 Storm Response: (800) 555-ROOF
  </a>
  ```

### 2. Whop Elements Checkout & Payment Surface
The checkout card must seamlessly blend Whop's hosted elements with the dark architectural theme.
* **Wrapper Container**:
  `bg-[#0E1420] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden`
* **Subtle Ambient Backlight**:
  `absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none`
* **Whop BrandingElement**:
  Configured with dark mode token: `theme: 'dark'`, accent color `#F59E0B`, card background `#161F30`.
* **ExpressCheckoutElement (Apple Pay / Google Pay)**:
  Positioned at the top of the payment card for 1-click $149 inspection booking and $500 project holds.
* **Financing Callout Badge**:
  `bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-lg p-3 text-xs sm:text-sm font-medium flex items-center gap-2.5`
  *"0% APR Financing for up to 18 Months available at checkout via Klarna & Affirm."*

### 3. Trust & Certification Badges Grid
Trust credentials are front-and-center under the hero fold:
* **GAF Master Elite® Certified** (Top 2% of US roofers)
* **Owens Corning Roofing Platinum Preferred**
* **Class 4 Impact Resistant (Highest hail rating)**
* **130 MPH Hurricane-Wind Warranty Guarantee**
* **$2,000,000 Fully Bonded & Insured**
* **Whop Verified Contractor & Escrow Protection**

### 4. Interactive Before / After Roof Restoration Slider
* Ultra-lightweight, zero external libraries.
* Native HTML5 `<input type="range">` overlaid with a CSS clip-path or dual-layered container.
* Sleek vertical amber divider line with a branded handle icon (`⬌`).
* Sub-millisecond 60 FPS scrubbing on mobile devices.

### 5. Instant 4-Step "Request an Estimate" Form (Whop Leads API)
* **Step 1: Service Type** (Shingle Replacement, Standing-Seam Metal, Solar Roof, Emergency Repair).
* **Step 2: Approximate Square Footage** (1,500 – 5,000+ sq ft with visual house diagrams).
* **Step 3: Timeline & Insurance Status** (Immediate / Storm Damage / Insurance Claim Filed / Planning Ahead).
* **Step 4: Contact & Street Address** (Prepares immediate dispatch quote + fires `whop.track('estimate_requested')`).

---

## 5. Single-File White-Label Rebranding Engine (`siteConfig`)

Any roofing company can fully re-skin the website in **10 seconds** by changing values in `src/config/site.ts`:

```typescript
export interface SiteThemeConfig {
  primaryHex: string;       // Default: '#0B192C' (Navy)
  accentHex: string;        // Default: '#F59E0B' (Amber Gold)
  darkCanvasHex: string;    // Default: '#070A0F' (Obsidian Slate)
  surfaceCardHex: string;   // Default: '#0E1420' (Elevated Slate)
}

export interface RoofingPlan {
  id: string;
  name: string;
  price: number;
  whopPlanId: string;
  badge?: string;
  tagline: string;
  deliverables: string[];
  ctaText: string;
  checkoutType: 'checkout' | 'express' | 'lead';
}

export interface SiteConfig {
  business: {
    name: string;
    legalName: string;
    phone: string;
    emergencyPhone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    licenseNumber: string;
    serviceRadiusMiles: number;
    citiesServed: string[];
  };
  theme: SiteThemeConfig;
  trustMetrics: {
    yearsInBusiness: number;
    completedProjects: number;
    googleReviewRating: number;
    googleReviewCount: number;
    warrantyYears: number;
  };
  plans: {
    inspection: RoofingPlan;
    deposit: RoofingPlan;
    maintenance: RoofingPlan;
  };
  socialProof: {
    bbbRating: string;
    certifications: string[];
  };
}

export const siteConfig: SiteConfig = {
  business: {
    name: "ApexShield Roofing & Restoration",
    legalName: "ApexShield Construction Group LLC",
    phone: "(888) 720-ROOF",
    emergencyPhone: "(888) 911-TARP",
    email: "dispatch@apexshieldroof.com",
    address: {
      street: "1000 Commercial Parkway, Suite 400",
      city: "Dallas",
      state: "TX",
      zip: "75201"
    },
    licenseNumber: "TX-ROC #492819-B",
    serviceRadiusMiles: 65,
    citiesServed: ["Dallas", "Fort Worth", "Plano", "Frisco", "Arlington", "McKinney", "Southlake"]
  },
  theme: {
    primaryHex: "#0B192C",      // Mastercraft Navy
    accentHex: "#F59E0B",       // Safety Amber / Gold
    darkCanvasHex: "#070A0F",   // Slate Obsidian
    surfaceCardHex: "#0E1420"   // Elevated Shingle Card
  },
  trustMetrics: {
    yearsInBusiness: 24,
    completedProjects: 4850,
    googleReviewRating: 4.9,
    googleReviewCount: 528,
    warrantyYears: 50
  },
  plans: {
    inspection: {
      id: "inspection",
      name: "4K Drone Roof & Solar Analysis",
      price: 149,
      whopPlanId: process.env.NEXT_PUBLIC_WHOP_PLAN_INSPECTION || "plan_inspection_149",
      badge: "Fastest Turnaround (24h)",
      tagline: "High-resolution thermal camera scan + 15-page storm vulnerability report.",
      deliverables: [
        "4K Thermal Drone Imaging (Shingle & Flashing detail)",
        "Moisture & Attic Insulation Thermal Scan",
        "Official Insurance-Ready PDF Damage Report",
        "100% Credited towards any repair or replacement contract"
      ],
      ctaText: "Schedule Drone Inspection ($149)",
      checkoutType: "express"
    },
    deposit: {
      id: "deposit",
      name: "Priority Project Reservation",
      price: 500,
      whopPlanId: process.env.NEXT_PUBLIC_WHOP_PLAN_DEPOSIT || "plan_deposit_500",
      badge: "100% Refundable Deposit",
      tagline: "Lock in material pricing and reserve your dedicated roofing crew.",
      deliverables: [
        "Locks guaranteed material pricing for 60 calendar days",
        "Secures dedicated crew & installation week on dispatch calendar",
        "Saves card-on-file for automated milestone invoicing",
        "Full $500 applied directly to your project's balance"
      ],
      ctaText: "Reserve Installation Date ($500)",
      checkoutType: "checkout"
    },
    maintenance: {
      id: "tuneup",
      name: "Seasonal Storm Tune-Up & Flashing Seal",
      price: 299,
      whopPlanId: process.env.NEXT_PUBLIC_WHOP_PLAN_TUNEUP || "plan_tuneup_299",
      tagline: "Comprehensive preventive tune-up to prevent $10,000+ water damage.",
      deliverables: [
        "Complete gutter & downspout debris clearance",
        "Up to 10 damaged shingles replaced on the spot",
        "High-grade polyurethane sealant on pipe boots & vents",
        "Official Storm-Readiness Certificate for homeowner insurance"
      ],
      ctaText: "Book Roof Tune-Up ($299)",
      checkoutType: "checkout"
    }
  },
  socialProof: {
    bbbRating: "A+ Accredited",
    certifications: [
      "GAF Master Elite® Contractor",
      "Owens Corning Platinum Preferred",
      "CertainTeed 5-Star Select ShingleMaster",
      "Whop Payments Verified Merchant"
    ]
  }
};
```

---

## 6. Speed & Rendering Guidelines (Lighthouse 98–100 Target)

To pass the user’s automated speed tester with flying colors:

1. **Pure CSS & Zero Bloated UI Libs**:
   - Zero bulky component runtimes.
   - Use Lucide SVG icons directly inline without importing massive icon packages.
2. **Zero Layout Shift (0.000 CLS)**:
   - All image assets (drone photos, roofing before/afters, trust badges) specify explicit `width`, `height`, and `aspect-ratio`.
   - Fonts use `next/font/google` with fallback font metrics (`size-adjust`) so text swapping introduces 0px of movement.
3. **Optimized LCP (Largest Contentful Paint)**:
   - Hero background uses an optimized modern AVIF/WebP image or high-performance CSS gradient grid with `fetchpriority="high"`.
   - Target LCP < 1.1s on mobile 4G.
4. **CSS-Only Hardware Acceleration**:
   - Animations use only `transform` and `opacity` with `will-change: transform`.
   - Modals and drawers use native HTML `<dialog>` or lightweight React state.

---

## 7. Next Steps for Implementation Agents

1. **Frontend / Scaffold Specialist**: Apply these color variables directly in `globals.css` and `tailwind.config.ts`.
2. **Whop Elements Specialist**: Pass `theme: 'dark'` and `siteConfig.theme.accentHex` into `CheckoutElement` and `BrandingElement`.
3. **Lead Funnel Specialist**: Wire the 4-step estimate form with the amber CTA tokens to call `POST /api/leads` and fire `whop.track('estimate_requested')`.
