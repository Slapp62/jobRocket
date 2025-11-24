import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SearchPage } from '@/pages/AllUsers/Search.page';
import { Dashboard } from '@/pages/BusinessUsers/Dashboard/Dashboard.pages';
import { MyApplications } from '@/pages/Jobseekers/MyApplications.page';
import ErrorFallback from '../components/ErrorCatching/ErrorFallback';
import AdminControls from '../pages/AdminControls/AdminControls.pages';
import { RegisterForm } from '../pages/AllUsers/Register.pages';
import { CreateListing } from '../pages/BusinessUsers/CreateListing.pages';
import { EditListing } from '../pages/BusinessUsers/EditListing.pages';
import { EditProfile } from '../pages/EditProfilePage/EditProfile.pages';
import { HomePage } from '../pages/HomePage/Home.pages';
import { FavoriteListings } from '../pages/Jobseekers/Favorites.pages';
import { LoginPage } from '../pages/AllUsers/LoginPage/Login.pages';
import Error404 from '../pages/Static/404.pages';
import About from '../pages/Static/About.pages';
import PrivacyPolicy from '../pages/Static/PrivacyPolicy.pages';
import TermsOfService from '../pages/Static/TermsOfService.pages';
import { Layout } from './Layout';
import RouteGuard from './RouteGuard';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorFallback />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'about', element: <About /> },
        { path: 'register', element: <RegisterForm /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: 'edit-listing/:id', element: <EditListing /> },
        {
          path: 'my-applications',
          element: (
            <RouteGuard profileType="jobseeker">
              <MyApplications />
            </RouteGuard>
          ),
        },
        {
          path: 'favorites',
          element: (
            <RouteGuard>
              <FavoriteListings />
            </RouteGuard>
          ),
        },
        {
          path: 'create-listing',
          element: (
            <RouteGuard>
              <CreateListing />
            </RouteGuard>
          ),
        },
        {
          path: 'edit-profile/:id',
          element: (
            <RouteGuard>
              <EditProfile />
            </RouteGuard>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <RouteGuard profileType="business">
              <Dashboard />
            </RouteGuard>
          ),
        },
        {
          path: 'admin',
          element: (
            <RouteGuard isAdmin>
              <AdminControls />
            </RouteGuard>
          ),
        },
        { path: '*', element: <Error404 /> },
      ],
    },
  ],
  {
    basename: '/',
  }
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
