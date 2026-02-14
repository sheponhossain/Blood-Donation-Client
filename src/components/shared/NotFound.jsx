import React from 'react';
import { Link, useNavigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background Large 404 Text */}
      <h1 className="absolute text-[20vw] font-black text-gray-100 select-none z-0">
        404
      </h1>

      {/* Animation as a Focal Point (No Borders/Cards) */}
      <div className="relative z-10 w-full max-w-[300px] md:max-w-[400px] pointer-events-none">
        <DotLottieReact
          src="https://lottie.host/d2b6a242-2026-4973-8dac-e9f710d896a7/5nnTauuXUd.lottie"
          loop
          autoplay
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 text-center -mt-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Lost in the <span className="text-[#e63946]">Crimson</span> Flow?
        </h2>

        <p className="text-gray-500 text-lg md:text-xl max-w-md mx-auto mb-10 font-medium">
          This blood drop took a detour. Let's get you back to where you can
          make a difference.
        </p>

        {/* Clean Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-[#e63946] font-bold tracking-widest uppercase text-sm transition-colors duration-300"
          >
            [ Go Back ]
          </button>

          <Link
            to="/"
            className="px-10 py-4 bg-[#e63946] text-white font-bold rounded-full hover:bg-black transition-all duration-300 shadow-xl shadow-red-100 hover:shadow-none"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Subtle Bottom Text */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-gray-300 text-xs uppercase tracking-[5px]">
          Your single drop can create an ocean of hope
        </p>
      </div>
    </div>
  );
};

export default NotFound;
