import React, { useState } from 'react';
import {
  Heart,
  DollarSign,
  Users,
  Award,
  ExternalLink,
  X,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import Swal from 'sweetalert2';

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);

  // Fake Funding Data
  const funders = [
    {
      id: 1,
      name: 'Arifur Rahman',
      amount: 5000,
      date: '20 Feb 2026',
      message: 'Emergency blood bank maintenance support.',
    },
    {
      id: 2,
      name: 'Sumaiya Akhter',
      amount: 2000,
      date: '18 Feb 2026',
      message: 'A small contribution for a great cause.',
    },
    {
      id: 3,
      name: 'Tanvir Hossain',
      amount: 10000,
      date: '15 Feb 2026',
      message: 'To help the underprivileged patients.',
    },
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    setIsModalOpen(false);

    // Payment Success Alert
    Swal.fire({
      title: 'Donation Received!',
      text: `Thank you for donating ৳${selectedAmount}. You are a life saver!`,
      icon: 'success',
      confirmButtonColor: '#e11d48',
      background: '#fff',
      customClass: {
        popup: 'rounded-[30px]',
        confirmButton: 'rounded-xl px-10 py-3 font-bold uppercase italic',
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/heart.png')]"></div>
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tight mb-4 relative z-10">
          Support Our Cause
        </h1>
        <p className="max-w-2xl mx-auto text-red-100 text-lg font-medium opacity-90 relative z-10">
          Your small contribution helps us maintain the platform and reach more
          donors to save lives.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-10 bg-white text-red-600 px-10 py-4 rounded-full font-black text-xl hover:scale-105 transition shadow-2xl uppercase tracking-tighter italic relative z-10"
        >
          Donate Now
        </button>
      </div>

      {/* --- PAYMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-red-600 p-8 text-center text-white relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-6 top-6 hover:rotate-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
              <Heart className="w-12 h-12 mx-auto mb-3 fill-white animate-pulse" />
              <h2 className="text-3xl font-black italic uppercase">
                Make a Donation
              </h2>
              <p className="text-red-100 text-sm">
                Choose an amount to support our mission
              </p>
            </div>

            <form onSubmit={handlePayment} className="p-8 space-y-6">
              {/* Amount Selection */}
              <div className="grid grid-cols-3 gap-3">
                {[200, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 rounded-2xl font-black transition-all border-2 ${selectedAmount === amt ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-red-200'}`}
                  >
                    ৳ {amt}
                  </button>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border-2 border-red-50 rounded-2xl bg-slate-50 cursor-pointer hover:border-red-200 transition">
                    <img
                      src="https://admin.thevibe.asia/wp-content/uploads/2024/03/bkash-logo-C8BB24E480-seeklogo.com_.png"
                      alt="bkash"
                      className="h-6"
                    />
                    <span className="font-bold text-gray-700">bKash</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 border-2 border-red-50 rounded-2xl bg-slate-50 cursor-pointer hover:border-red-200 transition">
                    <CreditCard className="w-6 h-6 text-slate-600" />
                    <span className="font-bold text-gray-700">Card</span>
                  </div>
                </div>
              </div>

              {/* Safety Note */}
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 rounded-xl border border-green-100">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-tighter">
                  100% Secure Transaction
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white font-black py-5 rounded-2xl text-xl uppercase italic shadow-xl shadow-red-100 hover:bg-red-700 transition active:scale-95"
              >
                Confirm Donation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stats and Contributor sections thakbe ager motoi... */}
      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {/* Stats content here */}
      </div>
    </div>
  );
};

export default Payment;
