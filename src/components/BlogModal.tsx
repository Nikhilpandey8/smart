import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Clock, Calendar, Tag } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogModalProps {
  blog: BlogPost;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
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
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {blog.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blog.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readTime}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div 
                className="whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-5">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">$1</h3>')
                    .replace(/^\*\*(.+)\*\*$/gm, '<p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">$1</p>')
                    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1 list-disc">$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$2</li>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(?!<[h|l|p])(.+)$/gm, '<p class="mb-4">$1</p>')
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogModal;