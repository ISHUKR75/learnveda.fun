/**
 * @file app/(platform)/cheatsheets/page.tsx
 * @description Cheatsheets hub — downloadable quick-reference cards for every subject
 * Route: /cheatsheets
 *
 * Curated one-page cheatsheets for CBSE, DSA, programming languages, and engineering.
 * Students can view, save, and download cheatsheets.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, Download, Star, Search, Eye,
  BookOpen, Code2, Cpu, Calculator, Atom, FlaskConical,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

/* ─── Cheatsheet catalogue ────────────────────────────────────────────────── */
/**
 * CHEATSHEETS
 * Curated quick-reference cards across subjects, DSA, and programming.
 */
const CHEATSHEETS = [
  // DSA
  { id: "dsa-arrays",     title: "Arrays & Strings",           category: "DSA",           emoji: "📊", pages: 2, stars: 1240, downloads: 8400, color: "from-blue-500 to-cyan-500",     tags: ["Two Pointers", "Sliding Window", "Prefix Sum"] },
  { id: "dsa-dp",         title: "Dynamic Programming",        category: "DSA",           emoji: "🌀", pages: 3, stars: 1890, downloads: 12300, color: "from-violet-500 to-purple-600", tags: ["1D DP", "2D DP", "Knapsack", "LCS", "LIS"]   },
  { id: "dsa-graphs",     title: "Graphs & Trees",             category: "DSA",           emoji: "🌳", pages: 3, stars: 1560, downloads: 10200, color: "from-green-500 to-teal-500",    tags: ["BFS", "DFS", "Dijkstra", "Trie", "Segment Tree"] },
  { id: "dsa-sorting",    title: "Sorting & Searching",        category: "DSA",           emoji: "🔃", pages: 1, stars: 980,  downloads: 6700,  color: "from-orange-500 to-amber-500",  tags: ["Quick Sort", "Merge Sort", "Binary Search"]  },
  // Programming
  { id: "py-basics",      title: "Python Essentials",          category: "Programming",   emoji: "🐍", pages: 2, stars: 2100, downloads: 15800, color: "from-yellow-500 to-orange-500", tags: ["Syntax", "List/Dict/Set", "OOP", "Decorators"] },
  { id: "js-es6",         title: "JavaScript ES6+",            category: "Programming",   emoji: "⚡", pages: 2, stars: 1780, downloads: 13400, color: "from-yellow-400 to-yellow-600", tags: ["Arrow Fn", "Destructuring", "Async/Await", "Promises"] },
  { id: "sql-cheatsheet", title: "SQL Cheatsheet",             category: "Programming",   emoji: "🗃️", pages: 2, stars: 1340, downloads: 9800,  color: "from-sky-500 to-blue-600",     tags: ["SELECT", "JOINs", "GROUP BY", "Subqueries"]  },
  { id: "cpp-stl",        title: "C++ STL",                    category: "Programming",   emoji: "⚙️", pages: 2, stars: 1120, downloads: 7600,  color: "from-gray-500 to-slate-600",   tags: ["vector", "map", "set", "priority_queue"]    },
  { id: "git-commands",   title: "Git Commands",               category: "Programming",   emoji: "🌿", pages: 1, stars: 2300, downloads: 18900, color: "from-red-500 to-orange-500",   tags: ["branch", "merge", "rebase", "cherry-pick"]  },
  // CBSE
  { id: "physics-formula", title: "Physics Formula Sheet",     category: "CBSE Class 12", emoji: "⚡", pages: 3, stars: 2890, downloads: 22000, color: "from-purple-500 to-violet-600", tags: ["Mechanics", "Electricity", "Optics", "Modern Physics"] },
  { id: "maths-integral",  title: "Integration Formulas",      category: "CBSE Class 12", emoji: "📐", pages: 2, stars: 2640, downloads: 19800, color: "from-blue-500 to-indigo-600",  tags: ["Standard Integrals", "By Parts", "Substitution"] },
  { id: "chemistry-org",   title: "Organic Chemistry Rxns",    category: "CBSE Class 12", emoji: "🧪", pages: 3, stars: 2120, downloads: 16400, color: "from-orange-500 to-amber-500", tags: ["Alcohols", "Aldehydes", "Amines", "Polymers"] },
  { id: "bio-diagrams",    title: "Biology Diagrams",          category: "CBSE Class 12", emoji: "🌱", pages: 4, stars: 1980, downloads: 14200, color: "from-green-500 to-teal-600",   tags: ["Heart", "Nephron", "Neuron", "Ovule", "Ear"]  },
  // Engineering
  { id: "dbms-normal",    title: "DBMS Normalization",         category: "Engineering",   emoji: "🗄️", pages: 2, stars: 890,  downloads: 5800,  color: "from-teal-500 to-cyan-600",    tags: ["1NF", "2NF", "3NF", "BCNF", "Functional Dep"] },
  { id: "os-concepts",    title: "OS Concepts",                category: "Engineering",   emoji: "💻", pages: 2, stars: 1010, downloads: 6900,  color: "from-slate-500 to-gray-600",   tags: ["Process", "Threads", "Scheduling", "Deadlock", "Paging"] },
  { id: "cn-protocols",   title: "Computer Networks",          category: "Engineering",   emoji: "🌐", pages: 2, stars: 870,  downloads: 5600,  color: "from-indigo-500 to-blue-600",  tags: ["OSI", "TCP/IP", "HTTP", "DNS", "Routing"]    },
] as const;

