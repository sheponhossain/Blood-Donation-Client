import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
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
import { useTheme } from '../../context/ThemeContext';

const AllBloodDonationRequests = () => {
  const { theme } = useTheme();
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchAllRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://blood-donation-server-nu-lyart.vercel.app/donation-requests',
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );
      const data = await response.json();
      setAllRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(
        `https://blood-donation-server-nu-lyart.vercel.app/donation-request/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: `Status updated to ${newStatus}`,
          icon: 'success',
          background: theme === 'dark' ? '#1e293b' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        });
        fetchAllRequests();
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update status',
        icon: 'error',
        background: theme === 'dark' ? '#1e293b' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Request?',
      text: 'As an admin, you are removing this request from the system.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      confirmButtonText: 'Yes, Delete',
      background: theme === 'dark' ? '#1e293b' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://blood-donation-server-nu-lyart.vercel.app/donation-request/${id}`,
            {
              method: 'DELETE',
              headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`,
              },
            }
          );
          const data = await response.json();
          if (data.deletedCount > 0) {
            fetchAllRequests();
            Swal.fire({
              title: 'Removed!',
              text: 'Request has been deleted.',
              icon: 'success',
              background: theme === 'dark' ? '#1e293b' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
            });
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete', 'error');
        }
      }
    });
  };

  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return allRequests;
    return allRequests.filter((req) => req.status === filterStatus);
  }, [allRequests, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="animate-in fade-in duration-700 transition-colors">
      {/* Header & Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 italic">
            <span className="p-2 bg-slate-900 dark:bg-red-600 text-white rounded-xl">
              <LayoutGrid size={24} />
            </span>
            SYSTEM REQUESTS
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 ml-14">
            Monitoring and managing all blood donation requests globally.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="p-2 text-slate-400 dark:text-slate-500">
            <Filter size={18} />
          </div>
          <select
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-200 pr-8 cursor-pointer"
          >
            <option value="all" className="dark:bg-slate-900">
              Global Filter: All
            </option>
            <option value="pending" className="dark:bg-slate-900">
              Pending
            </option>
            <option value="inprogress" className="dark:bg-slate-900">
              In Progress
            </option>
            <option value="done" className="dark:bg-slate-900">
              Done
            </option>
            <option value="canceled" className="dark:bg-slate-900">
              Canceled
            </option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-6">Recipient & Requester</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6">Schedule</th>
                <th className="px-8 py-6 text-center">Group</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Donor Identity</th>
                <th className="px-8 py-6 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-8 py-20 text-center font-black text-slate-400 dark:text-slate-600 animate-pulse"
                  >
                    LOADING DATA...
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 dark:text-slate-200 tracking-tight">
                        {req.recipientName}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1 flex items-center gap-1 italic">
                        <User size={10} className="text-red-500" /> Req by:{' '}
                        {req.requesterName}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-red-600" />{' '}
                        {req.district}, {req.upazila}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar size={12} className="text-red-500" />{' '}
                          {req.donationDate}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                          <Clock size={12} /> {req.donationTime}
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
                            ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'
                            : req.status === 'inprogress'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-lg dark:shadow-none'
                              : req.status === 'done'
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {req.donorName ? (
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                          <p className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase leading-none">
                            {req.donorName}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1">
                            {req.donorEmail}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase italic">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        {req.status === 'inprogress' && (
                          <div className="flex gap-1 pr-2 border-r border-slate-100 dark:border-slate-800 mr-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'done')
                              }
                              className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                              title="Approve Done"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'canceled')
                              }
                              className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                              title="Force Cancel"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}
                        <Link
                          to={`/dashboard/donation-details/${req._id}`}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
                    className="px-8 py-10 text-center text-slate-400 dark:text-slate-600 font-bold"
                  >
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row justify-between items-center gap-4 border-t dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Total Global Records: {filteredData.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-600 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all ${
                    currentPage === i + 1
                      ? 'bg-slate-900 dark:bg-red-600 text-white shadow-xl'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
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
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-600 disabled:opacity-30 transition-colors"
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
