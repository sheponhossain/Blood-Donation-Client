import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Info,
  ShieldCheck,
  Scale,
  AlertCircle,
  Heart,
  Download,
  ExternalLink,
} from 'lucide-react';

const TermsOfService = () => {
  const terms = [
    {
      title: 'User Eligibility',
      content:
        'To register as a donor, you must be at least 18 years of age. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.',
      icon: <Info className="text-blue-600" />,
    },
    {
      title: 'Non-Commercial Use',
      content:
        'This service is provided for humanitarian purposes. Selling or buying blood for financial gain is strictly prohibited and violates local and international laws. Violation will result in immediate account termination.',
      icon: <Heart className="text-red-600" />,
    },
    {
      title: 'Security & Privacy',
      content:
        "You are responsible for safeguarding your password. We encourage you to use 'strong' passwords with your account. We cannot and will not be liable for any loss or damage arising from your failure to comply.",
      icon: <ShieldCheck className="text-green-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#111111] font-sans transition-colors duration-300">
      {/* --- Simple Google Header --- */}
      <div className="max-w-4xl mx-auto pt-20 pb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center border border-gray-100 dark:border-slate-700">
            <Scale className="text-gray-600 dark:text-gray-300" size={24} />
          </div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Legal
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-normal text-[#202124] dark:text-white mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-[#5F6368] dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
          These terms outline the rules and regulations for the use of Blood
          Hero's platform. By accessing this website, we assume you accept these
          terms.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* --- Content Grid (Material 3 Cards) --- */}
        <div className="space-y-4">
          {terms.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1E1E1E] p-8 rounded-[28px] border border-[#dadce0] dark:border-slate-800 hover:bg-[#fdfdfd] dark:hover:bg-[#252525] transition-colors"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 h-fit rounded-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#202124] dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#5F6368] dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Google-like Information Box --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 p-6 bg-[#E8F0FE] dark:bg-blue-900/20 rounded-[24px] flex gap-5 items-start border border-blue-100 dark:border-blue-900/30"
        >
          <AlertCircle
            className="text-[#1967D2] dark:text-blue-400 shrink-0 mt-1"
            size={20}
          />
          <div className="text-sm text-[#1967D2] dark:text-blue-300 leading-relaxed">
            <p className="font-bold mb-1">Updates to these terms</p>
            We may update our Terms of Service from time to time. We will notify
            you of any changes by posting the new Terms on this page and
            updating the "Last updated" date.
          </div>
        </motion.div>

        {/* --- Standard Google Action Buttons --- */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button className="px-8 py-3 bg-[#1A73E8] hover:bg-[#1765cc] text-white rounded-full font-medium transition-all shadow-sm hover:shadow-md active:scale-95 text-sm">
            I accept the terms
          </button>
          <button className="px-8 py-3 border border-[#dadce0] dark:border-slate-700 text-[#1A73E8] dark:text-blue-400 hover:bg-[#f1f3f4] dark:hover:bg-slate-800 rounded-full font-medium transition-all text-sm flex items-center gap-2">
            <Download size={16} /> Download PDF
          </button>
          <button className="px-6 py-3 text-[#5F6368] dark:text-slate-400 hover:text-[#202124] dark:hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            Print version <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* --- Minimal Footer Info --- */}
      <div className="max-w-4xl mx-auto px-6 border-t border-[#dadce0] dark:border-slate-800 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#70757A] dark:text-slate-500">
          Last updated: March 1, 2026
        </p>
        <div className="flex gap-6 text-xs font-medium text-[#70757A] dark:text-slate-500">
          <button className="hover:underline">Privacy Policy</button>
          <button className="hover:underline">Cookie Policy</button>
          <button className="hover:underline">Community Guidelines</button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
