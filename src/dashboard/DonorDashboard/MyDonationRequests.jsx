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
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // ডিফল্ট ফিল্টার
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/donation-request/${id}`);
          if (res.data.deletedCount > 0) {
            setRequests((prevRequests) =>
              prevRequests.filter((req) => req._id !== id)
            );
            Swal.fire(
              'Deleted!',
              'Successfully removed from database.',
              'success'
            );
          }
        } catch (error) {
          console.error('Full Error:', error.response);
          Swal.fire('Error!', 'Something went wrong', 'error');
        }
      }
    });
  };

  // ২. ফিল্টারিং লজিক (নতুনভাবে হ্যান্ডেল করা হয়েছে)
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
      <div className="text-center py-20 font-black italic">Loading...</div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm">
        <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tight">
          My <span className="text-red-600">Donation</span> Requests
        </h2>

        {/* --- ফিল্টার ড্রপডাউন --- */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest">
            <Filter size={14} /> Filter:
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1); // ফিল্টার চেঞ্জ হলে ১ম পেজে নিয়ে আসবে
            }}
            className="bg-slate-50 border-none px-4 py-2 rounded-xl font-bold text-xs text-slate-700 focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer"
          >
            <option value="all">ALL REQUESTS</option>
            <option value="pending">PENDING</option>
            <option value="inprogress">INPROGRESS</option>
            <option value="done">DONE</option>
            <option value="canceled">CANCELED</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-6">Recipient</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Date & Time</th>
                <th className="px-8 py-6 text-center">Group</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-8 py-6 font-black text-slate-800">
                      {req.recipientName}
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold text-xs italic">
                      <div className="flex items-center gap-1 text-[10px]">
                        <MapPin size={12} className="text-red-500" />{' '}
                        {req.district}, {req.division}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-slate-700 flex flex-col uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {req.donationDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {req.donationTime}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          req.status === 'pending'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : req.status === 'inprogress'
                              ? 'bg-blue-50 text-blue-600 border-blue-100'
                              : req.status === 'done'
                                ? 'bg-green-50 text-green-600 border-green-100'
                                : 'bg-slate-50 text-slate-500 border-slate-100'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          className="p-2 text-slate-400 hover:text-amber-500 transition-colors"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <Link
                          to={`/dashboard/donation-details/${req._id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-20 text-center font-black text-slate-300 uppercase italic tracking-widest"
                  >
                    No {filterStatus !== 'all' ? filterStatus : ''} requests
                    found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-slate-50/50 px-8 py-6 flex items-center justify-between border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Showing {paginatedData.length} of {filteredData.length} Requests
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                    currentPage === index + 1
                      ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
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
