import axios from 'axios';

export const setupAxiosInterceptors = (onUnauthorized: () => void) => {
  axios.interceptors.response.use(
    (response) => response,  // Pass through successful responses
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
};