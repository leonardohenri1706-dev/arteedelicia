"use client";

import { motion } from "framer-motion";
import { ScrollReveal, WordReveal } from "@/components/scroll-reveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background gradient base (always visible as fallback) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-surface to-brand-bg" />
      
      {/* Hero background image with warm overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/arte-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/70 to-brand-bg/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/60 via-transparent to-brand-bg/60" />
      </div>

      {/* Subtle radial pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(229,169,60,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="section-container relative z-10 pt-28 pb-20">
        <div className="max-w-2xl">
          <ScrollReveal delay={1}>
            <span className="inline-flex items-center gap-3 text-brand-accent text-sm font-medium tracking-[0.2em] uppercase mb-5">
              <span className="w-8 h-px bg-brand-accent/60" />
              Itaiçaba — Beira Rio
            </span>
          </ScrollReveal>

          <h1 className="text-hero font-display font-bold text-brand-text leading-[0.95] mb-6">
            <WordReveal
              text="Arte &"
              as="span"
              className="block"
              delay={0.08}
              wordClassName="text-gradient"
            />
            <WordReveal
              text="Delícia"
              as="span"
              className="block mt-1"
              delay={0.08}
              wordClassName="text-brand-text"
            />
          </h1>

          <ScrollReveal delay={3}>
            <p className="text-lg md:text-xl text-brand-text-muted/80 font-body leading-relaxed max-w-lg mb-8 font-light">
              Mais de 13 anos de tradição e sabor servindo Itaiçaba com carinho. Pizzas artesanais, ambiente acolhedor e o verdadeiro gosto do interior do Ceará.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={4}>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href="#cardapio" className="group inline-flex items-center gap-2.5 bg-brand-primary hover:bg-brand-primary-light text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-300 shadow-glow hover:shadow-glow-strong">
                Ver Cardápio
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="https://wa.me/5588993345987" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent/10 font-medium px-7 py-3.5 rounded-xl transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                (88) 9933-45987
              </a>
            </motion.div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={5}>
          <div className="mt-16 md:mt-24 flex items-center gap-4 text-brand-text-muted/30">
            <span className="h-px w-16 bg-brand-accent/20" />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Tradição desde 2012</span>
            <span className="h-px flex-1 bg-brand-border/60" />
          </div>
        </ScrollReveal>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="18" height="26" viewBox="0 0 24 32" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-accent/30">
          <rect x="2" y="2" width="20" height="28" rx="10" />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}