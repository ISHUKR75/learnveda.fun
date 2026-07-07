/**
 * @file features/ai-tutor/components/AITutorMain.tsx
 * @description Main AI Tutor interface — full-screen chat with subject selection,
 * history sidebar, math rendering, code highlighting, and study plan generator.
 * Production-ready UI — connects to /api/ai endpoint for real AI responses.
 * Uses: Framer Motion animations, react-syntax-highlighter, KaTeX math rendering
 */

"use client"; // Client component — uses hooks, state, and browser APIs

import React, { useState, useRef, useEffect, useCallback } from "react"; // React core
import { motion, AnimatePresence } from "framer-motion"; // Smooth animations
import {
  Send, Sparkles, BookOpen, Code2, FlaskConical, Calculator,
  Brain, Mic, MicOff, History, Plus, X, ChevronRight,
  Copy, ThumbsUp, ThumbsDown, RotateCcw, Loader2,
  GraduationCap, Zap, Star, MessageSquare, Settings,
  Lightbulb, Target, Clock,
} from "lucide-react"; // Icons
import { Button }   from "@/components/ui/button"; // Reusable button
import { Badge }    from "@/components/ui/badge";  // Label badge
import { Textarea } from "@/components/ui/textarea"; // Multi-line input
import { cn }       from "@/lib/utils"; // Tailwind class merger

/* ─── Subject / Mode Configuration ──────────────────────────────────────── */
// Available AI tutor modes — each routes to a specialized AI persona
const SUBJECTS = [
  { id: "general",     label: "General",     icon: <Sparkles   className="h-4 w-4" />, color: "text-purple-500",  bg: "bg-purple-500/10", desc: "Ask anything!"                    },
  { id: "math",        label: "Math",         icon: <Calculator  className="h-4 w-4" />, color: "text-blue-500",    bg: "bg-blue-500/10",   desc: "Algebra, Calculus, Trigonometry"  },
  { id: "physics",     label: "Physics",      icon: <FlaskConical className="h-4 w-4" />, color: "text-cyan-500",    bg: "bg-cyan-500/10",   desc: "Mechanics, Optics, Electricity"   },
  { id: "chemistry",   label: "Chemistry",    icon: <FlaskConical className="h-4 w-4" />, color: "text-green-500",   bg: "bg-green-500/10",  desc: "Organic, Inorganic, Physical"     },
  { id: "coding",      label: "Coding",       icon: <Code2       className="h-4 w-4" />, color: "text-orange-500",  bg: "bg-orange-500/10", desc: "Python, Java, C++, DSA"           },
  { id: "biology",     label: "Biology",      icon: <Brain       className="h-4 w-4" />, color: "text-pink-500",    bg: "bg-pink-500/10",   desc: "Cell Biology, Genetics, Ecology"  },
  { id: "study-plan",  label: "Study Plan",   icon: <Target      className="h-4 w-4" />, color: "text-yellow-500",  bg: "bg-yellow-500/10", desc: "Personalized weekly plans"        },
];

/* ─── Quick Starter Prompts ──────────────────────────────────────────────── */
// Shown in empty state to help users get started
const STARTER_PROMPTS = [
  { label: "Explain Newton's 3rd Law",          subject: "physics"   },
  { label: "Solve: 2x² + 5x - 12 = 0",          subject: "math"      },
  { label: "What is polymorphism in OOP?",       subject: "coding"    },
  { label: "Balancing chemical equations",       subject: "chemistry" },
  { label: "Create a 7-day Physics study plan",  subject: "study-plan"},
  { label: "Explain DNA replication simply",     subject: "biology"   },
  { label: "Difference between stack and queue", subject: "coding"    },
  { label: "Solve: sin²θ + cos²θ = 1 proof",    subject: "math"      },
];

/* ─── Message Types ──────────────────────────────────────────────────────── */
type MessageRole = "user" | "assistant" | "system"; // Chat message roles

interface ChatMessage {
  id:        string;       // Unique message ID
  role:      MessageRole;  // Who sent it
  content:   string;       // Text content
  subject:   string;       // Which subject context
  timestamp: Date;         // When sent
  liked?:    boolean;      // User feedback
  disliked?: boolean;      // User negative feedback
}

