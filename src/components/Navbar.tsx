import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Languages } from 'lucide-react';
import type { NavItem } from '../types';
import { useI18n, type Key } from '../i18n';

interface NavbarProps {
  onGetStartedClick: () => void;
  onNavClick: (item: string) => void;
  activeNav: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'explore', label: 'Explore', href: '#explore' },
  { id: 'experiences', label: 'Experiences', href: '#experiences' },
  { id: 'technology', label: 'Technology', href: '#technology' },
  { id: 'about-us', label: 'About Us', href: '#about-us' },
];

const NAV_KEYS: Record<string, Key> = {
  explore: 'nav_explore',
  experiences: 'nav_experiences',
  technology: 'nav_technology',
  'about-us': 'nav_about-us',
};

export const Navbar: React.FC<NavbarProps> = ({
  onGetStartedClick,
  onNavClick,
  activeNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, toggleLang } = useI18n();

  const langButton = (id: string) => (
    <button
      id={id}
      onClick={toggleLang}
      aria-label={t('switchAria')}
      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-300 bg-white/60 text-slate-800 text-sm font-semibold hover:bg-white backdrop-blur-md transition-colors cursor-pointer"
    >
      <Languages className="w-4 h-4" />
      <span>{t('switchLabel')}</span>
    </button>
  );

  return (
    <nav className="relative z-40 w-full px-2 sm:px-4 py-2 sm:py-3 transition-all duration-300">
      <div className="w-full flex items-center justify-between">

        {/* Logo in grey-black */}
        <a
          href="#"
          id="nav-logo"
          className="flex items-center gap-2 text-slate-800 hover:text-slate-950 group cursor-pointer transition-colors"
          onClick={(e) => {
            e.preventDefault();
            onNavClick('explore');
          }}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="w-4.5 h-4.5 border-[1.75px] border-slate-800 rounded-[3px] group-hover:scale-105 transition-transform" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800 font-sans">
            Visor
          </span>
        </a>

        {/* Center Navigation Links (Grey-Black font) */}
        <div
          id="desktop-nav-links"
          className="hidden md:flex items-center gap-7 lg:gap-10"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.id);
                }}
                className={`relative text-sm font-medium tracking-normal transition-colors duration-200 cursor-pointer py-1 ${
                  isActive
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {t(NAV_KEYS[item.id])}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-slate-900 rounded-full shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Action: language switch + "Get Started" pill */}
        <div className="hidden md:flex items-center gap-4">
          {langButton('btn-lang-switch')}
          <motion.button
            id="btn-get-started-nav"
            onClick={onGetStartedClick}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="group relative px-6 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-sm font-semibold tracking-normal shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          >
            <span className="relative z-10 flex items-center gap-1">
              {t('getStarted')}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:-scale-x-100" />
            </span>
          </motion.button>
        </div>

        {/* Mobile: language switch + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {langButton('btn-lang-switch-mobile')}
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('menuAria')}
            className="p-2 rounded-lg bg-white/60 text-slate-800 backdrop-blur-md border border-slate-300 hover:bg-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    onNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="text-start px-4 py-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium text-base transition-colors"
                >
                  {t(NAV_KEYS[item.id])}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-200">
                <button
                  id="btn-get-started-mobile"
                  onClick={() => {
                    onGetStartedClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-center text-sm shadow-md hover:bg-black active:scale-95 transition-all"
                >
                  {t('getStarted')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
