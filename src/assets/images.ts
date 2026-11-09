export interface ResponsiveImage {
  src: string;
  srcset: string;
  thumb: string;
  medium: string;
  large: string;
  full: string;
  alt: string;
  width: number;
  height: number;
}

export const siteImages = {
  hero: {
    src: '/images/hero-roof.jpg',
    srcset: '/images/hero-roof_thumb.jpg 400w, /images/hero-roof_medium.jpg 800w, /images/hero-roof_large.jpg 1400w, /images/hero-roof_full.jpg 1920w',
    thumb: '/images/hero-roof_thumb.jpg',
    medium: '/images/hero-roof_medium.jpg',
    large: '/images/hero-roof_large.jpg',
    full: '/images/hero-roof_full.jpg',
    alt: 'Luxury residential home with architectural black slate roof at golden hour',
    width: 1920,
    height: 1080,
  },
  solar: {
    src: '/images/solar-roof.jpg',
    srcset: '/images/solar-roof_thumb.jpg 400w, /images/solar-roof_medium.jpg 800w, /images/solar-roof_large.jpg 1400w, /images/solar-roof_full.jpg 1920w',
    thumb: '/images/solar-roof_thumb.jpg',
    medium: '/images/solar-roof_medium.jpg',
    large: '/images/solar-roof_large.jpg',
    full: '/images/solar-roof_full.jpg',
    alt: 'High-efficiency integrated rooftop solar panel installation',
    width: 1920,
    height: 1080,
  },
  drone: {
    src: '/images/drone-inspection.jpg',
    srcset: '/images/drone-inspection_thumb.jpg 400w, /images/drone-inspection_medium.jpg 800w, /images/drone-inspection_large.jpg 1400w, /images/drone-inspection_full.jpg 1920w',
    thumb: '/images/drone-inspection_thumb.jpg',
    medium: '/images/drone-inspection_medium.jpg',
    large: '/images/drone-inspection_large.jpg',
    full: '/images/drone-inspection_full.jpg',
    alt: '4K aerial drone performing 21-point thermal roof and moisture inspection',
    width: 1920,
    height: 1080,
  },
  stormDamaged: {
    src: '/images/storm-damaged-roof.jpg',
    srcset: '/images/storm-damaged-roof_thumb.jpg 400w, /images/storm-damaged-roof_medium.jpg 800w, /images/storm-damaged-roof_large.jpg 1400w, /images/storm-damaged-roof_full.jpg 1920w',
    thumb: '/images/storm-damaged-roof_thumb.jpg',
    medium: '/images/storm-damaged-roof_medium.jpg',
    large: '/images/storm-damaged-roof_large.jpg',
    full: '/images/storm-damaged-roof_full.jpg',
    alt: 'Storm and wind damaged asphalt shingles before professional restoration',
    width: 1920,
    height: 1080,
  },
  restored: {
    src: '/images/restored-roof.jpg',
    srcset: '/images/restored-roof_thumb.jpg 400w, /images/restored-roof_medium.jpg 800w, /images/restored-roof_large.jpg 1400w, /images/restored-roof_full.jpg 1920w',
    thumb: '/images/restored-roof_thumb.jpg',
    medium: '/images/restored-roof_medium.jpg',
    large: '/images/restored-roof_large.jpg',
    full: '/images/restored-roof_full.jpg',
    alt: 'Pristine newly installed architectural slate roofing with 50-year warranty',
    width: 1920,
    height: 1080,
  },
  commercial: {
    src: '/images/commercial-tpo.jpg',
    srcset: '/images/commercial-tpo_thumb.jpg 400w, /images/commercial-tpo_medium.jpg 800w, /images/commercial-tpo_large.jpg 1400w, /images/commercial-tpo_full.jpg 1920w',
    thumb: '/images/commercial-tpo_thumb.jpg',
    medium: '/images/commercial-tpo_medium.jpg',
    large: '/images/commercial-tpo_large.jpg',
    full: '/images/commercial-tpo_full.jpg',
    alt: 'Modern commercial building flat TPO roof installation',
    width: 1920,
    height: 1080,
  },
  crew: {
    src: '/images/craftsman-crew.jpg',
    srcset: '/images/craftsman-crew_thumb.jpg 400w, /images/craftsman-crew_medium.jpg 800w, /images/craftsman-crew_large.jpg 1400w, /images/craftsman-crew_full.jpg 1920w',
    thumb: '/images/craftsman-crew_thumb.jpg',
    medium: '/images/craftsman-crew_medium.jpg',
    large: '/images/craftsman-crew_large.jpg',
    full: '/images/craftsman-crew_full.jpg',
    alt: 'Licensed and insured master roofing contractor team on site',
    width: 1920,
    height: 1080,
  }
} as const;

export const badges = {
  gafMasterElite: '/badges/gaf-master-elite.svg',
  owensCorningPlatinum: '/badges/owens-corning-platinum.svg',
  warranty50yr: '/badges/warranty-50yr.svg',
  licensedInsured: '/badges/licensed-insured.svg',
} as const;
