/**
 * @file features/pricing/components/PricingComparison.tsx
 * @description Full feature comparison table for the Pricing page
 */

"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";

/* ─── Comparison Data ────────────────────────────────────────────────────── */
const categories = [
  {
    name: "Learning Content",
    features: [
      { name: "Class 9–12 CBSE",              free: true,   pro: true,   team: true   },
      { name: "Engineering (9 branches × 8 semesters)", free: false, pro: true,  team: true },
      { name: "Programming Languages",          free: "3",    pro: "14",   team: "14"   },
      { name: "Core CS Subjects",               free: "3",    pro: "9",    team: "9"    },
      { name: "Interactive Simulations",         free: "30+",  pro: "140+", team: "140+" },
    ],
  },
  {
    name: "Practice & Tests",
    features: [
      { name: "Practice Questions",   free: "Limited",   pro: "Unlimited", team: "Unlimited" },
      { name: "Mock Tests per month", free: "10",        pro: "Unlimited", team: "Unlimited" },
      { name: "Live Battles",         free: "3/day",     pro: "Unlimited", team: "Unlimited" },
      { name: "Coding Playground",    free: true,        pro: true,        team: true        },
      { name: "Test Center (JEE/NEET)",free: "Preview",  pro: true,        team: true        },
    ],
  },
  {
    name: "AI & Personalization",
    features: [
      { name: "AI Tutor",              free: "10/day",   pro: "Unlimited", team: "Unlimited" },
      { name: "Personalized Roadmap",  free: false,      pro: true,        team: true        },
      { name: "Weakness Analysis",     free: false,      pro: true,        team: true        },
      { name: "AI-Generated Practice", free: false,      pro: true,        team: true        },
    ],
  },
  {
    name: "Dashboard & Progress",
    features: [
      { name: "Progress Dashboard",    free: "Basic",    pro: "Advanced",  team: "Advanced"  },
      { name: "XP, Streaks, Badges",   free: true,       pro: true,        team: true        },
      { name: "Leaderboard",           free: true,       pro: true,        team: true        },
      { name: "Certificates",          free: false,      pro: true,        team: true        },
      { name: "Offline Downloads",     free: false,      pro: true,        team: true        },
    ],
  },
  {
    name: "Support & Admin",
    features: [
      { name: "Community Support",     free: true,       pro: true,        team: true        },
      { name: "Email Support",         free: false,      pro: "Priority",  team: "Dedicated" },
      { name: "Parent Dashboard",      free: false,      pro: true,        team: true        },
      { name: "Teacher Dashboard",     free: false,      pro: false,       team: true        },
      { name: "API Access",            free: false,      pro: false,       team: true        },
    ],
  },
];

/* ─── Cell Renderer ──────────────────────────────────────────────────────── */
function Cell({ value }: { value: boolean | string }) {
  if (value === true)    return <Check  className="h-5 w-5 text-green-500 mx-auto" />;
  if (value === false)   return <X      className="h-5 w-5 text-muted-foreground/30 mx-auto" />;
  if (value === "—")     return <Minus  className="h-4 w-4 text-muted-foreground/30 mx-auto" />;
  return <span className="text-sm font-medium text-brand-500">{value}</span>;
}

/* ─── Pricing Comparison Component ───────────────────────────────────────── */
export function PricingComparison() {
  return (
    <section className="py-16 bg-muted/10">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
          Full Feature Comparison
        </h2>

        <div className="overflow-x-auto rounded-2xl border bg-background">
          <table className="w-full text-sm">
            {/* Table header */}
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold w-1/2">Feature</th>
                <th className="p-4 font-semibold text-center">Free</th>
                <th className="p-4 font-semibold text-center text-brand-500">Pro</th>
                <th className="p-4 font-semibold text-center text-green-500">Team</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {categories.map((category) => (
                <React.Fragment key={category.name}>
                  {/* Category header row */}
                  <tr className="bg-muted/40">
                    <td colSpan={4} className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {category.name}
                    </td>
                  </tr>

                  {/* Feature rows */}
                  {category.features.map((feature) => (
                    <tr key={feature.name} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="p-4 text-center"><Cell value={feature.free} /></td>
                      <td className="p-4 text-center bg-brand-500/3"><Cell value={feature.pro} /></td>
                      <td className="p-4 text-center"><Cell value={feature.team} /></td>
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
