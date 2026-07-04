/**
 * @file app/(platform)/dashboard/bookmarks/page.tsx
 * @description Saved bookmarks page — chapters, questions, and notes saved for later
 * Route: /dashboard/bookmarks
 * Shows all bookmarked chapters, practice questions, and community posts
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Bookmark, ChevronRight, BookOpen, Star, MessageSquare, ArrowRight, Trash2 } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:  "Bookmarks — Dashboard | LearnVeda",
  description: "Your saved chapters, practice questions, and posts on LearnVeda.",
  robots: { index: false, follow: false },
};

/* ─── Bookmarks Data ─────────────────────────────────────────────────────── */
// In production, fetched from MongoDB user_bookmarks collection
const BOOKMARKS = [
  {
    type:    "chapter",
    title:   "Polynomials — NCERT Class 9",
    subtitle:"Chapter 2 · Mathematics · Class 9",
    href:    "/learn/class-9/mathematics/chapter-02",
    addedAt: "2 days ago",
    badge:   "Chapter",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    type:    "chapter",
    title:   "Newton's Laws of Motion — Force Simulation",
    subtitle:"Chapter 8 · Science · Class 9",
    href:    "/learn/class-9/science/chapter-08",
    addedAt: "3 days ago",
    badge:   "Simulation",
    badgeColor: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  {
    type:    "lesson",
    title:   "Python Day 12 — OOP and Classes",
    subtitle:"Python 45-Day Track · Intermediate",
    href:    "/programming/python/day-12",
    addedAt: "5 days ago",
    badge:   "Lesson",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  {
    type:    "question",
    title:   "Prove that √2 is irrational",
    subtitle:"NCERT Exercise 1.3 · Class 9 Maths",
    href:    "/learn/class-9/mathematics/chapter-01",
    addedAt: "1 week ago",
    badge:   "NCERT",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    type:    "post",
    title:   "How to understand Heron's Formula visually?",
    subtitle:"Community → Mathematics · 12 answers",
    href:    "/community/questions",
    addedAt: "1 week ago",
    badge:   "Community",
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
];

/* ─── Bookmarks Page Component ───────────────────────────────────────────── */
export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-amber-500/5 to-background">
        <div className="container px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Bookmarks</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Bookmark className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Bookmarks</h1>
              <p className="text-sm text-muted-foreground">{BOOKMARKS.length} saved items</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bookmarks List ────────────────────────────────────────────────── */}
      <div className="container px-4 py-8 max-w-3xl">
        {BOOKMARKS.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No bookmarks yet</p>
            <p className="text-sm mt-1">Save chapters, questions, and posts to find them quickly later.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {BOOKMARKS.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-2xl border bg-card p-4 hover:shadow-md transition-all"
              >
                {/* Icon by type */}
                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  {item.type === "post" ? (
                    <MessageSquare className="h-4.5 w-4.5 text-muted-foreground" />
                  ) : item.type === "question" ? (
                    <Star className="h-4.5 w-4.5 text-muted-foreground" />
                  ) : (
                    <BookOpen className="h-4.5 w-4.5 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <Link href={item.href} className="font-medium text-sm hover:text-primary transition-colors">
                      {item.title}
                    </Link>
                    <Badge className={`text-[9px] py-0 ${item.badgeColor}`}>{item.badge}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{item.subtitle}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Saved {item.addedAt}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                    <Link href={item.href}>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
