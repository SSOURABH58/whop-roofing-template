/**
 * ApexShield Roofing & Restoration - Optimized Media & Assets Manifest
 * 
 * Performance & Web Vitals Architecture:
 * - Real, authentic photography (Zero AI-generated imagery).
 * - Multi-resolution responsive srcsets: 400w, 800w, 1400w, 1920w.
 * - Dual-format delivery: Modern WebP (default high-efficiency) with JPEG fallbacks.
 * - Core Web Vitals optimization: Explicit width/height to avoid Cumulative Layout Shift (CLS),
 *   high fetchPriority and eager preloads for Largest Contentful Paint (LCP) Hero elements.
 */

export interface ResponsiveImageVariant {
  jpg: string;
  webp: string;
  width: number;
}

export interface ResponsiveImage {
  /** Primary legacy fallback URL */
  src: string;
  /** Primary modern format URL */
  srcWebp: string;
  /** JPEG responsive srcset string */
  srcset: string;
  /** WebP responsive srcset string */
  webpSrcset: string;
  /** Specific size shortcuts (JPEG) */
  thumb: string;
  medium: string;
  large: string;
  full: string;
  /** Specific size shortcuts (WebP) */
  thumbWebp: string;
  mediumWebp: string;
  largeWebp: string;
  fullWebp: string;
  /** Accessibility and rendering */
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  /** Browser scheduling hint */
  preload: boolean;
  priority: 'high' | 'auto' | 'low';
}

