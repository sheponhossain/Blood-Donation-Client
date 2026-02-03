import { Outlet } from 'react-router';

import Footer from '../components/shared/Footer';
import Navbar from '../components/shared/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-284px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
