import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

type RouteGuardProps = {
  children: React.ReactNode;
  profileType?: 'jobseeker' | 'business';
  isAdmin?: boolean;
};

/**
 * RouteGuard component for protecting routes based on authentication and authorization.
 *
 * This component ONLY checks Redux state - it does NOT validate sessions with the backend.
 * Session validation is handled centrally by the axios interceptor in sessionManager.ts.
 *
 * If a user's session expires, the interceptor will:
 * 1. Clear Redux state (clearUser)
 * 2. Show notification
 * 3. Redirect to login
 *
 * This component will then redirect based on the cleared state.
 */
const RouteGuard = (props: RouteGuardProps) => {
  const { children, profileType, isAdmin } = props;

  const user = useSelector((state: RootState) => state.userSlice.user);
  const userLoggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const accessMessage = 'You do not have access to this page.';

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
