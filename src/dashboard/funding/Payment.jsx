import React, { useState } from 'react';
import {
  Heart,
  X,
  CreditCard,
  ShieldCheck,
  Zap,
  TrendingUp,
  Building2,
  Wallet,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
} from 'lucide-react';
import Swal from 'sweetalert2';

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('500');
  const [selectedMethod, setSelectedMethod] = useState('bkash');

  // Real-time States
  const [goalAmount] = useState(100000);
  const [raisedAmount, setRaisedAmount] = useState(65450);
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: 'Anonymous donor',
      amount: 1200,
      time: '2 mins ago',
      method: 'bKash',
    },
    {
      id: 2,
      name: 'Sarah Khan',
      amount: 5000,
      time: '1 hour ago',
      method: 'Visa',
    },
    {
      id: 3,
      name: 'Rakib Hasan',
      amount: 250,
      time: '3 hours ago',
      method: 'Nagad',
    },
  ]);

  const progressPercentage = (raisedAmount / goalAmount) * 100;

  const handlePayment = (e) => {
    e.preventDefault();
    const amountToDonate = parseInt(customAmount);

    if (!amountToDonate || amountToDonate <= 0) {
      return Swal.fire('Error', 'Please enter a valid amount', 'error');
    }

    // 🚀 Update Real-time Data
    setRaisedAmount((prev) => prev + amountToDonate);

    const newDonor = {
      id: Date.now(),
      name: 'You (Just Now)',
      amount: amountToDonate,
      time: 'Just now',
      method: selectedMethod.toUpperCase(),
    };
    setDonors([newDonor, ...donors]);

    setIsModalOpen(false);

    Swal.fire({
      title:
        '<h2 style="color: #e11d48; font-family: italic;">SUCCESSFUL!</h2>',
      html: `You have successfully donated <b>$${amountToDonate}</b>.<br>Thank you for being a hero!`,
      icon: 'success',
      confirmButtonText: 'CLOSE',
      confirmButtonColor: '#e11d48',
      customClass: { popup: 'rounded-[40px]' },
    });
  };

  const mfsMethods = [
    { id: 'bkash', name: 'bKash' },
    { id: 'nagad', name: 'Nagad' },
    { id: 'rocket', name: 'Rocket' },
    { id: 'upay', name: 'Upay' },
  ];

  const bankMethods = [
    { id: 'nexus', name: 'Nexus Pay' },
    { id: 'cellfin', name: 'Cellfin' },
    { id: 'ebl', name: 'EBL Sky' },
    { id: 'city', name: 'City Touch' },
    { id: 'visa', name: 'Visa Card' },
    { id: 'master', name: 'MasterCard' },
    { id: 'amex', name: 'Amex' },
    { id: 'other', name: 'Other Bank' },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] pb-24 font-sans text-slate-100 selection:bg-red-500/30">
      {/* --- HERO & PROGRESS --- */}
      <div className="max-w-6xl mx-auto pt-20 px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[4px] mb-8">
          Active Funding Campaign
        </div>
        <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter mb-10 leading-none">
          STAY{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-400">
            HUMAN
          </span>
        </h1>

        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-10 rounded-[50px] backdrop-blur-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                Total Raised
              </p>
              <h2 className="text-5xl font-black text-white italic">
                ${raisedAmount.toLocaleString()}
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                Target Goal
              </p>
              <h2 className="text-3xl font-bold text-slate-300 italic opacity-60">
                ${goalAmount.toLocaleString()}
              </h2>
            </div>
          </div>

          <div className="relative h-4 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-red-700 via-red-500 to-rose-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(225,29,72,0.6)]"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-red-500 italic">
            <span>{progressPercentage.toFixed(1)}% Completed</span>
            <span>
              {goalAmount - raisedAmount > 0
                ? `$${(goalAmount - raisedAmount).toLocaleString()} Remaining`
                : 'Goal Reached!'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-12 bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-[30px] font-black text-2xl italic uppercase transition-all hover:scale-105 shadow-[0_30px_90px_rgba(225,29,72,0.4)]"
        >
          Donate Now
        </button>
      </div>

      {/* --- RECENT DONORS TABLE --- */}
      <div className="max-w-4xl mx-auto mt-24 px-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            <Award className="text-red-600" /> Recent Life Savers
          </h3>
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Live Updates
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-md">
          <div className="divide-y divide-white/5">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <Heart className="w-5 h-5 text-red-600 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{donor.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {donor.time} via{' '}
                      {donor.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-white italic">
                    ${donor.amount.toLocaleString()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-700 inline ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PAYMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-[#111114] w-full max-w-xl rounded-[60px] border border-white/10 relative z-10 overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-red-600/10 p-10 text-center border-b border-white/5 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-8 top-8 text-slate-500 hover:text-white"
              >
                <X className="w-8 h-8" />
              </button>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                Contribution
              </h2>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">
                Secure Payment Gateway
              </p>
            </div>

            <form onSubmit={handlePayment} className="p-10 space-y-8">
              <div className="text-center">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full text-center text-7xl font-black bg-transparent border-b border-white/5 focus:border-red-600 outline-none text-white py-4"
                  placeholder="0"
                  autoFocus
                />
              </div>

              {/* MFS Grid */}
              <div className="space-y-3">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Wallet className="w-3 h-3 text-red-600" /> Mobile Banking
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {mfsMethods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id)}
                      className={`py-4 rounded-2xl border-2 text-[9px] font-black uppercase transition-all ${selectedMethod === m.id ? 'bg-white border-white text-black' : 'bg-white/5 border-transparent text-slate-500 hover:text-white'}`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Banks Grid */}
              <div className="space-y-3">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Building2 className="w-3 h-3 text-red-600" /> Bank & Cards
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {bankMethods.map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedMethod(bank.id)}
                      className={`py-3 rounded-xl border-2 text-[8px] font-black uppercase transition-all ${selectedMethod === bank.id ? 'bg-red-600 border-red-600 text-white' : 'bg-white/5 border-transparent text-slate-500 hover:text-white'}`}
                    >
                      {bank.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 py-6 rounded-[25px] text-white font-black text-2xl uppercase italic tracking-widest shadow-xl shadow-red-600/20 hover:bg-red-700 transition-all"
              >
                Confirm Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
