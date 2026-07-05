/**
 * @file types/course.ts
 * @description Course, subject, chapter, and curriculum TypeScript types
 * Used across learning pages, progress tracking, and content APIs
 */

/* ─── Education Level ─────────────────────────────────────────────────────── */
export type EducationLevel =
  | "class-9"
  | "class-10"
  | "class-11"
  | "class-12"
  | "engineering"
  | "programming"
  | "core-cs";

/* ─── Difficulty Level ────────────────────────────────────────────────────── */
export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert";

/* ─── Subject ─────────────────────────────────────────────────────────────── */
/**
 * A subject (e.g. Mathematics, Physics, Python) within a curriculum level
 */
export interface Subject {
  id:           string;            // Unique subject ID (slug-based)
  name:         string;            // Display name (e.g. "Mathematics")
  slug:         string;            // URL slug (e.g. "mathematics")
  level:        EducationLevel;    // Which curriculum level this belongs to
  description:  string;           // Subject overview
  emoji:        string;            // Visual icon/emoji
  color:        string;            // Theme color (hex or Tailwind class)
  chapterCount: number;            // Total number of chapters
  difficulty:   DifficultyLevel;  // Overall difficulty rating
  prerequisites?: string[];        // Other subject IDs required first
  ncertAligned: boolean;           // Whether it follows NCERT curriculum
  tags:         string[];          // Searchable tags
}

/* ─── Chapter ─────────────────────────────────────────────────────────────── */
/**
 * A chapter within a subject — the main learning unit
 */
export interface Chapter {
  id:           string;          // Unique chapter ID
  subjectId:    string;          // Parent subject reference
  number:       number;          // Chapter number (for ordering)
  title:        string;          // Chapter title
  slug:         string;          // URL-safe slug
  description:  string;          // What this chapter covers
  topics:       string[];        // Key topics covered
  objectives:   string[];        // Learning objectives
  duration:     number;          // Estimated study time in minutes
  difficulty:   DifficultyLevel; // Chapter difficulty
  hasSimulation: boolean;        // Has an interactive simulation?
  hasVideo:      boolean;        // Has an embedded video?
  xpReward:     number;          // XP awarded on completion
  prerequisites?: string[];      // Chapter IDs that should be done first
  ncertRef?:    string;          // NCERT textbook reference (e.g. "9 Maths Ch.2")
}

/* ─── Quiz Question ───────────────────────────────────────────────────────── */
/**
 * A multiple-choice question for practice quizzes and test center
 */
export interface Question {
  id:            string;          // Unique question ID
  subjectId:     string;          // Subject reference
  chapterId?:    string;          // Optional chapter reference
  type:          "mcq" | "numerical" | "assertion-reason" | "case-study"; // Question type
  text:          string;          // Question text (supports LaTeX for math)
  options?:      string[];        // MCQ options (undefined for numerical)
  answer:        string | number; // Correct answer
  explanation:   string;          // Detailed explanation of the answer
  difficulty:    DifficultyLevel; // Question difficulty
  tags:          string[];        // Topic tags for filtering
  source?:       string;          // NCERT / JEE / NEET / GATE source
  year?:         number;          // Exam year (for PYQ questions)
  xpReward:      number;          // XP awarded for correct answer
  hintsAvailable: boolean;        // Whether hints are available
}

/* ─── Programming Language Track ─────────────────────────────────────────── */
/**
 * A structured N-day programming language learning track
 */
export interface ProgrammingTrack {
  id:           string;   // Track ID (e.g. "python")
  name:         string;   // Language name
  slug:         string;   // URL slug
  emoji:        string;   // Visual icon
  totalDays:    number;   // Total day count in the plan
  difficulty:   DifficultyLevel;
  description:  string;   // What you'll learn
  prerequisites?: string[]; // Recommended background knowledge
  useCases:     string[]; // What you can build with this language
  jobRoles:     string[]; // Career paths this opens up
  popularity:   string;   // Usage rank or description
  tags:         string[]; // Technology tags
}

/* ─── Engineering Branch ─────────────────────────────────────────────────── */
/**
 * An engineering discipline with semester-wise structure
 */
export interface EngineeringBranch {
  id:          string;   // Branch ID (e.g. "computer-science")
  name:        string;   // Full branch name
  shortName:   string;   // Abbreviation (CSE, ECE, ME, etc.)
  emoji:       string;   // Visual icon
  description: string;   // What this branch covers
  semesters:   number;   // Number of semesters (typically 8)
  subjects:    string[]; // Core subjects in this branch
  careerPaths: string[]; // Job roles and career options
}

/* ─── Simulation ─────────────────────────────────────────────────────────── */
/**
 * An interactive simulation for physics/chemistry/CS concepts
 */
export interface Simulation {
  id:          string;   // Unique simulation ID
  title:       string;   // Simulation name
  subject:     string;   // Subject area (physics, chemistry, etc.)
  category:    string;   // Specific category (mechanics, optics, etc.)
  chapterRef:  string;   // Related chapter reference
  grade:       string;   // Target grade level
  description: string;   // What this simulation demonstrates
  topics:      string[]; // Physics/chemistry concepts it covers
  href:        string;   // Route to the simulation page
  thumbnail?:  string;   // Preview image URL
  difficulty:  DifficultyLevel;
  type:        "physics" | "chemistry" | "biology" | "cs" | "math"; // Simulation type
}
