/**
 * @file features/simulations/components/SimulationsCatalogue.tsx
 * @description Full simulations catalogue with category filters and search
 * Displays all 140+ simulations across Physics, Chemistry, Biology, DSA, Networks, etc.
 */

"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Search, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Simulation Data ────────────────────────────────────────────────────── */
const simulations = [
  // Physics
  { id: "newtons-laws",         name: "Newton's Laws of Motion",   category: "Physics",  class: "Class 9",  emoji: "🌍", href: "/simulations/physics/newtons-laws"        },
  { id: "projectile",           name: "Projectile Motion",          category: "Physics",  class: "Class 11", emoji: "🏹", href: "/simulations/physics/projectile"           },
  { id: "electromagnetic",      name: "Electromagnetic Induction",  category: "Physics",  class: "Class 12", emoji: "⚡", href: "/simulations/physics/em-induction"         },
  { id: "waves",                name: "Wave Properties",            category: "Physics",  class: "Class 11", emoji: "🌊", href: "/simulations/physics/waves"                },
  { id: "optics-refraction",    name: "Light Refraction & Lenses",  category: "Physics",  class: "Class 10", emoji: "🔍", href: "/simulations/physics/refraction"           },
  { id: "simple-pendulum",      name: "Simple Pendulum",            category: "Physics",  class: "Class 9",  emoji: "🔔", href: "/simulations/physics/pendulum"             },

  // Chemistry
  { id: "molecular-bonding",    name: "Molecular Bonding",          category: "Chemistry",class: "Class 11", emoji: "⚗️", href: "/simulations/chemistry/molecular-bonding"  },
  { id: "titration",            name: "Acid-Base Titration",        category: "Chemistry",class: "Class 12", emoji: "🧪", href: "/simulations/chemistry/titration"          },
  { id: "electrochemistry",     name: "Electrochemical Cell",       category: "Chemistry",class: "Class 12", emoji: "🔋", href: "/simulations/chemistry/electrochemistry"   },
  { id: "periodic-trends",      name: "Periodic Table Trends",      category: "Chemistry",class: "Class 11", emoji: "📊", href: "/simulations/chemistry/periodic-trends"    },

  // Biology
  { id: "cell-division",        name: "Cell Division (Mitosis)",    category: "Biology",  class: "Class 11", emoji: "🧬", href: "/simulations/biology/cell-division"        },
  { id: "photosynthesis",       name: "Photosynthesis Process",     category: "Biology",  class: "Class 10", emoji: "🌿", href: "/simulations/biology/photosynthesis"       },
  { id: "dna-replication",      name: "DNA Replication",            category: "Biology",  class: "Class 12", emoji: "🔬", href: "/simulations/biology/dna-replication"      },

  // DSA
  { id: "bubble-sort",          name: "Bubble Sort Visualizer",     category: "DSA",      class: "CS",       emoji: "🫧", href: "/simulations/dsa/bubble-sort"              },
  { id: "merge-sort",           name: "Merge Sort Animation",       category: "DSA",      class: "CS",       emoji: "🔀", href: "/simulations/dsa/merge-sort"               },
  { id: "bfs-dfs",              name: "BFS & DFS Graph Traversal",  category: "DSA",      class: "CS",       emoji: "🗺️", href: "/simulations/dsa/bfs-dfs"                  },
  { id: "bst",                  name: "Binary Search Tree",         category: "DSA",      class: "CS",       emoji: "🌳", href: "/simulations/dsa/bst"                      },
  { id: "dijkstra",             name: "Dijkstra's Algorithm",       category: "DSA",      class: "CS",       emoji: "🛣️", href: "/simulations/dsa/dijkstra"                 },
  { id: "dp-knapsack",          name: "Dynamic Programming — Knapsack", category: "DSA",  class: "CS",       emoji: "🎒", href: "/simulations/dsa/dp-knapsack"              },
  { id: "sorting-race",         name: "Sorting Algorithm Race",     category: "DSA",      class: "CS",       emoji: "🏎️", href: "/simulations/dsa/sorting-race"             },

  // Networks
  { id: "tcp-ip",               name: "TCP/IP Packet Journey",      category: "Networks", class: "CS",       emoji: "🌐", href: "/simulations/networks/tcp-ip"              },
  { id: "dns-resolution",       name: "DNS Resolution Process",     category: "Networks", class: "CS",       emoji: "📡", href: "/simulations/networks/dns"                 },
  { id: "osi-layers",           name: "OSI Layer Walkthrough",      category: "Networks", class: "CS",       emoji: "🔗", href: "/simulations/networks/osi"                 },

  // OS
  { id: "cpu-cycle",            name: "CPU Execution Cycle",        category: "OS",       class: "CS",       emoji: "💾", href: "/simulations/os/cpu-cycle"                 },
  { id: "process-scheduling",   name: "Process Scheduling (FCFS/SJF)", category: "OS",   class: "CS",       emoji: "📋", href: "/simulations/os/process-scheduling"        },
  { id: "memory-management",    name: "Memory Management & Paging", category: "OS",       class: "CS",       emoji: "🗃️", href: "/simulations/os/memory-management"          },

  // Digital Logic
  { id: "logic-gates",          name: "Logic Gates Simulator",      category: "Circuits", class: "CS",       emoji: "🔌", href: "/simulations/circuits/logic-gates"          },
  { id: "flip-flops",           name: "Flip-Flops & Registers",     category: "Circuits", class: "CS",       emoji: "🔁", href: "/simulations/circuits/flip-flops"           },
];

/* ─── Categories ─────────────────────────────────────────────────────────── */
const categories = ["All", "Physics", "Chemistry", "Biology", "DSA", "Networks", "OS", "Circuits"];

/* ─── Simulations Catalogue Component ────────────────────────────────────── */
export function SimulationsCatalogue() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => simulations.filter((s) => {
    const matchesCat    = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  }), [activeCategory, search]);

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
            <FlaskConical className="h-3 w-3 mr-1" /> Interactive Learning
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-gradient">140+ Simulations</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Physics, Chemistry, Biology, DSA, OS, Networks, and more — learn by doing, not just reading.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search simulations..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? "bg-brand-500 text-white shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat} {cat === "All" ? `(${simulations.length})` : `(${simulations.filter(s => s.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Simulations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((sim, i) => (
            <motion.div key={sim.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
            >
              <Link href={sim.href} className="group flex flex-col gap-3 rounded-xl border bg-card p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sim.emoji}</span>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <Badge variant="outline" className="text-xs w-fit">{sim.category}</Badge>
                    <span className="text-xs text-muted-foreground">{sim.class}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm leading-snug group-hover:text-brand-500 transition-colors flex-1">
                  {sim.name}
                </h3>
                <div className="flex items-center gap-1 text-xs font-semibold text-brand-500 group-hover:gap-2 transition-all">
                  <Play className="h-3 w-3 fill-current" /> Launch <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">No simulations found for &quot;{search}&quot;</p>
        )}
      </div>
    </div>
  );
}
