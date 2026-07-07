/**
 * @file features/programming/javascript/components/JavaScriptDayPlan.tsx
 * @description 30-Day JavaScript Learning Plan component
 *
 * Complete JavaScript curriculum from Beginner → DOM → ES6+ → Async → Projects.
 * Each day has: topic, concepts, time estimate, exercise count.
 *
 * Used in: /programming/javascript page
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Code2, Play, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── 30-Day JavaScript Curriculum ──────────────────────────────────────── */
const JS_DAYS = [
  // Phase 1: JavaScript Basics (Days 1–8)
  { day:1,  phase:1, topic:"Introduction to JavaScript",      concepts:["What is JS","Script tags","console.log","typeof"],            time:30, exercises:3 },
  { day:2,  phase:1, topic:"Variables & Data Types",          concepts:["var/let/const","Primitives","Type coercion","Template literals"],time:35, exercises:5 },
  { day:3,  phase:1, topic:"Operators & Control Flow",        concepts:["Arithmetic/Comparison","Logical","if/else","switch"],         time:35, exercises:5 },
  { day:4,  phase:1, topic:"Loops",                           concepts:["for/while/do-while","break/continue","for...of","for...in"],  time:40, exercises:6 },
  { day:5,  phase:1, topic:"Functions",                       concepts:["Declaration vs Expression","Arrow functions","Hoisting","Default params"],time:45,exercises:6 },
  { day:6,  phase:1, topic:"Arrays",                          concepts:["CRUD","map/filter/reduce","flat/flatMap","spread"],           time:45, exercises:7 },
  { day:7,  phase:1, topic:"Objects",                         concepts:["Literals","Destructuring","Object methods","Shorthand"],      time:45, exercises:6 },
  { day:8,  phase:1, topic:"Scope & Closures",                concepts:["Lexical scope","Closure","IIFE","Module pattern"],           time:50, exercises:5 },
  // Phase 2: DOM & Browser (Days 9–15)
  { day:9,  phase:2, topic:"DOM Basics",                      concepts:["querySelector","innerHTML","classList","dataset"],           time:45, exercises:5 },
  { day:10, phase:2, topic:"Events",                          concepts:["addEventListener","Event object","Bubbling","Delegation"],   time:50, exercises:6 },
  { day:11, phase:2, topic:"Forms & Validation",              concepts:["FormData","preventDefault","Custom validation","Regex"],     time:50, exercises:5 },
  { day:12, phase:2, topic:"DOM Projects",                    concepts:["Todo app","Counter","Color picker","Calculator"],            time:90, exercises:2 },
  { day:13, phase:2, topic:"localStorage & sessionStorage",   concepts:["setItem/getItem","JSON.stringify","Persist state"],         time:40, exercises:4 },
  { day:14, phase:2, topic:"Fetch API & REST",                concepts:["fetch()","Promises","JSON parsing","Error handling"],        time:55, exercises:4 },
  { day:15, phase:2, topic:"Async/Await",                     concepts:["async/await","try/catch","Promise.all","Parallel fetches"],  time:55, exercises:5 },
  // Phase 3: ES6+ Modern JS (Days 16–22)
  { day:16, phase:3, topic:"Classes & OOP",                   concepts:["class/extends","super()","Private fields","static"],        time:50, exercises:5 },
  { day:17, phase:3, topic:"Modules (ESM)",                   concepts:["import/export","Named vs default","Dynamic import","Bundlers"],time:45,exercises:4 },
  { day:18, phase:3, topic:"Iterators & Generators",          concepts:["Symbol.iterator","function*","yield","lazy sequences"],     time:45, exercises:3 },
  { day:19, phase:3, topic:"Proxy & Reflect",                 concepts:["Proxy traps","get/set/apply","Reflect API","Use cases"],    time:45, exercises:3 },
  { day:20, phase:3, topic:"Error Handling Patterns",         concepts:["Custom Errors","Error types","Result pattern","Typed errors"],time:40,exercises:4 },
  { day:21, phase:3, topic:"Functional JS",                   concepts:["Pure functions","Immutability","Currying","Composition"],   time:45, exercises:4 },
  { day:22, phase:3, topic:"Web APIs",                        concepts:["Intersection Observer","MutationObserver","ResizeObserver","requestAnimationFrame"],time:50,exercises:3 },
  // Phase 4: Projects (Days 23–30)
  { day:23, phase:4, topic:"Project 1: Weather App",          concepts:["OpenWeather API","fetch","UI update","Error states"],       time:90, exercises:1 },
  { day:24, phase:4, topic:"Project 2: Quiz App",             concepts:["Question bank","Timer","Score tracking","Local storage"],   time:90, exercises:1 },
  { day:25, phase:4, topic:"Project 3: Kanban Board",         concepts:["Drag & drop","localStorage","CRUD","UI state"],            time:120, exercises:1 },
  { day:26, phase:4, topic:"Project 4: Chat UI (WebSocket)",  concepts:["WebSocket API","Real-time UI","Message list","Input"],     time:120, exercises:1 },
  { day:27, phase:4, topic:"TypeScript Intro",                concepts:["Types","Interfaces","Generics","Type narrowing"],          time:60, exercises:4 },
  { day:28, phase:4, topic:"Node.js Basics",                  concepts:["fs/path/http","npm","package.json","Express intro"],       time:60, exercises:3 },
  { day:29, phase:4, topic:"Interview Prep: JS Concepts",     concepts:["Closure","Prototype chain","Event loop","this binding"],   time:90, exercises:5 },
  { day:30, phase:4, topic:"Final Review & Next Steps",       concepts:["React/Vue overview","Testing (Jest)","Career paths"],      time:60, exercises:2 },
];

