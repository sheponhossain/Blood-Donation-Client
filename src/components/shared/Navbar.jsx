import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  UserPlus,
  LogIn,
} from 'lucide-react';
import Logo from './Logo';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Context থেকে user এবং logOut নেওয়া হচ্ছে
  const { user, logOut } = useContext(AuthContext);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donation Requests', path: '/donation-requests' },
    { name: 'Blood Requests', path: '/blood-requests' },
    { name: 'Funding', path: '/funding' },
    { name: 'Search', path: '/search' },
  ];

  const activeStyle =
    'text-red-600 font-bold border-b-2 border-red-600 pb-1 transition-all';
  const normalStyle =
    'text-gray-600 font-medium hover:text-red-500 transition-all duration-300';

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsDropdownOpen(false);
        setIsOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : normalStyle
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-200 hover:border-red-200 transition-all shadow-sm"
                >
                  <img
                    src={
                      user?.photoURL ||
                      'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                    }
                    alt="profile"
                    className="w-9 h-9 rounded-full border-2 border-red-500 object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {user?.displayName?.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                        Account
                      </p>
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {user?.displayName}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 font-semibold transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-gray-700 font-semibold hover:text-red-600 transition-all px-4 py-2"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transition-all active:scale-95"
                >
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="w-8 h-8 text-red-600" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-4 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-700'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <hr className="border-gray-100" />

          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <img
                  src={
                    user?.photoURL ||
                    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                  }
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-red-500 shadow-sm"
                />
                <div>
                  <p className="font-bold text-gray-800 leading-tight">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-gray-500 italic">Blood Donor</p>
                </div>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-lg text-gray-700 font-medium hover:bg-gray-50 rounded-xl"
              >
                <LayoutDashboard className="w-5 h-5 text-red-500" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-lg text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3.5 text-gray-700 font-bold border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 active:scale-[0.98] transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
