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
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useTheme } from '../context/ThemeContext';

const BloodRequests = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get('/donation-requests-pending');
        setRequests(response.data);
      } catch (err) {
        console.error('Axios Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-16 px-4 transition-colors">
        <div className="max-w-6xl mx-auto">
          {/* Skeleton Header */}
          <div className="flex flex-col items-center mb-16 space-y-4">
            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse"></div>
            <div className="h-12 w-3/4 md:w-1/2 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex justify-between">
                  <div className="space-y-3 w-2/3">
                    <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                    <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                  </div>
                  <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                </div>
                <div className="h-16 w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
                  <div className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
                </div>
                <div className="h-14 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
              {requests.length} Active Requests
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 uppercase">
            Donate Blood,{' '}
            <span className="text-red-600 italic">Save a Life</span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
            Browse urgent blood requirements in your area. Your one decision can
            give someone a new chance to live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-red-200/30 dark:hover:shadow-red-900/10 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="p-6 flex justify-between items-start">
                <div className="space-y-1 max-w-[70%]">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase font-black text-[9px] tracking-[0.2em] truncate">
                    <Hospital size={12} className="text-red-500 shrink-0" />{' '}
                    {req.hospitalName}
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                    {req.recipientName}
                  </h3>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-red-100 dark:border-red-900/40 group-hover:bg-red-600 dark:group-hover:bg-red-700 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                  <span className="text-lg font-black leading-none">
                    {req.bloodGroup}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-tighter">
                    Group
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100/50 dark:border-slate-700/50">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    <MapPin size={16} className="text-red-500" />
                  </div>
                  <div className="truncate">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase leading-none mb-1">
                      Location
                    </p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight truncate">
                      {req.district || req.recipientUpazila},{' '}
                      {req.division || req.recipientDistrict}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100/50 dark:border-slate-700/50 flex items-center gap-3">
                    <Calendar
                      size={14}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <div>
                      <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase">
                        Date
                      </p>
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {req.donationDate}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100/50 dark:border-slate-700/50 flex items-center gap-3">
                    <Clock
                      size={14}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <div>
                      <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase">
                        Time
                      </p>
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {req.donationTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/blood-details/${req._id}`}
                  className="w-full bg-slate-900 dark:bg-slate-800 group-hover:bg-red-600 dark:group-hover:bg-red-700 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-slate-200 dark:shadow-none group-hover:shadow-red-200 active:scale-[0.98]"
                >
                  View Details <Heart size={14} className="animate-pulse" />
                </Link>
              </div>

              <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
            </div>
          ))}
        </div>

        {/* Empty State (ডার্ক মোড সাপোর্ট সহ) */}
        {!loading && requests.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <Search
              size={48}
              className="mx-auto text-slate-200 dark:text-slate-700 mb-4"
            />
            <p className="font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest italic">
              No urgent requests at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequests;
