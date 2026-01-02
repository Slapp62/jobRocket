import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { RootState } from '../store/store';

type RouteGuardProps = {
  children: React.ReactNode;
  profileType?: 'jobseeker' | 'business';
  isAdmin?: boolean;
};

/**
 * RouteGuard component for protecting routes based on authentication and authorization.
 *
 * This component checks Redux state AND waits for session initialization to complete.
 * Session validation and population is handled by useSessionRestore hook.
 *
 * IMPORTANT: This component waits for session initialization to prevent race conditions
 * where RouteGuard tries to redirect before the session check completes (e.g., after
 * Google OAuth redirect where Redux hasn't been populated yet).
 *
 * If a user's session expires, the axios interceptor will:
 * 1. Clear Redux state (clearUser)
 * 2. Show notification
 * 3. Redirect to login
 */
const RouteGuard = (props: RouteGuardProps) => {
  const { children, profileType, isAdmin } = props;

  const user = useSelector((state: RootState) => state.userSlice.user);
  const userLoggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const { isInitializing } = useAuthContext();
  const accessMessage = 'You do not have access to this page.';

  // Wait for session initialization to complete before checking auth
  // This prevents redirecting users who are logging in via OAuth
  if (isInitializing) {
    return null; // or a loading spinner if desired
  }

  // Check if user is logged in
  if (!userLoggedIn) {
    return <Navigate to="/" replace state={{ message: accessMessage }} />;
  }

  // Check if user has correct profile type
  if (profileType && user?.profileType !== profileType) {
    return <Navigate to="/login" replace state={{ message: accessMessage }} />;
  }

  // Check if user is admin (when admin access required)
  if (isAdmin && !user?.isAdmin) {
    return <Navigate to="/login" replace state={{ message: accessMessage }} />;
  }

  // User is authorized, render the protected content
  return <>{children}</>;
};

export default RouteGuard;
