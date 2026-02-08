import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Droplets,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  User,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllBloodDonationRequests = () => {
  // ১. Fake Global Data
  const [allRequests, setAllRequests] = useState([
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
      requester: 'John Doe',
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
      requester: 'Musa Ibrahim',
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
      requester: 'Fatima Khatun',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ২. ফিল্টারিং লজিক (অ্যাডমিনের মতো হুবহু)
  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return allRequests;
    return allRequests.filter((req) => req.status === filterStatus);
  }, [allRequests, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ৩. শুধুমাত্র স্ট্যাটাস আপডেট হ্যান্ডলার (ভলান্টিয়ারের অনুমোদিত অ্যাকশন)
  const handleStatusUpdate = (id, newStatus) => {
    setAllRequests(
      allRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    Swal.fire({
      title: 'Status Updated!',
      text: `Request status changed to ${newStatus}`,
      icon: 'success',
      confirmButtonColor: '#dc2626',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 italic uppercase">
            <span className="p-2 bg-slate-900 text-white rounded-xl">
              <LayoutGrid size={24} />
            </span>
            Global Requests
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
              <Shield size={12} /> Volunteer Access
            </span>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">
              Status updates only
            </p>
          </div>
        </div>

        {/* Global Filter (Same as Admin) */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full lg:w-auto">
          <Filter size={18} className="text-slate-400 ml-2" />
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-48 bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest text-slate-700 cursor-pointer"
          >
            <option value="all">Filter: All Records</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-6">Recipient</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6 text-center">Group</th>
                <th className="px-8 py-6">Current Status</th>
                <th className="px-8 py-6">Donor Info</th>
                <th className="px-8 py-6 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-50/30 transition-all"
                >
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-800 tracking-tight">
                      {req.recipientName}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 flex items-center gap-1">
                      By: {req.requester}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                      <MapPin size={14} className="text-red-600" />{' '}
                      {req.upazila}, {req.district}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs shadow-md shadow-red-50">
                      {req.bloodGroup}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        req.status === 'pending'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : req.status === 'inprogress'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
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
                        <p className="text-[10px] font-black text-slate-800 uppercase leading-none">
                          {req.donor.name}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 mt-1">
                          {req.donor.email}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase italic tracking-tighter">
                        No Donor Info
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Volunteers only get Done/Cancel buttons when status is inprogress */}
                      {req.status === 'inprogress' ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(req.id, 'done')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Mark as Done"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req.id, 'canceled')
                            }
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Mark as Canceled"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      ) : (
                        <div className="pr-4 italic text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          {req.status === 'done'
                            ? 'Completed'
                            : req.status === 'canceled'
                              ? 'Closed'
                              : 'Waiting for Donor'}
                        </div>
                      )}

                      {/* View Button remains for all */}
                      <Link
                        to={`/dashboard/donation-details/${req.id}`}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Eye size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Section (Same as Admin) */}
        {totalPages > 1 && (
          <div className="p-8 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              Global Monitoring Active
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 transition-all disabled:opacity-20"
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border border-slate-200 text-slate-400'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 transition-all disabled:opacity-20"
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

export default AllBloodDonationRequests;
