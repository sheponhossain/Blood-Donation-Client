import { Droplets } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-red-100 p-2 rounded-lg">
          <Droplets className="w-8 h-8 text-red-600" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-red-600">
          Blood <span className="text-gray-800">Donation</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
