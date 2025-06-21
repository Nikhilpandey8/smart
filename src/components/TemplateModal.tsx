import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Loader2 } from 'lucide-react';
import { Template, DocumentData } from '../types';
import { generateDocument } from '../utils/documentGenerator';

interface TemplateModalProps {
  template: Template;
  onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ template, onClose }) => {
  const [formData, setFormData] = useState<DocumentData>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (fieldId: string, value: string | number | File | null) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleGenerate = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    try {
      await generateDocument(template, formData, format);
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderField = (field: any) => {
    const commonClasses = "w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`${commonClasses} min-h-[100px] resize-vertical`}
            maxLength={field.maxLength}
          />
        );
      case 'select':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={commonClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, parseInt(e.target.value))}
            className={commonClasses}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={commonClasses}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => handleInputChange(field.id, e.target.files?.[0] || null)}
            className={commonClasses}
            accept="image/*,.pdf,.doc,.docx"
          />
        );
      default:
        return (
          <input
            type="text"
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={commonClasses}
            maxLength={field.maxLength}
          />
        );
    }
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
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {template.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {template.description}
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

          {/* Form */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-6">
              {template.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                  {field.maxLength && (
                    <p className="text-xs text-gray-500 mt-1">
                      {(formData[field.id]?.toString().length || 0)}/{field.maxLength} characters
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate('pdf')}
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                <span>Generate PDF</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGenerate('docx')}
                disabled={isGenerating}
                className="flex-1 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                <span>Generate Word</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplateModal;