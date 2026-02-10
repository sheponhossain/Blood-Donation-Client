// import React, { useState } from 'react';
// import {
//   Users,
//   HandCoins,
//   GitPullRequest,
//   TrendingUp,
//   Plus,
//   ArrowUpRight,
// } from 'lucide-react';
// import { Link } from 'react-router';

// const DashboardHome = () => {
//   // ১. Fake Statistics Data (এগুলো API থেকে আসবে)
//   const stats = {
//     totalDonors: 1250,
//     totalFunding: 45200, // USD or BDT
//     totalRequests: 840,
//   };

//   const user = { name: 'John Doe' };

//   return (
//     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       {/* --- WELCOME SECTION --- */}
//       <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900 tracking-tight">
//             Welcome back,{' '}
//             <span className="text-red-600 uppercase">{user.name}</span>
//           </h1>
//           <p className="text-slate-500 font-medium mt-2">
//             Here's what's happening with{' '}
//             <span className="text-red-600 font-bold">Blood Donation</span> today.
//           </p>
//         </div>
//         <Link
//           to="/dashboard/create-donation-request"
//           className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-100"
//         >
//           <Plus size={18} /> New Request
//         </Link>
//       </div>

//       {/* --- STATISTICS CARDS SECTION --- */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Total Donors Card */}
//         <StatCard
//           icon={<Users size={28} />}
//           count={stats.totalDonors.toLocaleString()}
//           title="Total Donors"
//           color="bg-blue-600"
//           percentage="+12%"
//         />

//         {/* Total Funding Card */}
//         <StatCard
//           icon={<HandCoins size={28} />}
//           count={`$${stats.totalFunding.toLocaleString()}`}
//           title="Total Funding"
//           color="bg-emerald-600"
//           percentage="+5.4%"
//         />

//         {/* Total Requests Card */}
//         <StatCard
//           icon={<GitPullRequest size={28} />}
//           count={stats.totalRequests.toLocaleString()}
//           title="Donation Requests"
//           color="bg-red-600"
//           percentage="+18%"
//         />
//       </div>

//       {/* --- EXTRA VISUAL ELEMENT (Optional) --- */}
//       <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
//         <div className="relative z-10">
//           <h2 className="text-2xl font-black italic tracking-tight">
//             Every drop counts.
//           </h2>
//           <p className="text-slate-400 font-medium mt-2">
//             Your contribution helps us keep the network running for everyone.
//           </p>
//         </div>
//         <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
//           <TrendingUp size={200} />
//         </div>
//         <Link
//           to="/dashboard/funding"
//           className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-red-600 hover:text-white transition-all"
//         >
//           Contribute Now
//         </Link>
//       </div>
//     </div>
//   );
// };

// // --- STAT CARD HELPER COMPONENT ---
// const StatCard = ({ icon, count, title, color, percentage }) => (
//   <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group hover:border-red-100 transition-all duration-300">
//     <div className="flex justify-between items-start mb-6">
//       <div className={`p-4 ${color} text-white rounded-2xl shadow-lg`}>
//         {icon}
//       </div>
//       <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
//         <span className="text-[10px] font-black">{percentage}</span>
//         <ArrowUpRight size={12} />
//       </div>
//     </div>

//     <div className="space-y-1">
//       <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
//         {count}
//       </h3>
//       <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
//         {title}
//       </p>
//     </div>

//     <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
//       <span className="text-[9px] font-bold text-slate-400 uppercase">
//         System Stats
//       </span>
//       <div className="flex -space-x-2">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default DashboardHome;
