# Cookie Consent Banner

Amendment 13 compliant cookie consent implementation for Israel's Privacy Protection Law.

## Features

- ✅ **Explicit opt-in consent** for analytics cookies (no pre-checked boxes)
- ✅ **Clear distinction** between essential and analytics cookies
- ✅ **Easy to accept or decline** - equally accessible options
- ✅ **Detailed information** available via collapsible section
- ✅ **Consent tracking** with timestamps for audit purposes
- ✅ **Blocks analytics** until user consents
- ✅ **Global display** - shows on any page the user first visits

## Files

- `CookieBanner.tsx` - Main banner component (displayed in App.tsx)
- `cookieConsent.ts` - Consent management utilities
- `README.md` - This file

## How It Works

### For Users

1. First visit: Banner appears after 1 second delay
2. User sees three options:
   - **Accept All Cookies** - Enables analytics
   - **Essential Only** - Declines analytics
   - **Decline Analytics** - Same as Essential Only
3. Choice is saved to localStorage
4. Banner won't appear again unless user clears their consent

### For Developers

The banner is already integrated in `App.tsx` and will appear globally on any page.

Consent choices are stored in localStorage with this structure:

```typescript
{
  essential: true,    // Always true
  analytics: boolean, // User's choice
  timestamp: "2025-12-26T10:30:00.000Z"
}
```

## Integration with Google Analytics

When you're ready to add Google Analytics, follow these steps:

### Step 1: Install Google Analytics

Add the GA4 script to your `index.html` or create a utility file:

```typescript
// frontend/src/utils/analytics.ts
export function initializeGoogleAnalytics() {
  const measurementId = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true, // Anonymize IPs for privacy
    cookie_flags: 'SameSite=None;Secure', // Cookie security
  });
}
```

### Step 2: Check Consent Before Initializing

In `App.tsx` or a root component:

```typescript
import { useEffect } from 'react';
import { hasAnalyticsConsent } from './components/CookieBanner/cookieConsent';
import { initializeGoogleAnalytics } from './utils/analytics';

export default function App() {
  useEffect(() => {
    // Only initialize GA if user has consented
    if (hasAnalyticsConsent()) {
      initializeGoogleAnalytics();
    }
  }, []);

  // ... rest of component
}
```

### Step 3: Initialize When User Accepts

Update `CookieBanner.tsx` to initialize GA when user accepts:

```typescript
const handleAcceptAll = () => {
  const consent: CookieConsent = {
    essential: true,
    analytics: true,
    timestamp: new Date().toISOString(),
  };
  setCookieConsent(consent);
  setIsVisible(false);

  // Initialize Google Analytics now that user consented
  initializeGoogleAnalytics();
};
```

### Step 4: Track Page Views (React Router)

If using React Router, track page views:

```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hasAnalyticsConsent } from './components/CookieBanner/cookieConsent';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (hasAnalyticsConsent() && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

// Add <Analytics /> to your router
```

## Consent Management API

### `getCookieConsent()`

Returns the current consent object or `null` if no choice made.

```typescript
const consent = getCookieConsent();
if (consent?.analytics) {
  // User has consented to analytics
}
```

### `setCookieConsent(consent)`

Save a consent choice. Usually called by the banner, but can be used for a settings page.

```typescript
setCookieConsent({
  essential: true,
  analytics: true,
  timestamp: new Date().toISOString(),
});
```

### `hasAnalyticsConsent()`

Quick check for analytics consent. Use this before initializing GA.

```typescript
if (hasAnalyticsConsent()) {
  initializeGoogleAnalytics();
}
```

### `hasConsentChoice()`

Check if user has made any choice (determines if banner should show).

```typescript
if (!hasConsentChoice()) {
  // Show banner
}
```

### `clearCookieConsent()`

Clear consent (for testing or user-requested reset).

```typescript
clearCookieConsent();
// Banner will appear on next page load
```

### `updateAnalyticsConsent(boolean)`

Change only analytics consent without affecting other settings.

```typescript
updateAnalyticsConsent(false); // Disable analytics
updateAnalyticsConsent(true);  // Enable analytics
```

## Amendment 13 Compliance Checklist

✅ **Explicit consent** - Users must actively click "Accept" (not pre-checked)
✅ **Clear purpose** - Banner explains what analytics cookies do
✅ **Easy to refuse** - "Decline" option is equally prominent
✅ **No loading before consent** - Analytics only loads after user accepts
✅ **Audit trail** - Consent timestamp stored for compliance records
✅ **Essential cookies explained** - Users know why some cookies are required
✅ **Privacy Policy linked** - Users can read full details

## Future Enhancements

- [ ] Add a "Cookie Settings" page in user settings to change preferences
- [ ] Add analytics opt-out in user profile
- [ ] Add GA event tracking for key actions (apply to job, create listing, etc.)
- [ ] Consider adding more granular consent options if needed

## Testing

To test the banner:

1. Open DevTools → Application → Local Storage
2. Delete the `cookieConsent` key
3. Refresh the page
4. Banner should appear after 1 second
5. Make a choice and verify it's stored in localStorage

## Privacy Notes

- Essential cookies (session, CSRF) **don't require consent** under Amendment 13
- Analytics cookies (GA) **require explicit consent** before loading
- Consent is stored locally - no server-side tracking of consent choices
- Users can clear consent by clearing browser data

## Questions?

See the Privacy Policy at `/docs/PRIVACY_POLICY.md` for full legal details.
