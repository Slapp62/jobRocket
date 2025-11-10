import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { setAllUsers } from '@/store/userSlice';

export function useGetAllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.userSlice.allUsers);
  const isLoading = allUsers === null;

  useEffect(() => {
    if (allUsers !== null) {
      //users are already loaded in Redux
    } else {
      const loadUsers = async () => {
        try {
          const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
          axios.defaults.headers.common['x-auth-token'] = token;
          const response = await axios.get(`${API_BASE_URL}/api/users`);
          dispatch(setAllUsers(response.data));
        } catch (error: any) {
          notifications.show({
            title: 'Error',
            message: error?.message || 'Failed to load users',
            color: 'red',
          });
        }
      };
      loadUsers();
    }
  }, [allUsers]);

  return { allUsers, isLoading };
}
