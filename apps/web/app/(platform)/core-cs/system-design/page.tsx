/**
 * @file app/(platform)/core-cs/system-design/page.tsx
 * @description System Design learning track — 25-day structured plan
 * Route: /core-cs/system-design
 *
 * Covers: HLD, LLD, CAP theorem, real system designs (Netflix, Uber, Twitter)
 * Level: Advanced | Duration: 25 days | Target: Senior SDE interviews
 *
 * Day-by-day curriculum with theory summaries, YouTube links, and practice problems.
 * Platform layout (with Navbar) is provided by (platform)/layout.tsx.
 */

"use client"; // Client component — interactive day tracker, accordion

import React, { useState } from "react";                   // React core
import Link from "next/link";                              // Navigation
import { motion } from "framer-motion";                    // Animations
import {
  ChevronDown, ChevronUp, BookOpen, Clock, CheckCircle,
  ArrowRight, Zap, Star, Brain, Target, Users,
  Globe, Server, Database, Layers, Code2, Trophy,
} from "lucide-react";                                     // Icons
import { Badge }  from "@/components/ui/badge";            // Label badge
import { Button } from "@/components/ui/button";           // CTA button
import { Progress } from "@/components/ui/progress";       // Progress bar

/* ══════════════════════════════════════════════════════════════════════════ */
/*  25-DAY SYSTEM DESIGN CURRICULUM                                          */
/* ══════════════════════════════════════════════════════════════════════════ */

/** Phase structure for the 25-day plan */
const PHASES = [
  {
    id: 1,
    title: "Fundamentals",
    days: "Day 01–05",
    color: "from-blue-500 to-cyan-500",
    icon: <Layers className="h-5 w-5" />,
    topics: [
      { day: 1,  title: "System Design Introduction + Scalability Basics",       xp: 40, hasVideo: true  },
      { day: 2,  title: "Client-Server Architecture + HTTP/HTTPS Deep Dive",     xp: 40, hasVideo: true  },
      { day: 3,  title: "Load Balancers — Round Robin, Weighted, IP Hash",       xp: 45, hasVideo: true  },
      { day: 4,  title: "Caching Strategies — LRU, LFU, Redis, CDN",            xp: 45, hasVideo: true  },
      { day: 5,  title: "Database Selection — SQL vs NoSQL Trade-offs",          xp: 45, hasVideo: false },
    ],
  },
  {
    id: 2,
    title: "Core Concepts",
    days: "Day 06–12",
    color: "from-purple-500 to-violet-600",
    icon: <Server className="h-5 w-5" />,
    topics: [
      { day: 6,  title: "CAP Theorem — Consistency, Availability, Partition",    xp: 50, hasVideo: true  },
      { day: 7,  title: "Database Sharding + Partitioning Strategies",            xp: 50, hasVideo: true  },
      { day: 8,  title: "Message Queues — Kafka, RabbitMQ, SQS Architecture",   xp: 55, hasVideo: true  },
      { day: 9,  title: "API Design — REST vs GraphQL vs gRPC",                  xp: 50, hasVideo: false },
      { day: 10, title: "Rate Limiting — Token Bucket, Sliding Window",          xp: 45, hasVideo: true  },
      { day: 11, title: "Consistent Hashing + Distributed Hash Tables",          xp: 55, hasVideo: false },
      { day: 12, title: "Event-Driven Architecture + CQRS Pattern",              xp: 55, hasVideo: false },
    ],
  },
  {
    id: 3,
    title: "Real System Designs",
    days: "Day 13–20",
    color: "from-orange-500 to-red-500",
    icon: <Globe className="h-5 w-5" />,
    topics: [
      { day: 13, title: "Design Netflix — Video Streaming, CDN, Encoding",       xp: 65, hasVideo: true  },
      { day: 14, title: "Design Uber — Real-time Location, Matching, Surge",     xp: 65, hasVideo: true  },
      { day: 15, title: "Design Twitter — Timeline, Fan-out, Trending Topics",   xp: 65, hasVideo: true  },
      { day: 16, title: "Design WhatsApp — E2E Encryption, Message Delivery",    xp: 65, hasVideo: false },
      { day: 17, title: "Design Google Drive — Storage, Sync, Collaboration",    xp: 65, hasVideo: true  },
      { day: 18, title: "Design URL Shortener — Hashing, Redirects, Analytics", xp: 55, hasVideo: true  },
      { day: 19, title: "Design E-Commerce Platform — Cart, Orders, Payments",   xp: 65, hasVideo: false },
      { day: 20, title: "Design Search Autocomplete + Typeahead System",         xp: 60, hasVideo: false },
    ],
  },
  {
    id: 4,
    title: "Low-Level Design",
    days: "Day 21–25",
    color: "from-green-500 to-teal-500",
    icon: <Code2 className="h-5 w-5" />,
    topics: [
      { day: 21, title: "LLD Introduction — OOP Principles, SOLID, Design Patterns", xp: 55, hasVideo: true  },
      { day: 22, title: "Design Parking Lot — OOP in Practice",                      xp: 55, hasVideo: true  },
      { day: 23, title: "Design Library Management System + Hotel Booking",           xp: 55, hasVideo: false },
      { day: 24, title: "Design Chess / Elevator — State Machine Patterns",           xp: 55, hasVideo: false },
      { day: 25, title: "Mock Interview — HLD + LLD Combined Review",                xp: 80, hasVideo: true  },
    ],
  },
] as const;

