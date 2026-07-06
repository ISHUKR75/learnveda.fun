/**
 * docker/mongo-init.js
 * MongoDB initialization script — runs once when the container starts for the first time
 *
 * Creates the learnveda database and required indexes for:
 *  - users collection (indexed on clerkId for fast auth lookups)
 *  - community_posts collection (text search index for full-text search)
 *  - notifications collection (TTL index for automatic 30-day expiry)
 *  - battles collection (compound index for fast leaderboard queries)
 *  - progress collection (compound index for user+chapter lookups)
 *
 * Run context: Docker init script (docker-entrypoint-initdb.d)
 * Runs as admin user (MONGO_INITDB_ROOT_USERNAME from env)
 */

// Switch to the learnveda database
db = db.getSiblingDB("learnveda"); // eslint-disable-line no-undef

// ─── Create users collection with indexes ─────────────────────────────────
db.createCollection("users");
db.users.createIndex({ clerkId: 1 }, { unique: true, name: "clerkId_unique" });  // Clerk user ID — must be unique
db.users.createIndex({ email:   1 }, { unique: true, name: "email_unique"   });  // Email — must be unique
db.users.createIndex({ xp:      -1 },               { name: "xp_desc"        }); // For leaderboard queries
db.users.createIndex({ plan:    1 },                { name: "plan_idx"        }); // For filtering by plan
db.users.createIndex({ createdAt: -1 },             { name: "created_desc"   }); // For sorting by join date

// ─── Create progress collection with compound index ───────────────────────
db.createCollection("progress");
db.progress.createIndex(
  { userId: 1, chapterId: 1 },
  { unique: true, name: "user_chapter_unique" } // One progress record per user+chapter
);
db.progress.createIndex({ userId: 1, subject: 1 }, { name: "user_subject_idx" }); // Subject progress queries

// ─── Create notifications collection with TTL index ───────────────────────
db.createCollection("notifications");
db.notifications.createIndex({ userId: 1 },                { name: "user_idx"    }); // Fetch user notifications
db.notifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000,      // TTL: 30 days in seconds
                                                 name: "ttl_30d" });

// ─── Create community_posts collection with text search index ─────────────
db.createCollection("community_posts");
db.community_posts.createIndex(
  { title: "text", body: "text", tags: "text" },
  { name: "full_text_search", weights: { title: 10, tags: 5, body: 1 } } // Title matches are weighted higher
);
db.community_posts.createIndex({ authorId: 1 }, { name: "author_idx"    }); // User's posts
db.community_posts.createIndex({ subject: 1 },  { name: "subject_idx"   }); // Filter by subject
db.community_posts.createIndex({ upvotes: -1 }, { name: "upvotes_desc"  }); // Sort by popularity
db.community_posts.createIndex({ createdAt: -1 }, { name: "created_desc" }); // Sort by newest

// ─── Create quizzes collection with indexes ────────────────────────────────
db.createCollection("quizzes");
db.quizzes.createIndex({ subject: 1, class: 1 }, { name: "subject_class_idx" }); // Filter quizzes by class+subject
db.quizzes.createIndex({ difficulty: 1 },         { name: "difficulty_idx"   }); // Filter by difficulty

// ─── Create battles collection with indexes ───────────────────────────────
db.createCollection("battles");
db.battles.createIndex({ "player1.userId": 1 }, { name: "p1_idx" }); // Player 1 battle history
db.battles.createIndex({ "player2.userId": 1 }, { name: "p2_idx" }); // Player 2 battle history
db.battles.createIndex({ subject: 1, status: 1 }, { name: "subject_status_idx" }); // Open battles by subject
db.battles.createIndex({ startedAt: -1 },          { name: "started_desc"       }); // Recent battles

// ─── Create achievements collection ───────────────────────────────────────
db.createCollection("achievements");
db.achievements.createIndex({ userId: 1 },              { name: "user_idx"  }); // User's achievements
db.achievements.createIndex({ userId: 1, badgeId: 1 }, { unique: true,       // One badge per user
                                                          name: "user_badge_unique" });

print("✅ LearnVeda MongoDB initialization complete");
print("   Collections created: users, progress, notifications, community_posts, quizzes, battles, achievements");
print("   Indexes created for all collections");
