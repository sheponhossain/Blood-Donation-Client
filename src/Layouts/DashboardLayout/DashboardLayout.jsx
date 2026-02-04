import { NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaList,
  FaUsers,
  FaDonate,
  FaHandHoldingHeart,
} from 'react-icons/fa';

const DashboardLayout = () => {
  const role = 'admin';

  return (
    // min-h-screen নিশ্চিত করে যে পুরো উচ্চতা নিবে
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* drawer-content এ flex-1 যোগ করা হয়েছে যাতে এটি বাকি সবটুকু জায়গা নেয় */}
      <div className="drawer-content flex flex-col flex-1 bg-gray-50">
        {/* Mobile Navbar */}
        <nav className="navbar w-full bg-white border-b lg:hidden px-4">
          <div className="flex-none">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-bold text-red-600">
            BloodFlow Dashboard
          </div>
        </nav>

        {/* Main Page Content - এখানে w-full নিশ্চিত করা হয়েছে */}
        <div className="p-4 md:p-8 w-full min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col w-64 bg-white border-r text-base-content">
          <div className="p-6 text-2xl font-bold text-red-600 border-b">
            🩸 BloodFlow
          </div>

          <ul className="menu p-4 w-full grow gap-2">
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive ? 'bg-red-500 text-white' : ''
                }
              >
                <FaUser className="size-4" /> Profile
              </NavLink>
            </li>

            <div className="divider opacity-50 uppercase text-xs">Menu</div>

            {(role === 'donor' || role === 'admin' || role === 'volunteer') && (
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive ? 'bg-red-500 text-white' : ''
                  }
                >
                  <FaHome className="size-4" /> Dashboard Home
                </NavLink>
              </li>
            )}

            {role === 'donor' && (
              <>
                <li>
                  <NavLink to="/dashboard/my-donation-requests">
                    <FaList /> My Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/create-donation-request">
                    <FaPlusCircle /> Create Request
                  </NavLink>
                </li>
              </>
            )}

            {role === 'volunteer' && (
              <>
                <li>
                  <NavLink to="/dashboard/all-blood-donation-request">
                    <FaList /> All Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/content-management">
                    <FaHandHoldingHeart /> Content
                  </NavLink>
                </li>
              </>
            )}

            {role === 'admin' && (
              <>
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUsers /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-blood-donation-request">
                    <FaList /> All Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/content-management">
                    <FaHandHoldingHeart /> Content
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <NavLink to="/dashboard/funding">
                <FaDonate /> Funding
              </NavLink>
            </li>

            <div className="mt-auto border-t pt-4">
              <li>
                <NavLink to="/" className="text-gray-500">
                  <FaHome /> Back to Home
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
