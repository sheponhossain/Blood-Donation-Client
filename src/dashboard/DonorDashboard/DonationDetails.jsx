import React, { useEffect, useState } from 'react';
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

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  // User Context (Mock)
  const loggedInUser = { name: 'Current User', email: 'user@example.com' };

  useEffect(() => {
    // API Implementation: axiosSecure.get(`/donation-request/${id}`)
    setRequest({
      recipientName: 'Rahim Ali',
      recipientDistrict: 'Dhaka',
      recipientUpazila: 'Dhanmondi',
      hospitalName: 'Dhaka Medical College Hospital',
      fullAddress: 'Zahir Raihan Rd, Bakshibazar, Dhaka',
      bloodGroup: 'O+',
      donationDate: '2024-05-15',
      donationTime: '10:30 AM',
      requestMessage:
        'Patient is undergoing heart surgery. Urgent blood donation is required by tomorrow morning. Your help could save a life.',
      status: 'pending',
    });
  }, [id]);

  const handleConfirmDonation = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Success!',
      text: 'You have committed to this donation.',
      icon: 'success',
      confirmButtonColor: '#dc2626',
    });
    document.getElementById('donate_modal').close();
  };

  if (!request)
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="loading loading-spinner loading-lg text-error"></div>
      </div>
    );

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
            <span className="text-red-600 font-black">
              #{id?.slice(-5) || 'Detail'}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Status: {request.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Essential Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Card */}
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
                    {request.recipientUpazila}, {request.recipientDistrict}
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

          {/* Message Box */}
          <div className="bg-slate-50 rounded-[2rem] p-8 border border-dashed border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={18} className="text-slate-400" />
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">
                Requester's Message
              </h3>
            </div>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              "{request.requestMessage}"
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
                    By clicking the button below, you are committing to donate
                    blood for this person.
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
                  <p className="text-slate-500 font-bold text-sm">
                    Unavailable
                  </p>
                </div>
              )}

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>{' '}
                  Donor Requirements
                </div>
                <ul className="text-xs text-slate-500 space-y-2 font-medium">
                  <li>• Must be physically healthy</li>
                  <li>• Weight should be 50kg or above</li>
                  <li>• Last donation was at least 4 months ago</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Modal */}
      <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[2.5rem] p-0 overflow-hidden bg-white max-w-md border-none">
          <div className="bg-red-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Droplet size={32} fill="white" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight italic">
              Confirmation
            </h3>
            <p className="text-red-100 text-xs font-bold uppercase tracking-widest mt-1">
              Final Step
            </p>
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
                    value={loggedInUser.name}
                    readOnly
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-bold text-sm focus:ring-0"
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
                    value={loggedInUser.email}
                    readOnly
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-bold text-sm focus:ring-0"
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
                  className="w-full py-4 bg-white text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600"
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
