import React from 'react';
import { CheckCircle } from 'lucide-react';

const Eligibility = () => {
  const requirements = [
    'Age: 18 - 60 years',
    'Weight: At least 50 kg',
    'Hemoglobin: Min 12.5 g/dL',
    'Last Donation: 3 months ago',
    'Health: No recent fever',
    'Blood Pressure: Normal range',
  ];

  return (
    <section className="px-4 md:px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 border border-slate-100 dark:border-slate-800 overflow-hidden relative transition-all duration-500">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content: Requirements */}
          <div className="z-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-8 md:mb-12">
              Are you <span className="text-red-600">Eligible?</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-red-200 dark:hover:border-red-900/30 transition-all group"
                >
                  <CheckCircle
                    className="text-red-500 shrink-0 transition-transform group-hover:scale-110"
                    size={20}
                  />
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] md:text-[13px] uppercase tracking-wide">
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Important Note */}
          <div className="relative mt-8 lg:mt-0 px-2 sm:px-0">
            {/* Box decoration for background on larger screens */}
            <div className="hidden lg:block absolute -inset-4 bg-red-600/10 rounded-[3.5rem] -rotate-3 blur-sm"></div>

            <div className="relative bg-red-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl lg:rotate-3 hover:rotate-0 transition-transform duration-500">
              <h3 className="text-xl md:text-2xl font-black uppercase mb-4 italic flex items-center gap-3">
                Important Note
              </h3>
              <p className="font-medium opacity-90 leading-relaxed text-sm md:text-base">
                Always ensure you've had a good meal and stayed hydrated before
                donating. If you have any chronic illness, please consult our
                medical team first.
              </p>

              <div className="mt-8 pt-8 border-t border-white/20 flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center font-black shrink-0">
                  !
                </div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                  Safety First Protocol <br className="hidden sm:block" />{' '}
                  Guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
