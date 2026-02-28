import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ShieldCheck, Copyright, Lock, Globe, ArrowRight } from 'lucide-react';

const CopyrightNotice = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0b0b0b] flex flex-col items-center justify-center p-6 font-sans">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-100/50 dark:bg-red-900/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-2xl w-full bg-white dark:bg-[#161616] rounded-[40px] shadow-2xl shadow-blue-500/5 border border-gray-200 dark:border-white/5 overflow-hidden"
      >
        {/* Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>

        <div className="p-8 md:p-12">
          {/* Header & Logo Seal */}
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center border border-gray-100 dark:border-white/10 mb-4 shadow-inner"
            >
              <Copyright size={32} className="text-[#1A73E8]" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Intellectual Property Notice
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Verified Legal Documentation
            </p>
          </div>

          {/* Unique Content Cards */}
          <div className="grid gap-4">
            <div className="p-6 bg-[#F1F3F4] dark:bg-white/5 rounded-3xl border border-transparent hover:border-blue-500/30 transition-all group">
              <div className="flex gap-4">
                <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider mb-1">
                    Ownership
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    All original content, design, and code on this platform are
                    the exclusive property of{' '}
                    <span className="text-[#1A73E8] font-bold">
                      Blood Hero Foundation
                    </span>{' '}
                    © {currentYear}.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F1F3F4] dark:bg-white/5 rounded-3xl border border-transparent hover:border-red-500/30 transition-all">
              <div className="flex gap-4">
                <Lock className="text-red-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider mb-1">
                    Usage Rights
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Unauthorized reproduction, modification, or distribution is
                    strictly prohibited. You may only use the assets for
                    personal, non-commercial purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* External Links Section */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                <Globe size={14} /> International Protection Enabled
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-[#1A73E8] hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-full transition-all group">
                Request Permissions{' '}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-[10px] text-gray-400 font-mono tracking-widest uppercase"
      >
        Auth-ID: BH-2026-REG-40492-X
      </motion.p>
    </div>
  );
};

export default CopyrightNotice;
