import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Heart,
  DollarSign,
  Users,
  X,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Smartphone,
  Landmark,
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Assets (Ensure these paths are correct in your project)
import bkashLogo from '../../assets/bkash-logo-png.png';
import nagadLogo from '../../assets/nagan-logo-png.png';
import rocketLogo from '../../assets/rocket-png.png';
import upayLogo from '../../assets/upay-png.png';
import Visa from '../../assets/BankLogo/visa-logo.png';
import Mastercard from '../../assets/BankLogo/mastercard-icon.png';
import DBBL from '../../assets/BankLogo/dutch-bangla-bank-logo.png';
import IBBL from '../../assets/BankLogo/islami-bank-bangladesh-logo.png';

const stripePromise = loadStripe('pk_test_your_key_here');

// --- Checkout Form Component ---
const CheckoutForm = ({ amount, selectedMethod, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!amount || Number(amount) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'অ্যামাউন্ট দিন',
        text: 'সঠিক পরিমাণ টাকা লিখুন।',
        confirmButtonColor: '#EF4444',
      });
      return;
    }

    if (!selectedMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'মেথড সিলেক্ট করুন',
        text: 'একটি পেমেন্ট মাধ্যম বেছে নিন।',
        confirmButtonColor: '#EF4444',
      });
      return;
    }

    setProcessing(true);

    // Simulated API Call / Stripe Payment
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess(Number(amount), selectedMethod);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4 shadow-inner">
        <CardElement
          options={{ style: { base: { fontSize: '16px', color: '#1e293b' } } }}
        />
      </div>
      <button
        type="submit"
        disabled={processing}
        className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-all active:scale-[0.98] shadow-lg uppercase text-xs tracking-widest disabled:opacity-50"
      >
        {processing ? (
          <div className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Verifying Transaction...
          </div>
        ) : (
          `Pay ৳${amount || '0'} Securely`
        )}
      </button>
    </form>
  );
};

