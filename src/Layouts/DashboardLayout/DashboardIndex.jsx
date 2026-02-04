import React from 'react';
// আপনার তৈরি করা কম্পোনেন্টগুলো ইমপোর্ট করুন
import AdminDashboardHome from './AdminDashboardHome';
import DonorDashboardHome from './DonorDashboardHome';
import VolunteerDashboardHome from './VolunteerDashboardHome'; // যদি আলাদা ভিউ থাকে

const DashboardIndex = () => {
  // ১. ইউজার ডাটা এবং রোল সংগ্রহ করুন (এটি Context বা Redux থেকে আসবে)
  // উদাহরণস্বরূপ:
  const user = { role: 'admin' }; // 'admin', 'volunteer', 'donor'

  if (user.role === 'admin') {
    return <AdminDashboardHome />;
  }

  if (user.role === 'volunteer') {
    return <VolunteerDashboardHome />;
  }
  return <DonorDashboardHome />;
};

export default DashboardIndex;