const PHASES = [
  { id:1, name:"JavaScript Basics",    days:"1–8",   color:"from-yellow-500 to-orange-500", bg:"bg-yellow-500/10", border:"border-yellow-500/20" },
  { id:2, name:"DOM & Browser APIs",   days:"9–15",  color:"from-blue-500 to-cyan-500",     bg:"bg-blue-500/10",   border:"border-blue-500/20"  },
  { id:3, name:"ES6+ Modern JS",       days:"16–22", color:"from-purple-500 to-violet-500", bg:"bg-purple-500/10", border:"border-purple-500/20"},
  { id:4, name:"Projects",             days:"23–30", color:"from-green-500 to-teal-500",    bg:"bg-green-500/10",  border:"border-green-500/20" },
];

export function JavaScriptDayPlan() {
  const [completedDays] = useState<Set<number>>(new Set([1, 2]));
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([1]));

  function togglePhase(id: number) {
    setExpandedPhases(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const progressPct = Math.round((completedDays.size / 30) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">🌐</span>
        <h1 className="text-3xl font-bold text-foreground">JavaScript — 30-Day Plan</h1>
        <Badge className="ml-2 bg-yellow-500">Beginner</Badge>
      </div>
      <p className="text-muted-foreground mb-4">
        From browser scripting to async/await, DOM mastery, and real projects. Zero to hero in 30 days.
      </p>
      <div className="mt-4 mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{completedDays.size}/30 days ({progressPct}%)</span>
        </div>
        <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
      <div className="space-y-4">
        {PHASES.map(phase => {
          const phaseDays   = JS_DAYS.filter(d => d.phase === phase.id);
          const doneInPhase = phaseDays.filter(d => completedDays.has(d.day)).length;
          const isExpanded  = expandedPhases.has(phase.id);
          return (
            <div key={phase.id} className={`rounded-2xl border ${phase.border} overflow-hidden`}>
              <button onClick={() => togglePhase(phase.id)} className={`w-full flex items-center justify-between p-4 ${phase.bg} hover:opacity-90 transition-opacity`}>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${phase.color} text-white text-xs font-bold`}>Phase {phase.id}</div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{phase.name}</p>
                    <p className="text-xs text-muted-foreground">Days {phase.days} · {doneInPhase}/{phaseDays.length} completed</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
              </button>
              {isExpanded && (
                <div className="divide-y">
                  {phaseDays.map((d, i) => {
                    const isDone = completedDays.has(d.day);
                    const isNext = !isDone && d.day === Math.min(...JS_DAYS.filter(x => !completedDays.has(x.day)).map(x => x.day));
                    return (
                      <motion.div key={d.day} initial={{ opacity: 0.01, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: i * 0.03 }}
                        className={`flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors ${isDone ? "opacity-70" : ""}`}>
                        {isDone ? <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
                        <div className="flex-shrink-0 w-12 text-center">
                          <span className={`text-sm font-bold ${isDone ? "text-green-600" : "text-foreground"}`}>Day {d.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>{d.topic}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {d.concepts.slice(0, 3).map(c => (
                              <span key={c} className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded-md">{c}</span>
                            ))}
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {d.time} min</span>
                          <span className="flex items-center gap-1"><Code2 className="h-3.5 w-3.5" /> {d.exercises} ex</span>
                        </div>
                        <Link href={`/programming/javascript/day-${String(d.day).padStart(2, "0")}`} className="flex-shrink-0">
                          {isNext ? (
                            <Button size="sm" className="gap-1 h-7 text-xs"><Play className="h-3 w-3" /> Start</Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">{isDone ? "Review" : "Begin"} <ArrowRight className="h-3 w-3" /></Button>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
