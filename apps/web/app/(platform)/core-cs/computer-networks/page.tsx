/**
 * @file app/(platform)/core-cs/computer-networks/page.tsx
 * @description Computer Networks learning track — 20-day plan
 * Route: /core-cs/computer-networks
 *
 * Covers: OSI model, TCP/IP, HTTP, DNS, routing, subnetting, network security
 * Level: Intermediate | Duration: 20 days | Target: SDE interviews + GATE + BTech
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown, ChevronUp, CheckCircle, Clock, BookOpen,
  Globe, Star, Users, Target, Zap, Network,
} from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ─── 20-Day Computer Networks Curriculum ───────────────────────────────── */
const PHASES = [
  {
    id: 1,
    title: "Fundamentals & Physical Layer",
    days: "Day 01–04",
    color: "from-green-500 to-emerald-600",
    topics: [
      { day: 1,  title: "Introduction to Computer Networks — Types, Topologies, Uses",         xp: 35, hasVideo: true  },
      { day: 2,  title: "OSI Model — All 7 Layers with Functions and Protocols",              xp: 40, hasVideo: true  },
      { day: 3,  title: "TCP/IP Model vs OSI — Encapsulation, PDUs, Headers",                xp: 40, hasVideo: true  },
      { day: 4,  title: "Physical Layer — Transmission Media, Bandwidth, Signal Encoding",    xp: 35, hasVideo: false },
    ],
  },
  {
    id: 2,
    title: "Data Link & Network Layer",
    days: "Day 05–10",
    color: "from-blue-500 to-indigo-600",
    topics: [
      { day: 5,  title: "Data Link Layer — Framing, Error Detection (CRC, Parity), CSMA/CD", xp: 45, hasVideo: true  },
      { day: 6,  title: "MAC Addresses + Ethernet + Switching + VLANs",                       xp: 45, hasVideo: true  },
      { day: 7,  title: "IP Addressing — IPv4, IPv6, CIDR, Subnetting Calculations",         xp: 50, hasVideo: true  },
      { day: 8,  title: "Routing — RIP, OSPF, BGP, Distance Vector vs Link State",           xp: 55, hasVideo: false },
      { day: 9,  title: "NAT, DHCP, ARP — How IPs are assigned and resolved",                xp: 45, hasVideo: false },
      { day: 10, title: "ICMP + Ping + Traceroute — Network diagnostics",                    xp: 40, hasVideo: false },
    ],
  },
  {
    id: 3,
    title: "Transport & Application Layer",
    days: "Day 11–16",
    color: "from-purple-500 to-violet-600",
    topics: [
      { day: 11, title: "TCP vs UDP — Connection Lifecycle, Three-Way Handshake",             xp: 50, hasVideo: true  },
      { day: 12, title: "TCP Congestion Control — Slow Start, AIMD, CUBIC",                  xp: 55, hasVideo: false },
      { day: 13, title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 — QUIC, Multiplexing",                 xp: 55, hasVideo: true  },
      { day: 14, title: "DNS — Recursive vs Iterative, Record Types, DNS over HTTPS",        xp: 50, hasVideo: true  },
      { day: 15, title: "Application Protocols — SMTP, FTP, SSH, WebSockets, gRPC",          xp: 50, hasVideo: false },
      { day: 16, title: "REST APIs + HTTP Headers + Status Codes + CORS",                    xp: 45, hasVideo: false },
    ],
  },
  {
    id: 4,
    title: "Security & Wireshark + Practice",
    days: "Day 17–20",
    color: "from-orange-500 to-red-500",
    topics: [
      { day: 17, title: "Network Security — TLS/SSL Handshake, Certificates, HTTPS",         xp: 55, hasVideo: true  },
      { day: 18, title: "Firewalls, VPNs, Proxies, DDoS Mitigation Strategies",              xp: 55, hasVideo: false },
      { day: 19, title: "Wireshark Packet Analysis — Capture, Filter, Analyze HTTP/TCP",     xp: 60, hasVideo: true  },
      { day: 20, title: "CN Mock Interview — 40 Most Asked Network Interview Questions",      xp: 80, hasVideo: false },
    ],
  },
] as const;

/** OSI model quick-reference data */
const OSI_LAYERS = [
  { num: 7, name: "Application",  examples: "HTTP, FTP, SMTP, DNS",    color: "bg-purple-500/10 text-purple-700" },
  { num: 6, name: "Presentation", examples: "SSL/TLS, JPEG, MP4",       color: "bg-violet-500/10 text-violet-700" },
  { num: 5, name: "Session",      examples: "NetBIOS, PPTP",             color: "bg-blue-500/10 text-blue-700"    },
  { num: 4, name: "Transport",    examples: "TCP, UDP, SCTP",            color: "bg-cyan-500/10 text-cyan-700"    },
  { num: 3, name: "Network",      examples: "IP, ICMP, ARP, OSPF",       color: "bg-green-500/10 text-green-700"  },
  { num: 2, name: "Data Link",    examples: "Ethernet, WiFi, PPP, MAC",  color: "bg-yellow-500/10 text-yellow-700"},
  { num: 1, name: "Physical",     examples: "Cables, Fibre, Radio",      color: "bg-orange-500/10 text-orange-700"},
];

export default function ComputerNetworksPage() {
  const [openPhase,     setOpenPhase]     = useState<number | null>(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [showOSI,       setShowOSI]       = useState(false); // OSI reference panel

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const next = new Set(prev);
      next.has(day) ? next.delete(day) : next.add(day);
      return next;
    });
  };

  const totalDays    = 20;
  const completedPct = Math.round((completedDays.size / totalDays) * 100);

  return (
    <div className="min-h-screen pb-20">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-green-950/5 to-background py-16 md:py-20">
        <div className="absolute top-0 right-1/4 h-56 w-56 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
        <div className="container px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Computer Networks</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Intermediate</Badge>
                <Badge variant="outline" className="text-green-600 border-green-400/40">Core CS</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                🌐 Computer Networks — 20-Day Plan
              </h1>
              <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                Master OSI model, TCP/IP, DNS, HTTP/3, routing, and network security.
                Essential for every SDE interview, GATE, and BTech CN exam.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 20 Days · 4 Phases</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 5,400+ learners</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> 4.8/5</span>
              </div>
              <div className="flex gap-3">
                <Button size="lg" variant="gradient"><Zap className="h-4 w-4" /> Start Day 1</Button>
                <Button size="lg" variant="outline" onClick={() => setShowOSI(!showOSI)}>
                  <Globe className="h-4 w-4" /> OSI Reference
                </Button>
              </div>
            </div>

            {/* Progress card */}
            <div className="w-full lg:w-72 rounded-2xl border bg-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-brand-500" /> Your Progress
              </h3>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Days completed</span>
                <span className="font-bold">{completedDays.size} / {totalDays}</span>
              </div>
              <Progress value={completedPct} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground mb-4">{completedPct}% complete 🌐</p>
              {/* Key topics */}
              <div className="flex flex-wrap gap-1.5">
                {["OSI Model", "TCP/IP", "DNS", "HTTP/3", "Subnetting", "TLS"].map((t) => (
                  <span key={t} className="rounded-md bg-muted px-2 py-0.5 text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OSI Quick Reference (collapsible) ─────────────────────── */}
      {showOSI && (
        <section className="bg-muted/30 border-b py-6">
          <div className="container px-4 md:px-6 max-w-3xl">
            <h2 className="font-bold mb-4">📡 OSI Model Quick Reference</h2>
            <div className="flex flex-col gap-2">
              {OSI_LAYERS.map((layer) => (
                <div key={layer.num} className={`flex items-center gap-3 rounded-xl p-3 ${layer.color}`}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/50 text-sm font-black shrink-0">
                    L{layer.num}
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-sm">{layer.name}</span>
                    <span className="text-xs ml-2 opacity-70">{layer.examples}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Curriculum ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8">20-Day Curriculum</h2>
          <div className="flex flex-col gap-5">
            {PHASES.map((phase) => (
              <motion.div key={phase.id} initial={{ opacity: 0.01, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="rounded-2xl border bg-card overflow-hidden">
                  <button className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors text-left"
                    onClick={() => setOpenPhase(openPhase === phase.id ? null : phase.id)}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} text-white`}>
                      <Globe className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{phase.title}</div>
                      <div className="text-sm text-muted-foreground">{phase.days} · {phase.topics.length} lessons</div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {phase.topics.filter((t) => completedDays.has(t.day)).length}/{phase.topics.length}
                    </Badge>
                    {openPhase === phase.id ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openPhase === phase.id && (
                    <div className="border-t divide-y">
                      {phase.topics.map((topic) => {
                        const isComplete = completedDays.has(topic.day);
                        return (
                          <div key={topic.day} className={`flex items-center gap-4 px-5 py-4 transition-colors ${isComplete ? "bg-green-500/5" : "hover:bg-muted/30"}`}>
                            <span className="w-12 text-xs font-bold text-muted-foreground/50 tabular-nums shrink-0">Day {String(topic.day).padStart(2, "0")}</span>
                            <button onClick={() => toggleDay(topic.day)} className={`shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${isComplete ? "bg-green-500 border-green-500 text-white" : "border-muted-foreground/30 hover:border-brand-500"}`}>
                              {isComplete && <CheckCircle className="h-3 w-3" />}
                            </button>
                            <span className={`flex-1 text-sm ${isComplete ? "line-through text-muted-foreground" : ""}`}>{topic.title}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              {topic.hasVideo && <Badge variant="outline" className="text-xs text-red-500 border-red-400/30">📹 Video</Badge>}
                              <Badge variant="secondary" className="text-xs text-yellow-600">+{topic.xp} XP</Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue journey */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-between rounded-xl border bg-card p-5">
            <div>
              <div className="font-bold">Complete your Core CS foundation</div>
              <div className="text-sm text-muted-foreground">These tracks pair perfectly with Computer Networks</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild><Link href="/core-cs/operating-systems">OS</Link></Button>
              <Button variant="gradient" size="sm" asChild><Link href="/core-cs/system-design">System Design →</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
