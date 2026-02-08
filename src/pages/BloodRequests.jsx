import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Activity,
  Droplets,
  Heart,
  Hospital,
} from 'lucide-react';

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Pro Fake Data for Testing ---
  const fakeData = [
    {
      _id: '101',
      recipientName: 'Tahmid Hasan',
      recipientDistrict: 'Dhaka',
      recipientUpazila: 'Mirpur',
      bloodGroup: 'A+',
      donationDate: '15 Jun, 2024',
      donationTime: '10:30 AM',
      hospitalName: 'Square Hospital',
      status: 'pending',
    },
    {
      _id: '102',
      recipientName: 'Zubayer Ahmed',
      recipientDistrict: 'Chittagong',
      recipientUpazila: 'Halishahar',
      bloodGroup: 'O-',
      donationDate: '18 Jun, 2024',
      donationTime: '02:00 PM',
      hospitalName: 'Chittagong Medical',
      status: 'pending',
    },
    {
      _id: '103',
      recipientName: 'Fatima Khatun',
      recipientDistrict: 'Sylhet',
      recipientUpazila: 'Beanibazar',
      bloodGroup: 'B+',
      donationDate: '20 Jun, 2024',
      donationTime: '11:00 AM',
      hospitalName: 'Osmani Medical',
      status: 'pending',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(fakeData);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
            <Droplets
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600"
              size={24}
            />
          </div>
          <p className="mt-4 font-black text-slate-400 uppercase tracking-widest text-[10px]">
            Fetching Live Requests
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Modern Header */}
        <div className="text-center mb-16">
          {/* Badge Section */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-100 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
              Active Requests
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Donate Blood,{' '}
            <span className="text-red-600 italic">Save a Life</span>
          </h1>

          {/* Descriptive Subtext */}
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
            Browse urgent blood requirements in your area. Your one decision can
            give someone a new chance to live.
          </p>
        </div>

        {/* Professional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-red-200/30 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Top Section with Blood Group */}
              <div className="p-6 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 uppercase font-black text-[9px] tracking-[0.2em]">
                    <Hospital size={12} className="text-red-500" />{' '}
                    {req.hospitalName}
                  </div>
                  <h3 className="text-xl font-black text-slate-800 group-hover:text-red-600 transition-colors">
                    {req.recipientName}
                  </h3>
                </div>
                <div className="bg-red-50 text-red-600 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  <span className="text-lg font-black leading-none">
                    {req.bloodGroup}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter">
                    Group
                  </span>
                </div>
              </div>

              {/* Info Middle Section */}
              <div className="px-6 pb-6 space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <MapPin size={16} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">
                      Location
                    </p>
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 flex items-center gap-3">
                    <Calendar size={14} className="text-slate-400" />
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">
                        Date
                      </p>
                      <p className="text-[11px] font-bold text-slate-700">
                        {req.donationDate}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 flex items-center gap-3">
                    <Clock size={14} className="text-slate-400" />
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">
                        Time
                      </p>
                      <p className="text-[11px] font-bold text-slate-700">
                        {req.donationTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Footer Button */}
              <div className="p-6 pt-0">
                <Link
                  to={`/blood-details/${req._id}`}
                  className="w-full bg-slate-900 group-hover:bg-red-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-slate-200 group-hover:shadow-red-200 active:scale-[0.98]"
                >
                  Become a Donor <Heart size={14} className="animate-pulse" />
                </Link>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <Search size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="font-black text-slate-300 uppercase tracking-widest italic">
              No urgent requests at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequests;
