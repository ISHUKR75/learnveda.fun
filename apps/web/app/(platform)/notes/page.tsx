/**
 * @file app/(platform)/notes/page.tsx
 * @description Smart Notes — personal study notes with rich text editing
 * Route: /notes
 *
 * Students can create, organize, and search personal study notes.
 * Notes are organized by subject/topic and support markdown formatting.
 * In demo mode (no auth/DB): shows sample notes with create UI.
 *
 * Platform layout (Navbar) provided by (platform)/layout.tsx.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  StickyNote, Plus, Search, Edit3, Trash2, Star,
  BookOpen, Tag, Clock, Save, X, ChevronRight,
} from "lucide-react";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ─── Types & Sample Notes ────────────────────────────────────────────────── */
interface Note {
  id:        number;
  title:     string;
  content:   string;
  subject:   string;
  tags:      string[];
  starred:   boolean;
  updatedAt: string;
  color:     string;
}

const SAMPLE_NOTES: Note[] = [
  {
    id: 1,
    title:   "Integration Formulas — Class 12 Maths",
    content: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n∫eˣ dx = eˣ + C\n∫sin x dx = -cos x + C\n∫cos x dx = sin x + C\n∫1/x dx = ln|x| + C\n\nNote: Don't forget the +C (constant of integration) in indefinite integrals!",
    subject:   "Mathematics",
    tags:      ["Integration", "Class 12", "Formulas"],
    starred:   true,
    updatedAt: "2 hours ago",
    color:     "border-l-blue-500",
  },
  {
    id: 2,
    title:   "DSA — Two Pointer Template",
    content: "# Two Pointer Pattern\n\nUse when: sorted array, find pair/triplet with target\n\n```python\ndef two_sum(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        curr = arr[left] + arr[right]\n        if curr == target:\n            return [left, right]\n        elif curr < target:\n            left += 1\n        else:\n            right -= 1\n    return []\n```\n\nTime: O(n) | Space: O(1)",
    subject:   "DSA",
    tags:      ["Arrays", "Two Pointers", "Template"],
    starred:   true,
    updatedAt: "Yesterday",
    color:     "border-l-green-500",
  },
  {
    id: 3,
    title:   "Organic Chemistry — Named Reactions",
    content: "1. Aldol Condensation: Aldehydes/ketones with α-H → β-hydroxy carbonyl\n2. Cannizzaro: Aldehydes without α-H + NaOH → acid + alcohol\n3. Reimer-Tiemann: Phenol + CHCl₃ + NaOH → salicylaldehyde\n4. Kolbe: Sodium phenoxide + CO₂ + pressure → salicylic acid\n5. Friedel-Crafts: ArH + RCl/AlCl₃ → Ar-R (alkylation)",
    subject:   "Chemistry",
    tags:      ["Organic", "Named Reactions", "Class 12"],
    starred:   false,
    updatedAt: "3 days ago",
    color:     "border-l-orange-500",
  },
  {
    id: 4,
    title:   "Operating Systems — Scheduling Algorithms",
    content: "FCFS: First Come First Serve — non-preemptive, convoy effect\nSJF: Shortest Job First — optimal avg waiting time\nRound Robin: Time quantum, preemptive, good for time-sharing\nPriority: Can cause starvation (fix: aging)\nMLFQ: Multi-level feedback queue — used in real OSes\n\nKey Metrics:\n- Waiting Time = Completion - Arrival - Burst\n- Turnaround = Completion - Arrival\n- Response Time = First Run - Arrival",
    subject:   "Operating Systems",
    tags:      ["Scheduling", "OS", "Engineering"],
    starred:   false,
    updatedAt: "1 week ago",
    color:     "border-l-purple-500",
  },
];

