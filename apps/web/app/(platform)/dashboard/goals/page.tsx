/**
 * @file app/(platform)/dashboard/goals/page.tsx
 * @description Learning goals page — set and track personal study goals
 * Route: /dashboard/goals
 * Shows: Active goals, completed goals, and goal creation wizard
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Target, ChevronRight, Plus, CheckCircle2, Clock,
  Flame, Star, BookOpen, Trophy, Zap,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Goals — Dashboard | LearnVeda",
  description: "Set and track your personal learning goals on LearnVeda.",
  robots: { index: false, follow: false },
};

/* ─── Goals Data ─────────────────────────────────────────────────────────── */
// User goals — in production fetched from MongoDB goals collection
const ACTIVE_GOALS = [
  {
    id:       "g-001",
    title:    "Complete Python 45-Day Plan",
    desc:     "Finish all 45 days of the Python track and earn the certificate",
    type:     "track",
    icon:     "🐍",
    deadline: "Aug 18, 2026",
    progress: 33,   // 15 of 45 days = 33%
    current:  15,
    target:   45,
    unit:     "days",
    color:    "blue",
    status:   "on-track",
    xpReward: 500,
  },
  {
    id:       "g-002",
    title:    "Score 90%+ in Class 9 Science",
    desc:     "Complete all chapters and average 90%+ in practice quizzes",
    type:     "score",
    icon:     "🔬",
    deadline: "Jul 31, 2026",
    progress: 64,
    current:  9,
    target:   14,
    unit:     "chapters",
    color:    "green",
    status:   "on-track",
    xpReward: 300,
  },
  {
    id:       "g-003",
    title:    "Maintain 30-Day Study Streak",
    desc:     "Study at least one chapter or lesson every single day for 30 days",
    type:     "streak",
    icon:     "🔥",
    deadline: "Aug 3, 2026",
    progress: 23,   // 7/30 days
    current:  7,
    target:   30,
    unit:     "days",
    color:    "orange",
    status:   "on-track",
    xpReward: 1000,
  },
  {
    id:       "g-004",
    title:    "Win 10 Live Battles",
    desc:     "Win 10 live battles in the Battle Arena to earn the Gladiator badge",
    type:     "battle",
    icon:     "⚔️",
    deadline: "Jul 20, 2026",
    progress: 80,   // 8/10 battles won — URGENT
    current:  8,
    target:   10,
    unit:     "battles",
    color:    "purple",
    status:   "urgent",
    xpReward: 200,
  },
];

const COMPLETED_GOALS = [
  { id:"cg-001", title:"Complete 10 Chapters",         icon:"📚", completedOn:"June 28, 2026", xpEarned:100 },
  { id:"cg-002", title:"7-Day Study Streak",            icon:"🔥", completedOn:"July 3, 2026",  xpEarned:100 },
  { id:"cg-003", title:"Earn Rising Star Badge (1K XP)",icon:"⭐", completedOn:"June 25, 2026", xpEarned:100 },
];

/* ─── Status Config ──────────────────────────────────────────────────────── */
const STATUS_CONFIG = {
  "on-track": { label: "On Track",  color: "text-green-600 dark:text-green-400",  bg: "bg-green-500/10 border-green-500/20"  },
  "urgent":   { label: "Almost!",   color: "text-amber-600 dark:text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20"  },
  "at-risk":  { label: "At Risk",   color: "text-red-600 dark:text-red-400",      bg: "bg-red-500/10 border-red-500/20"      },
};

/* ─── Goals Page Component ────────────────────────────────────────────────── */
export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-primary/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Goals</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Learning Goals</h1>
                <p className="text-sm text-muted-foreground">
                  {ACTIVE_GOALS.length} active · {COMPLETED_GOALS.length} completed
                </p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-3xl space-y-8">

        {/* ── Active Goals ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Active Goals ({ACTIVE_GOALS.length})</h2>
          <div className="space-y-4">
            {ACTIVE_GOALS.map((goal) => {
              const statusCfg = STATUS_CONFIG[goal.status as keyof typeof STATUS_CONFIG];
              return (
                <div key={goal.id} className="rounded-2xl border bg-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{goal.icon}</div>
                      <div>
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-xs text-muted-foreground">{goal.desc}</p>
                      </div>
                    </div>
                    <Badge className={`text-[10px] shrink-0 ${statusCfg.bg} ${statusCfg.color}`}>
                      {statusCfg.label}
                    </Badge>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{goal.current} / {goal.target} {goal.unit}</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${goal.color}-500 transition-all`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Deadline: {goal.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      +{goal.xpReward} XP on completion
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Completed Goals ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Completed ✅</h2>
          <div className="space-y-3">
            {COMPLETED_GOALS.map((goal) => (
              <div key={goal.id} className="flex items-center gap-4 rounded-xl border bg-card/50 p-4 opacity-70">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{goal.title}</div>
                  <div className="text-xs text-muted-foreground">Completed on {goal.completedOn}</div>
                </div>
                <Badge className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20">
                  +{goal.xpEarned} XP
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* ── Goal Templates ─────────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Add Goals</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon:"🔥", title:"21-Day Streak",    desc:"Study every day for 21 days"   },
              { icon:"📖", title:"50 Chapters",       desc:"Complete 50 chapters total"    },
              { icon:"🏆", title:"10 Battle Wins",    desc:"Win 10 live battles"           },
              { icon:"⭐", title:"5,000 XP",          desc:"Earn 5,000 total XP"           },
            ].map((template) => (
              <button
                key={template.title}
                className="rounded-xl border bg-card hover:bg-muted/50 transition-colors p-3 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{template.icon}</span>
                  <span className="font-medium text-sm">{template.title}</span>
                  <Plus className="h-3.5 w-3.5 text-primary ml-auto" />
                </div>
                <p className="text-xs text-muted-foreground">{template.desc}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
