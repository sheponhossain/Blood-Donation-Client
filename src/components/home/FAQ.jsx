import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Is blood donation safe for health?',
      a: 'Absolutely! Every donation uses sterile, single-use equipment. Your body replenishes fluids within 24-48 hours, and the process is supervised by medical professionals to ensure your safety.',
    },
    {
      q: 'How long is the recovery time?',
      a: 'Most donors feel perfectly fine after 15-20 minutes of rest and a light snack. We recommend avoiding heavy lifting or strenuous exercise for the remainder of the day.',
    },
    {
      q: 'Who cannot donate blood?',
      a: 'Individuals with certain medical conditions, low hemoglobin levels, or those who have recently had tattoos or piercings (must wait 6 months) may be ineligible.',
    },
    {
      q: 'Can I donate if I am on medication?',
      a: 'It depends on the type of medication. While most common medications (like birth control or blood pressure meds) are fine, others may require a waiting period.',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Frequently asked <span className="text-red-600">questions</span>
        </h2>
        <div className="h-1 w-12 bg-red-600 rounded-full"></div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className="border-b border-slate-100 dark:border-slate-800"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left group transition-all"
              >
                <span
                  className={`text-lg md:text-xl  font-bold tracking-tight leading-snug transition-colors ${isOpen ? 'text-red-600' : 'text-slate-800 dark:text-slate-200'}`}
                >
                  {faq.q}
                </span>
                <div
                  className={`shrink-0 ml-4 w-8 h-8 rounded-full cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-red-600 border-red-600 rotate-180' : ''}`}
                >
                  <svg
                    className={`transition-colors ${isOpen ? 'text-white' : 'text-slate-500'}`}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>

              {/* Smooth Animation Wrapper */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100 pb-8'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden text-slate-500 dark:text-slate-400 text-base md:text-[17px] leading-relaxed pr-12">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-between">
        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          Still have questions?
        </p>
        <button className="text-red-600 font-black text-xs uppercase tracking-widest hover:underline">
          Contact Support →
        </button>
      </div> */}
    </section>
  );
};

export default FAQ;
