import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../pages/Home.pages';
import { Layout } from './Layout';
import AdminControls from '../pages/AdminControls/AdminControls.pages';
import Error404 from '../pages/404.pages';
import About from '../pages/About.pages';
import { RegisterForm } from '../pages/Register.pages';
import { FavoriteListings } from '../pages/Favorites.pages';
import { MyListings } from '../pages/MyListings.pages';
import { ListingDetails } from '../pages/ListingDetails.pages';
import { LoginPage } from '../pages/LoginPage/Login.pages';
import RouteGuard from './RouteGuard';
import { EditProfile } from '../pages/EditProfilePage/EditProfile.pages';
import { CreateListing } from '../pages/CreateListing.pages';
import { EditListing } from '../pages/EditListing.pages';
import { SearchPage } from '@/pages/Search.page';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'search', element: <SearchPage />},
      {path: 'login', element: <LoginPage/>},
      {path: 'about', element: <About/>},
      {path: 'register', element: <RegisterForm/>},
      {path: 'listing-details/:id', element: <ListingDetails/>},
      {path: 'edit-listing/:id', element: <EditListing/>},
      {path: 'favorites', element: <RouteGuard><FavoriteListings/></RouteGuard>},
      {path: 'create-listing', element: <RouteGuard><CreateListing/></RouteGuard>},
      {path: 'edit-profile/:id', element: <RouteGuard><EditProfile/></RouteGuard>},
      {path: 'admin', element: <RouteGuard isAdmin><AdminControls/></RouteGuard> },
      {path: 'my-listings', element: <RouteGuard profileType="business"><MyListings/></RouteGuard>},
      {path: '*', element: <Error404/>},
    ]
  },
  
],
  {
    basename: '/',
  });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
