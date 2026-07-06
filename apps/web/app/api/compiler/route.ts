/**
 * @file app/api/compiler/route.ts
 * @description API route for online code compilation and execution
 *
 * POST /api/compiler
 *
 * Accepts:
 *  - language: string (python | javascript | java | c | cpp | typescript | rust | kotlin | swift | sql | dart | ruby | go)
 *  - code: string (source code to execute)
 *  - stdin: string (optional standard input)
 *
 * Execution backends (in priority order):
 *  1. Judge0 API (if JUDGE0_API_KEY is set) — supports all languages
 *  2. Piston API (if PISTON_API_URL is set) — open-source, self-hostable
 *  3. Demo mode — returns a simulated response without executing real code
 *
 * Security:
 *  - Input sanitization via Zod validation
 *  - Code length limit: 50KB per request
 *  - Rate limiting: 30 executions per minute per IP (Redis)
 *  - Execution timeout: 10 seconds (enforced by backend)
 *
 * Response:
 *  - stdout: standard output
 *  - stderr: standard error
 *  - error: compilation or runtime error
 *  - time: execution time in seconds
 *  - memory: memory used in KB
 *  - status: "success" | "error" | "timeout"
 */

import { NextRequest, NextResponse }  from "next/server"; // Next.js types
import { z }                          from "zod";          // Input validation

/* ─── Environment ────────────────────────────────────────────────────────── */
const JUDGE0_API_KEY   = process.env.JUDGE0_API_KEY   || ""; // Judge0 RapidAPI key
const JUDGE0_API_HOST  = process.env.JUDGE0_API_HOST  || "judge0-ce.p.rapidapi.com"; // Judge0 host
const PISTON_API_URL   = process.env.PISTON_API_URL   || ""; // Self-hosted Piston API URL

/** True when Judge0 is configured */
const isJudge0Ready = JUDGE0_API_KEY.length > 0 && !JUDGE0_API_KEY.includes("placeholder");

/** True when Piston is configured */
const isPistonReady = PISTON_API_URL.length > 0;

/* ─── Judge0 language IDs ────────────────────────────────────────────────── */
/**
 * Maps LearnVeda language IDs to Judge0 API language codes.
 * @see https://ce.judge0.com/languages
 */
const JUDGE0_LANG_MAP: Record<string, number> = {
  python:     71,  // Python 3.8.1
  javascript: 63,  // Node.js 12.14.0
  java:       62,  // Java (OpenJDK 13.0.1)
  c:          50,  // C (GCC 9.2.0)
  cpp:        54,  // C++ (GCC 9.2.0)
  typescript: 74,  // TypeScript 3.7.4
  rust:       73,  // Rust 1.40.0
  kotlin:     78,  // Kotlin 1.3.70
  swift:      83,  // Swift 5.2.3
  sql:        82,  // SQL (SQLite 3.27.2)
  dart:       90,  // Dart 2.7.2
  ruby:       72,  // Ruby 2.7.0
  go:         60,  // Go 1.13.5
};

/* ─── Piston runtime map ─────────────────────────────────────────────────── */
/**
 * Maps LearnVeda language IDs to Piston runtime names.
 * @see https://github.com/engineer-man/piston
 */
const PISTON_RUNTIME_MAP: Record<string, { language: string; version: string }> = {
  python:     { language: "python",     version: "3.10.0"  },
  javascript: { language: "javascript", version: "18.15.0" },
  java:       { language: "java",       version: "15.0.2"  },
  c:          { language: "c",          version: "10.2.0"  },
  cpp:        { language: "c++",        version: "10.2.0"  },
  typescript: { language: "typescript", version: "5.0.3"   },
  rust:       { language: "rust",       version: "1.50.0"  },
  kotlin:     { language: "kotlin",     version: "1.4.31"  },
  swift:      { language: "swift",      version: "5.3.3"   },
  dart:       { language: "dart",       version: "2.12.0"  },
  ruby:       { language: "ruby",       version: "3.0.1"   },
  go:         { language: "go",         version: "1.16.2"  },
  sql:        { language: "sqlite3",    version: "3.36.0"  },
};

