import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, CreditCard, Wallet } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

const Funding = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme(); // ২. গ্লোবাল থিম স্টেট
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFundings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://blood-donation-server-nu-lyart.vercel.app/payments',
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        }
      );
      const data = await response.json();
      setFundings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundings();
  }, []);

  const totalFunds = fundings.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 transition-colors">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase italic">
            Funding & Donations
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase text-[10px] tracking-[0.3em]">
            Support our blood donation network
          </p>
        </div>

        <Link
          to="/funding"
          className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-8 flex items-center gap-2 shadow-lg shadow-emerald-100 dark:shadow-none transition-all"
        >
          <Plus size={18} /> Give Funding
        </Link>
      </div>

      {/* Summary Card */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex items-center gap-6 max-w-sm transition-colors">
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
          <DollarSign size={32} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
            Total System Funds
          </p>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            ${totalFunds}
          </h2>
        </div>
      </div>

      {/* Funding Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-colors">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-black text-slate-800 dark:text-slate-200 flex items-center gap-2 uppercase text-sm tracking-widest">
            <CreditCard size={18} className="text-red-500" /> Recent
            Contributions
          </h3>
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase">
            {fundings.length} Records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="py-6 px-8">Donor Name</th>
                <th className="py-6 px-4">Amount</th>
                <th className="py-6 px-4">Payment Method</th>
                <th className="py-6 px-4">Date</th>
                <th className="py-6 px-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-20 text-center font-black text-slate-300 dark:text-slate-700 animate-pulse uppercase tracking-widest"
                  >
                    Synchronizing Funds...
                  </td>
                </tr>
              ) : (
                fundings.map((fund) => (
                  <tr
                    key={fund._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group"
                  >
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 font-black text-[10px]">
                          {fund.userName?.charAt(0) || 'U'}
                        </div>
                        <span className="font-black text-slate-700 dark:text-slate-200 tracking-tight italic">
                          {fund.userName}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-4 font-black text-emerald-600 dark:text-emerald-400 tracking-tighter text-xl">
                      +${fund.amount}
                    </td>
                    <td className="py-6 px-4">
                      <div className="flex items-center gap-2">
                        <Wallet
                          size={14}
                          className="text-slate-300 dark:text-slate-600 group-hover:text-red-500 transition-colors"
                        />
                        <span className="font-bold text-slate-600 dark:text-slate-400 text-xs uppercase">
                          {fund.method}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 font-mono text-[10px] bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border dark:border-slate-700">
                          **** {fund.last4}
                        </span>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                      {new Date(fund.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-6 px-8 text-right">
                      <span className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 dark:shadow-none">
                        Success
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && fundings.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-block p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-4">
              <DollarSign
                size={40}
                className="text-slate-200 dark:text-slate-700"
              />
            </div>
            <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest text-xs">
              No funding records found yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Funding;
