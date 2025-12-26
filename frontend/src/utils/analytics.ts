/**
 * Google Analytics Integration Utility
 *
 * This file provides helper functions for integrating Google Analytics 4 (GA4)
 * with Amendment 13 compliant cookie consent.
 *
 * IMPORTANT: This file is ready to use but Google Analytics is not initialized yet.
 * When you're ready to add GA:
 * 1. Get your GA4 Measurement ID (starts with G-XXXXXXXXXX)
 * 2. Replace MEASUREMENT_ID constant below
 * 3. Uncomment the initialization code in App.tsx
 *
 * The integration already respects user consent - GA will only load if the user
 * has explicitly accepted analytics cookies via the cookie banner.
 */

import { hasAnalyticsConsent } from '../components/CookieBanner/cookieConsent';

// TODO: Replace with your actual GA4 Measurement ID when ready
const MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Extend Window interface to include gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Initialize Google Analytics 4
 *
 * This function:
 * - Checks if user has consented to analytics (returns early if not)
 * - Loads the GA4 script from Google
 * - Initializes gtag with privacy-friendly settings
 * - Sets up IP anonymization for compliance
 *
 * Call this once when your app loads, typically in App.tsx useEffect.
 * It's safe to call multiple times - it will only initialize once.
 *
 * Example usage in App.tsx:
 * ```typescript
 * useEffect(() => {
 *   initializeGoogleAnalytics();
 * }, []);
 * ```
 */
export function initializeGoogleAnalytics(): void {
  // Only initialize if user has consented
  if (!hasAnalyticsConsent()) {
    console.log('Google Analytics not initialized: User has not consented to analytics cookies');
    return;
  }

  // Don't initialize twice
  if (window.gtag) {
    console.log('Google Analytics already initialized');
    return;
  }

  // Check if measurement ID is configured
  if (MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn(
      'Google Analytics not configured: Please replace MEASUREMENT_ID in analytics.ts with your GA4 ID'
    );
    return;
  }

  console.log('Initializing Google Analytics with user consent...');

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  // Configure GA4 with privacy settings
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    // Privacy-friendly settings for Amendment 13 compliance
    anonymize_ip: true, // Anonymize IP addresses (last digits removed)
    cookie_flags: 'SameSite=None;Secure', // Secure cookie settings
    send_page_view: false, // We'll manually track page views in React Router
  });

  console.log('Google Analytics initialized successfully');
}

/**
 * Track a page view in Google Analytics
 *
 * Call this when the route changes in your React app.
 *
 * @param path - The page path (e.g., '/search', '/login')
 * @param title - Optional page title
 *
 * Example with React Router:
 * ```typescript
 * const location = useLocation();
 *
 * useEffect(() => {
 *   trackPageView(location.pathname + location.search);
 * }, [location]);
 * ```
 */
export function trackPageView(path: string, title?: string): void {
  // Only track if user has consented and GA is initialized
  if (!hasAnalyticsConsent() || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * Track a custom event in Google Analytics
 *
 * Use this to track important user actions like:
 * - Applying to a job
 * - Creating a listing
 * - Favoriting a job
 * - Completing registration
 *
 * @param eventName - Name of the event (use snake_case)
 * @param eventParams - Optional event parameters
 *
 * Example:
 * ```typescript
 * trackEvent('job_application_submitted', {
 *   job_id: listingId,
 *   job_title: listing.title,
 * });
 * ```
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  // Only track if user has consented and GA is initialized
  if (!hasAnalyticsConsent() || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventParams);
}

/**
 * Track when user searches for jobs
 *
 * @param searchTerm - The search query
 * @param filters - Optional filters applied (location, type, etc.)
 */
export function trackJobSearch(searchTerm: string, filters?: Record<string, any>): void {
  trackEvent('search', {
    search_term: searchTerm,
    ...filters,
  });
}

/**
 * Track when user applies to a job
 *
 * @param jobId - The job listing ID
 * @param jobTitle - The job title
 */
export function trackJobApplication(jobId: string, jobTitle: string): void {
  trackEvent('job_application', {
    job_id: jobId,
    job_title: jobTitle,
  });
}

/**
 * Track when user creates a job listing
 *
 * @param listingId - The new listing ID
 * @param jobTitle - The job title
 */
export function trackListingCreated(listingId: string, jobTitle: string): void {
  trackEvent('listing_created', {
    listing_id: listingId,
    job_title: jobTitle,
  });
}

/**
 * Track when user favorites/unfavorites a job
 *
 * @param jobId - The job listing ID
 * @param action - 'add' or 'remove'
 */
export function trackFavorite(jobId: string, action: 'add' | 'remove'): void {
  trackEvent('favorite', {
    job_id: jobId,
    action: action,
  });
}

/**
 * Track user registration
 *
 * @param userType - 'jobseeker' or 'business'
 */
export function trackRegistration(userType: 'jobseeker' | 'business'): void {
  trackEvent('sign_up', {
    method: 'email',
    user_type: userType,
  });
}

/**
 * Track user login
 */
export function trackLogin(): void {
  trackEvent('login', {
    method: 'email',
  });
}
