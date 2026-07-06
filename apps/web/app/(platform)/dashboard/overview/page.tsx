/**
 * @file app/(platform)/dashboard/overview/page.tsx
 * @description Dashboard Overview — main student home after login
 * Route: /dashboard/overview (also accessible at /dashboard)
 *
 * Shows:
 *   - Welcome greeting with streak and XP
 *   - Daily study goal progress
 *   - Continue where you left off (last chapter)
 *   - Today's recommended lessons
 *   - Quick stats (chapters, battles, rank)
 *   - Recent community activity
 *   - Upcoming events
 *
 * Server component with real-time client widgets injected via Suspense.
 * In production: data fetched from MongoDB via /api/dashboard/overview
 */

import type { Metadata } from "next"; // SEO
import Link              from "next/link"; // Navigation
import {
  Flame, Star, Trophy, BookOpen, Code2, Zap,
  Target, ChevronRight, Play, ArrowRight,
  Clock, Calendar, TrendingUp, Bell,
  CheckCircle2, Lock, FlaskConical,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Dashboard — LearnVeda",
  description: "Your personalized learning dashboard. Track progress, continue lessons, and compete.",
  robots: { index: false, follow: false }, // Private page
};

/* ─── Demo Dashboard Data ────────────────────────────────────────────────── */
// In production: fetched from /api/dashboard/overview?userId=...
const DASHBOARD_DATA = {
  user: {
    name:           "Aarav",       // First name for greeting
    level:          12,             // Current XP level
    tier:           "Silver",       // Current tier
    xp:             24780,          // Total XP
    xpToNextLevel:  25000,          // XP needed for next level
    streak:         7,              // Current daily streak
    longestStreak:  14,             // Personal best streak
    rank:           892,            // Global rank
    studyGoal:      30,             // Daily goal (minutes)
    studiedToday:   18,             // Minutes studied today
  },
  continueLearning: {
    type:    "chapter" as const,
    title:   "Chapter 3 — Atoms and Molecules",
    subject: "Class 9 · Science",
    progress: 45, // Percent complete
    href:     "/learn/class-9/science/chapter-03",
    icon:     FlaskConical,
  },
  todaysLessons: [
    { id:"t-1", title:"Polynomials — Day 8 Practice", type:"quiz",     subject:"Class 9 Mathematics", href:"/learn/class-9/mathematics/chapter-02", xp:30, done:false },
    { id:"t-2", title:"Python Day 12 — Functions",   type:"lesson",   subject:"Python Track",         href:"/programming/python/day-12",             xp:50, done:true  },
    { id:"t-3", title:"Force & Motion Simulation",    type:"sim",      subject:"Physics · Class 9",    href:"/simulations/physics/force-motion",      xp:20, done:false },
    { id:"t-4", title:"DSA Day 4 — Sliding Window",  type:"lesson",   subject:"DSA Track",            href:"/core-cs/dsa/day-4",                     xp:50, done:false },
  ],
  stats: {
    chaptersCompleted: 47,
    battlesWon:        12,
    simulations:       8,
    studyHoursTotal:   94,
  },
  recentActivity: [
    { text:"Completed Chapter 2 — Polynomials",           time:"2 hours ago",  type:"chapter"  },
    { text:"Won a battle against PriyaSharma",             time:"5 hours ago",  type:"battle"   },
    { text:"Earned 'Week Warrior' badge",                  time:"Yesterday",    type:"badge"    },
    { text:"Answered a community question",                time:"2 days ago",   type:"community"},
  ],
  upcomingEvents: [
    { title:"Code Sprint DSA Challenge", date:"Today — LIVE NOW!", href:"/events", urgent:true },
    { title:"Science Olympiad 2026",     date:"July 20, 2026",     href:"/events", urgent:false },
  ],
};

