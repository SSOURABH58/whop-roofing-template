import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { submitEstimateLead, type EstimateLeadData, type WhopLeadResponse } from '../lib/leads';
import { trackEstimateRequested } from '../lib/tracking';
import { siteConfig } from '../config/site';

export const EstimateFormSection: React.FC = () => {
  const [formData, setFormData] = useState<EstimateLeadData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: siteConfig.business.address.city || 'Dallas',
    zipCode: '',
    serviceRequested: 'Full Architectural Roof Replacement',
    propertyType: 'single_family',
    roofAgeYears: '15-20 years',
    approxSquareFootage: '2,500 - 3,500 sq ft',
    urgency: 'within_30_days',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadResult, setLeadResult] = useState<WhopLeadResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit lead to Whop Leads API (POST /v1/leads)
      const result = await submitEstimateLead(formData);
      setLeadResult(result);

      // 2. Fire custom pixel event via whop.track
      trackEstimateRequested({
        service: formData.serviceRequested,
        propertyType: formData.propertyType,
        squareFootage: String(formData.approxSquareFootage),
        roofAge: String(formData.roofAgeYears),
        urgency: formData.urgency,
        zipCode: formData.zipCode,
        city: formData.city,
      });
    } catch (err) {
      console.error('Failed to submit estimate lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate-form" className="py-24 bg-white font-sans border-b border-slate-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-500 mb-2">
            Online Intake
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171A20] font-display">
            Request an Estimate
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Submit your project details for rapid drone scheduling and contractor review.
          </p>
        </div>

        {leadResult ? (
          /* Confirmation Screen */
          <div className="rounded-2xl border border-slate-200 p-8 sm:p-10 bg-[#F8F9FA] text-center space-y-5 animate-in fade-in duration-300 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-200 text-slate-700 font-medium">
                Whop Lead ID: {leadResult.id}
              </span>
              <h3 className="text-2xl font-bold text-[#171A20] mt-3">
                Estimate Request Dispatched
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                Thank you, <strong>{leadResult.customer.name}</strong>. Your project intake has been transmitted directly to our estimating team via the Whop Leads engine.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white max-w-md mx-auto text-left text-xs space-y-2 font-mono text-slate-600 shadow-sm">
              <div className="flex justify-between">
                <span>Service:</span>
                <span className="text-[#171A20] font-sans font-medium">{formData.serviceRequested}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="text-[#171A20]">{leadResult.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-[#171A20] truncate max-w-[200px]">{formData.address}, {formData.city}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLeadResult(null)}
              className="h-10 px-6 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          /* Clean, Airy Form Wizard */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 p-7 sm:p-10 bg-[#F8F9FA] space-y-6 shadow-sm"
          >
            {/* Step 1: Project Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Service Requested
                </label>
                <select
                  value={formData.serviceRequested}
                  onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                >
                  <option value="Full Architectural Roof Replacement">Full Architectural Roof Replacement</option>
                  <option value="Emergency Storm Damage Repair">Emergency Storm Damage Repair</option>
                  <option value="4K Drone Thermal Roof Scan ($149)">4K Drone Thermal Roof Scan ($149)</option>
                  <option value="Seasonal Flashing & Shingle Tune-Up ($299)">Seasonal Flashing &amp; Shingle Tune-Up ($299)</option>
                  <option value="Integrated Solar Shingle Installation">Integrated Solar Shingle Installation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Project Timeline
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                >
                  <option value="immediate">Immediate (Active Leak / Storm Damage)</option>
                  <option value="within_30_days">Within 30 Days (Standard Build)</option>
                  <option value="flexible">Flexible / Planning Phase</option>
                </select>
              </div>
            </div>

            {/* Step 2: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Step 3: Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="1234 Meadow Lane"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="75201"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/[^0-9]/g, '') })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Step 4: Notes */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Specific Damage Notes or Insurance Claim Number (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Mention missing shingles, attic water spots, or recent hail activity..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-[#171A20] placeholder-slate-400 focus:outline-none focus:border-[#171A20] transition-colors resize-none shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-full bg-[#171A20] text-white hover:bg-black text-xs font-semibold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Whop Leads Engine...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Estimate Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2.5">
                Direct integration with Whop Leads API. We respect your privacy — zero spam guarantee.
              </p>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
