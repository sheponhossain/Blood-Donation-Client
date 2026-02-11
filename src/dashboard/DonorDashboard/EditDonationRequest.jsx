import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Save, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [divisions, setDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: '',
    bloodGroup: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });

  const inputClasses =
    'w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 font-bold text-slate-700 outline-none transition-all';
  const labelClasses =
    'text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block';

  // useEffect er bhetore data load hobar ongsho-ti eibhabe modify korun
  useEffect(() => {
    const initializeData = async () => {
      try {
        // ১. আগে Location JSON গুলো fetch করে ফেলি
        const [divRes, disRes] = await Promise.all([
          fetch(`${window.location.origin}/divisions.json`).then((res) =>
            res.json()
          ),
          fetch(`${window.location.origin}/districts.json`).then((res) =>
            res.json()
          ),
        ]);

        setDivisions(divRes);
        setAllDistricts(disRes);

        // ২. এবার DB থেকে Data আনি
        const res = await axiosSecure.get(`/donation-request/${id}`);
        const data = res.data;

        if (data) {
          /* ম্যাজিক পার্ট: 
          ডাটাবেসে যদি 'Dhaka' (নাম) থাকে কিন্তু আপনার সিলেক্ট ফিল্ড ID (1, 2) দিয়ে কাজ করে, 
          তবে আমাদের JSON থেকে ওই নামের ID খুঁজে বের করতে হবে।
        */
          const matchedDivision = divRes.find(
            (d) => d.name.toLowerCase() === (data.division || '').toLowerCase()
          );

          setFormData({
            recipientName: data.recipientName || '',
            bloodGroup: data.bloodGroup || '',
            // যদি ID পাওয়া যায় তবে সেটা দেবে, নাহলে ডাটাবেসেরটা
            recipientDistrict: matchedDivision
              ? String(matchedDivision.id)
              : data.recipientDistrict || '',
            recipientUpazila: data.district || data.recipientUpazila || '',
            hospitalName: data.hospitalName || '',
            fullAddress: data.fullAddress || '',
            division: data.division || '', // ব্যাকএন্ডের জন্য নাম সেভ রাখা
            donationDate: data.donationDate || '',
            donationTime: data.donationTime || '',
            requestMessage: data.message || data.requestMessage || '',
          });
        }
      } catch (err) {
        console.error('Loading Error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'recipientDistrict') {
      const selectedDiv = divisions.find(
        (div) => String(div.id) === String(value)
      );
      setFormData((prev) => ({
        ...prev,
        recipientDistrict: value,
        division: selectedDiv ? selectedDiv.name : '',
        recipientUpazila: '', // Division change hole district reset hoye jabe
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const updatedPayload = {
      ...formData,
      district: formData.recipientUpazila,
      division:
        divisions.find(
          (d) => String(d.id) === String(formData.recipientDistrict)
        )?.name || formData.division,
    };

    try {
      const res = await axiosSecure.patch(
        `/donation-request/${id}`,
        updatedPayload
      );
      if (res.data.modifiedCount > 0 || res.data) {
        Swal.fire({
          title: 'Updated!',
          text: 'Donation request updated successfully.',
          icon: 'success',
          confirmButtonColor: '#e11d48',
          customClass: { popup: 'rounded-[30px]' },
        });
        navigate('/dashboard/my-donation-requests');
      }
    } catch (error) {
      console.error('Update Error:', error);
      Swal.fire('Error', 'Update failed. Try again!', 'error');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center font-black italic text-slate-400 animate-pulse uppercase tracking-widest">
        Loading Data...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-50 relative">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
            Edit <span className="text-red-600">Donation Request</span>
          </h2>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recipient Name & Blood Group (Ager motoi thakbe) */}
            <div className="flex flex-col">
              <label className={labelClasses}>Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClasses}>Blood Group Needed</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className={inputClasses}
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

            {/* Division Selector: value={String(...)} auto-select nishchit korbe */}
            <div className="flex flex-col">
              <label className={labelClasses}>Recipient Division</label>
              <select
                name="recipientDistrict"
                value={formData.recipientDistrict} // সরাসরি formData থেকে value নেবে
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">SELECT DIVISION</option>
                {divisions.map((div) => (
                  <option key={div.id} value={String(div.id)}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Selector: Ekhane value match korbe district name-er sathe */}
            <div className="flex flex-col">
              <label className={labelClasses}>Recipient District</label>
              <select
                name="recipientUpazila"
                value={formData.recipientUpazila} // District Name আসবে
                onChange={handleChange}
                className={inputClasses}
                required
                disabled={!formData.recipientDistrict}
              >
                <option value="">SELECT DISTRICT</option>
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

            {/* Baki fields: Hospital, Address, Date, Time */}
            <div className="flex flex-col">
              <label className={labelClasses}>Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className={labelClasses}>Full Address</label>
              <input
                type="text"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className={labelClasses}>Donation Date</label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className={labelClasses}>Donation Time</label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className={labelClasses}>Reason / Message</label>
            <textarea
              name="requestMessage"
              value={formData.requestMessage}
              onChange={handleChange}
              rows="4"
              className={inputClasses + ' resize-none'}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={updateLoading}
            className="w-full py-5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg"
          >
            {updateLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              <>
                <Save size={20} className="inline mr-2" /> Update Donation
                Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
