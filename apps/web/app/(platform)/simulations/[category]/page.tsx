/**
 * @file app/(platform)/simulations/[category]/page.tsx
 * @description Simulation category page — lists all simulations for Physics/Chemistry/Math
 * Route: /simulations/[category]  (e.g. /simulations/physics)
 * Shows: Grid of interactive simulations with embedded iframe previews
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, Play, Atom, FlaskConical, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── Simulation Category Data ───────────────────────────────────────────── */
const SIMULATIONS_DATA: Record<string, {
  name:        string;
  icon:        React.ComponentType<{ className?: string }>;
  emoji:       string;
  description: string;
  color:       string;
  simulations: { id: string; title: string; chapter: string; class: string; topics: string[]; href: string }[];
}> = {
  physics: {
    name:        "Physics Simulations",
    icon:        Atom,
    emoji:       "⚛️",
    description: "Interactive physics simulations — visualize laws of motion, forces, waves, electricity, and more. Built with real physics engines.",
    color:       "blue",
    simulations: [
      { id:"force-motion",     title:"Force & Motion Simulator",     chapter:"Force & Laws of Motion", class:"Class 9", topics:["Newton's Laws","Friction","Momentum"],                 href:"/simulations/physics/force-motion"     },
      { id:"gravitation",      title:"Gravitational Force Explorer",  chapter:"Gravitation",           class:"Class 9", topics:["Universal Law of Gravitation","g on planets"],          href:"/simulations/physics/gravitation"      },
      { id:"work-energy",      title:"Work & Energy Calculator",     chapter:"Work and Energy",        class:"Class 9", topics:["KE","PE","Work-Energy Theorem","Conservation"],         href:"/simulations/physics/work-energy"      },
      { id:"projectile",       title:"Projectile Motion Lab",        chapter:"Motion",                class:"Class 9", topics:["Range","Max Height","Angle vs Range"],                  href:"/simulations/physics/projectile"       },
      { id:"waves-sound",      title:"Sound Wave Visualizer",        chapter:"Sound",                 class:"Class 9", topics:["Frequency","Amplitude","Wavelength","Doppler Effect"],   href:"/simulations/physics/waves-sound"      },
      { id:"electric-circuits",title:"Electric Circuit Builder",     chapter:"Electricity",           class:"Class 10",topics:["Ohm's Law","Series/Parallel","Resistance"],             href:"/simulations/physics/electric-circuits" },
      { id:"optics-lenses",    title:"Lens & Mirror Ray Tracer",     chapter:"Light",                 class:"Class 10",topics:["Reflection","Refraction","Focal Length","Ray Diagrams"],href:"/simulations/physics/optics-lenses"    },
      { id:"magnetic-field",   title:"Magnetic Field Visualizer",    chapter:"Magnetic Effects",      class:"Class 10",topics:["Field Lines","Solenoid","Electromagnet"],               href:"/simulations/physics/magnetic-field"   },
      { id:"capacitor",        title:"Capacitor Charge/Discharge",   chapter:"Electric Charge",       class:"Class 12",topics:["Charging","Discharging","RC Circuits"],                 href:"/simulations/physics/capacitor"        },
      { id:"electromagnetic",  title:"EM Wave Simulator",            chapter:"EM Waves",              class:"Class 12",topics:["E-field","B-field","Wave Properties"],                  href:"/simulations/physics/electromagnetic"  },
    ],
  },

  chemistry: {
    name:        "Chemistry Simulations",
    icon:        FlaskConical,
    emoji:       "🧪",
    description: "Virtual chemistry lab — reactions, molecular models, titrations, and orbital visualizations. Safe exploration of real chemistry.",
    color:       "green",
    simulations: [
      { id:"atoms-molecules",  title:"Atom Structure Explorer",  chapter:"Atoms & Molecules",     class:"Class 9",  topics:["Bohr Model","Electron Shells","Atomic Number"],        href:"/simulations/chemistry/atoms-molecules"  },
      { id:"chemical-bonding", title:"Chemical Bonding Lab",     chapter:"Chemical Bonding",      class:"Class 11", topics:["Ionic","Covalent","Metallic","Lewis Structure"],        href:"/simulations/chemistry/chemical-bonding" },
      { id:"ph-titration",     title:"Acid-Base Titration",      chapter:"Acids, Bases & Salts",  class:"Class 10", topics:["pH Scale","Neutralization","Indicator Colors"],        href:"/simulations/chemistry/ph-titration"     },
      { id:"reaction-rates",   title:"Reaction Rate Simulator",  chapter:"Chemical Kinetics",     class:"Class 12", topics:["Rate Law","Activation Energy","Arrhenius Equation"],   href:"/simulations/chemistry/reaction-rates"   },
      { id:"electrochemistry", title:"Electrochemical Cell",     chapter:"Electrochemistry",      class:"Class 12", topics:["Galvanic Cell","EMF","Nernst Equation"],               href:"/simulations/chemistry/electrochemistry" },
    ],
  },

  mathematics: {
    name:        "Mathematics Simulations",
    icon:        Calculator,
    emoji:       "📐",
    description: "Visual mathematics — explore geometry, functions, probability, and statistics through interactive graphing tools.",
    color:       "purple",
    simulations: [
      { id:"geometry-explorer", title:"Triangle Geometry Explorer",  chapter:"Triangles",         class:"Class 9",  topics:["Congruence Criteria","Area","Pythagoras"],            href:"/simulations/mathematics/geometry-explorer" },
      { id:"coordinate-grapher",title:"Coordinate Geometry Grapher", chapter:"Coordinate Geometry",class:"Class 9",  topics:["Plotting Points","Distance","Linear Equations"],     href:"/simulations/mathematics/coordinate-grapher" },
      { id:"function-plotter",  title:"Function & Graph Plotter",    chapter:"Functions",         class:"Class 11", topics:["Domain","Range","Transformation","Inverse"],          href:"/simulations/mathematics/function-plotter"  },
      { id:"probability-sim",   title:"Probability Simulator",       chapter:"Probability",       class:"Class 10", topics:["Coin Toss","Dice Roll","Frequency vs Probability"],   href:"/simulations/mathematics/probability-sim"   },
      { id:"statistics-viz",    title:"Statistics Visualizer",       chapter:"Statistics",        class:"Class 9",  topics:["Mean/Median/Mode","Histogram","Box Plot"],            href:"/simulations/mathematics/statistics-viz"    },
    ],
  },
};

/* ─── Import React for icon type ─────────────────────────────────────────── */
import type React from "react";

/* ─── generateMetadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const data = SIMULATIONS_DATA[category];
  if (!data) return { title: "Simulations — LearnVeda" };

  return {
    title:       `${data.name} — Interactive Learning | LearnVeda`,
    description: data.description,
    keywords:    [`${data.name}`, "Interactive simulations", "CBSE science", "LearnVeda"],
  };
}

/* ─── Simulation Category Page ───────────────────────────────────────────── */
export default async function SimulationCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = SIMULATIONS_DATA[category];

  // 404 for unknown categories
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">No simulations found</div>
          <Button asChild><Link href="/simulations">Back to Simulations</Link></Button>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background">
        <div className="container px-4 py-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/simulations" className="hover:text-foreground transition-colors">Simulations</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium capitalize">{category}</span>
          </nav>

          <div className="flex items-start gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl shrink-0">
              {data.emoji}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
              <p className="text-muted-foreground max-w-2xl">{data.description}</p>
            </div>
          </div>

          <Badge variant="secondary" className="text-xs">
            {data.simulations.length} simulations available
          </Badge>
        </div>
      </div>

      {/* ── Simulations Grid ──────────────────────────────────────────────── */}
      <div className="container px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.simulations.map((sim) => (
            <Link
              key={sim.id}
              href={sim.href}
              className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Simulation preview placeholder */}
              <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-b">
                <div className="flex flex-col items-center gap-2 text-primary/60 group-hover:text-primary/80 transition-colors">
                  <Icon className="h-10 w-10" />
                  <span className="text-xs">Click to launch</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[9px]">{sim.class}</Badge>
                  <span className="text-[10px] text-muted-foreground">{sim.chapter}</span>
                </div>

                <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                  {sim.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {sim.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    <Play className="h-3 w-3 mr-1 text-green-500" />
                    Launch
                  </Button>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
