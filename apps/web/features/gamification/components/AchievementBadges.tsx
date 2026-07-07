/**
 * @file features/gamification/components/AchievementBadges.tsx
 * @description Achievement badges display component for LearnVeda
 * @purpose Shows all achievement badges a user has earned, with unlock conditions
 * @used-by Dashboard achievements page, Profile page, Post-lesson celebration modal
 *
 * Achievement categories:
 *  - Learning: Completing subjects/chapters
 *  - Streak: Maintaining daily streaks
 *  - Battle: Winning live battles
 *  - XP: Reaching XP milestones
 *  - Social: Community engagement
 *  - Special: Platform-wide events
 */

"use client"; // Client component — animated badge reveals

import React, { useState } from "react";          // React + state for filters
import { motion, AnimatePresence } from "framer-motion"; // Animations
import {
  BookOpen, Flame, Sword, Zap, Users, Star,
  Trophy, Target, Code2, Brain, Award,
  CheckCircle2, Lock, Sparkles,
} from "lucide-react";                             // Badge icons
import { Badge }  from "@/components/ui/badge";   // UI badge component
import { cn }     from "@/lib/utils";             // Class merger

/* ─── Achievement Type Definition ───────────────────────────────────────── */
interface Achievement {
  id:          string;     // Unique identifier
  name:        string;     // Display name
  description: string;     // What this badge is for
  icon:        React.ElementType; // Lucide icon component
  category:    "learning" | "streak" | "battle" | "xp" | "social" | "special";
  rarity:      "common" | "uncommon" | "rare" | "epic" | "legendary";
  unlockAt:    string;     // Human-readable unlock condition
  isUnlocked?: boolean;    // Whether the current user has this badge
  unlockedOn?: string;     // Date when it was unlocked (ISO string)
}

