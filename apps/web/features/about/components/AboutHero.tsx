/**
 * @file features/about/components/AboutHero.tsx
 * @description Hero section for the About LearnVeda page
 *
 * Full-width, high-impact header showing:
 *  - Bold mission statement
 *  - Platform origin story (1-2 lines)
 *  - Key impact statistics (students, chapters, countries)
 *
 * Uses Framer Motion for entry animations.
 */

"use client"; // Requires client-side for animations

import React from "react";
import { motion } from "framer-motion"; // Smooth entry animations
import { BookOpen, Globe2, Users, Star } from "lucide-react"; // Stat icons

/* ─── Impact Stats ───────────────────────────────────────────────────────── */
// Key numbers shown prominently in the hero section
const STATS = [
  { icon: Users,    value: "10,400+", label: "Students Enrolled"   },
  { icon: BookOpen, value: "520+",    label: "Chapters Available"  },
  { icon: Globe2,   value: "22",      label: "Countries Reached"   },
  { icon: Star,     value: "4.8/5",   label: "Average Rating"      },
];

/* ─── AboutHero Component ────────────────────────────────────────────────── */
export function AboutHero() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-brand-950/5 via-background to-purple-950/5 dark:from-brand-950/20 dark:to-purple-950/20"
      aria-label="About LearnVeda hero"
    >
      {/* Background gradient orbs for visual depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* ── Main headline ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0.01, y: 32 }}       // Start near-invisible slightly below
          animate={{ opacity: 1, y: 0 }}            // Animate to full opacity at natural position
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Overline label */}
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 mb-6">
            🇮🇳 Made in India, for India
          </span>

          {/* Page title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Our Mission:{" "}
            <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
              Quality Education for Every Student
            </span>
          </h1>

          {/* Mission statement */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            LearnVeda was built on a simple belief — every student in India, regardless of where
            they live or what school they attend, deserves access to the best learning tools.
            We combine CBSE curriculum, engineering knowledge, programming skills, and AI-powered
            tutoring into one accessible platform.
          </p>
        </motion.div>

        {/* ── Impact stats grid ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border bg-card text-center shadow-sm"
            >
              {/* Stat icon */}
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                <stat.icon className="h-5 w-5" />
              </div>
              {/* Stat value */}
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              {/* Stat label */}
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
