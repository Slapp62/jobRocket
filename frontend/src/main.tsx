import './utils/axiosConfig';

import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorCatching/ErrorBoundary';
import { initializeSessionManagement } from './utils/sessionManager';

// Initialize session management ONCE when app starts
// This sets up the global axios interceptor for session expiration handling
initializeSessionManagement();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
