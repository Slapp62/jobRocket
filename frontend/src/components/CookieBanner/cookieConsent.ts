/**
 * Cookie Consent Management Utility
 *
 * Manages user consent choices for cookies in compliance with Israel's
 * Privacy Protection Law (Amendment 13, effective August 14, 2025).
 *
 * Key compliance features:
 * - Stores explicit consent choices in localStorage
 * - Tracks timestamp of consent for audit purposes
 * - Separates essential vs. analytics cookies
 * - Provides easy consent checking for Google Analytics integration
 *
 * Usage:
 * 1. Check consent before loading analytics: `if (hasAnalyticsConsent()) { initGA(); }`
 * 2. Get full consent object: `const consent = getCookieConsent();`
 * 3. Set consent (done by CookieBanner): `setCookieConsent({ ... });`
 */

const CONSENT_STORAGE_KEY = 'cookieConsent';

/**
 * Cookie consent preferences
 */
export interface CookieConsent {
  /** Essential cookies (session, CSRF) - always true */
  essential: boolean;
  /** Analytics cookies (Google Analytics) - requires user consent */
  analytics: boolean;
  /** ISO timestamp when consent was given */
  timestamp: string;
}

/**
 * Get the current cookie consent preferences from localStorage
 *
 * Returns null if user hasn't made a choice yet (banner should be shown)
 *
 * @returns Cookie consent object or null if not set
 */
export function getCookieConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const consent = JSON.parse(stored) as CookieConsent;

    // Validate the stored data has required fields
    if (
      typeof consent.essential !== 'boolean' ||
      typeof consent.analytics !== 'boolean' ||
      !consent.timestamp
    ) {
      // Invalid data - clear it and return null
      localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return consent;
  } catch (error) {
    // Error parsing stored consent - clear it
    console.error('Error reading cookie consent:', error);
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  }
}

/**
 * Save cookie consent preferences to localStorage
 *
 * @param consent - The consent preferences to save
 */
export function setCookieConsent(consent: CookieConsent): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
}

/**
 * Check if user has consented to analytics cookies
 *
 * Use this before initializing Google Analytics or other analytics tools.
 *
 * Example:
 * ```typescript
 * if (hasAnalyticsConsent()) {
 *   // Initialize Google Analytics
 *   gtag('config', 'GA_MEASUREMENT_ID');
 * }
 * ```
 *
 * @returns true if user has explicitly consented to analytics
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.analytics === true;
}

/**
 * Check if user has made any consent choice
 *
 * Use this to determine if the cookie banner should be shown.
 *
 * @returns true if user has made a consent choice (accepted or declined)
 */
export function hasConsentChoice(): boolean {
  return getCookieConsent() !== null;
}

/**
 * Clear all cookie consent preferences
 *
 * This will cause the cookie banner to appear again on next visit.
 * Useful for testing or if user wants to reset preferences.
 */
export function clearCookieConsent(): void {
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

/**
 * Update only analytics consent (keep other preferences)
 *
 * Useful if you add a settings page where users can change their preferences.
 *
 * @param analyticsConsent - New analytics consent preference
 */
export function updateAnalyticsConsent(analyticsConsent: boolean): void {
  const currentConsent = getCookieConsent();

  const newConsent: CookieConsent = {
    essential: true, // Always true
    analytics: analyticsConsent,
    timestamp: new Date().toISOString(),
  };

  setCookieConsent(newConsent);

  // If user just enabled analytics, you might want to initialize GA here
  // If disabled, you might want to disable GA tracking
  if (analyticsConsent && !currentConsent?.analytics) {
    // Analytics just enabled - initialize if needed
    // Example: initializeGoogleAnalytics();
  }
}
