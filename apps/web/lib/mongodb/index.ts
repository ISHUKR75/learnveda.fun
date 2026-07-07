/**
 * @file lib/mongodb/index.ts
 * @description MongoDB connection singleton for LearnVeda
 *
 * Uses a module-level cached connection to avoid creating multiple connections
 * in Next.js hot-reload environments. In production this is a true singleton.
 *
 * Usage:
 *   import { connectDB } from "@/lib/mongodb";
 *   await connectDB();
 *   // Now use mongoose models normally
 *
 * The MONGODB_URI env var must be set. The connection is lazy — it only
 * opens on first call and is reused thereafter.
 */

import mongoose from "mongoose"; // ODM for MongoDB

/* ─── Connection URI ──────────────────────────────────────────────────────── */
// Pull the URI from environment variables — never hard-code credentials
const MONGODB_URI = process.env.MONGODB_URI as string;

/* ─── Module-level connection cache ──────────────────────────────────────── */
// This object persists across hot reloads in Next.js development mode.
// In production it simply holds the single active connection.
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

declare global {
  // Extend the Node global so TypeScript is happy with our cache property
  // eslint-disable-next-line no-var
  var __mongooseCache: MongooseCache | undefined;
}

// Reuse the global cache if it exists (development HMR), otherwise create one
const cache: MongooseCache = global.__mongooseCache ?? { conn: null, promise: null };
global.__mongooseCache = cache; // Attach to global so HMR reloads find it

/* ─── connectDB ───────────────────────────────────────────────────────────── */
/**
 * Opens (or returns the existing) MongoDB connection.
 *
 * @returns A resolved mongoose instance after the connection is ready.
 * @throws  If MONGODB_URI is not set or the connection fails after retries.
 */
export async function connectDB(): Promise<typeof mongoose> {
  // Return the already-open connection immediately to avoid round-trips
  if (cache.conn) return cache.conn;

  // Guard: connection URI must be provided
  if (!MONGODB_URI) {
    throw new Error(
      "[LearnVeda] MONGODB_URI environment variable is not set.\n" +
        "Add it to your .env.local file before using any database operations."
    );
  }

  // Start the connection only once — subsequent callers await the same promise
  if (!cache.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,      // Fail immediately if not connected — no silent queuing
      maxPoolSize:    10,         // Keep up to 10 simultaneous connections in the pool
      serverSelectionTimeoutMS: 5_000, // Fail fast if MongoDB is unreachable
      socketTimeoutMS:         45_000, // Drop idle sockets after 45 s
    };

    // Disable deprecation noise for lean() strict mode
    mongoose.set("strictQuery", true);

    // Cache the connection promise so parallel calls share it
    cache.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log("[LearnVeda] MongoDB connected successfully ✓");
      return m;
    });
  }

  // Resolve and store the open connection
  cache.conn = await cache.promise;
  return cache.conn;
}

/* ─── disconnectDB ────────────────────────────────────────────────────────── */
/**
 * Gracefully closes the MongoDB connection.
 * Call this in integration tests or on process exit in scripts.
 */
export async function disconnectDB(): Promise<void> {
  if (cache.conn) {
    await mongoose.disconnect(); // Close all pool connections cleanly
    cache.conn    = null;        // Clear the cached instance
    cache.promise = null;        // Allow reconnect on next connectDB() call
    console.log("[LearnVeda] MongoDB disconnected.");
  }
}

/* ─── Default export ─────────────────────────────────────────────────────── */
export default connectDB;

/* ─── Compatibility: connectToDatabase ──────────────────────────────────── */
/**
 * Named re-export for API routes that use:
 *   `const { connectToDatabase } = await import("@/lib/mongodb")`
 *   `const { db } = await connectToDatabase()`
 *
 * Wraps `lib/database/mongodb` (raw MongoClient driver) in the `{ db }` shape
 * that those callers expect. Uses a dynamic import to avoid circular references.
 *
 * @param dbName - Optional database name (defaults to MONGODB_DB env or "learnveda")
 * @returns { db: Db } — raw MongoDB Db instance for collection-level operations
 */
export async function connectToDatabase(dbName?: string): Promise<{ db: import("mongodb").Db }> {
  // Dynamic import avoids circular deps between the two connection modules
  const { default: rawConnect } = await import("../database/mongodb");
  const db = await rawConnect(dbName);
  return { db };
}
