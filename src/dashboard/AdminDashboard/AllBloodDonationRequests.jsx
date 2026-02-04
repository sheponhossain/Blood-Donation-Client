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
  LayoutGrid,
  User,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllBloodDonationRequests = () => {
  // ১. Fake Global Data (সব ইউজারের রিকোয়েস্ট এখানে থাকবে)
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
      requester: 'Tanvir Ahmed',
    },
    {
      id: 5,
      recipientName: 'Liton Das',
      district: 'Rajshahi',
      upazila: 'Sadar',
      date: '2024-08-05',
      time: '03:00 PM',
      bloodGroup: 'O+',
      status: 'pending',
      donor: null,
      requester: 'Sakib Khan',
    },
  ]);

  // ২. ফিল্টারিং এবং প্যাগিনেশন স্টেট
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ৩. ফিল্টারিং লজিক (Admin Global View)
  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return allRequests;
    return allRequests.filter((req) => req.status === filterStatus);
  }, [allRequests, filterStatus]);

  // ৪. প্যাগিনেশন লজিক
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ৫. অ্যাকশন হ্যান্ডলারসমূহ (Admin Privileges)
  const handleStatusUpdate = (id, newStatus) => {
    setAllRequests(
      allRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    Swal.fire({
      title: 'Success!',
      text: `Status updated to ${newStatus}`,
      icon: 'success',
      confirmButtonColor: '#e11d48',
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Request?',
      text: 'As an admin, you are removing this request from the system.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        setAllRequests(allRequests.filter((req) => req.id !== id));
        Swal.fire(
          'Removed!',
          'Request has been permanently deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header & Filter Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 italic">
            <span className="p-2 bg-slate-900 text-white rounded-xl">
              <LayoutGrid size={24} />
            </span>
            SYSTEM REQUESTS
          </h1>
          <p className="text-slate-500 font-medium mt-1 ml-14">
            Monitoring and managing all blood donation requests globally.
          </p>
        </div>

        {/* Global Status Filter */}
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
            <option value="all">Global Filter: All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-8 py-6">Recipient & Requester</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Schedule</th>
                <th className="px-8 py-6 text-center">Group</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Donor Identity</th>
                <th className="px-8 py-6 text-right">Admin Actions</th>
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
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 flex items-center gap-1 italic">
                      <User size={10} className="text-red-500" /> Req by:{' '}
                      {req.requester}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-red-600" />{' '}
                      {req.upazila}, {req.district}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-[10px] font-black text-slate-700 uppercase">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={12} className="text-red-500" />{' '}
                        {req.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
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
                      <span className="text-[10px] font-bold text-slate-300 uppercase italic">
                        Not Assigned
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-1">
                      {req.status === 'inprogress' && (
                        <div className="flex gap-1 pr-2 border-r border-slate-100 mr-2">
                          <button
                            onClick={() => handleStatusUpdate(req.id, 'done')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Approve Done"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req.id, 'canceled')
                            }
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Force Cancel"
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Pagination */}
        {totalPages > 1 && (
          <div className="p-8 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Total Global Records: {filteredData.length}
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
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-white border border-slate-200 text-slate-400'}`}
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

export default AllBloodDonationRequests;
