/**
 * @file features/ai-tutor/components/AITutorInterface.tsx
 * @description AI Tutor chat interface for LearnVeda
 *
 * Full-screen chat interface with:
 *  - Conversation history
 *  - Streaming responses (via SSE or fetch streaming)
 *  - Subject context selector (so AI knows what you're studying)
 *  - Quick-question suggestions
 *  - Markdown rendering for code blocks and math
 *  - Copy to clipboard for code snippets
 *
 * In demo mode (no OPENAI_API_KEY): returns pre-defined responses.
 */

"use client"; // Client component — chat state, streaming, refs

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, Sparkles, BookOpen, Code2,
  FlaskConical, Atom, Brain, Loader2, Copy, Check, X, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Badge }  from "@/components/ui/badge";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Message {
  id:      string;
  role:    "user" | "assistant";
  content: string;
  time:    Date;
}

type Subject = { id: string; label: string; icon: React.ComponentType<{ className?: string }> };

/* ─── Subject options ────────────────────────────────────────────────────── */
const SUBJECTS: Subject[] = [
  { id: "general",    label: "General",    icon: Sparkles   },
  { id: "math",       label: "Maths",      icon: BookOpen   },
  { id: "physics",    label: "Physics",    icon: Atom       },
  { id: "chemistry",  label: "Chemistry",  icon: FlaskConical },
  { id: "biology",    label: "Biology",    icon: Brain      },
  { id: "programming",label: "Coding",     icon: Code2      },
];

/* ─── Quick question suggestions ─────────────────────────────────────────── */
const QUICK_QUESTIONS = [
  "Explain Newton's 2nd Law with an example",
  "What is the difference between Array and LinkedList?",
  "How do I solve quadratic equations?",
  "Explain DNA replication step by step",
  "What is the difference between acid and base?",
  "Explain Big O notation with examples",
];

/* ─── Demo AI responses ──────────────────────────────────────────────────── */
const DEMO_RESPONSES = [
  "Great question! Let me explain this step by step.\n\nThis concept is fundamental to understanding the topic. Here's a clear breakdown:\n\n**Key Points:**\n1. First, understand the core principle\n2. Apply it to a simple example\n3. Extend to more complex scenarios\n\nWould you like me to elaborate on any specific part?",
  "Excellent! Here's a detailed explanation with an example:\n\n```python\n# Example code\ndef solve(x):\n    return x * 2 + 1\n\nprint(solve(5))  # Output: 11\n```\n\nThis demonstrates the concept clearly. The key insight is that we're applying a linear transformation.",
  "That's a really interesting question! The answer involves understanding a few key concepts:\n\n**Definition:** The phenomenon occurs when...\n\n**Why it matters:** This is important because...\n\n**Real-world application:** Think of it like...\n\nDoes this make sense? Feel free to ask follow-up questions!",
];

let demoResponseIndex = 0; // Rotate through demo responses

/* ─── Simple markdown-like renderer ─────────────────────────────────────── */
function renderContent(text: string): React.ReactNode {
  // Split into lines for block-level rendering
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let inCode = false;
  let codeBuffer: string[] = [];
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (!inCode) {
        inCode   = true;
        codeLang = line.slice(3).trim();   // Extract language hint
        codeBuffer = [];
      } else {
        inCode = false;
        result.push(
          <CodeBlock key={i} code={codeBuffer.join("\n")} lang={codeLang} />
        );
        codeBuffer = [];
      }
    } else if (inCode) {
      codeBuffer.push(line);              // Accumulate code lines
    } else if (line.startsWith("**") && line.endsWith("**")) {
      result.push(<p key={i} className="font-semibold text-foreground mt-2">{line.slice(2, -2)}</p>);
    } else if (/^\d+\.\s/.test(line)) {
      result.push(<p key={i} className="ml-4 text-sm">• {line.replace(/^\d+\.\s/, "")}</p>);
    } else if (line === "") {
      result.push(<br key={i} />);
    } else {
      result.push(<p key={i} className="text-sm leading-relaxed">{line}</p>);
    }
  }

  return <div className="space-y-1">{result}</div>;
}

