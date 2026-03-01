import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck } from 'lucide-react';

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();
  const { signIn, googleSignIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = { email: user.email };
        fetch('https://blood-donation-server-nu-lyart.vercel.app/jwt', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.token) {
              localStorage.setItem('access-token', resData.token);
              Swal.fire({
                title: 'Success!',
                text: 'Logged in with Google',
                icon: 'success',
                confirmButtonColor: '#dc2626',
              }).then(() => {
                navigate(from, { replace: true });
              });
            }
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({ title: 'Error', text: error.message, icon: 'error' });
      });
  };

  // --- Demo Login Handler ---
  const handleDemoLogin = () => {
    const demoEmail = 'admin@hero.com';
    const demoPassword = 'password123';

    setValue('email', demoEmail);
    setValue('password', demoPassword);
    onSubmit({ email: demoEmail, password: demoPassword });
  };

  const onSubmit = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = { email: user.email };

        fetch('https://blood-donation-server-nu-lyart.vercel.app/jwt', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.token) {
              localStorage.setItem('access-token', resData.token);

              Swal.fire({
                title: 'Login Successful!',
                text: `Welcome Back!`,
                icon: 'success',
                confirmButtonColor: '#dc2626',
              }).then(() => {
                navigate(from, { replace: true });
              });
            }
          });
      })
      .catch((error) => {
        console.error(error);
        let errorMessage = 'Something went wrong!';

        if (error.code === 'auth/invalid-credential') {
          errorMessage =
            'Invalid email or password. Please check your credentials.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        }

        Swal.fire({
          title: 'Login Failed',
          text: errorMessage,
          icon: 'error',
          confirmButtonColor: '#dc2626',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-800 transition-all">
        <div className="text-center">
          <h2 className="text-3xl font-black text-red-600 dark:text-red-500 uppercase italic tracking-tighter">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 font-medium italic">
            "Your contribution can save a life"
          </p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                placeholder="admin@hero.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-bold">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-xl transform transition active:scale-95 shadow-lg shadow-red-500/20"
          >
            Login
          </button>
        </form>

        {/* --- Google Style Demo Login Button --- */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-slate-800"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-gray-400 font-bold">
              Quick Access
            </span>
          </div>
        </div>

        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-3 px-4 cursor-pointer bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-bold rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all active:scale-95"
        >
          <ShieldCheck size={18} /> Login as Demo Admin
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-slate-400 font-medium">
            New here?{' '}
            <Link
              to="/register"
              className="text-red-600 dark:text-red-500 font-black hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-bold text-gray-400 dark:text-slate-500 hover:text-red-500 transition-colors uppercase tracking-tighter"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
