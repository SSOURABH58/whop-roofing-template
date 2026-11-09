import React, { useState } from 'react';
import { Phone, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useTheme } from '../lib/theme';

interface HeaderProps {
  onRequestEstimate: () => void;
  onBookInspection: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRequestEstimate,
  onBookInspection,
  theme: propTheme,
  onToggleTheme: propToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hookTheme = useTheme();
  const theme = propTheme ?? hookTheme.theme;
  const toggleTheme = propToggleTheme ?? hookTheme.toggleTheme;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#0D0E12]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Wordmark (Clean & Templated) */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#171A20] dark:text-white font-display">
            {siteConfig.business.name.split(' ')[0]}
            <span className="font-normal text-slate-600 dark:text-slate-400 ml-1">
              {siteConfig.business.name.split(' ').slice(1).join(' ')}
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links - Understated Tesla Style */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-slate-600 dark:text-slate-300">
          <a href="#services" className="hover:text-[#171A20] dark:hover:text-white transition-colors">
            Services
          </a>
          <a href="#inspection" className="hover:text-[#171A20] dark:hover:text-white transition-colors">
            Drone Inspection
          </a>
          <a href="#financing" className="hover:text-[#171A20] dark:hover:text-white transition-colors">
            Financing
          </a>
          <a href="#service-area" className="hover:text-[#171A20] dark:hover:text-white transition-colors">
            Service Area
          </a>
          <a href="#reviews" className="hover:text-[#171A20] dark:hover:text-white transition-colors">
            Reviews
          </a>
          <a href="#invoices-demo" className="hover:text-[#171A20] dark:hover:text-white transition-colors text-xs font-mono text-slate-500 dark:text-slate-400">
            Whop Billing
          </a>
        </nav>

        {/* Action Controls: Phone, Theme Toggle, CTA */}
        <div className="flex items-center gap-3">
          {/* Phone Call Link */}
          <a
            href={`tel:${siteConfig.business.phone.replace(/[^0-9]/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#171A20] dark:hover:text-white transition-colors px-2 py-1"
            title="Call Roofing Dispatch"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.business.phone}</span>
          </a>

          {/* Clean Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Quick Inspection CTA (Desktop) */}
          <button
            type="button"
            onClick={onBookInspection}
            className="hidden xl:inline-flex px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border border-slate-300 dark:border-slate-700 transition-colors"
          >
            Drone Scan $149
          </button>

          {/* Primary High-Contrast Pill CTA */}
          <button
            type="button"
            onClick={onRequestEstimate}
            className="px-4 py-2 sm:px-5 sm:py-2 text-xs font-semibold rounded-full bg-[#171A20] text-white hover:bg-black dark:bg-white dark:text-[#171A20] dark:hover:bg-slate-100 transition-all shadow-sm active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0D0E12] border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Services &amp; Pricing
            </a>
            <a
              href="#inspection"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Drone Inspection ($149)
            </a>
            <a
              href="#financing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              0% Financing (Klarna / Splitit)
            </a>
            <a
              href="#service-area"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Service Area &amp; Zip Checker
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Customer Reviews (4.9★)
            </a>
            <a
              href="#invoices-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 font-mono text-xs text-slate-500 dark:text-slate-400"
            >
              Whop Milestone Invoicing Demo
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookInspection();
              }}
              className="w-full py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              Book Drone Inspection ($149)
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestEstimate();
              }}
              className="w-full py-2.5 rounded-full bg-[#171A20] text-white dark:bg-white dark:text-[#171A20] text-xs font-semibold"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