export const siteImages = {
  /**
   * Hero: Majestic American luxury residence with architectural slate roof at dusk/twilight.
   * Marked with high fetchPriority for sub-second LCP.
   */
  hero: {
    src: '/images/hero-roof.jpg',
    srcWebp: '/images/hero-roof.webp',
    srcset: '/images/hero-roof_thumb.jpg 400w, /images/hero-roof_medium.jpg 800w, /images/hero-roof_large.jpg 1400w, /images/hero-roof_full.jpg 1920w',
    webpSrcset: '/images/hero-roof_thumb.webp 400w, /images/hero-roof_medium.webp 800w, /images/hero-roof_large.webp 1400w, /images/hero-roof_full.webp 1920w',
    thumb: '/images/hero-roof_thumb.jpg',
    medium: '/images/hero-roof_medium.jpg',
    large: '/images/hero-roof_large.jpg',
    full: '/images/hero-roof_full.jpg',
    thumbWebp: '/images/hero-roof_thumb.webp',
    mediumWebp: '/images/hero-roof_medium.webp',
    largeWebp: '/images/hero-roof_large.webp',
    fullWebp: '/images/hero-roof_full.webp',
    alt: 'Majestic modern luxury American home featuring an architectural black slate roof illuminated at dusk',
    width: 1920,
    height: 1080,
    aspectRatio: '16/9',
    preload: true,
    priority: 'high' as const,
  },

  /**
   * Solar: Seamlessly integrated rooftop monocrystalline solar shingle installation.
   */
  solar: {
    src: '/images/solar-roof.jpg',
    srcWebp: '/images/solar-roof.webp',
    srcset: '/images/solar-roof_thumb.jpg 400w, /images/solar-roof_medium.jpg 800w, /images/solar-roof_large.jpg 1400w, /images/solar-roof_full.jpg 1920w',
    webpSrcset: '/images/solar-roof_thumb.webp 400w, /images/solar-roof_medium.webp 800w, /images/solar-roof_large.webp 1400w, /images/solar-roof_full.webp 1920w',
    thumb: '/images/solar-roof_thumb.jpg',
    medium: '/images/solar-roof_medium.jpg',
    large: '/images/solar-roof_large.jpg',
    full: '/images/solar-roof_full.jpg',
    thumbWebp: '/images/solar-roof_thumb.webp',
    mediumWebp: '/images/solar-roof_medium.webp',
    largeWebp: '/images/solar-roof_large.webp',
    fullWebp: '/images/solar-roof_full.webp',
    alt: 'High-efficiency monocrystalline solar shingles seamlessly integrated into residential asphalt roof',
    width: 1920,
    height: 1440,
    aspectRatio: '4/3',
    preload: false,
    priority: 'auto' as const,
  },

  /**
   * Drone Inspection: 4K aerial inspection camera drone hovering above roofline for moisture/damage mapping.
   */
  drone: {
    src: '/images/drone-inspection.jpg',
    srcWebp: '/images/drone-inspection.webp',
    srcset: '/images/drone-inspection_thumb.jpg 400w, /images/drone-inspection_medium.jpg 800w, /images/drone-inspection_large.jpg 1400w, /images/drone-inspection_full.jpg 1920w',
    webpSrcset: '/images/drone-inspection_thumb.webp 400w, /images/drone-inspection_medium.webp 800w, /images/drone-inspection_large.webp 1400w, /images/drone-inspection_full.webp 1920w',
    thumb: '/images/drone-inspection_thumb.jpg',
    medium: '/images/drone-inspection_medium.jpg',
    large: '/images/drone-inspection_large.jpg',
    full: '/images/drone-inspection_full.jpg',
    thumbWebp: '/images/drone-inspection_thumb.webp',
    mediumWebp: '/images/drone-inspection_medium.webp',
    largeWebp: '/images/drone-inspection_large.webp',
    fullWebp: '/images/drone-inspection_full.webp',
    alt: 'High-tech 4K aerial drone with gimbal sensor performing a comprehensive 21-point residential roof inspection',
    width: 1920,
    height: 1280,
    aspectRatio: '3/2',
    preload: false,
    priority: 'auto' as const,
  },

  /**
   * Storm Damaged Roof (Slider Before): Weathered, cracked, hail-impacted, curling shingles prior to repair.
   */
  stormDamaged: {
    src: '/images/storm-damaged-roof.jpg',
    srcWebp: '/images/storm-damaged-roof.webp',
    srcset: '/images/storm-damaged-roof_thumb.jpg 400w, /images/storm-damaged-roof_medium.jpg 800w, /images/storm-damaged-roof_large.jpg 1400w, /images/storm-damaged-roof_full.jpg 1920w',
    webpSrcset: '/images/storm-damaged-roof_thumb.webp 400w, /images/storm-damaged-roof_medium.webp 800w, /images/storm-damaged-roof_large.webp 1400w, /images/storm-damaged-roof_full.webp 1920w',
    thumb: '/images/storm-damaged-roof_thumb.jpg',
    medium: '/images/storm-damaged-roof_medium.jpg',
    large: '/images/storm-damaged-roof_large.jpg',
    full: '/images/storm-damaged-roof_full.jpg',
    thumbWebp: '/images/storm-damaged-roof_thumb.webp',
    mediumWebp: '/images/storm-damaged-roof_medium.webp',
    largeWebp: '/images/storm-damaged-roof_large.webp',
    fullWebp: '/images/storm-damaged-roof_full.webp',
    alt: 'Close-up of weathered and wind-damaged asphalt shingles with granule loss and cracks before restoration',
    width: 1920,
    height: 1440,
    aspectRatio: '4/3',
    preload: false,
    priority: 'auto' as const,
  },

  /**
   * Restored Roof (Slider After): Flawlessly installed architectural shingles with sharp ridges and clean lines.
   */
  restored: {
    src: '/images/restored-roof.jpg',
    srcWebp: '/images/restored-roof.webp',
    srcset: '/images/restored-roof_thumb.jpg 400w, /images/restored-roof_medium.jpg 800w, /images/restored-roof_large.jpg 1400w, /images/restored-roof_full.jpg 1920w',
    webpSrcset: '/images/restored-roof_thumb.webp 400w, /images/restored-roof_medium.webp 800w, /images/restored-roof_large.webp 1400w, /images/restored-roof_full.webp 1920w',
    thumb: '/images/restored-roof_thumb.jpg',
    medium: '/images/restored-roof_medium.jpg',
    large: '/images/restored-roof_large.jpg',
    full: '/images/restored-roof_full.jpg',
    thumbWebp: '/images/restored-roof_thumb.webp',
    mediumWebp: '/images/restored-roof_medium.webp',
    largeWebp: '/images/restored-roof_large.webp',
    fullWebp: '/images/restored-roof_full.webp',
    alt: 'Pristine, newly installed architectural shingle gable roof with 50-year manufacturer warranty',
    width: 1920,
    height: 1280,
    aspectRatio: '3/2',
    preload: false,
    priority: 'auto' as const,
  },

  /**
   * Commercial TPO: Modern flat roof industrial installation with single-ply reflective membrane and parapet flashings.
   */
  commercial: {
    src: '/images/commercial-tpo.jpg',
    srcWebp: '/images/commercial-tpo.webp',
    srcset: '/images/commercial-tpo_thumb.jpg 400w, /images/commercial-tpo_medium.jpg 800w, /images/commercial-tpo_large.jpg 1400w, /images/commercial-tpo_full.jpg 1920w',
    webpSrcset: '/images/commercial-tpo_thumb.webp 400w, /images/commercial-tpo_medium.webp 800w, /images/commercial-tpo_large.webp 1400w, /images/commercial-tpo_full.webp 1920w',
    thumb: '/images/commercial-tpo_thumb.jpg',
    medium: '/images/commercial-tpo_medium.jpg',
    large: '/images/commercial-tpo_large.jpg',
    full: '/images/commercial-tpo_full.jpg',
    thumbWebp: '/images/commercial-tpo_thumb.webp',
    mediumWebp: '/images/commercial-tpo_medium.webp',
    largeWebp: '/images/commercial-tpo_large.webp',
    fullWebp: '/images/commercial-tpo_full.webp',
    alt: 'Commercial multi-story flat roof featuring energy-efficient reflective TPO membrane and parapet flashing',
    width: 1920,
    height: 1178,
    aspectRatio: '16/10',
    preload: false,
    priority: 'auto' as const,
  },

  /**
   * Craftsman Crew: Certified master roofing team in OSHA-compliant fall-protection gear inspecting shingles.
   */
  crew: {
    src: '/images/craftsman-crew.jpg',
    srcWebp: '/images/craftsman-crew.webp',
    srcset: '/images/craftsman-crew_thumb.jpg 400w, /images/craftsman-crew_medium.jpg 800w, /images/craftsman-crew_large.jpg 1400w, /images/craftsman-crew_full.jpg 1920w',
    webpSrcset: '/images/craftsman-crew_thumb.webp 400w, /images/craftsman-crew_medium.webp 800w, /images/craftsman-crew_large.webp 1400w, /images/craftsman-crew_full.webp 1920w',
    thumb: '/images/craftsman-crew_thumb.jpg',
    medium: '/images/craftsman-crew_medium.jpg',
    large: '/images/craftsman-crew_large.jpg',
    full: '/images/craftsman-crew_full.jpg',
    thumbWebp: '/images/craftsman-crew_thumb.webp',
    mediumWebp: '/images/craftsman-crew_medium.webp',
    largeWebp: '/images/craftsman-crew_large.webp',
    fullWebp: '/images/craftsman-crew_full.webp',
    alt: 'Professional roofing crew equipped with OSHA safety harnesses and precision measuring tools inspecting roof',
    width: 1920,
    height: 1280,
    aspectRatio: '3/2',
    preload: false,
    priority: 'auto' as const,
  }
} as const;

