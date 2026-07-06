/**
 * @file app/(platform)/dashboard/achievements/page.tsx
 * @description Achievements & badges page
 * Route: /dashboard/achievements
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Lock, CheckCircle2, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "Achievements — LearnVeda",
  description: "View all your earned badges and upcoming achievements on LearnVeda.",
  robots:      { index: false, follow: false },
};

/* ─── Achievement data ───────────────────────────────────────────────────── */
const ACHIEVEMENTS = [
  {
    id: "first_login",     emoji: "🎉", title: "Welcome!",
    desc: "Joined LearnVeda",           category: "Milestones",
    earned: true,          earnedOn: "June 1, 2025",
  },
  {
    id: "streak_7",        emoji: "🔥", title: "Hot Streak",
    desc: "7-day learning streak",      category: "Streaks",
    earned: true,          earnedOn: "June 8, 2025",
  },
  {
    id: "first_chapter",   emoji: "📖", title: "First Step",
    desc: "Complete your first chapter", category: "Learning",
    earned: true,          earnedOn: "June 1, 2025",
  },
  {
    id: "battle_first",    emoji: "⚔️", title: "First Blood",
    desc: "Win your first live battle",  category: "Battles",
    earned: true,          earnedOn: "June 5, 2025",
  },
  {
    id: "quiz_perfect",    emoji: "💯", title: "Perfect Score",
    desc: "Score 100% on a quiz",        category: "Quizzes",
    earned: true,          earnedOn: "June 10, 2025",
  },
  {
    id: "streak_30",       emoji: "🌟", title: "Unstoppable",
    desc: "30-day learning streak",      category: "Streaks",
    earned: false,
  },
  {
    id: "top_leaderboard", emoji: "🏆", title: "Top 10",
    desc: "Reach top 10 on leaderboard", category: "Competitive",
    earned: false,
  },
  {
    id: "battle_10",       emoji: "🛡️", title: "Battle Veteran",
    desc: "Win 10 live battles",         category: "Battles",
    earned: false,
  },
  {
    id: "course_complete", emoji: "🎓", title: "Course Master",
    desc: "Complete an entire course",   category: "Learning",
    earned: false,
  },
  {
    id: "helper",          emoji: "🤝", title: "Community Helper",
    desc: "Get 10 upvotes on community posts", category: "Community",
    earned: false,
  },
  {
    id: "streak_100",      emoji: "💎", title: "Diamond Streak",
    desc: "100-day learning streak",     category: "Streaks",
    earned: false,
  },
  {
    id: "all_subjects",    emoji: "🌐", title: "Polymath",
    desc: "Study 5 different subjects",  category: "Milestones",
    earned: false,
  },
];

const CATEGORIES = ["All", "Milestones", "Streaks", "Learning", "Battles", "Quizzes", "Competitive", "Community"];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function AchievementsPage() {
  const earned = ACHIEVEMENTS.filter((a) => a.earned).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {earned} of {ACHIEVEMENTS.length} badges earned
            </p>
          </div>
          <Link href="/dashboard" className="text-sm text-brand-500 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
          {[
            { icon: Trophy,        value: earned,                    label: "Earned"    },
            { icon: Lock,          value: ACHIEVEMENTS.length-earned, label: "Locked"  },
            { icon: Star,          value: earned * 100,              label: "Badge XP"  },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-4 text-center shadow-sm">
              <stat.icon className="h-5 w-5 text-brand-500 mx-auto mb-1.5" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`rounded-2xl border p-5 text-center shadow-sm transition-all ${
                achievement.earned
                  ? "bg-card hover:shadow-md"
                  : "bg-muted/30 opacity-60"
              }`}
            >
              {/* Emoji */}
              <div className="relative inline-block mb-3">
                <span className={`text-4xl block ${!achievement.earned ? "grayscale" : ""}`}>
                  {achievement.emoji}
                </span>
                {achievement.earned && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 absolute -bottom-1 -right-1 bg-background rounded-full" />
                )}
                {!achievement.earned && (
                  <Lock className="h-4 w-4 text-muted-foreground absolute -bottom-1 -right-1 bg-background rounded-full" />
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-foreground text-sm">{achievement.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{achievement.desc}</p>

              {/* Badge */}
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">{achievement.category}</Badge>
              </div>

              {/* Earned date */}
              {achievement.earned && achievement.earnedOn && (
                <p className="text-xs text-muted-foreground mt-2">{achievement.earnedOn}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
