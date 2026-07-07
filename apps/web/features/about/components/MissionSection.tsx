/**
 * @file features/about/components/MissionSection.tsx
 * @description Mission, vision, and founding story for the About page
 *
 * Tells the story of why LearnVeda was built and what it stands for.
 * Used in: app/(marketing)/about/page.tsx
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Lightbulb } from "lucide-react";

/* ─── Mission pillars ────────────────────────────────────────────────────── */
const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    color: "text-brand-500",
    bg: "bg-brand-500/10",
    content:
      "Make world-class CBSE, engineering, and CS education accessible to every Indian student — " +
      "regardless of geography, school quality, or economic background. One structured platform. " +
      "No coaching institute required.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    content:
      "A future where any student in Bhilai has the same learning resources as one in Delhi, " +
      "and where a Class 9 student can see their complete path to placement or board excellence " +
      "from a single screen.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    content:
      "We build structured day-plans, not video dumps. We use simulations instead of diagrams. " +
      "We gamify learning with battles, streaks, and XP. And we give every student an AI tutor " +
      "that explains like a patient teacher — never a search engine.",
  },
];

/* ─── MissionSection Component ───────────────────────────────────────────── */
export function MissionSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Founding story */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why We Built This</h2>
          <p className="text-muted-foreground leading-relaxed">
            LearnVeda began with one observation: India produces 1.5 million engineering graduates
            a year, but most of them graduate without ever seeing how OS scheduling works, what a
            B-tree index looks like, or how TCP three-way handshakes happen — until they're staring
            at a whiteboard in an interview. The content existed. The structured path didn't. We built the path.
          </p>
        </div>

        {/* Mission, Vision, Approach cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0.01, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className={`inline-flex p-2.5 rounded-xl ${pillar.bg} ${pillar.color} mb-4`}>
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
