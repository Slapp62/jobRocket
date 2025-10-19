import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../pages/Home.pages';
import { Layout } from './Layout';
import AdminControls from '../pages/AdminControls/AdminControls.pages';
import Error404 from '../pages/404.pages';
import About from '../pages/About.pages';
import { RegisterForm } from '../pages/Register.pages';
import { FavoriteCards } from '../pages/Favorites.pages';
import { MyCards } from '../pages/MyListings.pages';
import { CardDetails } from '../pages/CardDetails.pages';
import { LoginPage } from '../pages/LoginPage/Login.pages';
import RouteGuard from './RouteGuard';
import { EditProfile } from '../pages/EditProfilePage/EditProfile.pages';
import { CreateCard } from '../pages/CreateCard.pages';
import { EditCard } from '../pages/EditCard.pages';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage/>},
      {path: 'about', element: <About/>},
      {path: 'register', element: <RegisterForm/>},
      {path: 'card-details/:id', element: <CardDetails/>},
      {path: 'edit-card/:id', element: <EditCard/>},
      {path: 'favorites', element: <RouteGuard><FavoriteCards/></RouteGuard>},
      {path: 'create-card', element: <RouteGuard><CreateCard/></RouteGuard>},
      {path: 'edit-profile/:id', element: <RouteGuard><EditProfile/></RouteGuard>},
      {path: 'admin', element: <RouteGuard isAdmin><AdminControls/></RouteGuard> },
      {path: 'my-listings', element: <RouteGuard isBusiness><MyCards/></RouteGuard>},
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
