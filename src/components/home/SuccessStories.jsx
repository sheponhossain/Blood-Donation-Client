import React, { useState, useEffect } from 'react';

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      name: 'Ariful Islam',
      role: 'Recipient',
      text: "The emergency blood request saved my sister's life during her heart surgery.",
      img: 'https://i.pravatar.cc/150?u=11',
    },
    {
      name: 'Tania Akter',
      role: 'Regular Donor',
      text: "I feel immensely proud to be a donor. It's a small act that makes a huge impact.",
      img: 'https://i.pravatar.cc/150?u=12',
    },
    {
      name: 'Dr. Mahfuz Rayhan',
      role: 'Volunteer',
      text: 'Seeing the gap between blood demand and supply closing is heart-warming.',
      img: 'https://i.pravatar.cc/150?u=13',
    },
    {
      name: 'Nusrat Jahan',
      role: 'Life Saver',
      text: 'Helping someone in their critical hour gives me a sense of purpose and joy.',
      img: 'https://i.pravatar.cc/150?u=14',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stories.length]);

  return (
    <section className="py-20 md:py-24 max-w-full overflow-hidden transition-colors duration-500">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
          Hero <span className="text-red-600">Stories</span>
        </h2>
      </div>

      {/* Slider Viewport */}
      <div className="relative w-full flex justify-center">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            /* Mobile: কার্ড উইডথ ৮৫%, তাই অফসেট হবে (১০০-৮৫)/২ = ৭.৫%
               Desktop: কার্ড উইডথ ৩৫%, তাই অফসেট হবে (১০০-৩৫)/২ = ৩২.৫%
            */
            transform: `translateX(calc(${typeof window !== 'undefined' && window.innerWidth < 768 ? '7.5%' : '32.5%'} - ${currentIndex * (typeof window !== 'undefined' && window.innerWidth < 768 ? 85 : 35)}%))`,
          }}
        >
          {stories.map((s, i) => {
            const isActive = currentIndex === i;
            return (
              <div
                key={i}
                className="w-[85%] md:w-[35%] flex-shrink-0 px-3 md:px-6 transition-all duration-700"
              >
                <div
                  className={`relative p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-700 flex flex-col items-center text-center h-full min-h-[340px] md:min-h-[420px] justify-center ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-2xl scale-100 opacity-100 z-20'
                      : 'bg-slate-50/50 dark:bg-slate-800/20 border-transparent scale-90 opacity-20 blur-[2px] z-10'
                  }`}
                >
                  <div className="text-4xl md:text-5xl font-serif text-red-600/20 mb-4 italic select-none">
                    “
                  </div>

                  <p
                    className={`font-bold italic leading-relaxed mb-6 md:mb-8 transition-all duration-700 ${
                      isActive
                        ? 'text-slate-700 dark:text-slate-200 text-sm md:text-lg'
                        : 'text-[10px] md:text-xs opacity-0'
                    }`}
                  >
                    {s.text}
                  </p>

                  <div className="mt-auto flex flex-col items-center gap-3 md:gap-4">
                    <img
                      src={s.img}
                      className={`w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] object-cover border-2 transition-all duration-700 ${
                        isActive
                          ? 'border-red-500 scale-110 shadow-lg'
                          : 'border-transparent grayscale'
                      }`}
                      alt={s.name}
                    />
                    <div className="text-center">
                      <h4
                        className={`font-black uppercase italic tracking-tight leading-none ${
                          isActive
                            ? 'text-slate-900 dark:text-white text-sm md:text-xl'
                            : 'text-slate-400 text-[10px]'
                        }`}
                      >
                        {s.name}
                      </h4>
                      {isActive && (
                        <p className="text-red-600 font-black text-[8px] md:text-[10px] uppercase tracking-[0.2em] mt-2 animate-in fade-in">
                          {s.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-3 mt-12 md:mt-16">
        {stories.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              currentIndex === i
                ? 'w-10 md:w-12 h-2 md:h-2.5 bg-red-600'
                : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-red-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