const CATEGORIES = ["All", "DSA", "Programming", "CBSE Class 12", "Engineering"] as const;
type Category = typeof CATEGORIES[number];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function CheatsheetsPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState<Category>("All");

  const filtered = CHEATSHEETS.filter((cs) => {
    const matchCat    = category === "All" || cs.category === category;
    const matchSearch = search === "" || cs.title.toLowerCase().includes(search.toLowerCase()) || cs.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const totalDownloads = CHEATSHEETS.reduce((acc, cs) => acc + cs.downloads, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-blue-950/5 to-background py-14">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-3">{CHEATSHEETS.length} Cheatsheets · Free</Badge>
          <h1 className="text-3xl font-extrabold mb-4">📄 Cheatsheets</h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl">
            One-page quick-reference cards for CBSE, DSA, programming languages, and core CS subjects.
            Created by toppers and educators. {totalDownloads.toLocaleString()}+ downloads.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> {CHEATSHEETS.length} Cheatsheets</span>
            <span className="flex items-center gap-1.5"><Download className="h-4 w-4" /> {(totalDownloads / 1000).toFixed(0)}K+ Downloads</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> Community Rated</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-muted/30 py-4 sticky top-0 z-10">
        <div className="container px-4 md:px-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-44 max-w-xs">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search cheatsheets…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${category === cat ? "bg-brand-500 text-white border-brand-500" : "hover:bg-muted"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="container px-4 md:px-6">
          <p className="text-sm text-muted-foreground mb-5">Showing {filtered.length} of {CHEATSHEETS.length} cheatsheets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((cs, i) => (
              <motion.div key={cs.id} initial={{ opacity: 0.01, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`h-1.5 w-full bg-gradient-to-r ${cs.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{cs.emoji}</span>
                    <Badge variant="secondary" className="text-xs">{cs.category}</Badge>
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-brand-500 transition-colors">{cs.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{cs.pages} page{cs.pages > 1 ? "s" : ""}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cs.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> {cs.stars.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Download className="h-3 w-3" /> {(cs.downloads / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1">
                      <Eye className="h-3 w-3" /> View
                    </Button>
                    <Button size="sm" variant="gradient" className="flex-1 h-8 text-xs gap-1">
                      <Download className="h-3 w-3" /> Save
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
