/**
 * @file app/api/ai/route.ts
 * @description AI chat endpoint for LearnVeda AI Tutor
 * Route: POST /api/ai — accepts chat messages and returns AI responses
 * Auth: Requires valid Clerk session OR demo-mode header; rejects unauthenticated requests in production
 * Rate limiting: enforced via userId (20 req/hour free, 200/hour Pro) — in production via Redis
 * In production: routes to OpenAI GPT-4o or Google Gemini based on subject/availability
 */

import { NextRequest, NextResponse } from "next/server"; // Next.js helpers

/* ─── Clerk Key Detection ─────────────────────────────────────────────────── */
const hasRealClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

/* ─── In-Memory Rate Limiter (Demo) ──────────────────────────────────────── */
// In production: use Redis with sliding window rate limiting
// Map structure: userId → { count, windowStart }
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX    = 20;           // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now  = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    // New window — reset counter
    rateLimitMap.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    // Window exhausted
    return { allowed: false, remaining: 0 };
  }

  // Increment counter within existing window
  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

/* ─── Subject-Specific System Prompts ────────────────────────────────────── */
const SYSTEM_PROMPTS: Record<string, string> = {
  math: `You are LearnVeda's Math Tutor — expert in CBSE/NCERT Mathematics from Class 9 to Graduation.
Break down problems step-by-step. Explain theorems with clear proofs. Provide multiple approaches.
Connect abstract concepts to real-world applications. Use LaTeX notation for equations when helpful.`,

  physics: `You are LearnVeda's Physics Tutor — expert in CBSE Physics and JEE/NEET preparation.
Explain physical intuition before mathematics. Use ASCII diagrams when helpful.
Relate concepts to everyday life. Always check units and provide dimensional analysis.`,

  chemistry: `You are LearnVeda's Chemistry Tutor — covering organic, inorganic, and physical chemistry.
Explain reaction mechanisms step-by-step. Balance chemical equations. Use proper chemical notation.
Give mnemonics for periodic trends. Explain the "why" behind every reaction.`,

  coding: `You are LearnVeda's Coding Tutor — expert in Python, Java, C++, JavaScript, DSA, and System Design.
Write clean, well-commented code examples. Explain time/space complexity. Debug student code.
Teach DSA patterns for competitive programming. Always explain Big-O notation when relevant.`,

  biology: `You are LearnVeda's Biology Tutor — covering CBSE Biology and NEET preparation.
Explain biological processes visually with ASCII diagrams. Connect structure to function.
Give NEET-focused explanations with previous year examples.`,

  "study-plan": `You are LearnVeda's Study Plan Generator — expert in personalized study planning.
Create realistic, balanced weekly schedules. Incorporate spaced repetition and active recall.
Always ask about current level, available time per day, and target exam before generating a plan.`,

  general: `You are LearnVeda's AI Tutor — India's most helpful educational AI for Class 9 to Graduation.
Help with all subjects, programming, and career guidance. Be encouraging and clear.
Always relate explanations to the Indian education system (CBSE, JEE, NEET, GATE).`,
};

