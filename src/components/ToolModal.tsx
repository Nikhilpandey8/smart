import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Download, Loader2, FileCheck, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { ConversionTool } from '../types';
import { convertFile } from '../utils/fileConverter';
import QRBarcodeGenerator from './QRBarcodeGenerator';

interface ToolModalProps {
  tool: ConversionTool;
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string>('');
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [showBarcodeGenerator, setShowBarcodeGenerator] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setConvertedFiles([]);
    setError('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: tool.inputFormats.reduce((acc, format) => {
      acc[`.${format}`] = [];
      return acc;
    }, {} as Record<string, string[]>),
    multiple: tool.id === 'pdf-merge'
  });

  const handleConvert = async (outputFormat: string) => {
    if (files.length === 0) {
      setError('Please select files to convert');
      return;
    }

    setIsConverting(true);
    setError('');

    try {
      const results = await Promise.all(
        files.map(file => convertFile(file, outputFormat, tool))
      );
      setConvertedFiles(results);
    } catch (err) {
      setError('Conversion failed. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadFile = (file: { name: string; url: string }) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle QR and Barcode generators
  if (tool.id === 'qr-generator') {
    return (
      <QRBarcodeGenerator
        isOpen={true}
        onClose={onClose}
        type="qr"
      />
    );
  }

  if (tool.id === 'barcode-generator') {
    return (
      <QRBarcodeGenerator
        isOpen={true}
        onClose={onClose}
        type="barcode"
      />
    );
  }

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
                  {tool.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {tool.description}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Input:</span>
                    <div className="flex space-x-1">
                      {tool.inputFormats.map(format => (
                        <span key={format} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs uppercase font-mono">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Output:</span>
                    <div className="flex space-x-1">
                      {tool.outputFormats.map(format => (
                        <span key={format} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs uppercase font-mono">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div className="p-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {isDragActive ? 'Drop files here' : 'Drop files or click to select'}
              </p>
              <p className="text-sm text-gray-500">
                Supports: {tool.inputFormats.join(', ').toUpperCase()}
              </p>
            </div>

            {/* Selected Files */}
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Selected Files ({files.length})
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <FileCheck className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-300">{error}</span>
                </div>
              </div>
            )}

            {/* Converted Files */}
            {convertedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Converted Files
                </h3>
                <div className="space-y-2">
                  {convertedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {file.name}
                      </span>
                      <button
                        onClick={() => downloadFile(file)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-wrap gap-3">
              {tool.outputFormats.map((format) => (
                <motion.button
                  key={format}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleConvert(format)}
                  disabled={isConverting || files.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isConverting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  <span>Convert to {format.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ToolModal;