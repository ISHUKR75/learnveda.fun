/**
 * @file app/(platform)/dashboard/analytics/page.tsx
 * @description Student analytics page — detailed learning analytics and insights
 * Route: /dashboard/analytics
 * Shows: XP over time, study time breakdown, chapter completion rate, subject-wise performance
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3, TrendingUp, Clock, BookOpen, Star,
  Flame, Trophy, Target, ChevronRight, ArrowUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Page SEO Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Analytics — Dashboard | LearnVeda",
  description: "Your detailed learning analytics — track XP, study time, subject performance, and progress trends.",
  robots:      { index: false, follow: false }, // Private page — don't index
};

/* ─── Mock Analytics Data ────────────────────────────────────────────────── */
// Sample data — in production fetched from MongoDB via API
const weeklyXP = [
  { day: "Mon", xp: 120 }, { day: "Tue", xp: 85  }, { day: "Wed", xp: 200 },
  { day: "Thu", xp: 150 }, { day: "Fri", xp: 90  }, { day: "Sat", xp: 310 }, { day: "Sun", xp: 180 },
];
const totalWeeklyXP = weeklyXP.reduce((acc, d) => acc + d.xp, 0); // Total XP this week
const maxXP         = Math.max(...weeklyXP.map((d) => d.xp));     // Max for bar scaling

const SUBJECT_STATS = [
  { subject: "Mathematics",    score: 88, chapters: 12, time: "18h", color: "bg-blue-500"   },
  { subject: "Science",        score: 92, chapters: 9,  time: "14h", color: "bg-green-500"  },
  { subject: "Social Science", score: 76, chapters: 7,  time: "10h", color: "bg-orange-500" },
  { subject: "English",        score: 84, chapters: 5,  time: "8h",  color: "bg-purple-500" },
  { subject: "Python",         score: 95, chapters: 15, time: "22h", color: "bg-cyan-500"   },
];

const OVERVIEW_STATS = [
  { label: "Total XP",          value: "2,450",    icon: Star,    change: "+310 this week", up: true  },
  { label: "Study Streak",       value: "7 days",   icon: Flame,   change: "+2 from last",   up: true  },
  { label: "Chapters Completed", value: "48",       icon: BookOpen,change: "+6 this week",   up: true  },
  { label: "Average Score",      value: "87%",      icon: Target,  change: "+3% from last",  up: true  },
  { label: "Battles Won",        value: "18",       icon: Trophy,  change: "+3 this week",   up: true  },
  { label: "Study Time",         value: "72 hours", icon: Clock,   change: "+8h this week",  up: true  },
];

/* ─── Analytics Page Component ──────────────────────────────────────────── */
export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-primary/5 to-background">
        <div className="container px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Analytics</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Learning Analytics</h1>
              <p className="text-sm text-muted-foreground">Track your progress and study patterns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 space-y-8">

        {/* ── Overview Stats Grid ───────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">All-Time Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {OVERVIEW_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-2xl border bg-card p-4 text-center">
                  <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground mb-1">{stat.label}</div>
                  <div className={`text-[10px] flex items-center justify-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-600"}`}>
                    <ArrowUp className="h-2.5 w-2.5" />
                    {stat.change}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Weekly XP Bar Chart ───────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">XP This Week</h2>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              {totalWeeklyXP} XP total
            </Badge>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyXP.map((d) => {
                const heightPercent = (d.xp / maxXP) * 100; // Scale bars to max
                return (
                  <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                    {/* XP value on hover */}
                    <span className="text-[10px] text-muted-foreground">{d.xp}</span>
                    {/* Bar */}
                    <div className="w-full rounded-t-lg bg-primary/80 transition-all duration-300"
                         style={{ height: `${heightPercent}%` }} />
                    {/* Day label */}
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Subject Performance ───────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Subject Performance</h2>
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="divide-y">
              {SUBJECT_STATS.map((sub, i) => (
                <div key={sub.subject} className="flex items-center gap-4 p-4">
                  {/* Rank */}
                  <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}</span>

                  {/* Subject name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{sub.subject}</span>
                      <span className="text-sm font-bold">{sub.score}%</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sub.color}`}
                        style={{ width: `${sub.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span>{sub.chapters} chapters</span>
                    <span>{sub.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Study Time by Day ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Study Habits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Best Study Day",   value: "Saturday",  icon: Star,   desc: "Most XP earned on Saturdays"        },
              { label: "Peak Study Time",  value: "7–9 PM",    icon: Clock,  desc: "You study most between 7 and 9 PM"  },
              { label: "Avg Daily Study",  value: "1.5 hours", icon: Target, desc: "Maintain this to hit your goals"    },
            ].map((insight) => {
              const Icon = insight.icon;
              return (
                <div key={insight.label} className="rounded-2xl border bg-card p-5">
                  <Icon className="h-5 w-5 text-primary mb-3" />
                  <div className="text-xl font-bold mb-1">{insight.value}</div>
                  <div className="text-sm text-muted-foreground">{insight.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{insight.desc}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
