import React from 'react';

const DonationProcess = () => {
  const steps = [
    {
      title: 'Registration',
      desc: 'Join our hero network by creating a verified donor profile.',
      image: 'https://i.ibb.co.com/v6XnzGVK/Blood-donation-process.png',
      color: 'border-blue-500',
    },
    {
      title: 'Screening',
      desc: 'Quick physical check-up to ensure your safety and health.',
      image: 'https://i.ibb.co.com/yFGsNdZ5/zd11.jpg',
      color: 'border-amber-500',
    },
    {
      title: 'Donation',
      desc: 'A simple 10-minute process that can save up to three lives.',
      image:
        'https://i.ibb.co.com/ksQTWmzY/The-Well-blood-donation-AS-567403348.jpg',
      color: 'border-red-600',
    },
    {
      title: 'Refreshment',
      desc: 'Relax with juice and snacks to replenish your energy.',
      image:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=500',
      color: 'border-emerald-500',
    },
  ];

  return (
    <section className="px-2 md:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-24">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase  tracking-tighter leading-none">
          How It <span className="text-red-600">Works</span>
        </h2>
        <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold max-w-xl text-sm md:text-base px-4">
          The donation process is simple, safe, and takes very little of your
          time.
        </p>
      </div>

      {/* --- Responsive Steps Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            {/* Image Container - মোবাইলের জন্য সাইজ অ্যাডজাস্ট করা হয়েছে */}
            <div className="relative mb-6 md:mb-8 w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[260px] aspect-square">
              {/* Decorative Frame */}
              <div
                className={`absolute inset-0 border-2 md:border-4 ${step.color} rounded-[1.5rem] md:rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500 -z-0`}
              ></div>

              {/* Actual Image */}
              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] md:rounded-[3rem] shadow-lg md:shadow-2xl z-10 bg-slate-100 dark:bg-slate-800">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Number Badge */}
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 bg-red-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs md:text-lg z-20 shadow-xl border-2 md:border-4 border-white dark:border-slate-900">
                0{idx + 1}
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center px-2">
              <h3 className="text-sm md:text-xl font-black text-slate-900 dark:text-white uppercase italic mb-1 md:mb-2 tracking-tight group-hover:text-red-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm font-bold leading-tight md:leading-relaxed max-w-[180px] md:max-w-[220px] mx-auto line-clamp-2 md:line-clamp-none">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-8 md:mt-8 text-center">
        <button className="px-8 py-3 md:px-10 md:py-4 bg-slate-900 dark:bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all">
          Start Your Journey Now
        </button>
      </div>
    </section>
  );
};

export default DonationProcess;
