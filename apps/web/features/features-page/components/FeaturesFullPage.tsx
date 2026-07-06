/**
 * @file features/features-page/components/FeaturesFullPage.tsx
 * @description Full features showcase page for LearnVeda
 *
 * Shows all platform features in detail:
 *  - AI Tutor capabilities
 *  - Interactive Simulations (140+)
 *  - Live Coding Battles
 *  - CBSE & Engineering curriculum
 *  - Code compiler (16 languages)
 *  - Community & mentorship
 *  - Analytics & progress tracking
 */

"use client"; // Client component for motion animations

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain, Zap, FlaskConical, BookOpen, Code2, Users,
  BarChart3, Trophy, Globe2, Shield, Sparkles, Monitor,
  GraduationCap, ChevronRight, CheckCircle2, Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Feature Category Data ──────────────────────────────────────────────── */
const FEATURE_CATEGORIES = [
  {
    id:    "ai",
    icon:  Brain,
    title: "AI Tutor",
    color: "from-brand-500 to-purple-500",
    bg:    "bg-brand-500/10 text-brand-500",
    tagline: "Your personal teacher, available 24/7",
    description: "LearnVeda's AI tutor is powered by GPT-4 and Gemini. Ask any question, get detailed step-by-step explanations, and receive personalized study recommendations based on your weaknesses.",
    capabilities: [
      "Answers questions from any chapter in seconds",
      "Generates custom practice problems at your level",
      "Identifies weak areas and recommends targeted content",
      "Explains concepts in English and Hindi",
      "Provides exam-style solved examples",
      "Available 24/7 — no waiting, no scheduling",
    ],
    href: "/ai-tutor",
    ctaLabel: "Try AI Tutor",
  },
  {
    id:    "simulations",
    icon:  FlaskConical,
    title: "140+ Simulations",
    color: "from-blue-500 to-cyan-500",
    bg:    "bg-blue-500/10 text-blue-500",
    tagline: "See concepts come to life",
    description: "Physics simulations, chemistry lab experiments, DSA visualizers, and more. Every simulation is interactive — you control the variables and watch the results in real time.",
    capabilities: [
      "Newton's Laws of Motion (interactive)",
      "Pendulum, projectile, wave interference",
      "Organic chemistry reaction simulator",
      "Cell division and mitosis animation",
      "Sorting algorithms (bubble, merge, quick, heap)",
      "Binary tree and graph traversal visualizer",
      "Digital logic circuit simulator",
      "CPU, cache, and memory simulator",
    ],
    href: "/simulations",
    ctaLabel: "Explore Simulations",
  },
  {
    id:    "battles",
    icon:  Zap,
    title: "Live Coding Battles",
    color: "from-red-500 to-orange-500",
    bg:    "bg-red-500/10 text-red-500",
    tagline: "Compete. Learn. Level up.",
    description: "Challenge other students to real-time 1v1 coding and quiz battles. Earn XP, climb the leaderboard, and win prizes. Elo-based matchmaking ensures fair competition.",
    capabilities: [
      "Real-time 1v1 battles via Socket.IO",
      "10 questions, 15 seconds each",
      "Elo-based matchmaking (±3 levels)",
      "Subjects: Math, Science, DSA, Coding",
      "Earn XP and Stars for wins",
      "Weekly tournament with ₹5,000 prize pool",
      "Anti-cheat detection active",
      "Spectator mode (coming soon)",
    ],
    href: "/live-battles",
    ctaLabel: "Start a Battle",
  },
  {
    id:    "curriculum",
    icon:  BookOpen,
    title: "CBSE & Engineering",
    color: "from-green-500 to-teal-500",
    bg:    "bg-green-500/10 text-green-500",
    tagline: "Complete curriculum, zero compromises",
    description: "NCERT-aligned chapters for Class 9–12 with every subject covered. Engineering curriculum covers 8 branches across 8 semesters. All content reviewed by subject matter experts.",
    capabilities: [
      "All CBSE Class 9–12 subjects (NCERT aligned)",
      "Physics, Chemistry, Biology, Math, English, Hindi, Social Science",
      "Engineering: CSE, ECE, EEE, Civil, Mechanical",
      "Day-wise structured plans for 12+ programming languages",
      "Core CS: DSA, OS, DBMS, CN, System Design",
      "Previous year questions (PYQs) bank",
      "CBSE board exam mock tests",
      "JEE and NEET preparation content",
    ],
    href: "/learn",
    ctaLabel: "Browse Curriculum",
  },
  {
    id:    "compiler",
    icon:  Code2,
    title: "Online Code Compiler",
    color: "from-purple-500 to-pink-500",
    bg:    "bg-purple-500/10 text-purple-500",
    tagline: "Code in 16 languages, right in your browser",
    description: "A full-featured Monaco Editor-based code compiler. Write, run, and debug code without installing anything. Supports 16 programming languages with syntax highlighting and auto-complete.",
    capabilities: [
      "16 programming languages supported",
      "Monaco Editor (same as VS Code)",
      "Syntax highlighting and IntelliSense",
      "Standard input/output support",
      "Execution time and memory tracking",
      "Code history saved automatically",
      "Share code snippets with a link",
      "Dark and light themes",
    ],
    href: "/compiler",
    ctaLabel: "Open Compiler",
  },
  {
    id:    "community",
    icon:  Users,
    title: "Community & Mentorship",
    color: "from-orange-500 to-amber-500",
    bg:    "bg-orange-500/10 text-orange-500",
    tagline: "Learn better together",
    description: "Ask questions, share resources, and connect with students nationwide. Our community is moderated to keep it safe, helpful, and free from spam.",
    capabilities: [
      "Q&A forum for every subject",
      "Study groups by class and subject",
      "Peer mentorship matching",
      "Resource sharing (notes, PDFs)",
      "Weekly live discussion sessions",
      "Expert answers from teachers",
      "Community leaderboard",
      "Safe and moderated environment",
    ],
    href: "/community",
    ctaLabel: "Join Community",
  },
  {
    id:    "analytics",
    icon:  BarChart3,
    title: "Progress Analytics",
    color: "from-cyan-500 to-blue-500",
    bg:    "bg-cyan-500/10 text-cyan-500",
    tagline: "Know exactly where you stand",
    description: "Detailed analytics on your learning journey. See which subjects you're strongest in, track your streak, and get personalized recommendations for what to study next.",
    capabilities: [
      "52-week learning activity heatmap",
      "Subject-wise progress breakdown",
      "Time spent per chapter tracking",
      "Quiz and test score history",
      "XP and level progression chart",
      "Battle win rate statistics",
      "Streak calendar",
      "Downloadable progress reports",
    ],
    href: "/dashboard/analytics",
    ctaLabel: "View Analytics",
  },
  {
    id:    "seo",
    icon:  Globe2,
    title: "22-Language Support",
    color: "from-teal-500 to-green-500",
    bg:    "bg-teal-500/10 text-teal-500",
    tagline: "Learn in your language",
    description: "LearnVeda supports 22 Indian and international languages. Switch language instantly from any page. Content is available in English and Hindi, with more languages being added.",
    capabilities: [
      "UI available in 22 languages",
      "English and Hindi content fully available",
      "Auto-detect browser language preference",
      "Language switcher on every page",
      "Right-to-left (RTL) language support",
      "AI Tutor responds in your chosen language",
    ],
    href: "/features",
    ctaLabel: "Learn More",
  },
];

