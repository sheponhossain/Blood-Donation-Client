import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaPaperPlane,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const DonationRequest = () => {
  const [allDivisions, setAllDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState('');
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
    const divId = e.target.value;
    setSelectedDivisionId(divId);
    setFilteredDistricts(
      allDistricts.filter((dis) => dis.division_id === divId)
    );
  };

  // 🔥 SweetAlert2 Success Logic
  const handlePostRequest = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Success!',
      text: 'Your blood request has been posted successfully.',
      icon: 'success',
      confirmButtonText: 'Great!',
      confirmButtonColor: '#e11d48', // Blood Red
      iconColor: '#e11d48',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-[30px]',
        title: 'text-2xl font-bold text-gray-800',
        confirmButton: 'rounded-xl px-8 py-3 font-bold italic',
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 relative overflow-hidden">
      {/* Background Heart Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] [background-size:25px_25px]"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header - Red Gradient */}
        <div className="bg-gradient-to-r from-red-600 to-rose-500 rounded-t-[40px] pt-12 pb-24 px-10 text-center shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-white italic tracking-tight">
            Create Blood Request
          </h2>
          <p className="mt-2 text-red-50 text-lg opacity-80 italic">
            Fill out the form below to post an emergency blood request.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-14 -mt-16 border border-white relative z-10">
          <form onSubmit={handlePostRequest} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all shadow-inner"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Blood Group Needed
                </label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer shadow-inner">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Hospital Name
                </label>
                <div className="relative">
                  <FaHospital className="absolute left-5 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka Medical College"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Full Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-red-400" />
                  <input
                    type="text"
                    placeholder="e.g. Ward 5, Bed 12"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Division
                </label>
                <select
                  onChange={handleDivisionChange}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none"
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
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  District
                </label>
                <select
                  disabled={!selectedDivisionId}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((dis) => (
                    <option key={dis.id} value={dis.name}>
                      {dis.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 📅 Blood Red Calendar Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                  Donation Date
                </label>
                <div className="relative calendar-wrapper">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full px-5 py-4 bg-red-50 border border-red-100 rounded-2xl focus:ring-2 focus:ring-red-500 text-red-700 font-bold outline-none transition-all cursor-pointer shadow-inner"
                    dateFormat="MM/dd/yyyy"
                    // Tailwind base classes for the calendar popup
                    calendarClassName="blood-calendar shadow-2xl border-none rounded-2xl overflow-hidden"
                    dayClassName={(date) => 'rounded-full hover:!bg-red-100'}
                  />
                  <FaCalendarAlt className="absolute right-5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest ml-1">
                Reason / Message
              </label>
              <textarea
                rows="3"
                placeholder="Briefly describe the situation..."
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[25px] focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none shadow-inner"
              ></textarea>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-black py-5 rounded-[25px] shadow-xl hover:shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-xl uppercase italic"
              >
                <FaPaperPlane className="text-lg" /> Post Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;
