import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  GitPullRequest,
  Plus,
  ArrowUpRight,
  Activity,
  Calendar,
} from 'lucide-react';
import { Link } from 'react-router';
// Recharts components ইমপোর্ট
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AdminDashboardHome = () => {
  const user = { name: 'Admin Chief' };

  // Fake Chart Data (Daily, Weekly, Monthly মিক্স করা)
  const chartData = [
    { name: 'Sat', requests: 40 },
    { name: 'Sun', requests: 30 },
    { name: 'Mon', requests: 65 },
    { name: 'Tue', requests: 45 },
    { name: 'Wed', requests: 90 },
    { name: 'Thu', requests: 70 },
    { name: 'Fri', requests: 85 },
  ];

  const stats = [
    {
      id: 1,
      title: 'Total Donors',
      count: '1,240',
      icon: <Users size={24} />,
      color: 'bg-red-600',
      trend: '+12% this month',
    },
    {
      id: 2,
      title: 'Total Funding',
      count: '$52,490',
      icon: <DollarSign size={24} />,
      color: 'bg-slate-900',
      trend: '+5.4% growth',
    },
    {
      id: 3,
      title: 'Donation Requests',
      count: '842',
      icon: <GitPullRequest size={24} />,
      color: 'bg-red-500',
      trend: '+18% urgency',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* 1. Welcome Section */}
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome back,{' '}
            <span className="text-red-600 uppercase italic">{user.name}!</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            System overview and analytics of{' '}
            <span className="text-red-600 font-bold">BloodFlow</span> network.
          </p>
        </div>
        <Link
          to="/dashboard/create-donation-request"
          className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
        >
          <Plus size={18} /> New Request
        </Link>
      </div>

      {/* 2. Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-100 border border-slate-50 group hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg`}
              >
                {stat.icon}
              </div>
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-red-600 transition-colors">
                <ArrowUpRight size={20} />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                {stat.count}
              </h3>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {stat.title}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md uppercase underline underline-offset-4 decoration-emerald-200">
                <Activity size={10} /> {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CHART SECTION - Daily/Weekly Request Analysis */}
      <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-50 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">
              Request Analysis
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              Daily donation requests trend
            </p>
          </div>

          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {['Daily', 'Weekly', 'Monthly'].map((period) => (
              <button
                key={period}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${period === 'Daily' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '15px',
                }}
                itemStyle={{
                  color: '#ef4444',
                  fontWeight: 900,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#ef4444"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorRequests)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management Card (Same as your code) */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-black italic uppercase tracking-widest mb-2">
              User Management
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Manage donors, volunteers and system roles.
            </p>
            <Link
              to="/dashboard/all-users"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 px-6 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all"
            >
              Manage Users <ArrowUpRight size={14} />
            </Link>
          </div>
          <Users
            className="absolute -right-8 -bottom-8 text-white/5 group-hover:text-white/10 transition-all"
            size={200}
          />
        </div>

        {/* Donation Request Card (Same as your code) */}
        <div className="bg-red-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-black italic uppercase tracking-widest mb-2">
              Donation Requests
            </h3>
            <p className="text-red-100 text-sm mb-6 max-w-xs">
              Review and monitor all blood requests across the system.
            </p>
            <Link
              to="/dashboard/all-blood-donation-request"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-slate-900 transition-all"
            >
              View Requests <ArrowUpRight size={14} />
            </Link>
          </div>
          <GitPullRequest
            className="absolute -right-8 -bottom-8 text-white/10 group-hover:text-white/20 transition-all"
            size={200}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
