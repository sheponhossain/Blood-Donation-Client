import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  ArrowRight,
  Globe,
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useTheme } from '../../context/ThemeContext';

const ContactUs = () => {
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Success!',
      text: 'Message sent successfully. We will get back to you soon!',
      icon: 'success',
      confirmButtonColor: '#ef4444',
      background: theme === 'dark' ? '#1e293b' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      customClass: { popup: 'rounded-[30px]' },
    });
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
            Contact <span className="text-red-600">Us</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
            Get in touch for life-saving support
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* --- Left: Contact Info Cards --- */}
          <div className="lg:w-1/3 space-y-6">
            <ContactCard
              icon={<Phone className="text-blue-500" />}
              title="Emergency Call"
              info="+880 1234 567 890"
              delay={0.1}
            />
            <ContactCard
              icon={<Mail className="text-red-500" />}
              title="Official Email"
              info="support@bloodhero.com"
              delay={0.2}
            />
            <ContactCard
              icon={<MapPin className="text-emerald-500" />}
              title="Main Office"
              info="Dhaka, Bangladesh"
              delay={0.3}
            />

            {/* Live Status Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-6 rounded-[2rem] bg-slate-900 text-white flex items-center gap-4 border border-white/5 shadow-2xl"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </div>
              <p className="text-xs font-black uppercase tracking-widest italic">
                Live Support Available Now
              </p>
            </motion.div>
          </div>

          {/* --- Right: Interactive Form --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 bg-slate-50 dark:bg-slate-900 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 border border-slate-100 dark:border-slate-800 relative"
          >
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
            >
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-8 py-5 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-red-600 rounded-[25px] outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-8 py-5 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-red-600 rounded-[25px] outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  className="w-full px-8 py-6 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-red-600 rounded-[30px] outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="md:col-span-2 w-full md:w-auto px-12 py-5 bg-slate-900 dark:bg-red-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-colors hover:bg-red-600 dark:hover:bg-white dark:hover:text-slate-900"
              >
                Send Message <ArrowRight size={18} />
              </motion.button>
            </form>

            {/* Background Accent Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/5 rounded-full blur-3xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper Component for Info Cards
const ContactCard = ({ icon, title, info, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm hover:shadow-xl transition-all"
  >
    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <p className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-200 tracking-tight">
        {info}
      </p>
    </div>
  </motion.div>
);

export default ContactUs;
