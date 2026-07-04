/**
 * @file app/(platform)/community/questions/page.tsx
 * @description Community Q&A page — students post and answer academic questions
 * Route: /community/questions
 * Shows: Question feed with upvotes, answers, and subject filters
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare, ChevronRight, ThumbsUp, CheckCircle2,
  Search, Plus, BookOpen, Clock, Filter, Tag,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Community Q&A — LearnVeda",
  description: "Ask and answer academic questions with the LearnVeda community. Get help from peers and experts.",
};

/* ─── Questions Data ─────────────────────────────────────────────────────── */
// Sample community questions — in production fetched from MongoDB community collection
const QUESTIONS = [
  {
    id:         "q-001",
    title:      "How do I prove that √2 is irrational? I understand the method but can't write the proof correctly.",
    author:     "priya_learner",
    subject:    "Mathematics",
    class:      "Class 9",
    tags:       ["Number Systems", "Proof", "NCERT"],
    upvotes:    42,
    answers:    8,
    views:      245,
    time:       "2 hours ago",
    accepted:   true,
    excerpt:    "I know we assume √2 = p/q and then show contradiction but my proof has gaps...",
  },
  {
    id:         "q-002",
    title:      "What's the difference between speed and velocity? When should I use which in problems?",
    author:     "rohit_coder",
    subject:    "Science",
    class:      "Class 9",
    tags:       ["Motion", "Physics", "Definitions"],
    upvotes:    28,
    answers:    5,
    views:      189,
    time:       "4 hours ago",
    accepted:   true,
    excerpt:    "My teacher says they are different but I keep confusing them in problems...",
  },
  {
    id:         "q-003",
    title:      "In Python, what is the difference between a list and a tuple? When should I use each?",
    author:     "arjun_dev",
    subject:    "Python",
    class:      "Programming",
    tags:       ["Python", "Lists", "Tuples", "Data Structures"],
    upvotes:    35,
    answers:    12,
    views:      412,
    time:       "6 hours ago",
    accepted:   true,
    excerpt:    "I know tuples are immutable, but what's a real use case where I would prefer a tuple over a list?",
  },
  {
    id:         "q-004",
    title:      "How did the French Revolution impact India's freedom movement? Need to compare for an essay.",
    author:     "ananya_history",
    subject:    "Social Science",
    class:      "Class 9",
    tags:       ["French Revolution", "History", "Compare"],
    upvotes:    15,
    answers:    3,
    views:      98,
    time:       "Yesterday",
    accepted:   false,
    excerpt:    "I need to write a 500-word essay comparing these two. Can someone give me the key points?",
  },
  {
    id:         "q-005",
    title:      "What is the difference between Heron's Formula and the standard base×height formula for triangles?",
    author:     "sneha_maths",
    subject:    "Mathematics",
    class:      "Class 9",
    tags:       ["Triangles", "Area", "Heron's Formula", "NCERT"],
    upvotes:    22,
    answers:    6,
    views:      167,
    time:       "2 days ago",
    accepted:   true,
    excerpt:    "When is Heron's formula used instead of (1/2 × base × height)? Are both always valid?",
  },
  {
    id:         "q-006",
    title:      "Big O Notation — O(n log n) vs O(n²) — how much difference does it really make for competitive programming?",
    author:     "coding_beast",
    subject:    "DSA",
    class:      "Engineering",
    tags:       ["Algorithms", "Complexity", "Competitive Coding"],
    upvotes:    67,
    answers:    9,
    views:      523,
    time:       "3 days ago",
    accepted:   true,
    excerpt:    "For n = 10^6, what's the practical execution time difference? I always TLE with O(n²)...",
  },
];

/* ─── Subject Filter Tabs ─────────────────────────────────────────────────── */
const SUBJECT_FILTERS = [
  "All", "Mathematics", "Science", "Social Science", "Python", "DSA", "English",
];

/* ─── Questions Page Component ───────────────────────────────────────────── */
export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-blue-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/community" className="hover:text-foreground transition-colors">Community</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Questions</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Community Q&A</h1>
                <p className="text-sm text-muted-foreground">
                  {QUESTIONS.length} questions · 1,200+ active students
                </p>
              </div>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Ask a Question
            </Button>
          </div>

          {/* Search bar */}
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search questions..."
              className="w-full rounded-xl border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ─── Questions Feed ────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              {SUBJECT_FILTERS.map((filter, i) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Question cards */}
            <div className="space-y-3">
              {QUESTIONS.map((q) => (
                <Link
                  key={q.id}
                  href={`/community/questions/${q.id}`}
                  className="group block rounded-2xl border bg-card hover:shadow-md transition-all p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Vote + answer count */}
                    <div className="flex flex-col items-center gap-2 shrink-0 w-12">
                      <div className="flex flex-col items-center text-center">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground mb-0.5" />
                        <span className="text-xs font-semibold">{q.upvotes}</span>
                        <span className="text-[10px] text-muted-foreground">votes</span>
                      </div>
                      <div className={`flex flex-col items-center text-center ${q.accepted ? "text-green-600 dark:text-green-400" : ""}`}>
                        <CheckCircle2 className="h-4 w-4 mb-0.5" />
                        <span className="text-xs font-semibold">{q.answers}</span>
                        <span className="text-[10px] text-muted-foreground">ans</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                        {q.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{q.excerpt}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {q.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {q.subject} · {q.class}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {q.time} by @{q.author}
                        </span>
                        <span>{q.views} views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ─── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-4">Community Stats</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Total Questions", value: "2,847"  },
                  { label: "Answers",         value: "14,320" },
                  { label: "Active Members",  value: "1,240"  },
                  { label: "Solved Today",    value: "43"     },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">{s.label}</span>
                    <span className="font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular tags */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-1">
                <Tag className="h-4 w-4" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["NCERT", "Python", "Polynomials", "Motion", "Arrays", "DSA", "Proof", "Calculus", "History"].map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-1 rounded-full border bg-muted hover:bg-muted/80 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="font-semibold text-sm mb-2">Community Rules</h3>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {[
                  "Post clear, specific academic questions",
                  "Show your attempt before asking",
                  "Be respectful to all members",
                  "No copy-pasting exam papers",
                  "Mark answers as solved",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
