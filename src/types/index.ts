export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  fields: TemplateField[];
  premium?: boolean;
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'file' | 'date';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  maxLength?: number;
}

export interface ConversionTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'document' | 'image' | 'text' | 'utility' | 'design';
  inputFormats: string[];
  outputFormats: string[];
  premium?: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface DocumentData {
  [key: string]: string | number | File | null;
}

export interface CourseAssignment {
  id: string;
  courseCode: string;
  semester: number;
  subject: string;
  title: string;
  description: string;
  content: string;
  wordCount: number;
  category: string;
  uploadDate?: string;
  uploader?: string;
  downloads?: number;
  tags?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  category?: string;
  featured?: boolean;
  views?: number;
}

export interface UploadedAssignment {
  id: string;
  title: string;
  description: string;
  course: string;
  semester: string;
  subject: string;
  content: string;
  uploader: string;
  uploadDate: Date;
  downloads: number;
  fileUrl?: string;
  tags: string[];
  wordCount: number;
}

export interface UserBlog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: Date;
  featured: boolean;
  views: number;
  readTime: string;
}