/**
 * @file features/simulations/components/SimulationsCatalogue.tsx
 * @description Full simulations catalogue for the /simulations page
 *
 * Shows all 140+ interactive simulations organized by subject category:
 * Physics, Chemistry, Biology, Mathematics, DSA, Computer Networks,
 * Operating Systems, Database, Digital Logic, CPU, Sorting, Searching, etc.
 *
 * Features:
 * - Category filter tabs
 * - Search filter
 * - Grid of simulation cards
 * - Difficulty badges
 * - Direct links to each simulation
 *
 * Used in: app/(marketing)/simulations/page.tsx
 */

"use client"; // Client component — category filter + search state

import React, { useState, useMemo } from "react"; // React + hooks
import Link from "next/link"; // Navigation
import { motion } from "framer-motion"; // Entry animations
import {
  Search, Play, Star, Clock, ChevronRight,
  Atom, FlaskConical, Leaf, Calculator, Cpu, Zap,
  Network, Database, BarChart3, GitBranch, Layers,
  Radio, HardDrive, Monitor, Server, ArrowRight,
} from "lucide-react"; // Icons for categories
import { Badge }  from "@/components/ui/badge";  // Subject/level badges
import { Button } from "@/components/ui/button"; // CTA button
import { Input }  from "@/components/ui/input";  // Search input

/* ─── Types ──────────────────────────────────────────────────────────────── */

/** Difficulty levels for simulations */
type SimDifficulty = "Easy" | "Medium" | "Advanced";

/** A single simulation card's data */
interface Simulation {
  id:          string;        // Unique simulation slug
  title:       string;        // Display title
  description: string;        // Short description (1–2 sentences)
  category:    string;        // Category ID (e.g., "physics")
  class:       string;        // Relevant class/level (e.g., "Class 9")
  chapter:     string;        // NCERT chapter or topic
  difficulty:  SimDifficulty; // Difficulty level
  href:        string;        // Route to the simulation
  tags:        string[];      // Searchable tags
  isPopular?:  boolean;       // Whether to show "Popular" badge
  isNew?:      boolean;       // Whether to show "New" badge
}

