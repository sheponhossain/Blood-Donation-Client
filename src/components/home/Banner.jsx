import React from 'react';
import { Link } from 'react-router';
import BloodDonationBG from '../../assets/BloodDonationBG.mp4';

const Banner = () => {
  return (
    // h-[60vh] lg:h-[70vh] দিয়ে হাইট ৬০% থেকে ৭০% এর মধ্যে রাখা হয়েছে
    <div className="relative w-full h-[60vh] lg:h-[70vh] min-h-[450px] max-h-[750px] flex items-center overflow-hidden bg-black">
      {/* --- Video Background --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={BloodDonationBG} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
        {/* Left Content */}
        <div className="space-y-4 lg:space-y-6 animate-fadeInLeft">
          <div className="inline-block px-4 py-1 rounded-full bg-red-600 text-white font-semibold text-[10px] lg:text-xs tracking-wide uppercase shadow-lg shadow-red-900/20">
            ❤️ Saving Lives Since 2024
          </div>

          <h1 className="text-3xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">
            Donate <span className="text-red-500">Blood</span>, <br />
            Inspire{' '}
            <span className="relative inline-block">
              Hope.
              <span className="absolute bottom-1 lg:bottom-2 left-0 w-full h-2 lg:h-3 bg-red-600/40 -z-10"></span>
            </span>
          </h1>

          <p className="text-gray-300 text-sm lg:text-lg max-w-lg leading-relaxed font-medium">
            Your contribution can make a difference between life and death. Join
            our community of heroes and help us bridge the gap.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-5 pt-2">
            <Link
              to="/register"
              className="group relative w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 text-center active:scale-95"
            >
              Join as a Donor
            </Link>

            <Link
              to="/search"
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
      </div>
    </div>
  );
};

export default Banner;
