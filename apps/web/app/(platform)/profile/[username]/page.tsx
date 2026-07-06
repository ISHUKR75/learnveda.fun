/**
 * @file app/(platform)/profile/[username]/page.tsx
 * @description Public user profile page
 * Route: /profile/[username]  (e.g. /profile/ArjunNair)
 *
 * Shows:
 *   - User avatar, name, level, tier, streak
 *   - XP progress bar (current → next level)
 *   - Achievement badges
 *   - 52-week learning activity heatmap
 *   - Learning stats: chapters completed, battles won, study hours
 *   - Current learning tracks
 *
 * Server component — publicly accessible (if user has public profile enabled)
 * In production: fetched from /api/profile/[username]
 */

import type { Metadata } from "next"; // SEO
import { notFound }      from "next/navigation"; // 404
import Link              from "next/link"; // Navigation
import {
  Flame, Star, Trophy, Zap, BookOpen, Target,
  ChevronRight, Shield, Award, Clock,
  Calendar, Code2, Globe,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Demo Profile Data ──────────────────────────────────────────────────── */
// In production: fetched from MongoDB via /api/profile/[username]
const DEMO_PROFILES: Record<string, {
  username:       string;
  displayName:    string;
  bio:            string;
  avatar:         string;
  joinedAt:       string;
  level:          number;
  tier:           string;
  xp:             number;
  xpToNextLevel:  number;
  streak:         number;
  longestStreak:  number;
  chaptersCompleted: number;
  battlesWon:     number;
  battleWinRate:  string;
  studyHours:     number;
  rank:           number;
  country:        string;
  tracks:         string[];
  badges:         { name: string; icon: string; earnedAt: string }[];
}> = {
  "arjun-nair": {
    username:          "ArjunNair",
    displayName:       "Arjun Nair",
    bio:               "Engineering student at IIT Delhi. Preparing for GATE and placements. DSA fanatic 🚀",
    avatar:            "AN",
    joinedAt:          "January 2026",
    level:             87,
    tier:              "Diamond",
    xp:                730850,
    xpToNextLevel:     769600,
    streak:            142,
    longestStreak:     198,
    chaptersCompleted: 247,
    battlesWon:        89,
    battleWinRate:     "71%",
    studyHours:        840,
    rank:              1,
    country:           "🇮🇳",
    tracks:            ["Engineering", "DSA", "System Design", "Python"],
    badges: [
      { name: "Grandmaster",  icon: "👑", earnedAt: "May 2026" },
      { name: "Iron Will",    icon: "🔥", earnedAt: "June 2026" },
      { name: "First Blood",  icon: "⚔️", earnedAt: "Jan 2026" },
      { name: "Scholar Elite", icon: "🔴", earnedAt: "Mar 2026" },
      { name: "10-Win Club",  icon: "🏆", earnedAt: "Feb 2026" },
      { name: "Week Warrior", icon: "🔥", earnedAt: "Feb 2026" },
    ],
  },
};

/* ─── Dynamic Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const profile = DEMO_PROFILES[username.toLowerCase()];
  if (!profile) return { title: "Profile Not Found — LearnVeda" };

  return {
    title: `${profile.displayName} — LearnVeda Profile`,
    description: `${profile.displayName}'s learning profile. Level ${profile.level} ${profile.tier}. ${profile.chaptersCompleted} chapters completed, ${profile.battlesWon} battles won.`,
    openGraph: {
      title:       `${profile.displayName} — LearnVeda`,
      description: profile.bio,
      type:        "profile",
    },
  };
}

/* ─── Activity Heatmap ───────────────────────────────────────────────────── */
/** Renders a 52-week GitHub-style activity heatmap */
function ActivityHeatmap() {
  /* Generate 52 weeks × 7 days of random activity data */
  const weeks = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)) // 0–4 intensity levels
  );

  /* Color mapping for activity intensity */
  const intensityColor = (level: number): string => {
    switch (level) {
      case 0: return "bg-muted/40 dark:bg-gray-800";        // No activity
      case 1: return "bg-green-900/80";                     // Light activity
      case 2: return "bg-green-700";                        // Moderate
      case 3: return "bg-green-500";                        // Active
      case 4: return "bg-green-400";                        // Highly active
      default: return "bg-muted/40";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px] min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                className={`h-3 w-3 rounded-sm ${intensityColor(day)}`}
                title={`${day * 3} questions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className={`h-3 w-3 rounded-sm ${
            l === 0 ? "bg-muted/40 dark:bg-gray-800" :
            l === 1 ? "bg-green-900/80" :
            l === 2 ? "bg-green-700" :
            l === 3 ? "bg-green-500" :
            "bg-green-400"
          }`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

/* ─── XP Progress Bar ────────────────────────────────────────────────────── */
function XPBar({ xp, xpToNext, level }: { xp: number; xpToNext: number; level: number }) {
  /* Calculate XP threshold for current level using the quadratic formula */
  const xpAtCurrentLevel = 100 * (level - 1) * (level - 1); // XP to REACH current level
  const xpInCurrentLevel = xp - xpAtCurrentLevel;           // XP earned WITHIN current level
  const xpNeeded         = xpToNext - xpAtCurrentLevel;     // XP gap between levels
  const progressPercent  = Math.min(100, (xpInCurrentLevel / xpNeeded) * 100);

  /* Dynamic color: blue → green (>80%) → gold (100%) */
  const barColor = progressPercent >= 80 ? "bg-green-500" : progressPercent >= 95 ? "bg-yellow-400" : "bg-brand-500";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Level {level}</span>
        <span className="font-mono text-muted-foreground">{xpInCurrentLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP</span>
        <span className="text-muted-foreground">Level {level + 1}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Tier Color ─────────────────────────────────────────────────────────── */
function tierGradient(tier: string): string {
  switch (tier.toLowerCase()) {
    case "diamond":  return "from-cyan-400 to-blue-500";
    case "platinum": return "from-slate-400 to-slate-500";
    case "gold":     return "from-yellow-400 to-amber-500";
    case "silver":   return "from-gray-300 to-gray-400";
    default:         return "from-orange-600 to-amber-700"; // bronze
  }
}

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = DEMO_PROFILES[username.toLowerCase()];

  if (!profile) notFound(); // 404 if user doesn't exist

  /* XP progress calculation */
  const xpAtCurrent = 100 * (profile.level - 1) * (profile.level - 1);
  const progressPercent = Math.min(100, ((profile.xp - xpAtCurrent) / (profile.xpToNextLevel - xpAtCurrent)) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{profile.displayName}</span>
          </nav>

          {/* Profile header */}
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${tierGradient(profile.tier)} flex items-center justify-center text-white font-bold text-3xl shrink-0 ring-4 ring-offset-2 ring-offset-background ring-brand-500/20`}>
              {profile.avatar}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">{profile.country} {profile.displayName}</h1>
                <Badge variant="outline" className={`bg-gradient-to-r ${tierGradient(profile.tier)} text-white border-0 text-xs`}>
                  {profile.tier}
                </Badge>
                {profile.rank <= 10 && (
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 text-xs">
                    <Trophy className="h-3 w-3 mr-1" /> Rank #{profile.rank}
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground text-sm mt-1">{profile.bio}</p>

              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined {profile.joinedAt}</span>
                <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> India</span>
              </div>

              {/* Level + XP bar */}
              <div className="mt-4 w-full max-w-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-bold">Level {profile.level}</span>
                  <span className="text-muted-foreground text-sm">— {profile.xp.toLocaleString()} total XP</span>
                </div>
                <XPBar xp={profile.xp} xpToNext={profile.xpToNextLevel} level={profile.level} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Current Streak", value: `${profile.streak} days`,           icon: Flame,   color: "text-orange-500" },
            { label: "Longest Streak", value: `${profile.longestStreak} days`,    icon: Target,  color: "text-brand-500" },
            { label: "Chapters Done",  value: profile.chaptersCompleted,          icon: BookOpen, color: "text-green-500" },
            { label: "Study Hours",    value: `${profile.studyHours}h`,           icon: Clock,   color: "text-purple-500" },
            { label: "Battles Won",    value: profile.battlesWon,                 icon: Zap,     color: "text-yellow-500" },
            { label: "Win Rate",       value: profile.battleWinRate,              icon: Trophy,  color: "text-red-500" },
            { label: "Total XP",       value: `${(profile.xp / 1000).toFixed(0)}K`, icon: Star, color: "text-blue-500" },
            { label: "Global Rank",    value: `#${profile.rank}`,                  icon: Shield,  color: "text-pink-500" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border/40 bg-card p-4 text-center">
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-1`} />
              <p className="font-bold text-lg leading-none">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <section aria-labelledby="badges-heading">
          <h2 id="badges-heading" className="text-lg font-bold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievements ({profile.badges.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {profile.badges.map((badge) => (
              <div
                key={badge.name}
                className="rounded-xl border border-border/40 bg-card p-4 text-center hover:border-border/80 transition-colors"
                title={`Earned: ${badge.earnedAt}`}
              >
                <span className="text-3xl block mb-1">{badge.icon}</span>
                <p className="text-xs font-medium leading-tight">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{badge.earnedAt}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current tracks */}
        <section aria-labelledby="tracks-heading">
          <h2 id="tracks-heading" className="text-lg font-bold mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-brand-500" />
            Learning Tracks
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.tracks.map((track) => (
              <Badge key={track} variant="outline" className="text-sm px-3 py-1">
                {track}
              </Badge>
            ))}
          </div>
        </section>

        {/* Activity heatmap */}
        <section aria-labelledby="activity-heading">
          <h2 id="activity-heading" className="text-lg font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Learning Activity — Last 52 Weeks
          </h2>
          <div className="rounded-xl border border-border/40 bg-card p-5">
            <ActivityHeatmap />
          </div>
        </section>

        {/* Challenge CTA */}
        <section className="rounded-xl border border-border/40 bg-card p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold">Think you can beat {profile.displayName}?</h3>
            <p className="text-sm text-muted-foreground">Challenge them to a 1v1 live battle</p>
          </div>
          <Button className="gap-1.5" asChild>
            <Link href="/live-battles">
              <Zap className="h-4 w-4" /> Challenge to Battle
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
