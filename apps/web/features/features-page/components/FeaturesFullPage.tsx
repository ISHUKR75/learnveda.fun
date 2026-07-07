/**
 * @file features/features-page/components/FeaturesFullPage.tsx
 * @description Full platform features page for /features route
 *
 * Shows all LearnVeda platform capabilities:
 * 1. Hero section with headline + feature count
 * 2. Core feature grid (AI Tutor, Simulations, Live Battles, etc.)
 * 3. Curriculum coverage (Class 9-12, Engineering, CS, Programming)
 * 4. Tools grid (Compiler, Flashcards, AI Chat, etc.)
 * 5. Community features
 * 6. CTA to start
 *
 * Used in: app/(marketing)/features/page.tsx
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, BookOpen, Code2, Trophy, Users,
  Brain, FlaskConical, BarChart3, Calendar, Globe,
  Shield, Star, ArrowRight, CheckCircle2, Cpu,
  MessageSquare, Flame, Target, Clock, GraduationCap,
  Terminal, Layout, Layers, Heart,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Main feature cards ─────────────────────────────────────────────────── */
const CORE_FEATURES = [
  {
    icon: Sparkles,   color:"text-brand-500",   bg:"bg-brand-500/10",
    title:"AI Tutor",
    desc: "Chat with an AI tutor that explains concepts like a patient teacher. Asks guiding questions. Explains in Hindi or English. Covers every subject.",
    badges: ["GPT-4o Powered","Hindi + English","Subject-specific modes"],
    href: "/ai-tutor",
  },
  {
    icon: FlaskConical, color:"text-purple-500", bg:"bg-purple-500/10",
    title:"140+ Simulations",
    desc: "Interactive physics, chemistry, biology, DSA, OS, networks, and database simulations. See concepts come alive instead of reading about them.",
    badges: ["Physics","Chemistry","DSA","OS","Networks"],
    href: "/simulations",
  },
  {
    icon: Zap,        color:"text-orange-500",  bg:"bg-orange-500/10",
    title:"Live Battles",
    desc: "1v1 real-time MCQ battles against other students. 10 questions, 15 seconds each. Elo-based matchmaking. +100 XP for winning.",
    badges: ["Real-time","Elo matchmaking","7+ subjects"],
    href: "/live-battles",
  },
  {
    icon: Code2,      color:"text-green-500",   bg:"bg-green-500/10",
    title:"Code Compiler",
    desc: "Run code in 14 languages directly in the browser. No installation required. Python, Java, C++, JavaScript, Rust, Go, and more.",
    badges: ["14 languages","Judge0 engine","In-browser"],
    href: "/compiler",
  },
  {
    icon: BarChart3,  color:"text-blue-500",    bg:"bg-blue-500/10",
    title:"Student Dashboard",
    desc: "Track XP, daily streaks, chapter completions, battle wins, and achievements. 52-week activity heatmap. Personalized next-step recommendations.",
    badges: ["XP & levels","Streak tracking","AI recommendations"],
    href: "/dashboard",
  },
  {
    icon: Trophy,     color:"text-amber-500",   bg:"bg-amber-500/10",
    title:"Test Center",
    desc: "Full-length CBSE board simulations, JEE/NEET mock tests, company placement tests. Timed. With detailed solutions and performance analysis.",
    badges: ["CBSE","JEE/NEET","Company tests"],
    href: "/test-center",
  },
  {
    icon: Users,      color:"text-teal-500",    bg:"bg-teal-500/10",
    title:"Community Forum",
    desc: "Ask questions, share resources, join study groups. 10,000+ students, mentor-verified answers, and weekly Q&A sessions with educators.",
    badges: ["Q&A","Study groups","Mentor verified"],
    href: "/community",
  },
  {
    icon: Target,     color:"text-red-500",     bg:"bg-red-500/10",
    title:"Practice Hub",
    desc: "10,000+ MCQs, previous year papers (2015–2025), flashcards, daily challenges, and a coding playground. Track your accuracy and improvement.",
    badges: ["10K+ MCQs","PYQs 2015–25","Daily challenges"],
    href: "/practice",
  },
  {
    icon: Globe,      color:"text-cyan-500",    bg:"bg-cyan-500/10",
    title:"11 Indian Languages",
    desc: "All content available in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati, Malayalam, Odia, Punjabi, and English.",
    badges: ["Hindi","Tamil","Telugu","+ 8 more"],
    href: "/learn",
  },
];

/* ─── Curriculum coverage numbers ────────────────────────────────────────── */
const CURRICULUM_STATS = [
  { value:"4",    label:"CBSE Classes (9–12)",       emoji:"📚" },
  { value:"14",   label:"Programming Languages",      emoji:"💻" },
  { value:"9",    label:"Engineering Branches",        emoji:"🏗" },
  { value:"9",    label:"Core CS Subjects",            emoji:"🧠" },
  { value:"140+", label:"Interactive Simulations",     emoji:"⚗️" },
  { value:"10K+", label:"Practice Questions",          emoji:"❓" },
  { value:"500+", label:"Chapters & Lessons",          emoji:"📖" },
  { value:"50+",  label:"Events per Month",            emoji:"📅" },
];

