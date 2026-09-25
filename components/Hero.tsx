import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Sparkles, Thermometer, ShieldCheck } from 'lucide-react';
import { BottleVisual } from './BottleVisual';
import { VideoModal } from './VideoModal';

interface HeroProps {
  onExploreFlavors: () => void;
  onQuickOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreFlavors, onQuickOrder }) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [poppedCount, setPoppedCount] = useState(0);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[#111111]"
    >
      {/* Background Ambience & Lighting */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F40009]/25 via-[#F40009]/5 to-transparent blur-3xl pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent blur-2xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* Decorative Wave Ribbon across viewport background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -100,500 C 300,300 700,750 1540,400"
          stroke="#F40009"
          strokeWidth="3"
        />
        <path
          d="M -100,550 C 320,340 720,800 1540,440"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Zero-Pill Unboxed Text Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-medium mb-4"
            >
              <span className="text-[#F40009] font-bold">Original Formula</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Established 1892</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                Optimal 3°C Chill
              </span>
            </motion.div>

            {/* Headline with Elegant Curved Accent Ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white leading-[1.05] text-balance mb-3">
                Real Magic in <br />
                <span className="relative inline-block text-white">
                  Every Drop
                  {/* Curved Accent Flourish Underline */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-4 sm:h-5 text-[#F40009]"
                    viewBox="0 0 320 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4,14 C 70,2 190,26 316,6"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 28,19 C 100,8 210,28 300,12"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal"
            >
              A century of timeless effervescence. Crafted with mountain spring water, our secret botanical kola infusion, and thousands of rising micro-bubbles—served ice-cold for that unmistakable crisp bite.
            </motion.p>

            {/* Action Buttons: Primary + Secondary Ghost */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={onExploreFlavors}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F40009] hover:bg-[#d00007] text-white font-bold text-sm tracking-wide shadow-[0_8px_25px_rgba(244,0,9,0.45)] hover:shadow-[0_10px_30px_rgba(244,0,9,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Explore Flavors</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/20 hover:border-white/40 backdrop-blur-md transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#F40009] transition-colors">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                <span>Watch Film</span>
              </button>
            </motion.div>

            {/* Sensory Proof Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-12 pt-8 border-t border-white/10 w-full max-w-lg grid grid-cols-3 gap-4"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                  100%
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">Natural Flavors</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
                  3.2 Bar
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">Crisp Carbonation</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#F40009] tracking-tight tabular-nums">
                  Zero
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">Artificial Dyes</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating Product Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <BottleVisual onPopCap={() => setPoppedCount((c) => c + 1)} />
          </div>

        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
};
