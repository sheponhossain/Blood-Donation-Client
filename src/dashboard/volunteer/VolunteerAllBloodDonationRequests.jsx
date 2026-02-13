import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
  Activity,
  ShieldCheck,
  Eye,
  Lock,
  Search,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const VolunteerAllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get('/donation-requests');
        setRequests(res.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        Swal.fire('Error', 'Failed to load requests from server', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleStatusUpdate = async (id, newStatus) => {
    const result = await Swal.fire({
      title: 'Update Status?',
      text: `Are you sure you want to change status to ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, Confirm',
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donation-request/${id}`, {
          status: newStatus,
        });

        if (res.data.modifiedCount > 0 || res.data.acknowledged) {
          setRequests((prev) =>
            prev.map((req) =>
              req._id === id ? { ...req, status: newStatus } : req
            )
          );
          Swal.fire('Updated!', `Status changed to ${newStatus}.`, 'success');
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        Swal.fire('Error', 'Unauthorized or server error.', 'error');
      }
    }
  };

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return requests;
    return requests.filter((req) => req.status === filterStatus);
  }, [requests, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 px-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-100 italic font-black">
              <Activity size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              Donation Pool
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" /> Volunteer
              Access
            </span>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
              Monitoring All Requests
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white p-2 rounded-[20px] shadow-xl shadow-slate-100 border border-slate-50 flex items-center group transition-all">
          <Filter size={18} className="text-slate-400 ml-3" />
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            value={filterStatus}
            className="w-full lg:w-48 bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 cursor-pointer p-3"
          >
            <option value="all">Display: All Status</option>
            <option value="pending">Status: Pending</option>
            <option value="inprogress">Status: In Progress</option>
            <option value="done">Status: Done</option>
            <option value="canceled">Status: Canceled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-100">
                <th className="px-8 py-8">Recipient & Details</th>
                <th className="px-8 py-8 text-center">Blood Group</th>
                <th className="px-8 py-8">Live Status</th>
                <th className="px-8 py-8">Donor Info</th>
                <th className="px-8 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 animate-pulse">
                      <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="font-black text-slate-300 uppercase italic tracking-widest">
                        Fetching Registry...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-slate-50/40 transition-all"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 tracking-tight text-base">
                        {req.recipientName}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mt-1">
                        <MapPin size={12} className="text-red-500" />{' '}
                        {req.district}, {req.hospitalName}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-block w-12 py-2 bg-red-50 text-red-600 rounded-xl font-black text-xs border border-red-100">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          req.status === 'pending'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : req.status === 'inprogress'
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-50'
                              : req.status === 'done'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {req.donorEmail ? (
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-800 uppercase leading-none">
                            {req.donorName || 'N/A'}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 italic">
                            {req.donorEmail}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 uppercase italic tracking-tighter">
                          Searching...
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-3">
                        {req.status === 'inprogress' ? (
                          <div className="flex gap-1.5 bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-inner">
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'done')
                              }
                              className="px-4 py-2 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-sm"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'canceled')
                              }
                              className="px-4 py-2 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="px-5 py-2 text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 italic">
                            <Lock size={12} className="opacity-50" />{' '}
                            {req.status === 'pending' ? 'Locked' : 'Closed'}
                          </div>
                        )}
                        <Link
                          to={`/dashboard/donation-details/${req._id}`}
                          className="p-3.5 bg-white text-slate-400 hover:text-red-600 rounded-[18px] transition-all border border-slate-100"
                        >
                          <Eye size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-300">
                      <Search size={40} />
                      <p className="font-black uppercase tracking-[0.5em] italic">
                        No Records Found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-10 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              Volunteer Monitor
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-red-600 transition-all disabled:opacity-20 shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-2xl scale-110' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-red-600 transition-all disabled:opacity-20 shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerAllBloodDonationRequests;
