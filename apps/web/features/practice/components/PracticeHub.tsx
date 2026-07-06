/**
 * @file features/practice/components/PracticeHub.tsx
 * @description Full-featured Practice Hub for LearnVeda
 *
 * Sections:
 *  1. Hero           — headline, stats row, search
 *  2. Practice Modes — 8 practice card types (quiz, mock, code, PYQ, daily, timed, flash, assignments)
 *  3. Subject Quick-Access — shortcut grid by CBSE class / CS subject
 *  4. Today's Challenge — single daily problem highlight
 *  5. Recent Sessions — last 3 practice sessions (demo data)
 *  6. Progress Stats  — accuracy, questions attempted, streaks
 *
 * Demo mode: all data is static; real API calls replace it when MongoDB is live.
 */

"use client"; // Client component — interactive tabs, animations

import React, { useState } from "react";                   // React core
import Link  from "next/link";                             // Client-side navigation
import { motion } from "framer-motion";                    // Entry animations
import {
  BookOpen, Code2, FileText, Target, Clock,
  Brain, Zap, ArrowRight, CheckCircle, TrendingUp,
  Flame, Star, Filter, Search, Award, BarChart3,
  CircleDot, Play, AlertCircle, ChevronRight,
} from "lucide-react";                                     // Icons
import { Badge }  from "@/components/ui/badge";            // Label badge
import { Button } from "@/components/ui/button";           // CTA button
import { Input }  from "@/components/ui/input";            // Search input
import { Progress } from "@/components/ui/progress";       // XP progress bar

/* ══════════════════════════════════════════════════════════════════════════ */
/*  STATIC DATA                                                              */
/* ══════════════════════════════════════════════════════════════════════════ */

/** 8 practice mode cards */
const PRACTICE_MODES = [
  {
    id: "quiz",
    emoji: "🧠",
    title: "Subject Quizzes",
    desc: "MCQs for every chapter across Class 9–12, Engineering, and Core CS.",
    badge: "10,000+ Questions",
    color: "from-blue-500 to-cyan-500",
    href: "/practice/quiz",
    stats: { label: "Avg. Score", value: "78%" },
  },
  {
    id: "mock",
    emoji: "📋",
    title: "Mock Tests",
    desc: "Full-length CBSE, JEE, NEET, and placement mock tests with auto-grading.",
    badge: "Timed Exams",
    color: "from-purple-500 to-pink-500",
    href: "/practice/mock",
    stats: { label: "Tests Available", value: "50+" },
  },
  {
    id: "code",
    emoji: "💻",
    title: "Coding Playground",
    desc: "In-browser IDE for 13 languages — solve problems and run test cases.",
    badge: "13 Languages",
    color: "from-green-500 to-teal-500",
    href: "/compiler",
    stats: { label: "Problems", value: "200+" },
  },
  {
    id: "pyq",
    emoji: "📚",
    title: "Previous Year Papers",
    desc: "CBSE board, JEE Main, NEET, and GATE previous year questions with solutions.",
    badge: "PYQ Bank",
    color: "from-orange-500 to-red-500",
    href: "/practice/pyq",
    stats: { label: "Years Covered", value: "2010–2024" },
  },
  {
    id: "daily",
    emoji: "🎯",
    title: "Daily Challenge",
    desc: "One new problem every day — maintain your streak and earn bonus XP.",
    badge: "Streak Builder",
    color: "from-yellow-500 to-orange-500",
    href: "/practice/daily",
    stats: { label: "XP Bonus", value: "3× Today" },
  },
  {
    id: "timed",
    emoji: "⏱️",
    title: "Timed Drills",
    desc: "Speed-practice under time pressure — build exam confidence and accuracy.",
    badge: "Pressure Training",
    color: "from-cyan-500 to-blue-500",
    href: "/practice/timed",
    stats: { label: "Best Time", value: "4.2s/q" },
  },
  {
    id: "flash",
    emoji: "🃏",
    title: "Flashcards",
    desc: "Spaced repetition flashcards for formulas, definitions, and key concepts.",
    badge: "Spaced Repetition",
    color: "from-pink-500 to-rose-500",
    href: "/practice/flashcards",
    stats: { label: "Cards", value: "2,000+" },
  },
  {
    id: "assign",
    emoji: "✅",
    title: "Assignment Tracker",
    desc: "Create, share, and track custom assignments with progress analytics.",
    badge: "Self-Paced",
    color: "from-indigo-500 to-violet-500",
    href: "/practice/assignments",
    stats: { label: "Templates", value: "30+" },
  },
];