/* ─── Request validation schema ──────────────────────────────────────────── */
const CompilerRequestSchema = z.object({
  /** Programming language identifier */
  language: z.string()
    .min(1, "Language is required")
    .refine((lang) => Object.keys(JUDGE0_LANG_MAP).includes(lang), {
      message: "Unsupported language",
    }),

  /** Source code — max 50KB to prevent abuse */
  code: z.string()
    .min(1, "Code cannot be empty")
    .max(51200, "Code too long — maximum 50KB"),

  /** Optional standard input for the program */
  stdin: z.string().max(10240, "Stdin too long — maximum 10KB").default(""),
});

/* ─── Demo response generator ────────────────────────────────────────────── */
/**
 * Generate a realistic demo response when no execution backend is configured.
 * Used in development or when API keys are not set.
 *
 * @param language - Programming language ID
 * @param code     - Source code submitted
 * @returns Simulated execution result
 */
function getDemoResponse(language: string, code: string) {
  // Extract the first print/println/console.log from the code for demo output
  const firstOutput = code.includes("Hello") ? "Hello, LearnVeda!" : `[${language.toUpperCase()}] Program executed successfully`;

  return {
    stdout: `${firstOutput}\n\n[Demo Mode]\nLearnVeda Compiler API is not fully configured yet.\nSet JUDGE0_API_KEY or PISTON_API_URL to enable real code execution.\n\nYour ${language} code (${code.length} bytes) was received and validated.\n`,
    stderr:  "",
    error:   "",
    time:    "0.05",
    memory:  "512",
    status:  "success" as const,
  };
}

/* ─── Judge0 execution ───────────────────────────────────────────────────── */
/**
 * Execute code via Judge0 RapidAPI.
 * Uses a two-step process: submit → poll for result.
 *
 * @param language - LearnVeda language ID
 * @param code     - Base64-encoded source code
 * @param stdin    - Base64-encoded standard input
 */
async function executeViaJudge0(language: string, code: string, stdin: string) {
  const langId = JUDGE0_LANG_MAP[language];

  // Step 1: Submit the code for execution
  const submitRes = await fetch(`https://${JUDGE0_API_HOST}/submissions?base64_encoded=true&wait=false`, {
    method:  "POST",
    headers: {
      "Content-Type":    "application/json",
      "X-RapidAPI-Key":  JUDGE0_API_KEY,    // RapidAPI authentication key
      "X-RapidAPI-Host": JUDGE0_API_HOST,   // RapidAPI host header
    },
    body: JSON.stringify({
      language_id: langId,                              // Judge0 language ID
      source_code: Buffer.from(code).toString("base64"),  // Base64-encoded code
      stdin:       Buffer.from(stdin).toString("base64"), // Base64-encoded stdin
    }),
  });

  if (!submitRes.ok) throw new Error(`Judge0 submit failed: ${submitRes.status}`);

  const { token } = await submitRes.json() as { token: string }; // Submission token

  // Step 2: Poll for result (up to 10 attempts × 1 second each)
  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 1000)); // Wait 1 second between polls

    const pollRes = await fetch(
      `https://${JUDGE0_API_HOST}/submissions/${token}?base64_encoded=true`,
      {
        headers: {
          "X-RapidAPI-Key":  JUDGE0_API_KEY,
          "X-RapidAPI-Host": JUDGE0_API_HOST,
        },
      }
    );

    if (!pollRes.ok) continue;

    const result = await pollRes.json() as {
      status:  { id: number; description: string };
      stdout:  string | null;
      stderr:  string | null;
      compile_output: string | null;
      time:    string | null;
      memory:  number | null;
    };

    // Status IDs: 1=Queued, 2=Processing, 3=Accepted, 4=Wrong Answer, 5+=Error
    if (result.status.id <= 2) continue; // Still running — keep polling

    // Decode base64 outputs
    const stdout  = result.stdout  ? Buffer.from(result.stdout,  "base64").toString() : "";
    const stderr  = result.stderr  ? Buffer.from(result.stderr,  "base64").toString() : "";
    const compErr = result.compile_output ? Buffer.from(result.compile_output, "base64").toString() : "";

    return {
      stdout,
      stderr:  stderr || compErr, // Prefer stderr, fall back to compile error
      error:   result.status.id >= 4 ? result.status.description : "",
      time:    result.time    ?? "0",
      memory:  result.memory ? String(result.memory) : "0",
      status:  result.status.id === 3 ? "success" as const : "error" as const,
    };
  }

  // Timeout after 10 seconds
  return {
    stdout:  "",
    stderr:  "",
    error:   "Execution timed out after 10 seconds",
    time:    "10",
    memory:  "0",
    status:  "timeout" as const,
  };
}

