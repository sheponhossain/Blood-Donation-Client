import React from 'react';
import { Users, HeartPulse, CircleDollarSign } from 'lucide-react';

const AdminHome = () => {
  const user = { name: 'Admin' }; // এটি AuthContext থেকে আসবে

  const stats = [
    { title: 'Total Donors', count: '1,284', icon: <Users size={24} /> },
    {
      title: 'Total Funding',
      count: '$12,450',
      icon: <CircleDollarSign size={24} />,
    }, // চ্যালেঞ্জ রিকোয়ারমেন্ট
    {
      title: 'Donation Requests',
      count: '842',
      icon: <HeartPulse size={24} />,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-light text-slate-800">
          Welcome, <span className="font-bold">{user.name}</span>
        </h1>
        <p className="text-slate-500 mt-1">
          Overview of the BloodFlow system status today.
        </p>
      </div>

      {/* Featured Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl hover:shadow-sm transition-shadow bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="text-red-600">{stat.icon}</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {stat.title}
                </p>
                <h2 className="text-3xl font-bold text-slate-800">
                  {stat.count}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
