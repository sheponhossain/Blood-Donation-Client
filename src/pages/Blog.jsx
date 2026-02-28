import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, BookOpen, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useTheme } from '../context/ThemeContext';

const Blog = () => {
  // eslint-disable-next-line no-unused-vars
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosSecure();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axiosPublic.get('/blogs');
        const publishedBlogs = res.data.filter(
          (blog) => blog.status === 'published'
        );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, [axiosPublic]);

  if (loading) {
    return (
      // ডার্ক মোডে লোডার ব্যাকগ্রাউন্ড এডজাস্ট করা হয়েছে
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  return (
    // ৩. ডার্ক মোড সাপোর্ট সহ মেইন কন্টেইনার
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950 pb-20 transition-colors duration-300">
      {/* Header Section (ডার্ক মোডে আরও একটু সলিড লুক দেওয়া হয়েছে) */}
      <section className="bg-slate-900 dark:bg-slate-900/50 pt-32 pb-20 px-6 border-b dark:border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <BookOpen size={14} className="text-red-500" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
              Knowledge Hub
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
            Latest News & <br />
            <span className="text-red-600 italic font-serif">Inspiration</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
            Stay updated with the latest in blood donation, health tips, and
            heart-touching stories from our community of heroes.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <main className="max-w-6xl mx-auto -mt-10 px-6">
        {blogs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-20 text-center border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
            <p className="font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
              No stories found yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                // কার্ডে dark:bg-slate-900 এবং dark:border-slate-800 যোগ করা হয়েছে
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-red-200/20 dark:hover:shadow-red-900/10 transition-all duration-500 group overflow-hidden flex flex-col"
              >
                {/* Image Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm transition-colors">
                      {blog.category || 'Health'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 mb-4">
                    <Calendar size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {blog.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-4 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                    {blog.excerpt || blog.content?.substring(0, 100) + '...'}
                  </p>

                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-red-600 dark:text-red-500 group/btn"
                  >
                    Read Story
                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Call to Action Section (ডার্ক মোডেও এটি লাল থাকবে কারণ এটি ব্র্যান্ড কালার) */}
        <div className="mt-24 bg-red-600 dark:bg-red-700 rounded-[3.5rem] p-12 text-center text-white relative overflow-hidden group">
          <div className="relative z-10">
            <Heart size={48} className="mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter uppercase">
              Ready to Save a Life?
            </h2>
            <p className="text-red-100 mb-8 max-w-lg mx-auto font-medium text-sm md:text-base">
              Join our community of donors today and be the reason for someone's
              heartbeat.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Register Now
            </Link>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
