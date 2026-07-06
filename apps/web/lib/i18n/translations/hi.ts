/**
 * @file lib/i18n/translations/hi.ts
 * @description Hindi translation dictionary for LearnVeda
 *
 * Hindi (हिन्दी) — Most widely spoken language in India.
 * This file covers all UI strings for the Hindi locale.
 *
 * Notes:
 *  - All strings use Unicode Hindi (Devanagari script)
 *  - Numbers are kept in Western Arabic numerals (standard for Indian EdTech)
 *  - Some technical terms (like "Level", "XP") are kept in English as they
 *    are universally understood in the Indian student context
 */

const hi: Record<string, string> = {

  /* ── Navigation ──────────────────────────────────────────────────────── */
  "nav.home":           "होम",                  // Homepage link
  "nav.learn":          "सीखें",               // Dropdown: Learn
  "nav.class9":         "कक्षा 9",             // CBSE Class 9 link
  "nav.class10":        "कक्षा 10",            // CBSE Class 10 link
  "nav.class11":        "कक्षा 11",            // CBSE Class 11 link
  "nav.class12":        "कक्षा 12",            // CBSE Class 12 link
  "nav.engineering":    "इंजीनियरिंग",         // Engineering tracks
  "nav.testCenter":     "टेस्ट सेंटर",         // Mock tests and PYQs
  "nav.platform":       "प्लेटफ़ॉर्म",         // Platform features
  "nav.dashboard":      "डैशबोर्ड",           // User dashboard
  "nav.liveBattles":    "लाइव बैटल",          // 1v1 battle arena
  "nav.leaderboard":    "लीडरबोर्ड",          // Leaderboard
  "nav.community":      "समुदाय",             // Community forum
  "nav.events":         "कार्यक्रम",          // Events & hackathons
  "nav.pricing":        "मूल्य निर्धारण",    // Pricing page
  "nav.company":        "कंपनी",              // Company dropdown
  "nav.about":          "हमारे बारे में",    // About us
  "nav.features":       "विशेषताएं",          // Features
  "nav.contact":        "संपर्क करें",       // Contact
  "nav.privacy":        "गोपनीयता नीति",    // Privacy policy
  "nav.terms":          "सेवा की शर्तें",   // Terms of service
  "nav.practice":       "अभ्यास",             // Practice MCQs
  "nav.explore":        "एक्सप्लोर करें",   // Explore all paths
  "nav.signin":         "साइन इन",           // Sign in button
  "nav.startFree":      "मुफ़्त शुरू करें", // CTA button

  /* ── Hero Section ────────────────────────────────────────────────────── */
  "hero.badge":         "AI-संचालित EdTech प्लेटफ़ॉर्म",     // Hero badge
  "hero.title1":        "स्मार्ट तरीके से सीखें,",           // Hero title line 1
  "hero.title2":        "ऊंचा रैंक पाएं",                    // Hero title line 2
  "hero.subtitle":      "भारत का सबसे संपूर्ण लर्निंग प्लेटफ़ॉर्म — CBSE कक्षा 9–12, इंजीनियरिंग, 13 प्रोग्रामिंग भाषाएं, AI ट्यूटर और बहुत कुछ।", // Subtitle
  "hero.cta.start":     "मुफ़्त में सीखना शुरू करें",        // Primary CTA
  "hero.cta.watch":     "डेमो देखें",                         // Secondary CTA
  "hero.stats.students":"छात्र",                               // Stats label
  "hero.stats.chapters":"अध्याय",                             // Stats label
  "hero.stats.languages":"भाषाएं",                            // Stats label
  "hero.stats.battles": "बैटल/दिन",                           // Stats label

  /* ── Pricing ─────────────────────────────────────────────────────────── */
  "pricing.free.label":    "मुफ़्त",                          // Free plan
  "pricing.pro.label":     "प्रो",                            // Pro plan
  "pricing.school.label":  "स्कूल",                          // School plan
  "pricing.monthly":       "मासिक",                           // Monthly
  "pricing.yearly":        "वार्षिक",                        // Yearly
  "pricing.save":          "{{percent}}% बचाएं",              // Savings
  "pricing.cta.start":     "मुफ़्त शुरू करें",               // Free CTA
  "pricing.cta.upgrade":   "प्रो में अपग्रेड करें",         // Pro CTA
  "pricing.cta.contact":   "सेल्स से संपर्क करें",          // School CTA

  /* ── Dashboard ───────────────────────────────────────────────────────── */
  "dashboard.welcome":     "वापस स्वागत है, {{name}}!",      // Greeting
  "dashboard.streak":      "दिन की स्ट्रीक",                 // Streak
  "dashboard.xp":          "XP अर्जित",                      // XP
  "dashboard.level":       "लेवल {{level}}",                  // Level
  "dashboard.progress":    "मेरी प्रगति",                   // Progress
  "dashboard.achievements":"उपलब्धियां",                     // Achievements
  "dashboard.analytics":   "विश्लेषण",                      // Analytics
  "dashboard.settings":    "सेटिंग्स",                      // Settings

  /* ── Learn ───────────────────────────────────────────────────────────── */
  "learn.startChapter":    "अध्याय शुरू करें",              // Start chapter
  "learn.continueChapter": "जारी रखें",                    // Continue
  "learn.completed":       "पूर्ण",                         // Completed
  "learn.chapters":        "{{count}} अध्याय",              // Chapter count
  "learn.duration":        "{{days}}-दिन की योजना",        // Plan duration
  "learn.difficulty":      "कठिनाई",                       // Difficulty
  "learn.beginner":        "शुरुआती",                      // Beginner
  "learn.intermediate":    "मध्यम",                        // Intermediate
  "learn.advanced":        "उन्नत",                        // Advanced

  /* ── Community ───────────────────────────────────────────────────────── */
  "community.posts":       "पोस्ट",                        // Posts tab
  "community.questions":   "प्रश्न",                       // Questions tab
  "community.groups":      "समूह",                         // Groups tab
  "community.chat":        "चैट",                          // Chat tab
  "community.askQuestion": "प्रश्न पूछें",                // Ask question
  "community.createPost":  "पोस्ट बनाएं",                 // Create post

  /* ── Battle ──────────────────────────────────────────────────────────── */
  "battle.findOpponent":   "प्रतिद्वंद्वी खोजें",         // Battle CTA
  "battle.searching":      "प्रतिद्वंद्वी ढूंढ रहे हैं...", // Searching
  "battle.cancel":         "रद्द करें",                   // Cancel
  "battle.rules":          "बैटल के नियम",                // Rules
  "battle.subject":        "विषय चुनें",                  // Subject selection
  "battle.win":            "आप जीत गए! 🏆",               // Win message
  "battle.lose":           "अगली बार बेहतर करें!",        // Lose message
  "battle.draw":           "बराबरी!",                     // Draw message

  /* ── General UI ──────────────────────────────────────────────────────── */
  "ui.loading":            "लोड हो रहा है...",            // Loading
  "ui.error":              "कुछ गड़बड़ हो गई",           // Error
  "ui.retry":              "दोबारा कोशिश करें",          // Retry
  "ui.goBack":             "वापस जाएं",                  // Back
  "ui.viewAll":            "सभी देखें",                  // View all
  "ui.readMore":           "और पढ़ें",                   // Read more
  "ui.close":              "बंद करें",                   // Close
  "ui.save":               "सहेजें",                     // Save
  "ui.cancel":             "रद्द करें",                  // Cancel
  "ui.submit":             "जमा करें",                   // Submit
  "ui.search":             "खोजें...",                   // Search
  "ui.noResults":          "कोई परिणाम नहीं मिला",     // No results
  "ui.comingSoon":         "जल्द आ रहा है",             // Coming soon
  "ui.new":                "नया",                        // New badge
  "ui.pro":                "Pro",                        // Pro badge (kept in English)
  "ui.free":               "मुफ़्त",                    // Free badge

  /* ── Language switcher ───────────────────────────────────────────────── */
  "lang.selectLanguage":   "भाषा चुनें",                // Language switcher
  "lang.translate":        "पृष्ठ अनुवाद करें",         // Translate page

  /* ── Footer ──────────────────────────────────────────────────────────── */
  "footer.tagline":        "स्मार्ट तरीके से सीखें। ऊंचा रैंक पाएं।", // Tagline
  "footer.copyright":      "© {{year}} LearnVeda. सर्वाधिकार सुरक्षित।", // Copyright
  "footer.madeWith":       "❤️ से बना, भारत में",      // Made in India
};

export default hi; // Export Hindi translation dictionary
