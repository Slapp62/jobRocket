import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import RegisterAccountTypePage from '@/pages/AllUsers/Registration/ChooseAccountType';
import RegisterStart from '@/pages/AllUsers/Registration/RegisterStart.pages';
import { SearchPage } from '@/pages/AllUsers/Search.page';
import ErrorFallback from '../components/ErrorCatching/ErrorFallback';
import { LoginPage } from '../pages/AllUsers/LoginPage/Login.pages';
import { RegisterForm } from '../pages/AllUsers/Registration/Register.pages';
// Eager loaded routes (frequently accessed, small)
import { HomePage } from '../pages/HomePage/Home.pages';
import { Layout } from './Layout';
import RouteGuard from './RouteGuard';

// Lazy loaded routes (large pages, less frequently accessed)
const Dashboard = lazy(() =>
  import('@/pages/BusinessUsers/Dashboard/Dashboard.pages').then((m) => ({ default: m.Dashboard }))
);
const MyApplications = lazy(() =>
  import('@/pages/Jobseekers/MyApplications.page').then((m) => ({ default: m.MyApplications }))
);
const FavoriteListings = lazy(() =>
  import('@/pages/Jobseekers/Favorites.pages').then((m) => ({ default: m.FavoriteListings }))
);
const CreateListing = lazy(() =>
  import('@/pages/BusinessUsers/CreateListing.pages').then((m) => ({ default: m.CreateListing }))
);
const EditProfile = lazy(() =>
  import('@/pages/EditProfilePage/EditProfile.pages').then((m) => ({ default: m.EditProfile }))
);
const AdminControls = lazy(() => import('@/pages/AdminControls/AdminControls.pages'));

// Static pages (rarely accessed, can be lazy loaded)
const About = lazy(() => import('@/pages/Static/About.pages'));
const PrivacyPolicy = lazy(() => import('@/pages/Static/PrivacyPolicy.pages'));
const TermsOfService = lazy(() => import('@/pages/Static/TermsOfService.pages'));
const AccessibilityStatement = lazy(() =>
  import('@/pages/AllUsers/AccessibilityStatement.pages').then((m) => ({
    default: m.AccessibilityStatement,
  }))
);
const Error404 = lazy(() => import('@/pages/Static/404.pages'));

// Loading fallback component
const PageLoader = () => (
  <Center h="100vh">
    <Loader size="lg" />
  </Center>
);

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
        {
          path: 'about',
          element: (
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          ),
        },
        { path: 'register', element: <RegisterStart /> },
        { path: 'register/account-type', element: <RegisterAccountTypePage /> },
        {
          path: 'privacy-policy',
          element: (
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicy />
            </Suspense>
          ),
        },
        {
          path: 'terms-of-service',
          element: (
            <Suspense fallback={<PageLoader />}>
              <TermsOfService />
            </Suspense>
          ),
        },
        {
          path: 'accessibility',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AccessibilityStatement />
            </Suspense>
          ),
        },
        {
          path: 'my-applications',
          element: (
            <RouteGuard profileType="jobseeker">
              <Suspense fallback={<PageLoader />}>
                <MyApplications />
              </Suspense>
            </RouteGuard>
          ),
        },
        {
          path: 'favorites',
          element: (
            <RouteGuard profileType="jobseeker">
              <Suspense fallback={<PageLoader />}>
                <FavoriteListings />
              </Suspense>
            </RouteGuard>
          ),
        },
        {
          path: 'create-listing',
          element: (
            <RouteGuard profileType="business">
              <Suspense fallback={<PageLoader />}>
                <CreateListing />
              </Suspense>
            </RouteGuard>
          ),
        },
        {
          path: 'edit-profile/:id',
          element: (
            <RouteGuard>
              <Suspense fallback={<PageLoader />}>
                <EditProfile />
              </Suspense>
            </RouteGuard>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <RouteGuard profileType="business">
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            </RouteGuard>
          ),
        },
        {
          path: 'admin',
          element: (
            <RouteGuard isAdmin>
              <Suspense fallback={<PageLoader />}>
                <AdminControls />
              </Suspense>
            </RouteGuard>
          ),
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<PageLoader />}>
              <Error404 />
            </Suspense>
          ),
        },
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
