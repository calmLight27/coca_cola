import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RotateCcw, Award } from 'lucide-react';

export const FizzExperience: React.FC = () => {
  const [fillLevel, setFillLevel] = useState<number>(0); // 0 to 100
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  // Pour action holding handler
  useEffect(() => {
    if (isPouring && fillLevel < 100) {
      intervalRef.current = window.setInterval(() => {
        setFillLevel((prev) => {
          if (prev >= 98) {
            setIsPouring(false);
            setHasCompleted(true);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPouring, fillLevel]);

  const resetPour = () => {
    setFillLevel(0);
    setIsPouring(false);
    setHasCompleted(false);
  };

  const getScoreMessage = () => {
    if (fillLevel < 40) return 'Just a splash! Keep pouring.';
    if (fillLevel < 80) return 'Getting cold and bubbly...';
    if (fillLevel >= 85 && fillLevel <= 96) return 'Sensational! Perfect 2-finger head and 3°C chill!';
    if (fillLevel > 96) return 'Right to the brim! Maximum fizzy refreshment!';
    return 'Press and hold to pour.';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0B0B0C] via-[#140203] to-[#111111] relative overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F40009]/15 border border-[#F40009]/30 text-xs font-bold text-[#F40009] uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Sensory Lab</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-3">
          Master the Perfect Pour
        </h2>
        <p className="text-sm text-zinc-300 max-w-lg mx-auto font-light mb-10">
          In our tradition, the optimal glass is tilted at 45°, poured over cracked crystal ice, and topped with a frothy 15mm crown of effervescent foam.
        </p>

        {/* Interactive Pour Canvas Container */}
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-950/80 border border-white/10 shadow-2xl flex flex-col items-center">
          
          {/* Virtual Pint / Tumbler Glass */}
          <div className="relative w-44 h-64 border-x-4 border-b-4 border-white/30 rounded-b-2xl overflow-hidden bg-white/5 backdrop-blur-md flex flex-col justify-end p-1 shadow-inner">
            
            {/* Ice Cubes inside the glass */}
            <div className="absolute inset-x-4 bottom-6 flex justify-around pointer-events-none z-10 opacity-70">
              <div className="w-8 h-8 rounded bg-white/30 backdrop-blur-md transform rotate-12 border border-white/40" />
              <div className="w-9 h-9 rounded bg-white/25 backdrop-blur-md transform -rotate-12 border border-white/40" />
            </div>

            {/* Rising Dark Amber Cola Liquid */}
            <div
              className="w-full bg-gradient-to-t from-[#1F0703] via-[#5C1405] to-[#8F1D06] rounded-b-xl transition-all duration-75 relative overflow-hidden"
              style={{ height: `${fillLevel}%` }}
            >
              {/* Effervescent Rising Bubbles inside glass */}
              {isPouring && (
                <div className="absolute inset-0 flex justify-around items-end overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-yellow-200/80 animate-bubble-1"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1.2s',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* White Frothy Foam Layer on top of liquid */}
              {fillLevel > 5 && (
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-amber-50 to-amber-200/90 shadow-md border-t border-white flex items-center justify-around">
                  <span className="w-full h-full opacity-60 bg-[radial-gradient(circle,_#FFF_1px,_transparent_1px)] bg-[size:4px_4px]" />
                </div>
              )}
            </div>

            {/* Glass Specular Rim and Highlights */}
            <div className="absolute top-0 inset-x-0 h-1 bg-white/40 rounded-full" />
            <div className="absolute left-2 inset-y-4 w-1 bg-white/20 rounded-full blur-[0.5px]" />
          </div>

          {/* Fill Gauge & Feedback Message */}
          <div className="mt-6 w-full">
            <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>Pour Volume</span>
              <span className="font-bold text-white tabular-nums">{fillLevel}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-[#F40009] rounded-full transition-all duration-100"
                style={{ width: `${fillLevel}%` }}
              />
            </div>
            <p className="mt-3 text-xs font-medium text-zinc-300 min-h-[20px]">
              {getScoreMessage()}
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="mt-6 flex items-center gap-3 w-full">
            <button
              type="button"
              onMouseDown={() => setIsPouring(true)}
              onMouseUp={() => setIsPouring(false)}
              onMouseLeave={() => setIsPouring(false)}
              onTouchStart={() => setIsPouring(true)}
              onTouchEnd={() => setIsPouring(false)}
              disabled={fillLevel >= 100}
              className={`flex-1 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all select-none ${
                fillLevel >= 100
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : isPouring
                  ? 'bg-[#B90007] text-white scale-95 shadow-[0_0_20px_rgba(244,0,9,0.7)]'
                  : 'bg-[#F40009] hover:bg-[#d00007] text-white shadow-[0_6px_20px_rgba(244,0,9,0.4)]'
              }`}
            >
              {isPouring ? 'Pouring Stream...' : fillLevel >= 100 ? 'Glass Filled!' : 'Hold to Pour'}
            </button>

            <button
              type="button"
              onClick={resetPour}
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
              title="Reset glass"
              aria-label="Reset glass"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
