import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

type RouteGuardProps = {
  children: React.ReactNode;
  profileType?: 'jobseeker' | 'business';
  isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
  const { children, profileType, isAdmin } = props;

  const user = useSelector((state: RootState) => state.userSlice.user);
  const userLoggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const accessMessage = 'You do not have access to this page.';

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
