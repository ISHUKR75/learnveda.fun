/**
 * @file app/(platform)/dashboard/progress/page.tsx
 * @description Detailed learning progress page — chapter-by-chapter completion tracking
 * Route: /dashboard/progress
 * Shows: Subject progress, chapter completion, XP history, and completion percentages
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ChevronRight, CheckCircle2, Circle,
  ArrowRight, Clock, TrendingUp, Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Progress — Dashboard | LearnVeda",
  description: "Track your chapter-by-chapter learning progress across all subjects.",
  robots: { index: false, follow: false },
};

/* ─── Progress Data ──────────────────────────────────────────────────────── */
// Subject progress data — in production fetched from MongoDB user progress collection
const SUBJECT_PROGRESS = [
  {
    subject:     "Mathematics (Class 9)",
    href:        "/learn/class-9/mathematics",
    color:       "blue",
    total:       15,
    completed:   12,
    inProgress:  1,
    lastStudied: "2 hours ago",
    chapters: [
      { id: 1, title: "Number Systems",          completed: true  },
      { id: 2, title: "Polynomials",              completed: true  },
      { id: 3, title: "Coordinate Geometry",      completed: true  },
      { id: 4, title: "Linear Equations",         completed: true  },
      { id: 5, title: "Lines and Angles",         completed: true  },
      { id: 6, title: "Triangles",                completed: true  },
      { id: 7, title: "Quadrilaterals",           completed: true  },
      { id: 8, title: "Circles",                  completed: true  },
      { id: 9, title: "Heron's Formula",          completed: true  },
      { id:10, title: "Surface Areas & Volumes",  completed: true  },
      { id:11, title: "Statistics",               completed: true  },
      { id:12, title: "Probability",              completed: true  },
      { id:13, title: "Introduction to Euclid",   completed: false, inProgress: true  },
      { id:14, title: "Areas of Parallelograms",  completed: false },
      { id:15, title: "Constructions",            completed: false },
    ],
  },
  {
    subject:     "Science (Class 9)",
    href:        "/learn/class-9/science",
    color:       "green",
    total:       14,
    completed:   9,
    inProgress:  0,
    lastStudied: "Yesterday",
    chapters: [
      { id: 1, title: "Matter in Our Surroundings",   completed: true  },
      { id: 2, title: "Is Matter Around Us Pure?",    completed: true  },
      { id: 3, title: "Atoms and Molecules",          completed: true  },
      { id: 4, title: "Structure of the Atom",        completed: true  },
      { id: 5, title: "The Fundamental Unit of Life", completed: true  },
      { id: 6, title: "Tissues",                      completed: true  },
      { id: 7, title: "Motion",                       completed: true  },
      { id: 8, title: "Force and Laws of Motion",     completed: true  },
      { id: 9, title: "Gravitation",                  completed: true  },
      { id:10, title: "Work and Energy",              completed: false },
      { id:11, title: "Sound",                        completed: false },
      { id:12, title: "Natural Resources",            completed: false },
      { id:13, title: "Improvement in Food Resources",completed: false },
      { id:14, title: "Why Do We Fall Ill?",          completed: false },
    ],
  },
  {
    subject:     "Python Programming",
    href:        "/programming/python",
    color:       "cyan",
    total:       45,
    completed:   15,
    inProgress:  1,
    lastStudied: "3 hours ago",
    chapters: Array.from({ length: 45 }, (_, i) => ({
      id:       i + 1,
      title:    `Day ${String(i + 1).padStart(2, "0")}`,
      completed: i < 15,
      inProgress: i === 15,
    })),
  },
];

/* ─── Progress Page Component ────────────────────────────────────────────── */
export default function ProgressPage() {
  const totalCompleted = SUBJECT_PROGRESS.reduce((acc, s) => acc + s.completed, 0);
  const totalChapters  = SUBJECT_PROGRESS.reduce((acc, s) => acc + s.total, 0);
  const overallPct     = Math.round((totalCompleted / totalChapters) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-green-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Progress</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Learning Progress</h1>
                <p className="text-sm text-muted-foreground">
                  {totalCompleted} of {totalChapters} chapters completed · {overallPct}% overall
                </p>
              </div>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Overall completion</span>
              <span>{overallPct}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Subject Progress ──────────────────────────────────────────────── */}
      <div className="container px-4 py-8 space-y-8">
        {SUBJECT_PROGRESS.map((subject) => {
          const pct = Math.round((subject.completed / subject.total) * 100);

          return (
            <section key={subject.subject} className="rounded-2xl border bg-card overflow-hidden">
              {/* Subject header */}
              <div className={`border-b bg-${subject.color}-500/5 p-5`}>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <h2 className="font-bold text-lg">{subject.subject}</h2>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last studied {subject.lastStudied}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        {subject.completed}/{subject.total} chapters
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`text-xs ${
                        pct === 100
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {pct}% complete
                    </Badge>
                    <Button asChild size="sm" variant="outline" className="text-xs h-7">
                      <Link href={subject.href}>
                        Continue <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${subject.color}-500 rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Chapter pills — compact grid */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {subject.chapters.map((ch) => (
                    <div
                      key={ch.id}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs border transition-all ${
                        ch.completed
                          ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300"
                          : "inProgress" in ch && ch.inProgress
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-muted border-border text-muted-foreground"
                      }`}
                    >
                      {ch.completed ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Circle className="h-3 w-3" />
                      )}
                      <span className="hidden sm:inline">{ch.title}</span>
                      <span className="sm:hidden">{ch.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
