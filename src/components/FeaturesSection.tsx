import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles, FileText, Image, Type, Download, Globe, Smartphone } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Templates',
      description: 'Intelligent document generation with customizable templates for every need',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FileText,
      title: 'Document Conversion',
      description: 'Convert between PDF, Word, and other formats instantly',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Image,
      title: 'Image Processing',
      description: 'Resize, convert, and optimize images with professional quality',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Type,
      title: 'Text Tools',
      description: 'Word counting, case conversion, and text analysis utilities',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'No Registration',
      description: 'Start using immediately without creating accounts or sharing personal data',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Download,
      title: 'Instant Downloads',
      description: 'Generate and download your documents in seconds, not minutes',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Cloud-based platform accessible from any device with internet',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all screen sizes',
      color: 'from-violet-500 to-blue-500'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Professional-grade output suitable for business and academic use',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose SmartDocsHub?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of document creation and conversion with our premium platform designed for professionals, students, and everyone in between.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started for Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;