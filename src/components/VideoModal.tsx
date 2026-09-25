import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: 'The Spark', time: '0:00' },
    { title: 'Pure Spring Bubbles', time: '0:35' },
    { title: 'The Sacred Clink', time: '1:10' },
    { title: 'Real Magic Together', time: '1:45' },
  ];

  // Auto increment progress when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 200);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-title"
    >
      <div className="relative w-full max-w-4xl bg-[#111111] rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F40009] animate-pulse" />
            <h3 id="video-title" className="text-sm font-semibold text-white tracking-wide">
              KOLA Brand Film · Real Magic in Every Drop
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close brand film"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Cinematic Screen Area */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-zinc-950 via-[#1F0305] to-zinc-950 flex items-center justify-center overflow-hidden group">
          {/* Animated Atmospheric Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F40009]/20 via-transparent to-black pointer-events-none" />

          {/* Film Visual Scene Content */}
          <div className="relative z-10 text-center px-6 max-w-lg">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-[11px] font-semibold text-red-200 tracking-wider uppercase">
              Official 4K Cinema Cut · 2:15
            </div>
            <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-2 leading-tight">
              {chapters[activeChapter].title}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6">
              Witness the craft, the effervescence, and the unforgettable moments shared across 200 nations.
            </p>

            {/* Play / Pause Big Center Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F40009] hover:bg-[#d00007] text-white shadow-[0_0_30px_rgba(244,0,9,0.5)] transition-transform transform hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
          </div>

          {/* Chapter Quick Jump Pills at Top Right of Screen */}
          <div className="absolute top-4 right-4 z-20 flex gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/10 text-xs">
            {chapters.map((ch, idx) => (
              <button
                key={ch.title}
                onClick={() => {
                  setActiveChapter(idx);
                  setProgress((idx / chapters.length) * 100);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  activeChapter === idx
                    ? 'bg-[#F40009] text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {ch.title}
              </button>
            ))}
          </div>

          {/* Bottom Player Overlay Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 z-20 flex flex-col gap-2">
            {/* Timeline Bar */}
            <div
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(pos * 100);
              }}
            >
              <div
                className="h-full bg-[#F40009] rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Player Controls Row */}
            <div className="flex items-center justify-between text-xs text-zinc-300 pt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setProgress(0)}
                  className="hover:text-white transition-colors"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px] text-zinc-400">
                  {Math.floor((progress * 135) / 100 / 60)}:
                  {String(Math.floor(((progress * 135) / 100) % 60)).padStart(2, '0')} / 2:15
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-red-400">Ultra-HD Master</span>
                <Maximize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
