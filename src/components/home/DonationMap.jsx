import React from 'react';
import { MapPin, Activity } from 'lucide-react';

const DonationMap = () => {
  const simpleMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.270395352675!2d90.4125181!3d23.810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c3642c3d0973b4!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd';

  return (
    <section className="px-6 max-w-7xl mx-auto transition-colors duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-8 md:p-16 text-slate-900 dark:text-white relative overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5 transition-all duration-500">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none hidden dark:block"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-600/20 text-red-600 dark:text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Activity size={12} className="animate-pulse" /> Live Status
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
              Regional <br /> <span className="text-red-600">Blood</span> Grid
            </h2>

            <p className="font-bold text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest leading-loose mb-10">
              Connecting thousands of donors across all{' '}
              <span className="text-slate-900 dark:text-white">
                64 districts
              </span>
              .
            </p>

            <div className="space-y-4">
              {[
                { label: 'Critical Zones', color: 'bg-red-500', count: '12' },
                {
                  label: 'Stable Supply',
                  color: 'bg-emerald-500',
                  count: '42',
                },
                { label: 'Volunteers', color: 'bg-blue-500', count: '1.2k' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 ${stat.color} rounded-full ${stat.label === 'Critical Zones' ? 'animate-ping' : ''}`}
                    ></div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </span>
                  </div>
                  <span className="font-black italic text-xl text-slate-900 dark:text-white">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-[450px] md:h-[600px] w-full rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 shadow-2xl transition-all duration-700">
              <iframe
                title="Donation Map"
                src={simpleMapUrl}
                className="w-full h-full transition-all duration-1000 grayscale dark:invert dark:opacity-80 hover:grayscale-0 hover:invert-0 hover:opacity-100"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

              {/* Map Overlay Label */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between pointer-events-none translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                  <MapPin size={18} className="text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Dhaka Main Grid
                  </span>
                </div>
                <div className="text-[9px] font-bold bg-red-600 text-white px-2 py-1 rounded-md uppercase">
                  Live
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationMap;
