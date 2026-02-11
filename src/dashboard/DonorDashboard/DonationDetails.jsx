import React, { useEffect, useState, useContext } from 'react'; // useContext add kora hoyeche
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
import useAxiosSecure from '../../Hooks/useAxiosSecure'; // Path check korun
import { AuthContext } from '../../providers/AuthProvider'; // Path check korun

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useContext(AuthContext); // Real logged in user context theke nilam

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // ১. ডাটাবেস থেকে স্পেসিফিক রিকোয়েস্ট আনা
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

  // ২. ডোনেশন কনফার্ম করার লজিক (Status 'inprogress' kora)
  const handleConfirmDonation = async (e) => {
    e.preventDefault();

    const donationInfo = {
      donorName: loggedInUser?.displayName || loggedInUser?.name,
      donorEmail: loggedInUser?.email,
      status: 'inprogress', // ডোনার কনফার্ম করলে স্ট্যাটাস ইন-প্রগ্রেস হবে
    };

    try {
      const res = await axiosSecure.patch(
        `/donation-request/${id}`,
        donationInfo
      );

      if (res.data) {
        Swal.fire({
          title: 'Confirmed!',
          text: 'Thank you for your commitment to save a life.',
          icon: 'success',
          confirmButtonColor: '#dc2626',
          customClass: { popup: 'rounded-[30px]' },
        });

        // UI আপডেট করার জন্য লোকাল স্টেট আপডেট
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
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-8 py-10 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-3">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Recipient
                </span>
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                  {request.recipientName}
                </h2>
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin size={18} className="text-red-500" />
                  <span>
                    {request.district || request.recipientUpazila},{' '}
                    {request.division || request.recipientDistrict}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white px-8 py-6 rounded-3xl border border-slate-200 shadow-sm min-w-[140px]">
                <Droplet
                  className="text-red-600 mb-1"
                  size={32}
                  fill="currentColor"
                />
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {request.bloodGroup}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">
                  Group
                </span>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Hospital size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Hospital Name
                  </p>
                  <p className="text-slate-800 font-bold text-lg leading-tight">
                    {request.hospitalName}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {request.fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Schedule
                  </p>
                  <p className="text-slate-800 font-bold text-lg leading-tight">
                    {request.donationDate}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1 italic font-medium tracking-tighter uppercase">
                    <Clock size={14} /> at {request.donationTime}
                  </p>
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

        {/* Right Column: Action & Rules */}
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

      {/* Modal remains almost same but with dynamic names */}
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
