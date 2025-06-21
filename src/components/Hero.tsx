import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Star } from 'lucide-react';
import FloatingElements from './FloatingElements';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  const features = [
    { icon: Zap, text: 'AI-Powered Templates' },
    { icon: Shield, text: 'No Login Required' },
    { icon: Sparkles, text: 'Premium Quality' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <ParticleBackground />
      <FloatingElements />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Creator Credit - Enhanced Visibility */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center space-x-3 px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-full border-2 border-gradient-to-r from-purple-500 to-blue-500 shadow-2xl">
              <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
              <motion.span
                animate={{ 
                  background: [
                    'linear-gradient(45deg, #8B5CF6, #3B82F6)',
                    'linear-gradient(45deg, #3B82F6, #10B981)',
                    'linear-gradient(45deg, #10B981, #F59E0B)',
                    'linear-gradient(45deg, #F59E0B, #EF4444)',
                    'linear-gradient(45deg, #EF4444, #8B5CF6)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  WebkitTextStroke: '0.5px rgba(139, 92, 246, 0.3)'
                }}
              >
                Created by Nikhil Kumar Pandey
              </motion.span>
              <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-300% bg-clip-text text-transparent"
                style={{ backgroundSize: '300% 300%' }}
              >
                Smart Documents
              </motion.span>
              <br />
              <span className="text-gray-900 dark:text-white">Made Simple</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Create professional documents with AI assistance and convert files instantly. 
              No registration needed, just pure productivity.
            </motion.p>
          </div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  y: -5
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center">
                Start Creating
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgb(59, 130, 246)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Tools
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8"
          >
            {[
              { number: '100+', label: 'Templates' },
              { number: '25+', label: 'Tools' },
              { number: '100%', label: 'Free Core' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5, type: 'spring' }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Educational Purpose Notice - Enhanced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Created by <span className="font-bold text-blue-600 dark:text-blue-400">Nikhil Kumar Pandey</span> for Educational Purposes
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;