/* ─── FeaturesFullPage Component ─────────────────────────────────────────── */
export function FeaturesFullPage() {
  const [activeFeature, setActiveFeature] = useState(FEATURE_CATEGORIES[0].id);

  // Active feature details
  const active = FEATURE_CATEGORIES.find((f) => f.id === activeFeature) ?? FEATURE_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="py-20 text-center border-b bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-4 text-sm">Platform Features</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
              Excel in Learning
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered tutoring to interactive simulations and live battles —
            LearnVeda combines every tool a student needs into one platform.
          </p>
        </div>
      </section>

      {/* ── Feature Detail Explorer ──────────────────────────────────────── */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left: Feature selector */}
            <div className="space-y-2">
              {FEATURE_CATEGORIES.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                    activeFeature === feature.id
                      ? "bg-brand-500/10 border border-brand-500/30 text-brand-500"
                      : "hover:bg-muted border border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${feature.bg}`}>
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-sm">{feature.title}</span>
                  {activeFeature === feature.id && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {/* Right: Feature details */}
            <div className="lg:col-span-2">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border bg-card p-8 shadow-sm h-full"
              >
                {/* Feature header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${active.bg}`}>
                    <active.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{active.title}</h2>
                    <p className="text-muted-foreground text-sm">{active.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8">{active.description}</p>

                {/* Capabilities list */}
                <div className="grid sm:grid-cols-2 gap-2 mb-8">
                  {active.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{cap}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3">
                  <Link href={active.href}>
                    <Button className="gap-2">
                      <Play className="h-4 w-4" />
                      {active.ctaLabel}
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline">View Pricing</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All features grid ────────────────────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Built for Indian Students</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every feature is designed with the Indian student&apos;s journey in mind
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield,       title: "No Ads, Ever",          desc: "Zero ads, zero distractions. Pure learning." },
              { icon: Monitor,      title: "Works Offline",          desc: "Download content for studying without internet." },
              { icon: GraduationCap,title: "Expert Content",         desc: "Reviewed by teachers from top institutions." },
              { icon: Trophy,       title: "Gamified Learning",      desc: "XP, levels, streaks, and battles keep you engaged." },
              { icon: Sparkles,     title: "AI-Powered",             desc: "GPT-4 and Gemini power the AI tutor and search." },
              { icon: Globe2,       title: "22 Languages",           desc: "Learn in English, Hindi, or 20 other languages." },
              { icon: BarChart3,    title: "Detailed Analytics",     desc: "Know your strengths and weaknesses precisely." },
              { icon: Users,        title: "10K+ Students",          desc: "Join a growing community of motivated learners." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border bg-card p-5 shadow-sm"
              >
                <item.icon className="h-6 w-6 text-brand-500 mb-3" />
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join 10,400+ students already using LearnVeda. Free forever — no credit card required.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Create Free Account
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">See Pro Plans</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
