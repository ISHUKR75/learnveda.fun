/**
 * @file app/(platform)/explore/page.tsx
 * @description Explore page — discover all learning paths
 * Route: /explore
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, Code2, GraduationCap, Brain, FlaskConical,
  Zap, Trophy, Users, Globe2, Sparkles, ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title:       "Explore LearnVeda — All Learning Paths",
  description: "Explore all learning paths: CBSE Class 9–12, Engineering, Programming, Core CS, Simulations, Live Battles, and AI Tutor.",
};

/* ─── Learning paths ─────────────────────────────────────────────────────── */
const PATHS = [
  {
    category: "CBSE Curriculum",
    items: [
      { title: "Class 9",   desc: "Science, Maths, English, Social Science, Hindi",              href: "/learn/class-9",  icon: BookOpen, color: "text-blue-500" },
      { title: "Class 10",  desc: "Board exam focused — all subjects, PYQs included",            href: "/learn/class-10", icon: BookOpen, color: "text-cyan-500" },
      { title: "Class 11",  desc: "PCM/PCB + CS, foundation for boards & JEE/NEET",              href: "/learn/class-11", icon: BookOpen, color: "text-green-500" },
      { title: "Class 12",  desc: "Complete board prep + JEE/NEET + competitive exams",          href: "/learn/class-12", icon: BookOpen, color: "text-purple-500" },
    ],
  },
  {
    category: "Programming",
    items: [
      { title: "Python",     desc: "30-day plan — beginner to ML & data science",               href: "/programming/python",      icon: Code2, color: "text-yellow-500" },
      { title: "JavaScript", desc: "30-day plan — web development & Node.js",                   href: "/programming/javascript",  icon: Code2, color: "text-yellow-400" },
      { title: "Java",       desc: "30-day plan — Android & enterprise applications",            href: "/programming/java",        icon: Code2, color: "text-orange-500" },
      { title: "All Languages",desc: "Explore all 13 programming languages",                    href: "/programming",             icon: Code2, color: "text-brand-500" },
    ],
  },
  {
    category: "Engineering & Core CS",
    items: [
      { title: "DSA",            desc: "From arrays to DP — complete interview prep",           href: "/core-cs/dsa",              icon: Brain, color: "text-purple-500" },
      { title: "System Design",  desc: "Design scalable systems like Twitter, YouTube",         href: "/core-cs/system-design",    icon: Brain, color: "text-orange-500" },
      { title: "Engineering Hub",desc: "CSE, ECE, EEE, Civil, Mech — 8 semesters each",        href: "/learn/engineering",        icon: GraduationCap, color: "text-brand-500" },
      { title: "All Core CS",    desc: "OS, DBMS, CN, Web Dev, Git & more",                    href: "/core-cs/os",               icon: Brain, color: "text-teal-500" },
    ],
  },
  {
    category: "Platform Features",
    items: [
      { title: "Simulations",  desc: "140+ interactive physics, chemistry & DSA labs",          href: "/simulations",              icon: FlaskConical, color: "text-blue-500" },
      { title: "Live Battles", desc: "1v1 real-time quiz battles with leaderboard",             href: "/live-battles",             icon: Zap, color: "text-red-500" },
      { title: "AI Tutor",     desc: "GPT-4 powered tutor available 24/7",                      href: "/ai-tutor",                 icon: Sparkles, color: "text-brand-500" },
      { title: "Community",    desc: "10K+ students, Q&A forum, study groups",                  href: "/community",                icon: Users, color: "text-green-500" },
    ],
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Explore Everything</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Learning Path
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From Class 9 to Graduation — explore all subjects, programming languages,
            engineering branches, and platform features.
          </p>
        </div>

        {/* Learning paths */}
        <div className="space-y-12">
          {PATHS.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-foreground mb-4">{section.category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:border-brand-500/30"
                  >
                    <item.icon className={`h-6 w-6 ${item.color} mb-3`} />
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors mt-3" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-12 p-6 rounded-2xl border bg-muted/30">
          <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Dashboard",    href: "/dashboard"        },
              { label: "Leaderboard", href: "/leaderboard"      },
              { label: "Test Center",  href: "/test-center"      },
              { label: "Practice",     href: "/practice"         },
              { label: "Mentorship",   href: "/mentorship"       },
              { label: "Pricing",      href: "/pricing"          },
              { label: "Blog",         href: "/blog"             },
              { label: "Events",       href: "/events"           },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm hover:border-brand-500/50 hover:text-brand-500 transition-colors"
              >
                {link.label}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
