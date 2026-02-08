import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Save } from 'lucide-react';
import Swal from 'sweetalert2';

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [divisions, setDivisions] = useState([]); // বিভাগের জন্য
  const [allDistricts, setAllDistricts] = useState([]); // সকল জেলার জন্য
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '', // এটি আসলে Division এর জন্য (ID বা Name স্টোর করবে)
    recipientUpazila: '', // এটি আসলে District এর জন্য (ID বা Name স্টোর করবে)
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });

  // ১. JSON ডেটা ফেচ করা
  useEffect(() => {
    // বিভাগ লোড
    fetch('/divisions.json')
      .then((res) => res.json())
      .then((data) => setDivisions(data))
      .catch((err) => console.error('Error fetching divisions:', err));

    // জেলা লোড
    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data))
      .catch((err) => console.error('Error fetching districts:', err));

    // ২. বর্তমান রিকোয়েস্টের ডেটা লোড (Mock logic)
    const fetchCurrentRequest = async () => {
      // এখানে আপনার API থেকে ডেটা আসবে (যেমন: axios.get)
      const mockData = {
        recipientName: 'Arif Ahmed',
        recipientDistrict: '3', // উদাহরণস্বরূপ ঢাকা বিভাগের ID (আপনার JSON অনুযায়ী নামও হতে পারে)
        recipientUpazila: 'Dhaka', // জেলার নাম
        hospitalName: 'Dhaka Medical College',
        fullAddress: 'Zahir Raihan Rd, Dhaka',
        bloodGroup: 'A+',
        donationDate: '2024-11-20',
        donationTime: '10:00',
        requestMessage: 'Urgent need for heart surgery.',
      };
      setFormData(mockData);
    };
    fetchCurrentRequest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // যদি বিভাগ পরিবর্তন হয়, তবে জেলা ইনপুট রিসেট হবে
      ...(name === 'recipientDistrict' && { recipientUpazila: '' }),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Updated Data:', formData);
      Swal.fire({
        title: 'Updated!',
        text: 'Donation request has been updated successfully.',
        icon: 'success',
        confirmButtonColor: '#ef4444',
      });
      navigate('/dashboard/my-donation-requests');
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-slate-50">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Edit <span className="text-red-600">Donation Request</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Update the details for the blood recipient below.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipient Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
                placeholder="Enter Name"
                required
              />
            </div>

            {/* Blood Group */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Recipient Division (আগে যেখানে District ছিল) */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Recipient Division
              </label>
              <select
                name="recipientDistrict"
                value={formData.recipientDistrict}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700 uppercase text-xs"
                required
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {' '}
                    {/* ID ব্যবহার করা হয়েছে ফিল্টারিংয়ের সুবিধার জন্য */}
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient District (আগে যেখানে Upazila ছিল) */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Recipient District
              </label>
              <select
                name="recipientUpazila"
                value={formData.recipientUpazila}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700 uppercase text-xs"
                required
                disabled={!formData.recipientDistrict}
              >
                <option value="">Select District</option>
                {allDistricts
                  .filter(
                    (dis) =>
                      String(dis.division_id) ===
                      String(formData.recipientDistrict)
                  )
                  .map((dis) => (
                    <option key={dis.id} value={dis.name}>
                      {dis.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Hospital Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Hospital Name
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
                placeholder="e.g. Dhaka Medical College"
              />
            </div>

            {/* Full Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Full Address
              </label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
                placeholder="House, Road, Area details"
              />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
              />
            </div>
          </div>

          {/* Message Area */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Why do you need blood? (Message)
            </label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows="4"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700"
              placeholder="Explain the situation..."
            ></textarea>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              'Updating...'
            ) : (
              <>
                <Save size={20} /> Update Donation Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
