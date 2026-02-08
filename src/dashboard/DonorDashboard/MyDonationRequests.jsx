import React, { useState, useMemo } from 'react';
import {
  Edit2,
  Trash2,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  MapPin,
  Clock,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
  // ১. Fake Data (এটি সাধারণত API থেকে আসবে যেখানে requester email ফিল্টার করা থাকে)
  const [requests, setRequests] = useState([
    {
      id: 1,
      recipientName: 'Rahim Ali',
      location: 'Dhaka',
      date: '2024-05-15',
      time: '10:30 AM',
      bloodGroup: 'O+',
      status: 'inprogress',
      donorName: 'Kamal Hossain',
      donorEmail: 'kamal@mail.com',
    },
    {
      id: 2,
      recipientName: 'Karim Uddin',
      location: 'Chittagong',
      date: '2024-06-10',
      time: '02:00 PM',
      bloodGroup: 'A-',
      status: 'pending',
      donorName: '',
      donorEmail: '',
    },
    {
      id: 3,
      recipientName: 'Sara Islam',
      location: 'Sylhet',
      date: '2024-05-20',
      time: '11:00 AM',
      bloodGroup: 'AB+',
      status: 'done',
      donorName: 'Sumon Ali',
      donorEmail: 'sumon@mail.com',
    },
    {
      id: 4,
      recipientName: 'Abul Mia',
      location: 'Barisal',
      date: '2024-07-01',
      time: '09:00 AM',
      bloodGroup: 'B+',
      status: 'canceled',
      donorName: '',
      donorEmail: '',
    },
    // আরও কিছু ফেক ডাটা পেজিনেশন টেস্ট করার জন্য...
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ২. ফিল্টারিং লজিক
  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return requests;
    return requests.filter((req) => req.status === filterStatus);
  }, [requests, filterStatus]);

  // ৩. পেজিনেশন লজিক
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#1e293b',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter((req) => req.id !== id));
        Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 italic uppercase">
            <span className="p-2 bg-red-600 text-white rounded-xl shadow-lg shadow-red-100">
              <LayoutList size={24} />
            </span>
            My Requests
          </h1>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2 ml-1">
            Manage your blood donation requests
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto">
          <Filter size={18} className="text-slate-400 ml-2" />
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest text-slate-700 cursor-pointer w-full md:w-48"
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
                <th className="px-8 py-6">Donor Info</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.length > 0 ? (
                paginatedData.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-8 py-6 font-black text-slate-800 tracking-tight">
                      {req.recipientName}
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold text-xs uppercase italic tracking-tighter">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-500" />{' '}
                        {req.location}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-slate-700 flex flex-col gap-1 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />{' '}
                          {req.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />{' '}
                          {req.time}
                        </span>
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
                      {req.status === 'inprogress' || req.status === 'done' ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-black text-slate-800 uppercase leading-none">
                            {req.donorName}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">
                            {req.donorEmail}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 italic tracking-tighter">
                          No Donor Found
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/dashboard/edit-donation-request/${req.id}`}
                          className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <Link
                          to={`/dashboard/donation-details/${req.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
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
                    colSpan="7"
                    className="px-8 py-20 text-center font-black text-slate-300 uppercase tracking-[0.3em] italic"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-8 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Showing Page {currentPage} of {totalPages}
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
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-red-600 text-white shadow-xl shadow-red-100' : 'bg-white border border-slate-200 text-slate-400'}`}
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

export default MyDonationRequests;
