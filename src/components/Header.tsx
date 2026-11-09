import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/site';

interface HeaderProps {
  onRequestEstimate: () => void;
  onBookInspection: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRequestEstimate,
  onBookInspection,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0D0E12]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark (Clean & Unstackable) */}
        <a href="#" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-7 h-7 rounded-md bg-[#171A20] dark:bg-white text-white dark:text-[#171A20] flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            ▲
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-[#171A20] dark:text-white font-display whitespace-nowrap">
            {siteConfig.business.name.split(' ')[0]}
            <span className="hidden xl:inline text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5 uppercase tracking-wider font-mono">
              Roofing
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links - Streamlined 3 Core + Dropdown */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#services"
            className="hover:text-[#171A20] dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Services
          </a>
          <a
            href="#inspection"
            className="hover:text-[#171A20] dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Inspection
          </a>
          <a
            href="#financing"
            className="hover:text-[#171A20] dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Financing
          </a>

          {/* Clean "More" Dropdown for secondary pages */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-[#171A20] dark:hover:text-white transition-colors py-2 whitespace-nowrap focus:outline-none"
              aria-expanded={dropdownOpen}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-60 rounded-2xl bg-white dark:bg-[#13151A] border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <a
                  href="#service-area"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
                >
                  <div className="font-semibold text-slate-900 dark:text-white">Service Area</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">DFW Metro &amp; instant ZIP lookup</div>
                </a>
                <a
                  href="#before-after"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors mt-0.5"
                >
                  <div className="font-semibold text-slate-900 dark:text-white">Before &amp; After</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Storm damage vs restored slate</div>
                </a>
                <a
                  href="#reviews"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors mt-0.5"
                >
                  <div className="font-semibold text-slate-900 dark:text-white">Customer Reviews</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">4.9★ verified Texas homeowners</div>
                </a>
                <div className="my-1 border-t border-slate-100 dark:border-slate-800/60" />
                <a
                  href="#invoices-demo"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
                >
                  <div className="font-semibold text-slate-900 dark:text-white font-mono text-[11px]">Whop Billing Demo</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">SetupIntent card vault &amp; milestone invoice</div>
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls: Complete Phone, Theme Toggle, Pill CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          
          {/* Complete Unbroken Phone Link with Live Status Dot */}
          <a
            href={`tel:${siteConfig.business.phone.replace(/[^0-9]/g, '')}`}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-[#171A20] dark:hover:text-white transition-colors px-2.5 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
            title="Roofing Dispatch 24/7"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="whitespace-nowrap font-mono tabular-nums tracking-tight font-medium">
              {siteConfig.business.phone}
            </span>
          </a>

          {/* Clean Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-center flex-shrink-0"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-800" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Single High-Contrast Pill CTA (Tesla Style) */}
          <button
            type="button"
            onClick={onRequestEstimate}
            className="px-4 py-2 sm:px-5 sm:py-2 text-xs font-semibold rounded-full bg-[#171A20] text-white hover:bg-black dark:bg-white dark:text-[#171A20] dark:hover:bg-slate-100 transition-all shadow-sm active:scale-[0.98] flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0D0E12] border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700 dark:text-slate-200">
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
              Service Area &amp; ZIP Checker
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Before &amp; After Restoration
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
            <a
              href={`tel:${siteConfig.business.phone.replace(/[^0-9]/g, '')}`}
              className="w-full py-2.5 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 text-center font-mono tabular-nums"
            >
              Call Dispatch: {siteConfig.business.phone}
            </a>
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
