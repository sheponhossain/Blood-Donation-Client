import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Droplets,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
  // ১. Fake Data - রিয়েল প্রজেক্টে এটি API থেকে আসবে
  const [requests, setRequests] = useState([
    {
      id: 1,
      recipientName: 'Rahim Ali',
      district: 'Dhaka',
      upazila: 'Mirpur',
      date: '2024-05-15',
      time: '10:30 AM',
      bloodGroup: 'O+',
      status: 'inprogress',
      donor: { name: 'Sumon Khan', email: 'sumon@mail.com' },
    },
    {
      id: 2,
      recipientName: 'Karim Uddin',
      district: 'Chittagong',
      upazila: 'Pahartali',
      date: '2024-06-10',
      time: '02:00 PM',
      bloodGroup: 'A-',
      status: 'pending',
      donor: null,
    },
    {
      id: 3,
      recipientName: 'Sara Islam',
      district: 'Sylhet',
      upazila: 'Beanibazar',
      date: '2024-05-20',
      time: '11:00 AM',
      bloodGroup: 'AB+',
      status: 'done',
      donor: { name: 'Kamal Hasan', email: 'kamal@mail.com' },
    },
    {
      id: 4,
      recipientName: 'Abul Hasnat',
      district: 'Barisal',
      upazila: 'Sadar',
      date: '2024-07-01',
      time: '09:00 AM',
      bloodGroup: 'B+',
      status: 'canceled',
      donor: null,
    },
    {
      id: 5,
      recipientName: 'Musa Ibrahim',
      district: 'Dhaka',
      upazila: 'Gulshan',
      date: '2024-08-12',
      time: '04:30 PM',
      bloodGroup: 'O-',
      status: 'pending',
      donor: null,
    },
    // প্যাগিনেশন টেস্ট করার জন্য আরও ডাটা যোগ করা যেতে পারে...
  ]);

  // ২. ফিল্টারিং এবং প্যাগিনেশন স্টেট
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ৩. ফিল্টারিং লজিক
  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return requests;
    return requests.filter((req) => req.status === filterStatus);
  }, [requests, filterStatus]);

  // ৪. প্যাগিনেশন লজিক
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ৫. হ্যান্ডলার ফাংশনসমূহ
  const handleStatusUpdate = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    Swal.fire({
      title: 'Updated!',
      text: `Status is now ${newStatus}`,
      icon: 'success',
      confirmButtonColor: '#dc2626',
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter((req) => req.id !== id));
        Swal.fire('Deleted!', 'Request has been removed.', 'success');
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="p-2 bg-red-600 text-white rounded-xl">
              <Droplets size={24} />
            </span>
            My Donation Requests
          </h1>
          <p className="text-slate-500 font-medium mt-1 ml-14">
            Manage and track all your blood requests in one place.
          </p>
        </div>

        {/* Status Filter Component */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="p-2 text-slate-400">
            <Filter size={18} />
          </div>
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest text-slate-700 pr-8 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Recipient Name</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Date & Time</th>
                <th className="px-8 py-6 text-center">Group</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Donor Info</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50/50 transition-all"
                  >
                    <td className="px-8 py-6 font-black text-slate-800">
                      {req.recipientName}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        <MapPin size={14} className="text-red-600" />{' '}
                        {req.upazila}, {req.district}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs font-black text-slate-700 uppercase tracking-tighter">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={12} className="text-red-500" />{' '}
                          {req.date}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-bold">
                          <Clock size={12} /> {req.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                          req.status === 'pending'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : req.status === 'inprogress'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-blue-100'
                              : req.status === 'done'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {req.status === 'inprogress' && req.donor ? (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-black text-slate-800 uppercase">
                            {req.donor.name}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400">
                            {req.donor.email}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 uppercase italic">
                          Waiting...
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        {req.status === 'inprogress' && (
                          <div className="flex gap-1 pr-2 border-r mr-2">
                            <button
                              onClick={() => handleStatusUpdate(req.id, 'done')}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                              title="Done"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req.id, 'canceled')
                              }
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Cancel"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}
                        <Link
                          to={`/dashboard/donation-details/${req.id}`}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/dashboard/edit-donation-request/${req.id}`}
                          className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No matching requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="p-8 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
              {filteredData.length} Requests
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 disabled:opacity-30 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all ${
                    currentPage === i + 1
                      ? 'bg-red-600 text-white shadow-lg shadow-red-100'
                      : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 disabled:opacity-30 transition-all"
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
