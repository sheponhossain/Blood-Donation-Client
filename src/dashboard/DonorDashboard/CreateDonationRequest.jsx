import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaPaperPlane,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaClock,
  FaBan,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateDonationRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [allDivisions, setAllDivisions] = useState([]);

  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState('');
  const [selectedDivisionName, setSelectedDivisionName] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    fetch('/divisions.json')
      .then((res) => res.json())
      .then((data) => setAllDivisions(data));
    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data));
  }, []);

  const handleDivisionChange = (e) => {
    const divName = e.target.options[e.target.selectedIndex].text;
    const divId = e.target.value;
    setSelectedDivisionId(divId);
    setSelectedDivisionName(divName);
    setFilteredDistricts(
      allDistricts.filter((dis) => dis.division_id === divId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg text-red-600"></span>
      </div>
    );
  }

  if (user?.status === 'blocked') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-red-50 max-w-lg">
          <FaBan className="text-red-600 text-7xl mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-black text-gray-800 uppercase italic tracking-tighter">
            Access Denied
          </h2>
          <p className="mt-4 text-gray-500 font-medium">
            Your account has been{' '}
            <span className="text-red-600 font-bold">blocked</span>. Blocked
            users are not permitted to create blood donation requests.
          </p>
        </div>
      </div>
    );
  }

  const handlePostRequest = async (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      requesterName: user?.displayName || 'Anonymous',
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      bloodGroup: form.bloodGroup.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      district: form.district.value,
      division: selectedDivisionName,
      donationDate: startDate.toISOString().split('T')[0],
      donationTime: form.donationTime.value,
      message: form.message.value,
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/donation-requests', requestData);

      if (res.data.insertedId) {
        Swal.fire({
          title: 'Successfully Requested!',
          text: 'Your blood request is now pending for donors.',
          icon: 'success',
          confirmButtonColor: '#e11d48',
          customClass: { popup: 'rounded-[30px]' },
        });
        form.reset();
        setStartDate(new Date());
      }
    } catch (err) {
      console.error('Request Failed:', err.response?.data || err.message);
      Swal.fire({
        title: 'Error!',
        text:
          err.response?.data?.message || 'Failed to post request. Try again!',
        icon: 'error',
      });
    }
  };

  const inputClasses =
    'w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all shadow-inner font-semibold text-gray-700';
  const labelClasses =
    'text-xs font-bold text-gray-400 uppercase tracking-widest ml-2 mb-1 block';

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] [background-size:25px_25px]"></div>

      <div className="max-w-4xl mx-auto relative">
        <div className="bg-gradient-to-r from-red-600 to-rose-500 rounded-t-[40px] pt-12 pb-24 px-10 text-center shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-white italic tracking-tight">
            Create Blood Request
          </h2>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-14 -mt-16 border border-white relative z-10">
          <form onSubmit={handlePostRequest} className="space-y-8">
            {/* Requester Info (Read Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 rounded-[30px] border border-slate-100">
              <div className="space-y-2">
                <label className={labelClasses}>Requester Name</label>
                <div className="relative">
                  <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    value={user?.displayName || ''}
                    readOnly
                    className={`${inputClasses} pl-12 bg-slate-200 opacity-70 cursor-not-allowed`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Requester Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className={`${inputClasses} pl-12 bg-slate-200 opacity-70 cursor-not-allowed`}
                  />
                </div>
              </div>
            </div>

            {/* Recipient Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={labelClasses}>Recipient Name</label>
                <input
                  name="recipientName"
                  type="text"
                  placeholder="Patient's Full Name"
                  className={inputClasses}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>Blood Group Needed</label>
                <select
                  name="bloodGroup"
                  required
                  className={inputClasses + ' cursor-pointer'}
                >
                  <option value="">Select Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                    (g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Hospital & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={labelClasses}>Hospital Name</label>
                <div className="relative">
                  <FaHospital className="absolute left-5 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    name="hospitalName"
                    type="text"
                    placeholder="e.g. DMCH"
                    className={`${inputClasses} pl-12`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>Full Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    name="fullAddress"
                    type="text"
                    placeholder="Road No, Ward, Floor"
                    className={`${inputClasses} pl-12`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location & Time Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className={labelClasses}>Division</label>
                <select
                  onChange={handleDivisionChange}
                  className={inputClasses}
                  required
                >
                  <option value="">Select Division</option>
                  {allDivisions.map((div) => (
                    <option key={div.id} value={div.id}>
                      {div.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>District</label>
                <select
                  name="district"
                  disabled={!selectedDivisionId}
                  className={inputClasses}
                  required
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((dis) => (
                    <option key={dis.id} value={dis.name}>
                      {dis.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className={labelClasses}>Donation Time</label>
                <div className="relative">
                  <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    name="donationTime"
                    type="time"
                    className={`${inputClasses} pl-12`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date & Message */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={labelClasses}>Donation Date</label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full pl-12 pr-5 py-4 bg-red-50 border border-red-100 rounded-2xl focus:ring-2 focus:ring-red-500 text-red-700 font-bold outline-none cursor-pointer"
                    dateFormat="MM/dd/yyyy"
                  />
                  <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelClasses}>Reason / Message</label>
                <textarea
                  name="message"
                  rows="1"
                  placeholder="Details..."
                  className={`${inputClasses} resize-none`}
                  required
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r curp from-red-600 to-rose-600 text-white font-black py-5 rounded-[25px] shadow-xl hover:shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-xl uppercase italic tracking-widest"
              >
                <FaPaperPlane className="text-lg" /> Post Blood Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
