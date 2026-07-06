/**
 * @file app/(platform)/test-center/page.tsx
 * @description Test Center page — mock tests and previous year questions
 * Route: /test-center
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText, Clock, BookOpen, Star, Trophy, Users,
  ChevronRight, Calendar, Target, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "Test Center — Mock Tests & Previous Year Questions | LearnVeda",
  description: "Full-length CBSE board mock tests, JEE/NEET mock tests, and previous year question papers. Timed tests with detailed solutions.",
};

/* ─── Available tests ────────────────────────────────────────────────────── */
const TESTS = [
  {
    id:       "cbse-10-math-2024",
    title:    "CBSE Class 10 Mathematics — 2024 Board Paper",
    type:     "Previous Year",
    class:    "Class 10",
    subject:  "Mathematics",
    duration: 180,    // Minutes
    marks:    80,
    attempts: 3420,
    isPro:    false,
  },
  {
    id:       "cbse-12-physics-2024",
    title:    "CBSE Class 12 Physics — 2024 Board Paper",
    type:     "Previous Year",
    class:    "Class 12",
    subject:  "Physics",
    duration: 180,
    marks:    70,
    attempts: 5210,
    isPro:    false,
  },
  {
    id:       "cbse-12-chemistry-mock-1",
    title:    "CBSE Class 12 Chemistry — Mock Test 1",
    type:     "Mock Test",
    class:    "Class 12",
    subject:  "Chemistry",
    duration: 90,
    marks:    35,
    attempts: 2140,
    isPro:    true,
  },
  {
    id:       "cbse-10-science-mock-1",
    title:    "CBSE Class 10 Science — Mock Test 1",
    type:     "Mock Test",
    class:    "Class 10",
    subject:  "Science",
    duration: 90,
    marks:    40,
    attempts: 4320,
    isPro:    false,
  },
  {
    id:       "cbse-12-math-2023",
    title:    "CBSE Class 12 Mathematics — 2023 Board Paper",
    type:     "Previous Year",
    class:    "Class 12",
    subject:  "Mathematics",
    duration: 180,
    marks:    80,
    attempts: 6120,
    isPro:    false,
  },
  {
    id:       "jee-main-math-mock",
    title:    "JEE Main 2025 — Mathematics Mock Test",
    type:     "Competitive",
    class:    "Class 12",
    subject:  "Mathematics",
    duration: 60,
    marks:    100,
    attempts: 1890,
    isPro:    true,
  },
  {
    id:       "cbse-9-math-mock-1",
    title:    "CBSE Class 9 Mathematics — Semester 1 Mock",
    type:     "Mock Test",
    class:    "Class 9",
    subject:  "Mathematics",
    duration: 90,
    marks:    80,
    attempts: 1240,
    isPro:    false,
  },
  {
    id:       "cbse-11-physics-mock-1",
    title:    "CBSE Class 11 Physics — Half-Yearly Mock",
    type:     "Mock Test",
    class:    "Class 11",
    subject:  "Physics",
    duration: 180,
    marks:    70,
    attempts: 2860,
    isPro:    true,
  },
];

/* ─── Type badge colors ──────────────────────────────────────────────────── */
const TYPE_COLORS: Record<string, string> = {
  "Previous Year": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Mock Test":     "bg-green-500/10 text-green-500 border-green-500/20",
  "Competitive":   "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function TestCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Test Center</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mock Tests & Board Papers
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Timed full-length mock tests and previous year board papers.
            Detailed solution explanations for every question.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          {[
            { icon: FileText, value: "150+",    label: "Test Papers"      },
            { icon: Clock,    value: "3 hours", label: "Per Full Test"    },
            { icon: Users,    value: "45,000+", label: "Tests Taken"      },
            { icon: Target,   value: "10 years",label: "PYQ Coverage"     },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-4 text-center">
              <stat.icon className="h-5 w-5 text-brand-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tests list */}
        <div className="space-y-4">
          {TESTS.map((test) => (
            <div
              key={test.id}
              className="rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 flex-wrap">
                {/* Test info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${TYPE_COLORS[test.type]}`}>
                      {test.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">{test.class}</Badge>
                    <Badge variant="secondary" className="text-xs">{test.subject}</Badge>
                    {test.isPro && (
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                        <Star className="h-3 w-3 mr-1" />Pro
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground">{test.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {test.duration} minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" /> {test.marks} marks
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {test.attempts.toLocaleString()} attempts
                    </span>
                  </div>
                </div>

                {/* CTA */}
                {test.isPro ? (
                  <Link href="/pricing">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium text-sm hover:border-brand-500/50 transition-colors">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Unlock with Pro
                    </button>
                  </Link>
                ) : (
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition-colors">
                    <Zap className="h-4 w-4" />
                    Start Test
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pro CTA */}
        <div className="mt-10 p-6 rounded-2xl border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Pro plan</strong> unlocks all 150+ test papers,
            AI-generated custom mock tests, and detailed performance analytics.{" "}
            <Link href="/pricing" className="text-brand-500 hover:underline">See pricing →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
