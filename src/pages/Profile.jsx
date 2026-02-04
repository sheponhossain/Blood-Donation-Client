import React, { useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  Droplets,
  ShieldCheck,
  Calendar,
  Edit3,
  X,
  Save,
  Camera,
  Globe,
  Activity,
  Heart,
  CheckCircle,
} from 'lucide-react';
import Swal from 'sweetalert2';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    photoURL:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    role: 'Admin',
    bloodGroup: 'A+',
    district: 'Dhaka',
    upazila: 'Mirpur',
    status: 'active',
    joinedDate: 'January 2024',
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ইমেজ প্রিভিউ করার জন্য FileReader ব্যবহার
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  // SweetAlert2 হ্যান্ডলার
  const handleUpdate = (e) => {
    e.preventDefault();

    // সিমুলেটিং আপডেট
    setIsModalOpen(false);

    Swal.fire({
      title: 'Success!',
      text: 'Your profile has been updated professionally.',
      icon: 'success',
      confirmButtonColor: '#e11d48', // Tailwind red-600
      background: '#fff',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl px-6 py-2',
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      {/* Upper Banner Section */}
      <div className="relative h-48 w-full bg-gradient-to-r from-red-600 to-rose-400 rounded-t-[40px] shadow-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      {/* Main Content Card */}
      <div className="relative -mt-32 px-6 md:px-12">
        <div className="bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl border border-white/20 p-8">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column: Image & Stats */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-rose-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={user.photoURL}
                  className="relative w-44 h-44 rounded-full border-8 border-white object-cover shadow-xl"
                  alt="Profile"
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-2 right-2 p-3 bg-white shadow-lg rounded-full text-red-600 hover:scale-110 transition-transform"
                >
                  <Camera size={20} />
                </button>
              </div>

              <div className="text-center mt-6 space-y-2">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight italic">
                  {user.displayName}
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {user.role}
                  </span>
                  <span className="px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <Activity size={10} /> {user.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-10">
                <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Blood Type
                  </p>
                  <p className="text-xl font-black text-red-600">
                    {user.bloodGroup}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Verified
                  </p>
                  <CheckCircle
                    size={24}
                    className="mx-auto text-blue-500 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="md:w-2/3 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-800 tracking-widest flex items-center gap-2">
                  <ShieldCheck className="text-red-600" size={24} /> GENERAL
                  INFORMATION
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Edit3 size={16} /> Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <InfoItem
                  icon={<User size={18} />}
                  label="Full Name"
                  value={user.displayName}
                />
                <InfoItem
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={user.email}
                />
                <InfoItem
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={`${user.upazila}, ${user.district}`}
                />
                <InfoItem
                  icon={<Globe size={18} />}
                  label="Country"
                  value="Bangladesh"
                />
                <InfoItem
                  icon={<Calendar size={18} />}
                  label="Joined Network"
                  value={user.joinedDate}
                />
                <InfoItem
                  icon={<Heart size={18} />}
                  label="Last Donation"
                  value="Never"
                />
              </div>

              {/* Bio / About Section */}
              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  About / Bio
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Dedicated blood donor and community volunteer. Committed to
                  saving lives and supporting the BloodFlow network through
                  active participation and leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ELITE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-800">
                UPDATE PROFILE
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-10 space-y-6">
              {/* Clickable Image Upload Section */}
              <div className="flex flex-col items-center mb-6">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-400 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-300"></div>
                  <img
                    src={user.photoURL}
                    className="relative w-28 h-28 rounded-full border-4 border-white object-cover shadow-xl transition-transform group-hover:scale-105"
                    alt="Preview"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <p className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Click photo to upload
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Display Name" value={user.displayName} />
                <InputGroup
                  label="Blood Group"
                  value={user.bloodGroup}
                  isSelect
                />
                <InputGroup label="District" value={user.district} />
                <InputGroup label="Upazila" value={user.upazila} />
                <div className="md:col-span-2 opacity-50 pointer-events-none">
                  <InputGroup
                    label="Photo Path (Selected)"
                    value={user.photoURL.slice(0, 40) + '...'}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="flex-grow bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl uppercase tracking-widest"
                >
                  <Save size={18} className="inline mr-2" /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-10 bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
        {label}
      </p>
      <p className="text-slate-800 font-black tracking-tight">{value}</p>
    </div>
  </div>
);

const InputGroup = ({ label, value, isSelect = false }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
      {label}
    </label>
    {isSelect ? (
      <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700 appearance-none">
        <option>{value}</option>
        <option>A+</option>
        <option>B+</option>
        <option>O+</option>
        <option>AB+</option>
      </select>
    ) : (
      <input
        type="text"
        defaultValue={value}
        className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700 shadow-inner"
      />
    )}
  </div>
);

export default Profile;
