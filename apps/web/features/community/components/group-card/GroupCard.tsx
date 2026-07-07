/**
 * @file features/community/components/group-card/GroupCard.tsx
 * @description Study group card for the community groups section
 *
 * Displays:
 * - Group name + subject emoji
 * - Member count + activity level
 * - Group type badge (public/private)
 * - Join/View button
 *
 * Used in: Community page groups tab
 */

"use client";

import React from "react";
import Link from "next/link";
import { Users, Lock, Globe, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface GroupData {
  id:       string;
  name:     string;
  emoji:    string;
  subject:  string;
  members:  number;
  isPublic: boolean;
  activity: "High" | "Medium" | "Low";
  href:     string;
}

const ACTIVITY_COLOR: Record<string, string> = {
  High:   "border-green-500/40 text-green-600",
  Medium: "border-yellow-500/40 text-yellow-600",
  Low:    "border-muted text-muted-foreground",
};

export function GroupCard({ group }: { group: GroupData }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
      {/* Group emoji icon */}
      <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-2xl">
        {group.emoji}
      </div>

      {/* Group info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground group-hover:text-brand-500 transition-colors truncate">
          {group.name}
        </p>
        <p className="text-xs text-muted-foreground">{group.subject}</p>
        <div className="flex items-center gap-2 mt-1">
          {/* Member count */}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" /> {group.members}
          </span>
          {/* Public/private */}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {group.isPublic
              ? <><Globe className="h-3 w-3" /> Public</>
              : <><Lock  className="h-3 w-3" /> Private</>
            }
          </span>
          {/* Activity badge */}
          <Badge variant="outline" className={`h-4 text-xs ${ACTIVITY_COLOR[group.activity]}`}>
            {group.activity}
          </Badge>
        </div>
      </div>

      {/* Join/View CTA */}
      <Link href={group.href} className="flex-shrink-0">
        <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
          {group.isPublic ? "Join" : "View"} <ChevronRight className="h-3 w-3" />
        </Button>
      </Link>
    </div>
  );
}
