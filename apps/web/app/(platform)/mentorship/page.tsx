/**
 * @file app/(platform)/mentorship/page.tsx
 * @description Mentorship platform page
 * Route: /mentorship
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Users, Star, Clock, BookOpen, CheckCircle2,
  MessageSquare, Calendar, Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:       "Mentorship — LearnVeda",
  description: "Connect with experienced student mentors and industry professionals. Get personalized guidance for CBSE boards, JEE, placements, and programming.",
};

/* ─── Mentor profiles ────────────────────────────────────────────────────── */
const MENTORS = [
  {
    name:    "Arjun Sharma",
    role:    "IIT Delhi — CS Engineering",
    avatar:  "AS",
    color:   "from-brand-500 to-purple-500",
    rating:  4.9,
    sessions: 87,
    topics:  ["DSA", "System Design", "GATE Prep", "Placements"],
    price:   "₹299/session",
    available: true,
  },
  {
    name:    "Dr. Priya Nair",
    role:    "MBBS, NEET Expert",
    avatar:  "PN",
    color:   "from-green-500 to-teal-500",
    rating:  5.0,
    sessions: 124,
    topics:  ["Biology", "Chemistry", "NEET Strategy", "Class 12"],
    price:   "₹399/session",
    available: true,
  },
  {
    name:    "Rohit Verma",
    role:    "Senior SDE at Google",
    avatar:  "RV",
    color:   "from-blue-500 to-cyan-500",
    rating:  4.8,
    sessions: 56,
    topics:  ["LeetCode", "Interview Prep", "Python", "System Design"],
    price:   "₹499/session",
    available: false,
  },
  {
    name:    "Kavya Reddy",
    role:    "IIM Ahmedabad — MBA",
    avatar:  "KR",
    color:   "from-orange-500 to-amber-500",
    rating:  4.7,
    sessions: 43,
    topics:  ["Economics", "Business Studies", "CAT Prep", "Resume Building"],
    price:   "₹349/session",
    available: true,
  },
];

/* ─── How it works ───────────────────────────────────────────────────────── */
const STEPS = [
  { icon: BookOpen,    step: "1", title: "Browse Mentors",    desc: "Filter by subject, expertise, and availability" },
  { icon: Calendar,   step: "2", title: "Book a Session",    desc: "Choose a 30 or 60-minute slot that works for you" },
  { icon: MessageSquare,step:"3", title: "Connect & Learn",  desc: "Video call, screen share, and live problem solving" },
  { icon: Award,      step: "4", title: "Track Progress",    desc: "Session notes, action items, and follow-up support" },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function MentorshipPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Mentorship</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learn from the Best
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Connect 1-on-1 with IIT/IIM graduates, NEET toppers, and senior engineers.
            Get personalized guidance and skip months of confusion.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 max-w-4xl mx-auto">
          {STEPS.map((step) => (
            <div key={step.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm mx-auto mb-3">
                {step.step}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mentors grid */}
        <h2 className="text-xl font-bold text-foreground mb-6">Featured Mentors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.name}
              className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${mentor.color} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold">{mentor.avatar}</span>
              </div>

              {/* Info */}
              <h3 className="font-bold text-foreground">{mentor.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">{mentor.role}</p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-yellow-500" />
                  {mentor.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {mentor.sessions} sessions
                </span>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {mentor.topics.slice(0, 2).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>

              {/* Price + CTA */}
              <p className="text-sm font-bold text-foreground mb-3">{mentor.price}</p>
              {mentor.available ? (
                <Button size="sm" className="w-full">Book Session</Button>
              ) : (
                <Button size="sm" variant="outline" className="w-full" disabled>Not Available</Button>
              )}
            </div>
          ))}
        </div>

        {/* Become a mentor CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Become a Mentor</h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Are you an IIT/IIM graduate, NEET topper, or experienced professional?
            Share your knowledge and earn ₹5,000–₹30,000 per month mentoring students.
          </p>
          <Button variant="secondary" size="lg" className="gap-2">
            Apply to Mentor
          </Button>
        </div>
      </div>
    </div>
  );
}
