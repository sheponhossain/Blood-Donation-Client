import React, { useState } from 'react';
import {
  Plus,
  MapPin,
  Calendar,
  Clock,
  Droplets,
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

const DonorDashboardHome = () => {
  const user = { name: 'John Doe', role: 'donor' };
  const [requests, setRequests] = useState([
    {
      id: 1,
      recipientName: 'Arif Ahmed',
      district: 'Dhaka',
      upazila: 'Mirpur',
      date: '2024-11-20',
      time: '10:00 AM',
      bloodGroup: 'A+',
      status: 'inprogress',
      donorInfo: { name: 'Sumon Ali', email: 'sumon@example.com' },
    },
    {
      id: 2,
      recipientName: 'Saira Banu',
      district: 'Chittagong',
      upazila: 'Pahartali',
      date: '2024-11-25',
      time: '02:30 PM',
      bloodGroup: 'O-',
      status: 'pending',
      donorInfo: null,
    },
    {
      id: 3,
      recipientName: 'Rakib Khan',
      district: 'Rajshahi',
      upazila: 'Sadar',
      date: '2024-11-28',
      time: '11:00 AM',
      bloodGroup: 'B+',
      status: 'done',
      donorInfo: { name: 'John Doe', email: 'john@example.com' },
    },
    {
      id: 3,
      recipientName: 'Rakib Khan',
      district: 'Rajshahi',
      upazila: 'Sadar',
      date: '2024-11-28',
      time: '11:00 AM',
      bloodGroup: 'B+',
      status: 'done',
      donorInfo: { name: 'John Doe', email: 'john@example.com' },
    },
  ]);

  // ৩. Status Change Handler (Inprogress to Done/Canceled)
  const handleStatusChange = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    Swal.fire({
      title: 'Updated!',
      text: `Status changed to ${newStatus}`,
      icon: 'success',
      confirmButtonColor: '#ef4444',
    });
  };

  // ৪. Delete Handler with Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter((req) => req.id !== id));
        Swal.fire('Deleted!', 'Your request has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="space-y-12">
      {/* --- WELCOME SECTION --- */}
      <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome back,{' '}
            <span className="text-red-600 uppercase">{user.name}</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Manage your donation requests and track your impact.
          </p>
        </div>
        <Link
          to="/dashboard/create-donation-request"
          className="mt-6 md:mt-0 flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
        >
          <Plus size={18} /> New Request
        </Link>
      </div>

      {/* --- RECENT REQUESTS TABLE --- */}
      {requests.length > 0 && (
        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-800 tracking-widest flex items-center gap-3">
              <Heart className="text-red-600" size={24} /> RECENT REQUESTS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-6">Recipient</th>
                  <th className="px-8 py-6">Location</th>
                  <th className="px-8 py-6">Schedule</th>
                  <th className="px-8 py-6 text-center">Group</th>
                  <th className="px-8 py-6">Status/Donor</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requests.slice(0, 3).map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50/50 transition-all"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800">
                        {req.recipientName}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <MapPin size={14} className="text-red-600" />
                        {req.upazila}, {req.district}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-black text-slate-700 uppercase">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-400" />{' '}
                          {req.date}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={12} className="text-slate-400" />{' '}
                          {req.time}
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
                              ? 'bg-amber-50 text-amber-600 border-amber-100'
                              : req.status === 'inprogress'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : req.status === 'done'
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                  : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}
                        >
                          {req.status}
                        </span>

                        {/* Donor Info (only shown if inprogress) */}
                        {req.status === 'inprogress' && req.donorInfo && (
                          <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                            <User size={12} className="text-blue-600" />
                            <div>
                              <p className="text-[9px] font-black text-slate-800 uppercase">
                                {req.donorInfo.name}
                              </p>
                              <p className="text-[8px] font-bold text-slate-400">
                                {req.donorInfo.email}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* DONE & CANCEL Buttons (Only inprogress) */}
                        {req.status === 'inprogress' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(req.id, 'done')}
                              className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(req.id, 'canceled')
                              }
                              className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}

                        <Link
                          to={`/dashboard/donation-details/${req.id}`}
                          className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/dashboard/edit-donation-request/${req.id}`}
                          className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-600 hover:text-white transition-all"
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

          <div className="p-8 bg-slate-50/50 text-center border-t border-slate-100">
            <Link
              to="/dashboard/my-donation-requests"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-red-600 transition-all"
            >
              View My All Requests <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboardHome;
