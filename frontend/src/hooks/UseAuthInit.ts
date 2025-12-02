import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/users/current');
        // If this succeeds, user has valid session
        dispatch(setUser(response.data));
      } catch (error) {
        // No valid session - user is not logged in
        // This is normal, not an error - just means they need to log in
      }
    };

    checkSession();
  }, [dispatch]);
}