import React, { useState } from 'react';
import {
  User,
  Mail,
  Heart,
  MapPin,
  Building2,
  Calendar,
  Clock,
  MessageSquare,
  Droplets,
  Send,
  AlertTriangle,
} from 'lucide-react';
import Swal from 'sweetalert2';

const CreateDonationRequest = () => {
  // ১. Fake Auth User (এখান থেকে নাম, ইমেইল এবং স্ট্যাটাস আসবে)
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'active', // এখানে 'blocked' করে চেক করতে পারেন
  });

  // ২. ফর্ম স্টেট
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });

  // ৩. হ্যান্ডলার ফাংশন
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ব্লকড ইউজার চেক
    if (user.status === 'blocked') {
      Swal.fire({
        title: 'Access Denied!',
        text: 'Blocked users are not allowed to create donation requests.',
        icon: 'error',
        confirmButtonColor: '#dc2626',
      });
      return;
    }

    // সাকসেস মেসেজ (এখানে API কল হবে এবং ডিফল্ট স্ট্যাটাস 'pending' যাবে)
    console.log('Submitting Request:', {
      ...formData,
      status: 'pending',
      requesterName: user.name,
      requesterEmail: user.email,
    });

    Swal.fire({
      title: 'Request Created!',
      text: 'Your blood donation request is now pending for donors.',
      icon: 'success',
      confirmButtonColor: '#dc2626',
      customClass: { popup: 'rounded-[30px]' },
    });
  };

  // ইউজার ব্লকড থাকলে তাকে ফর্ম না দেখিয়ে ওয়ার্নিং দেখানো
  if (user.status === 'blocked') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-[40px] border-2 border-dashed border-red-100 p-10 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">
          Account Restricted
        </h2>
        <p className="text-slate-500 max-w-sm font-medium">
          Your account has been blocked. You cannot create new blood donation
          requests at this moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="mb-10 flex items-center gap-4">
        <div className="p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-100">
          <Heart size={28} className="fill-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
            Create Request
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
            Fill in the details to find a donor
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-50 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          {/* Section 1: Requester Info (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <FormInput
              label="Requester Name"
              icon={<User size={18} />}
              value={user.name}
              readOnly
            />
            <FormInput
              label="Requester Email"
              icon={<Mail size={18} />}
              value={user.email}
              readOnly
            />
          </div>

          {/* Section 2: Recipient Details */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] border-l-4 border-red-600 pl-3">
              Recipient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                label="Recipient Name"
                name="recipientName"
                placeholder="Enter full name"
                onChange={handleChange}
                required
              />
              <FormSelect
                label="Blood Group"
                name="bloodGroup"
                icon={<Droplets size={18} />}
                options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                onChange={handleChange}
                required
              />
              <FormSelect
                label="District"
                name="recipientDistrict"
                icon={<MapPin size={18} />}
                options={['Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet']}
                onChange={handleChange}
                required
              />
              <FormSelect
                label="Upazila"
                name="recipientUpazila"
                icon={<MapPin size={18} />}
                options={['Mirpur', 'Gulshan', 'Pahartali', 'Sadar']}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section 3: Hospital & Location */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] border-l-4 border-red-600 pl-3">
              Hospital & Venue
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                label="Hospital Name"
                name="hospitalName"
                icon={<Building2 size={18} />}
                placeholder="e.g. Dhaka Medical College"
                onChange={handleChange}
                required
              />
              <FormInput
                label="Full Address Line"
                name="fullAddress"
                icon={<MapPin size={18} />}
                placeholder="e.g. House 12, Road 5, Mirpur-10"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Section 4: Date & Message */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] border-l-4 border-red-600 pl-3">
              Donation Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                label="Donation Date"
                name="donationDate"
                type="date"
                icon={<Calendar size={18} />}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Donation Time"
                name="donationTime"
                type="time"
                icon={<Clock size={18} />}
                onChange={handleChange}
                required
              />
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                  Request Message
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute top-4 left-4 text-slate-300"
                    size={18}
                  />
                  <textarea
                    name="requestMessage"
                    rows="4"
                    placeholder="Describe why you need blood in detail..."
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 font-bold text-slate-700 outline-none transition-all resize-none"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-3 uppercase text-[11px] tracking-[0.2em]"
            >
              <Send size={18} /> Send Donation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Form Helper Components ---

const FormInput = ({
  label,
  icon,
  type = 'text',
  readOnly = false,
  ...props
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
        {icon || <User size={18} />}
      </div>
      <input
        type={type}
        readOnly={readOnly}
        className={`w-full pl-12 pr-6 py-4 rounded-2xl font-bold outline-none transition-all ${
          readOnly
            ? 'bg-white/50 text-slate-400 border border-slate-100 cursor-not-allowed'
            : 'bg-slate-50 text-slate-800 border-none focus:ring-2 focus:ring-red-600'
        }`}
        {...props}
      />
    </div>
  </div>
);

const FormSelect = ({ label, icon, options, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300">
        {icon}
      </div>
      <select
        className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-600 font-bold text-slate-700 outline-none appearance-none transition-all"
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default CreateDonationRequest;
