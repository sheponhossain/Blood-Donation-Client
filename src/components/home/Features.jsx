import React from 'react';
import { Heart, Search, Users, Zap, ArrowRight } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTheme } from '../../context/ThemeContext';

const Features = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();

  const coreFeatures = [
    {
      title: 'Find Blood Instantly',
      desc: 'Locate compatible blood donors near your location within seconds using our smart search.',
      icon: <Search className="text-white" size={28} />,
      bg: 'bg-rose-500',
      shadow: 'shadow-rose-200 dark:shadow-none',
    },
    {
      title: 'Emergency Request',
      desc: 'Post urgent blood requests and get immediate help through our fast-acting donor network.',
      icon: <Zap className="text-white" size={28} />,
      bg: 'bg-red-600',
      shadow: 'shadow-red-200 dark:shadow-none',
    },
    {
      title: 'Verified Community',
      desc: 'Every user and donor is verified by our system to ensure maximum safety and trust for everyone.',
      icon: <Users className="text-white" size={28} />,
      bg: 'bg-rose-700',
      shadow: 'shadow-rose-300 dark:shadow-none',
    },
  ];

  return (
    <section className="py-20 bg-[#fffafa] dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-50 dark:bg-red-900/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-rose-50 dark:bg-rose-900/10 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-left max-w-5xl mx-auto md:mx-0">
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 mb-6">
            <Heart size={14} className="fill-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Reliable Blood Network
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-16">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                Saving Lives <span className="text-red-600">One Drop</span>{' '}
                <br className="hidden md:block" />
                At A Time.
              </h2>
            </div>

            <div className="max-w-md border-l-2 border-red-100 dark:border-slate-800 pl-6 py-1">
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                "Connecting selfless donors with those in urgent need through a
                secure and verified ecosystem built on trust."
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreFeatures.map((f, i) => (
            <div
              key={i}
              className="relative p-10 bg-white dark:bg-slate-900 rounded-[40px] border border-red-50 dark:border-slate-800 hover:border-red-100 dark:hover:border-slate-700 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(225,29,72,0.15)] transition-all duration-500 group"
            >
              <div
                className={`w-16 h-16 ${f.bg} ${f.shadow} rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}
              >
                {f.icon}
              </div>

              <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-4 tracking-tight uppercase">
                {f.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-8 max-w-[250px]">
                {f.desc}
              </p>

              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-500 group-hover:gap-4 transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Impact Counter */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox count="12k+" label="Happy Donors" />
          <StatBox count="8k+" label="Requests Solved" />
          <StatBox count="45+" label="Districts Covered" />
          <StatBox count="24/7" label="Emergency Support" />
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ count, label }) => (
  <div className="p-6 bg-white dark:bg-slate-900 border border-red-50 dark:border-slate-800 rounded-3xl text-center shadow-sm transition-colors">
    <h4 className="text-2xl font-black text-red-600 dark:text-red-500 tracking-tighter">
      {count}
    </h4>
    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
      {label}
    </p>
  </div>
);

export default Features;
