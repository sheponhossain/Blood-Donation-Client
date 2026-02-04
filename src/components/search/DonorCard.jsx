import React from 'react';
import { FaMapMarkerAlt, FaTint, FaPhoneAlt } from 'react-icons/fa';

const DonorCard = () => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 relative">
      {/* Top Accent Bar */}
      <div className="h-2 bg-red-600 w-full"></div>

      <div className="p-6">
        {/* Header: Avatar & Blood Group */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-50 shadow-inner">
            <img
              src="https://i.pravatar.cc/150?u=donor"
              alt="Donor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-red-50 text-red-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm">
            <span className="text-xl font-black italic">O+</span>
          </div>
        </div>

        {/* Donor Info */}
        <div className="space-y-1 mb-6">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
            Abir Rahman
          </h3>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Regular Donor
          </p>
        </div>

        {/* Location & Details */}
        <div className="space-y-3 pt-4 border-t border-gray-50">
          <div className="flex items-center gap-3 text-gray-600">
            <FaMapMarkerAlt className="text-red-500 shrink-0" />
            <span className="text-sm font-medium">Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FaTint className="text-red-500 shrink-0" />
            <span className="text-sm font-medium italic underline decoration-red-200 underline-offset-4">
              Last Donated: 3 months ago
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-6 bg-gray-900 group-hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2">
          <FaPhoneAlt size={14} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default DonorCard;
