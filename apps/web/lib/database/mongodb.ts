/**
 * @file lib/database/mongodb.ts
 * @description MongoDB connection helper for LearnVeda
 * @purpose Manages a single MongoClient with connection pooling across API routes
 * @used-by All API routes that need database access
 *
 * Connection strategy:
 *  - In development: reuses connection across hot reloads (via global)
 *  - In production: creates a fresh connection pool per serverless instance
 *  - No MONGODB_URI → returns a mock DB object (demo mode) to avoid crashes
 *
 * Collections used by LearnVeda:
 *  - users          — User profiles, XP, level, preferences
 *  - sessions       — Active learning sessions
 *  - quiz_results   — Quiz/test attempt records
 *  - battles        — Live battle records
 *  - email_campaigns— Email broadcast history
 *  - events         — Platform events
 *  - community      — Posts, comments, reactions
 *  - simulations    — Simulation progress and analytics
 */

import { MongoClient, Db } from "mongodb"; // MongoDB Node.js driver

/* ─── Type for the global singleton (development hot-reload safety) ───────── */
// Next.js hot reloads in dev mode — we store the client in global to reuse
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;   // Singleton MongoClient
}

/* ─── MongoDB client holder ──────────────────────────────────────────────── */
let client: MongoClient | undefined;            // Current MongoClient instance

/* ─── connectToDatabase ──────────────────────────────────────────────────── */
/**
 * Returns a connected MongoDB Db instance.
 * Reuses existing connection in development to avoid connection limits.
 *
 * @param dbName - Optional database name (defaults to MONGODB_DB env or "learnveda")
 * @returns Db instance for database operations
 *
 * @example
 * const db = await connectToDatabase();
 * const users = await db.collection("users").find({}).toArray();
 */
export default async function connectToDatabase(
  dbName?: string
): Promise<Db> {
  const uri    = process.env.MONGODB_URI;       // Connection string from env
  const name   = dbName ?? (process.env.MONGODB_DB ?? "learnveda"); // DB name

  /* ── Demo mode: no connection string configured ────────────────── */
  // Returns a proxy that gracefully handles all DB calls
  if (!uri) {
    console.warn(
      "[mongodb] MONGODB_URI not set — running in demo mode. " +
      "Database operations will return empty results."
    );
    // Return a minimal mock Db that doesn't crash callers
    return createMockDb() as unknown as Db;
  }

  /* ── Reuse existing client in development ──────────────────────── */
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri, {
        maxPoolSize:     10,                    // Max 10 connections in dev
        serverSelectionTimeoutMS: 5000,         // 5s timeout for server selection
      });
      await global._mongoClient.connect();     // Connect (reused across hot reloads)
    }
    return global._mongoClient.db(name);       // Return Db instance
  }

  /* ── Production: create/reuse client per serverless instance ─────── */
  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize:              50,             // Production can handle more connections
      serverSelectionTimeoutMS: 10000,          // 10s timeout
      socketTimeoutMS:          45000,          // 45s socket timeout
    });
    await client.connect();                    // Connect to MongoDB Atlas
  }

  return client.db(name);                      // Return Db instance
}

/* ─── Mock DB for demo mode ──────────────────────────────────────────────── */
/**
 * Creates a minimal mock MongoDB Db object for demo mode.
 * All operations return empty results — prevents crashes when DB is not configured.
 */
function createMockDb() {
  // Mock collection that returns empty results for all operations
  const mockCollection = {
    find:      () => ({ toArray: async () => [], sort: () => ({ toArray: async () => [], limit: () => ({ toArray: async () => [] }) }), limit: () => ({ toArray: async () => [] }) }),
    findOne:   async () => null,
    insertOne: async () => ({ insertedId: { toString: () => `mock-${Date.now()}` } }),
    insertMany: async () => ({ insertedIds: {} }),
    updateOne:  async () => ({ modifiedCount: 0 }),
    deleteOne:  async () => ({ deletedCount: 0 }),
    countDocuments: async () => 0,
    aggregate:  () => ({ toArray: async () => [] }),
  };

  return {
    collection: (_name: string) => mockCollection,
  };
}
