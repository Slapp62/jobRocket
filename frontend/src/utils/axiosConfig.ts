import { AppDispatch, store } from '@/store/store';
import { clearUser } from '@/store/userSlice';
import { notifications } from '@mantine/notifications';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8181' : '');

export const setupAxiosInterceptors = (dispatch: AppDispatch, navigate: (path: string, options?: any) => void) => {
  axios.interceptors.response.use(
    (response) => response, // Pass successful responses through unchanged
    (error) => {
      if (error.response?.status === 410) {
        dispatch(clearUser());
        navigate('/login');
        notifications.show({
          title: 'Session Expired',
          message: 'Session expired. Please login again',
          color: 'yellow',
        });
        // Don't re-throw 410 errors - they're fully handled here
        // This prevents duplicate notifications in component catch blocks
      } else {
        return Promise.reject(error); // Re-throw all other errors to component catch blocks
      }
    }
  );
};