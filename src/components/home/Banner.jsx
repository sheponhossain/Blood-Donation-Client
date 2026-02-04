import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-br from-red-50 to-white min-h-[600px] flex items-center overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fadeInLeft">
          <div className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-sm tracking-wide uppercase">
            ❤️ Saving Lives Since 2024
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Donate <span className="text-red-600">Blood</span>, <br />
            Inspire{' '}
            <span className="relative inline-block">
              Hope.
              <span className="absolute bottom-2 left-0 w-full h-3 bg-red-200 -z-10"></span>
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl w leading-relaxed">
            Your contribution can make a difference between life and death. Join
            our community of heroes and help us bridge the gap between donors
            and recipients.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link
              to="/register"
              className="group relative w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold rounded-xl shadow-xl shadow-red-200 hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Join as a Donor</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>

            <Link
              to="/search"
              className="w-full sm:w-auto px-8 py-4 border-2 border-red-600 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              Search Donors
            </Link>
          </div>
        </div>

        {/* Right Images (Modern Stack Design) */}
        <div className="relative flex justify-center items-center h-[400px] lg:h-[500px]">
          {/* Main Large Image */}
          <div className="absolute w-[80%] h-[70%] rounded-3xl overflow-hidden shadow-2xl z-20 border-4 border-white transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=800&q=80"
              alt="Donor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Secondary Smaller Image */}
          <div className="absolute bottom-0 left-0 w-[50%] h-[40%] rounded-3xl overflow-hidden shadow-2xl z-30 border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?auto=format&fit=crop&w=600&q=80"
              alt="Blood Bag"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Abstract Shape */}
          <div className="absolute top-10 right-0 w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-center text-sm p-4 shadow-lg z-30 animate-bounce">
            100% Secure & Fast
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
