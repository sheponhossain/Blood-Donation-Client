import React, { useEffect, useState } from 'react';
import {
  Users,
  DollarSign,
  GitPullRequest,
  ArrowUpRight,
  TrendingUp,
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
} from 'recharts';
import Welcome from '../../components/Welcome/Welcome';
import { useTheme } from '../../context/ThemeContext';

const AdminDashboardHome = () => {
  const { theme } = useTheme(); // থিম লজিক
  const [period, setPeriod] = useState('Daily');
  const [dbStats, setDbStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalFunding: 0,
  });

  useEffect(() => {
    fetch('https://blood-donation-server-nu-lyart.vercel.app/admin-stats')
      .then((res) => res.json())
      .then((data) => {
        if (data) setDbStats(data);
      })
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

  // Optional Chaining (?.) এবং Fallback (|| 0) ব্যবহার করা হয়েছে এরর এড়াতে
  const stats = [
    {
      id: 1,
      title: 'Total Donors',
      count: (dbStats?.totalDonors || 0).toLocaleString(),
      icon: <Users size={20} />,
      color: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
      trend: '+12%',
      isUp: true,
    },
    {
      id: 2,
      title: 'Total Funding',
      count: `$${(dbStats?.totalFunding || 0).toLocaleString()}`,
      icon: <DollarSign size={20} />,
      color: 'bg-slate-100 dark:bg-slate-800',
      textColor: 'text-slate-900 dark:text-slate-100',
      trend: '+5.4%',
      isUp: true,
    },
    {
      id: 3,
      title: 'Requests',
      count: (dbStats?.totalRequests || 0).toLocaleString(),
      icon: <GitPullRequest size={20} />,
      color: 'bg-red-500',
      textColor: 'text-white',
      trend: '+18%',
      isUp: true,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-10 transition-colors duration-300">
      <Welcome />

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <div
                className={`p-3 ${stat.color} ${stat.textColor} rounded-xl shadow-sm`}
              >
                {stat.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                  stat.isUp
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-600'
                }`}
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
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {stat.title}
              </p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                {stat.count}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600 rounded-full"></div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                Request Analytics
              </h3>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] ml-4">
              Detailed donation metrics
            </p>
          </div>

          <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full lg:w-auto">
            {['Daily', 'Weekly', 'Monthly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 lg:flex-none px-6 py-2.5 cursor-pointer rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  period === p
                    ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-md'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                }`}
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
                stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme === 'dark' ? '#64748b' : '#94a3b8',
                  fontSize: 10,
                  fontWeight: 800,
                }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: theme === 'dark' ? '#64748b' : '#94a3b8',
                  fontSize: 10,
                  fontWeight: 800,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                  borderRadius: '24px',
                  border: 'none',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                  color: theme === 'dark' ? '#f8fafc' : '#0f172a',
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#ef4444"
                strokeWidth={5}
                fill="url(#paintRequests)"
              />
              <Area
                type="monotone"
                dataKey="donors"
                stroke={theme === 'dark' ? '#94a3b8' : '#0f172a'}
                strokeWidth={5}
                strokeDasharray="10 10"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-8 border-t border-slate-50 dark:border-slate-800 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Requests
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-slate-900 dark:border-slate-400 border-dashed"></div>
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Active Donors
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Link
          to="/dashboard/all-users"
          className="group bg-slate-900 dark:bg-slate-800 rounded-[40px] p-8 text-white flex justify-between items-center transition-all hover:bg-slate-800 dark:hover:bg-slate-700"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-black uppercase italic tracking-widest">
              User Management
            </h3>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
              View all donors and volunteers, {stats[0].count} manage roles and
              access.
            </p>
          </div>
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-all">
            <ArrowUpRight size={24} />
          </div>
        </Link>

        <Link
          to="/dashboard/all-blood-donation-request"
          className="group bg-red-600 rounded-[40px] p-8 text-white flex justify-between items-center transition-all hover:bg-red-700"
        >
          <div className="space-y-2">
            <h3 className="text-lg font-black uppercase italic tracking-widest">
              Donation Requests
            </h3>
            <p className="text-red-100 dark:text-red-200 text-xs font-medium">
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

export default AdminDashboardHome;
