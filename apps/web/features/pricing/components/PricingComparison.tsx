/**
 * @file features/pricing/components/PricingComparison.tsx
 * @description Full feature comparison table for the Pricing page
 *
 * Shows a detailed breakdown of what's included in each plan (Free, Pro, School).
 * Uses a responsive table with sticky headers on mobile.
 */

"use client";

import React from "react";
import { CheckCircle2, XCircle, Minus } from "lucide-react";

/* ─── Comparison Rows ────────────────────────────────────────────────────── */
type PlanValue = boolean | string; // true = included, false = not, string = custom text

interface ComparisonRow {
  category: string;
  feature:  string;
  free:     PlanValue;
  pro:      PlanValue;
  school:   PlanValue;
}

const ROWS: ComparisonRow[] = [
  // Curriculum
  { category: "Curriculum", feature: "Class 9–12 chapters",      free: "Selected (3/subject)", pro: true, school: true },
  { category: "Curriculum", feature: "All NCERT content",         free: false,  pro: true, school: true },
  { category: "Curriculum", feature: "Engineering curriculum",    free: false,  pro: true, school: true },
  { category: "Curriculum", feature: "Programming (12 languages)",free: "2 days/language", pro: true, school: true },
  { category: "Curriculum", feature: "Core CS subjects",          free: false,  pro: true, school: true },
  // Simulations
  { category: "Simulations", feature: "Physics simulations",       free: "5 free", pro: true, school: true },
  { category: "Simulations", feature: "Chemistry simulations",     free: false,    pro: true, school: true },
  { category: "Simulations", feature: "Biology simulations",       free: false,    pro: true, school: true },
  { category: "Simulations", feature: "DSA visualizations",        free: false,    pro: true, school: true },
  { category: "Simulations", feature: "All 140+ simulations",      free: false,    pro: true, school: true },
  // AI Features
  { category: "AI", feature: "AI Tutor",             free: "5 queries/day", pro: "Unlimited", school: "Unlimited" },
  { category: "AI", feature: "AI-powered search",    free: true,  pro: true,        school: true },
  { category: "AI", feature: "Personalized recommendations", free: false, pro: true, school: true },
  // Practice
  { category: "Practice", feature: "Mock tests",        free: false,  pro: true, school: true },
  { category: "Practice", feature: "Previous year questions", free: false, pro: true, school: true },
  { category: "Practice", feature: "Chapter quizzes",    free: true,   pro: true, school: true },
  { category: "Practice", feature: "Coding assignments", free: false,  pro: true, school: true },
  // Battles
  { category: "Battles", feature: "Live battles",        free: "10/month", pro: "Unlimited", school: "Unlimited" },
  { category: "Battles", feature: "Battle history",      free: true,  pro: true, school: true },
  { category: "Battles", feature: "Ranked mode",         free: false, pro: true, school: true },
  { category: "Battles", feature: "Tournament access",   free: false, pro: true, school: true },
  // Community
  { category: "Community", feature: "Forum access",       free: true,  pro: true, school: true },
  { category: "Community", feature: "Study groups",       free: true,  pro: true, school: true },
  { category: "Community", feature: "Mentorship",         free: false, pro: true, school: true },
  // Analytics
  { category: "Analytics", feature: "Basic progress tracking", free: true, pro: true, school: true },
  { category: "Analytics", feature: "Detailed analytics",      free: false, pro: true, school: true },
  { category: "Analytics", feature: "Class analytics dashboard", free: false, pro: false, school: true },
  // School
  { category: "School", feature: "Teacher accounts",    free: false, pro: false, school: true },
  { category: "School", feature: "Assignment creation", free: false, pro: false, school: true },
  { category: "School", feature: "White-label",         free: false, pro: false, school: true },
  // Support
  { category: "Support", feature: "Community support",  free: true,  pro: true,  school: true  },
  { category: "Support", feature: "Priority support",   free: false, pro: true,  school: true  },
  { category: "Support", feature: "Dedicated manager",  free: false, pro: false, school: true  },
];

/* ─── Cell renderer ──────────────────────────────────────────────────────── */
function Cell({ value }: { value: PlanValue }) {
  if (value === true)  return <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />;
  if (value === false) return <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  return <span className="text-xs text-muted-foreground text-center block">{value}</span>;
}

/* ─── PricingComparison Component ────────────────────────────────────────── */
export function PricingComparison() {
  // Group rows by category
  const categories = Array.from(new Set(ROWS.map((r) => r.category)));

  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Full Feature Comparison</h2>
          <p className="text-muted-foreground mt-2">See exactly what each plan includes</p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <table className="w-full">
            {/* Table header */}
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium text-foreground w-1/2">Feature</th>
                <th className="text-center p-4 font-medium text-foreground">Free</th>
                <th className="text-center p-4 font-medium text-brand-500">Pro</th>
                <th className="text-center p-4 font-medium text-orange-500">School</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <React.Fragment key={category}>
                  {/* Category header row */}
                  <tr className="bg-muted/30">
                    <td colSpan={4} className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {category}
                    </td>
                  </tr>
                  {/* Feature rows */}
                  {ROWS.filter((r) => r.category === category).map((row) => (
                    <tr key={row.feature} className="border-t hover:bg-muted/20 transition-colors">
                      <td className="p-4 text-sm text-foreground">{row.feature}</td>
                      <td className="p-4 text-center"><Cell value={row.free} /></td>
                      <td className="p-4 text-center bg-brand-500/5"><Cell value={row.pro} /></td>
                      <td className="p-4 text-center"><Cell value={row.school} /></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
