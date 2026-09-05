"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";
import PizzaCard, { BebidaCard } from "@/components/pizza-card";
import type { Pizza, Bebida } from "@/data/cardapio";

interface MenuSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  items: (Pizza | Bebida)[];
  variant?: "classic" | "drinks";
}

export default function MenuSection({
  id,
  title,
  subtitle,
  items,
  variant = "classic",
}: MenuSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative section-padding overflow-hidden"
    >
      {/* Background parallax texture */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            y: bgY,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(229,169,60,0.3) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          } as any}
        />
      </div>

      <div className="section-container relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block w-8 h-0.5 bg-brand-accent mb-4 rounded-full" />
            <h2 className="font-display font-bold text-h2 text-brand-text mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-brand-text-muted max-w-lg mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        {variant === "classic" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {(items as Pizza[]).map((item, i) => (
              <PizzaCard
                key={item.id}
                item={item}
                index={i}
                category={id}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {(items as Bebida[]).map((item, i) => (
              <BebidaCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
