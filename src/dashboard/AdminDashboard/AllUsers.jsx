import React, { useState, useMemo, useEffect } from 'react';
import {
  MoreVertical,
  ShieldCheck,
  UserPlus,
  Filter,
  ShieldAlert,
  UserCog,
  Mail,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useTheme } from '../../context/ThemeContext';

const AllUsers = () => {
  const { theme } = useTheme(); // ২. গ্লোবাল থিম স্টেট
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchUsers = async () => {
    const token = localStorage.getItem('access-token');

    if (!token) {
      console.error('No token found! Please login again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        'https://blood-donation-server-nu-lyart.vercel.app/users',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 403) {
        console.error('Forbidden: Check if you are an admin in DB');
      }

      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = async (id, updatedField) => {
    try {
      const response = await fetch(
        `https://blood-donation-server-nu-lyart.vercel.app/users/update/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
          body: JSON.stringify(updatedField),
        }
      );
      const data = await response.json();

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: 'User updated successfully',
          icon: 'success',
          confirmButtonColor: '#0f172a',
          background: theme === 'dark' ? '#1e293b' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        });
        fetchUsers();
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong',
        icon: 'error',
        background: theme === 'dark' ? '#1e293b' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      });
    }
  };

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    if (filterStatus === 'all') return users;
    return users.filter((u) => u.status === filterStatus);
  }, [users, filterStatus]);

  return (
    <div className="animate-in fade-in duration-700 pb-10 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 italic">
            <span className="p-2 bg-slate-900 dark:bg-red-600 text-white rounded-xl">
              <UserCog size={24} />
            </span>
            USER MANAGEMENT
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 ml-14">
            Total {users.length} members found in database.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <Filter
            size={18}
            className="text-slate-400 dark:text-slate-500 ml-2"
          />
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-transparent border-none outline-none font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-200 pr-8 cursor-pointer"
          >
            <option value="all">All Users</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-6">User Identity</th>
                <th className="px-8 py-6">Email Address</th>
                <th className="px-8 py-6">Role</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-8 py-20 text-center text-slate-400 dark:text-slate-600 font-black animate-pulse"
                  >
                    FETCHING USERS FROM DATABASE...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            user.avatar || 'https://i.ibb.co/vP097Y9/user.png'
                          }
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-50 dark:ring-slate-800"
                          alt={user.name}
                        />
                        <p className="font-black text-slate-800 dark:text-slate-200 tracking-tight">
                          {user.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs">
                        <Mail
                          size={14}
                          className="text-slate-300 dark:text-slate-600"
                        />{' '}
                        {user.email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                          user.role === 'admin'
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/50'
                            : user.role === 'volunteer'
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/50'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700'
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
                      <div className="dropdown dropdown-left dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-sm p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                        >
                          <MoreVertical
                            size={20}
                            className="text-slate-400 dark:text-slate-500"
                          />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[100] menu p-2 shadow-2xl bg-white dark:bg-slate-800 rounded-2xl w-52 border border-slate-50 dark:border-slate-700"
                        >
                          {user.status === 'active' ? (
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { status: 'blocked' })
                                }
                                className="text-rose-600 font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-900/20"
                              >
                                <ShieldAlert size={16} /> Block User
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { status: 'active' })
                                }
                                className="text-emerald-600 font-bold text-xs hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                              >
                                <ShieldCheck size={16} /> Unblock User
                              </button>
                            </li>
                          )}
                          <div className="divider my-1 opacity-50 dark:opacity-20"></div>
                          {user.role !== 'volunteer' && (
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { role: 'volunteer' })
                                }
                                className="font-bold text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                <UserPlus size={16} /> Make Volunteer
                              </button>
                            </li>
                          )}
                          {user.role !== 'admin' && (
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { role: 'admin' })
                                }
                                className="font-bold text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <ShieldCheck size={16} /> Make Admin
                              </button>
                            </li>
                          )}
                          {user.role !== 'donor' && (
                            <li>
                              <button
                                onClick={() =>
                                  handleUpdate(user._id, { role: 'donor' })
                                }
                                className="font-bold text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                <UserCog size={16} /> Make Donor
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-8 py-10 text-center text-slate-400 dark:text-slate-600 font-bold italic"
                  >
                    No users found matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
