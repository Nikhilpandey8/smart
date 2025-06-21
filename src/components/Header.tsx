import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Zap, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import FeedbackModal from './FeedbackModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Templates', href: '#templates' },
    { label: 'Assignments', href: '#assignments' },
    { label: 'Tools', href: '#tools' },
    { label: 'Features', href: '#features' },
    { label: 'Support', onClick: () => setIsFeedbackOpen(true) }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartDocsHub
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick || (() => item.href && document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }))}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center space-x-1"
                >
                  {item.label === 'Support' && <MessageCircle className="w-4 h-4" />}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>

              <motion.button
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 rounded-lg mt-2 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="py-4 space-y-4 px-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else if (item.href) {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                  whileHover={{ x: 5 }}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium flex items-center space-x-2"
                >
                  {item.label === 'Support' && <MessageCircle className="w-4 h-4" />}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.header>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};

export default Header;