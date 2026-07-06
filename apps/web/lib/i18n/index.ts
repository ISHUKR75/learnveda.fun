/**
 * @file lib/i18n/index.ts
 * @description Internationalization (i18n) system for LearnVeda
 *
 * Supports 10 Indian languages + English.
 * Every page on LearnVeda can be translated using this module.
 *
 * Supported languages:
 *  - en    (English)     — default
 *  - hi    (Hindi)
 *  - bn    (Bengali)
 *  - te    (Telugu)
 *  - mr    (Marathi)
 *  - ta    (Tamil)
 *  - gu    (Gujarati)
 *  - kn    (Kannada)
 *  - ml    (Malayalam)
 *  - pa    (Punjabi)
 *  - or    (Odia)
 *
 * Architecture:
 *  - Translation files live in `lib/i18n/translations/<lang>.ts`
 *  - This index exports: `useTranslation`, `t()`, `getTranslations`, `SUPPORTED_LOCALES`
 *  - Locale is stored in a cookie (`learnveda-locale`) and as a URL prefix (future)
 *  - Gracefully falls back to English if a key is missing in a translation
 *
 * Usage:
 *  import { t } from "@/lib/i18n";
 *  const label = t("nav.home", locale); // "Home" or "होम"
 */

/* ─── Supported locales ──────────────────────────────────────────────────── */

/** Locale code type — all supported language codes */
export type Locale = "en" | "hi" | "bn" | "te" | "mr" | "ta" | "gu" | "kn" | "ml" | "pa" | "or";

/**
 * Metadata for each supported locale.
 * Used to render the language switcher UI.
 */
export interface LocaleInfo {
  /** BCP-47 locale code */
  code:        Locale;
  /** Display name in the native language */
  nativeName:  string;
  /** Display name in English */
  englishName: string;
  /** Emoji flag */
  flag:        string;
  /** Text direction */
  dir:         "ltr" | "rtl";
}

/** All supported locales with metadata */
export const SUPPORTED_LOCALES: LocaleInfo[] = [
  { code: "en", nativeName: "English",    englishName: "English",    flag: "🇬🇧", dir: "ltr" },
  { code: "hi", nativeName: "हिन्दी",      englishName: "Hindi",      flag: "🇮🇳", dir: "ltr" },
  { code: "bn", nativeName: "বাংলা",       englishName: "Bengali",    flag: "🇧🇩", dir: "ltr" },
  { code: "te", nativeName: "తెలుగు",     englishName: "Telugu",     flag: "🇮🇳", dir: "ltr" },
  { code: "mr", nativeName: "मराठी",      englishName: "Marathi",    flag: "🇮🇳", dir: "ltr" },
  { code: "ta", nativeName: "தமிழ்",      englishName: "Tamil",      flag: "🇮🇳", dir: "ltr" },
  { code: "gu", nativeName: "ગુજરાતી",   englishName: "Gujarati",   flag: "🇮🇳", dir: "ltr" },
  { code: "kn", nativeName: "ಕನ್ನಡ",     englishName: "Kannada",    flag: "🇮🇳", dir: "ltr" },
  { code: "ml", nativeName: "മലയാളം",   englishName: "Malayalam",  flag: "🇮🇳", dir: "ltr" },
  { code: "pa", nativeName: "ਪੰਜਾਬੀ",    englishName: "Punjabi",    flag: "🇮🇳", dir: "ltr" },
  { code: "or", nativeName: "ଓଡ଼ିଆ",     englishName: "Odia",       flag: "🇮🇳", dir: "ltr" },
] as const;

/** Default locale for the application */
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie name for persisting locale preference */
export const LOCALE_COOKIE = "learnveda-locale";

/* ─── Translation dictionary type ───────────────────────────────────────── */

/**
 * Flat translation dictionary.
 * Keys use dot notation: "nav.home", "hero.title", etc.
 */
export type TranslationDict = Record<string, string>;

/* ─── Lazy-loaded translation modules ───────────────────────────────────── */

/**
 * Translation cache — populated on first access per locale.
 * Avoids loading all languages at once.
 */
const translationCache: Partial<Record<Locale, TranslationDict>> = {};

