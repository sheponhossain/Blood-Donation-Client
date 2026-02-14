import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router';
import { Plus, User, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const Welcome = ({
  title = 'Welcome back',
  buttonText = 'New Request',
  link = '/dashboard/create-donation-request',
  showButton = true,
}) => {
  const { user: authUser } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (authUser?.email) {
      axios
        .get(
          `https://blood-donation-server-snowy-six.vercel.app/user/${authUser.email}`
        )
        .then((res) => {
          setDbUser(res.data);
        })
        .catch((err) => {
          console.error('Error fetching user role:', err);
        });
    }
  }, [authUser?.email]);

  const userRole = dbUser?.role || 'User';

  const getRoleColor = (roleName) => {
    const r = roleName?.toLowerCase();
    if (r === 'admin') return 'bg-purple-600';
    if (r === 'volunteer') return 'bg-blue-600';
    if (r === 'donor') return 'bg-red-600';
    return 'bg-slate-900';
  };

  return (
    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="h-24 w-24 rounded-[30px] bg-red-50 flex items-center justify-center border-2 border-red-100 shadow-inner overflow-hidden">
            {authUser?.photoURL ? (
              <img
                src={authUser.photoURL}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={36} className="text-red-500" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md border border-slate-100">
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {title},{' '}
            <span className="text-red-600 uppercase">
              {authUser?.displayName || 'User'}
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
            <span
              className={`px-4 py-1.5 ${getRoleColor(userRole)} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg transition-colors duration-500`}
            >
              {dbUser ? userRole : 'Loading...'}
            </span>

            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                System Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {showButton && (
        <Link
          to={link}
          className="mt-8 md:mt-0 flex items-center gap-3 px-8 py-5 bg-red-600 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-900 transition-all shadow-2xl shadow-red-100 group"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default Welcome;
