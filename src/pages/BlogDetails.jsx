import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  Calendar,
  ArrowLeft,
  Clock,
  User,
  Share2,
  Loader2,
  Bookmark,
  MessageCircle,
} from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosSecure();

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const res = await axiosPublic.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };
    getBlogDetails();
    window.scrollTo(0, 0); // পেজ লোড হলে একদম উপরে নিয়ে যাবে
  }, [id, axiosPublic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <div className="absolute inset-0 blur-xl bg-red-500/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] p-6 text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <MessageCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Post Not Found
        </h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          The story you're looking for might have been moved or deleted.
        </p>
        <Link
          to="/blog"
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm transition-transform hover:scale-105"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-red-100 selection:text-red-600">
      {/* Hero Header Section */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[450px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-red-400 transition-colors mb-8 group"
          >
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              Return Home
            </span>
          </Link>

          <span className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            {blog.category || 'Health'}
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-8 max-w-4xl">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <p className="text-white text-xs font-black uppercase tracking-wider">
                  Admin
                </p>
                <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">
                  Medical Team
                </p>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-white/20 hidden md:block"></div>
            <div className="flex items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-red-500" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {blog.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-red-500" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  5 min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body */}
          <div className="lg:col-span-8">
            <article className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl shadow-slate-200/50 border border-slate-50">
              <div className="prose prose-slate prose-lg max-w-none">
                <p className="text-slate-700 leading-[2] text-lg font-medium whitespace-pre-line first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
                  {blog.content}
                </p>
              </div>

              <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Share:
                  </span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white transition-all">
                      <Share2 size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white transition-all">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>

                <Link
                  to="/blog"
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg active:scale-95"
                >
                  Explore More
                </Link>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Quick Action Box */}
            <div className="bg-red-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-xl font-black mb-4 leading-tight">
                  Become a Hero Today.
                </h4>
                <p className="text-red-100 text-sm mb-6 leading-relaxed">
                  Your single donation can save up to three lives. Join our
                  community.
                </p>
                <Link
                  to="/register"
                  className="block text-center py-4 bg-white text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                >
                  Register Now
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
              <h4 className="text-lg font-black mb-4 tracking-tight">
                Stay Informed
              </h4>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Subscribe to get health tips and donor stories weekly.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                <button className="w-full py-3 bg-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
