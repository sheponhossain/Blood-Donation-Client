import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  Heart,
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AuthContext } from '../../providers/AuthProvider';

// Assets
import bkashLogo from '../../assets/bkash-logo-png.png';
import nagadLogo from '../../assets/nagan-logo-png.png';
import rocketLogo from '../../assets/rocket-png.png';
import upayLogo from '../../assets/upay-png.png';
import Visa from '../../assets/BankLogo/visa-logo.png';
import Mastercard from '../../assets/BankLogo/mastercard-icon.png';
import DBBL from '../../assets/BankLogo/dutch-bangla-bank-logo.png';
import IBBL from '../../assets/BankLogo/islami-bank-bangladesh-logo.png';

const stripePromise = loadStripe(
  'pk_test_51SzahMBpKiUaBuAyZcfHACkmBGcvTkrV2sHx1hwqUUF1OzYqczFDnu6a978CbAVJWBZ4H0bahJTGMt673wZGXZRT00l1WDZ3h8'
);

const CheckoutForm = ({ amount, selectedMethod, onPaymentSuccess, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [trxId, setTrxId] = useState('');

  useEffect(() => {
    const cardMethods = ['visa', 'mastercard', 'dbbl', 'ibbl'];
    if (amount >= 10 && cardMethods.includes(selectedMethod)) {
      axios
        .post('http://localhost:5000/create-payment-intent', { price: amount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error(err));
    }
  }, [amount, selectedMethod]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire('Error', 'Please login first', 'error');
    setProcessing(true);

    if (['bkash', 'nagad', 'rocket', 'upay'].includes(selectedMethod)) {
      if (!trxId) {
        Swal.fire('Required', 'Enter Transaction ID', 'warning');
        setProcessing(false);
        return;
      }
      onPaymentSuccess(Number(amount), selectedMethod, trxId);
      setProcessing(false);
      return;
    }

    if (!stripe || !elements || !clientSecret) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: { name: user?.displayName, email: user?.email },
        },
      }
    );

    if (error) {
      Swal.fire('Failed', error.message, 'error');
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      onPaymentSuccess(Number(amount), selectedMethod, paymentIntent.id);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      {['bkash', 'nagad', 'rocket', 'upay'].includes(selectedMethod) ? (
        <div className="mb-4">
          <input
            type="text"
            required
            placeholder="Transaction ID (e.g. 8N7X6W5Q)"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all font-mono text-sm uppercase text-center"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
          />
        </div>
      ) : (
        <div className="mb-4 p-3 border border-gray-200 rounded-xl bg-gray-50">
          <CardElement
            options={{
              style: { base: { fontSize: '14px', color: '#424770' } },
            }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={processing || !selectedMethod || amount < 10}
        className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:bg-gray-200 disabled:shadow-none text-sm tracking-wide uppercase"
      >
        {processing ? 'Processing...' : `Confirm ৳${amount || 0}`}
      </button>
    </form>
  );
};

const FundingPage = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [fundings, setFundings] = useState([]);

  const mobileMethods = {
    bkash: bkashLogo,
    nagad: nagadLogo,
    rocket: rocketLogo,
    upay: upayLogo,
  };
  const bankingMethods = {
    visa: Visa,
    mastercard: Mastercard,
    dbbl: DBBL,
    ibbl: IBBL,
  };
  const allLogos = { ...mobileMethods, ...bankingMethods };

  const fetchFundings = () =>
    axios
      .get('http://localhost:5000/payments')
      .then((res) => setFundings(res.data));
  useEffect(() => {
    fetchFundings();
  }, []);

  const handlePaymentSuccess = async (paidAmount, methodId, transactionId) => {
    const paymentData = {
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      amount: paidAmount,
      date: new Date(),
      method: methodId,
      transactionId,
      status: 'success',
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/payments',
        paymentData
      );
      if (res.data.insertedId) {
        fetchFundings();
        setIsModalOpen(false);
        setAmount('');
        setSelectedMethod(null);
        Swal.fire({
          icon: 'success',
          title: 'Thank You!',
          text: 'Contribution successful.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#dc2626',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-sans">
      {/* Hero Section */}
      <div className="relative bg-white px-6 py-28 text-center border-b border-slate-100 overflow-hidden">
        {/* Lottie Animation in Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-70 pointer-events-none">
          <div className="w-full max-w-9/12 mb-10">
            <DotLottieReact
              src="https://lottie.host/4c89fb84-d22e-4bb9-b6b4-809ab0f2aecf/9djO7V6o8h.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Support Our <span className="text-red-600">Mission</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mb-8 font-medium">
            Your contribution helps us save lives through our blood network.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:bg-red-700 transition-all active:scale-95 uppercase tracking-tight"
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Main Container for Stats & Table */}
      <div className="max-w-5xl mx-auto px-6 relative z-20">
        {/* Stat Cards - Positioned to overlap slightly with Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mt-12 mb-12">
          <StatCard
            label="Total Raised"
            value={`৳${fundings.reduce((a, b) => a + Number(b.amount), 0).toLocaleString()}`}
          />
          <StatCard label="Donors" value={fundings.length} />
          <StatCard label="Impact" value="1.2k+" />
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Donor Recognition
            </h3>
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">
              Live Updates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-50">
                {fundings.map((f, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/80 transition-all group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm border border-white shadow-sm shrink-0">
                          {f.userName?.charAt(0) || 'D'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm tracking-tight group-hover:text-red-600 transition-colors">
                            {f.userName}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium lowercase">
                            {f.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-red-600 font-black text-lg tracking-tighter">
                          ৳{f.amount}
                        </span>
                        <span className="text-[9px] text-slate-300 uppercase font-bold tracking-widest">
                          Contribution
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-red-100 group-hover:bg-white transition-all">
                          <img
                            src={allLogos[f.method]}
                            className="h-5 w-auto object-contain"
                            alt={f.method}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter hidden sm:block">
                          {f.method}
                        </span>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="text-slate-400 font-bold text-[10px] bg-slate-50 px-3 py-1.5 rounded-lg inline-block group-hover:bg-white transition-all">
                        {new Date(f.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Section (Unchanged) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/40'}
                  className="w-8 h-8 rounded-full border border-red-100"
                  alt=""
                />
                <h3 className="font-bold text-slate-800 tracking-tight">
                  Secure Donation
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-7">
              <div className="mb-6">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  Amount (BDT)
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-red-500 outline-none font-bold text-3xl transition-all shadow-inner"
                />
              </div>

              <div className="space-y-6">
                <MethodGrid
                  title="Mobile Wallet"
                  icon={<Smartphone size={12} />}
                  methods={mobileMethods}
                  selected={selectedMethod}
                  onSelect={setSelectedMethod}
                />
                <MethodGrid
                  title="Banking & Cards"
                  icon={<CreditCard size={12} />}
                  methods={bankingMethods}
                  selected={selectedMethod}
                  onSelect={setSelectedMethod}
                />
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={amount}
                  selectedMethod={selectedMethod}
                  onPaymentSuccess={handlePaymentSuccess}
                  user={user}
                />
              </Elements>

              <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={12} className="text-green-500" /> SSL Secure
                Payment
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components (Unchanged) ---

const MethodGrid = ({ title, icon, methods, selected, onSelect }) => (
  <div>
    <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-3 ml-1">
      {icon} {title}
    </div>
    <div className="grid grid-cols-4 gap-2.5">
      {Object.entries(methods).map(([id, img]) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`relative aspect-square p-2.5 border rounded-xl transition-all flex items-center justify-center bg-white ${
            selected === id
              ? 'border-red-500 bg-red-50/30 ring-2 ring-red-500/10'
              : 'border-slate-100 hover:border-slate-200'
          }`}
        >
          <img src={img} className="h-full w-full object-contain" alt={id} />
          {selected === id && (
            <CheckCircle2
              size={12}
              className="absolute -top-1.5 -right-1.5 text-red-600 bg-white rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:translate-y-[-4px] transition-all duration-300">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
      {label}
    </p>
    <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight lowercase">
      {value}
    </h3>
  </div>
);

export default FundingPage;
