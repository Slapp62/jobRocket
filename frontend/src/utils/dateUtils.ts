/**
 * Date Utilities
 *
 * Centralized date handling utilities to ensure consistent date formatting
 * and proper timezone handling across the application.
 *
 * Key concepts:
 * - All dates are stored in UTC in the database
 * - All dates are displayed in the user's local timezone
 * - All dates use DD/MM/YYYY format for consistency
 * - Date inputs (like listing expiration) are interpreted as local midnight
 */

import { addDays as addDaysFns, format, parseISO } from 'date-fns';

/**
 * Formats a date to DD/MM/YYYY format in the user's local timezone
 *
 * @param date - Date object, ISO string, or date string from API
 * @returns Formatted date string in DD/MM/YYYY format
 *
 * @example
 * formatDate(new Date()) // "24/12/2025"
 * formatDate("2025-12-24T10:30:00.000Z") // "24/12/2025" (in user's timezone)
 */
export const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) {return '';}

  try {
    // If it's a string, parse it first
    const dateObj = typeof date === 'string' ? parseISO(date) : date;

    // Format as DD/MM/YYYY
    return format(dateObj, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Parses a date string (YYYY-MM-DD) as local midnight to prevent timezone shifts
 *
 * PROBLEM THIS SOLVES:
 * When a user selects "2026-01-15" in a date input field, we want it to mean
 * "January 15, 2026 at midnight in their local timezone", NOT "January 15, 2026 UTC".
 *
 * Without this function:
 * - User in Israel (UTC+2) selects "2026-01-15"
 * - new Date("2026-01-15") creates 2026-01-15T00:00:00Z (midnight UTC)
 * - Which is 2026-01-15 02:00 in Israel time
 * - But when sent to API and back, might display as "14/01/2026" (one day earlier)
 *
 * With this function:
 * - User selects "2026-01-15"
 * - We create 2026-01-15T00:00:00 in their LOCAL timezone
 * - When sent to API as ISO string, it's stored correctly
 * - When displayed back, shows as "15/01/2026" (correct!)
 *
 * @param dateString - Date string in YYYY-MM-DD format (from date input field)
 * @returns Date object set to midnight in user's local timezone
 *
 * @example
 * parseLocalDate("2026-01-15") // Jan 15, 2026 00:00:00 in user's timezone
 */
export const parseLocalDate = (dateString: string): Date => {
  // Split the date string into parts
  const [year, month, day] = dateString.split('-').map(Number);

  // Create date at midnight in LOCAL timezone (not UTC)
  // Month is 0-indexed in JavaScript (0 = January)
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

/**
 * Converts any date to midnight in the user's local timezone
 *
 * Useful when you have a Date object but want to strip the time component
 * and set it to local midnight.
 *
 * @param date - Date object or ISO string
 * @returns Date object set to midnight in user's local timezone
 *
 * @example
 * toLocalMidnight(new Date("2026-01-15T14:30:00Z")) // Jan 15, 2026 00:00:00 local
 */
export const toLocalMidnight = (date: Date | string): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 0, 0, 0, 0);
};

/**
 * Adds a number of days to a date
 *
 * @param date - Starting date
 * @param days - Number of days to add (can be negative to subtract)
 * @returns New date with days added
 *
 * @example
 * addDays(new Date("2026-01-15"), 30) // Feb 14, 2026
 */
export const addDays = (date: Date | string, days: number): Date => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return addDaysFns(dateObj, days);
};

/**
 * Formats a date for use in HTML date input fields (YYYY-MM-DD)
 *
 * Date input fields expect dates in YYYY-MM-DD format.
 * This function converts a Date object to that format in the user's local timezone.
 *
 * @param date - Date object or ISO string
 * @returns Date string in YYYY-MM-DD format
 *
 * @example
 * formatDateForInput(new Date("2026-01-15")) // "2026-01-15"
 */
export const formatDateForInput = (date: Date | string | null | undefined): string => {
  if (!date) {return '';}

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Gets the default expiration date for a new listing (30 days from now)
 *
 * Returns a date 30 days from now at midnight in the user's local timezone.
 *
 * @returns Date object 30 days from now at midnight
 */
export const getDefaultListingExpiration = (): Date => {
  const today = toLocalMidnight(new Date());
  return addDays(today, 30);
};
