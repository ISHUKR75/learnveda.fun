/**
 * @file features/about/components/ValuesSection.tsx
 * @description Core values section for the About page
 * Eight values that guide how LearnVeda operates and builds
 */

"use client"; // Client component for animations

import React from "react";                       // React core
import { motion } from "framer-motion";          // Animations
import { Shield, Heart, Users, Zap, Globe, BookOpen, Award, Lightbulb } from "lucide-react"; // Icons

/* ─── Values Data ────────────────────────────────────────────────────────── */
const values = [
  { icon: <Shield    className="h-5 w-5" />, bg: "bg-blue-500/10",   text: "text-blue-500",   title: "Student Safety First",  desc: "Zero ads, zero distractions, full parental controls, and a strictly moderated community." },
  { icon: <Heart     className="h-5 w-5" />, bg: "bg-red-500/10",    text: "text-red-500",    title: "Education as a Right",  desc: "Quality education should not be a privilege. Our free plan gives every student access to world-class content." },
  { icon: <Users     className="h-5 w-5" />, bg: "bg-green-500/10",  text: "text-green-500",  title: "Community-Driven",      desc: "We build with and for students. Every feature is shaped by real feedback from learners across India." },
  { icon: <Zap       className="h-5 w-5" />, bg: "bg-yellow-500/10", text: "text-yellow-500", title: "Continuous Improvement", desc: "We ship updates weekly. The platform gets better every day based on student outcomes and usage data." },
  { icon: <Globe     className="h-5 w-5" />, bg: "bg-purple-500/10", text: "text-purple-500", title: "India-First, World-Class",desc: "Built specifically for Indian curricula but with global quality standards — CBSE, IIT-JEE, GATE ready." },
  { icon: <BookOpen  className="h-5 w-5" />, bg: "bg-cyan-500/10",   text: "text-cyan-500",   title: "Curriculum Accuracy",   desc: "Every piece of content is reviewed by subject matter experts and aligned to official NCERT and university syllabi." },
  { icon: <Award     className="h-5 w-5" />, bg: "bg-orange-500/10", text: "text-orange-500", title: "Achievement & Growth",   desc: "Learning should feel rewarding. XP, streaks, badges, and leaderboards make progress visible and motivating." },
  { icon: <Lightbulb className="h-5 w-5" />, bg: "bg-pink-500/10",   text: "text-pink-500",   title: "Deep Understanding",    desc: "We do not teach for exams alone. Simulations, visualizations, and AI tutoring build genuine conceptual clarity." },
];

/* ─── Values Section Component ───────────────────────────────────────────── */
export function ValuesSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            What We Stand For
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Eight principles that guide every decision we make at LearnVeda.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border bg-background p-5"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${v.bg} ${v.text} mb-3`}>
                {v.icon}
              </div>
              <h3 className="font-semibold mb-1.5">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
