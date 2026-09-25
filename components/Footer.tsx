import React, { useState } from 'react';
import { Globe, ArrowRight, Check, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('North America (United States)');
  const [regionOpen, setRegionOpen] = useState(false);

  const regions = [
    'North America (United States)',
    'North America (Canada)',
    'Europe (United Kingdom)',
    'Europe (Germany)',
    'Europe (France)',
    'Asia Pacific (Japan)',
    'Asia Pacific (Australia)',
    'Latin America (Mexico)',
    'Latin America (Brazil)',
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0B0B0C] border-t border-white/10 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter Subscription Banner */}
        <div className="rounded-3xl bg-zinc-900/60 border border-white/10 p-8 sm:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Join the KOLA Insider Club
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Receive limited-edition flavor drops, secret heritage vault releases, and invitations to exclusive rooftop experiences.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {isSubscribed ? (
              <div className="flex items-center gap-2.5 p-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium justify-center">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're in! Check your inbox for exclusive drops.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#F40009]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#F40009] hover:bg-[#d00007] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(244,0,9,0.35)] transition-all whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Nav Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          
          {/* Column 1: Brand & Wordmark */}
          <div className="col-span-2">
            <a href="#home" className="inline-flex items-center gap-2 group mb-4">
              <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-[#F40009] transition-colors">
                KOLA
              </span>
              <svg
                className="w-5 h-3 text-[#F40009]"
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
            </a>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-6">
              Refreshing the world since 1892. Real magic in every drop, ice-cold and shared across 200+ nations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { name: 'Instagram', label: 'IG' },
                { name: 'X / Twitter', label: 'X' },
                { name: 'YouTube', label: 'YT' },
                { name: 'TikTok', label: 'TT' },
                { name: 'Spotify', label: 'SP' },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#F40009] hover:text-white border border-white/10 text-zinc-300 text-xs font-bold flex items-center justify-center transition-all"
                >
                  {social.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Classic Kola
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Zero Sugar
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Diet Kola
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Cherry Kola
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Heritage Glass Contour
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Heritage & Values */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Our Story
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  The Secret Formula
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Iconic Contour Bottle
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Cultural Milestones
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white transition-colors">
                  World Without Waste
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white transition-colors">
                  Water Stewardship
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Region & Language Selector */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Region / Location
            </h4>
            <div className="relative">
              <button
                type="button"
                onClick={() => setRegionOpen(!regionOpen)}
                className="w-full text-left p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs text-white flex items-center justify-between transition-colors"
                aria-expanded={regionOpen}
              >
                <div className="flex items-center gap-2 truncate">
                  <Globe className="w-3.5 h-3.5 text-[#F40009] shrink-0" />
                  <span className="truncate">{selectedRegion}</span>
                </div>
              </button>

              {regionOpen && (
                <div className="absolute bottom-full mb-2 left-0 right-0 max-h-48 overflow-y-auto rounded-xl bg-[#18181B] border border-white/15 shadow-2xl py-1 z-50 text-xs">
                  {regions.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setSelectedRegion(r);
                        setRegionOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-white/10 ${
                        selectedRegion === r ? 'text-[#F40009] font-bold' : 'text-zinc-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3 text-[11px] text-zinc-500">
              Prices shown in local currency.
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quiet Legal Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} The KOLA Company. All rights reserved. Real Magic is a registered trademark.
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <button type="button" className="hover:text-white transition-colors">Privacy Notice</button>
            <span>·</span>
            <button type="button" className="hover:text-white transition-colors">Terms of Use</button>
            <span>·</span>
            <button type="button" className="hover:text-white transition-colors">Cookie Choices</button>
            <span>·</span>
            <button type="button" className="hover:text-white transition-colors">Nutritional Transparency</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
