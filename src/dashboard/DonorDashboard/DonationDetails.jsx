import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  MapPin,
  Calendar,
  Clock,
  Hospital,
  User,
  Mail,
  MessageSquare,
  Droplet,
  ArrowLeft,
  CheckCircle2,
  Info,
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/donation-request/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error('Error fetching details:', err);
        Swal.fire('Error', 'Could not load donation details', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequestDetails();
  }, [id, axiosSecure]);

  const handleConfirmDonation = async (e) => {
    e.preventDefault();

    const donationInfo = {
      donorName: loggedInUser?.displayName || loggedInUser?.name,
      donorEmail: loggedInUser?.email,
      status: 'inprogress',
    };

    try {
      const res = await axiosSecure.patch(
        `/donation-request/${id}`,
        donationInfo
      );
      console.log('Sending to DB:', donationInfo);

      if (res.data) {
        Swal.fire({
          title: 'Confirmed!',
          text: 'Thank you for your commitment to save a life.',
          icon: 'success',
          confirmButtonColor: '#dc2626',
          customClass: { popup: 'rounded-[30px]' },
        });

        setRequest({ ...request, ...donationInfo });
        document.getElementById('donate_modal').close();
      }
    } catch (error) {
      console.error('Confirmation Error:', error);
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  if (loading)
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-error"></span>
      </div>
    );

  if (!request)
    return <div className="text-center py-20 font-bold">No Data Found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Navigation & Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all font-semibold text-sm mb-2"
          >
            <ArrowLeft size={18} /> Back to Requests
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Request{' '}
            <span className="text-red-600 font-black">#{id?.slice(-5)}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
          <div
            className={`w-3 h-3 rounded-full shadow-sm ${request.status === 'pending' ? 'bg-amber-500' : 'bg-blue-500'}`}
          ></div>
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Status: {request.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(220,38,38,0.1)]">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none group-hover:opacity-60 group-hover:scale-100 transition-all duration-1000">
              <div className="w-[500px] h-[500px]">
                <DotLottieReact
                  src="https://lottie.host/c1d7551d-5d0c-4241-89fa-4b4ebac272af/kJNh0U2yoH.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>

            {/* Top Accent Line */}
            <div className="relative z-20 h-2 w-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400"></div>

            <div className="relative z-10 px-8 py-10">
              {/* Main Content Layout */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left: Recipient Info */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                      Urgent Request
                    </span>
                  </div>

                  <h2 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">
                    {request.recipientName}
                  </h2>

                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-bold">
                    <MapPin size={18} className="text-red-600" />
                    <span>
                      {request.district}, {request.division}
                    </span>
                  </div>
                </div>

                {/* Right: Blood Group Card */}
                <div className="flex-1 flex justify-center md:justify-end">
                  <div className="bg-white p-2 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-50 group-hover:rotate-2 transition-transform duration-500">
                    <div className="bg-slate-50 px-10 py-8 rounded-[1.8rem] flex flex-col items-center justify-center min-w-[150px] border border-white">
                      <Droplet
                        className="text-red-600 mb-2 animate-bounce"
                        size={40}
                        fill="currentColor"
                      />
                      <span className="text-5xl font-black text-slate-900 leading-none tracking-tighter">
                        {request.bloodGroup}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase mt-3 tracking-widest">
                        Blood Group
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modern Divider */}
              <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>

              {/* Bottom Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hospital */}
                <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group/card">
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm border border-blue-50 group-hover/card:bg-blue-600 group-hover/card:text-white transition-all">
                      <Hospital size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Medical Center
                      </p>
                      <p className="text-slate-800 font-extrabold text-xl leading-tight">
                        {request.hospitalName}
                      </p>
                      <p className="text-sm text-slate-500 font-medium mt-1">
                        {request.fullAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group/card">
                  <div className="flex gap-5 items-center">
                    <div className="w-14 h-14 bg-white text-amber-600 rounded-2xl flex items-center justify-center shadow-sm border border-amber-50 group-hover/card:bg-amber-500 group-hover/card:text-white transition-all">
                      <Calendar size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Donation Schedule
                      </p>
                      <p className="text-slate-800 font-extrabold text-xl leading-tight">
                        {request.donationDate}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-700 text-[10px] font-black flex items-center gap-1 uppercase">
                          <Clock size={12} /> {request.donationTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[2rem] p-8 border border-dashed border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={18} className="text-slate-400" />
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                Message
              </h3>
            </div>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              "{request.message || request.requestMessage}"
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
              Action Center
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex gap-3">
                  <Info className="text-red-500 shrink-0" size={18} />
                  <p className="text-xs font-semibold text-red-800 leading-relaxed">
                    By clicking confirm, you are promising to donate blood on
                    time.
                  </p>
                </div>
              </div>

              {request.status === 'pending' ? (
                <button
                  onClick={() =>
                    document.getElementById('donate_modal').showModal()
                  }
                  className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                >
                  Confirm Donation <CheckCircle2 size={20} />
                </button>
              ) : (
                <div className="p-5 text-center bg-slate-100 rounded-2xl">
                  <p className="text-slate-500 font-bold text-sm uppercase">
                    Currently {request.status}
                  </p>
                  {request.donorName && (
                    <p className="text-[10px] text-slate-400 mt-1 font-bold tracking-widest uppercase">
                      Picked by: {request.donorName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden bg-white max-w-md border-none">
          <div className="bg-red-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Droplet size={32} fill="white" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight italic">
              Confirmation
            </h3>
          </div>

          <div className="p-8">
            <form onSubmit={handleConfirmDonation} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider italic">
                  Donor Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    value={loggedInUser?.displayName || 'Loading...'}
                    readOnly
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-bold text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-wider italic">
                  Donor Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="email"
                    value={loggedInUser?.email || 'Loading...'}
                    readOnly
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-bold text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-black transition-all"
                >
                  Confirm Now
                </button>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('donate_modal').close()
                  }
                  className="w-full py-4 bg-white text-slate-400 font-bold uppercase tracking-widest text-[10px]"
                >
                  Go Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;
