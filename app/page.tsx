"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { ScrollReveal, WordReveal } from "@/components/scroll-reveal";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MenuSection from "@/components/menu-section";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import CartDrawer from "@/components/cart-drawer";
import CheckoutForm from "@/components/checkout-form";
import PizzaBuilder from "@/components/pizza-builder";
import Preloader from "@/components/preloader";
import { CartProvider, useCart } from "@/lib/cart-context";
import { classicas, especiais, doces, bebidas } from "@/data/cardapio";

function HomeContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const { items: cartItems } = useCart();

  return (
    <div className="relative">
      <Header onCartClick={() => setCartOpen(true)} cartCount={cartItems.length} />

      <main>
        <Hero />

        {/* Montar Pizza */}
        <ScrollReveal>
          <section id="montar" className="relative section-padding bg-brand-surface overflow-hidden border-y border-brand-primary/20">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none" style={{ backgroundImage: "url('/arte-bg.jpg')" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-brand-bg/60 to-brand-bg/80 pointer-events-none" />
            <div className="section-container text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block w-8 h-0.5 bg-brand-accent mb-4 rounded-full" />
                <h2 className="font-display font-bold text-h2 text-brand-text mb-3">
                  Monte sua <span className="text-gradient">pizza</span>
                </h2>
                <p className="text-brand-text-muted max-w-md mx-auto mb-6">
                  Escolha os sabores, tamanho e borda. Sua pizza, do seu jeito.
                </p>
                <button
                  onClick={() => setBuilderOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-light text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-glow"
                >
                  Montar Agora
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </motion.div>
            </div>
          </section>
        </ScrollReveal>

        {/* Seções do Cardápio */}
        <div id="cardapio">
          <MenuSection
            id="classicas"
            title="Clássicas"
            subtitle="As pizzas que todo mundo ama"
            items={classicas}
          />
          <MenuSection
            id="especiais"
            title="Especiais"
            subtitle="Sabores que só a Arte & Delícia tem"
            items={especiais}
          />
          <MenuSection
            id="doces"
            title="Doces"
            subtitle="Para fechar com chave de ouro"
            items={doces}
          />
          <MenuSection
            id="bebidas"
            title="Bebidas"
            subtitle="Refresque-se com nossas opções"
            items={bebidas}
            variant="drinks"
          />
        </div>

        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }} />
      <CheckoutForm open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <PizzaBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} />
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        {!loaded ? (
          <Preloader key="preloader" onFinish={() => setLoaded(true)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <HomeContent />
          </motion.div>
        )}
      </AnimatePresence>
    </CartProvider>
  );
}