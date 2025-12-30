import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { setUser } from '@/store/userSlice';
import { RootState } from '../store/store';

type RouteGuardProps = {
  children: React.ReactNode;
  profileType?: 'jobseeker' | 'business';
  isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
  const { children, profileType, isAdmin } = props;
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  const user = useSelector((state: RootState) => state.userSlice.user);
  const userLoggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const accessMessage = 'You do not have access to this page.';

  // Check for active session if user is not in Redux store
  useEffect(() => {
    const checkSession = async () => {
      if (!userLoggedIn) {
        try {
          const response = await axios.get('/api/users/current');
          if (response.data) {
            dispatch(setUser(response.data));

            // Show welcome notification for OAuth login/registration
            const userData = response.data;
            notifications.show({
              title: 'Welcome to JobRocket!',
              message: `Successfully logged in as ${userData.profileType === 'business' ? 'a business' : 'a job seeker'}. Let's get started!`,
              color: 'green',
              autoClose: 5000,
            });
          }
        } catch (error) {
          // No active session, that's ok
        }
      }
      setIsChecking(false);
    };

    checkSession();
  }, [userLoggedIn, dispatch]);

  // Show loader while checking session
  if (isChecking) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!userLoggedIn) {
    return <Navigate to="/" replace state={{ message: accessMessage }} />;
  }

  if (profileType && user?.profileType !== profileType) {
    return <Navigate to="/login" replace state={{ message: accessMessage }} />;
  }

  if (isAdmin && !user?.isAdmin) {
    return <Navigate to="/login" replace state={{ message: accessMessage }} />;
  }

  return <>{children}</>;
};

export default RouteGuard;
