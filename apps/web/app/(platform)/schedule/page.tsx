/**
 * @file app/(platform)/schedule/page.tsx
 * @description Study Schedule — personalized weekly study planner
 * Route: /schedule
 *
 * Weekly schedule view with study sessions, upcoming tests, and deadlines.
 * Students can view AI-generated study plan based on their enrolled subjects.
 * Integrates with assignments and practice pages.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Target, Zap, BookOpen, Brain,
  CheckCircle2, AlertCircle, Plus, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── Schedule Data ───────────────────────────────────────────────────────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Study sessions for current week */
const SESSIONS = [
  { id: 1, day: "Mon", time: "06:00 – 08:00", subject: "Physics",           topic: "Electric Charges & Fields",    type: "study",  color: "bg-purple-500/10 border-purple-500/30 text-purple-700", done: true  },
  { id: 2, day: "Mon", time: "20:00 – 21:00", subject: "Mathematics",       topic: "Integration — Practice",       type: "practice", color: "bg-blue-500/10 border-blue-500/30 text-blue-700",   done: true  },
  { id: 3, day: "Tue", time: "06:00 – 07:30", subject: "Chemistry",         topic: "Organic — Named Reactions",    type: "study",  color: "bg-orange-500/10 border-orange-500/30 text-orange-700", done: true },
  { id: 4, day: "Tue", time: "19:00 – 20:30", subject: "DSA",               topic: "Trees: BST + AVL",             type: "coding", color: "bg-green-500/10 border-green-500/30 text-green-700", done: true   },
  { id: 5, day: "Wed", time: "06:00 – 08:00", subject: "Mathematics",       topic: "3D Geometry + Vectors",        type: "study",  color: "bg-blue-500/10 border-blue-500/30 text-blue-700",   done: false  },
  { id: 6, day: "Wed", time: "16:00 – 17:00", subject: "Physics",           topic: "PYQ Practice — 2023 Board",   type: "practice", color: "bg-purple-500/10 border-purple-500/30 text-purple-700", done: false },
  { id: 7, day: "Thu", time: "06:00 – 07:30", subject: "Biology",           topic: "Reproductive Systems",         type: "study",  color: "bg-teal-500/10 border-teal-500/30 text-teal-700",   done: false  },
  { id: 8, day: "Thu", time: "20:00 – 21:30", subject: "DSA",               topic: "Graphs: BFS + Dijkstra",       type: "coding", color: "bg-green-500/10 border-green-500/30 text-green-700", done: false  },
  { id: 9, day: "Fri", time: "06:00 – 08:00", subject: "Chemistry",         topic: "Electrochemistry",             type: "study",  color: "bg-orange-500/10 border-orange-500/30 text-orange-700", done: false },
  { id: 10, day: "Fri", time: "18:00 – 19:00", subject: "Mathematics",      topic: "Linear Programming",           type: "practice", color: "bg-blue-500/10 border-blue-500/30 text-blue-700", done: false },
  { id: 11, day: "Sat", time: "08:00 – 12:00", subject: "Full Mock Test",   topic: "JEE Mock #5 — Full Syllabus", type: "test",   color: "bg-red-500/10 border-red-500/30 text-red-700",       done: false  },
  { id: 12, day: "Sun", time: "10:00 – 12:00", subject: "Revision",         topic: "Weekly Revision + Weak Areas", type: "revision", color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-700", done: false },
] as const;

type SessionType = "study" | "practice" | "coding" | "test" | "revision";
const TYPE_ICONS: Record<SessionType, string> = {
  study:    "📖",
  practice: "✏️",
  coding:   "💻",
  test:     "📋",
  revision: "🔄",
};

/** Upcoming deadlines */
const UPCOMING = [
  { label: "Physics Assignment — Chapter 2", due: "Jul 10", urgent: true  },
  { label: "Chemistry Lab Report",           due: "Jul 12", urgent: false },
  { label: "DSA Mock Test",                  due: "Jul 15", urgent: false },
  { label: "Maths Practice Test",            due: "Jul 18", urgent: false },
];

/** Weekly stats */
const WEEK_STATS = [
  { label: "Hours Studied",   value: "12.5h",   icon: Clock,      color: "text-blue-500"   },
  { label: "Sessions Done",   value: "4/12",    icon: CheckCircle2, color: "text-green-500" },
  { label: "Subjects Covered", value: "4",      icon: BookOpen,   color: "text-purple-500" },
  { label: "XP Earned",       value: "+480",    icon: Zap,        color: "text-yellow-500" },
];

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  const daySessions = (day: string) => SESSIONS.filter((s) => s.day === day);
  const displaySessions = activeDay
    ? SESSIONS.filter((s) => s.day === activeDay)
    : SESSIONS;

  const doneCount = SESSIONS.filter((s) => s.done).length;
  const weekProgress = Math.round((doneCount / SESSIONS.length) * 100);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-cyan-950/5 to-background py-12">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-3">Week of Jul 7 – 13, 2026</Badge>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-1">📅 Study Schedule</h1>
              <p className="text-muted-foreground">Your personalized weekly study plan — AI-optimized for board + JEE prep.</p>
            </div>
            <Button variant="gradient" asChild className="shrink-0">
              <Link href="/ai-tutor"><Brain className="h-4 w-4" /> Regenerate Plan</Link>
            </Button>
          </div>

          {/* Week stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {WEEK_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-4">
                <stat.icon className={`h-5 w-5 ${stat.color} mb-1`} />
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Week progress */}
          <div className="rounded-xl border bg-card p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Week Progress</span>
              <span className="text-muted-foreground">{doneCount}/{SESSIONS.length} sessions</span>
            </div>
            <Progress value={weekProgress} className="h-2" />
          </div>
        </div>
      </section>

      {/* Day filter */}
      <section className="border-b bg-muted/30 py-4 sticky top-0 z-10">
        <div className="container px-4 md:px-6 flex flex-wrap gap-2">
          <button onClick={() => setActiveDay(null)}
            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${!activeDay ? "bg-brand-500 text-white border-brand-500" : "hover:bg-muted"}`}>
            All Days
          </button>
          {DAYS.map((day) => {
            const count = daySessions(day).length;
            return (
              <button key={day} onClick={() => setActiveDay(day)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 ${activeDay === day ? "bg-brand-500 text-white border-brand-500" : "hover:bg-muted"}`}>
                {day}
                {count > 0 && <span className={`rounded-full px-1.5 py-0.5 text-xs ${activeDay === day ? "bg-white/20" : "bg-muted"}`}>{count}</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* Sessions list */}
      <section className="py-8">
        <div className="container px-4 md:px-6 flex gap-6">
          <div className="flex-1">
            <div className="space-y-4">
              {DAYS.filter((d) => !activeDay || d === activeDay).map((day) => {
                const sessions = daySessions(day);
                if (sessions.length === 0) return null;
                return (
                  <div key={day}>
                    <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider mb-2">{day}</h3>
                    <div className="space-y-2">
                      {sessions.map((session, i) => (
                        <motion.div key={session.id} initial={{ opacity: 0.01, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                          className={`rounded-xl border p-4 flex items-center gap-4 transition-all ${session.color} ${session.done ? "opacity-60" : "hover:shadow-md"}`}>
                          <div className="shrink-0">
                            <span className="text-xl">{TYPE_ICONS[session.type as SessionType]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-semibold text-sm">{session.subject}</span>
                              <Badge variant="secondary" className="text-xs capitalize">{session.type}</Badge>
                              {session.done && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                            </div>
                            <p className="text-xs truncate">{session.topic}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="text-xs font-medium">{session.time}</div>
                            {!session.done && (
                              <Button size="sm" variant="ghost" className="h-7 text-xs mt-1" asChild>
                                <Link href={session.type === "coding" ? "/compiler" : "/practice/quiz"}>Start →</Link>
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming deadlines sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="rounded-2xl border bg-card p-5 sticky top-24">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" /> Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {UPCOMING.map((item, i) => (
                  <div key={i} className={`rounded-lg border p-3 text-sm ${item.urgent ? "border-red-400/30 bg-red-500/5" : ""}`}>
                    <div className="font-medium leading-tight mb-1">{item.label}</div>
                    <div className={`text-xs flex items-center gap-1 ${item.urgent ? "text-red-500 font-semibold" : "text-muted-foreground"}`}>
                      <Clock className="h-3 w-3" /> Due: {item.due}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link href="/practice/assignments"><CheckCircle2 className="h-3.5 w-3.5" /> View Assignments</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
