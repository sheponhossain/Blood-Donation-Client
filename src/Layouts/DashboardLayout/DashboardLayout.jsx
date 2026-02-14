import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider'; // সঠিক পাথ দিন
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
  const { user, loading: authLoading } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDbLoading(true);
      fetch(`http://localhost:5000/user/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setDbUser(data);
          setDbLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          setDbLoading(false);
        });
    }
  }, [user?.email]);

  if (authLoading || dbLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  const userRole = dbUser?.role || 'donor';

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col flex-1 bg-gray-50">
        {/* Navbar */}
        <nav className="navbar w-full bg-white border-b px-4 flex justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
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
            <div className="px-2 font-bold text-red-600 hidden md:block">
              Blood Donation Dashboard
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">
                {dbUser?.name || user?.displayName}
              </p>
              <p className="text-[10px] text-red-600 font-black uppercase">
                {userRole}
              </p>
            </div>
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-red-500 ring-offset-2">
                <img
                  src={dbUser?.avatar || 'https://i.ibb.co/mR4df66/user.png'}
                  alt="profile"
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 md:p-8 w-full min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col w-64 bg-white border-r text-base-content">
          <div className="p-6 text-2xl font-bold text-red-600 border-b flex items-center gap-2">
            🩸 Blood Donation
          </div>

          <ul className="menu p-4 w-full grow gap-2">
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive ? 'bg-red-600 text-white' : ''
                }
              >
                <FaUser className="size-4" /> Profile
              </NavLink>
            </li>

            <div className="divider opacity-50 uppercase text-[10px] font-bold tracking-widest text-slate-400">
              {userRole} Menu
            </div>

            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  isActive ? 'bg-red-600 text-white' : ''
                }
              >
                <FaHome className="size-4" /> Dashboard Home
              </NavLink>
            </li>

            {/* Donor Routes */}
            {userRole === 'donor' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-donation-requests"
                    className={({ isActive }) =>
                      isActive ? 'bg-red-600 text-white' : ''
                    }
                  >
                    <FaList className="size-4" /> My Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/create-donation-request"
                    className={({ isActive }) =>
                      isActive ? 'bg-red-600 text-white' : ''
                    }
                  >
                    <FaPlusCircle className="size-4" /> Create Request
                  </NavLink>
                </li>
              </>
            )}

            {/* Volunteer Routes */}
            {userRole === 'volunteer' && (
              <li>
                <NavLink
                  to="/dashboard/volunteer-all-blood-donation-request"
                  className={({ isActive }) =>
                    isActive ? 'bg-red-600 text-white' : ''
                  }
                >
                  <FaList className="size-4" /> All Requests
                </NavLink>
              </li>
            )}

            {/* Admin Routes */}
            {userRole === 'admin' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/all-users"
                    className={({ isActive }) =>
                      isActive ? 'bg-red-600 text-white' : ''
                    }
                  >
                    <FaUsers className="size-4" /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-blood-donation-request"
                    className={({ isActive }) =>
                      isActive ? 'bg-red-600 text-white' : ''
                    }
                  >
                    <FaList className="size-4" /> All Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/content-management"
                    className={({ isActive }) =>
                      isActive ? 'bg-red-600 text-white' : ''
                    }
                  >
                    <FaHandHoldingHeart className="size-4" /> Content
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/funding"
                    className={({ isActive }) =>
                      isActive ? 'bg-red-600 text-white' : ''
                    }
                  >
                    <FaDonate className="size-4" /> Funding
                  </NavLink>
                </li>
              </>
            )}

            <div className="mt-auto border-t pt-4">
              <li>
                <NavLink to="/" className="text-slate-500 hover:text-red-600">
                  <FaHome className="size-4" /> Back to Home
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
