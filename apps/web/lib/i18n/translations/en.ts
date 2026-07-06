/**
 * @file lib/i18n/translations/en.ts
 * @description English translation dictionary — the default locale for LearnVeda
 *
 * Key naming convention:
 *  - <section>.<subsection>.<key>
 *  - Examples: "nav.home", "hero.title", "pricing.pro.label"
 *
 * Variable interpolation uses {{varName}} syntax:
 *  - "hello": "Hello, {{name}}!" → t("hello", "en", { name: "Arjun" }) = "Hello, Arjun!"
 */

const en: Record<string, string> = {

  /* ── Navigation ──────────────────────────────────────────────────────── */
  "nav.home":           "Home",             // Homepage link
  "nav.learn":          "Learn",            // Dropdown: Learn
  "nav.class9":         "Class 9",          // CBSE Class 9 link
  "nav.class10":        "Class 10",         // CBSE Class 10 link
  "nav.class11":        "Class 11",         // CBSE Class 11 link
  "nav.class12":        "Class 12",         // CBSE Class 12 link
  "nav.engineering":    "Engineering",      // Engineering tracks link
  "nav.testCenter":     "Test Center",      // Mock tests and PYQs
  "nav.platform":       "Platform",         // Dropdown: Platform features
  "nav.dashboard":      "Dashboard",        // User dashboard
  "nav.liveBattles":    "Live Battles",     // 1v1 battle arena
  "nav.leaderboard":    "Leaderboard",      // Global leaderboard
  "nav.community":      "Community",        // Community forum
  "nav.events":         "Events",           // Events & hackathons
  "nav.pricing":        "Pricing",          // Pricing page
  "nav.company":        "Company",          // Dropdown: Company
  "nav.about":          "About",            // About us page
  "nav.features":       "Features",         // Features page
  "nav.contact":        "Contact",          // Contact page
  "nav.privacy":        "Privacy Policy",   // Privacy policy
  "nav.terms":          "Terms of Service", // Terms of service
  "nav.practice":       "Practice",         // Practice MCQs
  "nav.explore":        "Explore",          // Explore all paths
  "nav.signin":         "Sign In",          // Sign in button
  "nav.startFree":      "Start Free",       // CTA button

  /* ── Hero Section ────────────────────────────────────────────────────── */
  "hero.badge":         "AI-Powered EdTech Platform",    // Hero badge text
  "hero.title1":        "Learn Smarter,",                // Hero title line 1
  "hero.title2":        "Rank Higher",                   // Hero title line 2
  "hero.subtitle":      "India's most complete learning platform — CBSE Class 9–12, Engineering, 13 Programming Languages, AI Tutor, Live Battles & more.",  // Hero subtitle
  "hero.cta.start":     "Start Learning Free",           // Primary CTA button
  "hero.cta.watch":     "Watch Demo",                    // Secondary CTA button
  "hero.stats.students":"Students",                      // Stats label
  "hero.stats.chapters":"Chapters",                      // Stats label
  "hero.stats.languages":"Languages",                    // Stats label
  "hero.stats.battles": "Battles/day",                   // Stats label

  /* ── Features Section ────────────────────────────────────────────────── */
  "features.badge":     "Why LearnVeda?",                // Section badge
  "features.title":     "Everything You Need to Succeed",// Section title
  "features.subtitle":  "From Class 9 to Graduation — one platform for your entire academic journey.", // Section subtitle

  /* ── Pricing ─────────────────────────────────────────────────────────── */
  "pricing.free.label":     "Free",                      // Free plan name
  "pricing.pro.label":      "Pro",                       // Pro plan name
  "pricing.school.label":   "School",                    // School plan name
  "pricing.monthly":        "Monthly",                   // Monthly billing
  "pricing.yearly":         "Yearly",                    // Yearly billing
  "pricing.save":           "Save {{percent}}%",         // Savings badge
  "pricing.cta.start":      "Start Free",                // Free plan CTA
  "pricing.cta.upgrade":    "Upgrade to Pro",            // Pro plan CTA
  "pricing.cta.contact":    "Contact Sales",             // School plan CTA

  /* ── Dashboard ───────────────────────────────────────────────────────── */
  "dashboard.welcome":      "Welcome back, {{name}}!",   // Dashboard greeting
  "dashboard.streak":       "Day Streak",                // Streak label
  "dashboard.xp":           "XP Earned",                 // XP label
  "dashboard.level":        "Level {{level}}",           // Level display
  "dashboard.progress":     "My Progress",               // Progress section
  "dashboard.achievements": "Achievements",              // Achievements section
  "dashboard.analytics":    "Analytics",                 // Analytics section
  "dashboard.settings":     "Settings",                  // Settings section

  /* ── Learn ───────────────────────────────────────────────────────────── */
  "learn.startChapter":     "Start Chapter",             // Chapter CTA
  "learn.continueChapter":  "Continue",                  // Continue chapter
  "learn.completed":        "Completed",                 // Completion badge
  "learn.chapters":         "{{count}} Chapters",        // Chapter count
  "learn.duration":         "{{days}}-Day Plan",         // Plan duration
  "learn.difficulty":       "Difficulty",                // Difficulty label
  "learn.beginner":         "Beginner",                  // Difficulty level
  "learn.intermediate":     "Intermediate",              // Difficulty level
  "learn.advanced":         "Advanced",                  // Difficulty level

  /* ── Community ───────────────────────────────────────────────────────── */
  "community.posts":        "Posts",                     // Posts tab
  "community.questions":    "Questions",                 // Questions tab
  "community.groups":       "Groups",                    // Groups tab
  "community.chat":         "Chat",                      // Chat tab
  "community.askQuestion":  "Ask a Question",            // Ask question CTA
  "community.createPost":   "Create Post",               // Create post CTA

  /* ── Battle ──────────────────────────────────────────────────────────── */
  "battle.findOpponent":    "Find Opponent",             // Battle CTA
  "battle.searching":       "Finding Opponent...",       // Searching state
  "battle.cancel":          "Cancel",                    // Cancel search
  "battle.rules":           "Battle Rules",              // Rules section
  "battle.subject":         "Choose Subject",            // Subject selection
  "battle.win":             "You Won! 🏆",               // Win message
  "battle.lose":            "Better luck next time!",    // Lose message
  "battle.draw":            "It's a Draw!",              // Draw message

  /* ── General UI ──────────────────────────────────────────────────────── */
  "ui.loading":             "Loading...",                // Loading state
  "ui.error":               "Something went wrong",      // Error state
  "ui.retry":               "Try Again",                 // Retry button
  "ui.goBack":              "Go Back",                   // Back button
  "ui.viewAll":             "View All",                  // View all link
  "ui.readMore":            "Read More",                 // Read more link
  "ui.close":               "Close",                     // Close button
  "ui.save":                "Save",                      // Save button
  "ui.cancel":              "Cancel",                    // Cancel button
  "ui.submit":              "Submit",                    // Submit button
  "ui.search":              "Search...",                 // Search placeholder
  "ui.noResults":           "No results found",          // Empty state
  "ui.comingSoon":          "Coming Soon",               // Coming soon badge
  "ui.new":                 "New",                       // New badge
  "ui.pro":                 "Pro",                       // Pro badge
  "ui.free":                "Free",                      // Free badge

  /* ── Language switcher ───────────────────────────────────────────────── */
  "lang.selectLanguage":    "Select Language",           // Language switcher label
  "lang.translate":         "Translate Page",            // Translate button

  /* ── Footer ──────────────────────────────────────────────────────────── */
  "footer.tagline":         "Learn Smarter. Rank Higher.",  // Footer tagline
  "footer.copyright":       "© {{year}} LearnVeda. All rights reserved.", // Copyright
  "footer.madeWith":        "Made with ❤️ in India",    // Made in India badge
};

export default en; // Export the English translation dictionary
