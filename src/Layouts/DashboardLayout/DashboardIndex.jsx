import React from 'react';
import AdminDashboardHome from '../../dashboard/AdminDashboard/AdminDashboardHome';
import VolunteerDashboardHome from '../../dashboard/volunteer/VolunteerDashboardHome';
import DonorDashboardHome from '../../dashboard/DonorDashboard/DonorDashboardHome';

const DashboardIndex = () => {
  const user = { role: 'donor' }; // 'admin', 'volunteer', 'donor'

  if (user.role === 'admin') {
    return <AdminDashboardHome />;
  }

  if (user.role === 'volunteer') {
    return <VolunteerDashboardHome />;
  }
  return <DonorDashboardHome />;
};

export default DashboardIndex;
