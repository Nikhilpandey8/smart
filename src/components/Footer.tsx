import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Heart, MessageCircle, CheckCircle, ExternalLink } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsSubscribing(false);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Templates', href: '#templates' },
        { label: 'Conversion Tools', href: '#tools' },
        { label: 'Features', href: '#features' },
        { label: 'Assignments', href: '#assignments' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'Best Practices', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', onClick: () => setIsFeedbackOpen(true) },
        { label: 'Bug Reports', onClick: () => setIsFeedbackOpen(true) },
        { label: 'Feature Requests', onClick: () => setIsFeedbackOpen(true) }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'GDPR Compliance', href: '#gdpr' }
      ]
    }
  ];

  return (
    <>
      <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Zap className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    SmartDocsHub
                  </span>
                </div>
                <p className="text-gray-400 max-w-md">
                  The ultimate platform for AI-powered document creation and file conversion. 
                  Create professional documents and convert files instantly, no registration required.
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Created by Nikhil Kumar Pandey for Educational Purposes</span>
                </div>
                
                {/* Feedback Button */}
                <motion.button
                  onClick={() => setIsFeedbackOpen(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Feedback</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <motion.button
                        onClick={link.onClick || (() => link.href && document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }))}
                        whileHover={{ x: 5, color: '#60A5FA' }}
                        className="text-gray-400 hover:text-white transition-colors text-sm flex items-center space-x-1"
                      >
                        <span>{link.label}</span>
                        {link.href && link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400 text-sm">
                  Get notified about new templates, tools, and features.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <AnimatePresence mode="wait">
                  {isSubscribed ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center space-x-2 text-green-400"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Successfully Subscribed!</span>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onSubmit={handleSubscribe}
                      className="flex items-center bg-gray-800 rounded-lg overflow-hidden"
                    >
                      <Mail className="w-5 h-5 text-gray-400 ml-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="bg-transparent text-white placeholder-gray-400 px-3 py-2 focus:outline-none"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubscribing}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 font-medium hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isSubscribing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          'Subscribe'
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} SmartDocsHub.com. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Created by Nikhil Kumar Pandey for Educational Purposes
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#60A5FA' }}
                className="hover:text-white transition-colors"
              >
                Status
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#60A5FA' }}
                className="hover:text-white transition-colors"
              >
                Changelog
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, color: '#60A5FA' }}
                className="hover:text-white transition-colors"
              >
                GitHub
              </motion.a>
            </div>
          </div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 pt-4 border-t border-gray-800"
          >
            <div className="space-y-4 text-xs text-gray-500">
              <div>
                <h4 className="font-semibold text-gray-400 mb-2">Terms and Conditions</h4>
                <p className="mb-2">
                  By using SmartDocsHub.com, you agree to our terms of service and privacy policy. 
                  This platform is created by Nikhil Kumar Pandey for educational purposes.
                </p>
                <p className="mb-2">
                  All content generated through this platform is for educational and informational purposes only. 
                  Users are responsible for ensuring the accuracy and appropriateness of generated content.
                </p>
                <p className="mb-2">
                  We do not store personal data without consent. File uploads are processed locally and not stored on our servers. 
                  Generated documents are the property of the user.
                </p>
                <p>
                  This platform complies with GDPR, CCPA, and other privacy regulations. 
                  For questions or concerns, please use the feedback option above.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-400 mb-2">Educational Purpose Statement</h4>
                <p>
                  SmartDocsHub.com is developed and maintained by Nikhil Kumar Pandey as an educational project 
                  to demonstrate modern web development technologies and provide useful tools for students and professionals. 
                  The platform serves as a learning resource and practical tool for document creation and file conversion.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};

export default Footer;