/**
 * @file app/(platform)/programming/page.tsx
 * @description Programming languages hub page
 * Route: /programming
 *
 * Lists all 13 programming languages with:
 *  - Language emoji, name, tagline
 *  - Day count (30-day plans)
 *  - Difficulty level
 *  - Link to language page
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Code2, Zap, Star, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:       "Programming Languages — LearnVeda",
  description: "Learn 13 programming languages with structured 30-day plans. Python, JavaScript, TypeScript, Java, C, C++, Rust, Kotlin, Swift, SQL, Dart, Ruby, and Go.",
};

/* ─── Language cards data ────────────────────────────────────────────────── */
const LANGUAGES = [
  { slug: "python",     name: "Python",     emoji: "🐍", days: 30, level: "Beginner",     color: "hover:border-yellow-500/50", bg: "bg-yellow-500/10 text-yellow-600",   tagline: "AI, ML, Data Science & Web"       },
  { slug: "javascript", name: "JavaScript", emoji: "⚡", days: 30, level: "Beginner",     color: "hover:border-yellow-400/50", bg: "bg-yellow-400/10 text-yellow-600",   tagline: "Web, Frontend & Backend"          },
  { slug: "typescript", name: "TypeScript", emoji: "🔷", days: 30, level: "Intermediate", color: "hover:border-blue-500/50",   bg: "bg-blue-500/10 text-blue-600",       tagline: "JavaScript with superpowers"      },
  { slug: "java",       name: "Java",       emoji: "☕", days: 30, level: "Beginner",     color: "hover:border-orange-500/50", bg: "bg-orange-500/10 text-orange-600",   tagline: "Enterprise, Android & Backend"    },
  { slug: "c",          name: "C",          emoji: "🔧", days: 30, level: "Beginner",     color: "hover:border-gray-500/50",   bg: "bg-gray-500/10 text-gray-600",       tagline: "Systems, Embedded & OS"           },
  { slug: "cpp",        name: "C++",        emoji: "⚙️", days: 30, level: "Intermediate", color: "hover:border-blue-600/50",   bg: "bg-blue-600/10 text-blue-700",       tagline: "CP, Game Dev & Performance"       },
  { slug: "rust",       name: "Rust",       emoji: "🦀", days: 30, level: "Advanced",     color: "hover:border-red-500/50",    bg: "bg-red-500/10 text-red-600",         tagline: "Memory-safe systems programming"   },
  { slug: "kotlin",     name: "Kotlin",     emoji: "🎯", days: 30, level: "Intermediate", color: "hover:border-purple-500/50", bg: "bg-purple-500/10 text-purple-600",   tagline: "Android & server-side JVM"        },
  { slug: "swift",      name: "Swift",      emoji: "🦅", days: 30, level: "Intermediate", color: "hover:border-orange-400/50", bg: "bg-orange-400/10 text-orange-500",   tagline: "iOS, macOS & Apple platforms"     },
  { slug: "sql",        name: "SQL",        emoji: "🗃️", days: 20, level: "Beginner",     color: "hover:border-teal-500/50",   bg: "bg-teal-500/10 text-teal-600",       tagline: "Data querying & databases"        },
  { slug: "dart",       name: "Dart",       emoji: "🎭", days: 30, level: "Intermediate", color: "hover:border-cyan-500/50",   bg: "bg-cyan-500/10 text-cyan-600",       tagline: "Flutter cross-platform apps"      },
  { slug: "ruby",       name: "Ruby",       emoji: "💎", days: 25, level: "Beginner",     color: "hover:border-red-400/50",    bg: "bg-red-400/10 text-red-500",         tagline: "Web dev with Ruby on Rails"       },
  { slug: "go",         name: "Go",         emoji: "🐹", days: 25, level: "Intermediate", color: "hover:border-cyan-600/50",   bg: "bg-cyan-600/10 text-cyan-700",       tagline: "Cloud, microservices & DevOps"    },
];

/* ─── Difficulty colors ──────────────────────────────────────────────────── */
const LEVEL_COLORS: Record<string, string> = {
  Beginner:     "bg-green-500/10 text-green-600 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Advanced:     "bg-red-500/10 text-red-600 border-red-500/20",
};

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function ProgrammingHubPage() {
  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-brand-950/5 to-background py-14 md:py-18">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Programming</span>
          </nav>
          <Badge variant="secondary" className="mb-3">13 Languages · 30-Day Plans</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            🖥️ Programming Languages
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            Structured day-by-day learning plans for 13 programming languages.
            From your first "Hello World" to building real projects — one day at a time.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5"><Code2 className="h-4 w-4" /> 13 Languages</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 20–30 Days per language</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 15K+ students enrolled</span>
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-brand-500" /> In-browser compiler</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" size="lg" asChild>
              <Link href="/programming/python"><Zap className="h-4 w-4" /> Start with Python</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/compiler"><BookOpen className="h-4 w-4" /> Open Compiler</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Languages grid ────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Choose Your Language</h2>
            <Badge variant="secondary">Days 1–5 are free for all</Badge>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {LANGUAGES.map((lang) => (
              <Link
                key={lang.slug}
                href={`/programming/${lang.slug}`}
                className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${lang.color}`}
              >
                {/* Emoji + name */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{lang.emoji}</span>
                  <div>
                    <h2 className="font-bold text-foreground group-hover:text-brand-500 transition-colors">
                      {lang.name}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant="outline" className={`text-xs ${LEVEL_COLORS[lang.level]}`}>
                        {lang.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{lang.tagline}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {lang.days}-day plan
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core CS Tracks ────────────────────────────────────────── */}
      <section className="py-10 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-xl font-bold mb-6">Also Learn: Core CS Subjects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "DSA — 60 Days",          href: "/core-cs/dsa",                  emoji: "🌳" },
              { name: "System Design",           href: "/core-cs/system-design",        emoji: "🏗️" },
              { name: "Web Development",         href: "/core-cs/web-development",      emoji: "🌐" },
              { name: "Interview Preparation",   href: "/core-cs/interview-preparation", emoji: "💼" },
            ].map((track) => (
              <Link key={track.href} href={track.href}
                className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:border-brand-500/40 hover:shadow-md transition-all group">
                <span className="text-2xl">{track.emoji}</span>
                <span className="font-semibold text-sm group-hover:text-brand-500 transition-colors">{track.name}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing note ──────────────────────────────────────────── */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="rounded-2xl border bg-card p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h3 className="font-bold">Start for Free</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Days 1–5 of every language are completely free.
                Upgrade to Pro to unlock all 30 days, projects, and certification.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button variant="gradient" asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/programming/python">Try Python Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