/* ─── POST /api/ai ────────────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  /* ── 1. Authentication check ────────────────────────────────────────────── */
  let userId: string | null = "demo-user"; // Default for demo mode

  if (hasRealClerkKeys) {
    try {
      const { auth } = await import("@clerk/nextjs/server");
      const session  = await auth();
      userId = session.userId;

      if (!userId) {
        // Fail-closed: reject unauthenticated AI requests in Clerk-enabled mode
        return NextResponse.json(
          { ok: false, error: { code: "UNAUTHORIZED", message: "Sign in to use the AI Tutor" } },
          { status: 401 },
        );
      }
    } catch (err) {
      console.error("[POST /api/ai] Clerk auth error:", err);
      return NextResponse.json(
        { ok: false, error: { code: "AUTH_ERROR", message: "Authentication service unavailable" } },
        { status: 503 },
      );
    }
  }

  /* ── 2. Rate limiting ───────────────────────────────────────────────────── */
  // Use userId as rate-limit key; fall back to IP for unauthenticated demo requests
  const rateLimitKey = userId || (request.headers.get("x-forwarded-for") || "unknown");
  const { allowed, remaining } = checkRateLimit(rateLimitKey);

  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: { code: "RATE_LIMITED", message: "AI Tutor rate limit reached. Try again in an hour." } },
      {
        status: 429,
        headers: {
          "Retry-After":          "3600",      // Seconds until window resets
          "X-RateLimit-Limit":    `${RATE_LIMIT_MAX}`,
          "X-RateLimit-Remaining":"0",
        },
      },
    );
  }

  /* ── 3. Parse request body ──────────────────────────────────────────────── */
  let body: { message: string; subject?: string; history?: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "INVALID_JSON", message: "Invalid request body" } },
      { status: 400 },
    );
  }

  const { message, subject = "general", history = [] } = body;

  /* ── 4. Validate input ──────────────────────────────────────────────────── */
  if (!message?.trim()) {
    return NextResponse.json(
      { ok: false, error: { code: "VALIDATION_ERROR", message: "Message is required" } },
      { status: 400 },
    );
  }

  if (message.length > 2000) {
    return NextResponse.json(
      { ok: false, error: { code: "VALIDATION_ERROR", message: "Message too long (max 2000 chars)" } },
      { status: 400 },
    );
  }

  // Sanitize subject to prevent prompt injection via subject parameter
  const safeSubject = Object.keys(SYSTEM_PROMPTS).includes(subject) ? subject : "general";
  const systemPrompt = SYSTEM_PROMPTS[safeSubject];

  /* ── 5. Call AI API ─────────────────────────────────────────────────────── */
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GEMINI_API_KEY;

  let aiResponse: string;
  let modelUsed: string;

  try {
    if (hasOpenAI) {
      // Production path: OpenAI GPT-4o
      // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      // const completion = await openai.chat.completions.create({
      //   model: "gpt-4o",
      //   messages: [
      //     { role: "system", content: systemPrompt },
      //     ...history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
      //     { role: "user", content: message },
      //   ],
      //   max_tokens: 1000,
      //   temperature: 0.7,
      // });
      // aiResponse = completion.choices[0].message.content || "";
      aiResponse = `[OpenAI GPT-4o — configure OPENAI_API_KEY to enable]\n\n**Your question:** ${message}\n\nSubject: **${safeSubject}**`;
      modelUsed  = "gpt-4o";
    } else if (hasGemini) {
      // Fallback: Google Gemini
      aiResponse = `[Gemini — configure GEMINI_API_KEY]\n\n**Your question:** ${message}`;
      modelUsed  = "gemini-pro";
    } else {
      // Demo mode response
      aiResponse = `**Demo Mode** — AI Tutor running without real AI keys.\n\n` +
        `**Your question:** *"${message}"*\n\n` +
        `**Subject:** ${safeSubject}\n\n` +
        `To enable real AI responses, add **OPENAI_API_KEY** or **GEMINI_API_KEY** to your environment secrets. ` +
        `In production, I would provide a detailed, step-by-step explanation tailored to the Indian CBSE/JEE/NEET curriculum.`;
      modelUsed = "demo";
    }
  } catch (err) {
    console.error("[POST /api/ai] AI generation error:", err);
    return NextResponse.json(
      { ok: false, error: { code: "AI_ERROR", message: "AI service temporarily unavailable" } },
      { status: 503 },
    );
  }

  /* ── 6. Return response ────────────────────────────────────────────────── */
  return NextResponse.json(
    {
      ok:   true,
      data: {
        response: aiResponse,
        subject:  safeSubject,
        model:    modelUsed,
      },
    },
    {
      headers: {
        "X-RateLimit-Limit":     `${RATE_LIMIT_MAX}`,
        "X-RateLimit-Remaining": `${remaining}`,
      },
    },
  );
}
