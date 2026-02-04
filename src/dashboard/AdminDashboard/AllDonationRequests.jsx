import React from 'react';
import {
  MoreVertical,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const AllDonationRequests = () => {
  // বাস্তব প্রজেক্টে এই role এবং data আসবে Context বা API থেকে
  const role = 'admin'; // 'admin' or 'volunteer'

  // ডামি ডেটা
  const requests = [
    {
      id: 1,
      recipientName: 'Ariful Islam',
      location: 'Dhaka, Mirpur',
      date: '2026-02-15',
      time: '10:30 AM',
      bloodGroup: 'A+',
      status: 'inprogress',
      donorName: 'Mahim Ahmed',
      donorEmail: 'mahim@test.com',
    },
    {
      id: 2,
      recipientName: 'Sufia Begum',
      location: 'Chittagong, Kotwali',
      date: '2026-02-20',
      time: '02:00 PM',
      bloodGroup: 'O-',
      status: 'pending',
      donorName: null,
      donorEmail: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Blood Donation Requests
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Manage and monitor all community donation activities.
          </p>
        </div>

        {/* Filtering Option */}
        <select className="select select-bordered select-sm w-full max-w-xs bg-white">
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-2xl bg-white shadow-sm">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 uppercase text-[10px] tracking-widest border-b">
              <th className="py-5">Recipient</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-600">
            {requests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-slate-50/30 transition-colors border-b last:border-0"
              >
                <td className="font-bold text-slate-800">
                  {request.recipientName}
                </td>
                <td className="text-sm">{request.location}</td>
                <td className="text-sm">
                  <div className="font-medium">{request.date}</div>
                  <div className="text-xs text-slate-400">{request.time}</div>
                </td>
                <td>
                  <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black">
                    {request.bloodGroup}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      request.status === 'pending'
                        ? 'bg-amber-50 text-amber-600'
                        : request.status === 'inprogress'
                          ? 'bg-blue-50 text-blue-600'
                          : request.status === 'done'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>
                  {request.donorName ? (
                    <div className="text-xs">
                      <div className="font-bold text-slate-700">
                        {request.donorName}
                      </div>
                      <div className="text-slate-400">{request.donorEmail}</div>
                    </div>
                  ) : (
                    <span className="text-xs italic text-slate-300">
                      No donor yet
                    </span>
                  )}
                </td>
                <td className="text-right">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-ghost btn-xs">
                      <MoreVertical size={16} className="text-slate-400" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[100] menu p-2 shadow-2xl bg-white border rounded-xl w-56 text-sm"
                    >
                      {/* Common: Update Status (Both Admin & Volunteer) */}
                      {request.status === 'inprogress' && (
                        <>
                          <li className="text-emerald-600 font-bold">
                            <a>
                              <CheckCircle size={14} /> Mark as Done
                            </a>
                          </li>
                          <li className="text-red-500 font-bold">
                            <a>
                              <XCircle size={14} /> Cancel Request
                            </a>
                          </li>
                        </>
                      )}

                      {/* Admin Specific Actions */}
                      {role === 'admin' && (
                        <>
                          <div className="divider my-1 opacity-50"></div>
                          <li>
                            <a>
                              <Edit3 size={14} /> Edit Request
                            </a>
                          </li>
                          <li className="text-red-600">
                            <a>
                              <Trash2 size={14} /> Delete Request
                            </a>
                          </li>
                        </>
                      )}

                      {/* View Button */}
                      <li>
                        <a>
                          <ExternalLink size={14} /> View Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Feature */}
      <div className="flex justify-center mt-8">
        <div className="join border rounded-lg overflow-hidden">
          <button className="join-item btn btn-sm bg-white border-0 hover:bg-slate-100">
            1
          </button>
          <button className="join-item btn btn-sm btn-active bg-red-600 border-0 text-white">
            2
          </button>
          <button className="join-item btn btn-sm bg-white border-0 hover:bg-slate-100">
            3
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequests;
