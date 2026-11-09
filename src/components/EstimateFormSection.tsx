import React, { useState } from 'react';
import { FileText, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { submitEstimateLead, EstimateLeadData, WhopLeadResponse } from '../lib/leads';
import { trackEstimateRequested } from '../lib/tracking';

export const EstimateFormSection: React.FC = () => {
  const [formData, setFormData] = useState<EstimateLeadData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dallas',
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
      // 1. Submit lead to Whop Leads API
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
    <section id="estimate-form" className="py-20 bg-slate-950 font-sans border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            Whop Leads API Integration
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
            Request an Estimate in 60 Seconds
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl mx-auto">
            Direct intake wired to the Whop Leads engine. Quote requests land immediately as actionable leads on the contractor dashboard.
          </p>
        </div>

        {leadResult ? (
          <div className="bg-navy-900 border-2 border-emerald-500/80 rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/30 mb-2">
                Whop Lead ID: {leadResult.id}
              </span>
              <h3 className="text-2xl font-bold text-white">Estimate Request Received!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto mt-2">
                Thank you, <strong>{leadResult.customer.name}</strong>. Your estimate request for{' '}
                <strong className="text-amber-400">{formData.serviceRequested}</strong> has been transmitted via the Whop Leads API.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl max-w-md mx-auto text-left text-xs space-y-1.5 font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold">Dispatched to Estimator</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span>{leadResult.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="truncate max-w-[200px]">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pixel Event:</span>
                <span className="text-amber-400 font-bold">estimate_requested (Fired)</span>
              </div>
            </div>

            <button
              onClick={() => setLeadResult(null)}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="bg-navy-900 border border-slate-700/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
          >
            {/* Step 1: Service & Property Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Service Requested
                </label>
                <select
                  value={formData.serviceRequested}
                  onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Full Architectural Roof Replacement">Full Architectural Roof Replacement</option>
                  <option value="Integrated Solar Shingle System">Integrated Solar Shingle System</option>
                  <option value="Emergency Storm & Leak Repair">Emergency Storm &amp; Leak Repair</option>
                  <option value="21-Point Drone Thermal Inspection">21-Point Drone Thermal Inspection</option>
                  <option value="Commercial TPO / Flat Roofing">Commercial TPO / Flat Roofing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="single_family">Single Family Home</option>
                  <option value="multi_family">Townhome / Multi-Family</option>
                  <option value="commercial">Commercial Building</option>
                </select>
              </div>
            </div>

            {/* Step 2: Roof Specs & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Approx. Square Footage
                </label>
                <select
                  value={formData.approxSquareFootage}
                  onChange={(e) => setFormData({ ...formData, approxSquareFootage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Under 2,000 sq ft">Under 2,000 sq ft</option>
                  <option value="2,000 - 3,000 sq ft">2,000 - 3,000 sq ft</option>
                  <option value="3,000 - 4,500 sq ft">3,000 - 4,500 sq ft</option>
                  <option value="Over 4,500 sq ft">Over 4,500 sq ft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Roof Age
                </label>
                <select
                  value={formData.roofAgeYears}
                  onChange={(e) => setFormData({ ...formData, roofAgeYears: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="0-5 years">0-5 years</option>
                  <option value="6-12 years">6-12 years</option>
                  <option value="13-20 years">13-20 years</option>
                  <option value="20+ years (Urgent)">20+ years (Urgent)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Timeline / Urgency
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="emergency_leak">🚨 Active Ceiling Leak / Emergency</option>
                  <option value="within_30_days">Within 30 Days</option>
                  <option value="planning_ahead">Planning Ahead / Budgeting</option>
                </select>
              </div>
            </div>

            {/* Step 3: Address & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4208 Highland Park Blvd"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ZIP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  placeholder="e.g. 75201"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/[^0-9]/g, '') })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone (For Instant Dispatch SMS)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(214) 555-0199"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-black py-4 rounded-xl transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Transmitting to Whop Leads API...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit &amp; Send to Whop Leads Engine</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2.5 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Zero spam promise. Triggers verified <strong>whop.track('estimate_requested')</strong>.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
