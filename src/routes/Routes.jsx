import { createBrowserRouter } from 'react-router';
import Home from '../pages/Home';
import MainLayout from '../Layouts/MainLayout';
import ErrorPage from '../components/shared/ErrorPage';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import Profile from '../pages/Profile';
import Banner from '../components/home/Banner';
import DonationRequest from '../pages/DonationRequest';
import FundingPage from '../dashboard/funding/FundingPage';
import AllUsers from '../dashboard/AdminDashboard/AllUsers';
import AllDonationRequests from '../dashboard/AdminDashboard/AllBloodDonationRequests';
import ContentManagement from '../dashboard/AdminDashboard/ContentManagement';
import Funding from '../dashboard/AdminDashboard/Funding';
import Features from '../components/home/Features';
import DashboardIndex from '../Layouts/DashboardLayout/DashboardIndex';
import MyDonationRequests from '../dashboard/DonorDashboard/MyDonationRequests';
import CreateDonationRequest from '../dashboard/DonorDashboard/CreateDonationRequest';
import EditDonationRequest from '../dashboard/DonorDashboard/EditDonationRequest';
import DonationDetails from '../dashboard/DonorDashboard/DonationDetails';
import VolunteerAllBloodDonationRequests from '../dashboard/volunteer/VolunteerAllBloodDonationRequests';
import BloodRequests from '../pages/BloodRequests';
import BloodDetails from '../pages/BloodDetails';
import PrivateRoute from './PrivateRoute';
import Blog from '../pages/Blog';
import NotFound from '../components/shared/NotFound';
import BlogDetails from '../pages/BlogDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: 'donation-requests',
      //   element: <DonationRequest />,
      // },
      {
        path: 'Blood-requests',
        element: <BloodRequests />,
      },
      {
        path: 'blood-details/:id',
        element: (
          <PrivateRoute>
            <BloodDetails />,
          </PrivateRoute>
        ),
      },
      {
        path: 'Features',
        element: <Features />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'banner',
        element: <Banner />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: '/blog/:id',
        element: <BlogDetails />,
      },
      {
        path: 'funding',
        element: (
          <PrivateRoute>
            <FundingPage />,
          </PrivateRoute>
        ),
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

  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'all-blood-donation-request',
        element: <AllDonationRequests />,
      },
      {
        path: 'volunteer-all-blood-donation-request',
        element: <VolunteerAllBloodDonationRequests />,
      },
      {
        path: 'content-management',
        element: <ContentManagement />,
      },
      {
        path: 'funding',
        element: <Funding />,
      },
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests />,
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest />,
      },
      {
        path: 'edit-donation-request/:id',
        element: <EditDonationRequest />,
      },
      {
        path: 'donation-details/:id',
        element: (
          //   <PrivateRoute>
          <DonationDetails />
          //   </PrivateRoute>
        ),
      },
    ],
  },
]);
