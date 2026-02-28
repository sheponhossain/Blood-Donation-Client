import React, { useState, useMemo, useEffect, useContext } from 'react';
import {
  Edit2,
  Trash2,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
  User,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTheme } from '../../context/ThemeContext';

const MyDonationRequests = () => {
  const { theme } = useTheme(); // ২. গ্লোবাল থিম স্টেট
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-donation-requests/${user?.email}`)
        .then((res) => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      confirmButtonText: 'Yes, delete it!',
      background: theme === 'dark' ? '#1e293b' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/donation-request/${id}`);
          if (res.data.deletedCount > 0) {
            setRequests((prevRequests) =>
              prevRequests.filter((req) => req._id !== id)
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'Successfully removed from database.',
              icon: 'success',
              background: theme === 'dark' ? '#1e293b' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
            });
          }
        } catch (error) {
          console.error('Full Error:', error.response);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong',
            icon: 'error',
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
          });
        }
      }
    });
  };

  const filteredData = useMemo(() => {
    return filterStatus === 'all'
      ? requests
      : requests.filter((req) => req.status === filterStatus);
  }, [requests, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading)
    return (
      <div className="text-center py-20 font-black italic dark:text-slate-500">
        Loading...
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10 transition-colors duration-300">
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[30px] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
        <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight">
          My <span className="text-red-600">Donation</span> Requests
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest">
            <Filter size={14} /> Filter:
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 dark:bg-slate-800 border-none px-4 py-2 rounded-xl font-bold text-xs text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer"
          >
            <option value="all">ALL REQUESTS</option>
            <option value="pending">PENDING</option>
            <option value="inprogress">INPROGRESS</option>
            <option value="done">DONE</option>
            <option value="canceled">CANCELED</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-6">Recipient</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Date & Time</th>
                <th className="px-8 py-6 text-center">Group</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {paginatedData.length > 0 ? (
                paginatedData.map((req) => (
                  <React.Fragment key={req._id}>
                    <tr
                      className={`group transition-all ${req.status === 'inprogress' ? 'bg-blue-50/20 dark:bg-blue-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}
                    >
                      <td className="px-8 py-6 font-black text-slate-800 dark:text-slate-200">
                        {req.recipientName}
                      </td>
                      <td className="px-8 py-6 text-slate-500 dark:text-slate-400 font-bold text-xs italic">
                        <div className="flex items-center gap-1 text-[10px]">
                          <MapPin size={12} className="text-red-500" />{' '}
                          {req.district}, {req.division}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-[10px] font-black text-slate-700 dark:text-slate-300 flex flex-col uppercase">
                          <span className="flex items-center gap-1">
                            <Calendar
                              size={12}
                              className="text-slate-400 dark:text-slate-500"
                            />{' '}
                            {req.donationDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock
                              size={12}
                              className="text-slate-400 dark:text-slate-500"
                            />{' '}
                            {req.donationTime}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                              req.status === 'pending'
                                ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50'
                                : req.status === 'inprogress'
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-100 dark:shadow-none'
                                  : req.status === 'done'
                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {req.status}
                          </span>
                          {req.status === 'inprogress' && req.donorName && (
                            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-start bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-2xl border border-blue-100 dark:border-blue-900/30 mt-1 min-w-[150px]">
                              <div className="flex items-center gap-1.5 mb-1">
                                <User
                                  size={12}
                                  className="text-blue-600 dark:text-blue-400"
                                />
                                <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">
                                  {req.donorName}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Mail
                                  size={10}
                                  className="text-blue-400 dark:text-blue-500"
                                />
                                <span className="text-[9px] font-bold text-blue-500 dark:text-blue-400 italic lowercase">
                                  {req.donorEmail}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-1">
                          <Link
                            to={`/dashboard/edit-donation-request/${req._id}`}
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-amber-500 transition-colors"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(req._id)}
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <Link
                            to={`/dashboard/donation-details/${req._id}`}
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors"
                          >
                            <Eye size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-20 text-center font-black text-slate-300 dark:text-slate-600 uppercase italic tracking-widest"
                  >
                    No {filterStatus !== 'all' ? filterStatus : ''} requests
                    found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-slate-50/50 dark:bg-slate-800/30 px-8 py-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Showing {paginatedData.length} of {filteredData.length} Requests
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                    currentPage === index + 1
                      ? 'bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-none'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonationRequests;
