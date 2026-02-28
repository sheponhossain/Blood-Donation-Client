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
  Sun, // নতুন ইমপোর্ট
  Moon, // নতুন ইমপোর্ট
} from 'lucide-react';
import Logo from './Logo';
import { AuthContext } from '../../providers/AuthProvider';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme(); // গ্লোবাল থিম লজিক

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blood Requests', path: '/blood-requests' },
    { name: 'Funding', path: '/funding' },
    { name: 'Search', path: '/search' },
    { name: 'Blog', path: '/blog' },
  ];

  // ডার্ক মোড সাপোর্ট সহ স্টাইল
  const activeStyle =
    'text-red-600 dark:text-red-400 font-bold border-b-2 border-red-600 pb-1 transition-all';
  const normalStyle =
    'text-gray-600 dark:text-gray-300 font-medium hover:text-red-500 transition-all duration-300';

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsDropdownOpen(false);
        setIsOpen(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 w-full transition-colors duration-300">
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

          {/* Desktop Auth Section & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* গ্লোবাল থিম টগল বাটন */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 border border-gray-200 dark:border-slate-700 hover:ring-2 ring-red-200 transition-all cursor-pointer"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 p-1.5 pr-4 cursor-pointer rounded-full border border-gray-200 dark:border-slate-700 hover:border-red-200 transition-all shadow-sm"
                >
                  <img
                    src={
                      user?.photoURL ||
                      'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                    }
                    alt="profile"
                    className="w-9 h-9 rounded-full border-2 border-red-500 object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {user?.displayName?.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-700 mb-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                        Account
                      </p>
                      <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                        {user?.displayName}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-red-600 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-colors"
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
                  className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 font-semibold hover:text-red-600 transition-all px-4 py-2"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-red-700 transition-all active:scale-95"
                >
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Section */}
          <div className="md:hidden flex items-center gap-3">
            {/* মোবাইল মোডেও থিম টগল */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-yellow-400"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
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
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 px-4 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold px-4 py-2 rounded-lg ${isActive ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'text-gray-700 dark:text-gray-300'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          {/* ... বাকি মোবাইল কন্টেন্ট আপনার আগের কোডের মতই থাকবে ... */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
