import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  Droplets,
  Activity,
  Search,
  Bell,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      id: 1,
      label: 'Total Treasury',
      value: '৳8,45,200',
      change: '+12%',
      icon: <DollarSign />,
      color: 'text-emerald-500',
    },
    {
      id: 2,
      label: 'Platform Users',
      value: '12,840',
      change: '+5%',
      icon: <Users />,
      color: 'text-blue-500',
    },
    {
      id: 3,
      label: 'Active Requests',
      value: '42',
      change: '-2%',
      icon: <Droplets />,
      color: 'text-red-500',
    },
    {
      id: 4,
      label: 'Conversion Rate',
      value: '18.5%',
      change: '+0.4%',
      icon: <Activity />,
      color: 'text-amber-500',
    },
  ];

  const pendingRequests = [
    {
      id: 'REQ-102',
      patient: 'Rahim Ali',
      amount: '৳50,000',
      type: 'Bone Marrow',
      status: 'Pending',
    },
    {
      id: 'REQ-103',
      patient: 'Sumaiya Khan',
      amount: '৳15,000',
      type: 'Emergency Surgery',
      status: 'Verifying',
    },
    {
      id: 'REQ-104',
      patient: 'Ahsan Habib',
      amount: '৳5,000',
      type: 'Medicine Fund',
      status: 'Pending',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 font-sans p-6 md:p-12">
      <div className="max-w-[1600px] mx-auto space-y-10">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Command Center
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[4px] mt-1">
              Global System Oversight
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-600 transition-colors" />
              <input
                type="text"
                placeholder="Search database..."
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm outline-none focus:border-red-600 w-80 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-600 transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md hover:border-red-600/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all"></div>
              <div
                className={`${stat.color} mb-6 p-3 bg-white/5 w-fit rounded-2xl`}
              >
                {stat.icon}
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black italic">{stat.value}</h3>
                <span
                  className={`text-[10px] font-bold mb-1 flex items-center gap-0.5 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}
                >
                  {stat.change} <TrendingUp className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- MAIN CONTENT: TABLES & ANALYTICS --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Table: Pending Verifications */}
          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-[45px] overflow-hidden backdrop-blur-sm">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">
                Critical Approvals
              </h3>
              <button className="text-red-600 text-[10px] font-black uppercase tracking-widest hover:underline">
                View All Requests
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-8 py-4">Request ID</th>
                    <th className="px-8 py-4">Patient / Subject</th>
                    <th className="px-8 py-4">Goal</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="px-8 py-6 font-bold text-red-600 italic">
                        {req.id}
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-200">
                          {req.patient}
                        </p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                          {req.type}
                        </p>
                      </td>
                      <td className="px-8 py-6 font-black italic">
                        {req.amount}
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase text-amber-500 italic">
                          {req.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          <button className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Timeline / Mini Chart */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[45px] p-8">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">
                Funding Trend
              </h3>
              <div className="h-40 w-full flex items-end gap-2 px-2">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-red-600/20 rounded-t-lg relative group transition-all hover:bg-red-600"
                  >
                    <div
                      className="absolute bottom-0 w-full bg-red-600 rounded-t-lg transition-all duration-1000"
                      style={{ height: `${h}%` }}
                    ></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[8px] font-black px-2 py-1 rounded transition-opacity">
                      ৳{h}K
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600 to-rose-800 rounded-[45px] p-8 text-white relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <h4 className="text-2xl font-black italic uppercase leading-none mb-2">
                  Generate Reports
                </h4>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  Download Q1 Audit Data
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-white text-red-600 px-6 py-2 rounded-xl font-black italic text-xs uppercase shadow-xl group-hover:gap-4 transition-all">
                  Export PDF <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
