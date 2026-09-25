import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Recycle, Droplets, Users, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { IMPACT_PILLARS } from '../data/products';
import { ImpactPillar } from '../types';

export const SustainabilitySection: React.FC = () => {
  const [activeModalPillar, setActiveModalPillar] = useState<ImpactPillar | null>(null);

  return (
    <section id="sustainability" className="py-24 bg-[#0B0B0C] relative overflow-hidden border-t border-white/5">
      {/* Background radial gradient */}
      <div 
        className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">
            Planet & Community Stewardship
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Refreshing the World. <br />
            Preserving Tomorrow.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            True refreshment leaves nothing wasted and everyone empowered. Explore our verified 2030 sustainability commitments across circular materials, water replenishment, and local community leadership.
          </p>
        </div>

        {/* 3 Modern Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {IMPACT_PILLARS.map((pillar, idx) => {
            const isRecycle = pillar.id === 'packaging';
            const isWater = pillar.id === 'water';

            return (
              <div
                key={pillar.id}
                className="group relative rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-white/20 p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1"
              >
                {/* Top Icon & Metric */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isRecycle
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : isWater
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isRecycle && <Recycle className="w-6 h-6" />}
                      {isWater && <Droplets className="w-6 h-6" />}
                      {!isRecycle && !isWater && <Users className="w-6 h-6" />}
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-display font-extrabold text-white tabular-nums">
                        {pillar.metric}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-medium max-w-[130px] leading-tight">
                        {pillar.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Card Title & Subtitle */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-[#F40009] transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-zinc-400 mb-3">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-6">
                    {pillar.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {pillar.details.slice(0, 2).map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Learn More Action */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalPillar(pillar)}
                    className="text-xs font-semibold text-white hover:text-[#F40009] transition-colors flex items-center gap-1 group/btn"
                  >
                    <span>Read Full Impact Report</span>
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[10px] text-zinc-500 font-mono">2030 GOAL</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pillar Detail Modal */}
      <AnimatePresence>
        {activeModalPillar && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#18181B] rounded-3xl border border-white/20 p-6 sm:p-8 max-w-xl w-full shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold font-display text-white">
                    {activeModalPillar.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalPillar(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-extrabold text-[#F40009] font-mono tabular-nums mb-1">
                  {activeModalPillar.metric}
                </div>
                <div className="text-xs text-zinc-400 font-medium">
                  {activeModalPillar.metricLabel}
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {activeModalPillar.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Verified Initiatives & Measurable Progress:
                </div>
                {activeModalPillar.details.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200 bg-white/5 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveModalPillar(null)}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                Close Initiative Overview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
