import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Save, Eye, Trash2, Plus, Search, Filter, Calendar, User, Tag, Heart, Share2, X, BookOpen } from 'lucide-react';
import { UserBlog } from '../types';

interface BlogWritingSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlogWritingSystem: React.FC<BlogWritingSystemProps> = ({ isOpen, onClose }) => {
  const [blogs, setBlogs] = useState<UserBlog[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [editingBlog, setEditingBlog] = useState<UserBlog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'views'>('newest');
  const [selectedBlog, setSelectedBlog] = useState<UserBlog | null>(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    author: ''
  });

  // Mock data
  useEffect(() => {
    const mockBlogs: UserBlog[] = [
      {
        id: '1',
        title: 'The Future of Artificial Intelligence in Education',
        content: 'Artificial Intelligence is revolutionizing the education sector...',
        excerpt: 'Exploring how AI is transforming learning experiences and educational outcomes.',
        author: 'Dr. Sarah Johnson',
        category: 'Technology',
        tags: ['AI', 'Education', 'Technology', 'Future'],
        publishDate: new Date('2024-01-15'),
        featured: true,
        views: 1250,
        readTime: '8 min read'
      },
      {
        id: '2',
        title: 'Sustainable Business Practices for Modern Enterprises',
        content: 'In today\'s world, sustainability is not just a buzzword...',
        excerpt: 'A comprehensive guide to implementing sustainable practices in business operations.',
        author: 'Michael Chen',
        category: 'Business',
        tags: ['Sustainability', 'Business', 'Environment', 'Strategy'],
        publishDate: new Date('2024-01-20'),
        featured: false,
        views: 890,
        readTime: '6 min read'
      }
    ];
    setBlogs(mockBlogs);
  }, []);

  const categories = ['All', 'Technology', 'Business', 'Education', 'Science', 'Health', 'Lifestyle'];

  const filteredBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'popular':
          return b.views - a.views;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const handleSaveBlog = () => {
    if (!blogForm.title || !blogForm.content || !blogForm.author) return;

    const newBlog: UserBlog = {
      id: editingBlog?.id || Date.now().toString(),
      title: blogForm.title,
      content: blogForm.content,
      excerpt: blogForm.content.substring(0, 150) + '...',
      author: blogForm.author,
      category: blogForm.category || 'General',
      tags: blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      publishDate: editingBlog?.publishDate || new Date(),
      featured: false,
      views: editingBlog?.views || 0,
      readTime: `${Math.ceil(blogForm.content.split(' ').length / 200)} min read`
    };

    if (editingBlog) {
      setBlogs(prev => prev.map(blog => blog.id === editingBlog.id ? newBlog : blog));
    } else {
      setBlogs(prev => [newBlog, ...prev]);
    }

    // Reset form
    setBlogForm({ title: '', content: '', category: '', tags: '', author: '' });
    setIsWriting(false);
    setEditingBlog(null);
  };

  const handleEditBlog = (blog: UserBlog) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(', '),
      author: blog.author
    });
    setEditingBlog(blog);
    setIsWriting(true);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(prev => prev.filter(blog => blog.id !== blogId));
  };

  const handleViewBlog = (blog: UserBlog) => {
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, views: b.views + 1 } : b));
    setSelectedBlog(blog);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Blog Writing System
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Create, edit, and share your knowledge through blogs
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWriting(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  <span>Write New Blog</span>
                </motion.button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {isWriting ? (
            /* Blog Editor */
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editingBlog ? 'Edit Blog' : 'Write New Blog'}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveBlog}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Blog</span>
                    </motion.button>
                    <button
                      onClick={() => {
                        setIsWriting(false);
                        setEditingBlog(null);
                        setBlogForm({ title: '', content: '', category: '', tags: '', author: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter your blog title..."
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Your name..."
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="technology, education, tips..."
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blog Content *
                  </label>
                  <textarea
                    value={blogForm.content}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your blog content here... You can use markdown formatting."
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Word count: {blogForm.content.split(' ').filter(word => word).length} | 
                    Estimated read time: {Math.ceil(blogForm.content.split(' ').filter(word => word).length / 200)} minutes
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Blog List */
            <>
              {/* Filters */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-500" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="views">Most Viewed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Blog List */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No blogs found. Start writing your first blog!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                      >
                        {blog.featured && (
                          <div className="mb-3">
                            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs font-medium">
                              Featured
                            </span>
                          </div>
                        )}

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {blog.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {blog.publishDate.toLocaleDateString()}
                            </span>
                          </div>
                          <span>{blog.readTime}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {blog.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            <span>{blog.views} views</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewBlog(blog)}
                              className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEditBlog(blog)}
                              className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Total blogs: {blogs.length}</span>
              <span>Created by Nikhil Kumar Pandey for Educational Purposes</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Blog View Modal */}
      {selectedBlog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4"
          onClick={() => setSelectedBlog(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedBlog.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {selectedBlog.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {selectedBlog.publishDate.toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {selectedBlog.views} views
                    </span>
                    <span>{selectedBlog.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {selectedBlog.content}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogWritingSystem;