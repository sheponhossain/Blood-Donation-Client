import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Droplets, Upload, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [divisions, setDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const selectedDivisionId = watch('division');
  // eslint-disable-next-line no-unused-vars
  const selectedDistrictId = watch('district');
  const avatarFile = watch('avatar');

  useEffect(() => {
    fetch('/divisions.json')
      .then((res) => res.json())
      .then((data) => setDivisions(data));
    fetch('/districts.json')
      .then((res) => res.json())
      .then((data) => setAllDistricts(data));
  }, []);

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

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return Swal.fire('Error', 'Passwords do not match!', 'error');
    }

    setLoading(true);

    try {
      const imageFile = data.avatar[0];
      const formData = new FormData();
      formData.append('image', imageFile);
      const imgBBKey = '02ede86040a806d18640942ecc23f6cc';
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
        formData
      );

      if (imgRes.data.success) {
        const photoURL = imgRes.data.data.display_url;

        await createUser(data.email, data.password);
        await updateUserProfile(data.name, photoURL);

        const newUser = {
          name: data.name,
          email: data.email,
          password: data.password,
          bloodGroup: data.bloodGroup,
          district: allDistricts.find(
            (d) => String(d.id) === String(data.district)
          )?.name,
          division: divisions.find(
            (d) => String(d.id) === String(data.division)
          )?.name,
          avatar: photoURL,
          status: 'active',
          role: 'donor',
        };
        const serverRes = await axios.post(
          'http://localhost:5000/register',
          newUser
        );

        if (serverRes.data.message === 'Registration Successful') {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Registration Successful & Saved to Database!',
            timer: 2000,
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Registration Error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      Swal.fire('Error', `Registration failed: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Droplets className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Create account
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register('name', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              placeholder="email@example.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden">
              {avatarFile && avatarFile[0] ? (
                <img
                  src={URL.createObjectURL(avatarFile[0])}
                  className="h-full w-full object-cover"
                  alt="preview"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    Click to upload avatar
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                {...register('avatar', { required: true })}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              {...register('bloodGroup', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none"
            >
              <option value="">Select Group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Division
            </label>
            <select
              {...register('division', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white outline-none"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              {...register('district', { required: true })}
              disabled={!selectedDivisionId}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white disabled:bg-gray-100 outline-none"
            >
              <option value="">Select District</option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              {...register('password', { required: true, minLength: 6 })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', { required: true })}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg shadow-red-200 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600">
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