// --- Main Funding Page Component ---
const FundingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);

  const allMethods = {
    bkash: bkashLogo,
    nagad: nagadLogo,
    rocket: rocketLogo,
    upay: upayLogo,
    visa: Visa,
    mastercard: Mastercard,
    dbbl: DBBL,
    ibbl: IBBL,
  };

  const [funders, setFunders] = useState([
    {
      id: 1,
      name: 'Arifur Rahman',
      amount: 5000,
      date: '08 Feb 2026',
      method: 'bkash',
      methodImg: bkashLogo,
    },
    {
      id: 2,
      name: 'Sumaiya Akhter',
      amount: 2000,
      date: '05 Feb 2026',
      method: 'visa',
      methodImg: Visa,
    },
    {
      id: 3,
      name: 'Tanvir Hossain',
      amount: 10000,
      date: '01 Feb 2026',
      method: 'nagad',
      methodImg: nagadLogo,
    },
  ]);

  const handlePaymentSuccess = (paidAmount, methodId) => {
    const newDonation = {
      id: Date.now(),
      name: 'Anonymous Donor', // আপনি চাইলে ইউজারের নাম ইনপুট থেকে নিতে পারেন
      amount: paidAmount,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      method: methodId,
      methodImg: allMethods[methodId],
    };

    // Update List & Close Modal
    setFunders([newDonation, ...funders]);
    setIsModalOpen(false);
    setAmount('');
    setSelectedMethod(null);

    // Show Success Message
    Swal.fire({
      title: 'ধন্যবাদ!',
      html: `<p>আপনার <b>৳${paidAmount}</b> অনুদান সফলভাবে গৃহীত হয়েছে।</p>`,
      icon: 'success',
      confirmButtonColor: '#EF4444',
      timer: 3000,
      customClass: { popup: 'rounded-[24px]' },
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] pb-20 font-sans">
      {/* Header Section */}
      <div className="bg-slate-950 py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/10 opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase mb-6 tracking-tighter">
            Support Our <span className="text-red-600">Blood Network</span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl uppercase italic"
          >
            Contribute Now
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              l: 'Total Raised',
              v: `৳ ${funders.reduce((a, b) => a + b.amount, 0).toLocaleString()}`,
              i: <DollarSign className="text-green-500" />,
            },
            {
              l: 'Total Backers',
              v: funders.length,
              i: <Users className="text-blue-500" />,
            },
            {
              l: 'Lives Saved',
              v: '1,240',
              i: <Heart className="text-red-500" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[35px] shadow-xl border border-slate-50 flex items-center gap-6"
            >
              <div className="bg-slate-50 p-4 rounded-2xl">{stat.i}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {stat.l}
                </p>
                <h3 className="text-2xl font-black text-slate-800">{stat.v}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-xl font-black italic uppercase text-slate-800">
              History
            </h2>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full font-black text-[10px] uppercase">
              <ShieldCheck className="w-4 h-4" /> SSL Secure
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                  <th className="px-10 py-5">Donor Name</th>
                  <th className="px-10 py-5">Amount</th>
                  <th className="px-10 py-5">Payment Method</th>
                  <th className="px-10 py-5 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {funders.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-slate-50/80 transition-all font-bold group"
                  >
                    <td className="px-10 py-6 text-slate-700 uppercase">
                      {f.name}
                    </td>
                    <td className="px-10 py-6 font-black text-xl text-slate-900 group-hover:text-red-600">
                      ৳{f.amount}
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3 bg-slate-100 w-fit px-4 py-2 rounded-xl border border-slate-200">
                        <img
                          src={f.methodImg}
                          alt={f.method}
                          className="h-5 w-auto object-contain"
                        />
                        <span className="text-[9px] font-black uppercase text-slate-500">
                          {f.method}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right text-slate-400 text-xs italic">
                      {f.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-lg rounded-[45px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[92vh] flex flex-col">
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-3 rounded-2xl">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-black uppercase tracking-widest text-xs italic">
                  Safe Donation
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white/10 p-2 rounded-full hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block">
                  Amount (BDT)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="500"
                    className="w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-red-500 outline-none font-black text-4xl"
                  />
                </div>
              </div>

              {/* Mobile Banking Grid */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-4 h-4 text-red-600" />
                  <span className="text-[10px] font-black uppercase text-slate-600">
                    Mobile Banking
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(allMethods)
                    .slice(0, 4)
                    .map(([id, img]) => (
                      <div
                        key={id}
                        onClick={() => setSelectedMethod(id)}
                        className={`relative h-16 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center p-3 ${selectedMethod === id ? 'border-red-500 bg-red-50 scale-105 shadow-lg' : 'border-slate-50 bg-slate-50'}`}
                      >
                        <img
                          src={img}
                          alt={id}
                          className="h-full w-full object-contain"
                        />
                        {selectedMethod === id && (
                          <CheckCircle2 className="absolute -top-2 -right-2 w-5 h-5 text-red-600 bg-white rounded-full shadow-md" />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Card Grid */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Landmark className="w-4 h-4 text-red-600" />
                  <span className="text-[10px] font-black uppercase text-slate-600">
                    Bank Cards
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(allMethods)
                    .slice(4)
                    .map(([id, img]) => (
                      <div
                        key={id}
                        onClick={() => setSelectedMethod(id)}
                        className={`relative h-16 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-center p-3 ${selectedMethod === id ? 'border-red-500 bg-red-50 scale-105 shadow-lg' : 'border-slate-50 bg-slate-50'}`}
                      >
                        <img
                          src={img}
                          alt={id}
                          className="h-full w-full object-contain"
                        />
                        {selectedMethod === id && (
                          <CheckCircle2 className="absolute -top-2 -right-2 w-5 h-5 text-red-600 bg-white rounded-full shadow-md" />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    amount={amount}
                    selectedMethod={selectedMethod}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }`}</style>
    </div>
  );
};

export default FundingPage;