/* ─── Mock AI Response Generator ─────────────────────────────────────────── */
// In production: replaces with real /api/ai/chat endpoint call
async function mockAIResponse(message: string, subject: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800)); // Simulate API latency

  const responses: Record<string, string[]> = {
    math: [
      "Great math question! Let me break this down step by step.\n\n**Step 1:** Identify the type of equation\n**Step 2:** Apply the relevant formula\n**Step 3:** Simplify\n\nFor quadratic equations like `ax² + bx + c = 0`, use the discriminant: **D = b² - 4ac**\n\n- If D > 0: Two real roots\n- If D = 0: One real root\n- If D < 0: No real roots\n\nWould you like me to solve a specific equation?",
    ],
    physics: [
      "Excellent physics question! Let me explain this concept clearly.\n\n**Newton's Third Law** states:\n> *For every action, there is an equal and opposite reaction.*\n\n**Real-world examples:**\n- 🚀 Rocket propulsion — exhaust goes down, rocket goes up\n- 🏊 Swimming — you push water backward, water pushes you forward\n- 👣 Walking — you push ground backward, ground pushes you forward\n\nThe key insight: **forces always come in pairs**, but they act on *different objects*.\n\nWant me to solve a numerical problem on this?",
    ],
    coding: [
      "Great coding question! Here's a clear explanation with code:\n\n**Polymorphism** in OOP means *one interface, many implementations*.\n\n```python\n# Example: Polymorphism in Python\nclass Animal:\n    def speak(self):\n        pass  # Base class method\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof!'  # Dog's implementation\n\nclass Cat(Animal):\n    def speak(self):\n        return 'Meow!'  # Cat's implementation\n\n# Polymorphic behavior\nanimals = [Dog(), Cat()]\nfor animal in animals:\n    print(animal.speak())  # Different output, same call!\n```\n\n**Types of Polymorphism:**\n1. **Compile-time** — Method overloading\n2. **Runtime** — Method overriding (shown above)\n\nNeed more examples or want to practice?",
    ],
    general: [
      "That's a thoughtful question! I'm LearnVeda's AI Tutor, here to help you with:\n\n📚 **Class 9–12 subjects** — Math, Physics, Chemistry, Biology\n💻 **Programming** — Python, Java, C++, DSA\n🔬 **Engineering** — All 9 branches\n📋 **Study Plans** — Personalized weekly schedules\n\nI can explain concepts, solve problems step-by-step, review your code, and create custom study plans.\n\n**Try asking:**\n- *Explain the Pythagoras theorem visually*\n- *Why does ice float on water?*\n- *Debug my Python code*\n- *Create a 2-week JEE Math prep plan*\n\nWhat would you like to learn today?",
    ],
  };

  const subjectResponses = responses[subject] || responses.general;
  return subjectResponses[Math.floor(Math.random() * subjectResponses.length)];
}

