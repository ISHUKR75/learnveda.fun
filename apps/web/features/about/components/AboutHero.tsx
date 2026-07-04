/**
 * @file features/about/components/AboutHero.tsx
 * @description Hero section for the About page
 * Displays the company mission statement with a gradient background
 */

"use client"; // Client component for animations

import React from "react";                        // React core
import { motion } from "framer-motion";           // Entry animations
import { Sparkles, Heart, Globe } from "lucide-react"; // Icons
import { Badge } from "@/components/ui/badge";   // Badge component

/* ─── About Hero Component ───────────────────────────────────────────────── */
export function AboutHero() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-950/20 dark:to-purple-950/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.border)_1px,transparent_0)] [background-size:32px_32px] opacity-40" />

      <div className="relative container px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 max-w-3xl mx-auto"
        >
          {/* Badge */}
          <Badge variant="outline" className="text-brand-500 border-brand-500/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Our Story
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Making Education{" "}
            <span className="text-gradient">Accessible to All</span>
          </h1>

          {/* Mission statement */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            LearnVeda was founded with one belief — every student in India deserves access to world-class education, regardless of their location, economic background, or school quality. We are building the platform that makes that possible.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-6 mt-4 w-full max-w-md">
            {[
              { value: "2024", label: "Founded",    icon: <Sparkles className="h-4 w-4" /> },
              { value: "India", label: "Based In",  icon: <Globe    className="h-4 w-4" /> },
              { value: "10K+",  label: "Students",  icon: <Heart    className="h-4 w-4" /> },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className="text-brand-500">{stat.icon}</div>
                <span className="text-2xl font-extrabold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
