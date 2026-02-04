import React from 'react';
import { Link } from 'react-router';
import { Plus, FileEdit, Trash2, Eye, CheckCircle, Info } from 'lucide-react';

const ContentManagement = () => {
  const role = 'admin'; // এটি AuthContext থেকে আসবে

  // ডামি ব্লগ ডেটা
  const blogs = [
    {
      id: 1,
      title: 'Benefits of Regular Blood Donation',
      image:
        'https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?q=80&w=200',
      status: 'published',
    },
    {
      id: 2,
      title: 'How to Prepare for Your First Donation',
      image:
        'https://images.unsplash.com/photo-1536856492748-8113982216e4?q=80&w=200',
      status: 'draft',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Content Management
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Create and manage educational blog posts.
          </p>
        </div>

        {/* Add Blog Button */}
        <Link
          to="/dashboard/content-management/add-blog"
          className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-6"
        >
          <Plus size={20} /> Add Blog
        </Link>
      </div>

      {/* Filter Section */}
      <div className="flex justify-end">
        <select className="select select-bordered select-sm w-full max-w-[200px] bg-white rounded-lg">
          <option value="">Filter by Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row items-center justify-between p-4 bg-white border rounded-2xl hover:shadow-sm transition-all gap-4"
          >
            <div className="flex items-center gap-4 w-full">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-20 h-20 object-cover rounded-xl border shadow-sm"
              />
              <div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight">
                  {blog.title}
                </h3>
                <span
                  className={`badge badge-sm mt-2 font-bold uppercase tracking-tighter ${
                    blog.status === 'published'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}
                >
                  {blog.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              {/* Publish/Unpublish (Volunteer & Admin) */}
              {role === 'admin' && (
                <button
                  className={`btn btn-sm rounded-lg border-none ${
                    blog.status === 'draft'
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-slate-400 hover:bg-slate-500 text-white'
                  }`}
                >
                  {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                </button>
              )}

              {/* Edit/Delete (Admin only privilege recommended) */}
              <button className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50 rounded-lg">
                <FileEdit size={18} />
              </button>

              {role === 'admin' && (
                <button className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="flex justify-center text-slate-300 mb-4">
              <Info size={48} />
            </div>
            <p className="text-slate-400 font-bold">
              No blogs found. Start by adding a new one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
