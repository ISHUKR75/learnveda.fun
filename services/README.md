# LearnVeda — Microservices

This directory contains backend microservices that support the LearnVeda platform.

## Service Architecture

```
services/
├── socket-server/        # Real-time Socket.IO server for battles and live events
├── content-service/      # NestJS REST API for serving NCERT chapter content
├── ai-service/           # FastAPI Python service wrapping OpenAI GPT-4o
├── compiler-service/     # Go service for secure code compilation (wraps Judge0)
├── notification-service/ # Push notification + email trigger service
└── README.md             # This file
```

## Service Communication

```
Browser ─→ Next.js (apps/web) ─→ /api/* routes (same process)
                                └─→ socket-server (WebSocket for battles)
                                └─→ content-service (chapter content)
                                └─→ ai-service     (AI tutor)
                                └─→ compiler-service (code execution)
```

All service-to-service communication is:
- Internal Docker network (no public exposure)
- Authenticated with a shared INTERNAL_API_SECRET header
- Rate limited at the Nginx gateway level

## Individual Service Documentation

| Service            | Tech     | README                                  | Port |
|-------------------|----------|------------------------------------------|------|
| socket-server      | Node.js  | `services/socket-server/README.md`       | 3001 |
| content-service    | NestJS   | `services/content-service/README.md`     | 3002 |
| ai-service         | FastAPI  | `services/ai-service/README.md`          | 3003 |
| compiler-service   | Go       | `services/compiler-service/README.md`    | 3004 |
| notification-svc   | Node.js  | `services/notification-service/README.md`| 3005 |

## Shared Libraries

The `packages/` monorepo directory contains:
- `packages/shared-types/` — TypeScript interfaces shared across services
- `packages/zod-schemas/`  — Zod validation schemas used by multiple services
- `packages/logger/`       — Winston logger with structured JSON output

## Development

To run a specific service locally:

```bash
cd services/socket-server
npm install
npm run dev
```

Or run everything via Docker Compose (see `infrastructure/docker/docker-compose.dev.yml`).

## Adding a New Service

1. Create directory: `services/my-service/`
2. Add `README.md` with API contract documentation
3. Add service to `infrastructure/docker/docker-compose.dev.yml`
4. Add Nginx upstream and location block in `infrastructure/nginx/nginx.conf`
5. Add environment variables to AWS Secrets Manager (prod) or `.env.local` (dev)
