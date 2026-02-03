import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { Droplets, Upload, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [divisions, setDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [allUpazilas, setAllUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch fields for dependent dropdowns
  const selectedDivisionId = watch('division');
  const selectedDistrictId = watch('district');

  // Load Initial Data
  useEffect(() => {
    fetch('/divisions.json')
      .then((res) => res.json())
      .then((data) => setDivisions(data));

    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data));

    fetch('/upazilas.json')
      .then((res) => res.json())
      .then((data) => setAllUpazilas(data));
  }, []);

  // Filter Districts when Division changes
  useEffect(() => {
    if (selectedDivisionId) {
      const filtered = allDistricts.filter(
        (d) => d.division_id === selectedDivisionId
      );
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedDivisionId, allDistricts]);

  // Filter Upazilas when District changes
  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = allUpazilas.filter(
        (u) => u.district_id === selectedDistrictId
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, allUpazilas]);

  const onSubmit = async (data) => {
    setLoading(true);
    // ... logic for ImageBB and User Creation (as per your previous code)
    console.log('Form Data:', data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <Droplets className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community and start saving lives.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register('name', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="email@example.com"
            />
          </div>

          {/* Avatar Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload avatar
                  </p>
                </div>
                <input
                  type="file"
                  {...register('avatar', { required: true })}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              {...register('bloodGroup', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="">Select Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Division
            </label>
            <select
              {...register('division', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              {...register('district', { required: true })}
              disabled={!selectedDivisionId}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white disabled:bg-gray-100"
            >
              <option value="">Select District</option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              {...register('password', { required: true, minLength: 6 })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-gray-400"
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
