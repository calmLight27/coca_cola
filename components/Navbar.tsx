import React, { useState, useEffect } from 'react';
import { ShoppingBag, Globe, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const LANGUAGES = [
  { code: 'EN', name: 'English (US)', flag: '🇺🇸' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'JA', name: '日本語', flag: '🇯🇵' },
];

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'products', 'story', 'sustainability'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Products', href: '#products', id: 'products' },
    { label: 'Our Story', href: '#story', id: 'story' },
    { label: 'Sustainability', href: '#sustainability', id: 'sustainability' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111111]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single element wordmark with brand dynamic wave flourish */}
        <a
          href="#home"
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="KOLA Homepage"
        >
          <div className="relative flex items-center">
            {/* Dynamic Swirl Wave Logo Accent */}
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-white group-hover:text-[#F40009] transition-colors">
              KOLA
            </span>
            <svg
              className="w-5 h-3 text-[#F40009] ml-1 transform group-hover:scale-110 transition-transform"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 11C6 3 14 13 23 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </a>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F40009] rounded-full animate-fadeIn" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Language Switcher, Cart & Buy Now Pill) */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span>{selectedLang.code}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#18181B] border border-white/15 shadow-2xl py-1.5 z-50 animate-fadeIn">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                        selectedLang.code === lang.code ? 'text-[#F40009] font-semibold bg-white/5' : 'text-zinc-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{lang.code}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cart Icon Button with Count */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F40009] text-white text-[10px] font-bold flex items-center justify-center animate-scaleIn">
                {cartCount}
              </span>
            )}
          </button>

          {/* 'Buy Now' Pill Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="px-4 py-2 text-xs font-bold text-white bg-[#F40009] hover:bg-[#d00007] rounded-full shadow-[0_4px_16px_rgba(244,0,9,0.4)] transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Buy Now
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111111]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Language</span>
              <div className="flex gap-2">
                {LANGUAGES.slice(0, 3).map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedLang(l)}
                    className={`px-2 py-1 rounded text-xs ${
                      selectedLang.code === l.code ? 'bg-[#F40009] text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
