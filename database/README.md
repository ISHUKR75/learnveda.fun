# LearnVeda — Database

MongoDB schemas, seed data, and migration scripts for the LearnVeda platform.

## Directory Structure

```
database/
├── schemas/              # Mongoose schema definitions (TypeScript)
│   ├── user.schema.ts    # User profile, progress, settings, badges
│   ├── chapter.schema.ts # NCERT chapter content + practice questions
│   ├── battle.schema.ts  # Live 1v1 battle match records
│   ├── event.schema.ts   # Olympiads, hackathons, live contests
│   ├── post.schema.ts    # Community posts and Q&A
│   └── certificate.schema.ts # Earned certificates
│
├── seed/                 # Seed scripts to populate MongoDB
│   ├── class-9-mathematics.ts   # Class 9 Maths chapters
│   ├── class-9-science.ts       # Class 9 Science chapters
│   ├── class-10-mathematics.ts  # Class 10 Maths chapters
│   ├── class-10-science.ts      # Class 10 Science chapters
│   ├── class-11-mathematics.ts  # Class 11 Maths chapters
│   ├── class-12-mathematics.ts  # Class 12 Maths chapters
│   ├── dsa-questions.ts         # DSA practice questions
│   └── run.ts                   # Seed runner CLI
│
├── migrations/           # Schema migration scripts (run before deploys)
│   └── README.md
│
└── README.md             # This file
```

## Collections

| Collection     | Schema File             | Description                              |
|---------------|------------------------|------------------------------------------|
| `users`        | `user.schema.ts`       | All user accounts and progress           |
| `chapters`     | `chapter.schema.ts`    | NCERT chapter content for all classes    |
| `battles`      | `battle.schema.ts`     | Live battle match records                |
| `events`       | `event.schema.ts`      | Academic events (Olympiads, hackathons)  |
| `posts`        | `post.schema.ts`       | Community posts and Q&A                  |
| `certificates` | `certificate.schema.ts`| Certificate issuance records             |

## Indexes

Critical indexes for performance:

```javascript
// Users — leaderboard queries
db.users.createIndex({ "progress.xp": -1 })
db.users.createIndex({ "progress.streak": -1 })
db.users.createIndex({ country: 1, "progress.xp": -1 })

// Chapters — content lookup
db.chapters.createIndex({ classLevel: 1, subject: 1, chapterId: 1 }, { unique: true })
db.chapters.createIndex({ title: "text", objective: "text", summary: "text" })

// Battles — history queries
db.battles.createIndex({ player1Id: 1, createdAt: -1 })
db.battles.createIndex({ player2Id: 1, createdAt: -1 })
db.battles.createIndex({ status: 1 })
```

## Running Seeds

```bash
# From monorepo root
cd apps/web
npm run db:seed -- class-9-mathematics   # Seed specific subject
npm run db:seed -- all                    # Seed all (takes ~5 minutes)
```

## Connecting

```bash
# Development (local MongoDB)
MONGODB_URI=mongodb://root:devpassword@localhost:27017/learnveda?authSource=admin

# Production (Atlas or DocumentDB)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/learnveda
```

## Schema Conventions

1. **Timestamps**: All schemas use `{ timestamps: true }` — auto-adds `createdAt` and `updatedAt`
2. **Primary key**: Always use Clerk user ID as `clerkId` (not MongoDB `_id`) for user references
3. **Compound IDs**: Chapter IDs follow `{classLevel}-{subject}-{chapterId}` format
4. **Soft deletes**: Use `isActive: false` rather than deleting documents (preserves analytics)
5. **De-normalization**: Battle records de-normalize player names for fast leaderboard queries