/* ─── All Achievement Definitions ───────────────────────────────────────── */
// Full catalog of all badges on the platform. isUnlocked is set per-user from API.
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // ── Learning Achievements ───────────────────────────────────────────
  {
    id: "first-lesson",    name: "First Step",       category: "learning",
    description: "Complete your very first lesson",  rarity: "common",
    icon: BookOpen,        unlockAt: "Complete 1 lesson",
  },
  {
    id: "chapter-master",  name: "Chapter Master",   category: "learning",
    description: "Complete all chapters in any subject", rarity: "uncommon",
    icon: BookOpen,        unlockAt: "Complete all chapters in one subject",
  },
  {
    id: "class-champion",  name: "Class Champion",   category: "learning",
    description: "Complete all subjects in a class", rarity: "rare",
    icon: Award,           unlockAt: "100% completion in Class 9, 10, 11, or 12",
  },
  {
    id: "ncert-master",    name: "NCERT Master",      category: "learning",
    description: "Complete all NCERT chapters across all classes", rarity: "legendary",
    icon: Brain,           unlockAt: "Complete all Class 9–12 subjects",
  },

  // ── Streak Achievements ──────────────────────────────────────────────
  {
    id: "streak-3",        name: "Consistent",        category: "streak",
    description: "Maintain a 3-day learning streak",  rarity: "common",
    icon: Flame,           unlockAt: "3-day streak",
  },
  {
    id: "streak-7",        name: "Week Warrior",       category: "streak",
    description: "Maintain a 7-day learning streak",  rarity: "uncommon",
    icon: Flame,           unlockAt: "7-day streak",
  },
  {
    id: "streak-30",       name: "Iron Will",          category: "streak",
    description: "Maintain a 30-day learning streak", rarity: "rare",
    icon: Flame,           unlockAt: "30-day streak",
  },
  {
    id: "streak-100",      name: "Legend of Discipline", category: "streak",
    description: "100-day unstoppable learning streak", rarity: "legendary",
    icon: Flame,           unlockAt: "100-day streak",
  },

  // ── Battle Achievements ──────────────────────────────────────────────
  {
    id: "first-blood",     name: "First Blood",        category: "battle",
    description: "Win your first live battle",         rarity: "common",
    icon: Sword,           unlockAt: "Win 1 battle",
  },
  {
    id: "battle-10",       name: "10-Win Club",         category: "battle",
    description: "Win 10 live battles",                rarity: "uncommon",
    icon: Sword,           unlockAt: "Win 10 battles",
  },
  {
    id: "battle-50",       name: "Battle Veteran",      category: "battle",
    description: "Win 50 live battles",                rarity: "rare",
    icon: Trophy,          unlockAt: "Win 50 battles",
  },
  {
    id: "perfect-battle",  name: "Flawless Victory",    category: "battle",
    description: "Win a battle with 10/10 correct answers", rarity: "epic",
    icon: Target,          unlockAt: "10/10 correct in one battle",
  },

  // ── XP Achievements ──────────────────────────────────────────────────
  {
    id: "xp-10",           name: "First XP",            category: "xp",
    description: "Earn your first 10 XP",              rarity: "common",
    icon: Zap,             unlockAt: "Earn 10 XP",
  },
  {
    id: "xp-100",          name: "Century",             category: "xp",
    description: "Earn 100 total XP",                  rarity: "common",
    icon: Zap,             unlockAt: "100 XP total",
  },
  {
    id: "xp-1000",         name: "Knowledge Seeker",   category: "xp",
    description: "Earn 1,000 total XP",                rarity: "uncommon",
    icon: Zap,             unlockAt: "1,000 XP total",
  },
  {
    id: "xp-10000",        name: "Scholar Elite",       category: "xp",
    description: "Earn 10,000 total XP",               rarity: "rare",
    icon: Star,            unlockAt: "10,000 XP total",
  },
  {
    id: "level-10",        name: "Practitioner",        category: "xp",
    description: "Reach Level 10",                     rarity: "uncommon",
    icon: Zap,             unlockAt: "Reach Level 10",
  },
  {
    id: "level-50",        name: "Half Century",        category: "xp",
    description: "Reach Level 50",                     rarity: "epic",
    icon: Sparkles,        unlockAt: "Reach Level 50",
  },

  // ── Social Achievements ──────────────────────────────────────────────
  {
    id: "first-post",      name: "Voice of the Community", category: "social",
    description: "Post your first community question",  rarity: "common",
    icon: Users,           unlockAt: "Post 1 community question",
  },
  {
    id: "helpful",         name: "Helpful Senior",      category: "social",
    description: "Get 10 upvotes on your answers",     rarity: "uncommon",
    icon: Users,           unlockAt: "10 upvotes on your answers",
  },

  // ── Special Achievements ──────────────────────────────────────────────
  {
    id: "coder",           name: "Coder",               category: "special",
    description: "Complete any programming track",     rarity: "uncommon",
    icon: Code2,           unlockAt: "Finish any coding track (Python, Java, etc.)",
  },
  {
    id: "event-winner",    name: "Event Champion",      category: "special",
    description: "Win a platform event or hackathon",  rarity: "epic",
    icon: Trophy,          unlockAt: "Win an official LearnVeda event",
  },
];

/* ─── Rarity Color Mapping ───────────────────────────────────────────────── */
/** Returns CSS classes for a badge rarity level */
function rarityStyles(rarity: Achievement["rarity"]) {
  switch (rarity) {
    case "common":    return { border: "border-slate-400/30", bg: "bg-slate-500/10",  text: "text-slate-500",  label: "Common"    };
    case "uncommon":  return { border: "border-green-500/30", bg: "bg-green-500/10",  text: "text-green-600",  label: "Uncommon"  };
    case "rare":      return { border: "border-blue-500/30",  bg: "bg-blue-500/10",   text: "text-blue-600",   label: "Rare"      };
    case "epic":      return { border: "border-purple-500/30",bg: "bg-purple-500/10", text: "text-purple-600", label: "Epic"      };
    case "legendary": return { border: "border-amber-500/30", bg: "bg-amber-500/10",  text: "text-amber-600",  label: "Legendary" };
  }
}

/* ─── Category Labels ────────────────────────────────────────────────────── */
const CATEGORY_LABELS = {
  learning: "📚 Learning",
  streak:   "🔥 Streak",
  battle:   "⚔️ Battle",
  xp:       "⚡ XP",
  social:   "👥 Social",
  special:  "🌟 Special",
};

/* ─── AchievementBadges Props ────────────────────────────────────────────── */
interface AchievementBadgesProps {
  /** Set of unlocked achievement IDs for the current user */
  unlockedIds: Set<string>;
  /** Whether to show locked badges (greyed out) */
  showLocked?: boolean;
  /** Compact grid — smaller cards */
  compact?: boolean;
  /** Custom CSS class */
  className?: string;
}

