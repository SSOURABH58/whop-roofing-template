import React, { useState } from 'react';
import { Phone, Shield, Menu, X, ArrowRight, Clock } from 'lucide-react';
import { siteConfig } from '../config/site';

interface HeaderProps {
  onRequestEstimate: () => void;
  onBookInspection: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRequestEstimate, onBookInspection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full font-sans">
      {/* Utility Bar: Emergency Storm Alert & Direct Dispatch */}
      <div className="bg-navy-950 border-b border-slate-800 text-slate-300 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-ping" />
              LIVE STORM DISPATCH
            </span>
            <span className="text-slate-300 text-xs font-medium">
              Crews operating in <strong>Dallas-Fort Worth</strong> & surrounding areas • Avg response &lt; 2 hrs
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> 24/7 Emergency Tarping
            </span>
            <a 
              href={`tel:${siteConfig.business.phone.replace(/[^0-9]/g, '')}`}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.business.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-navy-900/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-navy-950 shadow-md shadow-amber-500/20">
              <Shield className="w-5 h-5 fill-navy-950" />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight flex items-center gap-1 font-display">
                {siteConfig.business.name.split(' ')[0]}
                <span className="text-amber-400 font-bold">{siteConfig.business.name.split(' ').slice(1).join(' ')}</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Mastercraft Protection
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
            <a href="#inspection" className="hover:text-amber-400 transition-colors">Drone Inspection</a>
            <a href="#financing" className="hover:text-amber-400 transition-colors">0% Financing</a>
            <a href="#service-area" className="hover:text-amber-400 transition-colors">Coverage</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
            <a href="#invoices-demo" className="text-slate-400 hover:text-white text-xs font-mono px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700/60">
              Whop Billing Demo
            </a>
          </div>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onBookInspection}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              Book Inspection ($149)
            </button>
            <button
              onClick={onRequestEstimate}
              className="px-4 py-2 text-xs font-bold text-navy-950 bg-amber-500 hover:bg-amber-400 rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 active:scale-[0.98]"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-800 mt-3 space-y-2 text-sm text-slate-300 font-medium">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-amber-400"
            >
              Services & Pricing
            </a>
            <a 
              href="#inspection" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-amber-400"
            >
              Drone Inspection ($149)
            </a>
            <a 
              href="#financing" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-amber-400"
            >
              0% Financing (Klarna / Splitit)
            </a>
            <a 
              href="#service-area" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-amber-400"
            >
              Service Area & Zip Checker
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-amber-400"
            >
              Customer Reviews (4.9★)
            </a>
            <a 
              href="#invoices-demo" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-300 font-mono text-xs"
            >
              Whop Milestone Invoicing Demo
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookInspection();
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 rounded-xl"
              >
                Book Drone Inspection ($149)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestEstimate();
                }}
                className="w-full py-2.5 text-xs font-bold text-navy-950 bg-amber-500 rounded-xl"
              >
                Get Free Estimate
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
