import axios from 'axios';

/**
 * Basic Axios Configuration
 *
 * This file sets up the global axios instance with default settings.
 * Session management and error handling are configured separately in sessionManager.ts
 */

// Enable sending cookies with requests (required for session-based auth)
axios.defaults.withCredentials = true;

// Set base URL for all API requests
// In development: http://localhost:3000
// In production: empty string (same origin)
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');
