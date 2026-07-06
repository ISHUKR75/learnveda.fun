/**
 * @file app/(platform)/core-cs/git-github/page.tsx
 * @description Git & GitHub learning track — 10-day plan
 * Route: /core-cs/git-github
 *
 * Covers: version control fundamentals, branching, merging, rebasing,
 *         pull requests, GitHub Actions CI/CD workflows, best practices.
 * Level: Beginner | Duration: 10 days | Target: Every developer
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle, Clock, BookOpen, Star, Users,
  Target, Zap, ArrowRight, GitBranch, Code2,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── 10-Day Git Curriculum ──────────────────────────────────────────────── */
const DAYS = [
  { day: 1,  title: "Introduction to Version Control — Why Git? Init, Add, Commit",     xp: 30, hasVideo: true  },
  { day: 2,  title: "Git Basics — Clone, Push, Pull, Fetch, Remote Repositories",        xp: 30, hasVideo: true  },
  { day: 3,  title: "Branching — Create, Switch, List, Delete, Naming Conventions",      xp: 35, hasVideo: true  },
  { day: 4,  title: "Merging vs Rebasing — Fast-forward, 3-way Merge, Rebase --onto",    xp: 40, hasVideo: true  },
  { day: 5,  title: "Resolving Merge Conflicts — Tools, Strategies, Best Practices",     xp: 40, hasVideo: false },
  { day: 6,  title: "GitHub — PRs, Code Review, Issues, Projects, GitHub Discussions",  xp: 35, hasVideo: true  },
  { day: 7,  title: "GitHub Actions — CI/CD Pipelines, Workflows, Secrets, Artifacts",  xp: 45, hasVideo: true  },
  { day: 8,  title: "Advanced Git — Cherry-pick, Stash, Bisect, Reflog, Reset",         xp: 45, hasVideo: false },
  { day: 9,  title: "Git Hooks — Pre-commit, Pre-push, Husky, Conventional Commits",    xp: 40, hasVideo: false },
  { day: 10, title: "Professional Git Workflow — GitFlow, Trunk-Based Development",      xp: 50, hasVideo: true  },
] as const;

export default function GitGitHubPage() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  };

  const completedPct = Math.round((completedDays.size / 10) * 100);

  return (
    <div className="min-h-screen pb-20">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-orange-950/5 to-background py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Git & GitHub</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3">Beginner</Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🔀 Git & GitHub — 10-Day Plan
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                Master version control from git init to GitHub Actions CI/CD.
                An essential skill every developer needs from day one.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 10 Days</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 9,400+ learners</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.9/5</span>
              </div>
              <Button size="lg" variant="gradient">
                <Zap className="h-4 w-4" /> Start Day 1
              </Button>
            </div>

            {/* Progress */}
            <div className="w-full lg:w-72 rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-500" /> Your Progress
              </h3>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Days completed</span>
                <span className="font-bold">{completedDays.size} / 10</span>
              </div>
              <Progress value={completedPct} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">{completedPct}% complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Day list ──────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">10-Day Curriculum</h2>
          <div className="rounded-2xl border bg-card overflow-hidden divide-y">
            {DAYS.map((topic) => {
              const isComplete = completedDays.has(topic.day);
              return (
                <motion.div
                  key={topic.day}
                  initial={{ opacity: 0.01 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors ${isComplete ? "bg-green-500/5" : "hover:bg-muted/30"}`}
                >
                  <span className="w-14 text-xs font-bold text-muted-foreground/50 tabular-nums shrink-0">
                    Day {String(topic.day).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => toggleDay(topic.day)}
                    className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isComplete ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground/30 hover:border-brand-500"
                    }`}
                  >
                    {isComplete && <CheckCircle className="h-3 w-3" />}
                  </button>
                  <span className={`flex-1 text-sm ${isComplete ? "line-through text-muted-foreground" : ""}`}>
                    {topic.title}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {topic.hasVideo && <Badge variant="outline" className="text-xs text-red-500 border-red-400/30">📹 Video</Badge>}
                    <Badge variant="secondary" className="text-xs text-yellow-600">+{topic.xp} XP</Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cheat sheet */}
          <div className="mt-8 rounded-xl border bg-muted/30 p-6">
            <h3 className="font-bold mb-4">🔥 Essential Git Commands Cheat Sheet</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "git init              # Initialize repo",
                "git clone <url>       # Clone remote",
                "git add .             # Stage all changes",
                "git commit -m \"msg\"   # Commit with message",
                "git push origin main  # Push to remote",
                "git pull              # Pull latest changes",
                "git branch <name>     # Create branch",
                "git checkout <name>   # Switch branch",
                "git merge <branch>    # Merge branch",
                "git rebase main       # Rebase onto main",
                "git stash             # Stash changes",
                "git log --oneline     # Short log",
              ].map((cmd) => (
                <code key={cmd} className="rounded bg-background px-3 py-1.5 text-xs font-mono text-muted-foreground block">
                  {cmd}
                </code>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
