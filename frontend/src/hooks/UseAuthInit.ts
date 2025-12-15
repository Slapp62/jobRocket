import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { RootState } from '@/store/store';

export function useAuthInit() {
  const dispatch = useDispatch();
  const existingUser = useSelector((state:RootState) => state.userSlice.user)

  useEffect(() => {
    if (!existingUser) {
      return
    }

    const checkSession = async () => {
      try {
        const response = await axios.get('/api/users/current');
        
        // If this succeeds, user has valid session
        dispatch(setUser(response.data));
      } catch (error : any) {
        // Empty catch - errors are already handled by axios interceptor
        // 410 errors show "Session Expired" notification and redirect to login
      }
    };

    checkSession();
  }, [dispatch]);
}