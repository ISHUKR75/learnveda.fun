/**
 * @file features/about/components/AboutHero.tsx
 * @description About page hero section with mission statement and impact numbers
 *
 * Shows:
 * - Main headline with mission
 * - 4 impact stats (students, simulations, languages, countries)
 * - Company founding year and location
 *
 * Used in: app/(marketing)/about/page.tsx
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, BookOpen, Zap, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Impact Stats ───────────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,    value: "10,000+", label: "Active Students",    color: "text-blue-500"   },
  { icon: BookOpen, value: "500+",    label: "Chapters & Lessons", color: "text-green-500"  },
  { icon: Zap,      value: "140+",    label: "Simulations",        color: "text-purple-500" },
  { icon: Globe,    value: "11",      label: "Languages Supported",color: "text-orange-500" },
];

/* ─── AboutHero Component ───────────────────────────────────────────────── */
export function AboutHero() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="container px-4 md:px-6 text-center relative">
        {/* Founding badge */}
        <motion.div
          initial={{ opacity: 0.01, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="gap-2 mb-6 border-brand-500/30 text-brand-600">
            <MapPin className="h-3.5 w-3.5" /> India-first EdTech · Founded 2024
          </Badge>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight"
        >
          Education that{" "}
          <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
            keeps up
          </span>{" "}
          with every Indian student
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          LearnVeda was built for the student in a tier-3 city with slow internet, the engineering
          student juggling three books, and the Class 12 aspirant who deserves the same quality
          education as anyone in a metro — just better.
        </motion.p>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0.01, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`flex justify-center mb-2 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
