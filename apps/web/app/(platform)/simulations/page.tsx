/**
 * @file app/(platform)/simulations/page.tsx
 * @description Simulations Hub — all interactive simulations on LearnVeda
 * Route: /simulations
 *
 * Catalog of every simulation grouped by subject/category:
 *   Physics · Chemistry · Biology · Mathematics
 *   Computer Science · Electronics · DSA · Networking · OS
 *
 * Server component — fully SSR for SEO + fast initial load.
 * Individual simulations are client components loaded dynamically.
 */

import type { Metadata } from "next"; // SEO metadata
import Link               from "next/link"; // Client-side navigation
import {
  Atom, FlaskConical, Leaf, Calculator, Cpu, Zap,
  Network, Database, BarChart3, ChevronRight,
  Play, Star, Clock, ArrowRight,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge component
import { Button } from "@/components/ui/button";  // Button component

/* ─── SEO Metadata ────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Interactive Simulations — LearnVeda",
  description:
    "25+ interactive simulations for Physics, Chemistry, Biology, Mathematics, CS, and DSA. " +
    "Visualize Newton's Laws, Chemical Reactions, Sorting Algorithms, CPU scheduling, and more.",
  keywords: [
    "physics simulation", "chemistry simulation", "DSA visualization",
    "CBSE interactive learning", "sorting algorithm animation",
    "Newton's laws simulation", "circuit simulation",
  ],
  openGraph: {
    title:       "Interactive Simulations — LearnVeda",
    description: "Explore 25+ interactive simulations for CBSE Class 9–12, Engineering, and CS.",
    type:        "website",
  },
};

/* ─── Simulation Category Type ───────────────────────────────────────────── */
type SimulationItem = {
  id:          string;  // Unique simulation identifier
  title:       string;  // Display name
  description: string;  // What it simulates
  class:       string;  // Relevant class (e.g., "Class 9")
  chapter:     string;  // NCERT chapter name
  difficulty:  "Easy" | "Medium" | "Advanced"; // Difficulty level
  href:        string;  // Route to simulation page
  tags:        string[];// Searchable tags
};

type SimulationCategory = {
  id:          string;
  name:        string;
  icon:        React.ComponentType<{ className?: string }>;
  emoji:       string;
  color:       string;  // Gradient class
  bg:          string;  // Background color
  description: string;
  simulations: SimulationItem[];
};

/* ─── Simulation Data ─────────────────────────────────────────────────────── */
// All simulations grouped by category
const SIMULATION_CATEGORIES: SimulationCategory[] = [
  {
    id:          "physics",
    name:        "Physics",
    icon:        Atom,
    emoji:       "⚛️",
    color:       "from-blue-500 to-cyan-500",
    bg:          "bg-blue-500/10",
    description: "Newton's Laws, Waves, Electricity, Optics — with live telemetry and controls",
    simulations: [
      {
        id:          "force-motion",
        title:       "Force & Motion Simulator",
        description: "Apply forces on objects, observe acceleration, friction, and Newton's 2nd Law in real time.",
        class:       "Class 9",
        chapter:     "Force & Laws of Motion",
        difficulty:  "Easy",
        href:        "/simulations/physics/force-motion",
        tags:        ["Newton's Laws", "Friction", "F=ma", "Momentum"],
      },
      {
        id:          "gravitation",
        title:       "Gravitational Force Explorer",
        description: "Visualize Universal Law of Gravitation — change masses and distances to see how g varies.",
        class:       "Class 9",
        chapter:     "Gravitation",
        difficulty:  "Easy",
        href:        "/simulations/physics/gravitation",
        tags:        ["Gravity", "g value", "Inverse Square Law", "Weight vs Mass"],
      },
      {
        id:          "projectile",
        title:       "Projectile Motion Lab",
        description: "Launch projectiles at any angle and speed — trace the parabolic path with live calculations.",
        class:       "Class 9",
        chapter:     "Motion",
        difficulty:  "Medium",
        href:        "/simulations/physics/projectile",
        tags:        ["Range", "Max Height", "Time of Flight", "Angle"],
      },
      {
        id:          "waves-sound",
        title:       "Sound Wave Visualizer",
        description: "See sound waves with adjustable frequency and amplitude. Observe constructive/destructive interference.",
        class:       "Class 9",
        chapter:     "Sound",
        difficulty:  "Medium",
        href:        "/simulations/physics/waves-sound",
        tags:        ["Frequency", "Wavelength", "Amplitude", "Doppler Effect"],
      },
      {
        id:          "electric-circuits",
        title:       "Electric Circuit Builder",
        description: "Build series and parallel circuits — calculate total resistance, current, voltage using Ohm's Law.",
        class:       "Class 10",
        chapter:     "Electricity",
        difficulty:  "Medium",
        href:        "/simulations/physics/electric-circuits",
        tags:        ["Ohm's Law", "Series Circuit", "Parallel Circuit", "Resistance"],
      },
      {
        id:          "optics-lenses",
        title:       "Lens & Mirror Ray Tracer",
        description: "Draw ray diagrams for concave/convex lenses and mirrors. Observe real/virtual image formation.",
        class:       "Class 10",
        chapter:     "Light — Reflection & Refraction",
        difficulty:  "Medium",
        href:        "/simulations/physics/optics-lenses",
        tags:        ["Reflection", "Refraction", "Focal Length", "Ray Diagrams"],
      },
    ],
  },
  {
    id:          "chemistry",
    name:        "Chemistry",
    icon:        FlaskConical,
    emoji:       "⚗️",
    color:       "from-green-500 to-emerald-500",
    bg:          "bg-green-500/10",
    description: "Molecular reactions, periodic table, electrolysis — interactive virtual lab",
    simulations: [
      {
        id:          "periodic-table",
        title:       "Interactive Periodic Table",
        description: "Explore all 118 elements with electron configuration, electronegativity, and trends visualization.",
        class:       "Class 9/10/11",
        chapter:     "Matter — Structure",
        difficulty:  "Easy",
        href:        "/simulations/chemistry/periodic-table",
        tags:        ["Elements", "Atomic Number", "Periodicity", "Electron Configuration"],
      },
      {
        id:          "atomic-structure",
        title:       "Atomic Structure Visualizer",
        description: "3D model of atoms — protons, neutrons, electrons, shells. Build and compare atoms.",
        class:       "Class 9",
        chapter:     "Structure of the Atom",
        difficulty:  "Easy",
        href:        "/simulations/chemistry/atomic-structure",
        tags:        ["Protons", "Electrons", "Neutrons", "Bohr Model"],
      },
      {
        id:          "chemical-reactions",
        title:       "Chemical Reaction Simulator",
        description: "Balance chemical equations, observe exothermic/endothermic reactions with energy level diagrams.",
        class:       "Class 10",
        chapter:     "Chemical Reactions",
        difficulty:  "Medium",
        href:        "/simulations/chemistry/chemical-reactions",
        tags:        ["Balancing Equations", "Exothermic", "Endothermic", "Reactants"],
      },
      {
        id:          "electrolysis",
        title:       "Electrolysis Lab",
        description: "Simulate electrolysis of water and brine — observe anode/cathode reactions and gas production.",
        class:       "Class 10",
        chapter:     "Metals and Non-metals",
        difficulty:  "Advanced",
        href:        "/simulations/chemistry/electrolysis",
        tags:        ["Electrolysis", "Cathode", "Anode", "Redox"],
      },
    ],
  },
  {
    id:          "mathematics",
    name:        "Mathematics",
    icon:        Calculator,
    emoji:       "📐",
    color:       "from-purple-500 to-violet-500",
    bg:          "bg-purple-500/10",
    description: "Geometry, graphs, functions, statistics — interactive math visualizations",
    simulations: [
      {
        id:          "geometry-explorer",
        title:       "Geometry Explorer",
        description: "Drag-and-drop Euclidean geometry — triangles, circles, angle bisectors, Pythagoras proof.",
        class:       "Class 9",
        chapter:     "Triangles / Circles",
        difficulty:  "Easy",
        href:        "/simulations/mathematics/geometry-explorer",
        tags:        ["Triangles", "Circles", "Angles", "Pythagoras"],
      },
      {
        id:          "function-grapher",
        title:       "Function Grapher",
        description: "Plot any mathematical function — linear, quadratic, cubic, trig. Observe transformations live.",
        class:       "Class 10/11",
        chapter:     "Polynomials / Relations",
        difficulty:  "Medium",
        href:        "/simulations/mathematics/function-grapher",
        tags:        ["Functions", "Graphs", "Polynomials", "Transformations"],
      },
      {
        id:          "statistics-visualizer",
        title:       "Statistics Visualizer",
        description: "Upload data, visualize mean/median/mode, create histograms, bar graphs, and box plots.",
        class:       "Class 9/10",
        chapter:     "Statistics",
        difficulty:  "Easy",
        href:        "/simulations/mathematics/statistics-visualizer",
        tags:        ["Mean", "Median", "Mode", "Histogram", "Bar Graph"],
      },
      {
        id:          "probability-simulator",
        title:       "Probability Simulator",
        description: "Simulate coin flips, dice rolls, card draws — visualize frequency vs theoretical probability.",
        class:       "Class 9/10",
        chapter:     "Probability",
        difficulty:  "Easy",
        href:        "/simulations/mathematics/probability-simulator",
        tags:        ["Probability", "Random Events", "Experiments", "Frequency"],
      },
    ],
  },
  {
    id:          "dsa",
    name:        "Data Structures & Algorithms",
    icon:        BarChart3,
    emoji:       "📊",
    color:       "from-orange-500 to-red-500",
    bg:          "bg-orange-500/10",
    description: "Sorting, searching, trees, graphs — step-by-step algorithm animations",
    simulations: [
      {
        id:          "sorting-visualizer",
        title:       "Sorting Algorithm Visualizer",
        description: "Watch Bubble Sort, Merge Sort, Quick Sort, Heap Sort — compare time and operations live.",
        class:       "Engineering / DSA",
        chapter:     "Sorting Algorithms",
        difficulty:  "Easy",
        href:        "/simulations/dsa/sorting-visualizer",
        tags:        ["Bubble Sort", "Merge Sort", "Quick Sort", "Complexity"],
      },
      {
        id:          "binary-search-tree",
        title:       "Binary Search Tree Visualizer",
        description: "Insert, delete, search nodes in a BST — watch traversals (in-order, pre-order, post-order) step by step.",
        class:       "Engineering / DSA",
        chapter:     "Trees",
        difficulty:  "Medium",
        href:        "/simulations/dsa/binary-search-tree",
        tags:        ["BST", "Tree Traversal", "In-order", "AVL Tree"],
      },
      {
        id:          "graph-traversal",
        title:       "Graph BFS & DFS Visualizer",
        description: "Animate BFS and DFS on any graph — see the visited order, queue/stack state, and shortest path.",
        class:       "Engineering / DSA",
        chapter:     "Graphs",
        difficulty:  "Medium",
        href:        "/simulations/dsa/graph-traversal",
        tags:        ["BFS", "DFS", "Shortest Path", "Adjacency Matrix"],
      },
      {
        id:          "dynamic-programming",
        title:       "Dynamic Programming Visualizer",
        description: "See Fibonacci DP table, 0/1 Knapsack, Longest Common Subsequence filled step by step.",
        class:       "Engineering / DSA",
        chapter:     "Dynamic Programming",
        difficulty:  "Advanced",
        href:        "/simulations/dsa/dynamic-programming",
        tags:        ["Fibonacci", "Knapsack", "LCS", "Memoization"],
      },
    ],
  },
  {
    id:          "computer-science",
    name:        "Computer Science",
    icon:        Cpu,
    emoji:       "💻",
    color:       "from-cyan-500 to-blue-500",
    bg:          "bg-cyan-500/10",
    description: "CPU, Memory, Cache, Compiler, OS — visualize how computers actually work",
    simulations: [
      {
        id:          "cpu-scheduler",
        title:       "CPU Scheduling Visualizer",
        description: "Simulate FCFS, SJF, Round Robin, Priority scheduling — see Gantt charts and waiting times.",
        class:       "Engineering / OS",
        chapter:     "Operating Systems",
        difficulty:  "Medium",
        href:        "/simulations/computer-science/cpu-scheduler",
        tags:        ["FCFS", "SJF", "Round Robin", "Gantt Chart"],
      },
      {
        id:          "memory-cache",
        title:       "Cache Memory Simulator",
        description: "Visualize L1/L2 cache hits and misses — Direct Mapped, Set Associative, Fully Associative policies.",
        class:       "Engineering / CN",
        chapter:     "Computer Organization",
        difficulty:  "Advanced",
        href:        "/simulations/computer-science/memory-cache",
        tags:        ["Cache", "L1 L2", "Hit Miss", "Associativity"],
      },
      {
        id:          "network-protocols",
        title:       "Network Protocol Visualizer",
        description: "Watch TCP handshake, HTTP request-response, DNS resolution — animated packet flow.",
        class:       "Engineering / CN",
        chapter:     "Computer Networks",
        difficulty:  "Medium",
        href:        "/simulations/computer-science/network-protocols",
        tags:        ["TCP", "HTTP", "DNS", "OSI Model"],
      },
    ],
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function SimulationsPage() {
  // Calculate total simulation count across all categories
  const totalSimulations = SIMULATION_CATEGORIES.reduce(
    (sum, cat) => sum + cat.simulations.length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Simulations</span>
          </nav>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight">Interactive Simulations</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            {totalSimulations}+ interactive simulations for CBSE Class 9–12, Engineering, and DSA.
            Visualize concepts you can&apos;t see in textbooks — from Newton&apos;s Laws to Sorting Algorithms.
          </p>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {SIMULATION_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1 text-sm hover:border-brand-500/50 hover:text-brand-500 transition-colors"
              >
                <span>{cat.emoji}</span>
                {cat.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {cat.simulations.length}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Simulation Categories ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {SIMULATION_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                <category.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 id={`${category.id}-heading`} className="text-xl font-bold flex items-center gap-2">
                  <span>{category.emoji}</span>
                  {category.name} Simulations
                </h2>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Link
                href={`/simulations/${category.id}`}
                className="ml-auto text-sm text-brand-500 hover:underline flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Simulation cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.simulations.map((sim) => (
                <Link
                  key={sim.id}
                  href={sim.href}
                  className="group rounded-xl border border-border/40 bg-card p-5 hover:border-border/80 hover:shadow-md transition-all"
                >
                  {/* Simulation header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${category.bg}`}>
                      <category.icon className="h-4 w-4" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        sim.difficulty === "Easy"     ? "border-green-500/50 text-green-600" :
                        sim.difficulty === "Medium"   ? "border-yellow-500/50 text-yellow-600" :
                        "border-red-500/50 text-red-600"
                      }`}
                    >
                      {sim.difficulty}
                    </Badge>
                  </div>

                  {/* Title and description */}
                  <h3 className="font-semibold text-sm group-hover:text-brand-500 transition-colors mb-1">
                    {sim.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {sim.description}
                  </p>

                  {/* Chapter info */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{sim.class}</Badge>
                    <span className="text-xs text-muted-foreground truncate">{sim.chapter}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {sim.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-muted/60 rounded px-1.5 py-0.5 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Launch button */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-brand-500 group-hover:gap-2.5 transition-all">
                    <Play className="h-3.5 w-3.5" />
                    Launch Simulation
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* CTA section */}
        <section className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-8 text-center">
          <Atom className="h-10 w-10 text-brand-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">More simulations coming soon!</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            We&apos;re building simulations for Biology, Electronics, Robotics, and more.
            Start learning with what&apos;s available today — every simulation is free.
          </p>
          <Button asChild>
            <Link href="/learn">
              Start Learning <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
