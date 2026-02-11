import React, { useState, useMemo, useEffect, useContext } from 'react'; // useEffect o useContext add kora hoyeche
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
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ২. Database theke data fetch kora
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

  // ৩. Delete Logic (Real Delete from DB)
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48', // Red color for confirm
      cancelButtonColor: '#1e293b', // Slate color for cancel
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'rounded-[30px]', // আপনার থিমের সাথে মিল রেখে
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Backend API call
          const res = await axiosSecure.delete(`/donation-request/${id}`);

          // Mongoose/MongoDB delete result check
          if (res.data.deletedCount > 0) {
            const remainingRequests = requests.filter((req) => req._id !== id);
            setRequests(remainingRequests);

            if (paginatedData.length === 1 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }

            // ২. সাকসেস মেসেজ
            Swal.fire({
              title: 'Deleted!',
              text: 'Your request has been removed.',
              icon: 'success',
              confirmButtonColor: '#e11d48',
              customClass: { popup: 'rounded-[30px]' },
            });
          }
        } catch (error) {
          console.error('Delete error:', error);
          Swal.fire({
            title: 'Error!',
            text: error.response?.data?.message || 'Failed to delete request',
            icon: 'error',
            confirmButtonColor: '#e11d48',
          });
        }
      }
    });
  };

  // ৪. ফিল্টারিং লজিক (Database data-r property name check korun)
  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return requests;
    return requests.filter((req) => req.status === filterStatus);
  }, [requests, filterStatus]);

  // eslint-disable-next-line no-unused-vars
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <div className="text-center py-20 font-black italic">
        Loading Requests...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* ... (Header section exactly same thakbe) ... */}

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
                    key={req._id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-8 py-6 font-black text-slate-800 tracking-tight">
                      {req.recipientName}
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold text-xs uppercase italic tracking-tighter">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-red-500" />{' '}
                        {req.district} {/* Location er jaygay req.district */}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-slate-700 flex flex-col gap-1 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-slate-400" />{' '}
                          {req.donationDate}{' '}
                          {/* Backend property name check korun */}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" />{' '}
                          {req.donationTime}
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
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    {/* Donor Info */}
                    <td className="px-8 py-6">
                      {req.donorName ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black">
                            {req.donorName}
                          </span>
                          <span className="text-[9px] text-slate-400">
                            {req.donorEmail}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] italic text-slate-300">
                          No Donor Yet
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1">
                        {/* Edit Button */}
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          className="p-2 text-slate-400 hover:text-amber-500"
                        >
                          <Edit2 size={16} />
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                        {/* View Button */}
                        <Link
                          to={`/dashboard/donation-details/${req._id}`}
                          className="p-2 text-slate-400 hover:text-blue-600"
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
                    className="px-8 py-20 text-center font-black text-slate-300"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination logic exactly same thakbe */}
      </div>
    </div>
  );
};

export default MyDonationRequests;
