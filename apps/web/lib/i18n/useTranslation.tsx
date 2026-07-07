/**
 * @file lib/i18n/useTranslation.tsx
 * @description i18n translation hook and provider for LearnVeda
 * @purpose Provides language context and t() function to all components
 * @used-by All components that display text, Navbar language switcher
 *
 * Usage:
 *   const { t, language, setLanguage } = useTranslation();
 *   <h1>{t("hero.headline")}</h1>
 *
 * Language preference is stored in localStorage under "learnveda-lang".
 * Falls back to browser language detection, then "en" if not supported.
 */

"use client"; // Context requires client-side rendering

import React, {
  createContext, useContext, useState, useEffect, useCallback,
} from "react";
import { type Language, DEFAULT_LANGUAGE, LANGUAGES, t as translateFn } from "./translations";

/* ─── Translation Context Type ───────────────────────────────────────────── */
interface TranslationContext {
  /** Current active language code */
  language:    Language;
  /** Switch to a different language */
  setLanguage: (lang: Language) => void;
  /** Translate a key to the current language */
  t:           (key: string) => string;
  /** All available languages (for the language picker) */
  languages:   typeof LANGUAGES;
  /** Current language metadata (name, nativeName, flag) */
  currentLang: (typeof LANGUAGES)[number];
}

/* ─── Context ────────────────────────────────────────────────────────────── */
const TranslationCtx = createContext<TranslationContext | undefined>(undefined);

/* ─── TranslationProvider ────────────────────────────────────────────────── */
/**
 * Wraps the app (or a section) to provide language context.
 * Place in app/(marketing)/layout.tsx and app/(platform)/layout.tsx.
 */
export function TranslationProvider({ children }: { children: React.ReactNode }) {
  /* ── Initialize language from localStorage / browser ──────────── */
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted,  setMounted]       = useState(false); // SSR safety flag

  useEffect(() => {
    setMounted(true);                                    // Now we can read localStorage

    // 1. Check localStorage for stored preference
    const stored = localStorage.getItem("learnveda-lang") as Language | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      setLanguageState(stored);                          // Use stored preference
      return;
    }

    // 2. Detect from browser language
    const browserLang = navigator.language.split("-")[0] as Language; // "hi-IN" → "hi"
    if (LANGUAGES.some((l) => l.code === browserLang)) {
      setLanguageState(browserLang);                     // Use browser language if supported
    }
    // 3. Default: "en" (already set in useState)
  }, []);

  /* ── Language setter — persists to localStorage ───────────────── */
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem("learnveda-lang", lang);    // Persist selection
      document.documentElement.lang = lang;            // Update <html lang="...">
    }
  }, [mounted]);

  /* ── Translation function ─────────────────────────────────────── */
  const t = useCallback((key: string): string => {
    return translateFn(key, language);                 // Look up in translations map
  }, [language]);

  /* ── Current language metadata ────────────────────────────────── */
  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const contextValue: TranslationContext = {
    language,
    setLanguage,
    t,
    languages: LANGUAGES,
    currentLang,
  };

  return (
    <TranslationCtx.Provider value={contextValue}>
      {children}
    </TranslationCtx.Provider>
  );
}

/* ─── useTranslation hook ────────────────────────────────────────────────── */
/**
 * Access the translation context in any client component.
 *
 * @throws Error if used outside TranslationProvider
 *
 * @example
 * const { t, language, setLanguage } = useTranslation();
 */
export function useTranslation(): TranslationContext {
  const ctx = useContext(TranslationCtx);
  if (!ctx) {
    throw new Error("useTranslation must be used inside <TranslationProvider>");
  }
  return ctx;
}

/* ─── LanguageSwitcher Component ─────────────────────────────────────────── */
/**
 * Dropdown language picker. Renders a button with the current flag + native name.
 * Can be embedded in the Navbar or any page header.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { currentLang, setLanguage, languages } = useTranslation();
  const [open, setOpen] = useState(false);             // Dropdown open state

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-border bg-background/80 backdrop-blur-sm px-2.5 py-1 text-sm text-foreground hover:border-brand-500/50 transition-colors"
        aria-label={`Language: ${currentLang.name}`}
      >
        <span role="img" aria-label={currentLang.name}>{currentLang.flag}</span>
        <span className="hidden sm:inline text-xs font-medium">{currentLang.nativeName}</span>
        <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full mt-2 z-50 min-w-48 rounded-xl border bg-popover shadow-lg p-1 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`
                  w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left
                  ${currentLang.code === lang.code
                    ? "bg-brand-500/10 text-brand-500 font-medium"
                    : "text-foreground hover:bg-muted"
                  }
                `}
              >
                <span role="img" aria-label={lang.name} className="text-base">{lang.flag}</span>
                <div>
                  <div className="font-medium">{lang.nativeName}</div>  {/* Native script */}
                  <div className="text-xs text-muted-foreground">{lang.name}</div> {/* English name */}
                </div>
                {/* Checkmark for selected */}
                {currentLang.code === lang.code && (
                  <svg className="ml-auto h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