/**
 * Load translations for a given locale.
 * Falls back to English if the locale file is not found.
 *
 * @param locale - BCP-47 locale code
 * @returns Flat translation dictionary
 */
export async function loadTranslations(locale: Locale): Promise<TranslationDict> {
  // Return cached version if already loaded
  if (translationCache[locale]) {
    return translationCache[locale]!;
  }

  try {
    // Dynamic import of locale file — tree-shaken in production
    const module = await import(`./translations/${locale}`);

    // Cache and return
    translationCache[locale] = module.default as TranslationDict;
    return translationCache[locale]!;
  } catch {
    // Log warning and fall back to English
    if (locale !== DEFAULT_LOCALE) {
      console.warn(`[i18n] Translation for locale "${locale}" not found. Falling back to English.`);
      return loadTranslations(DEFAULT_LOCALE);
    }
    // English itself is missing — return empty dict
    return {};
  }
}

/**
 * Get translations synchronously from the cache.
 * Returns English if the locale is not yet cached.
 * Call `loadTranslations(locale)` first in server components.
 *
 * @param locale - BCP-47 locale code
 * @returns Flat translation dictionary (may be empty if not yet loaded)
 */
export function getTranslations(locale: Locale = DEFAULT_LOCALE): TranslationDict {
  return translationCache[locale] ?? translationCache[DEFAULT_LOCALE] ?? {};
}

/* ─── Translation function ───────────────────────────────────────────────── */

/**
 * Translate a key using the given locale's dictionary.
 *
 * Features:
 *  - Falls back to English if key is missing in target locale
 *  - Returns the key itself if missing from all locales (visible in UI = easy to spot)
 *  - Supports variable interpolation: t("hello", locale, { name: "Arjun" })
 *    → "Hello, Arjun!" when the translation is "Hello, {{name}}!"
 *
 * @param key         - Dot-notation key (e.g. "nav.home")
 * @param locale      - Target locale
 * @param variables   - Optional interpolation variables
 * @returns Translated string
 *
 * @example
 * t("nav.home", "hi")  // "होम"
 * t("hero.welcome", "en", { name: "Arjun" }) // "Welcome, Arjun!"
 */
export function t(
  key:       string,
  locale:    Locale = DEFAULT_LOCALE,
  variables?: Record<string, string | number>,
): string {
  const dict    = translationCache[locale] ?? {};      // Locale dict
  const enDict  = translationCache[DEFAULT_LOCALE] ?? {}; // English fallback

  // Look up in locale dict first, then English, then return key
  let value = dict[key] ?? enDict[key] ?? key;

  // Interpolate variables: {{name}} → "Arjun"
  if (variables) {
    Object.entries(variables).forEach(([varKey, varValue]) => {
      value = value.replace(new RegExp(`\\{\\{${varKey}\\}\\}`, "g"), String(varValue));
    });
  }

  return value;
}

/* ─── Cookie helpers ─────────────────────────────────────────────────────── */

/**
 * Get the user's preferred locale from the cookie.
 * Returns DEFAULT_LOCALE if cookie is not set or invalid.
 * For use in server components via `cookies()`.
 *
 * @param cookieValue - Raw cookie string value
 * @returns Valid Locale code
 */
export function getLocaleFromCookie(cookieValue?: string): Locale {
  if (!cookieValue) return DEFAULT_LOCALE;

  // Validate against supported locales
  const isValid = SUPPORTED_LOCALES.some((l) => l.code === cookieValue);
  return isValid ? (cookieValue as Locale) : DEFAULT_LOCALE;
}

/**
 * Check if a string is a valid supported locale code.
 *
 * @param code - Locale code to validate
 * @returns True if the code is supported
 */
export function isValidLocale(code: string): code is Locale {
  return SUPPORTED_LOCALES.some((l) => l.code === code);
}

/* ─── RTL support ────────────────────────────────────────────────────────── */

/**
 * Get the text direction for a locale.
 * Currently all LearnVeda locales are LTR.
 *
 * @param locale - Locale code
 * @returns "ltr" | "rtl"
 */
export function getLocaleDir(locale: Locale): "ltr" | "rtl" {
  return SUPPORTED_LOCALES.find((l) => l.code === locale)?.dir ?? "ltr";
}
