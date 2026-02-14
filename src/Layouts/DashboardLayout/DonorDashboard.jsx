import React, { useState } from 'react';
import {
  Plus,
  List,
  MapPin,
  Calendar,
  Clock,
  Droplets,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const DonorDashboard = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
  };

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
  ]);

  // Status Change Handler (In-progress -> Done/Canceled)
  const handleStatusUpdate = (id, newStatus) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    Swal.fire({
      title: 'Status Updated!',
      text: `Request marked as ${newStatus}`,
      icon: 'success',
      confirmButtonColor: '#dc2626',
    });
  };

  // Delete Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setRequests(requests.filter((req) => req.id !== id));
        Swal.fire('Deleted!', 'Request has been deleted.', 'success');
      }
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* 1. Welcome Section */}
      <div className="bg-white rounded-[35px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome back,{' '}
            <span className="text-red-600 uppercase">{user.name}!</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Track your recent activities and help save lives today.
          </p>
        </div>
        {user.status === 'active' && (
          <Link
            to="/dashboard/create-donation-request"
            className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
          >
            <Plus size={18} /> Create New Request
          </Link>
        )}
      </div>

      {requests.length > 0 && (
        <div className="bg-white rounded-[35px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h2 className="text-xl font-black text-slate-800 tracking-widest flex items-center gap-2 uppercase">
              <Droplets className="text-red-600" size={20} /> 3 Recent Requests
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Recipient</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5">Date & Time</th>
                  <th className="px-8 py-5 text-center">Group</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Donor</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requests.slice(0, 3).map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 tracking-tight">
                        {req.recipientName}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                        <MapPin size={14} className="text-red-600" />
                        {req.upazila}, {req.district}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-700 flex items-center gap-1.5 uppercase tracking-tighter">
                          <Calendar size={12} className="text-slate-400" />{' '}
                          {req.date}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                          <Clock size={12} /> {req.time}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-sm">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          req.status === 'pending'
                            ? 'bg-amber-50 text-amber-600 border-amber-100'
                            : req.status === 'inprogress'
                              ? 'bg-blue-50 text-blue-600 border-blue-100'
                              : req.status === 'done'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      {req.status === 'inprogress' && req.donor ? (
                        <div className="space-y-1">
                          <p className="text-xs font-black text-slate-800">
                            {req.donor.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400">
                            {req.donor.email}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          No Donor
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Done/Cancel Buttons only while inprogress */}
                        {req.status === 'inprogress' && (
                          <div className="flex gap-1 pr-2 border-r border-slate-100 mr-2">
                            <button
                              onClick={() => handleStatusUpdate(req.id, 'done')}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              title="Mark as Done"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req.id, 'canceled')
                              }
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                              title="Cancel Request"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}

                        <Link
                          to={`/dashboard/donation-details/${req.id}`}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/dashboard/edit-donation-request/${req.id}`}
                          className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

          <div className="p-8 bg-slate-50/50 text-center border-t border-slate-50">
            <Link
              to="/dashboard/my-donation-requests"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-red-600 transition-all"
            >
              View My All Requests <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* 3. Empty State Check */}
      {requests.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-100">
          <AlertCircle size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            No Recent Requests Found
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
