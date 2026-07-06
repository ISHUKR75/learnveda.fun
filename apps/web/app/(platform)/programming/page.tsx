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
import { ChevronRight, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-brand-500 text-white mb-4">
            <Code2 className="h-7 w-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Programming Languages</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Structured 30-day learning plans for 13 programming languages.
            From beginner to industry-ready, one day at a time.
          </p>
        </div>

        {/* Languages grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.slug}
              href={`/programming/${lang.slug}`}
              className={`group rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-all ${lang.color}`}
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
                <span className="text-xs text-muted-foreground">{lang.days}-day plan</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 p-5 rounded-2xl border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground">
            All programming languages have a free introductory track (Days 1–5).
            {" "}<Link href="/pricing" className="text-brand-500 hover:underline">Upgrade to Pro</Link> to unlock the full 30-day plan.
          </p>
        </div>
      </div>
    </div>
  );
}
