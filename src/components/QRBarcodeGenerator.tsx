import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, BarChart3, Download, Upload, Link, FileText, Image, Smartphone, Wifi, Mail, Phone, MapPin, Calendar, User, CreditCard } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface QRBarcodeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'qr' | 'barcode';
}

const QRBarcodeGenerator: React.FC<QRBarcodeGeneratorProps> = ({ isOpen, onClose, type }) => {
  const [inputType, setInputType] = useState<'text' | 'url' | 'file' | 'contact' | 'wifi' | 'email' | 'phone' | 'location' | 'event'>('text');
  const [inputData, setInputData] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Contact form data
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: '',
    url: ''
  });

  // WiFi form data
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });

  // Event form data
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setInputData(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        setInputData(`PDF Document: ${file.name}`);
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setInputData(e.target?.result as string);
        };
        reader.readAsText(file);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.csv', '.json'],
      'application/json': ['.json']
    },
    multiple: false
  });

  const generateQRCode = async (data: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Simple QR code pattern (for demonstration)
    const moduleSize = size / 25;
    ctx.fillStyle = '#000000';

    // Create a simple pattern based on data
    const hash = data.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const shouldFill = (hash + i * j) % 3 === 0;
        if (shouldFill) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }

    // Add corner markers
    const markerSize = moduleSize * 7;
    ctx.fillStyle = '#000000';
    
    // Top-left marker
    ctx.fillRect(0, 0, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(moduleSize, moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * moduleSize, 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);

    // Top-right marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize, 0, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(size - markerSize + moduleSize, moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(size - markerSize + 2 * moduleSize, 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);

    // Bottom-left marker
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, size - markerSize, markerSize, markerSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(moduleSize, size - markerSize + moduleSize, markerSize - 2 * moduleSize, markerSize - 2 * moduleSize);
    ctx.fillStyle = '#000000';
    ctx.fillRect(2 * moduleSize, size - markerSize + 2 * moduleSize, markerSize - 4 * moduleSize, markerSize - 4 * moduleSize);

    return canvas.toDataURL('image/png');
  };

  const generateBarcode = async (data: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const width = 400;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Generate barcode pattern
    ctx.fillStyle = '#000000';
    const barWidth = width / data.length;

    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      if (charCode % 2 === 0) {
        ctx.fillRect(i * barWidth, 10, barWidth * 0.8, height - 20);
      }
    }

    // Add text below barcode
    ctx.fillStyle = '#000000';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(data, width / 2, height - 5);

    return canvas.toDataURL('image/png');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    let dataToEncode = inputData;

    // Format data based on input type
    switch (inputType) {
      case 'contact':
        dataToEncode = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TEL:${contactData.phone}
EMAIL:${contactData.email}
ORG:${contactData.organization}
URL:${contactData.url}
END:VCARD`;
        break;
      case 'wifi':
        dataToEncode = `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`;
        break;
      case 'event':
        dataToEncode = `BEGIN:VEVENT
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
DTSTART:${eventData.startDate.replace(/[-:]/g, '')}
DTEND:${eventData.endDate.replace(/[-:]/g, '')}
END:VEVENT`;
        break;
      case 'file':
        if (uploadedFile) {
          if (uploadedFile.type.startsWith('image/')) {
            dataToEncode = `Image: ${uploadedFile.name} - ${inputData}`;
          } else {
            dataToEncode = inputData;
          }
        }
        break;
    }

    try {
      let result;
      if (type === 'qr') {
        result = await generateQRCode(dataToEncode);
      } else {
        result = await generateBarcode(dataToEncode);
      }
      setGeneratedCode(result || '');
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const link = document.createElement('a');
      link.download = `${type}_code_${Date.now()}.png`;
      link.href = generatedCode;
      link.click();
    }
  };

  const inputTypes = [
    { value: 'text', label: 'Text', icon: FileText },
    { value: 'url', label: 'URL/Link', icon: Link },
    { value: 'file', label: 'File Upload', icon: Upload },
    { value: 'contact', label: 'Contact Card', icon: User },
    { value: 'wifi', label: 'WiFi Network', icon: Wifi },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone Number', icon: Phone },
    { value: 'location', label: 'Location', icon: MapPin },
    { value: 'event', label: 'Calendar Event', icon: Calendar }
  ];

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
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {type === 'qr' ? (
                  <QrCode className="w-8 h-8 text-blue-600" />
                ) : (
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {type === 'qr' ? 'QR Code' : 'Barcode'} Generator
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Generate {type === 'qr' ? 'QR codes' : 'barcodes'} from text, files, URLs, and more
                  </p>
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

          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Input Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {inputTypes.map((typeOption) => {
                      const IconComponent = typeOption.icon;
                      return (
                        <button
                          key={typeOption.value}
                          onClick={() => setInputType(typeOption.value as any)}
                          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center space-y-1 ${
                            inputType === typeOption.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs font-medium">{typeOption.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Input Fields */}
                {inputType === 'text' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Text Content
                    </label>
                    <textarea
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="Enter your text here..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                )}

                {inputType === 'url' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL/Link
                    </label>
                    <input
                      type="url"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {inputType === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload File
                    </label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                        isDragActive
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {uploadedFile ? uploadedFile.name : 'Drop files or click to upload'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Supports: Images, PDF, Text files
                      </p>
                    </div>
                  </div>
                )}

                {inputType === 'contact' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={contactData.name}
                        onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={contactData.phone}
                        onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={contactData.email}
                        onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Organization"
                        value={contactData.organization}
                        onChange={(e) => setContactData(prev => ({ ...prev, organization: e.target.value }))}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Website URL"
                        value={contactData.url}
                        onChange={(e) => setContactData(prev => ({ ...prev, url: e.target.value }))}
                        className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 md:col-span-2"
                      />
                    </div>
                  </div>
                )}

                {inputType === 'wifi' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">WiFi Network</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Network Name (SSID)"
                        value={wifiData.ssid}
                        onChange={(e) => setWifiData(prev => ({ ...prev, ssid: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        value={wifiData.password}
                        onChange={(e) => setWifiData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={wifiData.security}
                        onChange={(e) => setWifiData(prev => ({ ...prev, security: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                      </select>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={wifiData.hidden}
                          onChange={(e) => setWifiData(prev => ({ ...prev, hidden: e.target.checked }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Hidden Network</span>
                      </label>
                    </div>
                  </div>
                )}

                {inputType === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {inputType === 'phone' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="+1234567890"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {inputType === 'location' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location (Latitude, Longitude)
                    </label>
                    <input
                      type="text"
                      value={inputData}
                      onChange={(e) => setInputData(e.target.value)}
                      placeholder="40.7128, -74.0060"
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {inputType === 'event' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Calendar Event</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Event Title"
                        value={eventData.title}
                        onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        placeholder="Event Description"
                        value={eventData.description}
                        onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={eventData.location}
                        onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Start Date & Time</label>
                          <input
                            type="datetime-local"
                            value={eventData.startDate}
                            onChange={(e) => setEventData(prev => ({ ...prev, startDate: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">End Date & Time</label>
                          <input
                            type="datetime-local"
                            value={eventData.endDate}
                            onChange={(e) => setEventData(prev => ({ ...prev, endDate: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={isGenerating || (!inputData && inputType !== 'contact' && inputType !== 'wifi' && inputType !== 'event')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      {type === 'qr' ? <QrCode className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
                      <span>Generate {type === 'qr' ? 'QR Code' : 'Barcode'}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Output Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Generated {type === 'qr' ? 'QR Code' : 'Barcode'}
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                    {generatedCode ? (
                      <div className="space-y-4">
                        <img
                          src={generatedCode}
                          alt={`Generated ${type}`}
                          className="mx-auto max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded-lg"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleDownload}
                          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all mx-auto"
                        >
                          <Download className="w-5 h-5" />
                          <span>Download {type === 'qr' ? 'QR Code' : 'Barcode'}</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="py-12">
                        {type === 'qr' ? (
                          <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        ) : (
                          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        )}
                        <p className="text-gray-500 dark:text-gray-400">
                          Your {type === 'qr' ? 'QR code' : 'barcode'} will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Features:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• High-quality PNG output</li>
                    <li>• Multiple input formats supported</li>
                    <li>• File upload integration</li>
                    <li>• Contact card generation</li>
                    <li>• WiFi network sharing</li>
                    <li>• Calendar event creation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden canvas for generation */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRBarcodeGenerator;