import React from 'react';
import { siteConfig } from '../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-500 text-xs font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-base font-bold tracking-tight text-[#171A20] font-display block">
              {siteConfig.business.name}
            </span>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Certified GAF Master Elite® roofing contractor providing storm-resilient architectural roofing, thermal drone inspections, and digital milestone billing across North America.
            </p>
            <div className="text-[11px] text-slate-500 space-y-0.5 font-mono">
              <div>License: {siteConfig.business.licenseNumber}</div>
              <div>Insurance: {siteConfig.business.insuranceCoverage}</div>
              <div>Dispatch: {siteConfig.business.phone}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-[#171A20] font-semibold text-xs tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#services" className="hover:text-[#171A20] transition-colors">
                  Architectural Shingles
                </a>
              </li>
              <li>
                <a href="#inspection" className="hover:text-[#171A20] transition-colors">
                  4K Drone Thermal Scan ($149)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#171A20] transition-colors">
                  Roof Tune-Up &amp; Reseal ($299)
                </a>
              </li>
              <li>
                <a href="#financing" className="hover:text-[#171A20] transition-colors">
                  0% Financing Options
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-[#171A20] transition-colors">
                  Regional Service Area
                </a>
              </li>
            </ul>
          </div>

          {/* Whop Ecosystem & Security */}
          <div className="space-y-2.5">
            <h4 className="text-[#171A20] font-semibold text-xs tracking-wider uppercase">
              Infrastructure
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built on Whop Websites. Payments, customer leads, and milestone invoicing are powered by Whop.
            </p>
            <div className="pt-1 text-[11px] text-slate-500 font-mono">
              PCI-DSS Level 1 Compliant • TLS 1.3
            </div>
          </div>

        </div>

        {/* Minimal Bottom Line */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.business.legalName || siteConfig.business.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#171A20] transition-colors">
              Privacy Notice
            </a>
            <a href="#" className="hover:text-[#171A20] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#171A20] transition-colors">
              Warranty Registration
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
