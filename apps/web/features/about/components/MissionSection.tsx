/**
 * @file features/about/components/MissionSection.tsx
 * @description Mission & Vision section for the About page
 *
 * Two-column layout:
 *  Left — Mission statement with explanation
 *  Right — Vision for the future + founding story timeline
 */

"use client"; // Framer Motion requires client-side rendering

import React from "react";
import { motion } from "framer-motion"; // Entry animations
import { Target, Eye, Rocket, Heart } from "lucide-react"; // Section icons

/* ─── Mission pillars data ───────────────────────────────────────────────── */
const PILLARS = [
  {
    icon:  Target,
    title: "Our Mission",
    color: "text-blue-500 bg-blue-500/10",
    text:  "To make world-class education accessible to every student in India — from Class 9 to Graduation — using AI, interactive simulations, and structured day-wise learning plans.",
  },
  {
    icon:  Eye,
    title: "Our Vision",
    color: "text-purple-500 bg-purple-500/10",
    text:  "A future where a student in rural India has the same quality of education as a student in any metropolitan city — powered by technology, driven by passion.",
  },
  {
    icon:  Rocket,
    title: "Our Approach",
    color: "text-brand-500 bg-brand-500/10",
    text:  "We combine the rigour of NCERT/CBSE curriculum with the engagement of gamification, the depth of interactive simulations, and the personalization of AI tutoring.",
  },
  {
    icon:  Heart,
    title: "Our Values",
    color: "text-rose-500 bg-rose-500/10",
    text:  "Quality over quantity. Every chapter, simulation, and quiz is crafted with care. We would rather have 100 exceptional lessons than 10,000 mediocre ones.",
  },
];

/* ─── MissionSection Component ───────────────────────────────────────────── */
export function MissionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why LearnVeda Exists
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            We started LearnVeda because we experienced firsthand how unequal educational
            opportunities are across India. Here&apos;s what drives us.
          </p>
        </div>

        {/* Mission pillars grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}    // Start invisible slightly below
              whileInView={{ opacity: 1, y: 0 }} // Animate into view on scroll
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${pillar.color}`}>
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
              </div>
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{pillar.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Founding story */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">The Story</h3>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              LearnVeda was founded by students who understood a hard truth: great coaching
              was expensive, and the gap between city students and small-town students was
              widening every year.
            </p>
            <p>
              We asked ourselves: <em>&quot;What if every student had access to the best
              teacher for every subject — available 24/7, for free?&quot;</em>
            </p>
            <p>
              The answer was LearnVeda — a platform that combines structured CBSE and engineering
              curriculum with interactive simulations, an AI tutor that never sleeps, and a
              gamified learning environment that makes studying addictive in the best way.
            </p>
            <p>
              Today, students from 22 countries use LearnVeda to prepare for board exams,
              engineering colleges, and software developer interviews. We are just getting started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
