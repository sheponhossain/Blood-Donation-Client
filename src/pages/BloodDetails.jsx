import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  MapPin,
  Calendar,
  Clock,
  Droplets,
  Hospital,
  User as UserIcon,
  Mail,
  ArrowLeft,
  Heart,
  ShieldCheck,
  Info,
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthProvider, { AuthContext } from '../providers/AuthProvider';
import { useTheme } from '../context/ThemeContext';

const BloodDetails = () => {
  const { theme } = useTheme(); // ২. গ্লোবাল থিম স্টেট
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  console.log('Current Logged In User:', user);

  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/donation-request/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, axiosSecure]);

  const handleConfirmDonation = async () => {
    if (!user || !user.email) {
      Swal.fire({
        title: 'Error',
        text: 'User information not found. Please log in again.',
        icon: 'error',
        background: theme === 'dark' ? '#1e293b' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      });
      return;
    }

    try {
      const donorInfo = {
        status: 'inprogress',
        donorName: user?.displayName || user?.name || 'Anonymous Donor',
        donorEmail: user?.email,
      };

      console.log('Sending to backend:', donorInfo);

      const res = await axiosSecure.patch(
        `/donation-request/status/${id}`,
        donorInfo
      );

      if (res.data.modifiedCount > 0) {
        setRequest({
          ...request,
          status: 'inprogress',
          donorName: donorInfo.donorName,
          donorEmail: donorInfo.donorEmail,
        });
        setShowModal(false);
        Swal.fire({
          title: 'Heroic Act!',
          text: 'You have committed to save a life.',
          icon: 'success',
          confirmButtonColor: '#ef4444',
          background: theme === 'dark' ? '#1e293b' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
        });
      }
    } catch (error) {
      console.error('Update Error:', error);
      setShowModal(false);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong!',
        icon: 'error',
        background: theme === 'dark' ? '#1e293b' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!request)
    return (
      <div className="text-center py-20 font-black text-slate-400 dark:text-slate-600 bg-white dark:bg-slate-950 min-h-screen">
        REQUEST NOT FOUND
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950 text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      <main className="max-w-6xl mx-auto pt-10 px-6">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-all font-black text-[10px] uppercase tracking-[0.3em] mb-12"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Feed
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 space-y-12">
            <header className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-full flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <span className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
                    Urgent Help
                  </span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] dark:text-white">
                Give Blood for <br />
                <span className="text-red-600 dark:text-red-500 italic">
                  {request.recipientName}
                </span>
              </h1>

              <div className="flex flex-wrap gap-6 items-center text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />
                  {request.recipientUpazila || request.district},{' '}
                  {request.recipientDistrict || request.division}
                </div>
                <div className="flex items-center gap-2">
                  <Clock
                    size={16}
                    className="text-slate-300 dark:text-slate-600"
                  />{' '}
                  {request.donationTime}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] transition-colors">
                <Hospital className="text-red-500 mb-6" size={32} />
                <h3 className="font-black uppercase text-[10px] text-slate-400 dark:text-slate-500 mb-3">
                  Hospital
                </h3>
                <p className="font-black text-2xl text-slate-800 dark:text-slate-200">
                  {request.hospitalName}
                </p>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 italic">
                  {request.fullAddress}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] transition-colors">
                <Calendar className="text-red-500 mb-6" size={32} />
                <h3 className="font-black uppercase text-[10px] text-slate-400 dark:text-slate-500 mb-3">
                  Date
                </h3>
                <p className="font-black text-2xl text-slate-800 dark:text-slate-200">
                  {request.donationDate}
                </p>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 italic">
                  Expected: {request.donationTime}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10">
            <div className="bg-slate-900 dark:bg-black rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden transition-colors border dark:border-slate-800">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-4">
                Required Blood Group
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-8xl font-black italic text-white">
                  {request.bloodGroup}
                </span>
                <Droplets size={40} className="text-red-600 animate-bounce" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] p-10 shadow-xl transition-colors">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600 mb-8 flex items-center gap-2">
                <Info size={14} /> Contact Person
              </h4>
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center transition-colors">
                    <UserIcon size={24} className="dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">
                      Requester
                    </p>
                    <p className="font-black text-lg text-slate-800 dark:text-slate-200 italic">
                      {request.requesterName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center transition-colors">
                    <Mail size={24} className="dark:text-slate-400" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">
                      Email
                    </p>
                    <p className="font-bold text-slate-700 dark:text-slate-300 truncate">
                      {request.requesterEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                {request.status === 'pending' ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 dark:hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-200 dark:shadow-none"
                  >
                    <Heart size={18} fill="currentColor" /> Confirm Donation
                  </button>
                ) : (
                  <div className="w-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 py-6 rounded-[2rem] font-black text-xs uppercase text-center italic">
                    {request.status === 'inprogress'
                      ? 'Donation In Progress'
                      : 'Donation Done'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[4rem] p-12 shadow-2xl border dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <h3 className="text-3xl font-black mb-4 italic uppercase dark:text-white">
                Confirm?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm leading-relaxed">
                You are about to accept <strong>{request.recipientName}</strong>
                's request. Are you sure you can make it to{' '}
                <strong>{request.hospitalName}</strong>?
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 mb-10 border border-slate-100 dark:border-slate-700 text-left">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase mb-1">
                  Donor Name
                </p>
                <p className="font-black text-slate-800 dark:text-slate-200">
                  {user?.displayName || user?.name}
                </p>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  {user?.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-4 font-black text-[10px] uppercase text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDonation}
                  className="bg-red-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase hover:bg-red-700 shadow-lg shadow-red-100 dark:shadow-none transition-all"
                >
                  Yes, I'll Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDetails;
