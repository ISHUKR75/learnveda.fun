/**
 * @file app/(platform)/dashboard/achievements/page.tsx
 * @description Student achievements and badges page
 * Route: /dashboard/achievements
 * Shows all earned and locked achievements, badges, and milestones
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy, ChevronRight, Star, Flame, Zap,
  BookOpen, Target, Award, Lock, CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Achievements — Dashboard | LearnVeda",
  description: "Your achievements, badges, and milestones on LearnVeda.",
  robots: { index: false, follow: false },
};

/* ─── Achievement Data ───────────────────────────────────────────────────── */
// All achievements with earned status — in production fetched from MongoDB
const ACHIEVEMENTS = [
  // ── Streak Achievements
  { id: "streak-3",    emoji: "🔥",  name: "On Fire",         desc: "3-day study streak",         xp: 50,  earned: true,  category: "Streaks"      },
  { id: "streak-7",    emoji: "🔥",  name: "Week Warrior",    desc: "7-day study streak",         xp: 100, earned: true,  category: "Streaks"      },
  { id: "streak-30",   emoji: "🔥",  name: "Month Master",    desc: "30-day study streak",        xp: 500, earned: false, category: "Streaks"      },
  { id: "streak-100",  emoji: "🏅",  name: "Centurion",       desc: "100-day study streak",       xp: 2000,earned: false, category: "Streaks"      },
  // ── Learning Achievements
  { id: "first-lesson",emoji: "📚",  name: "First Step",      desc: "Complete your first chapter",xp: 10,  earned: true,  category: "Learning"     },
  { id: "chapters-10", emoji: "📖",  name: "Bookworm",        desc: "Complete 10 chapters",       xp: 100, earned: true,  category: "Learning"     },
  { id: "chapters-50", emoji: "🎓",  name: "Scholar",         desc: "Complete 50 chapters",       xp: 300, earned: false, category: "Learning"     },
  { id: "chapters-100",emoji: "🏛️", name: "Grand Scholar",   desc: "Complete 100 chapters",      xp: 1000,earned: false, category: "Learning"     },
  // ── Battle Achievements
  { id: "first-battle",emoji: "⚔️",  name: "First Battle",    desc: "Win your first live battle", xp: 50,  earned: true,  category: "Battles"      },
  { id: "battles-10",  emoji: "🏆",  name: "Gladiator",       desc: "Win 10 live battles",        xp: 200, earned: false, category: "Battles"      },
  { id: "battles-50",  emoji: "👑",  name: "Champion",        desc: "Win 50 live battles",        xp: 1000,earned: false, category: "Battles"      },
  // ── XP Milestones
  { id: "xp-1000",     emoji: "⭐",  name: "Rising Star",     desc: "Earn 1,000 XP",             xp: 100, earned: true,  category: "XP"           },
  { id: "xp-5000",     emoji: "💫",  name: "Star Player",     desc: "Earn 5,000 XP",             xp: 300, earned: false, category: "XP"           },
  { id: "xp-25000",    emoji: "✨",  name: "Legend",          desc: "Earn 25,000 XP",            xp: 2000,earned: false, category: "XP"           },
  // ── Special
  { id: "first-sim",   emoji: "⚡",  name: "Lab Rat",         desc: "Complete a physics simulation",xp:30, earned: true,  category: "Special"      },
  { id: "perfect-quiz",emoji: "💯",  name: "Perfect Score",   desc: "Get 100% on any quiz",       xp: 200, earned: false, category: "Special"      },
  { id: "community",   emoji: "🤝",  name: "Community Star",  desc: "Post 5 answers in community",xp: 100, earned: false, category: "Special"      },
];

// Group achievements by category
const categories = [...new Set(ACHIEVEMENTS.map((a) => a.category))];
const earnedCount = ACHIEVEMENTS.filter((a) => a.earned).length;

/* ─── Achievements Page Component ───────────────────────────────────────── */
export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-amber-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Achievements</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Achievements</h1>
                <p className="text-sm text-muted-foreground">
                  {earnedCount} of {ACHIEVEMENTS.length} earned
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-amber-500">{Math.round((earnedCount / ACHIEVEMENTS.length) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Completion</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              style={{ width: `${(earnedCount / ACHIEVEMENTS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Achievements by Category ──────────────────────────────────────── */}
      <div className="container px-4 py-8 space-y-8">
        {categories.map((category) => {
          const catAchievements = ACHIEVEMENTS.filter((a) => a.category === category);
          const catEarned       = catAchievements.filter((a) => a.earned).length;

          return (
            <section key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-semibold">{category}</h2>
                <Badge variant="outline" className="text-xs">
                  {catEarned}/{catAchievements.length} earned
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {catAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`relative rounded-2xl border p-4 text-center transition-all ${
                      achievement.earned
                        ? "bg-card shadow-sm hover:shadow-md"
                        : "bg-muted/30 opacity-60"
                    }`}
                  >
                    {/* Lock overlay for unearned */}
                    {!achievement.earned && (
                      <div className="absolute top-2 right-2">
                        <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                      </div>
                    )}

                    {/* Earned checkmark */}
                    {achievement.earned && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      </div>
                    )}

                    {/* Achievement emoji */}
                    <div className={`text-3xl mb-2 ${achievement.earned ? "" : "grayscale"}`}>
                      {achievement.emoji}
                    </div>

                    {/* Name + description */}
                    <div className="font-semibold text-sm mb-1">{achievement.name}</div>
                    <div className="text-[11px] text-muted-foreground mb-2">{achievement.desc}</div>

                    {/* XP reward */}
                    <Badge
                      className={`text-[10px] ${achievement.earned
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                        : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Star className="h-2.5 w-2.5 mr-0.5" />
                      +{achievement.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
