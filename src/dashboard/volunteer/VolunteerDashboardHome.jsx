import React from 'react';
import {
  Users,
  DollarSign,
  GitPullRequest,
  Plus,
  ArrowUpRight,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router';

const VolunteerDashboardHome = () => {
  // Fake User State (Role: Volunteer)
  const user = { name: 'Volunteer Agent', role: 'volunteer' };

  // Statistics Data (Admin এর মতোই ৩টি কার্ড)
  const stats = [
    {
      id: 1,
      title: 'Total Donors',
      count: '1,240',
      icon: <Users size={24} />,
      color: 'bg-red-600',
      trend: '+12% total',
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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* 1. Welcome Section */}
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Welcome back,{' '}
            <span className="text-red-600 uppercase italic">{user.name}!</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Monitoring the{' '}
            <span className="text-red-600 font-bold">BloodFlow</span> network as
            a Volunteer.
          </p>
        </div>
        <Link
          to="/dashboard/create-donation-request"
          className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
        >
          <Plus size={18} /> New Request
        </Link>
      </div>

      {/* 2. Featured Statistics Cards */}
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
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md uppercase">
                <Activity size={10} /> {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Volunteer Special Shortcuts */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-2xl font-black italic uppercase tracking-widest mb-3">
            Donation Management
          </h3>
          <p className="text-slate-400 font-medium mb-8 max-w-md">
            As a volunteer, you can track and update the status of blood
            donation requests to help recipients and donors connect faster.
          </p>
          <Link
            to="/dashboard/all-blood-donation-request"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-lg"
          >
            Review All Requests <ArrowUpRight size={16} />
          </Link>
        </div>
        <GitPullRequest
          className="absolute -right-10 -bottom-10 text-white/5 group-hover:text-white/10 transition-all duration-500"
          size={280}
        />
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
