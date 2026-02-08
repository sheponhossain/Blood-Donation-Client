import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
  Activity,
  ShieldCheck,
  Eye,
  CheckCircle,
  XCircle,
  Lock,
  Search,
  ArrowUpDown,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const VolunteerAllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fakeRequests = [
    {
      _id: '1',
      recipientName: 'Ariful Islam',
      recipientDistrict: 'Dhaka',
      recipientUpazila: 'Dhanmondi',
      bloodGroup: 'O+',
      status: 'inprogress',
      donorName: 'Rahat Khan',
      donorEmail: 'rahat@gmail.com',
      requesterName: 'Sumi Akter',
    },
    {
      _id: '2',
      recipientName: 'Kamal Uddin',
      recipientDistrict: 'Chittagong',
      recipientUpazila: 'Pahartali',
      bloodGroup: 'A-',
      status: 'pending',
      donorName: null,
      donorEmail: null,
      requesterName: 'Anwar Hossain',
    },
    {
      _id: '3',
      recipientName: 'Nusrat Jahan',
      recipientDistrict: 'Sylhet',
      recipientUpazila: 'Zindabazar',
      bloodGroup: 'B+',
      status: 'done',
      donorName: 'Sajid Hasan',
      donorEmail: 'sajid@yahoo.com',
      requesterName: 'Fahim Shahriar',
    },
    {
      _id: '4',
      recipientName: 'Zakir Hossain',
      recipientDistrict: 'Rajshahi',
      recipientUpazila: 'Motihar',
      bloodGroup: 'AB+',
      status: 'canceled',
      donorName: null,
      donorEmail: null,
      requesterName: 'Emon Ahmed',
    },
    {
      _id: '5',
      recipientName: 'Mst. Rokeya',
      recipientDistrict: 'Barisal',
      recipientUpazila: 'Sadar',
      bloodGroup: 'O-',
      status: 'inprogress',
      donorName: 'Tanvir Sadek',
      donorEmail: 'tanvir@outlook.com',
      requesterName: 'Jashim Uddin',
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // const res = await axiosSecure.get('/all-blood-donation-requests');
        // setRequests(res.data);
        setRequests(fakeRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
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
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#f1f5f9',
      confirmButtonText: 'Yes, Update',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/donation-request/status/${id}`, {
          status: newStatus,
        });
        if (res.data.modifiedCount > 0) {
          setRequests(
            requests.map((req) =>
              req._id === id ? { ...req, status: newStatus } : req
            )
          );
          Swal.fire(
            'Updated!',
            `Request status changed to ${newStatus}.`,
            'success'
          );
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        Swal.fire('Error', 'Unauthorized action.', 'error');
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
      {/* Volunteer Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-100 italic font-black">
              <Activity size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
              Requests Pool
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" /> Volunteer
              Mode
            </span>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
              Monitoring System Active
            </p>
          </div>
        </div>

        {/* Pro Filter UI */}
        <div className="bg-white p-2 rounded-[20px] shadow-xl shadow-slate-100 border border-slate-50 flex items-center group transition-all focus-within:ring-2 focus-within:ring-slate-100">
          <Filter size={18} className="text-slate-400 ml-3" />
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-48 bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-[0.2em] text-slate-700 cursor-pointer p-3 focus:ring-0"
          >
            <option value="all">Display: All Requests</option>
            <option value="pending">Status: Pending</option>
            <option value="inprogress">Status: In Progress</option>
            <option value="done">Status: Done</option>
            <option value="canceled">Status: Canceled</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/40 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] border-b border-slate-100">
                <th className="px-8 py-8">Recipient & Location</th>
                <th className="px-8 py-8 text-center">Group</th>
                <th className="px-8 py-8">Live Status</th>
                <th className="px-8 py-8">Donor Records</th>
                <th className="px-8 py-8 text-right">Volunteer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.length > 0 ? (
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
                        {req.recipientDistrict}, {req.recipientUpazila}
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
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-50'
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
                            {req.donorName}
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
                        {/* 🚫 ভলান্টিয়ারের অ্যাকশন লজিক: শুধুমাত্র ইন-প্রগ্রেস হলে আপডেট বাটন আসবে */}
                        {req.status === 'inprogress' ? (
                          <div className="flex gap-1.5 bg-slate-50 p-1 rounded-2xl border border-slate-100 shadow-inner">
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'done')
                              }
                              className="px-4 py-2 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-sm active:scale-95"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'canceled')
                              }
                              className="px-4 py-2 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-sm active:scale-95"
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

                        {/* View Details Link */}
                        <Link
                          to={`/dashboard/donation-details/${req._id}`}
                          className="p-3.5 bg-white text-slate-400 hover:text-red-600 rounded-[18px] transition-all border border-slate-100 hover:shadow-xl hover:-translate-y-0.5"
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
                    <div className="flex flex-col items-center gap-3">
                      <Search size={40} className="text-slate-200" />
                      <p className="font-black text-slate-300 uppercase tracking-[0.5em] italic">
                        No Records Found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="p-10 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              Global Registry Monitor
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
