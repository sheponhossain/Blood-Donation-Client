import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import {
  Menu,
  X,
  Droplets,
  ChevronDown,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = {
    displayName: 'John Doe',
    photoURL: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donation Requests', path: '/donation-requests' },
    { name: 'Funding', path: '/funding' },
  ];

  const activeStyle =
    'text-red-600 font-semibold border-b-2 border-red-600 pb-1';
  const normalStyle =
    'text-gray-600 hover:text-red-500 transition-all duration-300';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <Logo />
          {/* Desktop Nav Links */}
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

          {/* User Profile / Auth Buttons */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-gray-50 p-1 pr-3 rounded-full hover:bg-gray-100 transition"
                >
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-red-50"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-left">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-red-700 shadow-lg shadow-red-200 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-lg text-gray-700 font-medium"
            >
              {link.name}
            </Link>
          ))}
          <hr />
          {user ? (
            <>
              <Link to="/dashboard" className="block text-lg text-gray-700">
                Dashboard
              </Link>
              <button className="text-lg text-red-600 font-bold">Logout</button>
            </>
          ) : (
            <Link
              to="/login"
              className="block w-full text-center bg-red-600 text-white py-3 rounded-xl font-bold"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
