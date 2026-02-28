import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Bell,
  UserCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <UserCheck className="text-blue-600" />,
      title: 'Information We Collect',
      content:
        'When you register as a donor or request blood, we collect personal information such as your name, blood group, contact number, and location to facilitate the donation process.',
    },
    {
      icon: <Eye className="text-red-600" />,
      title: 'How We Use Your Data',
      content:
        'Your data is used to connect donors with recipients, verify accounts, and send critical alerts regarding emergency blood requirements in your area.',
    },
    {
      icon: <Lock className="text-green-600" />,
      title: 'Data Security',
      content:
        'We implement industry-standard security measures to protect your sensitive information. Your contact details are only shared with verified parties during a donation emergency.',
    },
    {
      icon: <FileText className="text-amber-600" />,
      title: 'Third-Party Sharing',
      content:
        'We do not sell or rent your personal information. Data is only shared with medical institutions or verified users when absolutely necessary for life-saving purposes.',
    },
    {
      icon: <Bell className="text-purple-600" />,
      title: 'Your Rights',
      content:
        'You have the right to update your donation status, hide your profile from search results, or delete your account at any time through the user dashboard.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#111111] transition-colors duration-300 font-sans">
      <div className="max-w-4xl mx-auto pt-20 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-sm flex items-center justify-center border border-gray-100 dark:border-slate-700">
            <ShieldCheck size={24} className="text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Safety Center
          </span>
        </motion.div>

        <h1 className="text-3xl text-center md:text-5xl font-normal text-[#202124] dark:text-white mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-lg text-center text-[#5F6368] dark:text-slate-400 max-w-2xl leading-relaxed">
          At Blood Hero, we are committed to protecting your personal
          information and your right to privacy. This policy explains how we
          handle your data.
        </p>
      </div>

      {/* --- Content Grid (Material 3 Style) --- */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-4">
          {sections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-[#1E1E1E] p-8 rounded-[28px] border border-[#DADCE0] dark:border-slate-800 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="p-3 bg-gray-50 dark:bg-slate-800 h-fit rounded-xl transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-medium text-[#202124] dark:text-white">
                      {item.title}
                    </h3>
                    <ChevronRight
                      className="text-gray-300 group-hover:text-blue-500 transition-colors"
                      size={20}
                    />
                  </div>
                  <p className="text-[#5F6368] dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {item.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Google Support Section --- */}
        <div className="mt-16 border-t border-[#DADCE0] dark:border-slate-800 pt-12 text-left md:text-center">
          <h4 className="text-2xl font-normal text-[#202124] dark:text-white mb-4">
            Need more help?
          </h4>
          <p className="text-[#5F6368] dark:text-slate-400 mb-8 max-w-xl mx-auto">
            If you have questions about our privacy practices, you can visit our
            Help Center or contact our privacy team directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-2.5 bg-[#1A73E8] hover:bg-[#1765CC] text-white rounded-full font-medium transition-all text-sm shadow-sm hover:shadow-md">
              Contact Privacy Officer
            </button>
            <button className="px-8 py-2.5 border border-[#DADCE0] dark:border-slate-700 text-[#1A73E8] dark:text-blue-400 hover:bg-[#F1F3F4] dark:hover:bg-slate-800 rounded-full font-medium transition-all text-sm flex items-center gap-2">
              Help Center <ExternalLink size={14} />
            </button>
          </div>
        </div>

        {/* --- Last Updated --- */}
        <div className="mt-20 text-center">
          <p className="text-xs text-[#70757A] dark:text-slate-500 uppercase tracking-widest font-bold">
            Last Updated: March 1, 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