/* ─── Lesson type icons + colors ─────────────────────────────────────────── */
const lessonTypeConfig = {
  quiz:    { icon: Target,      color: "bg-blue-500/10 text-blue-600" },
  lesson:  { icon: BookOpen,    color: "bg-green-500/10 text-green-600" },
  sim:     { icon: FlaskConical,color: "bg-purple-500/10 text-purple-600" },
  battle:  { icon: Zap,         color: "bg-red-500/10 text-red-600" },
};

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function DashboardOverviewPage() {
  const d = DASHBOARD_DATA; // Alias for readability

  /* XP progress percent */
  const xpProgress = Math.min(100, Math.round((d.user.xp / d.user.xpToNextLevel) * 100));
  /* Daily goal progress */
  const goalProgress = Math.min(100, Math.round((d.user.studiedToday / d.user.studyGoal) * 100));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── Welcome Header ────────────────────────────────────────── */}
        <section>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Good morning, {d.user.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                You&apos;re on a <strong className="text-orange-500">{d.user.streak}-day streak</strong> 🔥
                — keep it going!
              </p>
            </div>
            {/* Quick XP + level display */}
            <div className="rounded-xl border border-border/40 bg-card px-5 py-3 text-center min-w-[140px]">
              <div className="flex items-center gap-2 justify-center">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-bold text-xl">Lv.{d.user.level}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full mt-2 overflow-hidden w-24 mx-auto">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${xpProgress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{d.user.xp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* Daily goal progress */}
          <div className="mt-4 rounded-xl border border-border/40 bg-card p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Target className="h-4 w-4 text-brand-500" />
                Today&apos;s Goal: {d.user.studyGoal} minutes
              </span>
              <span className="text-muted-foreground">{d.user.studiedToday}/{d.user.studyGoal} min ({goalProgress}%)</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${goalProgress >= 100 ? "bg-green-500" : "bg-brand-500"}`}
                style={{ width: `${goalProgress}%` }}
              />
            </div>
            {goalProgress >= 100 && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Daily goal reached! Bonus XP earned.
              </p>
            )}
          </div>
        </section>

        {/* ── Quick Stats ───────────────────────────────────────────── */}
        <section aria-label="Quick statistics">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label:"Chapters Done",   value:d.stats.chaptersCompleted, icon:BookOpen, color:"text-blue-500",    href:"/dashboard/progress" },
              { label:"Battles Won",     value:d.stats.battlesWon,        icon:Zap,      color:"text-purple-500",  href:"/live-battles" },
              { label:"Simulations",     value:d.stats.simulations,       icon:FlaskConical, color:"text-green-500", href:"/simulations" },
              { label:"Global Rank",     value:`#${d.user.rank}`,         icon:Trophy,   color:"text-yellow-500",  href:"/leaderboard" },
            ].map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="rounded-xl border border-border/40 bg-card p-5 hover:border-border/80 hover:shadow-md transition-all group"
              >
                <stat.icon className={`h-6 w-6 ${stat.color} mb-3`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Two column layout ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Continue Learning + Today's Lessons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue where you left off */}
            <section aria-labelledby="continue-heading">
              <h2 id="continue-heading" className="text-lg font-bold mb-3">Continue Learning</h2>
              <Link
                href={d.continueLearning.href}
                className="group flex items-center gap-4 rounded-xl border border-border/40 bg-card p-5 hover:border-brand-500/40 hover:shadow-md transition-all"
              >
                <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <d.continueLearning.icon className="h-6 w-6 text-brand-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-brand-500 transition-colors">
                    {d.continueLearning.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{d.continueLearning.subject}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 bg-muted rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${d.continueLearning.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.continueLearning.progress}%</span>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-brand-500 text-white group-hover:scale-110 transition-transform">
                  <Play className="h-4 w-4" />
                </div>
              </Link>
            </section>

            {/* Today's recommended lessons */}
            <section aria-labelledby="today-heading">
              <div className="flex items-center justify-between mb-3">
                <h2 id="today-heading" className="text-lg font-bold">Today&apos;s Plan</h2>
                <Badge variant="secondary" className="text-xs">
                  {d.todaysLessons.filter((l) => l.done).length}/{d.todaysLessons.length} done
                </Badge>
              </div>
              <div className="space-y-3">
                {d.todaysLessons.map((lesson) => {
                  const config = lessonTypeConfig[lesson.type as keyof typeof lessonTypeConfig];
                  return (
                    <Link
                      key={lesson.id}
                      href={lesson.href}
                      className={`flex items-center gap-4 rounded-xl border bg-card p-4 hover:border-border/80 transition-all group ${
                        lesson.done ? "border-green-500/20 opacity-75" : "border-border/40"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${config.color} shrink-0`}>
                        <config.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium leading-tight group-hover:text-brand-500 transition-colors ${lesson.done ? "line-through text-muted-foreground" : ""}`}>
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{lesson.subject}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {lesson.done ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1 text-yellow-500" />+{lesson.xp} XP
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right column: Events + Activity */}
          <div className="space-y-6">
            {/* Upcoming events */}
            <section aria-labelledby="events-heading">
              <h2 id="events-heading" className="text-lg font-bold mb-3">Events</h2>
              <div className="space-y-3">
                {d.upcomingEvents.map((event) => (
                  <Link
                    key={event.title}
                    href={event.href}
                    className={`block rounded-xl border p-4 hover:shadow-md transition-all ${
                      event.urgent ? "border-red-500/30 bg-red-500/5" : "border-border/40 bg-card"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Calendar className={`h-4 w-4 shrink-0 mt-0.5 ${event.urgent ? "text-red-500" : "text-muted-foreground"}`} />
                      <div>
                        <p className="text-sm font-medium leading-tight">{event.title}</p>
                        <p className={`text-xs mt-0.5 ${event.urgent ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
                          {event.date}
                        </p>
                      </div>
                      {event.urgent && (
                        <Badge className="ml-auto text-xs bg-red-500 text-white border-0 shrink-0">LIVE</Badge>
                      )}
                    </div>
                  </Link>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full gap-1.5">
                  <Link href="/events">All Events <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </section>

            {/* Recent activity */}
            <section aria-labelledby="activity-heading">
              <h2 id="activity-heading" className="text-lg font-bold mb-3">Recent Activity</h2>
              <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
                {d.recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border-b border-border/20 last:border-0">
                    <div className="h-2 w-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-sm">{item.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3" />{item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick actions */}
            <section aria-label="Quick actions">
              <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label:"AI Tutor",    href:"/ai-tutor",     icon:Star,      color:"bg-purple-500/10" },
                  { label:"Compiler",   href:"/compiler",     icon:Code2,     color:"bg-blue-500/10" },
                  { label:"Leaderboard",href:"/leaderboard",  icon:Trophy,    color:"bg-yellow-500/10" },
                  { label:"Community",  href:"/community",    icon:Bell,      color:"bg-green-500/10" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className={`rounded-xl border border-border/40 ${action.color} p-4 text-center hover:border-border/80 hover:shadow-md transition-all group`}
                  >
                    <action.icon className="h-5 w-5 mx-auto mb-1.5 text-muted-foreground group-hover:text-brand-500" />
                    <p className="text-xs font-medium">{action.label}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
