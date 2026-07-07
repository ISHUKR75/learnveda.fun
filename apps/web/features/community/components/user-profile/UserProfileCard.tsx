/**
 * @file features/community/components/user-profile/UserProfileCard.tsx
 * @description Community user profile card — shown in hover cards, sidebars, and member lists
 *
 * Displays:
 * - Avatar (gradient initial) + name + role badge
 * - XP level + streak
 * - Top subjects
 * - Follow / Message buttons
 *
 * Used in: Community post headers, member list, leaderboard rows
 */

"use client";

import React from "react";
import Link from "next/link";
import { Flame, Star, Users, MessageSquare } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── UserProfile type ───────────────────────────────────────────────────── */
export interface UserProfile {
  id:           string;
  name:         string;
  username:     string;
  avatar:       string;       // Initials
  avatarColor:  string;       // Tailwind gradient class
  role?:        string;       // "Mentor" | "Moderator" | "Pro"
  xp:           number;
  level:        number;
  streak:       number;
  topSubjects:  string[];
  followers:    number;
  profileHref:  string;
}

/* ─── UserProfileCard ────────────────────────────────────────────────────── */
export function UserProfileCard({ user, compact = false }: { user: UserProfile; compact?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-card shadow-sm ${compact ? "p-3" : "p-5"}`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Link href={user.profileHref}>
          <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity`}>
            {user.avatar}
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link href={user.profileHref}>
              <span className="font-semibold text-sm text-foreground hover:text-brand-500 transition-colors cursor-pointer">{user.name}</span>
            </Link>
            {user.role && (
              <Badge className={`text-xs h-4 ${
                user.role === "Mentor"    ? "bg-blue-500"   :
                user.role === "Moderator"? "bg-red-500"     :
                user.role === "Pro"      ? "bg-amber-500"   : "bg-muted text-muted-foreground"
              } text-white`}>
                {user.role}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">@{user.username}</p>

          {/* Stats row */}
          {!compact && (
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-0.5 text-yellow-500"><Star className="h-3 w-3" /> Lv {user.level} · {user.xp.toLocaleString()} XP</span>
              <span className="flex items-center gap-0.5 text-orange-500"><Flame className="h-3 w-3" /> {user.streak}d</span>
              <span className="flex items-center gap-0.5"><Users className="h-3 w-3" /> {user.followers}</span>
            </div>
          )}

          {/* Top subjects */}
          {!compact && (
            <div className="flex flex-wrap gap-1 mt-2">
              {user.topSubjects.slice(0, 3).map(s => (
                <span key={s} className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded-full">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {!compact && (
        <div className="flex gap-2 mt-3">
          <Button size="sm" className="flex-1 h-7 text-xs gap-1">
            <Users className="h-3 w-3" /> Follow
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
            <MessageSquare className="h-3 w-3" /> Message
          </Button>
        </div>
      )}
    </div>
  );
}
