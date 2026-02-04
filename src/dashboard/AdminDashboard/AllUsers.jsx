import React, { useState, useMemo } from 'react';
import {
  MoreVertical,
  ShieldCheck,
  UserMinus,
  UserPlus,
  Search,
  Filter,
  ShieldAlert,
  UserCog,
  Mail,
} from 'lucide-react';
import Swal from 'sweetalert2';

const AllUsers = () => {
  // ১. Fake Users Data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Ariful Islam',
      email: 'arif@example.com',
      avatar: 'https://i.pravatar.cc/150?u=1',
      role: 'donor',
      status: 'active',
    },
    {
      id: 2,
      name: 'Sultana Kamal',
      email: 'sultana@example.com',
      avatar: 'https://i.pravatar.cc/150?u=2',
      role: 'volunteer',
      status: 'blocked',
    },
    {
      id: 3,
      name: 'Mahfuz Ahmed',
      email: 'mahfuz@example.com',
      avatar: 'https://i.pravatar.cc/150?u=3',
      role: 'donor',
      status: 'active',
    },
    {
      id: 4,
      name: 'Tanvir Hossain',
      email: 'tanvir@example.com',
      avatar: 'https://i.pravatar.cc/150?u=4',
      role: 'admin',
      status: 'active',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  // ২. অ্যাকশন হ্যান্ডলারসমূহ
  const updateUserStatus = (id, newStatus) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
    Swal.fire('Success!', `User is now ${newStatus}`, 'success');
  };

  const updateUserRole = (id, newRole) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    Swal.fire('Updated!', `Role changed to ${newRole}`, 'success');
  };

  // ৩. ফিল্টারিং লজিক
  const filteredUsers = useMemo(() => {
    if (filterStatus === 'all') return users;
    return users.filter((u) => u.status === filterStatus);
  }, [users, filterStatus]);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 italic">
            <span className="p-2 bg-slate-900 text-white rounded-xl">
              <UserCog size={24} />
            </span>
            USER MANAGEMENT
          </h1>
          <p className="text-slate-500 font-medium mt-1 ml-14">
            Control user roles, status, and permissions.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <Filter size={18} className="text-slate-400 ml-2" />
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest text-slate-700 pr-8 cursor-pointer"
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-8 py-6">User Identity</th>
                <th className="px-8 py-6">Email Address</th>
                <th className="px-8 py-6">Role</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/30 transition-all group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-50"
                        alt=""
                      />
                      <p className="font-black text-slate-800 tracking-tight">
                        {user.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                      <Mail size={14} className="text-slate-300" /> {user.email}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                        user.role === 'admin'
                          ? 'bg-red-50 text-red-600 border-red-100'
                          : user.role === 'volunteer'
                            ? 'bg-blue-50 text-blue-600 border-blue-100'
                            : 'bg-slate-50 text-slate-600 border-slate-100'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                        user.status === 'active'
                          ? 'text-emerald-500'
                          : 'text-rose-500'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {/* Three-dot Dropdown Menu */}
                    <div className="dropdown dropdown-left dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-sm p-1 hover:bg-slate-100 rounded-lg"
                      >
                        <MoreVertical size={20} className="text-slate-400" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[100] menu p-2 shadow-2xl bg-white rounded-2xl w-52 border border-slate-50"
                      >
                        {/* Status Toggle */}
                        {user.status === 'active' ? (
                          <li>
                            <button
                              onClick={() =>
                                updateUserStatus(user.id, 'blocked')
                              }
                              className="text-rose-600 font-bold text-xs"
                            >
                              <ShieldAlert size={16} /> Block User
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button
                              onClick={() =>
                                updateUserStatus(user.id, 'active')
                              }
                              className="text-emerald-600 font-bold text-xs"
                            >
                              <ShieldCheck size={16} /> Unblock User
                            </button>
                          </li>
                        )}

                        <div className="divider my-1 opacity-50"></div>

                        {/* Role Management */}
                        {user.role !== 'volunteer' && (
                          <li>
                            <button
                              onClick={() =>
                                updateUserRole(user.id, 'volunteer')
                              }
                              className="font-bold text-xs text-blue-600"
                            >
                              <UserPlus size={16} /> Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== 'admin' && (
                          <li>
                            <button
                              onClick={() => updateUserRole(user.id, 'admin')}
                              className="font-bold text-xs text-red-600"
                            >
                              <ShieldCheck size={16} /> Make Admin
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
