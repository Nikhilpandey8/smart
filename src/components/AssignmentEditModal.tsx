import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Save, Loader2 } from 'lucide-react';
import { CourseAssignment } from '../types';
import { generateAssignmentDocument } from '../utils/assignmentGenerator';

interface AssignmentEditModalProps {
  assignment: CourseAssignment;
  onClose: () => void;
}

const AssignmentEditModal: React.FC<AssignmentEditModalProps> = ({
  assignment,
  onClose
}) => {
  const [editedContent, setEditedContent] = useState(assignment.content);
  const [editedTitle, setEditedTitle] = useState(assignment.title);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    try {
      await generateAssignmentDocument({
        ...assignment,
        title: editedTitle,
        content: editedContent
      }, format);
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const wordCount = editedContent.trim().split(/\s+/).length;

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
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                    {assignment.courseCode} - Semester {assignment.semester}
                  </span>
                  <span className="text-sm text-gray-500">
                    {wordCount} words
                  </span>
                </div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 w-full"
                />
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {assignment.subject}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Assignment Content
                </h3>
                <div className="text-sm text-gray-500">
                  Markdown supported
                </div>
              </div>
              
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-96 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
                placeholder="Edit your assignment content here..."
              />
              
              <div className="text-xs text-gray-500">
                <strong>Formatting tips:</strong> Use # for headings, ## for subheadings, **text** for bold, *text* for italic, - for bullet points
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
              Live Preview
            </h4>
            <div className="max-h-40 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div 
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: editedContent
                    .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold mb-2">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="text-md font-semibold mb-2">$1</h2>')
                    .replace(/^\*\*(.+)\*\*$/gm, '<p class="font-semibold mb-1">$1</p>')
                    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
                    .replace(/\n\n/g, '</p><p class="mb-2">')
                    .replace(/^(?!<[h|l|p])(.+)$/gm, '<p class="mb-2">$1</p>')
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate('pdf')}
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                <span>Download PDF</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate('docx')}
                disabled={isGenerating}
                className="flex-1 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                <span>Download Word</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignmentEditModal;