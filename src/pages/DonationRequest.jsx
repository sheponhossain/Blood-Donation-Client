import React, { useState, useEffect } from 'react';
import {
  FaPaperPlane,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';

const DonationRequest = () => {
  const [allDivisions, setAllDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedDivisionId, setSelectedDivisionId] = useState('');

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
    const filtered = allDistricts.filter((dis) => dis.division_id === divId);
    setFilteredDistricts(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 relative overflow-hidden">
      {/* Soft Heart/Dot Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ef4444 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div className="max-w-4xl mx-auto relative group">
        {/* Curved Header Section with Red Gradient */}
        <div className="bg-gradient-to-br from-red-600 via-red-500 to-rose-500 rounded-t-[50px] pt-12 pb-20 px-10 text-center shadow-xl transition-all duration-500 group-hover:shadow-red-200/50">
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight drop-shadow-md">
            Create Blood Request
          </h2>
          <p className="mt-3 text-red-100 font-medium text-lg italic opacity-90">
            Every drop counts. Post your emergency now.
          </p>
        </div>

        {/* Premium Form Card */}
        <div className="bg-white rounded-[50px] shadow-2xl p-8 md:p-14 -mt-12 border border-white/50 backdrop-blur-sm">
          <form className="space-y-10">
            {/* Row 1: Names & Blood Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  Recipient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner placeholder:text-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  Blood Group Needed
                </label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner cursor-pointer appearance-none">
                    <option value="">Select Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    )}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-red-400 font-bold">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Hospital & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  Hospital Name
                </label>
                <div className="relative">
                  <FaHospital className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500 text-lg" />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka Medical College"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  Full Address
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500 text-lg" />
                  <input
                    type="text"
                    placeholder="e.g. Ward 5, Bed 12"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Location & Red Styled Calendar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  Division
                </label>
                <select
                  onChange={handleDivisionChange}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner cursor-pointer"
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
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  District
                </label>
                <select
                  disabled={!selectedDivisionId}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner disabled:opacity-50"
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
                <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                  Donation Date
                </label>
                <div className="relative group/cal">
                  <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-red-600 z-10 text-xl" />
                  <input
                    type="date"
                    className="w-full pl-14 pr-5 py-4 bg-red-50/50 border-2 border-red-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all shadow-sm text-red-700 font-bold cursor-pointer 
                    [color-scheme:light] 
                    [&::-webkit-calendar-picker-indicator]:bg-red-500 [&::-webkit-calendar-picker-indicator]:rounded-md [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert-[0.1]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Message Box */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2 uppercase tracking-widest">
                Reason / Message
              </label>
              <textarea
                rows="4"
                placeholder="Briefly describe the emergency situation..."
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-[30px] focus:border-red-500 focus:bg-white outline-none transition-all shadow-inner resize-none placeholder:text-gray-300"
              ></textarea>
            </div>

            {/* Custom Post Request Button */}
            <div className="pt-6 flex justify-center">
              <button
                type="submit"
                className="group relative w-full md:w-[400px] overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 text-white font-black py-5 rounded-[30px] shadow-[0_15px_35px_-10px_rgba(225,29,72,0.6)] hover:shadow-red-400/40 transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-2xl uppercase tracking-tighter italic"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaPaperPlane className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                  Post Request
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 font-semibold italic">
          <span className="h-px w-8 bg-gray-200"></span>
          Please ensure all information is accurate
          <span className="h-px w-8 bg-gray-200"></span>
        </div>
      </div>
    </div>
  );
};

export default DonationRequest;
