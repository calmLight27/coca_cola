import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductLineup } from './components/ProductLineup';
import { FizzExperience } from './components/FizzExperience';
import { StorySection } from './components/StorySection';
import { SustainabilitySection } from './components/SustainabilitySection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      variantId: 'classic',
      name: 'Classic Kola',
      pack: '12 × 12 fl oz Cans',
      price: 9.99,
      quantity: 1,
      imageColor: '#F40009',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.variantId === item.variantId && i.pack === item.pack
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
    showToast(`Added ${item.name} (${item.pack}) to bag`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col selection:bg-[#F40009] selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-zinc-900/95 border border-[#F40009]/50 text-white text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#F40009] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Translucent Glassmorphism Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreFlavors={scrollToProducts}
          onQuickOrder={() => setIsCartOpen(true)}
        />

        {/* Product Lineup Showcase */}
        <ProductLineup onAddToCart={handleAddToCart} />

        {/* Sensory Lab / Fizz Experience */}
        <FizzExperience />

        {/* Brand Experience & Heritage Story */}
        <StorySection />

        {/* Sustainability & Impact Cards */}
        <SustainabilitySection />
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Multi-Column Footer */}
      <Footer />
    </div>
  );
}