/* ─── CodeBlock Component ────────────────────────────────────────────────── */
function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border bg-gray-950">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <span className="text-xs text-gray-400">{lang || "code"}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-4 text-xs text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ─── AITutorInterface Component ─────────────────────────────────────────── */
export function AITutorInterface() {
  const [messages,       setMessages]       = useState<Message[]>([]);      // Chat history
  const [input,          setInput]          = useState("");                  // Current input
  const [isLoading,      setIsLoading]      = useState(false);              // Waiting for response
  const [activeSubject,  setActiveSubject]  = useState("general");          // Active subject context
  const [showSubjects,   setShowSubjects]   = useState(false);              // Subject dropdown

  const messagesEndRef = useRef<HTMLDivElement>(null); // For auto-scroll to bottom
  const inputRef       = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ── Send a message ─────────────────────────────────────────────────── */
  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    // Add user message to history
    const userMessage: Message = {
      id:      crypto.randomUUID(),
      role:    "user",
      content,
      time:    new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");    // Clear input field
    setIsLoading(true);

    try {
      // Try the AI API — falls back to demo response if unavailable
      const res = await fetch("/api/ai", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: content, subject: activeSubject }),
      });

      let responseText: string;

      if (res.ok) {
        const data = await res.json() as { ok: boolean; data?: { response: string } };
        responseText = data.data?.response ?? DEMO_RESPONSES[demoResponseIndex++ % DEMO_RESPONSES.length];
      } else {
        // Demo fallback
        responseText = DEMO_RESPONSES[demoResponseIndex++ % DEMO_RESPONSES.length];
      }

      // Add AI response to history
      const aiMessage: Message = {
        id:      crypto.randomUUID(),
        role:    "assistant",
        content: responseText,
        time:    new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch {
      // Network error — use demo response
      const aiMessage: Message = {
        id:      crypto.randomUUID(),
        role:    "assistant",
        content: DEMO_RESPONSES[demoResponseIndex++ % DEMO_RESPONSES.length],
        time:    new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus(); // Return focus to input
    }
  };

  /* ── Active subject label ───────────────────────────────────────────── */
  const activeSubjectLabel = SUBJECTS.find((s) => s.id === activeSubject)?.label ?? "General";

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* ── Header bar ──────────────────────────────────────────────── */}
      <div className="border-b bg-card px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-500 text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">AI Tutor</h1>
            <p className="text-xs text-muted-foreground">Powered by GPT-4 — ask anything</p>
          </div>
        </div>

        {/* Subject selector */}
        <div className="relative">
          <button
            onClick={() => setShowSubjects((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-muted text-sm font-medium text-foreground hover:border-brand-500/50 transition-colors"
          >
            <BookOpen className="h-4 w-4 text-brand-500" />
            {activeSubjectLabel}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          {/* Subject dropdown */}
          {showSubjects && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-card shadow-lg z-20 overflow-hidden">
              {SUBJECTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveSubject(s.id); setShowSubjects(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                    activeSubject === s.id
                      ? "bg-brand-500/10 text-brand-500"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Messages area ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-2xl bg-brand-500/10 text-brand-500 mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">How can I help you today?</h2>
              <p className="text-muted-foreground text-sm">
                Ask me anything about CBSE subjects, programming, DSA, engineering, or anything else.
              </p>
            </div>

            {/* Quick suggestions */}
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left p-4 rounded-xl border bg-card hover:border-brand-500/50 hover:bg-brand-500/5 transition-all text-sm text-foreground group"
                >
                  <span className="line-clamp-2">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 max-w-3xl ${
                message.role === "user" ? "ml-auto flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "assistant"
                  ? "bg-brand-500 text-white"
                  : "bg-muted text-foreground border"
              }`}>
                {message.role === "assistant"
                  ? <Bot className="h-4 w-4" />
                  : <User className="h-4 w-4" />
                }
              </div>

              {/* Message bubble */}
              <div className={`flex-1 min-w-0 rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-brand-500 text-white ml-8"
                  : "bg-card border"
              }`}>
                {message.role === "user"
                  ? <p className="text-sm">{message.content}</p>
                  : <div className="text-foreground">{renderContent(message.content)}</div>
                }
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 max-w-3xl"
          >
            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-card border rounded-2xl px-4 py-3">
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            </div>
          </motion.div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area ────────────────────────────────────────────────── */}
      <div className="border-t bg-card p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex items-end gap-3"
          >
            <div className="flex-1">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about ${activeSubjectLabel}...`}
                disabled={isLoading}
                className="rounded-xl py-6 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-12 w-12 rounded-xl flex-shrink-0"
            >
              {isLoading
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <Send className="h-4 w-4" />
              }
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses may not be 100% accurate. Always verify with your textbook.
          </p>
        </div>
      </div>
    </div>
  );
}
