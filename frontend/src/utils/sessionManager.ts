import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { store } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { trackApiError } from './analytics';

// Flag to prevent duplicate session expiration handling
// Resets when user logs in again
let isSessionExpired = false;

/**
 * Initialize session management for the entire application.
 * This should be called ONCE when the app starts (in main.tsx).
 *
 * Sets up a global axios interceptor that:
 * - Handles 410 (session expired) responses
 * - Clears user state
 * - Shows notification
 * - Redirects to login
 */
export function initializeSessionManagement() {
  axios.interceptors.response.use(
    (response) => response, // Pass successful responses through unchanged
    (error) => {
      // Track API errors in Google Analytics
      if (error.response) {
        // Server responded with error status
        trackApiError(
          error.config?.url || 'unknown',
          error.response.status,
          error.response.data?.message || error.message
        );
      } else if (error.request) {
        // Request was made but no response received (network error)
        trackApiError(error.config?.url || 'unknown', 0, 'Network error - no response received');
      }

      // Handle session expiration (410 Gone)
      if (error.response?.status === 410) {
        // Only handle once per session expiration event
        // This prevents cascading 410s from triggering multiple redirects/notifications
        if (!isSessionExpired) {
          isSessionExpired = true;

          // Clear user state from Redux
          store.dispatch(clearUser());

          // Show notification to user
          notifications.show({
            title: 'Session Expired',
            message: 'Your session has expired. Please log in again.',
            color: 'yellow',
          });

          // Redirect to login page using window.location for guaranteed navigation
          // This works even if React Router state is corrupted
          window.location.href = '/login';
        }

        // Return rejected promise with flag so components know error is handled
        return Promise.reject({ handled: true, status: 410 });
      }

      // Mark 404 errors as handled to prevent redundant notifications
      // Component-level catch blocks can choose to show their own error message if needed
      if (error.response?.status === 404) {
        return Promise.reject({ ...error, handled: true, status: 404 });
      }

      // Re-throw all other errors to component catch blocks
      return Promise.reject(error);
    }
  );
}

/**
 * Reset the session expired flag when user successfully logs in.
 * This allows future session expirations to be handled properly.
 */
export function resetSessionExpiredFlag() {
  isSessionExpired = false;
}
