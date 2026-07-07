/**
 * @file features/test-center/components/TestCenterPage.tsx
 * @description Test Center page component — all exam categories with exam cards
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Award, Users, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const examCategories = [
  {
    id: "cbse", title: "CBSE Board", emoji: "📋", badge: "Official Syllabus",
    tests: [
      { name: "Class 10 — Full Board Simulation", questions: 100, time: "3h", takers: 4500 },
      { name: "Class 12 — Math Mock #1",          questions: 80,  time: "3h", takers: 3200 },
      { name: "Class 12 — Physics Mock #1",       questions: 70,  time: "3h", takers: 2900 },
      { name: "Class 12 — Chemistry Mock #1",     questions: 70,  time: "3h", takers: 2700 },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "jee", title: "JEE / NEET", emoji: "🏆", badge: "Entrance Exams",
    tests: [
      { name: "JEE Main — Physics Full Test",     questions: 30, time: "1h", takers: 2100 },
      { name: "JEE Main — Chemistry Full Test",   questions: 30, time: "1h", takers: 1900 },
      { name: "JEE Main — Math Full Test",        questions: 30, time: "1h", takers: 2300 },
      { name: "NEET — Biology Full Test",         questions: 90, time: "3h", takers: 1500 },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "coding", title: "Programming Tests", emoji: "💻", badge: "Placement Prep",
    tests: [
      { name: "Python — Easy to Hard (50q)",  questions: 50, time: "1.5h", takers: 1200 },
      { name: "DSA Interview Simulation",     questions: 30, time: "2h",   takers: 1800 },
      { name: "System Design Assessment",     questions: 20, time: "1h",   takers: 900  },
      { name: "SQL Fundamentals Test",        questions: 40, time: "1h",   takers: 800  },
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    id: "company", title: "Company Tests", emoji: "🏢", badge: "Placement",
    tests: [
      { name: "TCS NQT Simulation",           questions: 85, time: "3h", takers: 3400 },
      { name: "Infosys Aptitude + Coding",    questions: 50, time: "2h", takers: 2100 },
      { name: "Wipro NLTH Mock",              questions: 70, time: "2.5h", takers: 1600 },
      { name: "Amazon SDE Online Assessment", questions: 30, time: "1.5h", takers: 2800 },
    ],
    color: "from-orange-500 to-red-500",
  },
];

export function TestCenterPage() {
  const [activeCategory, setActiveCategory] = useState("cbse");

  const active = examCategories.find(c => c.id === activeCategory) || examCategories[0];

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">Test Center</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Exam Ready with <span className="text-gradient">Mock Tests</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            CBSE board, JEE, NEET, company placement — full-length timed mock tests with detailed analysis.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {examCategories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                activeCategory === cat.id ? "bg-brand-500 text-white border-brand-500 shadow-md" : "bg-background hover:bg-muted"
              }`}
            >
              {cat.emoji} {cat.title}
            </button>
          ))}
        </div>

        {/* Test cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {active.tests.map((test, i) => (
            <motion.div key={test.name} initial={{ opacity: 0.01, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="rounded-xl border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <h3 className="font-semibold text-sm mb-3">{test.name}</h3>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {test.questions} questions</span>
                  <span className="flex items-center gap-1"><Clock    className="h-3 w-3" /> {test.time}</span>
                  <span className="flex items-center gap-1"><Users    className="h-3 w-3" /> {test.takers.toLocaleString()} taken</span>
                </div>
                <Button size="sm" className="w-full" variant="outline">
                  Start Mock Test <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
