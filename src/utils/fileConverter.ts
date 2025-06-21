import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { ConversionTool } from '../types';

export const convertFile = async (
  file: File,
  outputFormat: string,
  tool: ConversionTool
): Promise<{ name: string; url: string }> => {
  const fileName = file.name.replace(/\.[^/.]+$/, '');

  switch (tool.id) {
    case 'word-to-pdf':
      return await convertWordToPDF(file, fileName);
    case 'pdf-to-word':
      return await convertPDFToWord(file, fileName);
    case 'image-to-pdf':
      return await convertImageToPDF(file, fileName);
    case 'pdf-to-image':
      return await convertPDFToImage(file, fileName, outputFormat);
    case 'image-resize':
      return await resizeImage(file, fileName, outputFormat);
    case 'word-counter':
      return await countWords(file, fileName);
    case 'case-converter':
      return await convertCase(file, fileName);
    case 'pdf-merge':
      return await mergePDFs([file], fileName);
    case 'pdf-split':
      return await splitPDF(file, fileName);
    case 'pdf-compress':
      return await compressPDF(file, fileName);
    default:
      throw new Error(`Conversion not supported for ${tool.id}`);
  }
};

const convertWordToPDF = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  try {
    const text = await file.text();
    const pdf = new jsPDF();
    
    // Set up PDF properties
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    // Add title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Document Converted from Word', 20, 20);
    
    // Add content
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = 40;
    
    // Split text into lines that fit the page width
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    
    for (const line of lines) {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    }
    
    // Add footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(
        `Converted by SmartDocsHub.com - Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }
    
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    
    return {
      name: `${fileName}.pdf`,
      url
    };
  } catch (error) {
    throw new Error('Failed to convert Word document to PDF');
  }
};

const convertPDFToWord = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  // For a real implementation, you would use a PDF parsing library
  // This is a simplified demonstration
  const content = `Document Converted from PDF: ${file.name}

This document has been converted from PDF format to a text-based format.

Original file: ${file.name}
File size: ${(file.size / 1024 / 1024).toFixed(2)} MB
Conversion date: ${new Date().toLocaleDateString()}

Note: This is a demonstration conversion. In a production environment, 
this would use advanced PDF parsing libraries to extract text, images, 
and formatting from the original PDF document.

For best results with PDF to Word conversion:
- Ensure the PDF contains selectable text
- Avoid heavily formatted or image-based PDFs
- Consider the original document structure

Converted by SmartDocsHub.com - Created by Nikhil Kumar Pandey for Educational Purposes`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  return {
    name: `${fileName}_converted.txt`,
    url
  };
};

const convertImageToPDF = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const pdf = new jsPDF();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Calculate dimensions to fit page while maintaining aspect ratio
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const maxWidth = pageWidth - 2 * margin;
        const maxHeight = pageHeight - 2 * margin;
        
        const imgAspectRatio = img.width / img.height;
        const pageAspectRatio = maxWidth / maxHeight;
        
        let imgWidth, imgHeight, xOffset, yOffset;
        
        if (imgAspectRatio > pageAspectRatio) {
          imgWidth = maxWidth;
          imgHeight = maxWidth / imgAspectRatio;
          xOffset = margin;
          yOffset = margin + (maxHeight - imgHeight) / 2;
        } else {
          imgHeight = maxHeight;
          imgWidth = maxHeight * imgAspectRatio;
          xOffset = margin + (maxWidth - imgWidth) / 2;
          yOffset = margin;
        }
        
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Convert to JPEG for better compression
        const imgData = canvas.toDataURL('image/jpeg', 0.85);
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
        
        // Add metadata
        pdf.setFontSize(8);
        pdf.text(`Converted by SmartDocsHub.com - ${new Date().toLocaleDateString()}`, margin, pageHeight - 5);
        
        const pdfBlob = pdf.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        
        resolve({
          name: `${fileName}.pdf`,
          url
        });
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const convertPDFToImage = async (file: File, fileName: string, format: string): Promise<{ name: string; url: string }> => {
  // This is a simplified implementation
  // In a real application, you would use PDF.js or similar library
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d')!;
  
  // Create a placeholder image representing PDF content
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add border
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  // Add content
  ctx.fillStyle = '#000000';
  ctx.font = '24px Arial';
  ctx.fillText('PDF to Image Conversion', 50, 100);
  ctx.font = '16px Arial';
  ctx.fillText(`Original file: ${file.name}`, 50, 150);
  ctx.fillText(`File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, 50, 180);
  ctx.fillText(`Conversion date: ${new Date().toLocaleDateString()}`, 50, 210);
  ctx.fillText('This is a demonstration conversion.', 50, 260);
  ctx.fillText('In production, this would extract actual PDF content.', 50, 290);
  
  // Add footer
  ctx.font = '12px Arial';
  ctx.fillStyle = '#666666';
  ctx.fillText('Converted by SmartDocsHub.com', 50, canvas.height - 50);
  ctx.fillText('Created by Nikhil Kumar Pandey for Educational Purposes', 50, canvas.height - 30);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        resolve({
          name: `${fileName}.${format}`,
          url
        });
      }
    }, `image/${format}`, 0.9);
  });
};

