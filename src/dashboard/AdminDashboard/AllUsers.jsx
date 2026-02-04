import React from 'react';
import {
  MoreVertical,
  ShieldCheck,
  UserCog,
  UserMinus,
  UserPlus,
} from 'lucide-react';

const AllUsers = () => {
  // dummy data
  const users = [
    {
      avatar: 'https://i.pravatar.cc/40',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'donor',
      status: 'active',
    },
    {
      avatar: 'https://i.pravatar.cc/40',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'volunteer',
      status: 'blocked',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">System Users</h2>
        {/* Filtering Option */}
        <select className="select select-bordered select-sm w-full max-w-xs">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded-xl bg-white">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-600 uppercase text-[11px] tracking-widest">
              <th>User Info</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      className="w-10 h-10 rounded-full border"
                      alt=""
                    />
                    <div>
                      <div className="font-bold text-slate-800">
                        {user.name}
                      </div>
                      <div className="text-xs text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm font-medium uppercase">
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-ghost btn-xs">
                      <MoreVertical size={16} />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-50 menu p-2 shadow-xl bg-white border rounded-lg w-52 text-sm"
                    >
                      {/* Status Management */}
                      {user.status === 'active' ? (
                        <li className="text-red-600">
                          <a>
                            <UserMinus size={14} /> Block User
                          </a>
                        </li>
                      ) : (
                        <li className="text-emerald-600">
                          <a>
                            <ShieldCheck size={14} /> Unblock User
                          </a>
                        </li>
                      )}

                      {/* Role Management */}
                      {user.role !== 'volunteer' && (
                        <li>
                          <a>
                            <UserCog size={14} /> Make Volunteer
                          </a>
                        </li>
                      )}
                      {user.role !== 'admin' && (
                        <li>
                          <a>
                            <UserPlus size={14} /> Make Admin
                          </a>
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
  );
};

export default AllUsers;
