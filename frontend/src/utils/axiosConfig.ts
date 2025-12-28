import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { AppDispatch, store } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { trackApiError } from './analytics';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');

export const setupAxiosInterceptors = (
  dispatch: AppDispatch,
  navigate: (path: string, options?: any) => void
) => {
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
        trackApiError(
          error.config?.url || 'unknown',
          0,
          'Network error - no response received'
        );
      }

      // Handle session expiration (existing logic)
      if (error.response?.status === 410) {
        dispatch(clearUser());
        navigate('/login');
        notifications.show({
          title: 'Session Expired',
          message: 'Session expired. Please login again',
          color: 'yellow',
        });
        // Return a rejected promise with a flag so catch blocks know this error is already handled
        return Promise.reject({ handled: true, status: 410 });
      } else {
        return Promise.reject(error); // Re-throw all other errors to component catch blocks
      }
    }
  );
};
