import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, Eye, Search, Filter, Calendar, User, BookOpen, Tag, Heart, Share2, FileText, X } from 'lucide-react';
import { UploadedAssignment } from '../types';

interface RealTimeAssignmentSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const RealTimeAssignmentSystem: React.FC<RealTimeAssignmentSystemProps> = ({ isOpen, onClose }) => {
  const [assignments, setAssignments] = useState<UploadedAssignment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'downloads'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAssignment, setSelectedAssignment] = useState<UploadedAssignment | null>(null);

  // Mock data - In real app, this would come from a database
  useEffect(() => {
    const mockAssignments: UploadedAssignment[] = [
      {
        id: '1',
        title: 'Digital Marketing Strategies in Modern Business',
        description: 'Comprehensive analysis of digital marketing trends and their impact on business growth',
        course: 'BBA',
        semester: '6',
        subject: 'Marketing Management',
        content: 'This assignment explores the evolution of digital marketing...',
        uploader: 'Priya Sharma',
        uploadDate: new Date('2024-01-15'),
        downloads: 45,
        tags: ['marketing', 'digital', 'business', 'strategy'],
        wordCount: 2500
      },
      {
        id: '2',
        title: 'Data Structures and Algorithms Implementation',
        description: 'Complete implementation of various data structures with time complexity analysis',
        course: 'BCA',
        semester: '4',
        subject: 'Data Structures',
        content: 'This assignment covers the implementation of fundamental data structures...',
        uploader: 'Rahul Kumar',
        uploadDate: new Date('2024-01-20'),
        downloads: 67,
        tags: ['programming', 'algorithms', 'data-structures', 'computer-science'],
        wordCount: 3200
      },
      {
        id: '3',
        title: 'Financial Statement Analysis of Indian Companies',
        description: 'Detailed financial analysis of top Indian companies with ratio analysis',
        course: 'B.COM',
        semester: '5',
        subject: 'Financial Management',
        content: 'This assignment provides a comprehensive financial analysis...',
        uploader: 'Anjali Patel',
        uploadDate: new Date('2024-01-25'),
        downloads: 32,
        tags: ['finance', 'analysis', 'accounting', 'business'],
        wordCount: 2800
      }
    ];
    setAssignments(mockAssignments);
  }, []);

  const courses = ['All', ...Array.from(new Set(assignments.map(a => a.course)))];
  const semesters = ['All', ...Array.from(new Set(assignments.map(a => a.semester)))];

  const filteredAssignments = assignments
    .filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCourse = selectedCourse === 'All' || assignment.course === selectedCourse;
      const matchesSemester = selectedSemester === 'All' || assignment.semester === selectedSemester;
      return matchesSearch && matchesCourse && matchesSemester;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'popular':
          return b.downloads - a.downloads;
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  const handleDownload = (assignment: UploadedAssignment) => {
    // Simulate download
    setAssignments(prev => 
      prev.map(a => 
        a.id === assignment.id 
          ? { ...a, downloads: a.downloads + 1 }
          : a
      )
    );
    
    // In real app, this would trigger actual file download
    console.log('Downloading:', assignment.title);
  };

  if (!isOpen) return null;

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
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Real-Time Assignment Library
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Browse and download assignments shared by students
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

          {/* Filters and Search */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assignments, subjects, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>
                      {semester === 'All' ? 'All Semesters' : `Semester ${semester}`}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="downloads">Most Downloaded</option>
                </select>

                <div className="flex items-center space-x-2 ml-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                  >
                    <div className="w-4 h-4 flex flex-col space-y-1">
                      <div className="bg-current h-0.5 rounded"></div>
                      <div className="bg-current h-0.5 rounded"></div>
                      <div className="bg-current h-0.5 rounded"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Assignments List */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {filteredAssignments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No assignments found. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredAssignments.map((assignment) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 ${
                      viewMode === 'list' ? 'flex items-center space-x-6' : ''
                    }`}
                  >
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      {/* Course Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {assignment.course} - Sem {assignment.semester}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Download className="w-4 h-4" />
                          <span>{assignment.downloads}</span>
                        </div>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {assignment.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {assignment.description}
                      </p>

                      {/* Subject */}
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-3">
                        {assignment.subject}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {assignment.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {assignment.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                            +{assignment.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {assignment.uploader}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {assignment.uploadDate.toLocaleDateString()}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {assignment.wordCount} words
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className={`flex ${viewMode === 'list' ? 'flex-col space-y-2' : 'justify-between'} gap-2`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAssignment(assignment)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Preview</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(assignment)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Showing {filteredAssignments.length} of {assignments.length} assignments</span>
              <span>Created by Nikhil Kumar Pandey for Educational Purposes</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Assignment Preview Modal */}
      {selectedAssignment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4"
          onClick={() => setSelectedAssignment(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedAssignment.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedAssignment.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{selectedAssignment.course} - Semester {selectedAssignment.semester}</span>
                    <span>•</span>
                    <span>{selectedAssignment.subject}</span>
                    <span>•</span>
                    <span>By {selectedAssignment.uploader}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{selectedAssignment.content}</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {selectedAssignment.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(selectedAssignment)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Assignment</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RealTimeAssignmentSystem;