const SUBJECTS = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "DSA", "Operating Systems", "DBMS", "Computer Networks"];
const COLORS   = ["border-l-blue-500", "border-l-green-500", "border-l-orange-500", "border-l-purple-500", "border-l-pink-500", "border-l-teal-500"];

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function NotesPage() {
  const [notes,    setNotes]    = useState<Note[]>(SAMPLE_NOTES);
  const [search,   setSearch]   = useState("");
  const [subject,  setSubject]  = useState("All");
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<Note | null>(null);
  const [newTitle,   setNewTitle]   = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSubject, setNewSubject] = useState("Mathematics");
  const [newTags,    setNewTags]    = useState("");

  /** Filter notes by search + subject */
  const filtered = notes.filter((n) => {
    const matchSubject = subject === "All" || n.subject === subject;
    const matchSearch  = search === "" ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchSubject && matchSearch;
  });

  const starredNotes = filtered.filter((n) => n.starred);
  const otherNotes   = filtered.filter((n) => !n.starred);

  /** Create a new note */
  const createNote = () => {
    if (!newTitle.trim()) return;
    const note: Note = {
      id:        Date.now(),
      title:     newTitle,
      content:   newContent,
      subject:   newSubject,
      tags:      newTags.split(",").map((t) => t.trim()).filter(Boolean),
      starred:   false,
      updatedAt: "Just now",
      color:     COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setNotes((prev) => [note, ...prev]);
    setCreating(false);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
  };

  /** Toggle star */
  const toggleStar = (id: number) => {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, starred: !n.starred } : n));
  };

  /** Delete note */
  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-yellow-950/5 to-background py-12">
        <div className="container px-4 md:px-6">
          <Badge variant="secondary" className="mb-3">{notes.length} Notes · Synced</Badge>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">📝 My Notes</h1>
              <p className="text-muted-foreground">Personal study notes organized by subject. Search, star, and revisit.</p>
            </div>
            <Button variant="gradient" onClick={() => setCreating(true)} className="shrink-0">
              <Plus className="h-4 w-4" /> New Note
            </Button>
          </div>
        </div>
      </section>

      {/* Search + filter */}
      <section className="border-b bg-muted/30 py-4 sticky top-0 z-10">
        <div className="container px-4 md:px-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-44 max-w-xs">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search notes…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-lg border bg-background px-3 h-9 text-sm">
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </section>

      {/* Main content: note list + detail view */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          {/* Create note modal */}
          <AnimatePresence>
            {creating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                  className="bg-card rounded-2xl border shadow-2xl w-full max-w-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">New Note</h2>
                    <button onClick={() => setCreating(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
                  </div>
                  <div className="space-y-4">
                    <Input placeholder="Title…" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="font-semibold" />
                    <select value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="w-full rounded-lg border bg-background px-3 h-9 text-sm">
                      {SUBJECTS.filter((s) => s !== "All").map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <Textarea placeholder="Write your note here… (markdown supported)" value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={8} className="font-mono text-sm" />
                    <Input placeholder="Tags (comma-separated: Arrays, Class 12, Formulas)" value={newTags} onChange={(e) => setNewTags(e.target.value)} />
                    <div className="flex gap-3">
                      <Button variant="gradient" onClick={createNote} className="flex-1"><Save className="h-4 w-4" /> Save Note</Button>
                      <Button variant="outline" onClick={() => setCreating(false)} className="flex-1">Cancel</Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-6">
            {/* Note list */}
            <div className={`flex flex-col gap-3 ${selected ? "w-full md:w-2/5" : "w-full"}`}>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <StickyNote className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  <p>No notes yet. Click <strong>New Note</strong> to get started.</p>
                </div>
              )}
              {[...starredNotes, ...otherNotes].map((note) => (
                <motion.div key={note.id} initial={{ opacity: 0.01, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  className={`rounded-xl border-l-4 bg-card border ${note.color} p-4 cursor-pointer hover:shadow-md transition-all ${selected?.id === note.id ? "ring-2 ring-brand-500" : ""}`}
                  onClick={() => setSelected(note)}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-1">{note.title}</h3>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); toggleStar(note.id); }} className={`${note.starred ? "text-yellow-500" : "text-muted-foreground"} hover:text-yellow-500 transition-colors`}>
                        <Star className="h-3.5 w-3.5" fill={note.starred ? "currentColor" : "none"} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-xs">{tag}</span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{note.updatedAt}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note detail (shown only on md+) */}
            {selected && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="hidden md:flex flex-col flex-1 rounded-2xl border bg-card p-6 h-fit sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">{selected.title}</h2>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Badge variant="secondary">{selected.subject}</Badge>
                  {selected.tags.map((tag) => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                </div>
                <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground leading-relaxed">{selected.content}</pre>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> Last updated: {selected.updatedAt}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
