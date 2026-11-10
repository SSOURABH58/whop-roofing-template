export interface SiteThemeConfig {
  primaryHex: string;       // Default: '#0B192C' (Mastercraft Navy)
  accentHex: string;        // Default: '#F59E0B' (Architectural Amber / Gold)
  darkCanvasHex: string;    // Default: '#070A0F' (Slate Obsidian)
  surfaceCardHex: string;   // Default: '#0E1420' (Elevated Shingle Card)
  borderSubtleHex: string;  // Default: '#1E293B' (Slate Border)
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
    tagline: string;
    subTagline: string;
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
    insuranceCoverage: string;
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
    windWarrantyMph: number;
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
    tagline: "Engineered for Extremes. Built for Generations.",
    subTagline: "Certified GAF Master Elite® contractor providing storm-resilient architectural roofing, thermal drone inspections, and solar shingle installations.",
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
    insuranceCoverage: "$2,000,000 Fully Bonded & Insured",
    serviceRadiusMiles: 65,
    citiesServed: ["Dallas", "Fort Worth", "Plano", "Frisco", "Arlington", "McKinney", "Southlake"]
  },
  theme: {
    primaryHex: "#0B192C",       // Mastercraft Navy
    accentHex: "#F59E0B",        // Safety Amber / Gold
    darkCanvasHex: "#070A0F",    // Slate Obsidian Canvas
    surfaceCardHex: "#0E1420",   // Elevated Shingle Slate Card
    borderSubtleHex: "#1E293B"   // Subtle Divider Border
  },
  trustMetrics: {
    yearsInBusiness: 24,
    completedProjects: 4850,
    googleReviewRating: 4.9,
    googleReviewCount: 528,
    warrantyYears: 50,
    windWarrantyMph: 130
  },
  plans: {
    inspection: {
      id: "inspection",
      name: "4K Drone Roof & Solar Analysis",
      price: 149,
      whopPlanId: import.meta.env.VITE_WHOP_PLAN_INSPECTION || "plan_l16eM5wNPlPGS",
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
      whopPlanId: import.meta.env.VITE_WHOP_PLAN_DEPOSIT || "plan_3qJhOgSXJrogE",
      badge: "100% Refundable Deposit",
      tagline: "Lock in material pricing and reserve your dedicated roofing crew.",
      deliverables: [
        "Locks guaranteed material pricing for 60 calendar days",
        "Secures dedicated crew & installation week on dispatch calendar",
        "Saves card-on-file for automated milestone invoicing",
        "Full $500 applied directly to your project balance"
      ],
      ctaText: "Reserve Installation Date ($500)",
      checkoutType: "checkout"
    },
    maintenance: {
      id: "tuneup",
      name: "Seasonal Storm Tune-Up & Flashing Seal",
      price: 299,
      whopPlanId: import.meta.env.VITE_WHOP_PLAN_TUNEUP || "plan_PUymlsjRn7YJN",
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
