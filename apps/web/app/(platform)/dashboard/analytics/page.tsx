/**
 * @file app/(platform)/dashboard/analytics/page.tsx
 * @description Learning analytics page — deep stats on study habits
 * Route: /dashboard/analytics
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp, Clock, BookOpen, Target, Award,
  Brain, BarChart3, Calendar, Zap, Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "Analytics — LearnVeda",
  description: "Detailed analytics on your study habits, quiz performance, and learning patterns.",
  robots:      { index: false, follow: false },
};

/* ─── Monthly study hours (last 6 months) ────────────────────────────────── */
const MONTHLY_HOURS = [
  { month: "Feb", hours: 18 },
  { month: "Mar", hours: 24 },
  { month: "Apr", hours: 31 },
  { month: "May", hours: 28 },
  { month: "Jun", hours: 36 },
  { month: "Jul", hours: 12 }, // Partial month
];
const MAX_HOURS = Math.max(...MONTHLY_HOURS.map((m) => m.hours));

/* ─── Subject performance ────────────────────────────────────────────────── */
const SUBJECT_PERF = [
  { name: "Mathematics", accuracy: 88, quizzes: 24, color: "bg-blue-500"    },
  { name: "Physics",     accuracy: 74, quizzes: 18, color: "bg-cyan-500"    },
  { name: "Python",      accuracy: 92, quizzes: 15, color: "bg-yellow-500"  },
  { name: "DSA",         accuracy: 67, quizzes: 20, color: "bg-orange-500"  },
  { name: "Chemistry",   accuracy: 80, quizzes: 12, color: "bg-green-500"   },
];

/* ─── Study time distribution ────────────────────────────────────────────── */
const TIME_DIST = [
  { label: "Morning (6–10 AM)",    pct: 35 },
  { label: "Afternoon (10–4 PM)", pct: 20 },
  { label: "Evening (4–8 PM)",    pct: 30 },
  { label: "Night (8 PM–12 AM)", pct: 15 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Learning Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">Insights from your study sessions</p>
          </div>
          <Link href="/dashboard" className="text-sm text-brand-500 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Clock,     value: "149h",  label: "Total Study Time", sub: "+12h this week"   },
            { icon: BookOpen,  value: "51",    label: "Chapters Done",    sub: "Across 5 subjects" },
            { icon: Target,    value: "82%",   label: "Average Accuracy", sub: "All quizzes"       },
            { icon: Award,     value: "5",     label: "Badges Earned",    sub: "7 locked"          },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border bg-card p-5 shadow-sm">
              <kpi.icon className="h-5 w-5 text-brand-500 mb-3" />
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs font-medium text-foreground mt-0.5">{kpi.label}</p>
              <p className="text-xs text-muted-foreground">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Monthly hours chart */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm mb-8">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-brand-500" />
            Monthly Study Hours (Last 6 Months)
          </h2>
          <div className="flex items-end gap-3 h-36">
            {MONTHLY_HOURS.map((m) => {
              const heightPct = MAX_HOURS > 0 ? m.hours / MAX_HOURS : 0;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{m.hours}h</span>
                  <div className="w-full rounded-t-lg bg-brand-500/20 overflow-hidden" style={{ height: "100px" }}>
                    <div
                      className="w-full bg-brand-500 rounded-t-lg"
                      style={{
                        height:    `${Math.round(heightPct * 100)}px`,
                        marginTop: `${100 - Math.round(heightPct * 100)}px`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject performance */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Brain className="h-4 w-4 text-brand-500" />
              Quiz Accuracy by Subject
            </h2>
            <div className="space-y-4">
              {SUBJECT_PERF.map((subj) => (
                <div key={subj.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{subj.name}</span>
                    <span className="text-sm font-bold text-foreground">{subj.accuracy}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${subj.color}`}
                      style={{ width: `${subj.accuracy}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{subj.quizzes} quizzes taken</p>
                </div>
              ))}
            </div>
          </div>

          {/* Study time distribution */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-500" />
              When You Study
            </h2>
            <div className="space-y-4">
              {TIME_DIST.map((slot) => (
                <div key={slot.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{slot.label}</span>
                    <span className="text-sm font-bold text-foreground">{slot.pct}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-purple-500"
                      style={{ width: `${slot.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              💡 Your best accuracy is in the morning — try scheduling hard topics then.
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="rounded-2xl border bg-gradient-to-br from-brand-500/10 to-purple-500/10 p-6 shadow-sm">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-brand-500" />
            AI Insights
          </h2>
          <ul className="space-y-3">
            {[
              "Your DSA accuracy (67%) is your weakest area — try the LearnVeda AI Tutor for personalized explanations.",
              "You study best in the morning. Schedule your hardest subject (Physics) before 10 AM.",
              "Your streak is 7 days — keep going to unlock the 'Hot Streak' badge at 30 days.",
              "You've taken 24 Math quizzes with 88% accuracy — you're ready for the CBSE Class 10 Mock Test.",
            ].map((insight, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-brand-500 flex-shrink-0 mt-0.5" />
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
