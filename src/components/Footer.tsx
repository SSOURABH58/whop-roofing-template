import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-slate-800 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-navy-950">
                <Shield className="w-5 h-5 fill-navy-950" />
              </div>
              <span className="text-lg font-black text-white tracking-tight font-display">
                {siteConfig.business.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Certified GAF Master Elite® roofing contractor providing storm-resilient architectural roofing, thermal drone inspections, and turnkey solar shingles across Texas and the US.
            </p>
            <div className="text-[11px] text-slate-400 font-mono space-y-1">
              <div>State License: <strong className="text-white">{siteConfig.business.licenseNumber}</strong></div>
              <div>Insurance: <strong className="text-white">{siteConfig.business.insuranceCoverage}</strong></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Architectural Shingles</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Integrated Solar Roofs</a></li>
              <li><a href="#inspection" className="hover:text-amber-400 transition-colors">Drone Thermal Inspection</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Emergency Storm Tarping</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Commercial Flat Roofs</a></li>
            </ul>
          </div>

          {/* Coverage & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Direct Contact</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${siteConfig.business.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white font-bold text-slate-200">
                  {siteConfig.business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{siteConfig.business.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.business.address.street}, {siteConfig.business.address.city}, {siteConfig.business.address.state}</span>
              </li>
            </ul>
          </div>

          {/* Whop Ecosystem Badge */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Whop Platform</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Built on Whop Websites. Payments, setup intents, leads, and invoicing run on Whop infrastructure.
            </p>
            <div className="p-3 bg-navy-900 border border-slate-800 rounded-xl space-y-1.5">
              <div className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Whop Payments Active
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                PCI-DSS Level 1 Compliant
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.business.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Warranty Registration</a>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400/80 font-mono">Whop Bounty Submission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
