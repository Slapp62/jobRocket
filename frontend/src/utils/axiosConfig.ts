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
      if (error.response?.status === 401) {
        dispatch(clearUser());
        navigate('/', { state: { message: 'Session expired. Please log in again.' } });
        notifications.show({
          title: 'Session Expired',
          message: 'Session expired. Please login again',
          color: 'yellow',
        });
      }
      return Promise.reject(error); // Re-throw so original catch blocks still work
    }
  );
};