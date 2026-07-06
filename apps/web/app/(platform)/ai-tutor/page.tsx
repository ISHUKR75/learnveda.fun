/**
 * @file app/(platform)/ai-tutor/page.tsx
 * @description AI Tutor page — interactive AI-powered learning assistant
 * Route: /ai-tutor
 *
 * Features:
 *   - Chat interface with AI tutor (OpenAI GPT-4o behind /api/ai)
 *   - Subject-specific mode (Math, Physics, Chemistry, DSA, Programming)
 *   - Conversation history
 *   - Suggested questions per subject
 *   - LaTeX rendering for math formulas (MathJax/KaTeX placeholder)
 *   - Rate limiting: 20 messages/hour for free users, unlimited for Pro
 *   - Demo mode: shows pre-canned responses when API key not configured
 */

"use client"; // Client component — chat state, API calls, streaming

/* ─── Imports ─────────────────────────────────────────────────────────────── */
import { useState, useRef, useEffect, useCallback } from "react"; // React hooks
import Link   from "next/link"; // Navigation
import {
  Bot, Send, User, Loader2, Sparkles, ChevronRight,
  BookOpen, Code2, FlaskConical, Calculator, Atom,
  RotateCcw, Lightbulb, Copy, Check, Zap,
} from "lucide-react"; // Icons
import { Badge }  from "@/components/ui/badge";   // Badge
import { Button } from "@/components/ui/button";  // Button

/* ─── Message Type ───────────────────────────────────────────────────────── */
interface Message {
  id:      string;  // Unique message ID
  role:    "user" | "assistant"; // Sender
  content: string;  // Message text
  ts:      number;  // Timestamp
}

/* ─── Subject Mode ───────────────────────────────────────────────────────── */
type SubjectMode = "general" | "maths" | "physics" | "chemistry" | "dsa" | "programming";

/* ─── Suggested Questions ────────────────────────────────────────────────── */
const SUGGESTED: Record<SubjectMode, string[]> = {
  general:     [
    "What is LearnVeda's DSA plan?",
    "Which programming language should I learn first?",
    "How do I prepare for Class 10 board exams?",
    "Explain the difference between recursion and iteration.",
  ],
  maths:       [
    "Prove that √2 is irrational",
    "Explain the remainder theorem with an example",
    "What is the relationship between zeroes and coefficients of a polynomial?",
    "Solve: If one root of x²−5x+k=0 is 2, find k",
  ],
  physics:     [
    "Explain Newton's Second Law with a real-world example",
    "What is the difference between mass and weight?",
    "How does a convex lens form an image?",
    "Derive the equation of motion v = u + at",
  ],
  chemistry:   [
    "What is the difference between physical and chemical change?",
    "Explain Bohr's model of the atom",
    "What are the characteristics of ionic compounds?",
    "Balance: Fe + O₂ → Fe₂O₃",
  ],
  dsa:         [
    "Explain Big-O notation with examples",
    "What is the difference between BFS and DFS?",
    "When should I use a stack vs a queue?",
    "How does Dijkstra's algorithm work?",
  ],
  programming: [
    "Explain list comprehension in Python",
    "What is the difference between == and === in JavaScript?",
    "How does recursion work? Explain with factorial",
    "What is the difference between a class and an object in Java?",
  ],
};

/* ─── Subject Config ─────────────────────────────────────────────────────── */
const SUBJECTS: { id: SubjectMode; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: "general",     label: "General",     icon: Bot,         color: "bg-brand-500/10 text-brand-500" },
  { id: "maths",       label: "Mathematics", icon: Calculator,  color: "bg-blue-500/10 text-blue-600" },
  { id: "physics",     label: "Physics",     icon: Atom,        color: "bg-purple-500/10 text-purple-600" },
  { id: "chemistry",   label: "Chemistry",   icon: FlaskConical,color: "bg-green-500/10 text-green-600" },
  { id: "dsa",         label: "DSA",         icon: Code2,       color: "bg-orange-500/10 text-orange-600" },
  { id: "programming", label: "Programming", icon: Code2,       color: "bg-yellow-500/10 text-yellow-600" },
];

