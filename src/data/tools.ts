import { ConversionTool } from '../types';

export const conversionTools: ConversionTool[] = [
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert Microsoft Word documents to PDF format instantly with high quality',
    icon: 'FileType',
    category: 'document',
    inputFormats: ['docx', 'doc'],
    outputFormats: ['pdf']
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF documents to editable Word format while preserving formatting',
    icon: 'FileEdit',
    category: 'document',
    inputFormats: ['pdf'],
    outputFormats: ['docx']
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert images (JPG, PNG, WebP) to PDF documents with customizable layouts',
    icon: 'ImageIcon',
    category: 'image',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    outputFormats: ['pdf']
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Extract images from PDF or convert PDF pages to high-quality images',
    icon: 'ScanLine',
    category: 'image',
    inputFormats: ['pdf'],
    outputFormats: ['jpg', 'png', 'webp']
  },
  {
    id: 'pdf-merge',
    title: 'PDF Merge',
    description: 'Combine multiple PDF files into a single document with custom ordering',
    icon: 'Combine',
    category: 'document',
    inputFormats: ['pdf'],
    outputFormats: ['pdf']
  },
  {
    id: 'pdf-split',
    title: 'PDF Split',
    description: 'Split PDF documents into separate pages or custom page ranges',
    icon: 'Split',
    category: 'document',
    inputFormats: ['pdf'],
    outputFormats: ['pdf']
  },
  {
    id: 'pdf-compress',
    title: 'PDF Compress',
    description: 'Reduce PDF file size while maintaining quality and readability',
    icon: 'Archive',
    category: 'document',
    inputFormats: ['pdf'],
    outputFormats: ['pdf']
  },
  {
    id: 'image-resize',
    title: 'Image Resize',
    description: 'Resize and optimize images for web, print, or social media platforms',
    icon: 'Maximize2',
    category: 'image',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    outputFormats: ['jpg', 'png', 'webp']
  },
  {
    id: 'image-compress',
    title: 'Image Compress',
    description: 'Compress images to reduce file size without losing visual quality',
    icon: 'Minimize2',
    category: 'image',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp'],
    outputFormats: ['jpg', 'png', 'webp']
  },
  {
    id: 'image-format-converter',
    title: 'Image Format Converter',
    description: 'Convert between different image formats (JPG, PNG, WebP, GIF)',
    icon: 'RefreshCw',
    category: 'image',
    inputFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'],
    outputFormats: ['jpg', 'png', 'webp', 'gif']
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, paragraphs, and estimate reading time',
    icon: 'Calculator',
    category: 'text',
    inputFormats: ['text', 'txt', 'docx', 'pdf'],
    outputFormats: ['text']
  },
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text between different cases (upper, lower, title, camel, snake)',
    icon: 'Type',
    category: 'text',
    inputFormats: ['text'],
    outputFormats: ['text']
  },
  {
    id: 'text-formatter',
    title: 'Text Formatter',
    description: 'Format and clean text with various formatting options',
    icon: 'AlignLeft',
    category: 'text',
    inputFormats: ['text'],
    outputFormats: ['text']
  },
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, contact info, and more',
    icon: 'QrCode',
    category: 'utility',
    inputFormats: ['text'],
    outputFormats: ['png', 'svg']
  },
  {
    id: 'barcode-generator',
    title: 'Barcode Generator',
    description: 'Create various types of barcodes for products and inventory',
    icon: 'BarChart3',
    category: 'utility',
    inputFormats: ['text'],
    outputFormats: ['png', 'svg']
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Generate secure passwords with customizable length and complexity',
    icon: 'Key',
    category: 'utility',
    inputFormats: ['text'],
    outputFormats: ['text']
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    description: 'Create short, shareable links from long URLs',
    icon: 'Link',
    category: 'utility',
    inputFormats: ['text'],
    outputFormats: ['text']
  },
  {
    id: 'color-palette',
    title: 'Color Palette Generator',
    description: 'Generate beautiful color palettes for design projects',
    icon: 'Palette',
    category: 'design',
    inputFormats: ['text'],
    outputFormats: ['text', 'css', 'json']
  },
  {
    id: 'gradient-generator',
    title: 'CSS Gradient Generator',
    description: 'Create CSS gradients with live preview and code generation',
    icon: 'Layers',
    category: 'design',
    inputFormats: ['text'],
    outputFormats: ['css']
  },
  {
    id: 'favicon-generator',
    title: 'Favicon Generator',
    description: 'Generate favicons in multiple sizes from images or text',
    icon: 'Globe',
    category: 'design',
    inputFormats: ['png', 'jpg', 'svg'],
    outputFormats: ['ico', 'png']
  }
];