const resizeImage = async (file: File, fileName: string, format: string): Promise<{ name: string; url: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Resize to maximum width of 1200px while maintaining aspect ratio
        const maxWidth = 1200;
        const aspectRatio = img.height / img.width;
        
        if (img.width > maxWidth) {
          canvas.width = maxWidth;
          canvas.height = maxWidth * aspectRatio;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        // Use better image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve({
              name: `${fileName}_resized.${format}`,
              url
            });
          } else {
            reject(new Error('Failed to create resized image'));
          }
        }, `image/${format}`, 0.9);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const countWords = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  const text = await file.text();
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const lines = text.split('\n').length;
  
  const result = `Word Count Analysis Report
Generated by SmartDocsHub.com

File: ${file.name}
Analysis Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

=== BASIC STATISTICS ===
Words: ${words.toLocaleString()}
Characters (with spaces): ${characters.toLocaleString()}
Characters (without spaces): ${charactersNoSpaces.toLocaleString()}
Sentences: ${sentences.toLocaleString()}
Paragraphs: ${paragraphs.toLocaleString()}
Lines: ${lines.toLocaleString()}

=== READING TIME ESTIMATES ===
Average reading speed (200 WPM): ${Math.ceil(words / 200)} minutes
Fast reading speed (300 WPM): ${Math.ceil(words / 300)} minutes
Slow reading speed (150 WPM): ${Math.ceil(words / 150)} minutes

=== SPEAKING TIME ESTIMATES ===
Average speaking speed (150 WPM): ${Math.ceil(words / 150)} minutes
Fast speaking speed (200 WPM): ${Math.ceil(words / 200)} minutes
Slow speaking speed (120 WPM): ${Math.ceil(words / 120)} minutes

=== ADDITIONAL METRICS ===
Average words per sentence: ${sentences > 0 ? (words / sentences).toFixed(1) : 0}
Average sentences per paragraph: ${paragraphs > 0 ? (sentences / paragraphs).toFixed(1) : 0}
Average characters per word: ${words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0}

=== FILE INFORMATION ===
File size: ${(file.size / 1024).toFixed(2)} KB
File type: ${file.type || 'Unknown'}
Last modified: ${file.lastModified ? new Date(file.lastModified).toLocaleDateString() : 'Unknown'}

Created by Nikhil Kumar Pandey for Educational Purposes
SmartDocsHub.com - Your Premium Document Platform`;

  const blob = new Blob([result], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  return {
    name: `${fileName}_word_count_analysis.txt`,
    url
  };
};

const convertCase = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  const text = await file.text();
  
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };
  
  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };
  
  const result = `Case Conversion Results
Generated by SmartDocsHub.com

Original File: ${file.name}
Conversion Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

=== ORIGINAL TEXT ===
${text}

=== UPPERCASE ===
${text.toUpperCase()}

=== lowercase ===
${text.toLowerCase()}

=== Title Case ===
${toTitleCase(text)}

=== Sentence case ===
${toSentenceCase(text)}

=== ALTERNATING cAsE ===
${text.split('').map((char, index) => 
  index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
).join('')}

=== iNVERSE cASE ===
${text.split('').map(char => 
  char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
).join('')}

Created by Nikhil Kumar Pandey for Educational Purposes
SmartDocsHub.com - Your Premium Document Platform`;

  const blob = new Blob([result], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  return {
    name: `${fileName}_case_converted.txt`,
    url
  };
};

const mergePDFs = async (files: File[], fileName: string): Promise<{ name: string; url: string }> => {
  // This is a simplified implementation
  // In a real application, you would use PDF-lib or similar library
  const pdf = new jsPDF();
  
  pdf.setFontSize(16);
  pdf.text('Merged PDF Document', 20, 20);
  
  pdf.setFontSize(12);
  pdf.text('This document was created by merging multiple PDF files:', 20, 40);
  
  let yPosition = 60;
  files.forEach((file, index) => {
    pdf.text(`${index + 1}. ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`, 20, yPosition);
    yPosition += 10;
  });
  
  pdf.text(`Merged on: ${new Date().toLocaleDateString()}`, 20, yPosition + 20);
  pdf.text('Created by SmartDocsHub.com', 20, yPosition + 40);
  
  const pdfBlob = pdf.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  
  return {
    name: `${fileName}_merged.pdf`,
    url
  };
};

const splitPDF = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  // This is a simplified implementation
  const pdf = new jsPDF();
  
  pdf.setFontSize(16);
  pdf.text('PDF Split Result', 20, 20);
  
  pdf.setFontSize(12);
  pdf.text(`Original file: ${file.name}`, 20, 40);
  pdf.text(`File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, 20, 60);
  pdf.text('This represents page 1 of the split PDF.', 20, 80);
  pdf.text('In a real implementation, each page would be a separate file.', 20, 100);
  
  pdf.text('Created by SmartDocsHub.com', 20, 140);
  
  const pdfBlob = pdf.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  
  return {
    name: `${fileName}_page_1.pdf`,
    url
  };
};

const compressPDF = async (file: File, fileName: string): Promise<{ name: string; url: string }> => {
  // This is a simplified implementation
  const pdf = new jsPDF();
  
  pdf.setFontSize(16);
  pdf.text('Compressed PDF', 20, 20);
  
  pdf.setFontSize(12);
  pdf.text(`Original file: ${file.name}`, 20, 40);
  pdf.text(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`, 20, 60);
  pdf.text(`Compressed size: ${(file.size * 0.7 / 1024 / 1024).toFixed(2)} MB (estimated)`, 20, 80);
  pdf.text(`Compression ratio: 30% reduction`, 20, 100);
  
  pdf.text('This is a demonstration of PDF compression.', 20, 120);
  pdf.text('In production, this would use advanced compression algorithms.', 20, 140);
  
  pdf.text('Created by SmartDocsHub.com', 20, 180);
  
  const pdfBlob = pdf.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  
  return {
    name: `${fileName}_compressed.pdf`,
    url
  };
};