/**
 * @file app/(platform)/core-cs/database-management/page.tsx
 * @description DBMS (Database Management Systems) learning track — 20-day plan
 * Route: /core-cs/database-management
 *
 * Covers: Relational Model, SQL, Normalization, ACID, Transactions, Indexing, B-Trees
 * Level: Intermediate | Duration: 20 days | Target: SDE interviews + BTech exams
 */

"use client"; // Client component — interactive day tracker

import React, { useState } from "react";                   // React core
import Link from "next/link";                              // Navigation
import { motion } from "framer-motion";                    // Animations
import {
  ChevronDown, ChevronUp, CheckCircle, Clock, BookOpen,
  Database, Star, Users, Target, Zap, ArrowRight,
} from "lucide-react";                                     // Icons
import { Badge }  from "@/components/ui/badge";            // Label badge
import { Button } from "@/components/ui/button";           // CTA button
import { Progress } from "@/components/ui/progress";       // Progress bar

/* ─── 20-Day DBMS Curriculum ─────────────────────────────────────────────── */
const PHASES = [
  {
    id: 1,
    title: "Foundations",
    days: "Day 01–05",
    color: "from-cyan-500 to-teal-600",
    topics: [
      { day: 1,  title: "Introduction to DBMS — Data Models, Schemas, Instances",      xp: 35, hasVideo: true  },
      { day: 2,  title: "Relational Model — Tables, Keys, Constraints",                xp: 35, hasVideo: true  },
      { day: 3,  title: "SQL Basics — SELECT, INSERT, UPDATE, DELETE, WHERE",          xp: 40, hasVideo: true  },
      { day: 4,  title: "SQL Advanced — JOINs: INNER, LEFT, RIGHT, FULL, CROSS",      xp: 45, hasVideo: true  },
      { day: 5,  title: "SQL Aggregations — GROUP BY, HAVING, COUNT, SUM, AVG",       xp: 40, hasVideo: false },
    ],
  },
  {
    id: 2,
    title: "Advanced SQL + Design",
    days: "Day 06–12",
    color: "from-blue-500 to-indigo-600",
    topics: [
      { day: 6,  title: "Subqueries, CTEs, Window Functions — ROW_NUMBER, RANK",      xp: 50, hasVideo: true  },
      { day: 7,  title: "Normalization — 1NF, 2NF, 3NF, BCNF with examples",         xp: 50, hasVideo: true  },
      { day: 8,  title: "ER Diagrams — Entities, Relationships, Attributes",           xp: 45, hasVideo: false },
      { day: 9,  title: "Indexing — B-Trees, B+ Trees, Hash Indexes, Clustered",      xp: 55, hasVideo: true  },
      { day: 10, title: "Query Optimization — EXPLAIN ANALYZE, Query Planner",        xp: 50, hasVideo: false },
      { day: 11, title: "Stored Procedures, Triggers, Views, Materialized Views",     xp: 50, hasVideo: false },
      { day: 12, title: "Transactions — BEGIN, COMMIT, ROLLBACK, Savepoints",         xp: 50, hasVideo: true  },
    ],
  },
  {
    id: 3,
    title: "Internals & NoSQL",
    days: "Day 13–20",
    color: "from-orange-500 to-red-500",
    topics: [
      { day: 13, title: "ACID Properties — Atomicity, Consistency, Isolation, Durability", xp: 55, hasVideo: true  },
      { day: 14, title: "Concurrency Control — 2PL, MVCC, Lock Granularity",              xp: 55, hasVideo: false },
      { day: 15, title: "Recovery — WAL, Undo/Redo Logging, Checkpoint Protocol",         xp: 55, hasVideo: false },
      { day: 16, title: "NoSQL Databases — MongoDB, Cassandra, Redis Types",              xp: 50, hasVideo: true  },
      { day: 17, title: "Database Replication — Master-Slave, Multi-Master, Raft",        xp: 60, hasVideo: false },
      { day: 18, title: "Database Sharding — Horizontal, Vertical, Hash-Based",           xp: 60, hasVideo: false },
      { day: 19, title: "SQL Interview Questions — Top 50 with Solutions",                xp: 65, hasVideo: false },
      { day: 20, title: "Mock Interview — DBMS Schema Design + SQL Challenge",            xp: 80, hasVideo: true  },
    ],
  },
] as const;

