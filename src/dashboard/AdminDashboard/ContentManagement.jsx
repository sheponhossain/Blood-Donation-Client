import React, { useState, useEffect } from 'react';
import {
  Send,
  Image as ImageIcon,
  X,
  Plus,
  Trash2,
  CheckCircle,
  Edit3,
  XCircle,
  Loader2,
  Calendar,
  Tag,
  Search,
  BookOpen,
  Upload,
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useTheme } from '../../context/ThemeContext';

const ContentManagement = () => {
  const { theme } = useTheme();
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axiosSecure.get('/blogs');
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setShowModal(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/blogs/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: `Status changed to ${newStatus}`,
          icon: 'success',
          background: theme === 'dark' ? '#1e293b' : '#fff',
          color: theme === 'dark' ? '#fff' : '#000',
          confirmButtonColor: '#ef4444',
          timer: 1500,
        });
        fetchBlogs();
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Status update failed',
        background: theme === 'dark' ? '#1e293b' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Remove Article?',
      text: 'This action will permanently delete the post.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0f172a',
      confirmButtonText: 'Yes, Delete',
      background: theme === 'dark' ? '#1e293b' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      customClass: { popup: 'rounded-[2rem]' },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/blogs/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Article removed successfully.', 'success');
            fetchBlogs();
          }
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          Swal.fire('Error', 'Failed to delete', 'error');
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const imageFile = form.image?.files?.[0];
    let imageUrl = isEditing ? currentBlog?.image : '';

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const envKey = import.meta.env.VITE_IMGBB_API_KEY;
        const apiKey = envKey ? envKey.trim().replace(';', '') : '';

        if (!apiKey) throw new Error('API Key missing. Check your .env file.');

        const imgbb_url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        const res = await fetch(imgbb_url, { method: 'POST', body: formData });
        const imgData = await res.json();

        if (imgData.success) imageUrl = imgData.data.display_url;
        else throw new Error(imgData.error?.message || 'Image upload failed');
      }

      const blogData = {
        title: form.title.value,
        image: imageUrl,
        category: form.category.value,
        content: form.content.value,
        date: isEditing
          ? currentBlog.date
          : new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
        status: isEditing ? currentBlog.status : 'draft',
      };

      let response;
      if (isEditing) {
        response = await axiosSecure.patch(
          `/blogs/${currentBlog._id}`,
          blogData
        );
        if (response.data.modifiedCount > 0)
          Swal.fire('Updated!', 'Blog post refreshed.', 'success');
      } else {
        response = await axiosSecure.post('/blogs', blogData);
        if (response.data.insertedId)
          Swal.fire('Saved!', 'New post added to drafts.', 'success');
      }

      setShowModal(false);
      setIsEditing(false);
      setCurrentBlog(null);
      form.reset();
      fetchBlogs();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: error.message || 'Something went wrong',
        background: theme === 'dark' ? '#1e293b' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#FAFAFB] dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* --- Modern Header --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
            Manage <span className="text-red-600">Content</span>
          </h2>
          <div className="flex items-center gap-2 mt-3 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">
            <BookOpen size={14} className="text-red-500" />
            <span>Articles Control Center</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsEditing(false);
            setCurrentBlog(null);
            setShowModal(true);
          }}
          className="group relative flex items-center gap-3 bg-slate-900 dark:bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-500 shadow-2xl active:scale-95 overflow-hidden"
        >
          <div className="absolute cursor-pointer inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <Plus size={18} /> Create New Post
        </button>
      </div>

      {/* --- Stats Section --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-500">
            <Tag />
          </div>
          <div>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Total Stories
            </p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">
              {blogs.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-500">
            <CheckCircle />
          </div>
          <div>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Published
            </p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">
              {blogs.filter((b) => b.status === 'published').length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-500">
            <XCircle />
          </div>
          <div>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              In Draft
            </p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">
              {blogs.filter((b) => b.status === 'draft').length}
            </p>
          </div>
        </div>
      </div>

      {/* --- Main Table Container --- */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        {fetchLoading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-red-600" size={40} />
            <p className="font-black text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Loading Database...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Article Info
                  </th>
                  <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    Category
                  </th>
                  <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 text-center">
                    Visibility Control
                  </th>
                  <th className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 text-right">
                    Settings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all duration-300"
                  >
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <img
                            src={blog.image}
                            className="w-16 h-16 rounded-[1.2rem] object-cover border-2 border-white dark:border-slate-700 shadow-md group-hover:scale-110 transition-transform"
                            alt=""
                          />
                          {blog.status === 'published' && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 dark:text-slate-200 text-[15px] uppercase italic tracking-tighter leading-tight group-hover:text-red-600 transition-colors">
                            {blog.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-slate-400 dark:text-slate-500">
                            <span className="flex items-center gap-1 text-[9px] font-bold uppercase">
                              <Calendar size={10} /> {blog.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className="inline-flex items-center whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-200/50 dark:border-slate-700">
                        <Tag size={12} className="mr-1.5 text-red-500" />
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center justify-center gap-3">
                        {(blog.status === 'draft' || !blog.status) && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(blog._id, 'published')
                              }
                              className="flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 hover:border-green-500 hover:text-green-600 transition-all duration-300 shadow-sm"
                            >
                              <CheckCircle size={14} /> Publish
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(blog._id, 'cancelled')
                              }
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 hover:border-red-500 hover:text-red-600 transition-all duration-300 shadow-sm"
                            >
                              <XCircle size={14} /> Cancel
                            </button>
                          </>
                        )}
                        {blog.status === 'published' && (
                          <button
                            onClick={() =>
                              handleStatusChange(blog._id, 'draft')
                            }
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider bg-green-600 text-white shadow-lg shadow-green-100 animate-in fade-in zoom-in duration-300"
                          >
                            <CheckCircle size={14} /> Published
                          </button>
                        )}
                        {blog.status === 'cancelled' && (
                          <button
                            onClick={() =>
                              handleStatusChange(blog._id, 'draft')
                            }
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider bg-red-600 text-white shadow-lg shadow-red-100 animate-in fade-in zoom-in duration-300"
                          >
                            <XCircle size={14} /> Cancelled
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(blog)}
                          className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- Ultra Modern Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[4rem] p-8 md:p-16 shadow-2xl relative overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-500 border border-white/20 dark:border-slate-800">
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
              className="absolute cursor-pointer top-12 right-12 w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
            <div className="mb-12">
              <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none dark:text-white">
                {isEditing ? 'Modify' : 'Draft'}{' '}
                <span className="text-red-600">Story</span>
              </h3>
              <p className="mt-4 text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">
                Share your life-saving insights with the world
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                    Article Title
                  </label>
                  <input
                    name="title"
                    defaultValue={isEditing ? currentBlog?.title : ''}
                    type="text"
                    placeholder="Something impactful..."
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:text-white rounded-[1.5rem] px-8 py-5 font-bold outline-none focus:border-red-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={
                      isEditing ? currentBlog?.category : 'Health Tips'
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:text-white rounded-[1.5rem] px-8 py-5 font-bold outline-none focus:border-red-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Health Tips" className="dark:bg-slate-900">
                      Health Tips
                    </option>
                    <option value="Education" className="dark:bg-slate-900">
                      Education
                    </option>
                    <option value="Guide" className="dark:bg-slate-900">
                      Guide
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Upload Cover Image
                </label>
                <div className="relative group">
                  <Upload
                    size={20}
                    className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors"
                  />
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    className="w-full cursor-pointer bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[1.5rem] pl-16 pr-8 py-5 font-bold text-slate-500 outline-none focus:border-red-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-red-50 dark:file:bg-red-900/30 file:text-red-600 hover:file:bg-red-100 cursor:pointer"
                    required={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">
                  Story Content
                </label>
                <textarea
                  name="content"
                  defaultValue={isEditing ? currentBlog?.content : ''}
                  rows="6"
                  placeholder="Start typing your story here..."
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent dark:text-white rounded-[2.5rem] px-8 py-6 font-medium outline-none focus:border-red-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-slate-900 dark:bg-red-600 text-white py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-red-600 dark:hover:bg-red-700 transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 disabled:bg-slate-300"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <Send size={20} />{' '}
                    {isEditing ? 'Update Story' : 'Save Story'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