/* ─── Category Config ────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "all",       name: "All",               emoji: "🔭", icon: BarChart3  },
  { id: "physics",   name: "Physics",           emoji: "⚛️", icon: Atom        },
  { id: "chemistry", name: "Chemistry",         emoji: "🧪", icon: FlaskConical},
  { id: "biology",   name: "Biology",           emoji: "🧬", icon: Leaf        },
  { id: "maths",     name: "Mathematics",       emoji: "📐", icon: Calculator  },
  { id: "dsa",       name: "DSA",               emoji: "🌳", icon: GitBranch   },
  { id: "networks",  name: "Networks",          emoji: "🌐", icon: Network     },
  { id: "os",        name: "Operating Systems", emoji: "💻", icon: Monitor     },
  { id: "database",  name: "Database",          emoji: "🗄️", icon: Database    },
  { id: "digital",   name: "Digital Logic",     emoji: "🔌", icon: Zap         },
  { id: "cpu",       name: "CPU & Memory",      emoji: "🧠", icon: Cpu         },
  { id: "circuits",  name: "Electronics",       emoji: "⚡", icon: Radio       },
];

/* ─── All Simulations ────────────────────────────────────────────────────── */
const ALL_SIMULATIONS: Simulation[] = [
  // ── Physics ────────────────────────────────────────────────────────────
  { id:"force-motion",    category:"physics",   title:"Force & Motion",           description:"Apply Newton's 1st & 2nd laws. Adjust mass, force, friction — watch acceleration in real time.", class:"Class 9",  chapter:"Force & Motion",         difficulty:"Easy",    href:"/simulations/physics/force-motion",    tags:["newton","force","acceleration"], isPopular:true },
  { id:"projectile",      category:"physics",   title:"Projectile Motion",        description:"Launch objects at different angles. Visualize trajectory, range, and time of flight.",              class:"Class 11", chapter:"Laws of Motion",         difficulty:"Medium",  href:"/simulations/physics/projectile",      tags:["projectile","angle","velocity"] },
  { id:"gravitation",     category:"physics",   title:"Universal Gravitation",    description:"Explore gravitational attraction between two masses. Watch how distance affects force.",           class:"Class 9",  chapter:"Gravitation",            difficulty:"Easy",    href:"/simulations/physics/gravitation",     tags:["gravity","mass","planet"] },
  { id:"waves",           category:"physics",   title:"Wave Propagation",         description:"Visualize transverse and longitudinal waves. Adjust frequency, amplitude, and wavelength.",       class:"Class 11", chapter:"Waves",                  difficulty:"Medium",  href:"/simulations/physics/waves",           tags:["wave","frequency","amplitude"] },
  { id:"electric-field",  category:"physics",   title:"Electric Field Lines",     description:"Place charges and watch the electric field pattern emerge. Interactive field line renderer.",     class:"Class 12", chapter:"Electric Charges",       difficulty:"Medium",  href:"/simulations/physics/electric-field",  tags:["electric","field","charge"] },
  { id:"simple-pendulum", category:"physics",   title:"Simple Pendulum",          description:"Vary length and gravity. Observe how period changes. Includes damped oscillation mode.",         class:"Class 11", chapter:"Oscillations",           difficulty:"Easy",    href:"/simulations/physics/pendulum",        tags:["pendulum","oscillation","gravity"] },
  { id:"optics-refraction",category:"physics",  title:"Refraction of Light",      description:"Snell's Law visualizer. Change medium and angle of incidence. Total internal reflection demo.", class:"Class 10", chapter:"Light",                  difficulty:"Medium",  href:"/simulations/physics/refraction",      tags:["optics","refraction","lens"] },
  { id:"capacitor",       category:"physics",   title:"Parallel Plate Capacitor", description:"Change plate separation, area, and dielectric. Watch capacitance and E-field change.",           class:"Class 12", chapter:"Capacitance",            difficulty:"Advanced",href:"/simulations/physics/capacitor",       tags:["capacitor","dielectric","charge"] },
  { id:"doppler",         category:"physics",   title:"Doppler Effect",           description:"Move a sound source. Hear and visualize frequency compression/expansion due to motion.",         class:"Class 11", chapter:"Waves",                  difficulty:"Medium",  href:"/simulations/physics/doppler",         tags:["doppler","sound","frequency"] },
  { id:"nuclear",         category:"physics",   title:"Nuclear Decay Chain",      description:"Simulate alpha/beta/gamma decay. Watch isotopes transform over time with half-life animation.",  class:"Class 12", chapter:"Nuclei",                 difficulty:"Advanced",href:"/simulations/physics/nuclear",         tags:["nuclear","decay","radioactive"] },
  // ── Chemistry ──────────────────────────────────────────────────────────
  { id:"periodic-table",  category:"chemistry", title:"Interactive Periodic Table",description:"Click any element — electron configuration, properties, discovery date, and uses.",             class:"Class 10", chapter:"Periodic Classification",difficulty:"Easy",    href:"/simulations/chemistry/periodic-table",tags:["periodic","element","atom"], isPopular:true },
  { id:"acid-base",       category:"chemistry", title:"Acid–Base Titration",      description:"Perform virtual titration. Watch pH change as you add acid/base drop by drop.",                class:"Class 11", chapter:"Equilibrium",            difficulty:"Medium",  href:"/simulations/chemistry/titration",     tags:["acid","base","pH","titration"] },
  { id:"molecular-bonds", category:"chemistry", title:"Molecular Bond Angles",    description:"Rotate 3D molecules. View bond angles, lengths, and dipole moments for common compounds.",     class:"Class 11", chapter:"Chemical Bonding",       difficulty:"Medium",  href:"/simulations/chemistry/bonds",         tags:["molecule","bond","VSEPR"] },
  { id:"electrolysis",    category:"chemistry", title:"Electrolysis",             description:"Pass current through electrolyte solutions. See ions migrating and products forming.",           class:"Class 10", chapter:"Metals & Non-metals",   difficulty:"Easy",    href:"/simulations/chemistry/electrolysis",  tags:["electrolysis","ion","electrode"] },
  { id:"gas-laws",        category:"chemistry", title:"Gas Laws (Boyle, Charles)",description:"Compress gas in a piston. Watch P·V, T·V, and P/T relationships in real time.",                class:"Class 11", chapter:"States of Matter",       difficulty:"Medium",  href:"/simulations/chemistry/gas-laws",      tags:["gas","pressure","volume","temperature"] },
  // ── Biology ────────────────────────────────────────────────────────────
  { id:"cell-division",   category:"biology",   title:"Mitosis & Meiosis",        description:"Watch a cell divide through all stages: Prophase, Metaphase, Anaphase, Telophase.",            class:"Class 11", chapter:"Cell Division",          difficulty:"Medium",  href:"/simulations/biology/cell-division",   tags:["cell","mitosis","meiosis","chromosome"] },
  { id:"dna-replication", category:"biology",   title:"DNA Replication",          description:"Base-pairing animation. Helicase, polymerase, and Okazaki fragments in action.",                class:"Class 12", chapter:"Molecular Basis",        difficulty:"Advanced",href:"/simulations/biology/dna",             tags:["DNA","replication","genetics"] },
  { id:"human-heart",     category:"biology",   title:"Human Heart & Circulation",description:"Interactive heart anatomy. Watch the cardiac cycle and blood flow path through chambers.",     class:"Class 10", chapter:"Life Processes",         difficulty:"Easy",    href:"/simulations/biology/heart",           tags:["heart","blood","circulation"], isNew:true },
  { id:"photosynthesis",  category:"biology",   title:"Photosynthesis Process",   description:"Vary light intensity and CO₂. Watch chloroplast activity and glucose production change.",     class:"Class 10", chapter:"Life Processes",         difficulty:"Easy",    href:"/simulations/biology/photosynthesis",  tags:["photosynthesis","chloroplast","glucose"] },
  // ── Mathematics ────────────────────────────────────────────────────────
  { id:"function-grapher",category:"maths",     title:"Function Grapher",         description:"Plot any function. See tangents, derivatives, and integrals overlaid on the graph.",           class:"Class 11", chapter:"Relations & Functions",  difficulty:"Medium",  href:"/simulations/maths/function-grapher",  tags:["function","graph","calculus"], isPopular:true },
  { id:"matrix-ops",      category:"maths",     title:"Matrix Operations",        description:"Visualize matrix multiplication, determinants, eigenvalues, and linear transformations.",       class:"Class 12", chapter:"Matrices",               difficulty:"Advanced",href:"/simulations/maths/matrix",            tags:["matrix","determinant","linear"] },
  { id:"probability",     category:"maths",     title:"Probability Simulator",    description:"Roll dice, flip coins, draw cards. Observe how frequency converges to theoretical probability.",class:"Class 10", chapter:"Probability",            difficulty:"Easy",    href:"/simulations/maths/probability",       tags:["probability","statistics","dice"] },
  { id:"geometry",        category:"maths",     title:"Interactive Geometry",     description:"Construct triangles, circles, and polygons. Verify theorems with drag-and-explore.",           class:"Class 9",  chapter:"Triangles",              difficulty:"Easy",    href:"/simulations/maths/geometry",          tags:["geometry","triangle","proof"] },
  // ── DSA ────────────────────────────────────────────────────────────────
  { id:"sorting-visualizer",category:"dsa",    title:"Sorting Algorithm Visualizer",description:"Watch Bubble, Merge, Quick, Heap sort in action. Compare speeds. Control array size and speed.", class:"Engineering", chapter:"Algorithms",         difficulty:"Easy",    href:"/simulations/dsa/sorting-visualizer", tags:["sort","bubble","merge","quick"], isPopular:true },
  { id:"bst-visualizer",  category:"dsa",      title:"Binary Search Tree",         description:"Insert, delete, search nodes. See AVL rotations. Level-order and DFS traversal animations.",  class:"Engineering", chapter:"Trees",               difficulty:"Medium",  href:"/simulations/dsa/bst",                tags:["BST","tree","traversal"] },
  { id:"graph-bfs-dfs",   category:"dsa",      title:"Graph BFS & DFS",            description:"Build custom graphs. Run BFS and DFS step-by-step. Watch the frontier expand visually.",       class:"Engineering", chapter:"Graphs",              difficulty:"Medium",  href:"/simulations/dsa/graph-traversal",    tags:["graph","BFS","DFS","traversal"] },
  { id:"dp-visual",       category:"dsa",      title:"Dynamic Programming",        description:"Visualize LCS, Knapsack, LIS — see the DP table being filled step by step.",                   class:"Engineering", chapter:"Dynamic Programming", difficulty:"Advanced",href:"/simulations/dsa/dp",                 tags:["DP","dynamic","programming","table"], isNew:true },
  { id:"heap-viz",        category:"dsa",      title:"Heap & Priority Queue",      description:"Build a min-heap or max-heap visually. Insert, extract-min, and heapify operations.",         class:"Engineering", chapter:"Heaps",               difficulty:"Medium",  href:"/simulations/dsa/heap",               tags:["heap","priority","queue"] },
  { id:"linked-list",     category:"dsa",      title:"Linked List Operations",     description:"Insert, delete, reverse a singly/doubly/circular linked list — step by step animation.",      class:"Engineering", chapter:"Linked Lists",        difficulty:"Easy",    href:"/simulations/dsa/linked-list",        tags:["linked list","node","pointer"] },
  // ── Networks ───────────────────────────────────────────────────────────
  { id:"tcp-handshake",   category:"networks", title:"TCP 3-Way Handshake",        description:"Visualize SYN → SYN-ACK → ACK. See packet exchange and connection establishment.",           class:"Engineering", chapter:"Transport Layer",     difficulty:"Easy",    href:"/simulations/networks/tcp",           tags:["TCP","handshake","packet"] },
  { id:"dns-resolution",  category:"networks", title:"DNS Resolution",             description:"Step-by-step domain name resolution. Recursive vs. iterative queries visualized.",            class:"Engineering", chapter:"Application Layer",   difficulty:"Medium",  href:"/simulations/networks/dns",           tags:["DNS","domain","resolution"] },
  { id:"subnetting",      category:"networks", title:"IP Subnetting",              description:"Enter an IP + subnet mask. See the network divided visually. CIDR notation explained.",       class:"Engineering", chapter:"Network Layer",       difficulty:"Medium",  href:"/simulations/networks/subnetting",    tags:["IP","subnet","CIDR"] },
  // ── Operating Systems ──────────────────────────────────────────────────
  { id:"process-scheduling",category:"os",     title:"CPU Scheduling",             description:"Compare FCFS, SJF, Round Robin, Priority. Gantt chart + waiting/turnaround time.",           class:"Engineering", chapter:"Process Management",  difficulty:"Medium",  href:"/simulations/os/scheduling",          tags:["CPU","FCFS","SJF","Round Robin"], isPopular:true },
  { id:"page-replacement", category:"os",      title:"Page Replacement Algorithms",description:"FIFO, LRU, Optimal — visualize page faults and hits on a reference string.",                 class:"Engineering", chapter:"Memory Management",   difficulty:"Medium",  href:"/simulations/os/page-replacement",    tags:["page","LRU","FIFO","memory"] },
  { id:"deadlock",         category:"os",      title:"Deadlock Detection",         description:"Build a resource allocation graph. Run Banker's algorithm. See safe/unsafe states.",         class:"Engineering", chapter:"Process Management",  difficulty:"Advanced",href:"/simulations/os/deadlock",            tags:["deadlock","banker","resource"] },
  // ── Database ───────────────────────────────────────────────────────────
  { id:"normalization",    category:"database",title:"Database Normalization",     description:"Walk through 1NF → 2NF → 3NF → BCNF with example tables. See redundancies eliminated.",    class:"Engineering", chapter:"Normalization",       difficulty:"Medium",  href:"/simulations/database/normalization", tags:["normalization","1NF","BCNF"] },
  { id:"b-tree-viz",       category:"database",title:"B-Tree Index",               description:"Insert keys into a B-tree. Watch splits and promotions. Understand database indexing.",       class:"Engineering", chapter:"Indexing",            difficulty:"Advanced",href:"/simulations/database/b-tree",        tags:["B-tree","index","database"] },
  // ── Digital Logic ──────────────────────────────────────────────────────
  { id:"logic-gates",      category:"digital", title:"Logic Gates Simulator",      description:"Build circuits with AND, OR, NOT, NAND, XOR gates. See truth tables update in real time.",  class:"Engineering", chapter:"Digital Logic",       difficulty:"Easy",    href:"/simulations/digital/logic-gates",    tags:["logic","gates","AND","OR","XOR"] },
  { id:"flip-flops",       category:"digital", title:"Flip-Flops & Latches",       description:"SR, D, JK, T flip-flops — clocked behavior, state transitions, and timing diagrams.",       class:"Engineering", chapter:"Sequential Circuits", difficulty:"Medium",  href:"/simulations/digital/flip-flops",     tags:["flip-flop","latch","clock","SR"] },
  // ── CPU / Memory ───────────────────────────────────────────────────────
  { id:"cache-sim",        category:"cpu",     title:"Cache Memory Simulator",     description:"Direct mapped, set associative, fully associative — trace cache hits and misses.",           class:"Engineering", chapter:"Computer Org.",       difficulty:"Advanced",href:"/simulations/cpu/cache",              tags:["cache","memory","hit","miss"] },
  { id:"instruction-cycle",category:"cpu",     title:"Instruction Cycle",          description:"Fetch → Decode → Execute → Write-back on a simplified CPU. See register values change.",    class:"Engineering", chapter:"Computer Org.",       difficulty:"Medium",  href:"/simulations/cpu/instruction-cycle",  tags:["CPU","fetch","decode","execute"] },
];

/* ─── Difficulty color ───────────────────────────────────────────────────── */
const DIFF_STYLE: Record<SimDifficulty, string> = {
  Easy:     "border-green-500/40 text-green-600",
  Medium:   "border-yellow-500/40 text-yellow-600",
  Advanced: "border-red-500/40 text-red-600",
};

/* ─── SimulationsCatalogue Component ─────────────────────────────────────── */

/**
 * Full simulations catalogue with category filters and search.
 */
export function SimulationsCatalogue() {
  const [activeCategory, setActiveCategory] = useState("all"); // Active filter tab
  const [searchQuery,    setSearchQuery]    = useState("");    // Search text

  // Filter simulations based on active category and search query
  const filtered = useMemo(() => {
    return ALL_SIMULATIONS.filter(sim => {
      // Category filter
      const matchCat = activeCategory === "all" || sim.category === activeCategory;
      // Search filter — checks title, description, and tags
      const q = searchQuery.toLowerCase();
      const matchSearch = !q
        || sim.title.toLowerCase().includes(q)
        || sim.description.toLowerCase().includes(q)
        || sim.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-12">
      <div className="container px-4 md:px-6">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Interactive Simulations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            140+ interactive simulations across Physics, Chemistry, Biology, Mathematics, DSA, and Computer Science.
            Learn by doing, not just reading.
          </p>
        </div>

        {/* ── Search bar ─────────────────────────────────────────── */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search simulations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* ── Category filter tabs ────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat.id
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border text-muted-foreground hover:border-brand-500/50 hover:text-foreground"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
              {/* Show count for non-all categories */}
              {cat.id !== "all" && (
                <span className={`text-xs ${activeCategory === cat.id ? "text-white/70" : "text-muted-foreground"}`}>
                  ({ALL_SIMULATIONS.filter(s => s.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Results count ───────────────────────────────────────── */}
        <p className="text-sm text-muted-foreground mb-6 text-center">
          Showing <strong>{filtered.length}</strong> simulations
          {activeCategory !== "all" && ` in ${CATEGORIES.find(c => c.id === activeCategory)?.name}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>

        {/* ── Simulation grid ─────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((sim, i) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0.01, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
            >
              <Link href={sim.href}>
                <div className="h-full rounded-2xl border bg-card p-5 shadow-sm hover:shadow-md transition-all hover:border-brand-500/30 group cursor-pointer flex flex-col">
                  {/* Tags: Popular / New */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {sim.isPopular && (
                      <Badge variant="outline" className="h-5 text-xs gap-1 border-amber-500/40 text-amber-600">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" /> Popular
                      </Badge>
                    )}
                    {sim.isNew && (
                      <Badge variant="outline" className="h-5 text-xs border-green-500/40 text-green-600">
                        New
                      </Badge>
                    )}
                    <Badge variant="outline" className={`h-5 text-xs ${DIFF_STYLE[sim.difficulty]}`}>
                      {sim.difficulty}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-brand-500 transition-colors mb-1.5 leading-snug flex-1">
                    {sim.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {sim.description}
                  </p>

                  {/* Meta: class + chapter */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span className="bg-muted px-2 py-0.5 rounded-full">{sim.class}</span>
                    <div className="flex items-center gap-1 text-brand-500">
                      <Play className="h-3 w-3" /> Launch
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No simulations found. Try a different search or category.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="mt-12 text-center p-8 rounded-2xl border bg-brand-500/5 border-brand-500/20">
          <h3 className="text-xl font-bold text-foreground mb-2">Request a Simulation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Don't see what you need? Request it and our team will build it.
          </p>
          <Link href="/contact">
            <Button className="gap-1.5">
              Request a Simulation <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
