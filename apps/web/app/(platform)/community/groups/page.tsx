/**
 * @file app/(platform)/community/groups/page.tsx
 * @description Study groups page — join or create subject-specific study groups
 * Route: /community/groups
 * Shows: Public and private study groups with member counts and activity stats
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, ChevronRight, Plus, Search, Lock, Globe,
  BookOpen, Flame, MessageSquare, ArrowRight,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Study Groups — Community | LearnVeda",
  description: "Join or create study groups on LearnVeda. Collaborate with students across subjects.",
};

/* ─── Groups Data ─────────────────────────────────────────────────────────── */
// Study groups — in production fetched from MongoDB groups collection
const GROUPS = [
  {
    id:       "g-001",
    name:     "Class 9 Math Toppers",
    desc:     "Dedicated group for Class 9 students aiming for 95+ in Maths. Daily problems and NCERT solutions.",
    subject:  "Mathematics",
    class:    "Class 9",
    members:  342,
    posts:    1240,
    active:   true,
    type:     "public",
    joined:   true,
    streak:   21,
    avatar:   "📐",
    color:    "blue",
  },
  {
    id:       "g-002",
    name:     "Python Beginners India 🐍",
    desc:     "A warm and supportive group for Python beginners. Post your code, get feedback, learn together.",
    subject:  "Python",
    class:    "Programming",
    members:  1240,
    posts:    5670,
    active:   true,
    type:     "public",
    joined:   true,
    streak:   45,
    avatar:   "🐍",
    color:    "green",
  },
  {
    id:       "g-003",
    name:     "CBSE Science Simulations",
    desc:     "Discuss and explore PhET simulations for Class 9-12 Physics and Chemistry. Weekly simulation challenges.",
    subject:  "Science",
    class:    "Class 9-12",
    members:  567,
    posts:    2340,
    active:   true,
    type:     "public",
    joined:   false,
    streak:   7,
    avatar:   "⚗️",
    color:    "purple",
  },
  {
    id:       "g-004",
    name:     "DSA Battle Prep Squad",
    desc:     "Rigorous DSA prep group. Daily LeetCode-style problems, weekly timed contests, interview discussions.",
    subject:  "DSA",
    class:    "Engineering",
    members:  890,
    posts:    4560,
    active:   true,
    type:     "public",
    joined:   false,
    streak:   30,
    avatar:   "🧠",
    color:    "rose",
  },
  {
    id:       "g-005",
    name:     "Class 10 Board Prep 2027",
    desc:     "Private group for serious board exam preparation. Only for verified Class 10 students. Moderated.",
    subject:  "All Subjects",
    class:    "Class 10",
    members:  234,
    posts:    890,
    active:   false,
    type:     "private",
    joined:   false,
    streak:   5,
    avatar:   "📝",
    color:    "amber",
  },
  {
    id:       "g-006",
    name:     "Social Science Essay Writers",
    desc:     "Share essays, map work, and source-based answers for Class 9-12 Social Science. Peer feedback welcome.",
    subject:  "Social Science",
    class:    "Class 9-12",
    members:  178,
    posts:    567,
    active:   true,
    type:     "public",
    joined:   false,
    streak:   3,
    avatar:   "🌍",
    color:    "orange",
  },
];

/* ─── Groups Page Component ──────────────────────────────────────────────── */
export default function GroupsPage() {
  const joinedGroups = GROUPS.filter((g) => g.joined);
  const otherGroups  = GROUPS.filter((g) => !g.joined);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-green-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/community" className="hover:text-foreground transition-colors">Community</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Groups</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Study Groups</h1>
                <p className="text-sm text-muted-foreground">
                  {GROUPS.length} groups · {GROUPS.reduce((a, g) => a + g.members, 0).toLocaleString()} members
                </p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Create Group
            </Button>
          </div>

          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search groups by subject or class..."
              className="w-full rounded-xl border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* ── Groups Content ────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 space-y-8">

        {/* Joined groups */}
        {joinedGroups.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Your Groups ({joinedGroups.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinedGroups.map((group) => (
                <GroupCard key={group.id} group={group} joined={true} />
              ))}
            </div>
          </section>
        )}

        {/* Discover groups */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Discover Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherGroups.map((group) => (
              <GroupCard key={group.id} group={group} joined={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── GroupCard Component ────────────────────────────────────────────────── */
function GroupCard({
  group,
  joined,
}: {
  group: typeof GROUPS[0];
  joined: boolean;
}) {
  return (
    <div className="group rounded-2xl border bg-card hover:shadow-lg transition-all overflow-hidden">
      {/* Top accent */}
      <div className={`h-1 bg-${group.color}-500/50`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="text-2xl">{group.avatar}</div>
          <div className="flex items-center gap-1">
            {group.type === "private" ? (
              <Badge className="text-[9px] py-0 bg-muted border-border text-muted-foreground">
                <Lock className="h-2.5 w-2.5 mr-0.5" />Private
              </Badge>
            ) : (
              <Badge className="text-[9px] py-0 bg-green-500/10 border-green-500/20 text-green-600">
                <Globe className="h-2.5 w-2.5 mr-0.5" />Public
              </Badge>
            )}
          </div>
        </div>

        {/* Name + desc */}
        <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {group.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{group.desc}</p>

        {/* Subject + class */}
        <div className="flex items-center gap-1.5 mb-3">
          <BookOpen className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">{group.subject} · {group.class}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {group.members.toLocaleString()} members
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3 w-3" />
            {group.posts.toLocaleString()} posts
          </span>
          {group.active && (
            <span className="flex items-center gap-1 text-orange-500">
              <Flame className="h-3 w-3" />
              Active
            </span>
          )}
        </div>

        {/* CTA */}
        {joined ? (
          <Button size="sm" variant="outline" className="w-full text-xs h-7">
            <MessageSquare className="h-3 w-3 mr-1" />
            Open Group
          </Button>
        ) : (
          <Button size="sm" className="w-full text-xs h-7">
            <Plus className="h-3 w-3 mr-1" />
            Join Group
          </Button>
        )}
      </div>
    </div>
  );
}
