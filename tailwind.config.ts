import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0e0d0c",
          surface: "#1a1816",
          "surface-2": "#22201d",
          primary: "#b91c1c",
          "primary-light": "#dc2626",
          "primary-dark": "#991b1b",
          accent: "#e5a93c",
          "accent-light": "#f0c25e",
          "accent-dark": "#c48a2a",
          text: "#faf6f0",
          "text-muted": "#a09890",
          border: "#2a2724",
          "border-strong": "#e5a93c",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1" }],
        h1: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.15" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2" }],
        h3: ["1.25rem", { lineHeight: "1.3" }],
      },
      boxShadow: {
        warm: "0 4px 20px rgba(0,0,0,0.5)",
        "warm-lg": "0 12px 40px rgba(0,0,0,0.6)",
        glow: "0 0 24px rgba(229, 169, 60, 0.15)",
        "glow-strong": "0 0 32px rgba(229, 169, 60, 0.25)",
        card: "0 2px 8px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 24px rgba(185, 28, 28, 0.15)",
      },
      backgroundImage: {
        grain: "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuMDQiLz48L3N2Zz4=)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-accent": "pulseAccent 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseAccent: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(229,169,60,0.2)" },
          "50%": { boxShadow: "0 0 24px rgba(229,169,60,0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
