/**
 * @file features/home/components/StatsSection.tsx
 * @description Statistics / social proof section for LearnVeda homepage
 * Displays animated counters for key platform metrics
 * Uses Intersection Observer to trigger count animation when visible
 */

"use client"; // Needs client-side for animation and counter effects

import React, { useRef } from "react";                // React core + ref
import { motion, useInView } from "framer-motion";    // Animation + scroll detection
import CountUp from "react-countup";                  // Animated number counter

/* ─── Stats Data ─────────────────────────────────────────────────────────── */
const stats = [
  {
    value:  10000,  // Number to count up to
    suffix: "+",    // Suffix after the number
    label:  "Students Learning",
    description: "Active learners across India",
    emoji: "👨‍🎓",
  },
  {
    value:  500,
    suffix: "+",
    label:  "CBSE Chapters",
    description: "Class 9 to 12 curriculum",
    emoji: "📚",
  },
  {
    value:  140,
    suffix: "+",
    label:  "Interactive Simulations",
    description: "Physics, Chemistry, CS & more",
    emoji: "🔭",
  },
  {
    value:  14,
    suffix: "",
    label:  "Programming Languages",
    description: "Day-by-day structured plans",
    emoji: "💻",
  },
  {
    value:  9,
    suffix: "",
    label:  "CS Core Subjects",
    description: "DSA, OS, DBMS, CN & more",
    emoji: "🧠",
  },
  {
    value:  100,
    suffix: "%",
    label:  "Free to Start",
    description: "No credit card required",
    emoji: "🎁",
  },
];

/* ─── Stats Section Component ────────────────────────────────────────────── */
export function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null);  // Ref for scroll detection
  const inView = useInView(ref, { once: true, margin: "-100px 0px" }); // Trigger once when 100px into viewport

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 bg-muted/30"
      aria-label="Platform statistics"
    >
      <div className="container px-4 md:px-6">
        {/* ── Section Header ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0.01, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-widest mb-2">
            Platform at a Glance
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by Students Across India
          </h2>
        </motion.div>

        {/* ── Stats Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0.01, y: 30 }}                        // Start below + invisible
              animate={inView ? { opacity: 1, y: 0 } : {}}           // Animate when in view
              transition={{ duration: 0.5, delay: index * 0.08 }}    // Staggered delay
              className="flex flex-col items-center text-center p-4 rounded-xl bg-background border hover:shadow-md transition-shadow"
            >
              {/* Emoji icon */}
              <span className="text-2xl mb-2" role="img" aria-label={stat.label}>
                {stat.emoji}
              </span>

              {/* Animated counter value */}
              <div className="text-2xl md:text-3xl font-extrabold text-gradient">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    separator=","      // Format: 10,000+
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span> // Placeholder before animation
                )}
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-foreground mt-1">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
