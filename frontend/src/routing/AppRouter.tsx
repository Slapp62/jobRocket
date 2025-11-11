import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SearchPage } from '@/pages/Search.page';
import ErrorFallback from '../components/ErrorCatching/ErrorFallback';
import Error404 from '../pages/404.pages';
import About from '../pages/About.pages';
import AdminControls from '../pages/AdminControls/AdminControls.pages';
import { CreateListing } from '../pages/CreateListing.pages';
import { EditListing } from '../pages/EditListing.pages';
import { EditProfile } from '../pages/EditProfilePage/EditProfile.pages';
import { FavoriteListings } from '../pages/Favorites.pages';
import { HomePage } from '../pages/Home.pages';
import { LoginPage } from '../pages/LoginPage/Login.pages';
import { MyListings } from '../pages/MyListings.pages';
import { RegisterForm } from '../pages/Register.pages';
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
        { path: 'edit-listing/:id', element: <EditListing /> },
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
          path: 'admin',
          element: (
            <RouteGuard isAdmin>
              <AdminControls />
            </RouteGuard>
          ),
        },
        {
          path: 'my-listings',
          element: (
            <RouteGuard profileType="business">
              <MyListings />
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
