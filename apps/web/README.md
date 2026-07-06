# LearnVeda — Web Application

> India's most comprehensive EdTech platform — AI-powered learning from Class 9 to Graduation.

## 🚀 Quick Start

```bash
# From monorepo root
cd apps/web
npm install
npm run dev
# Server starts at http://localhost:5000
```

## 🛠 Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Next.js 15 (App Router)             |
| Language      | TypeScript 5.x (strict mode)        |
| Styling       | Tailwind CSS 3.x + shadcn/ui        |
| Auth          | Clerk (optional — demo mode)        |
| Database      | MongoDB + Mongoose                  |
| Cache         | Redis (Upstash)                     |
| Animations    | Framer Motion + GSAP                |
| State         | Zustand + TanStack Query            |
| Validation    | Zod schemas                         |
| Testing       | Jest + React Testing Library        |

## 📁 Folder Structure

```
apps/web/
├── app/                   # Next.js 15 App Router
│   ├── (marketing)/       # Public marketing pages (/, /about, /blog, etc.)
│   ├── (platform)/        # Authenticated platform pages (/dashboard, /learn, etc.)
│   ├── api/               # API routes (server-side endpoints)
│   └── layout.tsx         # Root layout with providers
│
├── components/            # Shared reusable UI components
│   ├── navigation/        # Navbar, Footer, Sidebar
│   ├── ui/                # shadcn/ui primitives (Button, Badge, Card, etc.)
│   └── providers/         # Context providers (QueryClient, Theme, etc.)
│
├── features/              # Feature-scoped components and logic (28 features)
│   ├── home/              # Homepage sections (HeroSection, StatsSection, etc.)
│   ├── learn/             # Class learning components
│   ├── programming/       # Programming day lessons
│   ├── simulations/       # Interactive simulation components
│   ├── dashboard/         # Student dashboard widgets
│   ├── ai/                # AI tutor components
│   ├── community/         # Community posts, Q&A, groups
│   └── ...               # 21 more feature folders
│
├── lib/                   # Shared utilities and service integrations
│   ├── mongodb.ts         # MongoDB connection singleton
│   ├── redis.ts           # Redis client (Upstash)
│   ├── clerk.ts           # Clerk auth helpers
│   └── services/          # Content-service, progress-service, etc.
│
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── styles/                # Global CSS (Tailwind base)
└── public/                # Static assets
```

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Required for auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Required for database
MONGODB_URI=mongodb+srv://...

# Optional (app works without these in demo mode)
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
```

See `.env.local` for the demo mode configuration (no real keys needed).

## 🏗 Key Architecture Decisions

### Demo Mode
The app runs without any real API keys. `middleware.ts` checks for placeholder Clerk keys and bypasses auth. Content is served from static in-file data. This allows development without external service costs.

### Route Groups
- `(marketing)`: Public pages with Navbar + Footer layout
- `(platform)`: Authenticated pages with Sidebar + Platform Navbar layout

### Content Service
`lib/services/content-service.ts` provides a unified interface that reads from:
1. MongoDB (when `MONGODB_URI` is set and connected)
2. Static `STATIC_CONTENT` objects in each page file (demo mode fallback)

New subjects/chapters need only:
1. A content file added to `features/learn/`
2. An entry in `STATIC_CONTENT`
3. A MongoDB seed entry

### Framer Motion
All above-the-fold animations must use `initial: { opacity: 0.01 }` (not `0`) to prevent blank screenshots/SSR issues. See `.agents/memory/framer-motion-ssr.md`.

## 📊 Current Feature Coverage

| Section          | Status    | Pages        |
|-----------------|-----------|--------------|
| Homepage         | ✅ Done   | Full marketing |
| Class 9–12       | ✅ Done   | All subjects + chapters |
| Engineering      | ✅ Done   | 8 branches × 8 semesters |
| Programming      | ✅ Done   | 13 languages × day plans |
| Core CS          | ✅ Done   | 8 tracks (DSA, OS, DBMS, CN, etc.) |
| Simulations      | ✅ Done   | 25+ interactive sims |
| Dashboard        | ✅ Done   | Full student dashboard |
| AI Tutor         | ✅ Done   | GPT-4o chat interface |
| Community        | ✅ Done   | Posts, Q&A, Groups |
| Live Battles     | ✅ Done   | Socket.IO 1v1 battles |
| Leaderboard      | ✅ Done   | Global + class rankings |
| Events           | ✅ Done   | Olympiads, hackathons |
| Admin            | ✅ Done   | Dashboard + Email broadcast |
| Blog             | ✅ Done   | Articles + individual posts |
| Career           | ✅ Done   | 6 career roadmaps |
| Settings         | ✅ Done   | Full settings page |
| Certificates     | ✅ Done   | Earned + in-progress |
| Bookmarks        | ✅ Done   | Saved content |
| Profile          | ✅ Done   | Public user profiles |
| Search           | ✅ Done   | Universal search |

## 🧪 Running Tests

```bash
npm test                  # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## 🚢 Deployment

The app is deployed on Replit. For production:

```bash
NEXT_OUTPUT=standalone npm run build
```

See `infrastructure/docker/` for Docker deployment.

## 📜 License

MIT © LearnVeda. See `LICENSE` file.
