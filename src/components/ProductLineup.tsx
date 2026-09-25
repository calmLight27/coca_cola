import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Info, Flame, Sparkles, Citrus, Package } from 'lucide-react';
import { PRODUCT_VARIANTS } from '../data/products';
import { ProductVariant, CartItem } from '../types';
import { CanVisual } from './CanVisual';

interface ProductLineupProps {
  onAddToCart: (item: CartItem) => void;
}

export const ProductLineup: React.FC<ProductLineupProps> = ({ onAddToCart }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('classic');
  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(0);
  const [showNutritionModal, setShowNutritionModal] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const currentVariant: ProductVariant =
    PRODUCT_VARIANTS.find((v) => v.id === selectedVariantId) || PRODUCT_VARIANTS[0];

  const currentPack = currentVariant.sizes[selectedPackIndex] || currentVariant.sizes[0];

  const handleAdd = () => {
    onAddToCart({
      variantId: currentVariant.id,
      name: currentVariant.name,
      pack: currentPack.pack,
      price: currentPack.price,
      quantity: 1,
      imageColor: currentVariant.color,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section id="products" className="py-24 bg-[#0B0B0C] relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background Glow keyed to selected variant */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: currentVariant.color }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#F40009] font-bold mb-2">
              Signature Collection
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
              Find Your Perfect Pour
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-zinc-400 max-w-md font-light">
            Every variant is brewed with precision, carbonated to 3.2 atmospheres, and crafted to deliver maximum refreshing satisfaction.
          </p>
        </div>

        {/* Tabbed Variant Switcher */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar gap-2">
          <div className="inline-flex p-1.5 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md">
            {PRODUCT_VARIANTS.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setSelectedPackIndex(0);
                  }}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeVariantTab"
                      className="absolute inset-0 rounded-full bg-[#F40009]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          variant.id === 'zero-sugar' ? '#FFFFFF' : variant.color,
                      }}
                    />
                    {variant.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Showcase Card with 3D Tilt Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-900/40 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
          
          {/* Left: Product Can Visual with 3D Hover & Condensation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 relative group">
            <div className="relative w-full max-w-xs aspect-[3/4] flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
              
              {/* Radial Pod Glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-500"
                style={{ backgroundColor: currentVariant.color }}
              />

              {/* Variant Mockup */}
              <div className="relative z-10 w-full max-w-[210px]">
                <CanVisual variant={currentVariant} />
              </div>
            </div>

            {/* Quiet Unboxed Metadata */}
            <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400 font-medium">
              <span>{currentVariant.servings}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-semibold text-white">{currentVariant.calories} Calories</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{currentVariant.sugar} Sugar</span>
            </div>
          </div>

          {/* Right: Flavor Details, Tasting Notes & Purchase Module */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F40009] mb-1">
              <span>{currentVariant.badge}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {currentVariant.name}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-medium mt-1 mb-4">
              "{currentVariant.tagline}"
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
              {currentVariant.description}
            </p>

            {/* Sensory Tasting Profile Gauges */}
            <div className="mt-6 w-full max-w-lg grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Sweetness</span>
                  <span className="font-mono text-white text-[11px] tabular-nums">
                    {currentVariant.tasteProfile.sweetness}/10
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F40009] rounded-full transition-all duration-500"
                    style={{ width: `${currentVariant.tasteProfile.sweetness * 10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Carbonation</span>
                  <span className="font-mono text-white text-[11px] tabular-nums">
                    {currentVariant.tasteProfile.carbonation}/10
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${currentVariant.tasteProfile.carbonation * 10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Spice Depth</span>
                  <span className="font-mono text-white text-[11px] tabular-nums">
                    {currentVariant.tasteProfile.spiceBite}/10
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${currentVariant.tasteProfile.spiceBite * 10}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>Citrus Kick</span>
                  <span className="font-mono text-white text-[11px] tabular-nums">
                    {currentVariant.tasteProfile.citrusKick}/10
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${currentVariant.tasteProfile.citrusKick * 10}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="mt-6 w-full max-w-lg">
              <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-zinc-400" />
                <span>Select Packaging Format</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentVariant.sizes.map((size, idx) => (
                  <button
                    key={size.pack}
                    type="button"
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedPackIndex === idx
                        ? 'border-[#F40009] bg-[#F40009]/10 text-white'
                        : 'border-white/10 bg-white/5 hover:border-white/20 text-zinc-300'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-tight">{size.label}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{size.pack}</div>
                    <div className="text-sm font-bold text-white mt-1 tabular-nums">
                      ${size.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase CTA and Nutrition Toggle */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-full bg-[#F40009] hover:bg-[#d00007] text-white font-bold text-sm shadow-[0_8px_20px_rgba(244,0,9,0.35)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Bag · ${currentPack.price.toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowNutritionModal(!showNutritionModal)}
                className="px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Nutritional Facts</span>
              </button>
            </div>

            {/* Expandable Nutrition Facts Panel */}
            <AnimatePresence>
              {showNutritionModal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 w-full max-w-lg rounded-2xl bg-black/60 border border-white/15 p-5 overflow-hidden text-xs"
                >
                  <div className="font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 mb-3 flex items-center justify-between">
                    <span>Nutrition Facts ({currentVariant.servings})</span>
                    <span className="text-[#F40009]">100% Guaranteed Crisp</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-zinc-300">
                    <div className="flex justify-between border-b border-white/5 py-1">
                      <span>Calories</span>
                      <span className="font-mono font-bold text-white tabular-nums">{currentVariant.calories}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-1">
                      <span>Total Sugars</span>
                      <span className="font-mono font-bold text-white tabular-nums">{currentVariant.sugar}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-1">
                      <span>Sodium</span>
                      <span className="font-mono font-bold text-white tabular-nums">{currentVariant.sodium}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 py-1">
                      <span>Caffeine</span>
                      <span className="font-mono font-bold text-white tabular-nums">{currentVariant.caffeine}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] text-zinc-400">
                    <span className="font-semibold text-zinc-300">Ingredients: </span>
                    {currentVariant.ingredients.join(', ')}.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