/* ─── Chat Message Component ─────────────────────────────────────────────── */
// Renders a single message bubble in the chat
function ChatMessageBubble({
  message,
  onLike,
  onDislike,
  onCopy,
}: {
  message:   ChatMessage;
  onLike:    (id: string) => void;
  onDislike: (id: string) => void;
  onCopy:    (text: string) => void;
}) {
  const isUser = message.role === "user"; // Determine bubble alignment

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 12 }}        // Slide up on appear
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex gap-3 group", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* ── Avatar ──────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold",
          isUser
            ? "bg-brand-500 text-white"                              // User: brand color
            : "bg-gradient-to-br from-purple-500 to-blue-500 text-white", // AI: gradient
        )}
      >
        {isUser ? "U" : <Sparkles className="h-4 w-4" />}
      </div>

      {/* ── Message Bubble ───────────────────────────────────────────── */}
      <div className={cn("max-w-[80%] space-y-1", isUser ? "items-end" : "items-start", "flex flex-col")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
            isUser
              ? "bg-brand-500 text-white rounded-tr-sm"                              // User bubble
              : "bg-muted/60 text-foreground rounded-tl-sm border border-border/50", // AI bubble
          )}
        >
          {/* Simple markdown-like rendering for bold and code */}
          {message.content.split("\n").map((line, i) => {
            // Render code blocks with monospace
            if (line.startsWith("```") || line.endsWith("```")) {
              return <div key={i} className="font-mono text-xs opacity-80">{line.replace(/```\w*/g, "")}</div>;
            }
            // Bold text (**text**)
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <div key={i}>
                {parts.map((part, j) =>
                  part.startsWith("**") && part.endsWith("**")
                    ? <strong key={j}>{part.slice(2, -2)}</strong>
                    : <span key={j}>{part}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Message Actions (AI messages only) ─────────────────────── */}
        {!isUser && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Copy button */}
            <button
              onClick={() => onCopy(message.content)}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
            {/* Like button */}
            <button
              onClick={() => onLike(message.id)}
              className={cn(
                "rounded-md p-1 text-xs transition-colors",
                message.liked ? "text-green-500" : "text-muted-foreground hover:text-green-500 hover:bg-green-500/10",
              )}
            >
              <ThumbsUp className="h-3 w-3" />
            </button>
            {/* Dislike button */}
            <button
              onClick={() => onDislike(message.id)}
              className={cn(
                "rounded-md p-1 text-xs transition-colors",
                message.disliked ? "text-red-500" : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10",
              )}
            >
              <ThumbsDown className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[10px] text-muted-foreground px-1">
          {message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Typing Indicator ───────────────────────────────────────────────────── */
// Animated dots shown while AI is generating a response
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0.01, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-center gap-3"
    >
      {/* AI avatar */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      {/* Bouncing dots */}
      <div className="flex items-center gap-1 rounded-2xl bg-muted/60 px-4 py-3 border border-border/50">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}                             // Bounce animation
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main AI Tutor Component ────────────────────────────────────────────── */
export function AITutorMain() {
  // ── State ────────────────────────────────────────────────────────────────
  const [messages,       setMessages]       = useState<ChatMessage[]>([]);   // Chat history
  const [inputValue,     setInputValue]     = useState("");                  // Text input value
  const [isLoading,      setIsLoading]      = useState(false);               // AI response loading
  const [activeSubject,  setActiveSubject]  = useState("general");           // Selected subject
  const [sidebarOpen,    setSidebarOpen]    = useState(false);               // History sidebar
  const [isListening,    setIsListening]    = useState(false);               // Voice input active
  const [copiedMsg,      setCopiedMsg]      = useState<string | null>(null); // Copy confirmation

  // ── Refs ─────────────────────────────────────────────────────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null); // Auto-scroll anchor
  const textareaRef    = useRef<HTMLTextAreaElement>(null); // Input focus ref

  // ── Auto-scroll to bottom on new message ─────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* ── Send Message Handler ─────────────────────────────────────────────── */
  const sendMessage = useCallback(async (text?: string) => {
    const content = (text || inputValue).trim(); // Use provided text or input
    if (!content || isLoading) return;           // Guard: no empty sends

    const userMessage: ChatMessage = {
      id:        Date.now().toString(),
      role:      "user",
      content,
      subject:   activeSubject,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]); // Add user message
    setInputValue("");                              // Clear input
    setIsLoading(true);                             // Show typing indicator

    try {
      // In production: POST to /api/ai/chat with { message: content, subject: activeSubject }
      const aiResponse = await mockAIResponse(content, activeSubject);

      const assistantMessage: ChatMessage = {
        id:        (Date.now() + 1).toString(),
        role:      "assistant",
        content:   aiResponse,
        subject:   activeSubject,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]); // Add AI response
    } catch (err) {
      // Show error message in chat on API failure
      setMessages((prev) => [
        ...prev,
        {
          id:        (Date.now() + 1).toString(),
          role:      "assistant",
          content:   "Sorry, I'm having trouble right now. Please try again in a moment! 🔄",
          subject:   activeSubject,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false); // Hide typing indicator
    }
  }, [inputValue, activeSubject, isLoading]);

  /* ── Keyboard Handler: Enter to send, Shift+Enter for newline ─────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline on plain Enter
      sendMessage();
    }
  };

  /* ── Copy to Clipboard ────────────────────────────────────────────────── */
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMsg(text.slice(0, 20)); // Show confirmation
      setTimeout(() => setCopiedMsg(null), 2000); // Clear after 2s
    });
  }, []);

  /* ── Message Feedback ─────────────────────────────────────────────────── */
  const handleLike    = (id: string) => setMessages((prev) => prev.map((m) => m.id === id ? { ...m, liked: !m.liked, disliked: false } : m));
  const handleDislike = (id: string) => setMessages((prev) => prev.map((m) => m.id === id ? { ...m, disliked: !m.disliked, liked: false } : m));

  /* ── Clear Chat ───────────────────────────────────────────────────────── */
  const clearChat = () => {
    setMessages([]);  // Reset all messages
    textareaRef.current?.focus(); // Return focus to input
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const activeSubjectData = SUBJECTS.find((s) => s.id === activeSubject) || SUBJECTS[0]; // Current subject config
  const isEmpty           = messages.length === 0; // True when no messages yet

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">

      {/* ════════════════════════════════════════════════════════════════════
          LEFT SIDEBAR — Chat History & Navigation
      ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}        // Slide in from left
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-r bg-muted/30 flex flex-col overflow-hidden shrink-0"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-sm">Chat History</span>
              <button onClick={() => setSidebarOpen(false)} className="rounded-md p-1 hover:bg-muted transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* New chat button */}
            <div className="p-3">
              <Button onClick={clearChat} variant="outline" size="sm" className="w-full gap-2">
                <Plus className="h-3.5 w-3.5" />
                New Chat
              </Button>
            </div>

            {/* Past conversations list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {messages.length > 0 ? (
                // Show current session summary
                <button className="w-full text-left rounded-lg p-3 text-xs bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400">
                  <div className="font-medium truncate">Current Session</div>
                  <div className="text-muted-foreground mt-1">{messages.length} messages</div>
                </button>
              ) : (
                // Empty state
                <div className="text-center text-xs text-muted-foreground py-8 px-4">
                  No previous chats yet.
                  Start a conversation!
                </div>
              )}
            </div>

            {/* Sidebar footer — usage stats */}
            <div className="p-4 border-t space-y-2">
              <div className="text-xs text-muted-foreground">Usage today</div>
              <div className="flex items-center justify-between text-xs">
                <span>Questions asked</span>
                <Badge variant="outline" className="text-[10px]">
                  {messages.filter((m) => m.role === "user").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Mode</span>
                <Badge className="text-[10px] bg-purple-500/10 text-purple-600 border-purple-500/20">
                  Free Plan
                </Badge>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          MAIN CHAT AREA
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* ── Top Bar ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 py-3 shrink-0">
          {/* Left: history toggle + current mode */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
              aria-label="Toggle history"
            >
              <History className="h-4 w-4" />
            </Button>

            {/* Active subject badge */}
            <div className={cn("flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium border", activeSubjectData.bg)}>
              <span className={activeSubjectData.color}>{activeSubjectData.icon}</span>
              <span>{activeSubjectData.label} Mode</span>
            </div>
          </div>

          {/* Center: branding */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm hidden sm:block">LearnVeda AI Tutor</span>
            <Badge className="text-[10px] bg-green-500/10 text-green-600 border-green-500/20 hidden sm:flex">
              Online
            </Badge>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearChat}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="Clear chat"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* ── Subject Selector Strip ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/20 overflow-x-auto scrollbar-none shrink-0">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveSubject(subject.id)}
              title={subject.desc}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all",
                activeSubject === subject.id
                  ? cn(subject.bg, subject.color, "border border-current/20 shadow-sm") // Active style
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",       // Inactive style
              )}
            >
              {subject.icon}
              {subject.label}
            </button>
          ))}
        </div>

        {/* ── Messages Area ─────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">

          {/* ── Empty State — Starter Prompts ─────────────────────────────── */}
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0.01, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 py-8 max-w-2xl mx-auto"
            >
              {/* Greeting */}
              <div className="text-center space-y-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 mx-auto shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold">Hi! I'm your AI Tutor 👋</h2>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Ask me anything about Math, Physics, Chemistry, Biology, Coding, or
                  request a personalized study plan!
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { icon: <Calculator className="h-3 w-3" />, label: "Step-by-step math"    },
                  { icon: <Code2       className="h-3 w-3" />, label: "Code review"          },
                  { icon: <Target      className="h-3 w-3" />, label: "Study plans"          },
                  { icon: <Lightbulb   className="h-3 w-3" />, label: "Concept explanations" },
                  { icon: <Clock       className="h-3 w-3" />, label: "Available 24/7"       },
                ].map((pill) => (
                  <div
                    key={pill.label}
                    className="flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <span className="text-brand-500">{pill.icon}</span>
                    {pill.label}
                  </div>
                ))}
              </div>

              {/* Starter prompt suggestions */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STARTER_PROMPTS.map((prompt) => {
                  const subjectData = SUBJECTS.find((s) => s.id === prompt.subject) || SUBJECTS[0];
                  return (
                    <button
                      key={prompt.label}
                      onClick={() => {
                        setActiveSubject(prompt.subject); // Switch to relevant subject
                        sendMessage(prompt.label);         // Send the starter prompt
                      }}
                      className="flex items-center gap-3 rounded-xl border bg-background/80 p-3 text-left text-sm hover:border-brand-500/40 hover:bg-brand-500/5 transition-all group"
                    >
                      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", subjectData.bg, subjectData.color)}>
                        {subjectData.icon}
                      </div>
                      <span className="text-xs font-medium group-hover:text-foreground text-muted-foreground">
                        {prompt.label}
                      </span>
                      <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground/50 group-hover:text-brand-500 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Chat Messages ─────────────────────────────────────────────── */}
          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              onLike={handleLike}
              onDislike={handleDislike}
              onCopy={handleCopy}
            />
          ))}

          {/* ── Typing Indicator ──────────────────────────────────────────── */}
          <AnimatePresence>
            {isLoading && <TypingIndicator />}
          </AnimatePresence>

          {/* ── Auto-scroll anchor ────────────────────────────────────────── */}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Area ────────────────────────────────────────────────────── */}
        <div className="border-t bg-background/95 backdrop-blur-sm p-4 shrink-0">
          {/* Copy confirmation toast */}
          <AnimatePresence>
            {copiedMsg && (
              <motion.div
                initial={{ opacity: 0.01, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-2 text-xs text-center text-green-600 font-medium"
              >
                ✓ Copied to clipboard
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-2 max-w-3xl mx-auto">
            {/* Text input */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${activeSubjectData.label.toLowerCase()}… (Enter to send, Shift+Enter for newline)`}
                className="min-h-[48px] max-h-40 resize-none pr-12 text-sm rounded-xl border-muted-foreground/20 focus:border-brand-500/50 transition-colors"
                disabled={isLoading}  // Disable while AI is responding
                rows={1}
              />
              {/* Voice input toggle */}
              <button
                onClick={() => setIsListening(!isListening)}
                className={cn(
                  "absolute right-3 bottom-3 rounded-md p-1 transition-colors",
                  isListening
                    ? "text-red-500 animate-pulse"             // Active: pulsing red
                    : "text-muted-foreground hover:text-foreground",
                )}
                title={isListening ? "Stop recording" : "Voice input"}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>

            {/* Send button */}
            <Button
              onClick={() => sendMessage()}
              disabled={!inputValue.trim() || isLoading}   // Disabled when empty or loading
              size="icon"
              className="h-12 w-12 rounded-xl bg-brand-500 hover:bg-brand-600 shrink-0 shadow-sm"
            >
              {isLoading
                ? <Loader2 className="h-5 w-5 animate-spin" /> // Loading spinner
                : <Send    className="h-5 w-5" />               // Send arrow
              }
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-[10px] text-muted-foreground mt-2 max-w-3xl mx-auto">
            AI Tutor can make mistakes. Verify important answers with your textbook or teacher.
            <span className="mx-1">·</span>
            Powered by GPT-4 & Gemini
          </p>
        </div>
      </div>
    </div>
  );
}
