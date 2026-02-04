import React from 'react';
import { DollarSign, Plus, CreditCard, Wallet } from 'lucide-react';
import { Link } from 'react-router';

const Funding = () => {
  // ডাটাবেস থেকে আসা ডেটাতে এখন 'method' এবং 'last4' থাকবে
  const fundings = [
    {
      id: 1,
      userName: 'Mahim Ahmed',
      amount: 50,
      date: '2026-02-01',
      method: 'Visa',
      last4: '4242',
    },
    {
      id: 2,
      userName: 'Ariful Islam',
      amount: 120,
      date: '2026-02-03',
      method: 'Mastercard',
      last4: '5555',
    },
    {
      id: 3,
      userName: 'John Doe',
      amount: 30,
      date: '2026-02-04',
      method: 'Visa',
      last4: '1234',
    },
  ];

  const totalFunds = fundings.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
            Funding & Donations
          </h2>
          <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.3em]">
            Support our blood donation network
          </p>
        </div>

        <Link
          to="/dashboard/payment"
          className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-8 flex items-center gap-2"
        >
          <Plus size={18} /> Give Funding
        </Link>
      </div>

      {/* Summary Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 max-w-sm">
        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
          <DollarSign size={32} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Total System Funds
          </p>
          <h2 className="text-4xl font-black text-slate-900">${totalFunds}</h2>
        </div>
      </div>

      {/* Funding Table */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <CreditCard size={18} className="text-slate-400" /> Recent
            Contributions
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 uppercase text-[10px] tracking-widest">
                <th className="py-4 px-6">Donor Name</th>
                <th>Amount</th>
                <th>Payment Method</th> {/* নতুন কলাম */}
                <th>Date</th>
                <th className="text-right px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {fundings.map((fund) => (
                <tr
                  key={fund.id}
                  className="hover:bg-slate-50/30 transition-colors border-b last:border-0"
                >
                  <td className="py-4 px-6 font-bold text-slate-700">
                    {fund.userName}
                  </td>
                  <td className="font-black text-emerald-600 tracking-tighter text-lg">
                    +${fund.amount}
                  </td>
                  {/* পেমেন্ট মেথড সেল */}
                  <td className="text-sm">
                    <div className="flex items-center gap-2">
                      <Wallet size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-600">
                        {fund.method}
                      </span>
                      <span className="text-slate-400 font-mono text-xs">
                        **** {fund.last4}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm text-slate-400 font-medium">
                    {fund.date}
                  </td>
                  <td className="text-right px-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {fundings.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold">
            No funding records found yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Funding;
