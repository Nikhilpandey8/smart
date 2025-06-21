import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit3, Download, BookOpen, Clock, User } from 'lucide-react';
import { CourseAssignment } from '../types';

interface AssignmentPreviewModalProps {
  assignment: CourseAssignment;
  onClose: () => void;
  onEdit: () => void;
}

const AssignmentPreviewModal: React.FC<AssignmentPreviewModalProps> = ({
  assignment,
  onClose,
  onEdit
}) => {
  const handleDownloadPDF = () => {
    // This would integrate with the existing PDF generation logic
    console.log('Downloading PDF for:', assignment.title);
  };

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
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                    {assignment.courseCode} - Semester {assignment.semester}
                  </span>
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-sm">
                    {assignment.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {assignment.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                  {assignment.subject}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {assignment.description}
                </p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {assignment.wordCount} words
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Est. {Math.ceil(assignment.wordCount / 200)} min read
                  </span>
                  {assignment.uploader && (
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {assignment.uploader}
                    </span>
                  )}
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
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div 
                className="whitespace-pre-wrap leading-relaxed text-gray-900 dark:text-gray-100"
                dangerouslySetInnerHTML={{ 
                  __html: assignment.content
                    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-5">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">$1</h3>')
                    .replace(/^\*\*(.+)\*\*$/gm, '<p class="font-semibold text-gray-800 dark:text-gray-200 mb-2">$1</p>')
                    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1 text-gray-700 dark:text-gray-300">$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal text-gray-700 dark:text-gray-300">$2</li>')
                    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">')
                    .replace(/^(?!<[h|l|p])(.+)$/gm, '<p class="mb-4 text-gray-700 dark:text-gray-300">$1</p>')
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onEdit}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Edit3 className="w-5 h-5" />
                <span>Edit & Customize</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadPDF}
                className="flex-1 bg-white dark:bg-gray-800 border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignmentPreviewModal;