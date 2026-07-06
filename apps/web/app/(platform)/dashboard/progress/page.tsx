/**
 * @file app/(platform)/dashboard/progress/page.tsx
 * @description Detailed learning progress page
 * Route: /dashboard/progress
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, CheckCircle2, Circle, Clock, TrendingUp,
  ChevronRight, Flame, Target, Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "My Progress — LearnVeda",
  description: "Track your chapter-wise progress across all subjects on LearnVeda.",
  robots:      { index: false, follow: false },
};

/* ─── Subject progress data ──────────────────────────────────────────────── */
const SUBJECTS = [
  {
    name:     "Mathematics (Class 10)",
    emoji:    "📐",
    chapters: 14,
    done:     10,
    color:    "bg-blue-500",
    href:     "/learn/class-10",
    lastStudied: "Today",
  },
  {
    name:     "Physics (Class 10)",
    emoji:    "⚛️",
    chapters: 13,
    done:     7,
    color:    "bg-cyan-500",
    href:     "/learn/class-10",
    lastStudied: "Yesterday",
  },
  {
    name:     "Chemistry (Class 10)",
    emoji:    "🧪",
    chapters: 16,
    done:     4,
    color:    "bg-green-500",
    href:     "/learn/class-10",
    lastStudied: "3 days ago",
  },
  {
    name:     "Python",
    emoji:    "🐍",
    chapters: 30,   // Days
    done:     12,
    color:    "bg-yellow-500",
    href:     "/programming/python",
    lastStudied: "Today",
  },
  {
    name:     "DSA",
    emoji:    "🌳",
    chapters: 40,
    done:     18,
    color:    "bg-orange-500",
    href:     "/core-cs/dsa",
    lastStudied: "2 days ago",
  },
];

/* ─── Weekly activity (Mon–Sun) ──────────────────────────────────────────── */
const WEEKLY = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 90 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 75 },
  { day: "Fri", minutes: 120 },
  { day: "Sat", minutes: 60 },
  { day: "Sun", minutes: 0  },
];
const MAX_MINUTES = Math.max(...WEEKLY.map((d) => d.minutes));

/* ─── Progress circle helper ─────────────────────────────────────────────── */
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

export default function ProgressPage() {
  const totalChapters = SUBJECTS.reduce((a, s) => a + s.chapters, 0);
  const totalDone     = SUBJECTS.reduce((a, s) => a + s.done, 0);
  const overallPct    = totalDone / totalChapters;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Learning Progress</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Across all enrolled subjects and languages
            </p>
          </div>
          <Link href="/dashboard" className="text-sm text-brand-500 hover:underline flex items-center gap-1">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: CheckCircle2, value: `${totalDone}/${totalChapters}`, label: "Chapters Complete", color: "text-green-500" },
            { icon: TrendingUp,   value: `${Math.round(overallPct * 100)}%`, label: "Overall Progress", color: "text-brand-500" },
            { icon: Flame,        value: "7",  label: "Day Streak",     color: "text-orange-500" },
            { icon: Clock,        value: "48h",label: "Total Study Time", color: "text-blue-500"  },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-5 text-center shadow-sm">
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly activity */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm mb-8">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-500" />
            This Week
          </h2>
          <div className="flex items-end gap-2 h-28">
            {WEEKLY.map((d) => {
              const heightPct = MAX_MINUTES > 0 ? d.minutes / MAX_MINUTES : 0;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-muted rounded-sm overflow-hidden" style={{ height: "80px" }}>
                    <div
                      className="w-full bg-brand-500 rounded-sm transition-all"
                      style={{
                        height:    `${Math.round(heightPct * 80)}px`,
                        marginTop: `${80 - Math.round(heightPct * 80)}px`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Total this week: {WEEKLY.reduce((a,d)=>a+d.minutes,0)} minutes</p>
        </div>

        {/* Subject breakdown */}
        <div className="space-y-4">
          <h2 className="font-bold text-foreground">Subject Breakdown</h2>
          {SUBJECTS.map((subject) => {
            const pct = subject.done / subject.chapters;
            return (
              <Link
                key={subject.name}
                href={subject.href}
                className="group block rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:border-brand-500/30"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Last studied: {subject.lastStudied}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-foreground text-sm">{Math.round(pct * 100)}%</p>
                    <p className="text-xs text-muted-foreground">{subject.done}/{subject.chapters}</p>
                  </div>
                </div>
                <ProgressBar value={pct} color={subject.color} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
