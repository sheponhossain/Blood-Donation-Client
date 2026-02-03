import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import MainLayout from '../Layouts/MainLayout';
import ErrorPage from '../components/shared/ErrorPage';
import DonationRequests from '../dashboard/donor/DonationRequests';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../components/Dashboard/DashboardLayout';
import DonorDashboardHome from '../dashboard/donor/DonorDashboardHome';
import Profile from '../dashboard/common/Profile';

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
        path: 'donation-requests',
        element: <DonationRequests />,
      },
      {
        path: 'search',
        element: <SearchPage />,
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
