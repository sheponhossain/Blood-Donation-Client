import React, { useEffect, useState } from 'react';
import {
  Users,
  DollarSign,
  GitPullRequest,
  Plus,
  ArrowUpRight,
  Activity,
  TrendingUp,
  Calendar,
  ArrowDownRight,
} from 'lucide-react';
import { Link } from 'react-router';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Welcome from '../../components/Welcome/Welcome';

const VolunteerDashboardHome = () => {
  const [period, setPeriod] = useState('Daily');
  const [dbStats, setDbStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalFunding: 0,
  });

  useEffect(() => {
    fetch('http://localhost:5000/admin-stats')
      .then((res) => res.json())
      .then((data) => setDbStats(data))
      .catch((err) => console.error('Stats fetch error:', err));
  }, []);

  const dataMap = {
    Daily: [
      { name: 'Sat', requests: 40, donors: 20 },
      { name: 'Sun', requests: 30, donors: 25 },
      { name: 'Mon', requests: 65, donors: 45 },
      { name: 'Tue', requests: 45, donors: 30 },
      { name: 'Wed', requests: 90, donors: 60 },
      { name: 'Thu', requests: 70, donors: 50 },
      { name: 'Fri', requests: 85, donors: 55 },
    ],
    Weekly: [
      { name: 'Week 1', requests: 240, donors: 120 },
      { name: 'Week 2', requests: 190, donors: 100 },
      { name: 'Week 3', requests: 320, donors: 180 },
      { name: 'Week 4', requests: 280, donors: 150 },
    ],
    Monthly: [
      { name: 'Jan', requests: 400, donors: 200 },
      { name: 'Feb', requests: 600, donors: 350 },
      { name: 'Mar', requests: 550, donors: 300 },
      { name: 'Apr', requests: 800, donors: 450 },
      { name: 'May', requests: 750, donors: 400 },
      { name: 'Jun', requests: 900, donors: 500 },
    ],
  };

  const stats = [
    {
      id: 1,
      title: 'Total Donors',
      count: dbStats.totalDonors.toLocaleString(),
      icon: <Users size={20} />,
      color: 'bg-red-50',
      textColor: 'text-red-600',
      trend: '+12%',
      isUp: true,
    },
    {
      id: 2,
      title: 'Total Funding',
      count: `$${dbStats.totalFunding.toLocaleString()}`,
      icon: <DollarSign size={20} />,
      color: 'bg-slate-100',
      textColor: 'text-slate-900',
      trend: '+5.4%',
      isUp: true,
    },
    {
      id: 3,
      title: 'Requests',
      count: dbStats.totalRequests.toLocaleString(),
      icon: <GitPullRequest size={20} />,
      color: 'bg-red-500',
      textColor: 'text-white',
      trend: '+18%',
      isUp: true,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-10">
      {/* 1. Header with Glassmorphism Effect */}
      <Welcome />

      {/* 2. Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div
                className={`p-3 ${stat.color} ${stat.textColor} rounded-xl shadow-sm`}
              >
                {stat.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}
              >
                {stat.isUp ? (
                  <TrendingUp size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}{' '}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {stat.title}
              </p>
              <h3 className="text-3xl font-black text-slate-900 mt-1">
                {stat.count}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Chart Section - Clean & Informative */}
      <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600 rounded-full"></div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">
                Request Analytics
              </h3>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] ml-4">
              Detailed donation metrics
            </p>
          </div>

          <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
            {['Daily', 'Weekly', 'Monthly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${period === p ? 'bg-white text-red-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataMap[period]}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="paintRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="8 8"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
              />
              <Tooltip
                cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                contentStyle={{
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                  padding: '20px',
                }}
                itemStyle={{ fontWeight: 900, fontSize: '12px' }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#ef4444"
                strokeWidth={5}
                fillOpacity={1}
                fill="url(#paintRequests)"
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="donors"
                stroke="#0f172a"
                strokeWidth={5}
                strokeDasharray="10 10"
                fill="transparent"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="mt-8 flex justify-center gap-8 border-t border-slate-50 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Requests
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-slate-900 border-dashed"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Active Donors
            </span>
          </div>
        </div>
      </div>

      {/* 4. Interactive Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link
          to="/dashboard/volunteer-all-blood-donation-request"
          className="group bg-red-600 rounded-[40px] p-8 text-white flex justify-between items-center transition-all hover:bg-red-700"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-black uppercase italic tracking-widest">
              All Donation Requests
            </h3>
            <p className="text-red-100 text-xs font-medium">
              Review and monitor all blood donation requests across the system.
            </p>
          </div>
          <div className="w-14 h-14 bg-black/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-red-600 transition-all">
            <ArrowUpRight size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
