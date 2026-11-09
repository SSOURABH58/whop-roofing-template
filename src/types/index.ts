import { RoofingPlan, SiteConfig } from '@/config/site';

export type { RoofingPlan, SiteConfig };

export type ServiceType = 'replacement' | 'repair' | 'inspection' | 'solar' | 'tuneup';
export type PropertyType = 'single_family' | 'commercial' | 'multi_family';
export type ProjectUrgency = 'emergency' | 'within_2_weeks' | 'within_month' | 'planning_ahead';

export interface EstimateFormState {
  serviceType: ServiceType;
  propertyType: PropertyType;
  roofAge: string;
  sqft: number;
  urgency: ProjectUrgency;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  solarInterest: boolean;
}

export interface FinancingCalculation {
  projectTotal: number;
  downPayment: number;
  termMonths: number;
  estimatedApr: number;
  monthlyPayment: number;
  totalInterest: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  location: string;
  service: string;
  completionDays: number;
  shingleType: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}
