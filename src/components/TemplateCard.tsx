import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const IconComponent = Icons[template.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 overflow-hidden"
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Premium Badge */}
      {template.premium && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-2 rounded-full"
        >
          <Crown className="w-4 h-4" />
        </motion.div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow"
        >
          {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
        </motion.div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {template.title}
            </h3>
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              {template.category}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {template.description}
          </p>

          {/* Features */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {template.fields.length} fields
            </span>
            <motion.div
              whileHover={{ x: 5 }}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium"
            >
              Create Now →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;