import React, { useState, useContext, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  ArrowRight,
  Heart,
  User,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

import Welcome from '../../components/Welcome/Welcome';
import { useTheme } from '../../context/ThemeContext';

const DonorDashboardHome = () => {
  const { theme } = useTheme(); // ২. গ্লোবাল থিম স্টেট
  const { user: authUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser?.email) {
      fetch(
        `https://blood-donation-server-nu-lyart.vercel.app/my-donation-requests/${authUser.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch((err) => console.error('Error fetching requests:', err));
    }
  }, [authUser]);

  const handleStatusChange = (id, newStatus) => {
    fetch(
      `https://blood-donation-server-nu-lyart.vercel.app/donation-request/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setRequests(
            requests.map((req) =>
              req._id === id ? { ...req, status: newStatus } : req
            )
          );
          Swal.fire({
            title: 'Updated!',
            text: `Status changed to ${newStatus}`,
            icon: 'success',
            confirmButtonColor: '#ef4444',
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
          });
        }
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      background: theme === 'dark' ? '#1e293b' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://blood-donation-server-nu-lyart.vercel.app/donation-request/${id}`,
          {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('access-token')}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setRequests(requests.filter((req) => req._id !== id));
              Swal.fire({
                title: 'Deleted!',
                text: 'Your request has been deleted.',
                icon: 'success',
                background: theme === 'dark' ? '#1e293b' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
              });
            }
          });
      }
    });
  };

  return (
    <div className="space-y-12 transition-colors duration-300">
      <Welcome />

      {loading ? (
        <div className="text-center font-bold text-slate-400 dark:text-slate-500">
          Loading requests...
        </div>
      ) : requests.length > 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-widest flex items-center gap-3">
              <Heart className="text-red-600" size={24} /> RECENT REQUESTS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-6">Recipient</th>
                  <th className="px-8 py-6">Location</th>
                  <th className="px-8 py-6">Schedule</th>
                  <th className="px-8 py-6 text-center">Group</th>
                  <th className="px-8 py-6">Status/Donor</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {requests.slice(0, 3).map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
                  >
                    <td className="px-8 py-6 font-black text-slate-800 dark:text-slate-200">
                      {req.recipientName}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                        <MapPin size={14} className="text-red-600" />
                        {req.district}, {req.division}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase">
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={12}
                            className="text-slate-400 dark:text-slate-500"
                          />{' '}
                          {req.donationDate}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock
                            size={12}
                            className="text-slate-400 dark:text-slate-500"
                          />{' '}
                          {req.donationTime}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-red-600 text-white rounded-lg font-black text-xs">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        <span
                          className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            req.status === 'pending'
                              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/50'
                              : req.status === 'inprogress'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : req.status === 'done'
                                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {req.status}
                        </span>
                        {req.donorName && (
                          <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                            <User
                              size={12}
                              className="text-blue-600 dark:text-blue-400"
                            />
                            <div>
                              <p className="text-[9px] font-black text-slate-800 dark:text-slate-200 uppercase">
                                {req.donorName}
                              </p>
                              <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500">
                                {req.donorEmail}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {req.status === 'inprogress' && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, 'done')
                              }
                              className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(req._id, 'canceled')
                              }
                              className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <Link
                          to={`/dashboard/donation-details/${req._id}`}
                          className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-700 hover:text-white transition-all"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/dashboard/edit-donation-request/${req._id}`}
                          className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 text-center border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/dashboard/my-donation-requests"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
            >
              View My All Requests <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-700 transition-colors">
          <p className="text-slate-400 dark:text-slate-500 font-bold">
            No donation requests found.
          </p>
          <Link
            to="/dashboard/create-donation-request"
            className="text-red-600 dark:text-red-500 text-xs font-black uppercase mt-4 inline-block hover:underline"
          >
            Create One Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonorDashboardHome;
