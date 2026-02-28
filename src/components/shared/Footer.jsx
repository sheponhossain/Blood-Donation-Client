import React from 'react';
import { Link } from 'react-router';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Logo from './Logo';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();

  return (
    <footer className="bg-gray-900 dark:bg-[#020617] text-gray-300 mt-20 border-t border-gray-800 dark:border-slate-800 transition-colors duration-300">
      <div className="w-full mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Info */}
          <div className="flex flex-col items-start space-y-5">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2 tracking-tight">
              <span className="text-red-600 drop-shadow-md">
                <Logo />
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 dark:text-slate-400 max-w-xs text-left">
              Connecting heroes with those in need. Our platform makes blood
              donation simple, fast, and secure. Join us in our mission to save
              lives.
            </p>
            <div className="flex gap-5 text-xl pt-2">
              <a
                href="#"
                className="hover:text-red-500 transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="text-left">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider text-sm">
                  Quick Links
                </h3>
                <div className="h-1 w-10 bg-red-600 mt-1"></div>
              </div>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <Link
                    to="/"
                    className="hover:text-red-500 hover:pl-2 transition-all duration-300 block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="hover:text-red-500 hover:pl-2 transition-all duration-300 block"
                  >
                    Search Donors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/donation-requests"
                    className="hover:text-red-500 hover:pl-2 transition-all duration-300 block"
                  >
                    Donation Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-red-500 hover:pl-2 transition-all duration-300 block"
                  >
                    Become a Donor
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="text-left">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider text-sm">
                  Contact Us
                </h3>
                <div className="h-1 w-10 bg-red-600 mt-1"></div>
              </div>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-start gap-4">
                  <FaPhoneAlt className="text-red-600 mt-1 shrink-0" />
                  <span className="hover:text-white transition-colors cursor-pointer">
                    +880 1234 567 890
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaEnvelope className="text-red-600 mt-1 shrink-0" />
                  <span className="hover:text-white transition-colors cursor-pointer">
                    support@BloodDonation.com
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-red-600 mt-1 shrink-0" />
                  <span className="leading-snug text-gray-400 dark:text-slate-400">
                    Zahir Raihan Rd, Dhaka-1200, Bangladesh
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-start lg:items-center">
            <div className="text-left w-full max-w-[260px]">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider text-sm">
                  Newsletter
                </h3>
                <div className="h-1 w-10 bg-red-600 mt-1"></div>
              </div>
              <p className="text-sm text-gray-400 dark:text-slate-400 italic leading-relaxed mb-5">
                Get instant updates on emergency blood needs.
              </p>
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 dark:bg-slate-800 border border-gray-700 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-sm text-white transition-colors"
                />
                <button className="w-full bg-red-600 py-3 rounded-lg text-white font-bold hover:bg-red-700 shadow-lg transition-all active:scale-95">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-500 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} BloodDonation. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-gray-300 dark:hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gray-300 dark:hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
