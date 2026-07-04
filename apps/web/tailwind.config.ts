/**
 * @file tailwind.config.ts
 * @description Tailwind CSS configuration for LearnVeda
 * Custom design tokens, animations, and utility extensions
 */

import type { Config } from "tailwindcss"; // Import Config type for TypeScript support
import animate from "tailwindcss-animate";  // Plugin for CSS animation utilities

const config: Config = {
  // ─── Dark Mode ─────────────────────────────────────────────────────────────
  darkMode: ["class"], // Toggle dark mode via .dark class on <html>

  // ─── Content Paths ─────────────────────────────────────────────────────────
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // App Router pages & layouts
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Shared UI components
    "./features/**/*.{js,ts,jsx,tsx,mdx}",   // Feature-specific components
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",    // Page layouts
  ],

  // ─── Theme Customization ───────────────────────────────────────────────────
  theme: {
    container: {
      center: true,           // Center containers by default
      padding: "2rem",        // Default horizontal padding
      screens: { "2xl": "1400px" }, // Max width for 2xl screens
    },

    extend: {
      // ── Brand Color Palette ──────────────────────────────────────────────
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",

        // LearnVeda brand primary (indigo/violet)
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // LearnVeda specific brand colors
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Primary brand color
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
      },

      // ── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ── Custom Fonts ─────────────────────────────────────────────────────
      fontFamily: {
        sans:  ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
        display: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },

      // ── Custom Animations ────────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fade-in 0.5s ease-out",
        "fade-in-up":     "fade-in-up 0.6s ease-out",
        "slide-in-left":  "slide-in-left 0.5s ease-out",
        "pulse-slow":     "pulse-slow 3s ease-in-out infinite",
        shimmer:          "shimmer 2s linear infinite",
        float:            "float 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },

      // ── Background Gradients ─────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":   "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "brand-gradient":  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
      },
    },
  },

  // ─── Plugins ───────────────────────────────────────────────────────────────
  plugins: [animate], // Adds animation utility classes
};

export default config; // Export Tailwind configuration
