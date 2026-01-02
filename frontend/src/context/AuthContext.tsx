import { createContext, useContext } from 'react';

/**
 * Auth Context for tracking session initialization state.
 *
 * This context provides the initialization state from useSessionRestore hook
 * to child components like RouteGuard, preventing race conditions where
 * RouteGuard tries to redirect before session check completes.
 */
interface AuthContextType {
  isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isInitializing: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};
