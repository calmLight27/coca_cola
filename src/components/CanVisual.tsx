import React from 'react';
import { ProductVariant } from '../types';

interface CanVisualProps {
  variant: ProductVariant;
  className?: string;
}

export const CanVisual: React.FC<CanVisualProps> = ({ variant, className = '' }) => {
  const isZero = variant.id === 'zero-sugar';
  const isDiet = variant.id === 'diet-kola';
  const isCherry = variant.id === 'cherry';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Aluminum Soda Can SVG */}
      <svg
        viewBox="0 0 160 300"
        className="w-full h-auto max-h-[300px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Can Cylinder Gradient */}
          <linearGradient id={`canGrad-${variant.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            {isZero ? (
              <>
                <stop offset="0%" stopColor="#1E1E22" />
                <stop offset="25%" stopColor="#2E2E35" />
                <stop offset="50%" stopColor="#121214" />
                <stop offset="75%" stopColor="#2A2A30" />
                <stop offset="100%" stopColor="#0B0B0D" />
              </>
            ) : isDiet ? (
              <>
                <stop offset="0%" stopColor="#CCCCCC" />
                <stop offset="25%" stopColor="#F5F5F7" />
                <stop offset="50%" stopColor="#B0B3B8" />
                <stop offset="75%" stopColor="#E2E4E8" />
                <stop offset="100%" stopColor="#8A8E94" />
              </>
            ) : isCherry ? (
              <>
                <stop offset="0%" stopColor="#4A0512" />
                <stop offset="25%" stopColor="#800D22" />
                <stop offset="50%" stopColor="#550816" />
                <stop offset="75%" stopColor="#9C142E" />
                <stop offset="100%" stopColor="#30030A" />
              </>
            ) : (
              /* Classic Bold Red */
              <>
                <stop offset="0%" stopColor="#BA0006" />
                <stop offset="25%" stopColor="#F40009" />
                <stop offset="50%" stopColor="#DC0007" />
                <stop offset="75%" stopColor="#FF1E26" />
                <stop offset="100%" stopColor="#8A0005" />
              </>
            )}
          </linearGradient>

          {/* Aluminum Top Lid & Rim Gradient */}
          <linearGradient id="aluminumRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8E9399" />
            <stop offset="30%" stopColor="#F0F2F5" />
            <stop offset="60%" stopColor="#B8BCC2" />
            <stop offset="100%" stopColor="#6C7178" />
          </linearGradient>

          {/* Vertical Specular Sheen */}
          <linearGradient id="specularSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="28%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Can Upper Chime / Lip */}
        <ellipse cx="80" cy="18" rx="52" ry="7" fill="url(#aluminumRim)" />
        <ellipse cx="80" cy="17" rx="46" ry="5.5" fill="#4B5158" />
        <ellipse cx="80" cy="16.5" rx="43" ry="5" fill="#C5C9CE" />

        {/* Can Pull-tab outline */}
        <rect x="76" y="14" width="8" height="5" rx="2" fill="#888E96" />
        <circle cx="80" cy="16.5" r="1.5" fill="#33383E" />

        {/* Can Body Silhouette with tapered neck and base */}
        <path
          d="
            M 28,26 
            C 28,20 32,18 42,18 
            L 118,18 
            C 128,18 132,20 132,26 
            L 132,264 
            C 132,274 125,282 114,282 
            L 46,282 
            C 35,282 28,274 28,264 
            Z
          "
          fill={`url(#canGrad-${variant.id})`}
        />

        {/* Bottom Aluminum Rim */}
        <path
          d="
            M 36,274 
            C 36,274 46,284 80,284 
            C 114,284 124,274 124,274 
            L 120,288 
            C 112,294 80,295 40,288 
            Z
          "
          fill="url(#aluminumRim)"
        />

        {/* Vertical Specular Sheen Overlay */}
        <rect
          x="28"
          y="18"
          width="104"
          height="264"
          fill="url(#specularSheen)"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Signature Wave Ribbon */}
        <g>
          {/* Dynamic White Wave Ribbon across the can */}
          <path
            d="M 28,175 C 65,145 95,205 132,165"
            fill="none"
            stroke={isDiet ? '#F40009' : '#FFFFFF'}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 28,185 C 65,155 95,215 132,175"
            fill="none"
            stroke={isDiet ? 'rgba(244,0,9,0.35)' : 'rgba(255,255,255,0.35)'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Bold Brand Wordmark */}
        <text
          x="80"
          y="125"
          fill={isDiet ? '#111111' : '#FFFFFF'}
          textAnchor="middle"
          className="font-display font-black text-[32px] tracking-tight"
          style={{ letterSpacing: '-0.04em' }}
        >
          KOLA
        </text>

        {/* Sub-variant Label */}
        {isZero ? (
          <g transform="translate(80, 142)">
            <rect x="-35" y="-9" width="70" height="15" rx="3" fill="#F40009" />
            <text
              x="0"
              y="2"
              fill="#FFFFFF"
              textAnchor="middle"
              className="text-[8px] font-black tracking-widest uppercase"
            >
              ZERO SUGAR
            </text>
          </g>
        ) : isDiet ? (
          <text
            x="80"
            y="142"
            fill="#F40009"
            textAnchor="middle"
            className="text-[9px] font-black tracking-widest uppercase"
          >
            DIET KOLA
          </text>
        ) : isCherry ? (
          <text
            x="80"
            y="142"
            fill="#FCA5A5"
            textAnchor="middle"
            className="text-[9px] font-black tracking-widest uppercase"
          >
            CHERRY
          </text>
        ) : (
          <text
            x="80"
            y="142"
            fill="rgba(255,255,255,0.85)"
            textAnchor="middle"
            className="text-[8px] font-bold tracking-widest uppercase"
          >
            ORIGINAL TASTE
          </text>
        )}

        {/* Real-time Condensation Droplets */}
        <g fill="#FFFFFF" opacity="0.8">
          <circle cx="48" cy="50" r="2" />
          <circle cx="58" cy="85" r="1.5" />
          <ellipse cx="112" cy="70" rx="2" ry="3" />
          <circle cx="104" cy="115" r="1.8" />
          <ellipse cx="44" cy="140" rx="2.2" ry="3.2" />
          <circle cx="52" cy="200" r="2" />
          <ellipse cx="116" cy="210" rx="2.5" ry="3.5" />
          <circle cx="108" cy="245" r="1.8" />
          <ellipse cx="60" cy="255" rx="2" ry="2.8" />
        </g>
      </svg>
    </div>
  );
};
