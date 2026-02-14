import React, { useContext, useEffect, useState } from 'react';
import AdminDashboardHome from '../../dashboard/AdminDashboard/AdminDashboardHome';
import VolunteerDashboardHome from '../../dashboard/volunteer/VolunteerDashboardHome';
import DonorDashboardHome from '../../dashboard/DonorDashboard/DonorDashboardHome';
import { AuthContext } from '../../providers/AuthProvider';

const DashboardIndex = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://blood-donation-server-snowy-six.vercel.app/user/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDbUser(data);
          setDbLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching user role:', err);
          setDbLoading(false);
        });
    } else if (!authLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDbLoading(false);
    }
  }, [user, authLoading]);
  if (authLoading || dbLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  if (!user || !dbUser) {
    return (
      <div className="text-center p-10 font-bold">
        Please log in to see your dashboard.
      </div>
    );
  }

  console.log('User Role from Database:', dbUser.role);

  if (dbUser.role === 'admin') {
    return <AdminDashboardHome />;
  }

  if (dbUser.role === 'volunteer') {
    return <VolunteerDashboardHome />;
  }

  return <DonorDashboardHome />;
};

export default DashboardIndex;