/**
 * Trust & Credibility Badges (Vector SVGs)
 * Scalable to any pixel density with zero compression artifacts.
 */
export const badges = {
  /** GAF Master Elite Contractor - Top 2% in North America */
  gafMasterElite: '/badges/gaf-master-elite.svg',
  /** Owens Corning Platinum Preferred Contractor */
  owensCorningPlatinum: '/badges/owens-corning-platinum.svg',
  /** 50-Year Non-Prorated Lifetime System Warranty */
  warranty50yr: '/badges/warranty-50yr.svg',
  warranty50Year: '/badges/warranty-50-year.svg',
  /** Class 4 Impact Resistance / UL 2218 Certified */
  class4Impact: '/badges/class-4-impact.svg',
  /** $2,000,000 Commercial General Liability & Workers Comp Insured */
  licensedInsured: '/badges/licensed-insured.svg',
  insured2M: '/badges/insured-2m.svg',
} as const;

/**
 * Preload recommendations for Head / Index HTML
 */
export const preloadRecommendations = [
  {
    rel: 'preload',
    as: 'image',
    href: siteImages.hero.largeWebp,
    type: 'image/webp',
    imageSrcset: siteImages.hero.webpSrcset,
    imageSizes: '100vw',
    fetchPriority: 'high' as const,
  }
];