/* ─── Other tools ────────────────────────────────────────────────────────── */
const OTHER_TOOLS = [
  { icon: Layout,     title:"Flashcards",       href:"/flashcards",    desc:"Create and review flashcard decks. Spaced repetition built in." },
  { icon: Calendar,   title:"Study Calendar",   href:"/dashboard",     desc:"Plan and schedule your study sessions. Sync with daily goals." },
  { icon: Flame,      title:"Streak System",    href:"/dashboard",     desc:"Daily streaks keep you accountable. XP multipliers for long streaks." },
  { icon: Brain,      title:"Leaderboard",      href:"/leaderboard",   desc:"See where you stand among all students on the platform globally." },
  { icon: Terminal,   title:"Whiteboard",       href:"/whiteboard",    desc:"Digital math whiteboard for scratch work and visual problem solving." },
  { icon: Clock,      title:"Exam Scheduler",   href:"/schedule",      desc:"Mark your board exam date. Get a reverse-engineered study plan." },
  { icon: Layers,     title:"Cheat Sheets",     href:"/cheatsheets",   desc:"Quick-reference formula and concept sheets for every subject." },
  { icon: Shield,     title:"Offline Mode",     href:"/learn",         desc:"Download lessons for offline study. Works on slow connections too." },
];

/* ─── Animation ──────────────────────────────────────────────────────────── */
const fadeUp = (i: number) => ({
  initial: { opacity: 0.01, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: i * 0.07 },
});

/* ─── FeaturesFullPage Component ─────────────────────────────────────────── */
export function FeaturesFullPage() {
  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">

        {/* ── Hero ────────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.div {...fadeUp(0)}>
            <Badge variant="outline" className="gap-1.5 mb-4 border-brand-500/30 text-brand-600">
              <Sparkles className="h-3.5 w-3.5" /> 140+ Features Built for Indian Students
            </Badge>
          </motion.div>
          <motion.h1 {...fadeUp(1)} className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-3xl mx-auto leading-tight">
            Every tool you need from{" "}
            <span className="bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
              Class 9 to Placement
            </span>
          </motion.h1>
          <motion.p {...fadeUp(2)} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            One platform. AI Tutor, 140+ simulations, live battles, 10K+ practice questions,
            a code compiler, community forum, and structured day-plans for every subject.
          </motion.p>
          <motion.div {...fadeUp(3)} className="flex flex-wrap gap-3 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="gap-1.5">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
          </motion.div>
        </div>

        {/* ── Core Features Grid ──────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Core Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_FEATURES.map((feature, i) => (
              <motion.div key={feature.title} {...fadeUp(i)}>
                <Link href={feature.href}>
                  <div className="h-full rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md hover:border-brand-500/30 transition-all group cursor-pointer flex flex-col">
                    {/* Icon */}
                    <div className={`inline-flex p-2.5 rounded-xl ${feature.bg} ${feature.color} mb-3 w-fit`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    {/* Title + desc */}
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-brand-500 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{feature.desc}</p>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {feature.badges.map(b => (
                        <Badge key={b} variant="outline" className="text-xs h-5">{b}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Curriculum Coverage ─────────────────────────────────── */}
        <section className="mb-16">
          <div className="rounded-2xl border bg-brand-500/5 border-brand-500/20 p-8">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6">Curriculum Coverage</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {CURRICULUM_STATS.map((stat, i) => (
                <motion.div key={stat.label} {...fadeUp(i)} className="text-center">
                  <div className="text-3xl mb-1">{stat.emoji}</div>
                  <p className="text-3xl font-bold text-brand-500">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Other Tools ─────────────────────────────────────────── */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">More Learning Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OTHER_TOOLS.map((tool, i) => (
              <motion.div key={tool.title} {...fadeUp(i)}>
                <Link href={tool.href}>
                  <div className="h-full rounded-2xl border bg-card p-4 hover:shadow-md hover:border-brand-500/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500">
                        <tool.icon className="h-4 w-4" />
                      </div>
                      <p className="font-semibold text-sm text-foreground group-hover:text-brand-500 transition-colors">{tool.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── All-inclusive checklist ─────────────────────────────── */}
        <section className="mb-14">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6">Everything Included in Pro</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Full Class 9–12 CBSE curriculum",
                "All 9 Engineering branches (8 semesters)",
                "14 programming language day-plans",
                "9 Core CS subjects",
                "140+ interactive simulations",
                "Unlimited live battles",
                "10,000+ MCQs + PYQs",
                "AI Tutor (unlimited messages)",
                "Code compiler (14 languages)",
                "Community forum + mentor access",
                "Study schedule + calendar",
                "Achievement badges + certificates",
                "Progress tracking + analytics",
                "Offline mode",
                "11 Indian language support",
              ].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────── */}
        <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 text-white">
          <h3 className="text-2xl font-bold mb-2">Start your learning journey today</h3>
          <p className="text-white/80 mb-6">Free forever. No credit card required. Upgrade anytime.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-white/90 gap-1.5">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                Explore Content
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
