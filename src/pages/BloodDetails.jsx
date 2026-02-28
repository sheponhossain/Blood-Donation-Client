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
  Info,
  AlignLeft,
  ChevronRight,
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { useTheme } from '../context/ThemeContext';

const BloodDetails = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

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
        title: 'Authentication Required',
        text: 'Please log in to confirm your donation.',
        icon: 'info',
        confirmButtonColor: '#1a73e8', // Google Blue
      });
      return;
    }

    try {
      const donorInfo = {
        status: 'inprogress',
        donorName: user?.displayName || user?.name || 'Anonymous Donor',
        donorEmail: user?.email,
      };

      const res = await axiosSecure.patch(
        `/donation-request/status/${id}`,
        donorInfo
      );

      if (res.data.modifiedCount > 0) {
        setRequest({ ...request, status: 'inprogress' });
        setShowModal(false);
        Swal.fire({
          title: 'Confirmation Successful',
          text: 'Thank you for your life-saving commitment.',
          icon: 'success',
          confirmButtonColor: '#1a73e8',
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setShowModal(false);
      Swal.fire({
        title: 'Error',
        text: 'Action could not be completed.',
        icon: 'error',
      });
    }
  };

  // --- Google Style Skeleton Loader ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] pt-16 px-6">
        <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
          <div className="h-10 w-48 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-3xl"></div>
              <div className="h-32 bg-gray-50 dark:bg-gray-800 rounded-3xl"></div>
            </div>
            <div className="h-96 bg-gray-50 dark:bg-gray-800 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!request)
    return (
      <div className="text-center py-20 text-gray-400">Request not found.</div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1113] text-[#1F1F1F] dark:text-[#E3E3E3] transition-colors duration-300">
      {/* Top Navigation Bar Style Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F1113]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-sm font-medium flex items-center gap-2 text-gray-500">
            Requests <ChevronRight size={14} />{' '}
            <span className="text-red-600 font-bold uppercase">
              {request.bloodGroup} Group
            </span>
          </div>
          <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <Droplets size={18} className="text-red-600" />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details & Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-white leading-tight">
                Request for {request.recipientName}
              </h1>
              <div className="flex flex-wrap gap-4 items-center text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium">
                  <MapPin size={14} /> {request.district}, {request.division}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium">
                  <Clock size={14} /> {request.donationTime}
                </span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#F8F9FA] dark:bg-[#1E1F20] rounded-[2rem] border border-gray-100 dark:border-gray-800">
                <Hospital
                  className="text-blue-600 dark:text-blue-400 mb-4"
                  size={24}
                />
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Hospital Location
                </h3>
                <p className="text-xl font-semibold mb-1">
                  {request.hospitalName}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {request.fullAddress}
                </p>
              </div>

              <div className="p-8 bg-[#F8F9FA] dark:bg-[#1E1F20] rounded-[2rem] border border-gray-100 dark:border-gray-800">
                <Calendar
                  className="text-blue-600 dark:text-blue-400 mb-4"
                  size={24}
                />
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Appointment Date
                </h3>
                <p className="text-xl font-semibold mb-1">
                  {request.donationDate}
                </p>
                <p className="text-sm text-gray-500 italic">
                  Preferred Time: {request.donationTime}
                </p>
              </div>
            </div>

            {/* Description - Google Keep Style */}
            <div className="p-8 bg-white dark:bg-[#0F1113] rounded-[2rem] border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold mb-4 text-lg">
                <AlignLeft size={20} className="text-gray-400" /> Note from
                Requester
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {request.message ||
                  'The requester has not provided additional details. Please contact them directly for specific instructions or preparation requirements before the donation.'}
              </p>
            </div>
          </div>

          {/* Right Column: Floating Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Blood Group Card */}
            <div className="p-10 bg-red-600 rounded-[2.5rem] text-white shadow-xl shadow-red-200 dark:shadow-none flex flex-col items-center text-center">
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-80 mb-2">
                Blood Group Needed
              </p>
              <h2 className="text-8xl font-bold mb-4">{request.bloodGroup}</h2>
              <Droplets
                size={32}
                fill="white"
                className="opacity-50 animate-pulse"
              />
            </div>

            {/* Contact & Action Card */}
            <div className="p-8 bg-white dark:bg-[#1E1F20] rounded-[2.5rem] border border-gray-200 dark:border-gray-700 shadow-sm">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Info size={16} /> Contact Details
              </h4>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <UserIcon size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      Name
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {request.requesterName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">
                      {request.requesterEmail}
                    </p>
                  </div>
                </div>
              </div>

              {request.status === 'pending' ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Heart size={18} fill="currentColor" /> Confirm My Donation
                </button>
              ) : (
                <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-400 py-4 rounded-full font-bold text-center text-sm italic">
                  Status:{' '}
                  {request.status === 'inprogress' ? 'Assigned' : 'Completed'}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Google Style Dialog/Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-gray-900/20 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#2D2E30] w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Confirm this donation?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
              By confirming, you agree to visit{' '}
              <strong>{request.hospitalName}</strong> to help{' '}
              <strong>{request.recipientName}</strong>. Your contact info will
              be shared with the requester.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 text-sm font-medium text-[#1a73e8] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDonation}
                className="px-6 py-2.5 text-sm font-medium bg-[#1a73e8] text-white hover:bg-[#1557b0] rounded-full transition-shadow shadow-sm hover:shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDetails;
