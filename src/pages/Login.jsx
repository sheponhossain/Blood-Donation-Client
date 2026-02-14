import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = { email: user.email };

        fetch('https://blood-donation-server-snowy-six.vercel.app/jwt', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.token) {
              localStorage.setItem('access-token', resData.token);

              Swal.fire({
                title: 'Login Successful!',
                text: `Welcome!`,
                icon: 'success',
                confirmButtonColor: '#dc2626',
              });
              navigate(from, { replace: true });
            }
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">Sign In</h2>
          <p className="mt-2 text-sm text-gray-500 italic">
            "Your contribution can save a life"
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transform transition active:scale-95 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            New here?{' '}
            <Link
              to="/register"
              className="text-red-600 font-bold hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-red-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
