/**
 * @file features/events/components/EventsGrid.tsx
 * @description Events grid component for LearnVeda
 * Displays upcoming competitions, hackathons, olympiads, and coding battles
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Trophy, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";

/* ─── Events Data ────────────────────────────────────────────────────────── */
const events = [
  {
    id:          "math-olympiad-july",
    title:       "LearnVeda Math Olympiad — July 2025",
    description: "Test your mathematical reasoning across Class 9–12 topics. Win certificates and XP rewards.",
    type:        "Olympiad",
    badge:       "⭐ Featured",
    badgeVariant: "gradient" as const,
    date:        "July 20, 2025",
    time:        "10:00 AM IST",
    duration:    "3 hours",
    participants: 2450,
    maxParticipants: 5000,
    prize:       "Certificate + 1000 XP + Leaderboard boost",
    tags:        ["Mathematics", "Class 9-12", "All levels"],
    href:        "/events/math-olympiad-july",
    emoji:       "📐",
    status:      "Registering",
    color:       "from-blue-500 to-cyan-500",
  },
  {
    id:          "code-sprint-python",
    title:       "Python Code Sprint — 48-Hour Challenge",
    description: "Build a real Python project in 48 hours. AI tools allowed. Judged on functionality, code quality, and innovation.",
    type:        "Code Sprint",
    badge:       "🔥 Hot",
    badgeVariant: "warning" as const,
    date:        "July 25–27, 2025",
    time:        "12:00 PM IST",
    duration:    "48 hours",
    participants: 834,
    maxParticipants: 2000,
    prize:       "₹5000 + Certificate + Pro membership",
    tags:        ["Python", "Programming", "All levels"],
    href:        "/events/code-sprint-python",
    emoji:       "🐍",
    status:      "Registering",
    color:       "from-green-500 to-teal-500",
  },
  {
    id:          "dsa-hackathon",
    title:       "DSA Championship — Competitive Programming",
    description: "5-hour competitive programming contest. LeetCode-style problems across Easy, Medium, and Hard difficulty.",
    type:        "Competition",
    badge:       "💻 Pro",
    badgeVariant: "purple" as const,
    date:        "August 3, 2025",
    time:        "2:00 PM IST",
    duration:    "5 hours",
    participants: 1230,
    maxParticipants: 3000,
    prize:       "Certificate + 2000 XP + 6-month Pro",
    tags:        ["DSA", "Algorithms", "Advanced"],
    href:        "/events/dsa-championship",
    emoji:       "🏆",
    status:      "Registering",
    color:       "from-purple-500 to-pink-500",
  },
  {
    id:          "physics-battle",
    title:       "Physics Live Battle Tournament",
    description: "Real-time 1v1 Physics MCQ battles — bracket tournament format. 64 participants, winner takes all.",
    type:        "Battle",
    badge:       "⚡ Live",
    badgeVariant: "success" as const,
    date:        "August 10, 2025",
    time:        "4:00 PM IST",
    duration:    "2 hours",
    participants: 64,
    maxParticipants: 64,
    prize:       "500 XP per win + Champion badge",
    tags:        ["Physics", "Class 11-12", "Battle"],
    href:        "/events/physics-battle",
    emoji:       "⚡",
    status:      "Almost Full",
    color:       "from-yellow-500 to-orange-500",
  },
  {
    id:          "board-mock-test",
    title:       "CBSE Board Mock Test Series — August",
    description: "Full-length CBSE board exam simulation for Class 10 and 12. All subjects. Detailed performance report.",
    type:        "Mock Test",
    badge:       "📋 CBSE",
    badgeVariant: "info" as const,
    date:        "August 15, 2025",
    time:        "9:00 AM IST",
    duration:    "3 hours per subject",
    participants: 3400,
    maxParticipants: 10000,
    prize:       "Detailed report + Certificate + 500 XP",
    tags:        ["CBSE", "Class 10", "Class 12", "Board Prep"],
    href:        "/events/board-mock-august",
    emoji:       "📋",
    status:      "Registering",
    color:       "from-cyan-500 to-blue-500",
  },
  {
    id:          "webdev-hackathon",
    title:       "Full-Stack Hackathon — Build & Deploy in 24h",
    description: "Build a full-stack web application in 24 hours. Teams of 2–3. Deploy to production. Judged by real engineers.",
    type:        "Hackathon",
    badge:       "🚀 New",
    badgeVariant: "gradient" as const,
    date:        "September 5–6, 2025",
    time:        "10:00 AM IST",
    duration:    "24 hours",
    participants: 210,
    maxParticipants: 500,
    prize:       "₹10,000 + Mentorship + Certificate",
    tags:        ["Web Dev", "Full-stack", "Teams"],
    href:        "/events/webdev-hackathon",
    emoji:       "🚀",
    status:      "Coming Soon",
    color:       "from-orange-500 to-red-500",
  },
];

/* ─── Events Grid Component ───────────────────────────────────────────────── */
export function EventsGrid() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            <Zap className="h-3 w-3 mr-1" /> Upcoming Events
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Compete &{" "}
            <span className="text-gradient">Level Up</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monthly olympiads, hackathons, code sprints, and live battles. Participate, win, and build your academic portfolio.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="h-full rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Gradient header */}
                <div className={`h-24 bg-gradient-to-br ${event.color} flex items-center justify-center text-5xl relative`}>
                  {event.emoji}
                  <div className="absolute top-3 right-3">
                    <Badge variant={event.badgeVariant} className="text-xs">{event.badge}</Badge>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 h-[calc(100%-96px)]">
                  {/* Type */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{event.type}</Badge>
                    <Badge
                      variant={event.status === "Almost Full" ? "destructive" : event.status === "Coming Soon" ? "secondary" : "success"}
                      className="text-xs"
                    >
                      {event.status}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm leading-snug">{event.title}</h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{event.description}</p>

                  {/* Date/time/duration */}
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {event.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {event.time} · {event.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3 w-3" /> {event.participants.toLocaleString()} / {event.maxParticipants.toLocaleString()} registered
                    </div>
                  </div>

                  {/* Registration progress */}
                  <div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${event.color}`}
                        style={{ width: `${Math.min((event.participants / event.maxParticipants) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Prize & CTA */}
                  <div>
                    <p className="text-xs text-green-500 font-medium mb-2">🏆 {event.prize}</p>
                    <Button
                      size="sm"
                      className="w-full"
                      variant={event.status === "Coming Soon" ? "outline" : "gradient"}
                      disabled={event.status === "Almost Full" || event.status === "Coming Soon"}
                      asChild={event.status === "Registering"}
                    >
                      {event.status === "Registering" ? (
                        <Link href={event.href}>
                          Register Now <ArrowRight className="h-3 w-3" />
                        </Link>
                      ) : (
                        <span>{event.status === "Almost Full" ? "Almost Full" : "Notify Me"}</span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
