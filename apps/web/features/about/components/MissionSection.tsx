/**
 * @file features/about/components/MissionSection.tsx
 * @description Mission and Vision section for the About page
 * Explains the why behind LearnVeda
 */

"use client"; // Client component for animations

import React from "react";                       // React core
import { motion } from "framer-motion";          // Animations
import { Target, Eye, Rocket } from "lucide-react"; // Icons

/* ─── Mission Section Component ──────────────────────────────────────────── */
export function MissionSection() {
  const pillars = [
    {
      icon:        <Target  className="h-6 w-6" />,
      color:       "text-blue-500 bg-blue-500/10",
      title:       "Our Mission",
      description: "To democratize quality education in India by building an AI-powered, free-forever platform that serves every student from Class 9 to Graduation — with the same quality a top private school offers.",
    },
    {
      icon:        <Eye     className="h-6 w-6" />,
      color:       "text-purple-500 bg-purple-500/10",
      title:       "Our Vision",
      description: "A future where a student in a small town in Bihar has the same educational opportunities as a student in an IIT coaching center in Delhi. Geography and income should never limit potential.",
    },
    {
      icon:        <Rocket  className="h-6 w-6" />,
      color:       "text-green-500 bg-green-500/10",
      title:       "Our Approach",
      description: "We combine structured curriculum, AI-powered tutoring, interactive simulations, gamification, and community — into one platform. Learning should be engaging, not just informative.",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-8"
            >
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${pillar.color}`}>
                {pillar.icon}
              </div>
              {/* Title */}
              <h3 className="text-xl font-bold">{pillar.title}</h3>
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
