# LearnVeda — AI-Powered EdTech Platform

## Project Overview

LearnVeda is an enterprise-grade, AI-powered EdTech platform for Indian students. It covers:
- **CBSE Class 9–12** — full NCERT-aligned curriculum with simulations and board exam prep
- **Engineering** — 8+ branches × 8 semesters (B.Tech programs)
- **13 Programming Languages** — structured day-by-day learning plans (Python, JS, TS, Java, C, C++, Go, Rust, Swift, Dart, Ruby, SQL, Kotlin)
- **Core CS subjects** — DSA, System Design, DBMS, OS, CN, Git, Competitive Programming, Web Dev, Interview Prep
- **Live Battles** — 1v1 real-time quiz duels (Socket.IO)
- **AI Tutor** — GPT-4-powered 24/7 tutor with subject context
- **Online Compiler** — 13 languages via Monaco Editor + Judge0/Piston backend
- **Community** — Q&A forum, live chat, posts
- **Gamification** — XP, streaks, levels, achievement badges, leaderboard
- **Simulations** — 140+ interactive physics/chemistry/biology/CS simulations

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Next.js API Routes, MongoDB + Mongoose, Redis (with in-memory fallback)
- **Auth**: Clerk (with graceful demo mode when keys are absent)
- **Payments**: Stripe + Razorpay (lazy-loaded stubs)
- **Storage**: Cloudinary (lazy-loaded stub)
- **Email**: Resend (logs to console in demo mode)
- **Compiler**: Monaco Editor + Judge0 or Piston API (demo fallback)

## Running the App

The app runs on port 5000 via the **Start application** workflow:
```
cd apps/web && WATCHPACK_POLLING=true ./node_modules/.bin/next dev --port 5000
```

## Environment Variables

`apps/web/.env.local` — create from this template:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder  # Real keys from clerk.com
CLERK_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_APP_URL=http://localhost:5000
MONGODB_URI=                                           # Leave empty for demo mode
SESSION_SECRET=<from Replit secrets>
OPENAI_API_KEY=                                        # Optional — AI Tutor feature
RESEND_API_KEY=                                        # Optional — email feature
LEARNVEDA_DEMO_MODE=true
```

**Demo mode**: The app runs without Clerk or MongoDB configured. All features show realistic demo data. Set real keys to enable live auth and database.

## Repository Structure

```
learnveda/
├── apps/web/                   # Next.js 15 application (104 pages)
│   ├── app/
│   │   ├── (auth)/             # Clerk sign-in / sign-up pages
│   │   ├── (legal)/            # Privacy, Terms, Cookies
│   │   ├── (marketing)/        # Public pages: home, about, pricing, features, etc.
│   │   ├── (platform)/         # Protected platform: dashboard, learn, programming, etc.
│   │   └── api/                # REST API routes
│   ├── features/               # Feature modules (one per feature area)
│   │   ├── home/               # Homepage sections
│   │   ├── dashboard/          # User dashboard
│   │   ├── learn/              # CBSE + Engineering hubs
│   │   ├── programming/        # Language day plans
│   │   ├── community/          # Community feed + chat
│   │   ├── ai-tutor/           # AI Tutor interface
│   │   ├── compiler/           # Code compiler
│   │   ├── live-battles/       # 1v1 battles arena
│   │   ├── test-center/        # Mock test engine
│   │   ├── simulations/        # Interactive simulations
│   │   ├── leaderboard/        # Global leaderboard
│   │   ├── pricing/            # Pricing plans
│   │   └── gamification/       # XP, badges, streaks
│   ├── components/             # Shared UI components (navbar, footer, cards, etc.)
│   ├── lib/                    # Utilities (mongodb, clerk, redis, ai, email)
│   └── providers/              # React context providers
├── packages/                   # Shared packages (config, types, utils)
└── .github/                    # CI/CD workflows
```

## Key Architecture Decisions

- **Demo mode pattern**: `hasRealClerkKeys` checked at runtime; app works without auth keys. All API routes gracefully fall back to mock data when MongoDB is not configured.
- **Two MongoDB helpers**: `lib/database/mongodb.ts` (raw MongoClient → `Db`) and `lib/mongodb/index.ts` (Mongoose). The latter re-exports `connectToDatabase` as a compatibility shim for routes using `{ connectToDatabase } from "@/lib/mongodb"`.
- **Framer Motion SSR**: Use `opacity: 0.01` (not `0`) as the initial value for above-the-fold animations to avoid blank SSR screenshots.
- **Platform layout**: `(platform)/layout.tsx` provides the Navbar. Individual platform pages must NOT render their own Navbar.
- **API security**: All write routes (POST/PATCH/DELETE) require valid Clerk session. Admin-only routes additionally verify `role: "admin"` in MongoDB.

## User Preferences

- Never delete existing files or folders — only add
- Every page/section/feature in its own separate folder
- Heavy commenting on every file (enterprise-level, function docs, inline comments)
- Fully functional with real data (no placeholders)
- Professional, modern, animated, fully responsive
