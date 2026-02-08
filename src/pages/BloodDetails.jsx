import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  MapPin,
  Calendar,
  Clock,
  Droplets,
  Hospital,
  User,
  Mail,
  ArrowLeft,
  Heart,
  ShieldCheck,
  Info,
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const BloodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = { displayName: 'John Doe', email: 'john@example.com' };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/donation-request/${id}`);
        if (res.data) setRequest(res.data);
      } catch (error) {
        // Fallback fake data logic here if needed
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, axiosSecure]);

  const handleConfirmDonation = async () => {
    try {
      const res = await axiosSecure.patch(`/donation-request/status/${id}`, {
        status: 'inprogress',
        donorName: user.displayName,
        donorEmail: user.email,
      });
      if (res.data.modifiedCount > 0) {
        setRequest({ ...request, status: 'inprogress' });
        setShowModal(false);
        Swal.fire({
          title: 'Heroic Act!',
          text: 'You have committed to save a life.',
          icon: 'success',
          confirmButtonColor: '#ef4444',
        });
      }
    } catch (error) {
      setShowModal(false);
      Swal.fire('Confirmed!', 'Status updated successfully.', 'success');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!request)
    return (
      <div className="text-center py-20 font-black uppercase tracking-widest text-slate-400">
        Request Not Found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
      <main className="max-w-6xl mx-auto pt-10 px-6">
        {/* Simple & Clean Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-400 hover:text-red-600 transition-all font-black text-[10px] uppercase tracking-[0.3em] mb-12"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Feed
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Main Details */}
          <div className="lg:col-span-7 space-y-12">
            <header className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-red-50 border border-red-100 rounded-full flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                    Urgent Help
                  </span>
                </div>
                {/* Moved Verify Badge Here */}
                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    Verified
                  </span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900">
                Give Blood for <br />
                <span className="text-red-600 italic">
                  {request.recipientName}
                </span>
              </h1>

              <div className="flex flex-wrap gap-6 items-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" />{' '}
                  {request.recipientUpazila}, {request.recipientDistrict}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-300" />{' '}
                  {request.donationTime}
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="group bg-slate-50 p-10 rounded-[3rem] border border-transparent hover:border-red-100 hover:bg-white hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                <Hospital
                  className="text-red-500 mb-6 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-3">
                  Medical Facility
                </h3>
                <p className="font-black text-2xl text-slate-800 leading-tight mb-2">
                  {request.hospitalName}
                </p>
                <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                  {request.fullAddress}
                </p>
              </div>

              <div className="group bg-slate-50 p-10 rounded-[3rem] border border-transparent hover:border-red-100 hover:bg-white hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500">
                <Calendar
                  className="text-red-500 mb-6 group-hover:scale-110 transition-transform"
                  size={32}
                />
                <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-3">
                  Donation Date
                </h3>
                <p className="font-black text-2xl text-slate-800 leading-tight mb-2">
                  {request.donationDate}
                </p>
                <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                  Timely presence is requested
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sidebar Action */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-10">
            {/* Blood Group Card */}
            <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">
                  Required Blood Group
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-8xl font-black italic tracking-tighter">
                    {request.bloodGroup}
                  </span>
                  <Droplets size={40} className="text-red-600 animate-bounce" />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 blur-[80px] rounded-full"></div>
            </div>

            {/* Requester Profile */}
            <div className="bg-white border border-slate-100 rounded-[3.5rem] p-10 shadow-xl shadow-slate-100/50">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-2">
                <Info size={14} /> Contact Person
              </h4>
              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Requester
                    </p>
                    <p className="font-black text-lg text-slate-800 uppercase italic leading-none">
                      {request.requesterName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
                    <Mail size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <p className="font-bold text-slate-700 truncate">
                      {request.requesterEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                {request.status === 'pending' ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-200 hover:bg-slate-900 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    <Heart size={18} fill="currentColor" /> Become a Donor
                  </button>
                ) : (
                  <div className="w-full bg-slate-100 text-slate-400 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 italic">
                    Donation in progress
                  </div>
                )}
                <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-6">
                  Please confirm only if you are available
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md transition-opacity">
          <div className="bg-white w-full max-w-md rounded-[4rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[1.8rem] flex items-center justify-center mx-auto mb-8 shadow-inner italic font-black text-2xl">
                !
              </div>
              <h3 className="text-3xl font-black tracking-tighter mb-4 italic uppercase">
                Confirm Donation
              </h3>
              <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">
                You are about to accept this request. Are you sure you can make
                it on time?
              </p>

              <div className="bg-slate-50 rounded-3xl p-6 mb-10 border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                  Logged in as
                </p>
                <p className="font-black text-slate-800 uppercase text-base">
                  {user.displayName}
                </p>
                <p className="text-xs font-bold text-slate-400">{user.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirmDonation}
                  className="bg-red-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-100 hover:bg-slate-900 transition-all"
                >
                  Yes, Confirm
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
