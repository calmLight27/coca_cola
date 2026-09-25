import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Compass, Heart, History, Users, Sparkles, Quote } from 'lucide-react';
import { STORY_MILESTONES, GLOBAL_STATS } from '../data/products';

export const StorySection: React.FC = () => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const currentMilestone = STORY_MILESTONES[activeMilestoneIndex];

  return (
    <section id="story" className="py-24 bg-[#111111] relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div 
        className="absolute top-1/3 -left-32 w-96 h-96 bg-[#F40009]/15 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-[#F40009] font-bold mb-2">
            The Living Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Over a Century of Connection
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light">
            More than a beverage—an emblem of shared optimism, cultural milestones, and unyielding refreshment across six generations.
          </p>
        </div>

        {/* Two-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heritage Narrative & Interactive Milestones */}
          <div className="lg:col-span-6 flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 leading-tight">
              Crafted in 1892. <br />
              Beloved Everywhere Today.
            </h3>
            
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
              In 1892, a vision took root: to craft a beverage so distinct, so exhilarating, that every sip created a pause of genuine delight. That spark evolved into the world's most recognized silhouette—a bottle contoured with ribbed fluting so anyone could identify it in the dark or by touch alone.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              Today, while our packaging evolves toward 100% circularity and zero-waste stewardship, the core sensation remains untouchable: the hiss of the release, the rise of the carbonation, and the crisp bite at exactly 3°C.
            </p>

            {/* Interactive Milestone Timeline */}
            <div className="mt-2 border-t border-white/10 pt-6">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#F40009]" />
                <span>Key Milestones in Refreshment History</span>
              </div>

              {/* Milestone Timeline Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {STORY_MILESTONES.map((m, idx) => {
                  const isActive = activeMilestoneIndex === idx;
                  return (
                    <button
                      key={m.year}
                      type="button"
                      onClick={() => setActiveMilestoneIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isActive
                          ? 'border-[#F40009] bg-[#F40009]/15 text-white shadow-lg'
                          : 'border-white/10 bg-white/5 hover:border-white/20 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold font-mono tabular-nums">
                        {m.year}
                      </div>
                      <div className="text-[10px] truncate mt-0.5 font-medium">
                        {m.tag}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMilestone.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-white font-display">
                      {currentMilestone.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#F40009] px-2 py-0.5 rounded bg-[#F40009]/10">
                      {currentMilestone.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {currentMilestone.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Lifestyle Experience Card & Global Verified Stats */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Lifestyle Showcase Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-zinc-900 to-black p-8 sm:p-10 shadow-2xl">
              {/* Background Artwork: Clinking Bottles & Golden Sunset Glow */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
                style={{
                  backgroundImage: `radial-gradient(circle at 70% 30%, rgba(244, 0, 9, 0.45) 0%, transparent 60%)`,
                }}
              />

              {/* Graphic Composition of Iconic Clinking Glass Bottles */}
              <div className="relative z-10 flex items-center justify-center py-6">
                <div className="relative flex items-center justify-center gap-2">
                  {/* Left Bottle tilted right */}
                  <div className="w-16 h-36 bg-gradient-to-b from-transparent via-[#F40009]/30 to-[#F40009]/70 rounded-full border border-white/30 transform -rotate-12 flex items-center justify-center shadow-lg">
                    <div className="w-2 h-16 bg-white/40 rounded-full blur-[1px]" />
                  </div>
                  {/* Clink Sparkle Center */}
                  <div className="relative z-20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  {/* Right Bottle tilted left */}
                  <div className="w-16 h-36 bg-gradient-to-b from-transparent via-[#F40009]/30 to-[#F40009]/70 rounded-full border border-white/30 transform rotate-12 flex items-center justify-center shadow-lg">
                    <div className="w-2 h-16 bg-white/40 rounded-full blur-[1px]" />
                  </div>
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#F40009] shrink-0 transform -scale-x-100" />
                  <div>
                    <p className="text-sm sm:text-base text-zinc-200 italic font-flourish leading-relaxed">
                      "Real magic isn't an ingredient you can weigh on a scale. It's the moment when two strangers clink cold glasses on a hot day and suddenly smile."
                    </p>
                    <div className="mt-3 text-xs text-zinc-400 font-medium">
                      <span className="text-white font-semibold">Elena Vance</span> · Master Flavor Archivist, Heritage Vault
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Stats Grid with Tabular Numerals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GLOBAL_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-center flex flex-col justify-center"
                >
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
