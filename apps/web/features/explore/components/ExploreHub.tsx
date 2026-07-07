/**
 * @file features/explore/components/ExploreHub.tsx
 * @description Explore page — content discovery hub for all LearnVeda learning content
 *
 * Sections:
 *  1. Hero search bar — find any topic/chapter/language instantly
 *  2. Featured subjects grid — Class 9-12, Engineering, CS, Programming
 *  3. Curated learning paths (e.g., "Class 10 Board Sprint", "SDE Prep Path")
 *  4. Trending topics this week
 *  5. Browse by category with item counts
 *  6. CTA to get started
 *
 * Used in: app/(marketing)/explore/page.tsx
 */

"use client"; // Client component — search state + filter

import React, { useState } from "react"; // React + state
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Animations
import {
  Search, ArrowRight, Star, Zap, BookOpen, Code2,
  Brain, GraduationCap, ChevronRight, TrendingUp,
  Clock, Users, Trophy, Flame,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";  // Labels
import { Button } from "@/components/ui/button"; // CTA
import { Input }  from "@/components/ui/input";  // Search

/* ─── Featured Subjects ──────────────────────────────────────────────────── */
const FEATURED = [
  { emoji:"📗", title:"Class 9",      sub:"CBSE · 7 subjects",    href:"/learn/class-9",          color:"from-blue-500 to-cyan-500",    count:"90+ chapters"   },
  { emoji:"📘", title:"Class 10",     sub:"CBSE · Board prep",     href:"/learn/class-10",         color:"from-green-500 to-teal-500",   count:"95+ chapters"   },
  { emoji:"📙", title:"Class 11",     sub:"Science/Commerce/Arts", href:"/learn/class-11",         color:"from-orange-500 to-amber-500", count:"110+ chapters"  },
  { emoji:"📕", title:"Class 12",     sub:"CBSE · JEE/NEET",      href:"/learn/class-12",         color:"from-purple-500 to-pink-500",  count:"115+ chapters"  },
  { emoji:"🐍", title:"Python",       sub:"45-day plan",           href:"/programming/python",     color:"from-yellow-500 to-green-500", count:"45 lessons"     },
  { emoji:"🌳", title:"DSA",          sub:"60-day plan · FAANG",   href:"/core-cs/dsa",            color:"from-brand-500 to-purple-500", count:"60 lessons"     },
  { emoji:"💻", title:"CSE Sem 1-8",  sub:"Engineering · 8 sems",  href:"/learn/engineering/cse",  color:"from-indigo-500 to-blue-500",  count:"200+ topics"    },
  { emoji:"🗄️", title:"System Design",sub:"25-day plan",           href:"/core-cs/system-design",  color:"from-teal-500 to-cyan-500",    count:"25 lessons"     },
];

/* ─── Learning Paths ─────────────────────────────────────────────────────── */
const LEARNING_PATHS = [
  { id:"boards-10",  title:"Class 10 Board Sprint",       emoji:"🎯", days:30, level:"Class 10",  topics:["Maths","Science","SST","English"],             href:"/learn/class-10", color:"border-blue-500/30 bg-blue-500/5"  },
  { id:"boards-12",  title:"Class 12 Science Sprint",     emoji:"🚀", days:45, level:"Class 12",  topics:["Physics","Chemistry","Maths","Biology"],        href:"/learn/class-12", color:"border-purple-500/30 bg-purple-500/5"},
  { id:"sde-prep",   title:"SDE Interview Prep Path",     emoji:"💼", days:90, level:"Engineering",topics:["DSA","System Design","OS","DBMS","CN"],        href:"/core-cs/dsa",    color:"border-green-500/30 bg-green-500/5" },
  { id:"python-path",title:"Python → Flask Web Dev",      emoji:"🐍", days:60, level:"Beginner",  topics:["Python","HTML/CSS","Flask","SQLite"],            href:"/programming/python", color:"border-yellow-500/30 bg-yellow-500/5" },
  { id:"cp-path",    title:"Competitive Programming",     emoji:"🏆", days:60, level:"Advanced",  topics:["Algorithms","Data Structures","Math","Practice"],href:"/core-cs/cp",     color:"border-orange-500/30 bg-orange-500/5" },
  { id:"jee-path",   title:"JEE Main Prep",               emoji:"⚛️", days:60, level:"Class 12",  topics:["Physics","Chemistry","Mathematics"],            href:"/learn/class-12", color:"border-red-500/30 bg-red-500/5"     },
];

/* ─── Trending Topics ────────────────────────────────────────────────────── */
const TRENDING = [
  { label:"Newton's Laws",          href:"/learn/class-9/science/chapter-09",    count:"12.4K views" },
  { label:"Python Functions",       href:"/programming/python/day-12",           count:"9.8K views"  },
  { label:"Sorting Algorithms",     href:"/simulations/dsa/sorting-visualizer",  count:"8.1K views"  },
  { label:"Quadratic Equations",    href:"/learn/class-10/mathematics/chapter-04",count:"7.6K views" },
  { label:"TCP/IP Model",           href:"/core-cs/cn",                          count:"6.9K views"  },
  { label:"Binary Search Tree",     href:"/simulations/dsa/bst",                 count:"6.2K views"  },
  { label:"Acid-Base Reactions",    href:"/simulations/chemistry/titration",     count:"5.8K views"  },
  { label:"OS Process Scheduling",  href:"/simulations/os/scheduling",           count:"5.3K views"  },
];

/* ─── Category Browse ────────────────────────────────────────────────────── */
const CATEGORIES = [
  { icon: BookOpen,       title:"CBSE Classes",          count:"400+ chapters",  href:"/learn",           color:"text-blue-500",   bg:"bg-blue-500/10"   },
  { icon: Code2,          title:"Programming Languages", count:"14 languages",   href:"/learn",           color:"text-green-500",  bg:"bg-green-500/10"  },
  { icon: Brain,          title:"Core CS Subjects",      count:"9 subjects",     href:"/core-cs/dsa",     color:"text-purple-500", bg:"bg-purple-500/10" },
  { icon: GraduationCap,  title:"Engineering (B.Tech)",  count:"9 branches",     href:"/learn",           color:"text-orange-500", bg:"bg-orange-500/10" },
  { icon: Zap,            title:"Simulations",           count:"140+ sims",      href:"/simulations",     color:"text-amber-500",  bg:"bg-amber-500/10"  },
  { icon: Trophy,         title:"Practice & Tests",      count:"10,000+ MCQs",   href:"/test-center",     color:"text-red-500",    bg:"bg-red-500/10"    },
];

/* ─── Animation variant ──────────────────────────────────────────────────── */
const fadeUp = (i: number) => ({
  initial:  { opacity: 0.01, y: 12 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.06 },
});

/* ─── ExploreHub Component ───────────────────────────────────────────────── */
export function ExploreHub() {
  const [query, setQuery] = useState(""); // Search input state

  /** Handle search — navigates to /search?q=... */
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">

        {/* ── Hero Search ─────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Explore Everything on LearnVeda
          </motion.h1>
          <motion.p {...fadeUp(1)} className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Find any chapter, simulation, language, or topic — across every learning track.
          </motion.p>

          {/* Search bar */}
          <motion.form {...fadeUp(2)} onSubmit={handleSearch} className="flex max-w-xl mx-auto gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search topics, chapters, languages..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-9 h-11"
              />
            </div>
            <Button type="submit" className="h-11 gap-1.5">
              Search <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.form>

          {/* Quick search suggestions */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["Python", "Newton's Laws", "DSA", "Class 10 Maths", "System Design"].map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); }}
                className="text-xs px-3 py-1 rounded-full border bg-muted text-muted-foreground hover:border-brand-500/50 hover:text-foreground transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Featured Subjects Grid ─────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Featured Subjects</h2>
            <Link href="/learn" className="text-sm text-brand-500 hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURED.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i)}>
                <Link href={item.href}>
                  <div className="rounded-2xl border bg-card p-4 hover:shadow-md transition-all group cursor-pointer">
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <p className="font-semibold text-sm text-foreground group-hover:text-brand-500 transition-colors">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                    <Badge variant="outline" className="text-xs mt-2">{item.count}</Badge>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Learning Paths ─────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-foreground">Curated Learning Paths</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARNING_PATHS.map((path, i) => (
              <motion.div key={path.id} {...fadeUp(i)}>
                <Link href={path.href}>
                  <div className={`h-full rounded-2xl border p-5 hover:shadow-md transition-all group cursor-pointer ${path.color}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{path.emoji}</span>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-brand-500 transition-colors">{path.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <Clock className="h-3 w-3" /> {path.days} days
                          <span>·</span>
                          <span>{path.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {path.topics.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 bg-background/60 text-muted-foreground rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Trending Topics ─────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Flame className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-bold text-foreground">Trending This Week</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TRENDING.map((topic, i) => (
              <motion.div key={topic.label} {...fadeUp(i)}>
                <Link href={topic.href}>
                  <div className="flex items-center justify-between rounded-xl border bg-card p-3.5 hover:border-brand-500/40 hover:shadow-sm transition-all group">
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-brand-500 transition-colors">{topic.label}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />{topic.count}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Browse by Category ──────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-5">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.title} {...fadeUp(i)}>
                <Link href={cat.href}>
                  <div className="flex items-center gap-4 rounded-2xl border bg-card p-4 hover:shadow-md transition-all group cursor-pointer">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${cat.bg} ${cat.color} flex-shrink-0`}>
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-brand-500 transition-colors">{cat.title}</p>
                      <p className="text-sm text-muted-foreground">{cat.count}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 ml-auto transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="text-center p-8 rounded-2xl border bg-brand-500/5 border-brand-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Ready to start learning?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Create your free account and track your progress across all subjects.
          </p>
          <Link href="/sign-up">
            <Button className="gap-1.5">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
