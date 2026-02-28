import { Outlet } from 'react-router';

import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="min-h-[calc(100vh-284px)] bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
