# LearnVeda — Architecture Overview

## System Design

LearnVeda uses a **modular monorepo** architecture built for horizontal scalability.

```
┌─────────────────────────────────────────────────────────────────┐
│                        USERS (Browser)                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS
┌─────────────────────────▼───────────────────────────────────────┐
│                  Vercel Edge Network (CDN)                      │
│             Static assets · ISR cache · Edge middleware          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│               Next.js App Router (apps/web)                      │
│                                                                   │
│  Server Components → SSR / SSG / ISR pages                       │
│  Client Components → Interactive UI (Monaco, Charts, Battles)     │
│  API Routes       → REST endpoints + WebSocket (future)           │
│  Middleware       → Auth check via Clerk + rate limiting          │
└──────┬──────────────────┬──────────────────────┬────────────────┘
       │                  │                      │
┌──────▼──────┐  ┌────────▼───────┐   ┌─────────▼──────────────┐
│  MongoDB    │  │    Redis       │   │     Clerk Auth          │
│  (Primary)  │  │  (Cache+Rate)  │   │  (JWT + JWKS)           │
└─────────────┘  └────────────────┘   └────────────────────────┘
```

## Key Architecture Decisions

### 1. App Router (Next.js 15)
- Server Components by default → smaller JS bundles
- Client Components only where interactivity is needed
- Route Groups for layout isolation: `(auth)`, `(marketing)`, `(platform)`, `(legal)`

### 2. Feature-First Folder Structure
```
features/
├── dashboard/components/  # Dashboard-specific components
├── community/components/  # Community-specific components
├── compiler/components/   # Compiler-specific components
└── ...                    # One folder per feature
```

### 3. Graceful Degradation
All external services (MongoDB, Redis, OpenAI, Clerk) have fallbacks:
- No MongoDB → static/demo data
- No Redis → in-memory cache
- No OpenAI → demo AI responses
- No Clerk → demo mode (unauthenticated)

### 4. Caching Strategy
| Data Type | Cache Layer | TTL |
|-----------|-------------|-----|
| Leaderboard | Redis | 2 min |
| User profile | Redis | 5 min |
| Chapter content | ISR | 15 min |
| Platform stats | ISR | 30 min |
| Static pages | ISR | 1 hour |

## Security Architecture

1. **Authentication**: Clerk handles sign-in/sign-up (Google, email OTP)
2. **Authorization**: Middleware checks Clerk JWT on protected routes
3. **Input validation**: Zod schemas on all API endpoints
4. **Rate limiting**: Redis-based IP rate limiting (100 req/min)
5. **Webhook security**: Svix signature verification (Clerk webhooks)

## Database Schema

See [MongoDB Models](../../apps/web/lib/mongodb/models/) for full schema definitions.

Core collections:
- `users` — User profiles, XP, streak, plan
- `progress` — Chapter completion tracking
- `notifications` — In-app notifications (30-day TTL)
- `community_posts` — Forum posts with text search index
- `quizzes` — MCQ sets with embedded questions
- `battles` — 1v1 battle records with Elo tracking
- `achievements` — Per-user badge records