/** Key concepts covered in this track */
const KEY_CONCEPTS = [
  "CAP Theorem",    "Load Balancing",    "Caching (Redis)", "Database Sharding",
  "Message Queues", "API Rate Limiting", "CDN & Edge",      "Microservices",
  "Event Sourcing", "Consistent Hashing","LRU/LFU Cache",   "SQL vs NoSQL",
];

/* ══════════════════════════════════════════════════════════════════════════ */
/*  COMPONENT                                                                */
/* ══════════════════════════════════════════════════════════════════════════ */

/**
 * SystemDesignPage
 * Full 25-day System Design track with collapsible phases and day tracker.
 */
export default function SystemDesignPage() {
  /* ── State ──────────────────────────────────────────────────────────── */
  const [openPhase,    setOpenPhase]    = useState<number | null>(1);       // Which phase is expanded
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set()); // Completed days

  /* ── Toggle day completion ───────────────────────────────────────────── */
  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day); // Mark incomplete
      else next.add(day);                  // Mark complete
      return next;
    });
  };

  /* ── Overall progress ────────────────────────────────────────────────── */
  const totalDays     = 25;                                  // Total days in the plan
  const completedCount = completedDays.size;                 // How many finished
  const progressPct   = Math.round((completedCount / totalDays) * 100); // % done

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen pb-20">

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-slate-900/5 to-background py-16 md:py-20">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-1/3 h-64 w-64 rounded-full bg-slate-500/10 blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <Link href="/core-cs/dsa" className="hover:text-foreground transition-colors">Core CS</Link>
            <span>/</span>
            <span className="text-foreground font-medium">System Design</span>
          </nav>

          {/* Hero content */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left — text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Advanced</Badge>
                <Badge variant="outline" className="text-slate-600 border-slate-400/40">Senior SDE</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🏗️ System Design — 25-Day Plan
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                Master HLD and LLD — from CAP theorem and load balancers to designing Netflix,
                Uber, and WhatsApp. Crack senior SDE interviews at top tech companies.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 25 Days</span>
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 4 Phases</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 4,800+ learners</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.9/5 rating</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" variant="gradient" asChild>
                  <Link href="#phase-1">
                    <Zap className="h-4 w-4" />
                    Start Day 1
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/compiler">Open Compiler</Link>
                </Button>
              </div>
            </div>

            {/* Right — progress card */}
            <div className="w-full lg:w-72 rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-500" />
                Your Progress
              </h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Days completed</span>
                  <span className="font-bold">{completedCount} / {totalDays}</span>
                </div>
                <Progress value={progressPct} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground mb-4">{progressPct}% complete — keep going! 🔥</p>
              <div className="flex flex-wrap gap-1.5">
                {KEY_CONCEPTS.map((concept) => (
                  <span key={concept} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PHASE CURRICULUM                                              */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">25-Day Curriculum</h2>

          <div className="flex flex-col gap-5">
            {PHASES.map((phase) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0.01, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (phase.id - 1) * 0.08 }}
                id={`phase-${phase.id}`}
              >
                <div className="rounded-2xl border bg-card overflow-hidden">
                  {/* Phase header — clickable to expand */}
                  <button
                    className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}
                    aria-expanded={openPhase === phase.id}
                  >
                    {/* Gradient icon */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} text-white`}>
                      {phase.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{phase.title}</div>
                      <div className="text-sm text-muted-foreground">{phase.days} · {phase.topics.length} lessons</div>
                    </div>
                    {/* Completed count */}
                    <Badge variant="secondary" className="shrink-0">
                      {phase.topics.filter((t) => completedDays.has(t.day)).length}/{phase.topics.length}
                    </Badge>
                    {/* Chevron */}
                    {openPhase === phase.id
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    }
                  </button>

                  {/* Phase lessons — collapsed by default except first */}
                  {openPhase === phase.id && (
                    <div className="border-t divide-y">
                      {phase.topics.map((topic) => {
                        const isComplete = completedDays.has(topic.day); // Day complete flag
                        return (
                          <div
                            key={topic.day}
                            className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                              isComplete ? "bg-green-500/5" : "hover:bg-muted/30"
                            }`}
                          >
                            {/* Day number */}
                            <span className="w-12 text-xs font-bold text-muted-foreground/50 tabular-nums shrink-0">
                              Day {String(topic.day).padStart(2, "0")}
                            </span>

                            {/* Complete toggle checkbox */}
                            <button
                              onClick={() => toggleDay(topic.day)}
                              className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isComplete
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "border-muted-foreground/30 hover:border-brand-500"
                              }`}
                              aria-label={isComplete ? "Mark incomplete" : "Mark complete"}
                            >
                              {isComplete && <CheckCircle className="h-3 w-3" />}
                            </button>

                            {/* Topic title */}
                            <span className={`flex-1 text-sm ${isComplete ? "line-through text-muted-foreground" : ""}`}>
                              {topic.title}
                            </span>

                            {/* Badges */}
                            <div className="flex items-center gap-2 shrink-0">
                              {topic.hasVideo && (
                                <Badge variant="outline" className="text-xs text-red-500 border-red-400/30">
                                  📹 Video
                                </Badge>
                              )}
                              <Badge variant="secondary" className="text-xs text-yellow-600">
                                +{topic.xp} XP
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* RESOURCES SECTION                                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-xl font-bold mb-6">📚 Recommended Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Designing Data-Intensive Applications",  author: "Martin Kleppmann",   emoji: "📘", type: "Book"   },
              { title: "System Design Interview (Vol. 1 & 2)",   author: "Alex Xu",            emoji: "📗", type: "Book"   },
              { title: "Grokking the System Design Interview",   author: "Educative.io",       emoji: "🌐", type: "Course" },
            ].map((res) => (
              <div key={res.title} className="rounded-xl border bg-card p-4">
                <div className="text-2xl mb-2">{res.emoji}</div>
                <Badge variant="outline" className="text-xs mb-2">{res.type}</Badge>
                <h3 className="font-semibold text-sm mb-1">{res.title}</h3>
                <p className="text-xs text-muted-foreground">{res.author}</p>
              </div>
            ))}
          </div>

          {/* Next track CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between rounded-xl border bg-card p-5">
            <div>
              <div className="font-bold">Ready for the next track?</div>
              <div className="text-sm text-muted-foreground">Continue with DBMS or Operating Systems</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/core-cs/database-management">DBMS →</Link>
              </Button>
              <Button variant="gradient" size="sm" asChild>
                <Link href="/core-cs/operating-systems">OS →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
