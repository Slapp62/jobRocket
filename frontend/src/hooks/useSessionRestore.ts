import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

/**
 * Hook to restore user session on app initialization.
 *
 * This hook runs ONCE when the app loads to validate that the user
 * data persisted in Redux/localStorage still has a valid backend session.
 *
 * HOW IT WORKS:
 * 1. Runs only once on mount (using useRef to prevent re-runs)
 * 2. Checks if Redux has user data (from localStorage persistence)
 * 3. If yes, validates with backend by calling /api/users/current
 * 4. If validation succeeds, session is still valid - no action needed
 * 5. If validation fails (410), axios interceptor handles cleanup:
 *    - Clears Redux state
 *    - Shows "Session Expired" notification
 *    - Redirects to login
 *
 * This prevents the app from showing stale user data from a previous session.
 */
export function useSessionRestore() {
  const hasInitialized = useRef(false);
  const user = useSelector((state: RootState) => state.userSlice.user);

  useEffect(() => {
    // Only run ONCE on app load, and only if we have persisted user data
    if (hasInitialized.current || !user) {
      return;
    }

    hasInitialized.current = true;

    // Validate the persisted user session with the backend
    // If this fails, the axios interceptor will handle cleanup
    axios.get('/api/users/current').catch(() => {
      // Error handling is done by axios interceptor in sessionManager.ts
      // No need to do anything here - just prevent unhandled rejection
    });
  }, []); // Empty deps array - run only on mount
}
