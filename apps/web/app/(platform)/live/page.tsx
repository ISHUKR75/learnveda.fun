/**
 * @file app/(platform)/live/page.tsx
 * @description Live Classes page for LearnVeda
 * Route: /live
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Video, Calendar, Clock, Users, Star, ChevronRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:       "Live Classes — LearnVeda",
  description: "Attend live classes by subject experts. Interactive sessions with Q&A, whiteboard, and real-time doubt clearing.",
};

/* ─── Upcoming live sessions ─────────────────────────────────────────────── */
const SESSIONS = [
  {
    id: "1", title: "Class 12 Physics: Electrostatics Deep Dive",
    teacher: "Prof. Anand Kumar", subject: "Physics", class: "Class 12",
    date: "Today, 6:00 PM IST", duration: "90 min", registered: 342, capacity: 500,
    isLive: true, isFree: false,
  },
  {
    id: "2", title: "Python for Beginners: Functions & Scope",
    teacher: "Sneha Joshi", subject: "Python", class: "All",
    date: "Today, 8:00 PM IST", duration: "60 min", registered: 218, capacity: 300,
    isLive: false, isFree: true,
  },
  {
    id: "3", title: "CBSE Class 10 Maths: Trigonometry Mastery",
    teacher: "Mr. Vijay Sharma", subject: "Mathematics", class: "Class 10",
    date: "Tomorrow, 5:00 PM IST", duration: "75 min", registered: 189, capacity: 400,
    isLive: false, isFree: false,
  },
  {
    id: "4", title: "DSA: Binary Trees — Complete Guide",
    teacher: "Rohit Dev", subject: "DSA", class: "Engineering",
    date: "July 14, 7:00 PM IST", duration: "120 min", registered: 127, capacity: 200,
    isLive: false, isFree: false,
  },
];

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Live Classes</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learn in Real Time
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Interactive live sessions by subject experts. Ask questions, solve problems together,
            and get your doubts cleared instantly.
          </p>
        </div>

        {/* Sessions */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {SESSIONS.map((session) => (
            <div
              key={session.id}
              className={`rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow ${
                session.isLive ? "border-red-500/30 bg-red-500/5" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{session.subject}</Badge>
                  <Badge variant="secondary" className="text-xs">{session.class}</Badge>
                  {session.isLive && (
                    <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      LIVE NOW
                    </span>
                  )}
                  {session.isFree && (
                    <Badge className="text-xs bg-green-500/10 text-green-600 border-green-500/20">Free</Badge>
                  )}
                </div>
              </div>

              <h3 className="font-bold text-foreground text-lg mb-2">{session.title}</h3>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-500" />{session.teacher}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{session.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{session.duration}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{session.registered}/{session.capacity}</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: `${Math.round((session.registered / session.capacity) * 100)}%` }}
                />
              </div>

              {/* CTA */}
              {session.isLive ? (
                <Button className="gap-2 bg-red-500 hover:bg-red-600">
                  <Play className="h-4 w-4" />
                  Join Now
                </Button>
              ) : (
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Register Free
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Recordings note */}
        <div className="mt-10 text-center p-6 rounded-2xl border bg-muted/30 max-w-4xl mx-auto">
          <Video className="h-8 w-8 text-brand-500 mx-auto mb-3" />
          <h3 className="font-bold text-foreground mb-2">Missed a Live Session?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All live sessions are recorded and available to Pro members within 2 hours of the session ending.
          </p>
          <Link href="/pricing">
            <Button variant="outline" size="sm">See Pro Plan</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
