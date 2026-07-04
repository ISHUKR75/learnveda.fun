/**
 * @file features/home/components/HeroSection.tsx
 * @description Hero section for LearnVeda homepage
 * Above-the-fold section with headline, subheadline, CTAs, and animated background
 * Uses Framer Motion for entry animations and a gradient mesh background
 */

"use client"; // Needs client-side for animations and scroll effects

import React from "react";                        // React core
import Link from "next/link";                     // Next.js client-side navigation
import { motion } from "framer-motion";           // Smooth entry animations
import {
  ArrowRight, Play, Sparkles, Star, Zap, BookOpen, Code2,
} from "lucide-react";                           // Icons
import { Button } from "@/components/ui/button"; // Reusable button component
import { Badge }  from "@/components/ui/badge";  // Label badges

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},                               // Container starts hidden
  visible: { transition: { staggerChildren: 0.12 } }, // Stagger child animations
};

const itemVariants = {
  hidden:  { opacity: 0.01, y: 24 },       // Near-invisible + slightly below — avoids blank SSR paint
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Floating Feature Pills ─────────────────────────────────────────────── */
// Small floating cards that appear around the hero section
const floatingPills = [
  { text: "140+ Simulations", icon: <Zap className="h-3 w-3" />,      delay: 0.3,  x: "-10%", y: "20%" },
  { text: "AI Tutor 24/7",    icon: <Sparkles className="h-3 w-3" />, delay: 0.5,  x: "85%",  y: "15%" },
  { text: "Live Battles",     icon: <Star className="h-3 w-3" />,     delay: 0.7,  x: "80%",  y: "70%" },
  { text: "10K+ Students",    icon: <BookOpen className="h-3 w-3" />, delay: 0.9,  x: "-8%",  y: "65%" },
];

/* ─── Hero Section Component ─────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Gradient Background ──────────────────────────────────────── */}
      {/* Radial gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/5 via-background to-purple-950/5 dark:from-brand-950/20 dark:to-purple-950/20" />

      {/* Animated gradient orbs — visual depth effect */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow [animation-delay:1s]" />
      <div className="absolute top-3/4 left-1/2 h-64 w-64 rounded-full bg-cyan-500/5 blur-2xl animate-float" />

      {/* Grid dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.border)_1px,transparent_0)] [background-size:40px_40px] opacity-30" />

      {/* ── Floating Feature Pills ────────────────────────────────────── */}
      {floatingPills.map((pill) => (
        <motion.div
          key={pill.text}
          initial={{ opacity: 0, scale: 0.8 }}       // Start invisible + small
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: pill.delay, duration: 0.5 }}
          className="absolute hidden lg:flex items-center gap-1.5 rounded-full border bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium shadow-lg text-foreground"
          style={{ left: pill.x, top: pill.y }}       // Position around the hero
        >
          <span className="text-brand-500">{pill.icon}</span>
          {pill.text}
        </motion.div>
      ))}

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <div className="relative container px-4 md:px-6 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl mx-auto"
        >
          {/* ── Announcement Badge ─────────────────────────────────── */}
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="gap-2 px-4 py-1.5 text-sm rounded-full border-brand-500/30 bg-brand-500/5 text-brand-600 dark:text-brand-400">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              India&apos;s #1 AI-Powered EdTech Platform
              <ArrowRight className="h-3 w-3" />
            </Badge>
          </motion.div>

          {/* ── Main Headline ─────────────────────────────────────── */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
          >
            Learn Smarter,{" "}
            <span className="text-gradient">
              From Class 9
            </span>
            <br />
            to{" "}
            <span className="text-gradient">
              Graduation
            </span>
          </motion.h1>

          {/* ── Subheadline ───────────────────────────────────────── */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            One platform for complete education — CBSE Class 9–12, Engineering,
            Programming, AI Tutor, 140+ Simulations, Live Battles, and a global
            Leaderboard. <strong className="text-foreground">Free forever</strong> for students.
          </motion.p>

          {/* ── CTA Buttons ──────────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center"
          >
            {/* Primary CTA — sign up */}
            <Button size="xl" variant="gradient" asChild className="w-full sm:w-auto shadow-lg shadow-brand-500/20">
              <Link href="/sign-up">
                Start Learning Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            {/* Secondary CTA — see demo */}
            <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/explore">
                <Play className="h-4 w-4 fill-current" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* ── Trust Indicators ──────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            {[
              "✅ No credit card required",
              "✅ Free forever plan",
              "✅ 10,000+ students",
              "✅ CBSE & Engineering aligned",
            ].map((item) => (
              <span key={item} className="whitespace-nowrap">{item}</span>
            ))}
          </motion.div>

          {/* ── Platform Preview Cards ────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mt-4"
          >
            {[
              { label: "Class 9–12",    icon: <BookOpen className="h-5 w-5" />, color: "from-blue-500/10 to-cyan-500/10",   border: "border-blue-500/20"   },
              { label: "Engineering",   icon: <Zap      className="h-5 w-5" />, color: "from-orange-500/10 to-red-500/10",  border: "border-orange-500/20" },
              { label: "Programming",   icon: <Code2    className="h-5 w-5" />, color: "from-green-500/10 to-teal-500/10",  border: "border-green-500/20"  },
              { label: "AI Tutor",      icon: <Sparkles className="h-5 w-5" />, color: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-2 rounded-xl border ${item.border} bg-gradient-to-br ${item.color} p-4 backdrop-blur-sm`}
              >
                <div className="text-brand-500">{item.icon}</div>
                <span className="text-xs font-medium text-center">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom fade to next section ──────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
