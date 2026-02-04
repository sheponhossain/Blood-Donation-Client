import React, { useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  Droplets,
  ShieldCheck,
  Calendar,
  Edit3,
  Save,
  Camera,
  Globe,
  Activity,
  Heart,
  CheckCircle,
  X,
  LayoutGrid,
} from 'lucide-react';
import Swal from 'sweetalert2';

const Profile = () => {
  // এডিট মোড কন্ট্রোল করার স্টেট
  const [isEditable, setIsEditable] = useState(false);

  const [user, setUser] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    photoURL:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    role: 'Admin',
    bloodGroup: 'A+',
    division: 'Dhaka',
    district: 'Dhaka',
    status: 'active',
    joinedDate: 'January 2024',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditable(false);
    Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully.',
      icon: 'success',
      confirmButtonColor: '#e11d48',
      customClass: { popup: 'rounded-3xl' },
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      {/* Banner */}
      <div className="relative h-48 w-full bg-gradient-to-r from-red-600 to-rose-400 rounded-t-[40px] shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="relative -mt-32 px-6 md:px-12">
        <div className="bg-white/80 backdrop-blur-md rounded-[40px] shadow-2xl border border-white/20 p-8 md:p-12">
          <form
            onSubmit={handleUpdate}
            className="flex flex-col lg:flex-row gap-12"
          >
            {/* Left: Avatar Section */}
            <div className="lg:w-1/3 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 to-rose-400 rounded-full blur opacity-20"></div>
                <img
                  src={user.photoURL}
                  className="relative w-44 h-44 rounded-full border-8 border-white object-cover shadow-2xl"
                  alt="Profile"
                />
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => document.getElementById('fileInput').click()}
                    className="absolute bottom-2 right-2 p-3 bg-red-600 shadow-xl rounded-full text-white hover:scale-110 transition-transform z-10"
                  >
                    <Camera size={20} />
                  </button>
                )}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="text-center mt-8 space-y-3">
                <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">
                  {user.displayName}
                </h1>
                <div className="flex gap-2 justify-center">
                  <span className="px-4 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
                    {user.role}
                  </span>
                  <span className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                    <Activity size={10} /> {user.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-10">
                <StatCard
                  label="Blood"
                  value={user.bloodGroup}
                  color="text-red-600"
                />
                <StatCard label="Rank" value="Gold" color="text-amber-500" />
              </div>
            </div>

            {/* Right: Form Section */}
            <div className="lg:w-2/3 space-y-10">
              <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                <h2 className="text-xl font-black text-slate-800 tracking-widest flex items-center gap-3">
                  <ShieldCheck className="text-red-600" size={24} /> PROFILE
                  CORE
                </h2>

                {!isEditable ? (
                  <button
                    type="button"
                    onClick={() => setIsEditable(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all shadow-xl shadow-slate-200"
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                    >
                      <Save size={14} /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditable(false)}
                      className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <EditableField
                  label="Full Name"
                  icon={<User size={18} />}
                  name="displayName"
                  value={user.displayName}
                  editable={isEditable}
                  onChange={handleChange}
                />

                <EditableField
                  label="Email Address"
                  icon={<Mail size={18} />}
                  name="email"
                  value={user.email}
                  editable={false}
                />

                <EditableField
                  label="Division"
                  icon={<LayoutGrid size={18} />}
                  name="division"
                  value={user.division}
                  editable={isEditable}
                  onChange={handleChange}
                  isSelect
                  options={[
                    'Dhaka',
                    'Chittagong',
                    'Rajshahi',
                    'Sylhet',
                    'Khulna',
                    'Barisal',
                    'Rangpur',
                    'Mymensingh',
                  ]}
                />

                <EditableField
                  label="District"
                  icon={<MapPin size={18} />}
                  name="district"
                  value={user.district}
                  editable={isEditable}
                  onChange={handleChange}
                />

                <EditableField
                  label="Blood Group"
                  icon={<Droplets size={18} />}
                  name="bloodGroup"
                  value={user.bloodGroup}
                  editable={isEditable}
                  onChange={handleChange}
                  isSelect
                  options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
                />

                <EditableField
                  label="Country"
                  icon={<Globe size={18} />}
                  name="country"
                  value="Bangladesh"
                  editable={false}
                />
              </div>

              {/* Joined Date Display */}
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl w-fit">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Member Since: {user.joinedDate}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, color }) => (
  <div className="bg-slate-50/50 p-4 rounded-[25px] text-center border border-slate-100 shadow-sm">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">
      {label}
    </p>
    <p className={`text-xl font-black ${color}`}>{value}</p>
  </div>
);

const EditableField = ({
  label,
  icon,
  name,
  value,
  editable,
  onChange,
  isSelect,
  options,
}) => (
  <div className="relative border-b-2 border-slate-100 focus-within:border-red-500 transition-colors pb-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
      {icon} {label}
    </p>
    {isSelect && editable ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent font-black text-slate-800 outline-none py-1 appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editable}
        className={`w-full bg-transparent font-black text-slate-800 outline-none py-1 ${!editable ? 'opacity-70 cursor-not-allowed' : 'text-red-600'}`}
      />
    )}
  </div>
);

export default Profile;