/** CBSE quick-access by class */
const CBSE_SHORTCUTS = [
  { label: "Class 9 Maths",     href: "/learn/class-9",  tag: "15 Chapters" },
  { label: "Class 9 Science",   href: "/learn/class-9",  tag: "14 Chapters" },
  { label: "Class 10 Maths",    href: "/learn/class-10", tag: "15 Chapters" },
  { label: "Class 10 Science",  href: "/learn/class-10", tag: "16 Chapters" },
  { label: "Class 11 Physics",  href: "/learn/class-11", tag: "14 Chapters" },
  { label: "Class 12 Maths",    href: "/learn/class-12", tag: "13 Chapters" },
  { label: "DSA Practice",      href: "/core-cs/dsa",    tag: "60 Days"     },
  { label: "JEE Mock Tests",    href: "/test-center",    tag: "30+ Tests"   },
];

/** Demo recent practice sessions */
const RECENT_SESSIONS = [
  { subject: "Class 10 — Trigonometry",  mode: "Quiz",      score: 85, date: "Today",      xp: 45  },
  { subject: "Python — OOP Concepts",    mode: "Flashcards", score: 70, date: "Yesterday",  xp: 30  },
  { subject: "JEE Physics Mock — Optics", mode: "Mock Test", score: 62, date: "2 days ago", xp: 60  },
];

/** Demo overall stats */
const DEMO_STATS = [
  { label: "Questions Attempted", value: "1,247",  icon: <CircleDot className="h-4 w-4" />, color: "text-blue-500"   },
  { label: "Avg. Accuracy",       value: "74%",    icon: <Target    className="h-4 w-4" />, color: "text-green-500"  },
  { label: "Practice Streak",     value: "7 days", icon: <Flame     className="h-4 w-4" />, color: "text-orange-500" },
  { label: "XP Earned",           value: "2,840",  icon: <Zap       className="h-4 w-4" />, color: "text-yellow-500" },
];

/* ══════════════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                                */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * PracticeHub
 * Main practice page component with all practice modes and stats.
 */