export default function DBMSPage() {
  const [openPhase,     setOpenPhase]     = useState<number | null>(1);       // Expanded phase
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set()); // Completed days

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  };

  const totalDays    = 20;
  const completedPct = Math.round((completedDays.size / totalDays) * 100);

  return (
    <div className="min-h-screen pb-20">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-cyan-950/5 to-background py-16 md:py-20">
        <div className="absolute top-0 right-1/4 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">DBMS</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Intermediate</Badge>
                <Badge variant="outline" className="text-cyan-600 border-cyan-400/40">Core CS</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🗃️ DBMS — 20-Day Plan
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                Master database fundamentals from SQL to B-Trees to ACID transactions.
                Essential for SDE interviews and BTech database engineering courses.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 20 Days</span>
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 3 Phases</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 7,200+ learners</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.8/5</span>
              </div>
              <div className="flex gap-3">
                <Button size="lg" variant="gradient" asChild>
                  <Link href="#phase-1"><Zap className="h-4 w-4" /> Start Day 1</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/compiler">SQL Playground</Link>
                </Button>
              </div>
            </div>

            {/* Progress card */}
            <div className="w-full lg:w-72 rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-500" /> Your Progress
              </h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Days completed</span>
                  <span className="font-bold">{completedDays.size} / {totalDays}</span>
                </div>
                <Progress value={completedPct} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground">{completedPct}% complete 🎯</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">20-Day Curriculum</h2>
          <div className="flex flex-col gap-5">
            {PHASES.map((phase) => (
              <motion.div key={phase.id} initial={{ opacity: 0.01, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id={`phase-${phase.id}`}>
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <button className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} text-white`}>
                      <Database className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{phase.title}</div>
                      <div className="text-sm text-muted-foreground">{phase.days} · {phase.topics.length} lessons</div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {phase.topics.filter((t) => completedDays.has(t.day)).length}/{phase.topics.length}
                    </Badge>
                    {openPhase === phase.id ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>

                  {openPhase === phase.id && (
                    <div className="border-t divide-y">
                      {phase.topics.map((topic) => {
                        const isComplete = completedDays.has(topic.day);
                        return (
                          <div key={topic.day} className={`flex items-center gap-4 px-5 py-4 transition-colors ${isComplete ? "bg-green-500/5" : "hover:bg-muted/30"}`}>
                            <span className="w-12 text-xs font-bold text-muted-foreground/50 tabular-nums shrink-0">Day {String(topic.day).padStart(2, "0")}</span>
                            <button onClick={() => toggleDay(topic.day)} className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${isComplete ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground/30 hover:border-brand-500"}`}>
                              {isComplete && <CheckCircle className="h-3 w-3" />}
                            </button>
                            <span className={`flex-1 text-sm ${isComplete ? "line-through text-muted-foreground" : ""}`}>{topic.title}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              {topic.hasVideo && <Badge variant="outline" className="text-xs text-red-500 border-red-400/30">📹 Video</Badge>}
                              <Badge variant="secondary" className="text-xs text-yellow-600">+{topic.xp} XP</Badge>
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

      {/* ── Next steps ────────────────────────────────────────────── */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between rounded-xl border bg-card p-5">
            <div>
              <div className="font-bold">Continue your Core CS journey</div>
              <div className="text-sm text-muted-foreground">Next: Operating Systems or System Design</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild><Link href="/core-cs/operating-systems">OS →</Link></Button>
              <Button variant="gradient" size="sm" asChild><Link href="/core-cs/system-design">System Design →</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
