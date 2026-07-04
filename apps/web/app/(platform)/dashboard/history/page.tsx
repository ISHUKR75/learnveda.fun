/**
 * @file app/(platform)/dashboard/history/page.tsx
 * @description Full learning history — every chapter, lesson, quiz, and battle
 * Route: /dashboard/history
 * Shows: Chronological log of all user learning activities with XP
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  History, ChevronRight, BookOpen, Trophy, Star,
  Target, Zap, Filter, Clock, ArrowRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Learning History — Dashboard | LearnVeda",
  description: "Your complete learning history on LearnVeda — every chapter, battle, and quiz.",
  robots: { index: false, follow: false },
};

/* ─── History Activity Data ──────────────────────────────────────────────── */
// In production, paginated from MongoDB activity_log collection (reverse-chronological)
const HISTORY_GROUPS = [
  {
    date: "Today — July 4, 2026",
    items: [
      { type:"chapter",  icon:BookOpen, desc:"Completed Newton's Laws of Motion (Class 9 Science)",   xp:+30, time:"2:45 PM", href:"/learn/class-9/science/chapter-08" },
      { type:"quiz",     icon:Target,   desc:"Practice Quiz — Force & Laws · Score: 92%",             xp:+20, time:"3:30 PM", href:"/practice"    },
      { type:"lesson",   icon:Zap,      desc:"Python Day 15 — List Comprehensions",                   xp:+25, time:"7:15 PM", href:"/programming/python/day-15" },
    ],
  },
  {
    date: "Yesterday — July 3, 2026",
    items: [
      { type:"battle",   icon:Trophy,   desc:"Won DSA Battle vs ankit_coder99 (Arrays)",              xp:+50, time:"6:00 PM", href:"/live-battles" },
      { type:"chapter",  icon:BookOpen, desc:"Completed Gravitation (Class 9 Science)",               xp:+30, time:"8:30 PM", href:"/learn/class-9/science/chapter-09" },
      { type:"quiz",     icon:Target,   desc:"Practice Quiz — Motion · Score: 88%",                  xp:+15, time:"9:00 PM", href:"/practice"    },
    ],
  },
  {
    date: "July 2, 2026",
    items: [
      { type:"chapter",  icon:BookOpen, desc:"Completed Work and Energy (Class 9 Science)",           xp:+30, time:"5:00 PM", href:"/learn/class-9/science/chapter-10" },
      { type:"lesson",   icon:Zap,      desc:"Python Day 14 — Higher Order Functions",               xp:+25, time:"7:00 PM", href:"/programming/python/day-14" },
    ],
  },
  {
    date: "July 1, 2026",
    items: [
      { type:"chapter",  icon:BookOpen, desc:"Completed Heron's Formula (Class 9 Maths)",            xp:+30, time:"4:00 PM", href:"/learn/class-9/mathematics/chapter-12" },
      { type:"battle",   icon:Trophy,   desc:"Won DSA Battle vs priya_algo (Strings)",               xp:+50, time:"6:30 PM", href:"/live-battles" },
      { type:"achievement",icon:Star,   desc:"Achievement Unlocked: Week Warrior (7-day streak)",    xp:+100,time:"11:59 PM",href:"/dashboard/achievements" },
    ],
  },
];

/* ─── Type Config ────────────────────────────────────────────────────────── */
const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  chapter:     { label:"Chapter",    color:"text-blue-600",   bg:"bg-blue-500/10 border-blue-500/20"    },
  lesson:      { label:"Lesson",     color:"text-cyan-600",   bg:"bg-cyan-500/10 border-cyan-500/20"    },
  quiz:        { label:"Quiz",       color:"text-amber-600",  bg:"bg-amber-500/10 border-amber-500/20"  },
  battle:      { label:"Battle",     color:"text-purple-600", bg:"bg-purple-500/10 border-purple-500/20"},
  achievement: { label:"Achievement",color:"text-green-600",  bg:"bg-green-500/10 border-green-500/20"  },
};

/* ─── History Page Component ─────────────────────────────────────────────── */
export default function HistoryPage() {
  const totalXP = HISTORY_GROUPS.flatMap((g) => g.items).reduce((acc, i) => acc + i.xp, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">History</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-muted border flex items-center justify-center">
                <History className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Learning History</h1>
                <p className="text-sm text-muted-foreground">
                  +{totalXP} XP earned in the last 4 days
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* ── History Timeline ──────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-3xl space-y-8">
        {HISTORY_GROUPS.map((group) => (
          <section key={group.date}>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-muted-foreground">{group.date}</h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                +{group.items.reduce((a, i) => a + i.xp, 0)} XP
              </span>
            </div>

            <div className="space-y-2 pl-7">
              {group.items.map((item, i) => {
                const config = TYPE_CONFIG[item.type];
                const Icon   = item.icon;

                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="group flex items-center gap-4 rounded-xl border bg-card hover:shadow-sm transition-all p-3"
                  >
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm group-hover:text-primary transition-colors line-clamp-1">{item.desc}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`text-[9px] py-0 ${config.bg} ${config.color}`}>{config.label}</Badge>
                      <Badge className="text-[9px] py-0 bg-amber-500/10 text-amber-600 border-amber-500/20">
                        +{item.xp} XP
                      </Badge>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Load more */}
        <div className="text-center">
          <Button variant="outline" size="sm">Load More History</Button>
        </div>
      </div>
    </div>
  );
}
