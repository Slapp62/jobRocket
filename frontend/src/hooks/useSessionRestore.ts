import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setUser } from '@/store/userSlice';

/**
 * Hook to restore user session on app initialization.
 *
 * This hook runs ONCE when the app loads and handles two scenarios:
 *
 * SCENARIO 1: Redux has user data (from localStorage persistence)
 * - Validates with backend by calling /api/users/current
 * - If valid, session is still active - no action needed
 * - If invalid (410), axios interceptor handles cleanup
 *
 * SCENARIO 2: Redux is empty but session cookie exists (e.g., after Google OAuth)
 * - Attempts to fetch user from /api/users/current
 * - If successful, populates Redux with user data
 * - If fails (401/410), user is not logged in - no action needed
 *
 * This hook is critical for Google OAuth flow where the backend redirects
 * the browser directly to the dashboard/search page with a session cookie,
 * but Redux hasn't been populated yet.
 */
export function useSessionRestore() {
  const hasInitialized = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Only run ONCE on app load
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const initializeSession = async () => {
      try {
        // Call /api/users/current to check if a valid session exists
        // This works whether Redux has user data or not
        const response = await axios.get('/api/users/current');

        // If Redux is empty but we got user data, populate Redux
        // This handles OAuth redirects where session exists but Redux is empty
        if (!user && response.data) {
          dispatch(setUser(response.data));
        }

        // If Redux has user data, this validates the session is still active
        // No need to update Redux since it already has the data
      } catch (error: any) {
        // If error is 410 (session expired) or 401 (unauthorized),
        // the axios interceptor in sessionManager.ts will handle cleanup
        // No need to do anything here - just prevent unhandled rejection

        // If Redux had stale data, interceptor clears it
        // If Redux was empty, it stays empty (user not logged in)
      } finally {
        // Mark initialization as complete
        setIsInitializing(false);
      }
    };

    initializeSession();
  }, []); // Empty deps array - run only on mount

  return { isInitializing };
}
