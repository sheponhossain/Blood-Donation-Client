import React from 'react';
import { Heart, DollarSign, Users, Award, ExternalLink } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const FundingPage = () => {
  // Fake Funding Data
  const funders = [
    {
      id: 1,
      name: 'Arifur Rahman',
      amount: 5000,
      date: '20 Feb 2026',
      message: 'Emergency blood bank maintenance support.',
    },
    {
      id: 2,
      name: 'Sumaiya Akhter',
      amount: 2000,
      date: '18 Feb 2026',
      message: 'A small contribution for a great cause.',
    },
    {
      id: 3,
      name: 'Tanvir Hossain',
      amount: 10000,
      date: '15 Feb 2026',
      message: 'To help the underprivileged patients.',
    },
    {
      id: 4,
      name: 'Nusrat Jahan',
      amount: 3500,
      date: '10 Feb 2026',
      message: 'In memory of my late grandfather.',
    },
  ];

  const stats = [
    {
      label: 'Total Raised',
      value: '৳ 85,450',
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
    },
    {
      label: 'Total Backers',
      value: '142',
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      label: 'Active Campaigns',
      value: '12',
      icon: <Heart className="w-6 h-6 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tight mb-4">
          Support Our Cause
        </h1>
        <p className="max-w-2xl mx-auto text-red-100 text-lg font-medium opacity-90">
          Your small contribution helps us maintain the platform and reach more
          donors to save lives.
        </p>
        <NavLink
          to={'/donating'}
          className="mt-10 bg-white text-red-600 px-10 py-4 rounded-full font-black text-xl hover:scale-105 transition shadow-2xl uppercase tracking-tighter italic"
        >
          Donate Now
        </NavLink>
      </div>

      <div className="max-w- mx-auto px-4 -mt-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl shadow-xl flex items-center gap-6 border border-white"
            >
              <div className="bg-slate-50 p-4 rounded-2xl">{stat.icon}</div>
              <div>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-slate-800">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Funders List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black text-slate-800 italic uppercase">
                Recent Contributors
              </h2>
              <span className="text-red-600 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                View All <ExternalLink className="w-4 h-4" />
              </span>
            </div>

            {funders.map((funder) => (
              <div
                key={funder.id}
                className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex items-start gap-5 hover:shadow-lg transition"
              >
                <div className="bg-red-50 p-4 rounded-2xl">
                  <Award className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-lg text-slate-800">
                      {funder.name}
                    </h4>
                    <span className="text-green-600 font-black text-xl">
                      ৳ {funder.amount}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm italic font-medium">
                    "{funder.message}"
                  </p>
                  <p className="text-xs text-gray-400 mt-3 font-bold uppercase tracking-tighter">
                    {funder.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Donate Section */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black italic mb-4 uppercase">
                  Why Fund Us?
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <p className="text-gray-300 font-medium">
                      To keep the blood donation network server active 24/7.
                    </p>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <p className="text-gray-300 font-medium">
                      Supporting the development of our mobile application.
                    </p>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                    <p className="text-gray-300 font-medium">
                      Marketing campaigns to find more voluntary blood donors.
                    </p>
                  </li>
                </ul>
              </div>
              {/* Background Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 blur-[80px]"></div>
            </div>

            {/* Support Card */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border border-red-50 text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-black text-slate-800 mb-2 italic uppercase">
                Become a Patron
              </h3>
              <p className="text-gray-500 text-sm mb-6 font-medium">
                For institutional funding or partnerships, please contact our
                support team.
              </p>
              <button className="w-full bg-slate-100 text-slate-800 font-black py-4 rounded-2xl hover:bg-slate-200 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