/* ─── Demo AI Responses ──────────────────────────────────────────────────── */
// Pre-canned responses shown in demo mode (when OpenAI API key not configured)
const DEMO_RESPONSES: Record<string, string> = {
  default: `I'm LearnVeda's AI Tutor! 🤖 I can help you with:

• **CBSE Class 9–12**: Maths, Science (Physics, Chemistry, Biology), Social Science
• **Engineering**: DSA, Data Structures, OS, DBMS, Computer Networks
• **Programming**: Python, JavaScript, Java, C++, and more
• **Career guidance**: roadmaps, interview prep, college selection

Ask me anything! Try: "Explain Newton's Second Law" or "What is Big-O notation?"`,
};

/* ─── Unique ID generator ────────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 10);

/* ─── Page Component ─────────────────────────────────────────────────────── */
export default function AITutorPage() {
  /* ── State ───────────────────────────────────────────────────────────── */
  const [messages,   setMessages]   = useState<Message[]>([]);    // Chat history
  const [input,      setInput]      = useState("");                // Current input
  const [isLoading,  setIsLoading]  = useState(false);            // AI typing state
  const [subject,    setSubject]    = useState<SubjectMode>("general"); // Active subject
  const [msgCount,   setMsgCount]   = useState(0);                // Message count (rate limit display)
  const [copied,     setCopied]     = useState<string | null>(null); // Copied message ID

  const messagesEndRef = useRef<HTMLDivElement>(null); // Auto-scroll target
  const inputRef       = useRef<HTMLTextAreaElement>(null); // Input focus ref

  /* ── Welcome message on mount ────────────────────────────────────────── */
  useEffect(() => {
    setMessages([{
      id:      "welcome",
      role:    "assistant",
      content: DEMO_RESPONSES.default,
      ts:      Date.now(),
    }]);
  }, []);

  /* ── Auto-scroll to bottom when messages change ──────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Send message ────────────────────────────────────────────────────── */
  const sendMessage = useCallback(async (text?: string) => {
    const userMessage = (text || input).trim();
    if (!userMessage || isLoading) return; // Prevent empty/duplicate sends

    /* Add user message to chat */
    const userMsg: Message = { id: uid(), role: "user", content: userMessage, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");       // Clear input
    setIsLoading(true); // Show loading indicator
    setMsgCount((c) => c + 1); // Increment usage counter

    try {
      /* Call the AI API route */
      const res = await fetch("/api/ai", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          subject, // Send subject context to API for better prompting
        }),
      });

      if (res.ok) {
        const data = await res.json(); // Get AI response
        setMessages((prev) => [...prev, {
          id:      uid(),
          role:    "assistant",
          content: data.message || data.text || "I couldn't process that. Please try again.",
          ts:      Date.now(),
        }]);
      } else {
        /* API unavailable — show demo response */
        throw new Error("API unavailable");
      }
    } catch {
      /* Demo mode fallback */
      await new Promise((r) => setTimeout(r, 800)); // Simulate thinking delay
      setMessages((prev) => [...prev, {
        id:      uid(),
        role:    "assistant",
        content: `I'm in demo mode (API key not configured). 🔧\n\nHere's what I would normally say about "${userMessage}":\n\nThis is a great question! In a fully configured deployment, I would use GPT-4o to give you a detailed, accurate answer tailored to your ${subject === "general" ? "learning journey" : subject + " studies"}.\n\nFor now, try these LearnVeda resources:\n• /learn — Browse all chapters\n• /core-cs/dsa — DSA 60-day plan\n• /simulations — Interactive simulations`,
        ts:      Date.now(),
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus(); // Refocus input
    }
  }, [input, messages, subject, isLoading]);

  /* ── Handle Enter key ────────────────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Copy message ────────────────────────────────────────────────────── */
  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  /* ── Clear chat ──────────────────────────────────────────────────────── */
  const clearChat = () => {
    setMessages([{ id: "welcome", role: "assistant", content: DEMO_RESPONSES.default, ts: Date.now() }]);
    setMsgCount(0);
  };

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="border-b border-border/40 bg-muted/30 px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mr-2" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">AI Tutor</span>
          </nav>

          {/* Bot icon + title */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-500/10">
              <Sparkles className="h-4 w-4 text-brand-500" />
            </div>
            <span className="font-semibold text-sm">LearnVeda AI Tutor</span>
            <Badge variant="outline" className="text-xs border-green-500/50 text-green-600">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Online
            </Badge>
          </div>

          {/* Usage counter */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{msgCount}/20 messages</span>
            <Button variant="ghost" size="sm" onClick={clearChat} className="h-8 px-2 gap-1 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>
      </div>

      {/* ── Subject mode selector ─────────────────────────────────────── */}
      <div className="border-b border-border/20 bg-card px-4 sm:px-6 py-2 shrink-0 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex gap-2 min-w-max">
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSubject(sub.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all whitespace-nowrap ${
                subject === sub.id
                  ? "bg-brand-500 text-white border-brand-500"
                  : "border-border/40 text-muted-foreground hover:border-border/80"
              }`}
            >
              <sub.icon className="h-3.5 w-3.5" />
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat messages ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-brand-500 text-white"
                  : "bg-purple-500/10 border border-purple-500/20"
              }`}>
                {msg.role === "user"
                  ? <User className="h-4 w-4" />
                  : <Bot className="h-4 w-4 text-purple-500" />}
              </div>

              {/* Message bubble */}
              <div className={`group max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-500 text-white rounded-tr-sm"
                    : "bg-card border border-border/40 rounded-tl-sm"
                }`}>
                  {/* Render message with basic markdown-like formatting */}
                  <div className="whitespace-pre-wrap">
                    {msg.content.split("**").map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </div>
                </div>

                {/* Copy button (assistant messages only) */}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => copyMessage(msg.id, msg.content)}
                    className="opacity-0 group-hover:opacity-100 mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-all"
                  >
                    {copied === msg.id ? (
                      <><Check className="h-3 w-3 text-green-500" /> Copied!</>
                    ) : (
                      <><Copy className="h-3 w-3" /> Copy</>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* AI typing indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-purple-500" />
              </div>
              <div className="bg-card border border-border/40 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Suggested questions ───────────────────────────────────────── */}
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 py-2 shrink-0 overflow-x-auto border-t border-border/20">
          <div className="max-w-4xl mx-auto flex gap-2 min-w-max">
            <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
            {SUGGESTED[subject].map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs border border-border/40 rounded-full px-3 py-1.5 hover:border-brand-500/50 hover:text-brand-500 transition-colors text-muted-foreground whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input area ───────────────────────────────────────────────── */}
      <div className="border-t border-border/40 bg-card px-4 sm:px-6 py-4 shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${subject === "general" ? "anything" : subject}… (Enter to send, Shift+Enter for new line)`}
              rows={1}
              maxLength={1000}
              className="flex-1 rounded-xl border border-border/60 bg-background px-4 py-3 text-sm resize-none focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30 max-h-32 overflow-y-auto"
              style={{ height: "auto", minHeight: "48px" }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = `${Math.min(t.scrollHeight, 128)}px`;
              }}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 rounded-xl p-0 shrink-0"
            >
              {isLoading
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : <Send className="h-5 w-5" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Powered by GPT-4o · Responses may contain errors — verify important facts.
            <Link href="/pricing" className="ml-auto text-brand-500 hover:underline">Upgrade for unlimited ↗</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
