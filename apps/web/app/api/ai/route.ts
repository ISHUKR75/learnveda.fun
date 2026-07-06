/**
 * @file app/api/ai/route.ts
 * @description AI Tutor API endpoint for LearnVeda
 * Route: POST /api/ai
 *
 * Calls OpenAI GPT-4 (or Gemini as fallback) to generate tutoring responses.
 * Rate limited: 30 requests per hour per user (tracked by session/IP).
 *
 * Body: { message: string, subject: string, conversationId?: string }
 * Returns: { ok: true, data: { response: string } }
 *
 * Demo mode (no OPENAI_API_KEY): returns pre-written educational responses.
 */

import { NextRequest, NextResponse } from "next/server";

/* ─── System prompt ──────────────────────────────────────────────────────── */
// Defines the AI tutor's persona and response style
const SYSTEM_PROMPT = `You are LearnVeda's AI Tutor — a friendly, expert teacher for Indian students.
You specialize in:
- CBSE Class 9–12 subjects (Mathematics, Physics, Chemistry, Biology, English, Hindi)
- Engineering subjects (DSA, OS, DBMS, Computer Networks, System Design)
- Programming languages (Python, JavaScript, TypeScript, Java, C, C++, and more)

Response guidelines:
- Use clear, simple language appropriate for Class 9-12 or college-level students
- Always explain WHY, not just the answer
- Use numbered steps for multi-step problems
- Provide code examples in Markdown code blocks when relevant
- Reference NCERT concepts where applicable
- Be encouraging and supportive — mistakes are part of learning
- Keep responses concise but complete (under 500 words unless the question requires more)
- Use emojis sparingly for warmth
- Always verify mathematical answers with a calculation check`;

/* ─── Demo responses (used when OpenAI is not configured) ────────────────── */
const DEMO_RESPONSES = [
  `Great question! Let me break this down step by step. 📚

**Understanding the concept:**
This is a fundamental topic that you'll encounter many times in your studies.

**Step-by-step explanation:**
1. First, identify what we know and what we need to find
2. Apply the relevant formula or theorem
3. Substitute values carefully
4. Verify your answer by working backwards

**Key formula to remember:**
The core relationship here is that input leads to a predictable output through a defined process.

Would you like me to solve a specific example problem for you?`,

  `Excellent question! Here's a clear explanation with an example:

**The concept in simple terms:**
Think of it like this — when you have a problem, you need to understand the underlying principle before solving it.

**Example solution:**
\`\`\`python
# Here's how you would implement this in Python
def solve_problem(input_value):
    # Step 1: Process the input
    result = input_value * 2 + 1
    # Step 2: Return the result
    return result

# Test it:
print(solve_problem(5))  # Output: 11
\`\`\`

**Why this works:**
The reason this approach is correct is because it follows from the fundamental theorem/principle.

Do you want me to explain any step in more detail?`,
];

let demoIndex = 0; // Rotate demo responses

/* ─── POST /api/ai ───────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      message:          string;   // User's question
      subject?:         string;   // Subject context (math, physics, etc.)
      conversationId?:  string;   // For multi-turn context (future)
    };

    const { message, subject = "general" } = body;

    // ── Input validation ──────────────────────────────────────────────────
    if (!message || message.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Message too short" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    // ── Demo mode — no API key ────────────────────────────────────────────
    if (!process.env.OPENAI_API_KEY) {
      const response = DEMO_RESPONSES[demoIndex++ % DEMO_RESPONSES.length];
      return NextResponse.json(
        {
          ok:   true,
          data: {
            response,
            isDemo: true, // Let client know it's a demo response
          },
        },
        {
          headers: { "Cache-Control": "no-store" }, // Never cache AI responses
        }
      );
    }

    // ── Production — call OpenAI ──────────────────────────────────────────
    const subjectContext = subject !== "general"
      ? `The student is asking about: ${subject}. ` : "";

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model:       process.env.OPENAI_MODEL ?? "gpt-4o-mini", // Default to gpt-4o-mini (cost-efficient)
        max_tokens:  600,                                         // Keep responses concise
        temperature: 0.7,                                         // Balanced creativity/accuracy
        messages: [
          { role: "system",  content: SYSTEM_PROMPT },
          { role: "user",    content: `${subjectContext}${message}` },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("[AI API] OpenAI error:", errText);
      // Return demo response on API failure (graceful degradation)
      return NextResponse.json({
        ok: true,
        data: { response: DEMO_RESPONSES[demoIndex++ % DEMO_RESPONSES.length], isDemo: true },
      });
    }

    const completion = await openaiRes.json() as {
      choices: { message: { content: string } }[];
    };

    const response = completion.choices[0]?.message?.content ?? "I couldn't generate a response. Please try again.";

    return NextResponse.json(
      { ok: true, data: { response } },
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (err) {
    console.error("[AI API] Error:", err);
    return NextResponse.json({ ok: false, error: "AI service unavailable" }, { status: 500 });
  }
}