export function PracticeHub() {
  /* ── State ──────────────────────────────────────────────────────────── */
  const [search, setSearch] = useState(""); // Search term for practice modes

  /* ── Filtered modes ─────────────────────────────────────────────────── */
  const filteredModes = search.trim()
    ? PRACTICE_MODES.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.desc.toLowerCase().includes(search.toLowerCase())
      )
    : PRACTICE_MODES;

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="pb-20">

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-purple-950/5 to-background">
        {/* Background orbs */}
        <div className="absolute top-10 left-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative text-center">
          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0.01, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="outline" className="mb-5 gap-2 px-4 py-1.5 text-sm rounded-full border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400">
              <Brain className="h-3.5 w-3.5" />
              10,000+ Questions · 50+ Mock Tests · Daily Challenges
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5"
          >
            Practice Makes{" "}
            <span className="text-gradient">Perfect</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-8"
          >
            MCQ quizzes, mock exams, coding challenges, flashcards, and previous year papers
            — everything you need to ace your exams and interviews.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0.01, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex max-w-md mx-auto gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search practice modes…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-12 rounded-xl"
              />
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground"
          >
            {["✅ Free forever", "✅ No sign-in for basic access", "✅ NCERT aligned", "✅ Instant results"].map((item) => (
              <span key={item} className="whitespace-nowrap">{item}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* STATS ROW                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="border-y bg-muted/40 py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {DEMO_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0.01, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 rounded-xl bg-background border p-4"
              >
                {/* Icon */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-muted ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-black tabular-nums">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PRACTICE MODES GRID                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container px-4 md:px-6">
          {/* Section heading */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Practice Modes</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Choose your practice style — {filteredModes.length} mode{filteredModes.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          {/* Cards grid */}
          {filteredModes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredModes.map((mode, i) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0.01, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                >
                  <Link href={mode.href} className="group block h-full">
                    <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      {/* Gradient header stripe */}
                      <div className={`h-1.5 w-full bg-gradient-to-r ${mode.color}`} />
                      <div className="p-5 flex flex-col gap-3">
                        {/* Emoji */}
                        <div className="text-3xl">{mode.emoji}</div>

                        {/* Gradient icon */}
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mode.color} text-white`}>
                          <Brain className="h-5 w-5" />
                        </div>

                        {/* Badge */}
                        <Badge variant="secondary" className="self-start text-xs">{mode.badge}</Badge>

                        {/* Title + desc */}
                        <div className="flex-1">
                          <h3 className="font-bold mb-1.5 group-hover:text-brand-500 transition-colors">{mode.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{mode.desc}</p>
                        </div>

                        {/* Stat highlight */}
                        <div className="rounded-lg bg-muted px-3 py-2 text-xs flex justify-between items-center">
                          <span className="text-muted-foreground">{mode.stats.label}</span>
                          <span className="font-bold">{mode.stats.value}</span>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                          Start Practice <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-12">
              <p className="text-muted-foreground">No practice modes match your search.</p>
              <Button variant="ghost" size="sm" onClick={() => setSearch("")} className="mt-2">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TODAY'S DAILY CHALLENGE                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border bg-card overflow-hidden"
          >
            {/* Gold gradient header */}
            <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400" />
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Left — challenge details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
                    <Flame className="h-4 w-4" />
                  </div>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-500/40 bg-yellow-500/5">
                    Daily Challenge — July 2026
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Prove You Know Quadratic Equations
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  10 MCQs from Class 10 Mathematics — Chapter 4. Time limit: 12 minutes.
                  Earn <strong className="text-yellow-500">3× XP bonus</strong> for completing today.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> 10 Questions</span>
                  <span className="flex items-center gap-1"><Clock    className="h-3 w-3" /> 12 Minutes</span>
                  <span className="flex items-center gap-1"><Zap      className="h-3 w-3" /> 3× XP Bonus</span>
                  <span className="flex items-center gap-1"><Award    className="h-3 w-3" /> Badge Available</span>
                </div>
              </div>

              {/* Right — CTA */}
              <div className="flex flex-col items-center gap-3">
                <Button size="lg" variant="gradient" asChild className="w-full sm:w-auto">
                  <Link href="/practice/daily">
                    <Play className="h-4 w-4 fill-current" />
                    Start Today&apos;s Challenge
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">Resets at midnight IST</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SUBJECT QUICK-ACCESS                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-1">Quick Access by Subject</h2>
            <p className="text-muted-foreground text-sm">Jump directly to practice for any subject</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CBSE_SHORTCUTS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0.01, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={item.href} className="group block">
                  <div className="rounded-xl border bg-card p-3 text-center hover:shadow-md hover:border-brand-500/30 hover:-translate-y-0.5 transition-all">
                    <div className="font-semibold text-xs mb-1 group-hover:text-brand-500 transition-colors leading-tight">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.tag}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* RECENT SESSIONS                                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Sessions</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">View All <ChevronRight className="h-3 w-3" /></Link>
            </Button>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl">
            {RECENT_SESSIONS.map((session, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.01, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 rounded-xl border bg-card p-4"
              >
                {/* Score indicator */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-black text-sm ${
                  session.score >= 80 ? "bg-green-500/10 text-green-500"
                  : session.score >= 60 ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-red-500/10 text-red-500"
                }`}>
                  {session.score}%
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{session.subject}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <Badge variant="secondary" className="text-xs py-0">{session.mode}</Badge>
                    <span>{session.date}</span>
                  </div>
                </div>

                {/* XP earned */}
                <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                  <Zap className="h-3 w-3" /> +{session.xp} XP
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
