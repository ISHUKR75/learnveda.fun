/**
 * @file app/(platform)/community/chat/page.tsx
 * @description Real-time community chat rooms — subject-specific chat channels
 * Route: /community/chat
 * Shows: Available chat rooms organized by subject and class
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle, ChevronRight, Users, Hash, Circle,
  Flame, ArrowRight, Plus,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Live Chat — Community | LearnVeda",
  description: "Real-time academic chat rooms on LearnVeda — discuss subjects with live classmates.",
};

/* ─── Chat Rooms Data ────────────────────────────────────────────────────── */
// Chat rooms — in production powered by Socket.io + MongoDB message history
const CHAT_ROOMS = [
  {
    id:      "general",
    name:    "general",
    desc:    "General discussions, introductions, and casual academic chat",
    online:  342,
    total:   4520,
    lastMsg: "priya: Anyone solved NCERT 7.2 Q5 yet? 😅",
    active:  true,
    hot:     true,
    category:"General",
  },
  {
    id:      "class9-math",
    name:    "class-9-mathematics",
    desc:    "Class 9 Math chapter discussions, NCERT solutions, and problems",
    online:  78,
    total:   1240,
    lastMsg: "arjun: Check out the Heron's Formula derivation I posted!",
    active:  true,
    hot:     false,
    category:"CBSE Class 9",
  },
  {
    id:      "class9-science",
    name:    "class-9-science",
    desc:    "Physics, Chemistry, Biology discussions for Class 9",
    online:  56,
    total:   980,
    lastMsg: "rahul: Newton's 3rd law question — action-reaction on same body?",
    active:  true,
    hot:     true,
    category:"CBSE Class 9",
  },
  {
    id:      "python-learners",
    name:    "python-learners",
    desc:    "Python questions, code reviews, and project ideas",
    online:  234,
    total:   3780,
    lastMsg: "sneha: TypeError: list index out of range — help! 😭",
    active:  true,
    hot:     true,
    category:"Programming",
  },
  {
    id:      "dsa-prep",
    name:    "dsa-prep",
    desc:    "Daily DSA problems, interview discussion, and algorithm help",
    online:  145,
    total:   2340,
    lastMsg: "coding_beast: Today's problem: Merge k sorted lists — discuss!",
    active:  true,
    hot:     false,
    category:"Engineering",
  },
  {
    id:      "class10-all",
    name:    "class-10-boards",
    desc:    "Class 10 board exam prep, tips, and subject discussions",
    online:  189,
    total:   2890,
    lastMsg: "ananya: How many chapters should I revise per day for Science?",
    active:  true,
    hot:     false,
    category:"CBSE Class 10",
  },
  {
    id:      "javascript-learners",
    name:    "javascript-learners",
    desc:    "JavaScript, React, and web development discussions",
    online:  167,
    total:   2120,
    lastMsg: "web_dev_raj: Promises vs async/await — which is better for beginners?",
    active:  true,
    hot:     false,
    category:"Programming",
  },
  {
    id:      "battles-lounge",
    name:    "battles-lounge",
    desc:    "Live battle results, challenge callouts, and strategies",
    online:  89,
    total:   1450,
    lastMsg: "champion99: Looking for a ranked DSA battle! DM me 🔥",
    active:  true,
    hot:     true,
    category:"Battles",
  },
];

/* ─── Group rooms by category ─────────────────────────────────────────────── */
const categories = [...new Set(CHAT_ROOMS.map((r) => r.category))];

/* ─── Chat Page Component ────────────────────────────────────────────────── */
export default function ChatPage() {
  const totalOnline = CHAT_ROOMS.reduce((a, r) => a + r.online, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-cyan-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/community" className="hover:text-foreground transition-colors">Community</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Chat</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Live Chat Rooms</h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                  <span>{totalOnline.toLocaleString()} students online now</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Create Room
            </Button>
          </div>
        </div>
      </div>

      {/* ── Chat Rooms by Category ────────────────────────────────────────── */}
      <div className="container px-4 py-8 space-y-8">
        {categories.map((category) => {
          const rooms = CHAT_ROOMS.filter((r) => r.category === category);
          return (
            <section key={category}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {category}
              </h2>

              <div className="space-y-2">
                {rooms.map((room) => (
                  <Link
                    key={room.id}
                    href={`/community/chat/${room.id}`}
                    className="group flex items-center gap-4 rounded-2xl border bg-card hover:shadow-md transition-all p-4"
                  >
                    {/* Channel hash icon */}
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Hash className="h-4.5 w-4.5 text-primary" />
                    </div>

                    {/* Room info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-sm">#{room.name}</span>
                        {room.hot && (
                          <Badge className="text-[9px] py-0 bg-orange-500/10 text-orange-600 border-orange-500/20">
                            <Flame className="h-2.5 w-2.5 mr-0.5" />Hot
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1 mb-1">{room.desc}</div>
                      <div className="text-[11px] text-muted-foreground/70 italic line-clamp-1">{room.lastMsg}</div>
                    </div>

                    {/* Online count */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <Circle className="h-2 w-2 fill-green-500" />
                        {room.online} online
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {room.total.toLocaleString()} members
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
