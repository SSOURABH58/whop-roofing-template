import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { FinancingSection } from './components/FinancingSection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { EstimateFormSection } from './components/EstimateFormSection';
import { InvoicesDemoSection } from './components/InvoicesDemoSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { WhopCheckoutModal } from './components/WhopCheckoutModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { siteConfig } from './config/site';

export function App() {
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: number;
    badge?: string;
    whopPlanId?: string;
  } | null>(null);

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleOpenInspection = () => {
    setSelectedPlan({
      id: siteConfig.plans.inspection.id,
      name: siteConfig.plans.inspection.name,
      price: siteConfig.plans.inspection.price,
      badge: siteConfig.plans.inspection.tagline,
      whopPlanId: siteConfig.plans.inspection.whopPlanId,
    });
    setCheckoutModalOpen(true);
  };

  const handleOpenPlan = (plan: { id: string; name: string; price: number; badge?: string; whopPlanId?: string }) => {
    setSelectedPlan(plan);
    setCheckoutModalOpen(true);
  };

  const scrollToEstimate = () => {
    const el = document.getElementById('estimate-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#171A20] selection:bg-slate-200 pb-16 md:pb-0">
      {/* Navigation Header */}
      <Header
        onRequestEstimate={scrollToEstimate}
        onBookInspection={handleOpenInspection}
      />

      {/* Hero Section with Tesla-Style Full-Bleed & Specs */}
      <Hero
        onRequestEstimate={scrollToEstimate}
        onBookInspection={handleOpenInspection}
      />

      {/* Manufacturer & National Credentials Strip */}
      <TrustStrip />

      {/* Services & 3 Real Plans Grid */}
      <ServicesSection onSelectPlan={handleOpenPlan} />

      {/* Interactive Before / After Slider */}
      <BeforeAfterSlider />

      {/* Whop Financing & Monthly Payment Estimator */}
      <FinancingSection onExplorePlans={scrollToServices} />

      {/* Interactive Service Area Coverage & Zip Checker */}
      <ServiceAreaSection />

      {/* "Request an Estimate" Form Wired to Whop Leads API */}
      <EstimateFormSection />

      {/* SetupIntent Card-on-File & Invoices API Milestone Billing Demo */}
      <InvoicesDemoSection />

      {/* Verified Customer Reviews */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Mobile-First Bottom Ergonomic Action Dock */}
      <MobileStickyBar onRequestEstimate={scrollToEstimate} />

      {/* Drop-in Whop Payment Elements Checkout Modal */}
      {selectedPlan && (
        <WhopCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          plan={selectedPlan}
          onSuccess={() => {
            console.log('[Whop Checkout] Order completed successfully for plan:', selectedPlan.id);
          }}
        />
      )}
    </div>
  );
}

export default App;
