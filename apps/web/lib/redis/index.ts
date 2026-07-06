/**
 * @file lib/redis/index.ts
 * @description Redis client singleton for LearnVeda
 *
 * Used for:
 *  - API response caching (leaderboard, stats, course data)
 *  - Session data (rate-limiting counters)
 *  - Real-time pub/sub (future: Socket.IO adapter)
 *
 * In demo mode (no REDIS_URL): all cache operations are no-ops —
 * the app degrades gracefully without Redis.
 */

/* ─── Types ──────────────────────────────────────────────────────────────── */
// Simple in-memory cache for demo/test mode when Redis is unavailable
type MemoryCache = Map<string, { value: string; expiresAt: number | null }>;

/* ─── TTL Constants (seconds) ────────────────────────────────────────────── */
export const CACHE_TTL = {
  STATS:       5 * 60,        // 5 min  — platform-wide stats (student count, etc.)
  LEADERBOARD: 2 * 60,        // 2 min  — leaderboard rankings
  USER_PROFILE: 10 * 60,      // 10 min — individual user profiles
  COURSE_DATA: 30 * 60,       // 30 min — chapter/subject metadata
  SEARCH:      3 * 60,        // 3 min  — search results
  SESSION:     7 * 24 * 3600, // 7 days — session tokens
} as const;

/* ─── Cache Key Builders ─────────────────────────────────────────────────── */
// Centralised key builders prevent typos and make invalidation predictable
export const cacheKey = {
  stats:       ()               => "learnveda:stats:global",
  leaderboard: (type: string)   => `learnveda:leaderboard:${type}`,
  user:        (id: string)     => `learnveda:user:${id}`,
  search:      (q: string)      => `learnveda:search:${encodeURIComponent(q)}`,
  chapter:     (slug: string)   => `learnveda:chapter:${slug}`,
  rateLimit:   (ip: string, route: string) => `learnveda:rl:${route}:${ip}`,
};

/* ─── In-Memory Fallback Cache ───────────────────────────────────────────── */
// Used when REDIS_URL is not set — prevents crashes in dev/demo mode
class MemoryCacheClient {
  private store: MemoryCache = new Map(); // Internal key-value store

  /** Store a value with optional TTL (seconds) */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.store.set(key, { value, expiresAt }); // Save to in-memory map
  }

  /** Retrieve a value — returns null if missing or expired */
  async get(key: string): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null; // Cache miss
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.store.delete(key); // Evict expired entry
      return null;            // Treat as cache miss
    }
    return entry.value;       // Cache hit
  }

  /** Delete a key */
  async del(key: string): Promise<void> {
    this.store.delete(key); // Remove from map
  }

  /** Check if a key exists */
  async exists(key: string): Promise<boolean> {
    const val = await this.get(key); // Reuse get() so expiry check is applied
    return val !== null;
  }

  /** Increment a numeric value (used for rate limiting) */
  async incr(key: string): Promise<number> {
    const current = await this.get(key);   // Get current value
    const next = (parseInt(current ?? "0") + 1).toString(); // Increment
    await this.set(key, next);             // Save back
    return parseInt(next);                 // Return new value
  }

  /** Set TTL on an existing key (no-op in memory mode if key doesn't exist) */
  async expire(key: string, ttlSeconds: number): Promise<void> {
    const entry = this.store.get(key);
    if (entry) {
      entry.expiresAt = Date.now() + ttlSeconds * 1000; // Update expiry
    }
  }
}

/* ─── Redis Client Factory ───────────────────────────────────────────────── */
// Returns a real Redis client if the URL is configured, or the memory fallback
function createCacheClient() {
  if (process.env.REDIS_URL) {
    // Real Redis — dynamically required so the package is optional
    try {
      // We use a simple interface, not the full ioredis type here
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Redis = require("ioredis");
      const client = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest:  3,    // Fail fast — don't block requests waiting for Redis
        connectTimeout:        3000, // 3 second connection timeout
        enableReadyCheck:      true, // Only mark as ready when PING succeeds
        lazyConnect:           true, // Don't connect until first command
      });
      client.on("error", (err: Error) => {
        // Log but don't crash — Redis failures should degrade gracefully
        console.error("[LearnVeda Redis] Connection error:", err.message);
      });
      return client;
    } catch {
      console.warn("[LearnVeda Redis] ioredis not installed — using in-memory cache");
      return new MemoryCacheClient(); // Fall back gracefully
    }
  }
  // No Redis URL configured — use the in-memory fallback
  console.info("[LearnVeda] REDIS_URL not set — using in-memory cache (demo mode)");
  return new MemoryCacheClient();
}

/* ─── Singleton Export ───────────────────────────────────────────────────── */
// Module-level singleton — one client instance for the lifetime of the process
declare global {
  // eslint-disable-next-line no-var
  var __redisClient: ReturnType<typeof createCacheClient> | undefined;
}

export const redis = global.__redisClient ?? createCacheClient();
if (process.env.NODE_ENV !== "production") {
  global.__redisClient = redis; // Persist across hot-reloads in development
}

/* ─── Helper Utilities ───────────────────────────────────────────────────── */

/**
 * Get a cached JSON value, or call the factory function to populate it.
 * This is the primary caching helper used in API routes.
 *
 * @param key     - Cache key (use cacheKey.* builders)
 * @param factory - Async function to compute the value on cache miss
 * @param ttl     - Time-to-live in seconds (use CACHE_TTL.* constants)
 */
export async function getCachedOr<T>(
  key: string,
  factory: () => Promise<T>,
  ttl: number
): Promise<T> {
  try {
    const cached = await redis.get(key); // Check cache first
    if (cached) return JSON.parse(cached) as T; // Return cached value
  } catch {
    // Cache read failure — proceed to fresh fetch
  }

  const fresh = await factory(); // Compute the fresh value

  try {
    await redis.set(key, JSON.stringify(fresh), ttl); // Store in cache
  } catch {
    // Cache write failure — return fresh value anyway (graceful degradation)
  }

  return fresh;
}

export default redis;