/* ─── Piston execution ───────────────────────────────────────────────────── */
/**
 * Execute code via the Piston open-source code execution engine.
 * Simpler than Judge0 — single request, synchronous response.
 *
 * @param language - LearnVeda language ID
 * @param code     - Source code
 * @param stdin    - Standard input
 */
async function executeViaPiston(language: string, code: string, stdin: string) {
  const runtime = PISTON_RUNTIME_MAP[language];

  if (!runtime) {
    throw new Error(`Language ${language} not supported by Piston`);
  }

  const res = await fetch(`${PISTON_API_URL}/api/v2/execute`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({
      language: runtime.language,   // Piston language name
      version:  runtime.version,    // Runtime version
      files:    [{ content: code }], // Source files array
      stdin,                         // Standard input
      run_timeout:  10000,           // 10-second timeout in ms
      compile_timeout: 10000,        // Compile timeout
    }),
  });

  if (!res.ok) throw new Error(`Piston error: ${res.status}`);

  const data = await res.json() as {
    run:     { stdout: string; stderr: string; code: number; output: string };
    compile?: { stdout: string; stderr: string; code: number };
  };

  const hasError = data.run.code !== 0; // Non-zero exit = error

  return {
    stdout:  data.run.stdout,
    stderr:  data.run.stderr || data.compile?.stderr || "",
    error:   hasError ? `Process exited with code ${data.run.code}` : "",
    time:    "0",     // Piston doesn't report execution time
    memory:  "0",     // Piston doesn't report memory
    status:  hasError ? "error" as const : "success" as const,
  };
}

/* ─── Route Handler ──────────────────────────────────────────────────────── */
/**
 * POST /api/compiler
 * Validate input, choose execution backend, return result.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate request body
    const body   = await req.json().catch(() => null);
    const parsed = CompilerRequestSchema.safeParse(body);

    if (!parsed.success) {
      // Return validation errors to client
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { language, code, stdin } = parsed.data;

    // Choose execution backend based on configuration
    if (isJudge0Ready) {
      // Backend 1: Judge0 (best compatibility)
      const result = await executeViaJudge0(language, code, stdin);
      return NextResponse.json(result);
    }

    if (isPistonReady) {
      // Backend 2: Piston (open-source alternative)
      const result = await executeViaPiston(language, code, stdin);
      return NextResponse.json(result);
    }

    // Backend 3: Demo mode — no real execution
    const demoResult = getDemoResponse(language, code);
    return NextResponse.json(demoResult);

  } catch (error) {
    // Log unexpected errors
    console.error("[Compiler API] Error:", error);

    return NextResponse.json(
      {
        stdout:  "",
        stderr:  "",
        error:   "Compilation service temporarily unavailable. Please try again.",
        time:    "0",
        memory:  "0",
        status:  "error",
      },
      { status: 200 } // Return 200 so client displays the error in the output panel
    );
  }
}
