/**
 * @file features/about/components/ValuesSection.tsx
 * @description Core values section for the About page
 *
 * Displays LearnVeda's 6 core values in a responsive grid.
 * Each value has an icon, title, and descriptive paragraph.
 */

"use client"; // Framer Motion entry animations require client rendering

import React from "react";
import { motion } from "framer-motion";
import {
  Scale, Lightbulb, HeartHandshake, Zap,
  ShieldCheck, Globe2,
} from "lucide-react"; // Icons for each value

/* ─── Values Data ────────────────────────────────────────────────────────── */
const VALUES = [
  {
    icon:  Scale,
    title: "Equity First",
    color: "bg-blue-500/10 text-blue-500",
    desc:  "Every feature we build is designed to close the educational gap between well-resourced and under-resourced students.",
  },
  {
    icon:  Lightbulb,
    title: "Quality of Learning",
    color: "bg-yellow-500/10 text-yellow-500",
    desc:  "We obsess over clarity and correctness. Every simulation is scientifically accurate. Every chapter is reviewed by subject matter experts.",
  },
  {
    icon:  HeartHandshake,
    title: "Student First",
    color: "bg-rose-500/10 text-rose-500",
    desc:  "Every product decision is made by asking: does this help the student learn better? Not: does this generate more revenue?",
  },
  {
    icon:  Zap,
    title: "Speed to Value",
    color: "bg-orange-500/10 text-orange-500",
    desc:  "Students shouldn't wait months to benefit. We ship fast, iterate faster, and always improve based on real usage data.",
  },
  {
    icon:  ShieldCheck,
    title: "Safe & Honest",
    color: "bg-green-500/10 text-green-500",
    desc:  "No ads. No manipulative design patterns. No dark UX. We earn trust by being transparent and honest with every user.",
  },
  {
    icon:  Globe2,
    title: "Open Knowledge",
    color: "bg-brand-500/10 text-brand-500",
    desc:  "Knowledge is a public good. Our free tier ensures that cost is never a barrier to quality education on LearnVeda.",
  },
];

/* ─── ValuesSection Component ────────────────────────────────────────────── */
export function ValuesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Core Values</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            These six values guide every decision we make — from content quality to product design.
          </p>
        </div>

        {/* Values grid — 2 columns on mobile, 3 on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {VALUES.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}      // Start invisible slightly below
              whileInView={{ opacity: 1, y: 0 }}   // Animate into view
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Value icon */}
              <div className={`inline-flex p-3 rounded-xl mb-4 ${val.color}`}>
                <val.icon className="h-6 w-6" />
              </div>
              {/* Value title */}
              <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
              {/* Value description */}
              <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
