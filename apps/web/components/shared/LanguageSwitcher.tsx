/**
 * @file components/shared/LanguageSwitcher.tsx
 * @description Language switcher component for LearnVeda
 *
 * Allows users to switch between 11 supported languages.
 * The selected language is persisted in a cookie (`learnveda-locale`)
 * and triggers a page reload to apply the new locale.
 *
 * Appears in:
 *  - Navbar (desktop + mobile)
 *  - Footer
 *  - Dashboard settings
 *
 * Supported languages: English, Hindi, Bengali, Telugu, Marathi, Tamil,
 * Gujarati, Kannada, Malayalam, Punjabi, Odia
 */

"use client"; // Client component — needs state + cookie access

import React, { useState, useTransition } from "react"; // React hooks
import { Globe2, Check, ChevronDown }      from "lucide-react";  // Icons
import { SUPPORTED_LOCALES, type Locale, LOCALE_COOKIE } from "@/lib/i18n"; // i18n config

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface LanguageSwitcherProps {
  /** Currently active locale code */
  currentLocale?: Locale;
  /** Compact mode — shows only the flag and code, not full name */
  compact?:       boolean;
  /** Additional CSS classes */
  className?:     string;
}

/* ─── Cookie setter (client-side) ────────────────────────────────────────── */
/**
 * Set the locale cookie in the browser.
 * MaxAge: 1 year — users don't need to re-select every session.
 *
 * @param locale - New locale code to persist
 */
function setLocaleCookie(locale: Locale): void {
  // Set cookie with 1-year expiry
  const maxAge = 60 * 60 * 24 * 365; // 1 year in seconds
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/* ─── LanguageSwitcher Component ─────────────────────────────────────────── */
export function LanguageSwitcher({
  currentLocale = "en", // Default to English
  compact       = false, // Full name by default
  className     = "",
}: LanguageSwitcherProps) {
  // Dropdown open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Active locale from prop (will be updated on page reload)
  const [activeLocale, setActiveLocale] = useState<Locale>(currentLocale);

  // React transition for non-blocking locale change
  const [isPending, startTransition] = useTransition();

  /* ── Handle language selection ────────────────────────────────────────── */
  const handleSelect = (locale: Locale) => {
    if (locale === activeLocale) {
      setIsOpen(false); // Close if same locale selected
      return;
    }

    startTransition(() => {
      setActiveLocale(locale);    // Update local state
      setLocaleCookie(locale);   // Persist to cookie
      setIsOpen(false);          // Close dropdown

      // Reload page to apply the new locale (server-side rendering)
      window.location.reload();
    });
  };

  /* ── Find current locale info ─────────────────────────────────────────── */
  const currentInfo = SUPPORTED_LOCALES.find((l) => l.code === activeLocale)
    ?? SUPPORTED_LOCALES[0]; // Fallback to English

  return (
    <div className={`relative ${className}`}>
      {/* ── Trigger button ────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}      // Toggle dropdown
        disabled={isPending}                    // Disable during transition
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium
          bg-background hover:bg-muted transition-colors
          ${isPending ? "opacity-60 cursor-wait" : ""}
        `}
        aria-label={`Current language: ${currentInfo.englishName}. Click to change.`}
        aria-expanded={isOpen}           // Accessibility: announce expanded state
        aria-haspopup="listbox"          // Accessibility: announce it has a listbox
      >
        {/* Globe icon */}
        <Globe2 className="h-4 w-4 text-muted-foreground" />

        {/* Flag */}
        <span className="text-base leading-none" aria-hidden>
          {currentInfo.flag}
        </span>

        {/* Language name or code */}
        {!compact && (
          <span className="text-foreground">{currentInfo.nativeName}</span>
        )}
        {compact && (
          <span className="text-foreground uppercase text-xs font-bold">
            {currentInfo.code}
          </span>
        )}

        {/* Dropdown chevron */}
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ── Dropdown list ─────────────────────────────────────────────── */}
      {isOpen && (
        <>
          {/* Backdrop — closes dropdown when clicked outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          {/* Language list */}
          <div
            className="
              absolute right-0 top-full mt-2 z-50
              w-56 rounded-xl border bg-background shadow-xl
              overflow-hidden
            "
            role="listbox"
            aria-label="Select language"
          >
            {/* Header */}
            <div className="px-4 py-2.5 border-b">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Language / भाषा
              </p>
            </div>

            {/* Scrollable list */}
            <div className="max-h-80 overflow-y-auto">
              {SUPPORTED_LOCALES.map((locale) => (
                <button
                  key={locale.code}                         // Unique key per locale
                  onClick={() => handleSelect(locale.code)} // Handle selection
                  role="option"
                  aria-selected={locale.code === activeLocale} // Accessibility
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left text-sm
                    hover:bg-muted transition-colors
                    ${locale.code === activeLocale ? "bg-brand-500/10" : ""}
                  `}
                >
                  {/* Flag */}
                  <span className="text-lg flex-shrink-0">{locale.flag}</span>

                  {/* Language names */}
                  <div className="flex-1 min-w-0">
                    {/* Native name (primary) */}
                    <p className={`font-medium truncate ${
                      locale.code === activeLocale ? "text-brand-500" : "text-foreground"
                    }`}>
                      {locale.nativeName}
                    </p>
                    {/* English name (secondary) */}
                    <p className="text-xs text-muted-foreground">{locale.englishName}</p>
                  </div>

                  {/* Active check */}
                  {locale.code === activeLocale && (
                    <Check className="h-4 w-4 text-brand-500 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer note */}
            <div className="px-4 py-2.5 border-t bg-muted/30">
              <p className="text-xs text-muted-foreground">
                More languages coming soon
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
