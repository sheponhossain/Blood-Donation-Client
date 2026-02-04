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

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-red-600">🩸</span> LifeFlow
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Connecting heroes with those in need. Our platform makes blood
              donation simple, fast, and secure. Join us in our mission to save
              lives.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-red-500 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-red-600 w-fit">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="hover:text-red-500 transition-colors"
                >
                  Search Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/donation-requests"
                  className="hover:text-red-500 transition-colors"
                >
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-red-500 transition-colors"
                >
                  Become a Donor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-red-600 w-fit">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-600" /> +880 1234 567 890
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-red-600" /> support@lifeflow.com
              </li>
              <li className="flex items-center gap-3 border-t border-gray-800 pt-2 mt-2">
                <FaMapMarkerAlt className="text-red-600" /> Zahir Raihan Rd,
                Dhaka
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-red-600 w-fit">
              Newsletter
            </h3>
            <p className="text-xs text-gray-500 mb-4 italic">
              Get updates on emergency blood needs.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-red-600"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r-md text-white hover:bg-red-700 transition">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>
            © {new Date().getFullYear()} LifeFlow Blood Donation. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
