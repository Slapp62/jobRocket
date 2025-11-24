import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { clearUser, setUser } from '@/store/userSlice';
import { TdecodedToken } from '@/Types';
import { setupAxiosInterceptors } from '@/utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

export function useAuthInit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    delete axios.defaults.headers.common['x-auth-token'];
    dispatch(clearUser());  // Clear Redux state
    navigate('/', { state: { message: 'Session expired. Please log in again.' } });
  }, [dispatch, navigate]);

  useEffect(() => {
    setupAxiosInterceptors(handleUnauthorized);
  }, [handleUnauthorized]);

  useEffect(() => {
    const tokenHandler = async () => {
      const token = localStorage.getItem('token');

      if (token !== null) {
        try {
          const decodedToken = jwtDecode<TdecodedToken>(token);
          if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            localStorage.removeItem('rememberMe');
            return;  // Don't proceed with auto-login
          }
          
          const id = decodedToken._id;

          axios.defaults.headers.common['x-auth-token'] = token;
          const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';
          const userData = await axios.get(`${API_BASE_URL}/api/users/${id}`);

          dispatch(setUser(userData.data));
        } catch (error: any) {
          notifications.show({
            title: 'Error',
            message: 'Could not login in. Please login again.',
            color: 'red',
          });
        }
      }
    };

    const handleBeforeUnload = () => {
      const rememberMe = localStorage.getItem('rememberMe');

      if (rememberMe !== 'true') {
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    tokenHandler();
  }, [dispatch]);
}
