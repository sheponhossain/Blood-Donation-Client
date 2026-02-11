import React, { useState } from 'react'; // useState যোগ করা হয়েছে
import { NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaList,
  FaUsers,
  FaDonate,
  FaHandHoldingHeart,
  FaExchangeAlt,
} from 'react-icons/fa';

const DashboardLayout = () => {
  const [user, setUser] = useState({
    name: 'Test User',
    role: 'admin',
  });

  const toggleRole = (newRole) => {
    setUser({ ...user, role: newRole });
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col flex-1 bg-gray-50">
        {/* Mobile & Role Switcher Navbar */}
        <nav className="navbar w-full bg-white border-b px-4 flex justify-between">
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

          {/* ২. Role Switcher UI: এটি শুধু ডেভেলপমেন্টের সময় চেক করার জন্য */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-[10px] font-black uppercase px-2 text-slate-500 flex items-center gap-1">
              <FaExchangeAlt size={10} /> Role:
            </span>
            {['admin', 'donor', 'volunteer'].map((r) => (
              <button
                key={r}
                onClick={() => toggleRole(r)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  user.role === r
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Page Content */}
        <div className="p-4 md:p-8 w-full min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Section */}
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
              {user.role} Menu
            </div>

            {/* কন্ডিশনাল রেন্ডারিং এখন user.role অনুযায়ী হবে */}
            {(user.role === 'donor' ||
              user.role === 'admin' ||
              user.role === 'volunteer') && (
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
            )}

            {user.role === 'donor' && (
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

            {user.role === 'volunteer' && (
              <>
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
              </>
            )}

            {user.role === 'admin' && (
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
              </>
            )}

            {user.role !== 'donor' && (
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
