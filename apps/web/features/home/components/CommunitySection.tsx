/**
 * @file features/home/components/CommunitySection.tsx
 * @description Community section for LearnVeda homepage
 * Shows the active community features — posts, Q&A, groups, live chat
 */

"use client"; // Client component for animations

import React from "react";                       // React core
import { motion } from "framer-motion";          // Animations
import { Users, MessageSquare, Heart, Award, ArrowRight } from "lucide-react"; // Icons
import Link from "next/link";                    // Next.js navigation
import { Button } from "@/components/ui/button"; // Button component
import { Badge }  from "@/components/ui/badge";  // Badge component

/* ─── Community Stats ────────────────────────────────────────────────────── */
const communityStats = [
  { label: "Active Members",  value: "10K+",  icon: <Users          className="h-5 w-5" />, color: "text-blue-500"  },
  { label: "Questions Solved", value: "50K+", icon: <MessageSquare   className="h-5 w-5" />, color: "text-green-500" },
  { label: "Helpful Answers", value: "80K+",  icon: <Heart           className="h-5 w-5" />, color: "text-red-500"   },
  { label: "Expert Mentors",  value: "200+",  icon: <Award           className="h-5 w-5" />, color: "text-purple-500"},
];

/* ─── Recent Activity Items ──────────────────────────────────────────────── */
const recentPosts = [
  {
    user:      "Priya S.",
    avatar:    "PS",
    color:     "from-purple-500 to-pink-500",
    time:      "2 min ago",
    category:  "Class 11 Physics",
    question:  "Can someone explain why entropy always increases in an isolated system?",
    answers:   5,
    likes:     12,
  },
  {
    user:      "Arjun N.",
    avatar:    "AN",
    color:     "from-blue-500 to-cyan-500",
    time:      "8 min ago",
    category:  "DSA",
    question:  "Time complexity of Dijkstra with Fibonacci Heap vs Binary Heap — when does it matter?",
    answers:   3,
    likes:     8,
  },
  {
    user:      "Sneha G.",
    avatar:    "SG",
    color:     "from-green-500 to-teal-500",
    time:      "15 min ago",
    category:  "Python",
    question:  "What is the difference between @staticmethod and @classmethod in Python?",
    answers:   7,
    likes:     21,
  },
  {
    user:      "Karthik R.",
    avatar:    "KR",
    color:     "from-orange-500 to-red-500",
    time:      "32 min ago",
    category:  "System Design",
    question:  "How do you handle race conditions in distributed caches like Redis?",
    answers:   4,
    likes:     15,
  },
];

/* ─── Community Section Component ────────────────────────────────────────── */
export function CommunitySection() {
  return (
    <section className="py-20 md:py-32" aria-label="Community">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text + Stats ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0.01, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 text-brand-500 border-brand-500/30">
              <Users className="h-3 w-3 mr-1" />
              Community
            </Badge>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Learn Together,{" "}
              <span className="text-gradient">Grow Together</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Ask doubts, share knowledge, join study groups, and connect with mentors and peers across India. Our community is active 24/7 — you&apos;ll never be stuck alone.
            </p>

            {/* Community stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {communityStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 rounded-xl border bg-background p-4">
                  <div className={`${stat.color} flex-shrink-0`}>{stat.icon}</div>
                  <div>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="gradient" asChild>
              <Link href="/community">
                Join Community <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* ── Right: Live Activity Feed ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0.01, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Live Activity</span>
            </div>

            {recentPosts.map((post, index) => (
              <motion.div
                key={post.question}
                initial={{ opacity: 0.01, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border bg-background p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* User avatar */}
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.color} text-white text-xs font-bold`}>
                    {post.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Post header */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold">{post.user}</span>
                      <Badge variant="outline" className="text-xs py-0">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{post.time}</span>
                    </div>

                    {/* Question */}
                    <p className="text-sm text-foreground line-clamp-2 mb-2">{post.question}</p>

                    {/* Engagement stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.answers} answers
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes} helpful
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
