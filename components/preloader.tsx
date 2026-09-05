"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");

  useEffect(() => {
    // Phase 1: enter (0s)
    // Phase 2: show text (0.6s)
    const t1 = setTimeout(() => setPhase("show"), 400);
    // Phase 3: exit (3.0s)
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    // Done (3.6s)
    const t3 = setTimeout(() => onFinish(), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <AnimatePresence mode="wait">
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-brand-bg flex flex-col items-center justify-center"
        >
          {/* Background grain */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(229,169,60,0.2) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Decorative circle behind */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: phase === "show" ? 1 : 0.8,
              opacity: phase === "show" ? 0.12 : 0.06,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-64 h-64 rounded-full bg-brand-accent blur-3xl"
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase === "enter" ? 0 : 1,
              y: phase === "enter" ? 20 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-brand-accent/30 overflow-hidden shadow-glow">
              <img
                src="/logo.jpg"
                alt="Arte & Delícia"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Name */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "show" ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-2 tracking-tight">
                {"Arte &".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={
                      phase === "show"
                        ? { opacity: 1, y: 0, rotateX: 0 }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                    style={{ perspective: "200px" }}
                  >
                    {char === " " ? " " : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "show" ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 tracking-tight">
                {"Delícia".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={
                      phase === "show"
                        ? { opacity: 1, y: 0, rotateX: 0 }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block text-gradient"
                    style={{ perspective: "200px" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: phase === "show" ? 1 : 0,
              y: phase === "show" ? 0 : 10,
            }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="relative z-10 text-sm text-brand-text-muted/60 tracking-[0.25em] uppercase mt-4 font-light"
          >
            Pizzaria Artesanal
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.6 }}
            className="relative z-10 h-0.5 bg-brand-border/40 rounded-full mt-8 w-48 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-brand-accent/40 via-brand-accent to-brand-accent/40 rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.6 }}
            />
          </motion.div>

          {/* Floating dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-brand-accent/40"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
