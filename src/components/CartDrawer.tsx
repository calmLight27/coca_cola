import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 25 || subtotal === 0 ? 0 : 4.99;
  const total = Math.max(0, subtotal - discount + shipping);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAGIC10') {
      const disc = subtotal * 0.1;
      setDiscount(disc);
      setPromoMsg('10% Magic Discount Applied!');
    } else {
      setPromoMsg('Try code "MAGIC10" for 10% off');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirmed');
    onClearCart();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-screen max-w-md bg-[#111111] border-l border-white/10 flex flex-col text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 id="cart-drawer-title" className="text-lg font-bold font-display tracking-tight flex items-center gap-2">
              <span>Your Refreshment Bag</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F40009] text-white">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'confirmed' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">Order Confirmed!</h3>
                <p className="text-sm text-zinc-400 max-w-xs mx-auto mb-6">
                  Order #KOLA-8921 is being prepped in our temperature-controlled chilled facility.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-left text-zinc-300 space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Estimated Delivery:</span>
                    <span className="font-semibold text-white">Today within 2 Hours (Chilled)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Destination:</span>
                    <span className="font-semibold text-white">{customerAddress || 'Express Delivery Hub'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-[#F40009] text-white font-bold text-xs"
                >
                  Return to Store
                </button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="text-xs font-semibold text-[#F40009] uppercase tracking-wider">
                  Express Delivery Details
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#F40009]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Chilled Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="742 Evergreen Terrace, Apt 4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#F40009]"
                  />
                </div>
                <div className="pt-2">
                  <div className="text-xs text-zinc-400 mb-2">Payment Method</div>
                  <div className="p-3 rounded-xl bg-white/5 border border-[#F40009]/40 flex items-center justify-between text-xs">
                    <span className="font-semibold">Apple Pay / Credit Card</span>
                    <span className="text-emerald-400">Encrypted</span>
                  </div>
                </div>
                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-full bg-[#F40009] hover:bg-[#d00007] text-white font-bold text-xs"
                  >
                    Pay ${total.toFixed(2)}
                  </button>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-zinc-500 text-sm mb-4">Your bag is currently empty.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#F40009] text-white font-semibold text-xs"
                >
                  Explore Flavors
                </button>
              </div>
            ) : (
              <>
                {/* Shipping Promo Callout */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs text-zinc-300">
                  <Truck className="w-4 h-4 text-[#F40009]" />
                  <span>
                    {subtotal >= 25
                      ? 'You unlocked FREE Chilled Courier Delivery!'
                      : `Add $${(25 - subtotal).toFixed(2)} more for Free Chilled Delivery`}
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.variantId}-${item.pack}-${idx}`}
                      className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-inner"
                          style={{ backgroundColor: item.imageColor }}
                        >
                          K
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {item.pack}
                          </div>
                          <div className="text-xs font-semibold text-[#F40009] mt-1 tabular-nums">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-black/50 border border-white/10 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(idx)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={applyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. MAGIC10)"
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-[#F40009]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMsg && (
                    <div className="mt-1 text-[11px] text-[#F40009] font-medium">
                      {promoMsg}
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer with Totals and Action */}
          {items.length > 0 && checkoutStep === 'cart' && (
            <div className="p-6 border-t border-white/10 bg-black/40 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Chilled Shipping</span>
                  <span className="font-mono text-white tabular-nums">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="font-mono text-[#F40009] tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 rounded-full bg-[#F40009] hover:bg-[#d00007] text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(244,0,9,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Chilled Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>3°C Guaranteed Fresh Arrival · 100% Recyclable Packaging</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
