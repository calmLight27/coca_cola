import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';

interface BottleVisualProps {
  onPopCap?: () => void;
}

export const BottleVisual: React.FC<BottleVisualProps> = ({ onPopCap }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [fizzCount, setFizzCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play synthesized crisp fizz sound when popped
  const playFizzSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      // White noise buffer for fizz
      const bufferSize = audioCtx.sampleRate * 1.5;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4500, audioCtx.currentTime);
      filter.Q.setValueAtTime(3, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    } catch {
      // AudioContext unavailable or restricted
    }
  };

  const handlePop = () => {
    setIsPopped(true);
    setFizzCount((prev) => prev + 1);
    playFizzSound();
    if (onPopCap) onPopCap();
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center select-none">
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F40009]/30 via-[#F40009]/15 to-transparent blur-3xl pointer-events-none transform -translate-y-4 scale-110" 
        aria-hidden="true"
      />

      {/* Floating Ice Cubes in 3D Space */}
      <motion.div
        animate={{
          y: [-10, 8, -10],
          rotate: [-4, 6, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-12 left-6 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/40 via-white/10 to-transparent backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.15)] transform rotate-12 flex items-center justify-center">
          <div className="w-6 h-6 border-t border-l border-white/60 rounded-tl opacity-70" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [12, -8, 12],
          rotate: [6, -8, 6],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute bottom-20 right-8 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-white/35 via-white/15 to-transparent backdrop-blur-md border border-white/40 shadow-[0_8px_24px_rgba(255,255,255,0.15)] transform -rotate-12 flex items-center justify-center">
          <div className="w-5 h-5 border-b border-r border-white/60 rounded-br opacity-60" />
        </div>
      </motion.div>

      <motion.div
        animate={{
          y: [-6, 10, -6],
          x: [-4, 4, -4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute top-36 right-10 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 transform rotate-45" />
      </motion.div>

      {/* Burst Fizz Particles when Cap is Popped */}
      <AnimatePresence>
        {isPopped && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-30">
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * 360;
              const radius = 60 + (i % 3) * 35;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius - 40;
              return (
                <motion.div
                  key={`${fizzCount}-${i}`}
                  initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.2, 0.4],
                    opacity: [1, 0.9, 0],
                    x,
                    y,
                  }}
                  transition={{
                    duration: 0.9 + (i % 4) * 0.2,
                    ease: "easeOut",
                  }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#F40009]"
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Main Bottle Container with Gentle Floating Animation */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-0.8, 1, -0.8],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-20 cursor-pointer group flex flex-col items-center"
        onClick={handlePop}
        title="Click to pop the cap!"
      >
        {/* Popped Crown Cap flying off */}
        <AnimatePresence>
          {isPopped ? (
            <motion.div
              initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
              animate={{ y: -65, x: 45, rotate: 140, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute -top-4 w-12 h-5 bg-[#F40009] rounded-t-sm border border-white/60 shadow-lg z-30"
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="relative w-11 h-4 bg-[#F40009] rounded-t-sm border-t border-x border-white/70 shadow-md z-30 flex items-center justify-center"
            >
              {/* Fluted crown ridges */}
              <div className="absolute inset-x-0 bottom-0 h-1 flex justify-between px-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="w-0.5 h-1 bg-white/50" />
                ))}
              </div>
              <span className="text-[7px] font-bold text-white tracking-widest uppercase">KOLA</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master SVG Contour Bottle */}
        <svg
          viewBox="0 0 200 480"
          className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] filter"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Liquid Gradient */}
            <linearGradient id="colaLiquid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E0A04" />
              <stop offset="35%" stopColor="#4A1405" />
              <stop offset="55%" stopColor="#871A06" />
              <stop offset="75%" stopColor="#380C03" />
              <stop offset="100%" stopColor="#120401" />
            </linearGradient>

            {/* Glass Specular Reflection Gradient */}
            <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="25%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.0)" />
              <stop offset="90%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
            </linearGradient>

            {/* Crimson Core Backlight */}
            <radialGradient id="bottleRimGlow" cx="50%" cy="55%" r="45%">
              <stop offset="0%" stopColor="#F40009" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#7F0909" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Frost Texture Pattern */}
            <pattern id="frostPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="5" r="1" fill="rgba(255,255,255,0.5)" />
              <circle cx="14" cy="12" r="1.3" fill="rgba(255,255,255,0.6)" />
              <circle cx="9" cy="18" r="0.8" fill="rgba(255,255,255,0.4)" />
              <circle cx="18" cy="4" r="0.9" fill="rgba(255,255,255,0.5)" />
            </pattern>
          </defs>

          {/* Bottle Path Silhouette */}
          {/* Classic contour shape: narrow neck -> upper shoulder swell -> pinched waist -> lower body swell -> flared base */}
          <path
            id="contourBottleOutline"
            d="
              M 88,25 
              L 112,25 
              C 114,40 115,55 116,75 
              C 120,95 138,125 148,155 
              C 156,180 154,205 142,228 
              C 134,242 130,252 130,265 
              C 130,278 135,288 142,302 
              C 152,322 154,345 148,375 
              C 142,402 135,435 132,450 
              C 130,460 120,465 100,465 
              C 80,465 70,460 68,450 
              C 65,435 58,402 52,375 
              C 46,345 48,322 58,302 
              C 65,288 70,278 70,265 
              C 70,252 66,242 58,228 
              C 46,205 44,180 52,155 
              C 62,125 80,95 84,75 
              C 85,55 86,40 88,25 
              Z
            "
            fill="url(#colaLiquid)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />

          {/* Internal Red Effervescent Rim Glow */}
          <path
            d="
              M 90,30 
              L 110,30 
              C 114,45 115,60 115,80 
              C 119,98 135,126 144,155 
              C 151,178 149,202 138,225 
              C 131,239 127,250 127,265 
              C 127,279 131,289 138,303 
              C 148,322 150,344 144,373 
              C 138,400 132,430 130,446 
              C 126,458 116,460 100,460 
              C 84,460 74,458 70,446 
              C 68,430 62,400 56,373 
              C 50,344 52,322 62,303 
              C 69,289 73,279 73,265 
              C 73,250 69,239 62,225 
              C 51,202 49,178 56,155 
              C 65,126 81,98 85,80 
              C 85,60 86,45 90,30 
              Z
            "
            fill="url(#bottleRimGlow)"
          />

          {/* Fluted Vertical Ribbed Grooves on Glass */}
          <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
            <path d="M 85,150 C 78,200 78,230 85,280 C 88,320 86,360 82,410" />
            <path d="M 100,145 C 98,200 98,230 100,280 C 100,320 100,360 100,415" />
            <path d="M 115,150 C 122,200 122,230 115,280 C 112,320 114,360 118,410" />
          </g>

          {/* Animated Carbonation Bubbles Rising Inside */}
          <g fill="#FFAA80" opacity="0.75">
            <circle cx="95" cy="410" r="1.5" className="animate-bubble-1" />
            <circle cx="106" cy="380" r="2.2" className="animate-bubble-2" />
            <circle cx="90" cy="340" r="1.8" className="animate-bubble-3" />
            <circle cx="102" cy="270" r="2.5" className="animate-bubble-4" />
            <circle cx="112" cy="220" r="1.6" className="animate-bubble-1" />
            <circle cx="92" cy="180" r="2.0" className="animate-bubble-3" />
            <circle cx="104" cy="130" r="1.5" className="animate-bubble-2" />
          </g>

          {/* Iconic Script Brand Ribbon Label on Center Waist */}
          <g transform="translate(100, 245)">
            {/* Crimson Red Label Background Band */}
            <path
              d="M -46,-22 C -20,-28 20,-28 46,-22 L 44,24 C 20,18 -20,18 -44,24 Z"
              fill="#F40009"
              stroke="#FFFFFF"
              strokeWidth="0.8"
            />
            {/* Dynamic Swirling White Wave Ribbon */}
            <path
              d="M -42,12 C -22,-6 10,22 42,-4"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Secondary wave flourish */}
            <path
              d="M -38,18 C -15,4 16,28 38,4"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Brand Script Wordmark */}
            <text
              x="0"
              y="2"
              fill="#FFFFFF"
              textAnchor="middle"
              className="font-display font-black text-[18px] tracking-tight"
              style={{ letterSpacing: '-0.04em' }}
            >
              KOLA
            </text>
            <text
              x="0"
              y="11"
              fill="rgba(255,255,255,0.85)"
              textAnchor="middle"
              className="text-[5px] font-semibold tracking-widest uppercase"
            >
              CLASSIC · 1892
            </text>
          </g>

          {/* Ice Frost & Condensation Droplet Pattern Overlay */}
          <rect
            x="50"
            y="70"
            width="100"
            height="390"
            fill="url(#frostPattern)"
            opacity="0.55"
            className="animate-shimmer"
            clipPath="url(#contourBottleOutline)"
          />

          {/* Specular Droplets with Glass Highlights */}
          <g fill="#FFFFFF" opacity="0.85">
            <ellipse cx="78" cy="165" rx="2.5" ry="3.5" />
            <ellipse cx="124" cy="185" rx="3" ry="4" />
            <ellipse cx="68" cy="225" rx="2" ry="3" />
            <ellipse cx="128" cy="235" rx="2.5" ry="3" />
            <ellipse cx="74" cy="320" rx="3.5" ry="5" />
            <ellipse cx="122" cy="330" rx="2.8" ry="4" />
            <ellipse cx="80" cy="380" rx="2.5" ry="3" />
            <ellipse cx="118" cy="395" rx="3" ry="4" />
          </g>

          {/* Glass Contour Outer Specular Highlight */}
          <path
            d="
              M 90,25 
              C 87,40 86,55 85,75 
              C 81,95 65,125 55,155 
              C 48,180 50,205 60,228 
              C 68,242 72,252 72,265 
              C 72,278 68,288 60,302 
              C 50,322 48,345 54,375 
              C 60,402 67,435 70,450
            "
            fill="none"
            stroke="url(#glassReflection)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Right Subtle Rim Light */}
          <path
            d="
              M 110,25 
              C 113,40 114,55 115,75 
              C 119,95 135,125 145,155 
              C 152,180 150,205 140,228 
              C 132,242 128,252 128,265 
              C 128,278 132,288 140,302 
              C 150,322 152,345 146,375 
              C 140,402 133,435 130,450
            "
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* Interactive Floating Pill Badge underneath */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs text-white/90 backdrop-blur-md transition-all group-hover:border-[#F40009]/60 group-hover:shadow-[0_0_15px_rgba(244,0,9,0.3)]">
            <Sparkles className="w-3.5 h-3.5 text-[#F40009] animate-pulse" />
            <span className="font-medium">
              {isPopped ? 'Chilled & Popped · 3°C' : 'Click to Pop the Cap'}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSoundEnabled(!soundEnabled);
            }}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/15"
            aria-label={soundEnabled ? "Mute audio" : "Enable sound effect"}
            title={soundEnabled ? "Sound enabled" : "Enable sound"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#F40009]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
