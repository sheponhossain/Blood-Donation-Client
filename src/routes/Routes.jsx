import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import MainLayout from '../Layouts/MainLayout';
import ErrorPage from '../components/shared/ErrorPage';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import DonorDashboardHome from '../Layouts/DashboardLayout/DonorDashboardHome';
import Profile from '../pages/Profile';
import Banner from '../components/home/Banner';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'banner',
        element: <Banner />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  // Dashboard Routes (Private🔒)
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true, // /dashboard path e eta dekhabe
        element: <DonorDashboardHome />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      // Admin/Volunteer routes pore add hobe
    ],
  },
]);
