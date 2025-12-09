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
          const response = await axios.get('/api/users');
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
