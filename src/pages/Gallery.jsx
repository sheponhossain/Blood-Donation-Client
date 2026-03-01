import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Heart, Share2, Maximize2 } from 'lucide-react';

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const items = [
    {
      id: 1,
      category: 'donors',
      img: 'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?q=80&w=800',
      title: 'Life Saver',
    },
    {
      id: 2,
      category: 'camps',
      img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800',
      title: 'Medical Camp',
    },
    {
      id: 3,
      category: 'awards',
      img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800',
      title: 'Honor Award',
    },
    {
      id: 4,
      category: 'donors',
      img: 'https://images.unsplash.com/photo-1579152276503-6058d97daa01?q=80&w=800',
      title: 'Donor Registration',
    },
    {
      id: 5,
      category: 'camps',
      img: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=800',
      title: 'Emergency Room',
    },
    {
      id: 6,
      category: 'awards',
      img: 'https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?q=80&w=800',
      title: 'Special Recognition',
    },
  ];

  const handleDownload = (imageUrl, title) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-blood-hero.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('Download failed. Please try again.'));
  };

  const filteredItems =
    filter === 'all' ? items : items.filter((i) => i.category === filter);

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">
              Hero <span className="text-red-600">Gallery</span>
            </h2>
            <p className="mt-4 text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
              Download & Share Our Moments
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {['all', 'donors', 'camps', 'awards'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat
                    ? 'bg-red-600 text-white shadow-xl shadow-red-500/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Masonry Grid --- */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group break-inside-avoid rounded-[2.5rem] overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-900 shadow-2xl"
              >
                {/* পরিবর্তন এখানে: grayscale ক্লাস সরিয়ে দেওয়া হয়েছে */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8">
                  <div className="flex justify-end gap-3 translate-y-[-20px] group-hover:translate-y-0 transition-transform duration-500">
                    <ActionButton icon={<Heart size={18} />} />

                    {/* Download Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(item.img, item.title);
                      }}
                      className="w-10 h-10 bg-white/20 cursor-pointer backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      title="Download Image"
                    >
                      <Download size={18} />
                    </button>
                  </div>

                  <div className="translate-y-[20px] group-hover:translate-y-0 transition-transform duration-500 text-left">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">
                      {item.category}
                    </p>
                    <h4 className="text-xl font-bold text-white italic">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ActionButton = ({ icon }) => (
  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-red-600 transition-colors">
    {icon}
  </div>
);

export default Gallery;
