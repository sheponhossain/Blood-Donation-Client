import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Message Received!',
      text: 'Our team will contact you within 24 hours.',
      icon: 'success',
      confirmButtonColor: '#ef4444',
      customClass: { popup: 'rounded-[30px]' },
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-slate-900 rounded-[50px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Left Panel: Contact Info (Dark Theme) */}
          <div className="lg:w-2/5 bg-gradient-to-br from-red-600 to-rose-700 p-12 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-black/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
                  Let's save <br /> lives together.
                </h2>
                <p className="text-red-100 text-sm font-medium leading-relaxed opacity-80 max-w-[280px]">
                  Have questions about blood donation or need emergency support?
                  We're here for you 24/7.
                </p>
              </div>

              <div className="space-y-8 my-12">
                <ContactLink
                  icon={<Phone size={20} />}
                  label="Emergency Call"
                  value="+880 1234 567 890"
                />
                <ContactLink
                  icon={<Mail size={20} />}
                  label="Support Email"
                  value="hello@Blood Donation.com"
                />
                <ContactLink
                  icon={<Clock size={20} />}
                  label="Response Time"
                  value="Within 24 Hours"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MessageCircle size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MapPin size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Form (Light Theme) */}
          <div className="lg:w-3/5 bg-white p-12">
            <div className="mb-10">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
                Send a Message
              </h3>
              <div className="h-1 w-10 bg-red-600 rounded-full"></div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent border-2 focus:border-red-100 focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent border-2 focus:border-red-100 focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700"
                  placeholder="john@example.com"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-6 py-4 bg-slate-50 border-transparent border-2 focus:border-red-100 focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700 resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="group w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                >
                  Submit Message{' '}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactLink = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 group">
    <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white group-hover:text-red-600 transition-all">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-bold text-red-200 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-bold tracking-tight">{value}</p>
    </div>
  </div>
);

export default ContactUs;
