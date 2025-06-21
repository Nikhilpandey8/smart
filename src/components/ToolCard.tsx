import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Upload } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ConversionTool } from '../types';

interface ToolCardProps {
  tool: ConversionTool;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'document': return 'from-blue-500 to-cyan-500';
      case 'image': return 'from-purple-500 to-pink-500';
      case 'text': return 'from-green-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

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
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(tool.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Premium Badge */}
      {tool.premium && (
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
          className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(tool.category)} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}
        >
          {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
        </motion.div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {tool.title}
            </h3>
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full capitalize">
              {tool.category}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {tool.description}
          </p>

          {/* Format Support */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">From:</span>
              <div className="flex flex-wrap gap-1">
                {tool.inputFormats.map((format) => (
                  <span key={format} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded uppercase font-mono">
                    {format}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-500">To:</span>
              <div className="flex flex-wrap gap-1">
                {tool.outputFormats.map((format) => (
                  <span key={format} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded uppercase font-mono">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center justify-between pt-2">
            <Upload className="w-4 h-4 text-gray-400" />
            <motion.div
              whileHover={{ x: 5 }}
              className="text-purple-600 dark:text-purple-400 text-sm font-medium"
            >
              Use Tool →
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;