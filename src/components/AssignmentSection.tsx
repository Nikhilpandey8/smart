import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, Eye, Edit3, Download, Clock, User, Upload, Plus, FileText, PenTool } from 'lucide-react';
import { courseAssignments, blogPosts } from '../data/courseAssignments';
import AssignmentPreviewModal from './AssignmentPreviewModal';
import AssignmentEditModal from './AssignmentEditModal';
import BlogModal from './BlogModal';
import UploadSection from './UploadSection';
import RealTimeAssignmentSystem from './RealTimeAssignmentSystem';
import BlogWritingSystem from './BlogWritingSystem';
import { CourseAssignment, BlogPost } from '../types';

const AssignmentSection: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<CourseAssignment | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<CourseAssignment | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [activeTab, setActiveTab] = useState<'assignments' | 'blogs' | 'upload'>('assignments');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRealTimeSystemOpen, setIsRealTimeSystemOpen] = useState(false);
  const [isBlogSystemOpen, setIsBlogSystemOpen] = useState(false);

  const courses = ['All', ...Array.from(new Set(courseAssignments.map(a => a.courseCode)))];
  const semesters = ['All', ...Array.from(new Set(courseAssignments.map(a => a.semester.toString())))];

  const filteredAssignments = courseAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || assignment.courseCode === selectedCourse;
    const matchesSemester = selectedSemester === 'All' || assignment.semester.toString() === selectedSemester;
    return matchesSearch && matchesCourse && matchesSemester;
  });

  const filteredBlogs = blogPosts.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="assignments" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-400/20 rounded-full animate-ping" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              background: 'linear-gradient(45deg, #3B82F6, #8B5CF6, #10B981, #F59E0B)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Academic Resources Hub
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access pre-written assignments, share your work, write blogs, and collaborate with fellow students.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Created by Nikhil Kumar Pandey for Educational Purposes
          </p>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'assignments'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Course Assignments</span>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'blogs'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              <span>Study Blogs</span>
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-6 py-3 rounded-lg font-semibold transition-all text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Assignment</span>
            </button>
          </div>
        </motion.div>

        {/* New Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8 space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRealTimeSystemOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <FileText className="w-5 h-5" />
            <span>Real-Time Assignment Library</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBlogSystemOpen(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <PenTool className="w-5 h-5" />
            <span>Blog Writing System</span>
          </motion.button>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
          </div>

          {/* Filters for Assignments */}
          {activeTab === 'assignments' && (
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 shadow-md"
                >
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Semester:</span>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 shadow-md"
                >
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>
                      {semester === 'All' ? 'All Semesters' : `Semester ${semester}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </motion.div>

        {/* Content Grid */}
        {activeTab === 'assignments' ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  rotateY: 5
                }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Course Badge */}
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <motion.span 
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    {assignment.courseCode} - Sem {assignment.semester}
                  </motion.span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                    {assignment.category}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {assignment.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {assignment.subject}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {assignment.description}
                  </p>

                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {assignment.wordCount} words
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {Math.ceil(assignment.wordCount / 200)} min read
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative z-10 flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAssignment(assignment)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Preview</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingAssignment(assignment)}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit & Download</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
                onClick={() => setSelectedBlog(blog)}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {blog.author}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blog.readTime}
                      </span>
                    </div>
                    <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {((activeTab === 'assignments' && filteredAssignments.length === 0) ||
          (activeTab === 'blogs' && filteredBlogs.length === 0)) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No {activeTab} found. Try adjusting your search or filters.
            </p>
          </motion.div>
        )}

        {/* Creator Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Created by <span className="font-semibold text-blue-600 dark:text-blue-400">Nikhil Kumar Pandey</span> for Educational Purposes
          </p>
        </motion.div>
      </div>

      {/* Modals */}
      {selectedAssignment && (
        <AssignmentPreviewModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onEdit={() => {
            setEditingAssignment(selectedAssignment);
            setSelectedAssignment(null);
          }}
        />
      )}

      {editingAssignment && (
        <AssignmentEditModal
          assignment={editingAssignment}
          onClose={() => setEditingAssignment(null)}
        />
      )}

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}

      <UploadSection 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      <RealTimeAssignmentSystem
        isOpen={isRealTimeSystemOpen}
        onClose={() => setIsRealTimeSystemOpen(false)}
      />

      <BlogWritingSystem
        isOpen={isBlogSystemOpen}
        onClose={() => setIsBlogSystemOpen(false)}
      />
    </section>
  );
};

export default AssignmentSection;