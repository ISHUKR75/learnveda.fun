/**
 * @file app/(platform)/profile/[username]/page.tsx
 * @description Public student profile page — shows XP, achievements, battles, and activity
 * Route: /profile/[username]
 * Displays a student's public learning profile — accessible by anyone
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Trophy, Flame, Star, BookOpen, Award, ChevronRight,
  Calendar, CheckCircle2, Target, Users, Zap,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Profile Data ───────────────────────────────────────────────────────── */
// In production, fetched from MongoDB users collection by username
const PROFILE_DATA: Record<string, {
  displayName: string;
  username:    string;
  avatar:      string;
  bio:         string;
  class:       string;
  school:      string;
  joinedDate:  string;
  stats: { xp: number; level: number; streak: number; battlesWon: number; chaptersCompleted: number; rank: string };
  recentActivity: { type: string; desc: string; time: string; xp: number }[];
  badges:      { emoji: string; name: string }[];
  subjects:    { name: string; score: number }[];
}> = {
  "demo-student": {
    displayName: "Arjun Sharma",
    username:    "arjunsharma07",
    avatar:      "A",
    bio:         "Class 11 student | Math & Python enthusiast | Aspiring Software Engineer 🚀",
    class:       "Class 11 (PCM)",
    school:      "Delhi Public School",
    joinedDate:  "March 2026",
    stats: {
      xp:                 2450,
      level:              12,
      streak:             7,
      battlesWon:         18,
      chaptersCompleted:  48,
      rank:               "#342",
    },
    recentActivity: [
      { type:"chapter", desc:"Completed Newton's Laws — Science",    time:"2 hours ago",  xp:30  },
      { type:"battle",  desc:"Won 1v1 DSA Battle vs ankit_coder",    time:"5 hours ago",  xp:50  },
      { type:"chapter", desc:"Python Day 15 — List Comprehensions",  time:"Yesterday",    xp:25  },
      { type:"quiz",    desc:"Class 9 Math Quiz — 96%",             time:"2 days ago",   xp:20  },
    ],
    badges: [
      { emoji:"🔥", name:"Week Warrior"  },
      { emoji:"📚", name:"Bookworm"      },
      { emoji:"⚔️", name:"First Battle"  },
      { emoji:"⭐", name:"Rising Star"   },
      { emoji:"⚡", name:"Lab Rat"       },
    ],
    subjects: [
      { name:"Mathematics",  score:96 },
      { name:"Python",       score:92 },
      { name:"Science",      score:88 },
      { name:"English",      score:84 },
    ],
  },
};

/* ─── Get Profile Data ───────────────────────────────────────────────────── */
function getProfile(username: string) {
  return PROFILE_DATA[username] ?? {
    displayName: username.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    username,
    avatar:      username.charAt(0).toUpperCase(),
    bio:         "LearnVeda student | Learning every day",
    class:       "Student",
    school:      "",
    joinedDate:  "2026",
    stats:       { xp: 0, level: 1, streak: 0, battlesWon: 0, chaptersCompleted: 0, rank: "N/A" },
    recentActivity: [],
    badges:      [],
    subjects:    [],
  };
}

/* ─── generateMetadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const profile = getProfile(username);
  return {
    title:       `${profile.displayName} — LearnVeda Profile`,
    description: `${profile.bio} · Level ${profile.stats.level} · ${profile.stats.xp} XP`,
  };
}

/* ─── Profile Page Component ─────────────────────────────────────────────── */
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = getProfile(username);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Profile Header ────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-background to-purple-500/5">
        <div className="container px-4 py-10">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-3xl font-bold text-white shrink-0">
              {profile.avatar}
            </div>

            {/* Profile info */}
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                <div>
                  <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                  <p className="text-sm text-muted-foreground">@{profile.username}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Follow</Button>
                  <Button size="sm" variant="outline">Challenge</Button>
                </div>
              </div>

              <p className="text-muted-foreground mb-3">{profile.bio}</p>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {profile.class}
                </span>
                {profile.school && (
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {profile.school}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {profile.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-6">
            {[
              { label: "XP",          value: profile.stats.xp.toLocaleString(), icon: Star  },
              { label: "Level",        value: `Lv ${profile.stats.level}`,       icon: Zap   },
              { label: "Streak",       value: `${profile.stats.streak} days`,    icon: Flame },
              { label: "Battles Won",  value: profile.stats.battlesWon,          icon: Trophy },
              { label: "Chapters",     value: profile.stats.chaptersCompleted,   icon: BookOpen },
              { label: "Global Rank",  value: profile.stats.rank,               icon: Target },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-xl border bg-card/80 p-3 text-center">
                  <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                  <div className="font-bold text-base">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Profile Content ───────────────────────────────────────────────── */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Left: Badges & Subjects ──────────────────────────────── */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4">Achievements ({profile.badges.length})</h3>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((badge) => (
                  <div
                    key={badge.name}
                    title={badge.name}
                    className="h-10 w-10 rounded-xl bg-muted border flex items-center justify-center text-xl"
                  >
                    {badge.emoji}
                  </div>
                ))}
                {profile.badges.length === 0 && (
                  <p className="text-xs text-muted-foreground">No badges yet</p>
                )}
              </div>
            </div>

            {/* Subject performance */}
            {profile.subjects.length > 0 && (
              <div className="rounded-2xl border bg-card p-5">
                <h3 className="font-semibold text-sm mb-4">Subject Scores</h3>
                <div className="space-y-3">
                  {profile.subjects.map((sub) => (
                    <div key={sub.name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>{sub.name}</span>
                        <span className="font-semibold">{sub.score}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width:`${sub.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right: Recent Activity ───────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-card overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Recent Activity</h3>
              </div>
              <div className="divide-y">
                {profile.recentActivity.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">No activity yet</div>
                ) : (
                  profile.recentActivity.map((act, i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        {act.type === "battle"  ? <Trophy   className="h-3.5 w-3.5 text-purple-500" /> :
                         act.type === "quiz"    ? <Star     className="h-3.5 w-3.5 text-amber-500" /> :
                                                  <BookOpen className="h-3.5 w-3.5 text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">{act.desc}</div>
                        <div className="text-xs text-muted-foreground">{act.time}</div>
                      </div>
                      <Badge className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20 shrink-0">
                        +{act.xp} XP
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