/* ─── AchievementBadges Component ───────────────────────────────────────── */
/**
 * Renders all achievement badges, split by category with filtering support.
 * Unlocked badges are shown in full color; locked ones are greyed out.
 */
export function AchievementBadges({
  unlockedIds,
  showLocked = true,
  compact = false,
  className,
}: AchievementBadgesProps) {
  const [filter, setFilter] = useState<Achievement["category"] | "all">("all"); // Active filter

  /* ── Filter achievements by category ─────────────────────────────── */
  const filteredAchievements = ALL_ACHIEVEMENTS.filter((a) =>
    filter === "all" || a.category === filter
  );

  const unlockedCount = ALL_ACHIEVEMENTS.filter((a) => unlockedIds.has(a.id)).length; // Earned count

  return (
    <div className={cn("space-y-5", className)}>
      {/* ── Header: total count ───────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Achievements
        </h3>
        <span className="text-sm text-muted-foreground">
          {unlockedCount} / {ALL_ACHIEVEMENTS.length} earned
        </span>
      </div>

      {/* ── Category filter pills ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {/* "All" pill */}
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors border",
            filter === "all"
              ? "bg-brand-500 text-white border-brand-500"
              : "border-border text-muted-foreground hover:border-brand-500/50",
          )}
        >
          All ({ALL_ACHIEVEMENTS.length})
        </button>

        {/* Category pills */}
        {(Object.keys(CATEGORY_LABELS) as Achievement["category"][]).map((cat) => {
          const count = ALL_ACHIEVEMENTS.filter((a) => a.category === cat && unlockedIds.has(a.id)).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors border",
                filter === cat
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border text-muted-foreground hover:border-brand-500/50",
              )}
            >
              {CATEGORY_LABELS[cat]} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Achievement grid ──────────────────────────────────────── */}
      <div className={cn(
        "grid gap-3",
        compact
          ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-6"  // Compact: small icons
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",  // Normal: card layout
      )}>
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement, index) => {
            const isUnlocked = unlockedIds.has(achievement.id); // Is this badge earned?
            if (!showLocked && !isUnlocked) return null;         // Skip locked if hidden

            const rarity  = rarityStyles(achievement.rarity);   // Get rarity styles
            const Icon    = achievement.icon;                    // Badge icon component

            return (
              <motion.div
                key={achievement.id}
                layout                                           // Smooth reordering
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "relative rounded-xl border p-4 transition-all",
                  isUnlocked
                    ? cn(rarity.border, rarity.bg, "hover:shadow-md")  // Unlocked: colorful
                    : "border-border/50 bg-muted/20 opacity-50",        // Locked: dim
                  compact && "p-2",                                      // Compact: less padding
                )}
              >
                {/* Compact mode: just icon */}
                {compact ? (
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      isUnlocked ? rarity.bg : "bg-muted",
                    )}>
                      {isUnlocked
                        ? <Icon className={cn("h-5 w-5", rarity.text)} />
                        : <Lock className="h-4 w-4 text-muted-foreground" />
                      }
                    </div>
                    <span className="text-xs text-center leading-tight text-muted-foreground truncate w-full">
                      {achievement.name}
                    </span>
                  </div>
                ) : (
                  /* Full card mode */
                  <div className="flex items-start gap-3">
                    {/* Icon container */}
                    <div className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                      isUnlocked ? cn(rarity.bg, rarity.border) : "bg-muted border-border/50",
                    )}>
                      {isUnlocked
                        ? <Icon className={cn("h-6 w-6", rarity.text)} />     // Colored icon
                        : <Lock className="h-5 w-5 text-muted-foreground" />  // Lock icon
                      }
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-foreground truncate">
                          {achievement.name}
                        </span>
                        {/* Rarity badge */}
                        <span className={cn(
                          "shrink-0 rounded-full px-1.5 py-0.5 text-xs border",
                          rarity.border, rarity.bg, rarity.text,
                        )}>
                          {rarity.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {isUnlocked
                          ? achievement.description   // Show desc when unlocked
                          : achievement.unlockAt      // Show unlock condition when locked
                        }
                      </p>
                    </div>

                    {/* Unlocked checkmark */}
                    {isUnlocked && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
