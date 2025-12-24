# Date Handling Implementation Guide

**Last Updated:** 24/12/2025
**Version:** 1.0
**Status:** Production Ready

## Table of Contents

1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Solution Architecture](#solution-architecture)
4. [Implementation Details](#implementation-details)
5. [Code Examples](#code-examples)
6. [Testing Guidelines](#testing-guidelines)
7. [Troubleshooting](#troubleshooting)
8. [Future Considerations](#future-considerations)

---

## Overview

This document describes the standardized date handling system implemented across the JobRocket application. The system ensures that all dates are displayed consistently in **DD/MM/YYYY** format and are correctly handled in the user's local timezone, preventing timezone-related bugs.

### Key Features

- **Consistent Format:** All dates display as DD/MM/YYYY across the entire application
- **Timezone Aware:** Dates reflect the user's local timezone, not UTC
- **No Date Shifts:** Date inputs (like listing expiration) are interpreted as local midnight, preventing off-by-one-day errors
- **Centralized Utilities:** All date operations use shared helper functions from a single source of truth
- **Beginner Friendly:** Uses `date-fns` library with readable, self-documenting code

### Dates Affected

- **User Account Creation:** When users register on the platform
- **Listing Creation:** When job listings are posted
- **Listing Expiration:** When job listings are set to expire
- **Application Submission:** When jobseekers submit applications
- **Consent Timestamps:** When users agree to terms (stored but not currently displayed)

---

## Problem Statement

### The Timezone Problem

Before this implementation, the application had several date-related issues:

**1. Inconsistent Display Formats**
```javascript
// Different components used different methods:
new Date(date).toLocaleDateString()        // Format depends on browser locale
new Date(date).toLocaleString()           // Includes time, varies by locale
date.toISOString().split('T')[0]          // Shows YYYY-MM-DD format
```

**Result:** Users saw dates in different formats throughout the site (MM/DD/YYYY in US, DD/MM/YYYY in Europe, etc.)

**2. Timezone Shift Bugs**

When a business user in Israel (UTC+2) created a listing:
```javascript
// User selects expiration date: January 15, 2026
expiresAt: "2026-01-15"  // From date input

// Old code converted it to UTC:
new Date("2026-01-15")  // Creates: 2026-01-15T00:00:00Z (UTC midnight)

// When displayed back in Israel timezone:
// 2026-01-15T00:00:00Z = 2026-01-15 02:00 (Israel time)
// But when API processes it, might show as: "14/01/2026" ❌
```

**Result:** Listings appeared to expire one day earlier than intended for users in timezones ahead of UTC.

**3. Backend Date Manipulation**

```javascript
// Old normalizeListing.js
const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 30);
expiresAt: defaultDate.toISOString().split('T')[0]  // Only date part
```

**Result:** Default expiration dates were calculated on the server in UTC, which didn't align with user expectations in their local timezone.

---

## Solution Architecture

### Design Principles

1. **Single Source of Truth:** All date operations go through centralized utilities
2. **Local Midnight:** Date-only fields (like expiration) represent midnight in the user's timezone
3. **Preserve Timezone:** Dates are sent to API with timezone information intact
4. **Display in Local:** Dates are always displayed in the user's local timezone
5. **Consistent Format:** All date displays use DD/MM/YYYY format

### System Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│                                                                   │
│  User selects: "15/01/2026"                                      │
│         ↓                                                         │
│  formatDateForInput() → "2026-01-15" (for input field)          │
│         ↓                                                         │
│  parseLocalDate() → Date object at local midnight                │
│         ↓                                                         │
│  toISOString() → "2026-01-14T22:00:00.000Z" (for user in UTC+2) │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                                │
│                                                                   │
│  Receives: "2026-01-14T22:00:00.000Z"                           │
│  (ISO string with timezone information preserved)                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE                                 │
│                                                                   │
│  MongoDB stores: ISODate("2026-01-14T22:00:00.000Z")            │
│  (Internally stored in UTC)                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         RESPONSE                                 │
│                                                                   │
│  API returns: "2026-01-14T22:00:00.000Z"                        │
│         ↓                                                         │
│  formatDate() → "15/01/2026" (displayed to user)                │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Frontend Library:** `date-fns` v4.1.0
- **Backend:** Native JavaScript Date objects
- **Database:** MongoDB Date type (stores in UTC)
- **Format Standard:** DD/MM/YYYY for all date displays

---

## Implementation Details

### 1. Date Utilities (`frontend/src/utils/dateUtils.ts`)

This is the **single source of truth** for all date operations in the application.

#### Core Functions

**`formatDate(date)`**
- **Purpose:** Format any date to DD/MM/YYYY
- **Input:** Date object, ISO string, or null/undefined
- **Output:** String in DD/MM/YYYY format, or empty string if invalid
- **Usage:** All date displays throughout the application

**`parseLocalDate(dateString)`**
- **Purpose:** Convert YYYY-MM-DD string to Date at local midnight
- **Input:** String from HTML date input (e.g., "2026-01-15")
- **Output:** Date object representing midnight in user's timezone
- **Critical for:** Preventing timezone shifts in date inputs

**`formatDateForInput(date)`**
- **Purpose:** Format date for HTML date input fields
- **Input:** Date object or ISO string
- **Output:** String in YYYY-MM-DD format
- **Usage:** Pre-filling date input fields

**`getDefaultListingExpiration()`**
- **Purpose:** Calculate default expiration (30 days from now)
- **Output:** Date object 30 days from today at local midnight
- **Usage:** Setting default values in listing forms

**`addDays(date, days)`**
- **Purpose:** Add/subtract days from a date
- **Input:** Date and number of days (positive or negative)
- **Output:** New Date object
- **Usage:** Calculating max expiration (90 days)

**`toLocalMidnight(date)`**
- **Purpose:** Convert any date to midnight in local timezone
- **Input:** Date object or ISO string
- **Output:** Date at midnight (00:00:00) in user's timezone
- **Usage:** Normalizing dates to start of day

### 2. Frontend Components Updated

**Date Input Components:**
- `CreateListing.pages.tsx` - Creating new job listings
- `EditListingModal.tsx` - Editing existing listings
- `getCleanedListingData.ts` - Preparing data for edit form

**Date Display Components:**
- `ListingCard.tsx` - Job listing cards
- `ListingDetailsPanel.tsx` - Full listing details
- `ListingDetailsModal.tsx` - Listing modal popup
- `DashListings.tsx` - Business user dashboard (listings table)
- `DashApplications.tsx` - Business user dashboard (applications table)
- `MyApplications.page.tsx` - Jobseeker applications page
- `AdminControls.pages.tsx` - Admin user management panel
- `AccessibilityStatement.pages.tsx` - Last updated date

### 3. Backend Changes

**`backend/utils/normalizeListing.js`**

```javascript
/**
 * Key Changes:
 * 1. Accept expiresAt from frontend as-is (already an ISO string)
 * 2. Only create default expiration if expiresAt not provided
 * 3. Use UTC midnight for default to ensure consistency
 * 4. Don't manipulate dates from frontend
 */

const normalizeListing = async (listingData, userId) => {
  let defaultExpiration;
  if (!listingData.expiresAt) {
    const defaultDate = new Date();
    defaultDate.setUTCHours(0, 0, 0, 0);
    defaultDate.setDate(defaultDate.getDate() + 30);
    defaultExpiration = defaultDate.toISOString();
  }

  return {
    ...listingData,
    businessId: userId,
    expiresAt: listingData.expiresAt || defaultExpiration,
  };
};
```

**Why this works:**
- Frontend sends dates as ISO strings (e.g., "2026-01-14T22:00:00.000Z")
- Backend accepts them without modification
- MongoDB stores them in UTC
- When retrieved, they're sent back as ISO strings
- Frontend displays them in user's local timezone

---

## Code Examples

### Creating a Listing with Expiration Date

**Frontend (`CreateListing.pages.tsx`):**

```typescript
import { formatDateForInput, parseLocalDate, getDefaultListingExpiration } from '@/utils/dateUtils';

export function CreateListing() {
  // Set default expiration (30 days from now at local midnight)
  const defaultListingExpiration = getDefaultListingExpiration();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      expiresAt: formatDateForInput(defaultListingExpiration), // "2026-01-15"
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      // Parse as local midnight before sending to API
      expiresAt: data.expiresAt
        ? parseLocalDate(data.expiresAt).toISOString()
        : null,
    };

    await axios.post('/api/listings/', payload);
  };

  return (
    <TextInput
      type="date"
      {...register('expiresAt')}
    />
  );
}
```

### Displaying a Date

**Frontend (`ListingCard.tsx`):**

```typescript
import { formatDate } from '@/utils/dateUtils';

function ListingCard({ listing }) {
  return (
    <Text>
      Posted {formatDate(listing.createdAt)}
      {/* Output: "Posted 15/01/2026" */}
    </Text>
  );
}
```

### Editing a Listing

**Frontend (`EditListingModal.tsx`):**

```typescript
import { formatDate, formatDateForInput, parseLocalDate } from '@/utils/dateUtils';

export const EditListingModal = ({ listing }) => {
  // Clean listing data for form (convert to YYYY-MM-DD for input)
  const cleanedListing = {
    ...listing,
    expiresAt: formatDateForInput(listing.expiresAt), // "2026-01-15"
  };

  // Show current expiration in DD/MM/YYYY format
  const currentExpiration = formatDate(listing.expiresAt); // "15/01/2026"

  const onSubmit = async (data) => {
    await axios.put(`/api/listings/${listing._id}`, {
      ...data,
      expiresAt: data.expiresAt
        ? parseLocalDate(data.expiresAt).toISOString()
        : null,
    });
  };

  return (
    <div>
      <Text>Currently expires on {currentExpiration}</Text>
      <TextInput type="date" defaultValue={cleanedListing.expiresAt} />
    </div>
  );
};
```

---

## Testing Guidelines

### Manual Testing Checklist

#### 1. Date Input Testing (Critical)

**Test Case: Create Listing with Expiration**
```
1. Navigate to Create Listing page
2. Select expiration date 30 days from today
3. Note the exact date you selected (e.g., "15/01/2026")
4. Submit the form
5. ✅ VERIFY: Dashboard shows expiration as the same date you selected
6. ✅ VERIFY: Edit the listing - date input shows same date
```

**Test Case: Edit Listing Expiration**
```
1. Open Edit Listing modal for existing listing
2. Note current expiration date displayed (DD/MM/YYYY format)
3. Change expiration to a new date (e.g., "20/02/2026")
4. Save changes
5. ✅ VERIFY: Dashboard shows new expiration date correctly
6. ✅ VERIFY: No timezone shift (date remains "20/02/2026")
```

#### 2. Date Display Testing

**Test Case: Consistent Format**
```
1. View job listing card
2. ✅ VERIFY: "Posted DD/MM/YYYY" format
3. Open listing details
4. ✅ VERIFY: Same DD/MM/YYYY format
5. Go to business dashboard
6. ✅ VERIFY: Created/Expires dates in DD/MM/YYYY
7. Go to applications page
8. ✅ VERIFY: Submitted dates in DD/MM/YYYY
9. Go to admin panel (if admin)
10. ✅ VERIFY: Account creation dates in DD/MM/YYYY
```

#### 3. Timezone Testing (Advanced)

**Test Case: Timezone Shift Prevention**
```
Required: Browser DevTools
1. Open DevTools > Console
2. Run: `new Date().getTimezoneOffset()`
3. Note your timezone offset
4. Create a listing with expiration "15/01/2026"
5. Open Network tab
6. ✅ VERIFY: Request payload shows ISO string with timezone
   Example for Israel (UTC+2): "2026-01-14T22:00:00.000Z"
7. ✅ VERIFY: Response shows same ISO string
8. ✅ VERIFY: UI displays "15/01/2026"
```

**Test Case: Cross-Timezone Consistency**
```
Optional: Requires changing system timezone
1. Create listing with expiration "15/01/2026"
2. Note the listing ID
3. Change system timezone to different zone
4. Refresh browser
5. View the same listing
6. ✅ VERIFY: Expiration still shows "15/01/2026"
```

#### 4. Edge Cases

**Test Case: Past Dates**
```
1. Try to create listing with past expiration date
2. ✅ VERIFY: Validation prevents submission
```

**Test Case: Maximum Expiration**
```
1. Try to set expiration > 90 days from today
2. ✅ VERIFY: Date picker prevents selection
```

**Test Case: Null/Empty Dates**
```
1. Check listings without expiresAt (seeded data)
2. ✅ VERIFY: No errors, shows "N/A" or empty
```

### Automated Testing

**Unit Tests (Frontend):**

```typescript
// Example test for parseLocalDate
import { parseLocalDate, formatDate, formatDateForInput } from '@/utils/dateUtils';

describe('Date Utilities', () => {
  test('parseLocalDate creates local midnight', () => {
    const date = parseLocalDate('2026-01-15');
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getDate()).toBe(15);
    expect(date.getMonth()).toBe(0); // January
    expect(date.getFullYear()).toBe(2026);
  });

  test('formatDate returns DD/MM/YYYY', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const formatted = formatDate(date);
    expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  test('formatDateForInput returns YYYY-MM-DD', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const formatted = formatDateForInput(date);
    expect(formatted).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
```

---

## Troubleshooting

### Common Issues

#### Issue: Dates showing one day off

**Symptoms:**
- User selects "15/01/2026" but sees "14/01/2026" after saving

**Diagnosis:**
```javascript
// Check if parseLocalDate is being used
// BAD:
expiresAt: new Date(data.expiresAt).toISOString()

// GOOD:
expiresAt: parseLocalDate(data.expiresAt).toISOString()
```

**Solution:**
- Ensure all date inputs use `parseLocalDate()` before sending to API
- Check that you're not calling `new Date(dateString)` directly

#### Issue: Dates showing wrong format

**Symptoms:**
- Dates showing as "1/15/2026" instead of "15/01/2026"

**Diagnosis:**
```javascript
// Check if formatDate is being used
// BAD:
new Date(date).toLocaleDateString()

// GOOD:
formatDate(date)
```

**Solution:**
- Replace all instances of `toLocaleDateString()` with `formatDate()`
- Run: `grep -r "toLocaleDateString" frontend/src`

#### Issue: TypeScript errors with date utilities

**Symptoms:**
- `Type 'string | null' is not assignable to type 'Date'`

**Solution:**
```typescript
// Date utilities handle null/undefined gracefully
// They return empty string "" for invalid inputs
formatDate(null) // Returns ""
formatDate(undefined) // Returns ""
formatDate("invalid") // Returns ""

// Safe to use:
<Text>{formatDate(listing.createdAt)}</Text>
```

#### Issue: Backend default expiration not working

**Symptoms:**
- Seeded listings have incorrect expiration dates

**Diagnosis:**
```javascript
// Check normalizeListing.js
// Should use UTC midnight for defaults
const defaultDate = new Date();
defaultDate.setUTCHours(0, 0, 0, 0);
```

**Solution:**
- Ensure backend uses UTC midnight for default expirations
- Frontend handles conversion to local timezone on display

---

## Future Considerations

### Potential Enhancements

#### 1. Time Display (Future)

Currently, we only show dates (not times). If you need to show times in the future:

```typescript
// Add to dateUtils.ts
export const formatDateTime = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  // Shows: "15/01/2026, 14:30"
  return format(dateObj, 'dd/MM/yyyy, HH:mm');
};

export const formatDateTimeWithZone = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  // Shows: "15/01/2026, 14:30 IST"
  return format(dateObj, 'dd/MM/yyyy, HH:mm zzz');
};
```

#### 2. Relative Dates (Future)

For showing "2 days ago", "in 3 hours", etc:

```typescript
import { formatDistanceToNow } from 'date-fns';

export const formatRelativeDate = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  // Shows: "2 days ago"
  return formatDistanceToNow(dateObj, { addSuffix: true });
};
```

#### 3. Locale Support (Future)

To support multiple languages:

```typescript
import { format } from 'date-fns';
import { he, enUS } from 'date-fns/locale';

export const formatDateLocalized = (
  date: Date | string,
  locale: 'en' | 'he' = 'en'
): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const localeMap = { en: enUS, he };

  return format(dateObj, 'dd/MM/yyyy', { locale: localeMap[locale] });
};
```

#### 4. Calendar Integration (Future)

For adding events to user calendars:

```typescript
export const generateICalDate = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  // iCal format: "20260115T000000Z"
  return format(dateObj, "yyyyMMdd'T'HHmmss'Z'");
};
```

### Migration Path for Future Changes

If you need to change the date format in the future (e.g., to MM/DD/YYYY for US market):

1. **Update only one place:** `dateUtils.ts`
```typescript
// Change this line in formatDate():
return format(dateObj, 'dd/MM/yyyy'); // Current
return format(dateObj, 'MM/dd/yyyy'); // For US format
```

2. **No other changes needed** - all components automatically update

### Database Considerations

**Current State:**
- All dates stored as MongoDB Date type (UTC internally)
- Timezone information is in the ISO string
- Works correctly for all timezones

**If scaling to millions of users:**
- Consider indexed queries on expiration dates
- Monitor performance of date range queries
- Consider archiving expired listings

**Index recommendations:**
```javascript
// In Listings model
listingSchema.index({ expiresAt: 1 });
listingSchema.index({ createdAt: -1 });
```

---

## Summary

### What We Achieved

✅ **Consistent Format:** All dates show as DD/MM/YYYY
✅ **Timezone Aware:** Dates reflect user's local timezone
✅ **No Date Shifts:** Expiration dates work correctly across all timezones
✅ **Centralized:** Single source of truth for all date operations
✅ **Maintainable:** Well-documented, beginner-friendly code
✅ **Production Ready:** Fully tested and type-safe

### Key Files

| File | Purpose |
|------|---------|
| `frontend/src/utils/dateUtils.ts` | **Core utilities** - All date functions |
| `frontend/src/pages/BusinessUsers/CreateListing.pages.tsx` | Date input handling |
| `frontend/src/pages/BusinessUsers/Dashboard/modals/EditListingModal.tsx` | Edit form date handling |
| `backend/utils/normalizeListing.js` | Backend date processing |

### Quick Reference

```typescript
// Import utilities
import { formatDate, parseLocalDate, formatDateForInput } from '@/utils/dateUtils';

// Display a date
formatDate(date) // "15/01/2026"

// Date input (form default value)
formatDateForInput(date) // "2026-01-15"

// Parse date input (before sending to API)
parseLocalDate("2026-01-15").toISOString() // Correct timezone

// Calculate future dates
addDays(new Date(), 30) // 30 days from now
getDefaultListingExpiration() // 30 days at midnight
```

---

**Document Maintained By:** Development Team
**Last Review:** 24/12/2025
**Next Review:** When date format requirements change
