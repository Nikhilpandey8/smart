import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'assignment',
    title: 'Assignment Generator',
    description: 'AI-powered academic assignment creator with customizable topics and formats',
    category: 'Academic',
    icon: 'FileText',
    fields: [
      { id: 'subject', label: 'Subject', type: 'text', placeholder: 'e.g., Computer Science', required: true },
      { id: 'topic', label: 'Assignment Topic', type: 'text', placeholder: 'e.g., Machine Learning Applications', required: true },
      { id: 'wordCount', label: 'Word Count', type: 'number', placeholder: '1500', required: true },
      { id: 'tone', label: 'Writing Tone', type: 'select', options: ['Academic', 'Professional', 'Casual', 'Technical'], required: true },
      { id: 'instructions', label: 'Special Instructions', type: 'textarea', placeholder: 'Any specific requirements or guidelines...' }
    ]
  },
  {
    id: 'report',
    title: 'Project Report Builder',
    description: 'Comprehensive project report template with sections for methodology, results, and conclusions',
    category: 'Academic',
    icon: 'BarChart',
    fields: [
      { id: 'projectTitle', label: 'Project Title', type: 'text', required: true },
      { id: 'objective', label: 'Project Objective', type: 'textarea', required: true },
      { id: 'methodology', label: 'Methodology', type: 'textarea', required: true },
      { id: 'timeline', label: 'Project Timeline', type: 'text', placeholder: '3 months' },
      { id: 'budget', label: 'Budget (if applicable)', type: 'text' }
    ]
  },
  {
    id: 'coverLetter',
    title: 'Cover Letter Generator',
    description: 'Professional cover letter templates tailored to specific roles and industries',
    category: 'Professional',
    icon: 'Mail',
    fields: [
      { id: 'jobTitle', label: 'Job Title', type: 'text', required: true },
      { id: 'company', label: 'Company Name', type: 'text', required: true },
      { id: 'experience', label: 'Years of Experience', type: 'number' },
      { id: 'skills', label: 'Key Skills', type: 'textarea', placeholder: 'List your relevant skills...' },
      { id: 'tone', label: 'Tone', type: 'select', options: ['Professional', 'Enthusiastic', 'Conservative', 'Creative'] }
    ]
  },
  {
    id: 'proposal',
    title: 'Freelancer Proposal Creator',
    description: 'Winning freelance proposals with timeline, budget, and deliverables',
    category: 'Business',
    icon: 'Briefcase',
    fields: [
      { id: 'projectType', label: 'Project Type', type: 'text', required: true },
      { id: 'clientName', label: 'Client Name', type: 'text' },
      { id: 'timeline', label: 'Project Timeline', type: 'text', required: true },
      { id: 'budget', label: 'Budget Range', type: 'text', required: true },
      { id: 'deliverables', label: 'Key Deliverables', type: 'textarea', required: true }
    ]
  },
  {
    id: 'citation',
    title: 'Citation & Bibliography Builder',
    description: 'Generate citations in APA, MLA, Chicago, and Harvard formats',
    category: 'Academic',
    icon: 'Quote',
    fields: [
      { id: 'citationStyle', label: 'Citation Style', type: 'select', options: ['APA', 'MLA', 'Chicago', 'Harvard'], required: true },
      { id: 'sourceType', label: 'Source Type', type: 'select', options: ['Book', 'Journal Article', 'Website', 'Newspaper'], required: true },
      { id: 'title', label: 'Title', type: 'text', required: true },
      { id: 'author', label: 'Author(s)', type: 'text', required: true },
      { id: 'publicationDate', label: 'Publication Date', type: 'date' }
    ]
  },
  {
    id: 'contract',
    title: 'Contract Creator',
    description: 'Legal contract templates for freelancers and small businesses',
    category: 'Legal',
    icon: 'FileCheck',
    premium: true,
    fields: [
      { id: 'contractType', label: 'Contract Type', type: 'select', options: ['Service Agreement', 'NDA', 'Employment', 'Partnership'], required: true },
      { id: 'party1', label: 'First Party', type: 'text', required: true },
      { id: 'party2', label: 'Second Party', type: 'text', required: true },
      { id: 'terms', label: 'Key Terms', type: 'textarea', required: true },
      { id: 'duration', label: 'Contract Duration', type: 'text' }
    ]
  },
  {
    id: 'resume',
    title: 'Professional Resume Builder',
    description: 'Create ATS-friendly resumes with modern templates and industry-specific formats',
    category: 'Professional',
    icon: 'User',
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'text', required: true },
      { id: 'phone', label: 'Phone Number', type: 'text', required: true },
      { id: 'summary', label: 'Professional Summary', type: 'textarea', required: true },
      { id: 'experience', label: 'Work Experience', type: 'textarea', required: true },
      { id: 'education', label: 'Education', type: 'textarea', required: true },
      { id: 'skills', label: 'Skills', type: 'textarea', required: true }
    ]
  },
  {
    id: 'businessPlan',
    title: 'Business Plan Generator',
    description: 'Comprehensive business plan template for startups and established businesses',
    category: 'Business',
    icon: 'TrendingUp',
    fields: [
      { id: 'businessName', label: 'Business Name', type: 'text', required: true },
      { id: 'industry', label: 'Industry', type: 'text', required: true },
      { id: 'targetMarket', label: 'Target Market', type: 'textarea', required: true },
      { id: 'businessModel', label: 'Business Model', type: 'textarea', required: true },
      { id: 'financialProjections', label: 'Financial Projections', type: 'textarea' },
      { id: 'marketingStrategy', label: 'Marketing Strategy', type: 'textarea' }
    ]
  },
  {
    id: 'newsletter',
    title: 'Newsletter Template',
    description: 'Engaging newsletter templates for businesses and organizations',
    category: 'Marketing',
    icon: 'Send',
    fields: [
      { id: 'newsletterTitle', label: 'Newsletter Title', type: 'text', required: true },
      { id: 'companyName', label: 'Company/Organization Name', type: 'text', required: true },
      { id: 'mainStory', label: 'Main Story/Article', type: 'textarea', required: true },
      { id: 'announcements', label: 'Announcements', type: 'textarea' },
      { id: 'callToAction', label: 'Call to Action', type: 'text' }
    ]
  },
  {
    id: 'socialMedia',
    title: 'Social Media Content Planner',
    description: 'Create engaging social media posts and content calendars',
    category: 'Marketing',
    icon: 'Share2',
    fields: [
      { id: 'platform', label: 'Social Media Platform', type: 'select', options: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok'], required: true },
      { id: 'contentType', label: 'Content Type', type: 'select', options: ['Post', 'Story', 'Reel', 'Video', 'Carousel'], required: true },
      { id: 'caption', label: 'Caption/Text', type: 'textarea', required: true },
      { id: 'hashtags', label: 'Hashtags', type: 'text' },
      { id: 'callToAction', label: 'Call to Action', type: 'text' }
    ]
  },
  {
    id: 'invoice',
    title: 'Professional Invoice Generator',
    description: 'Create professional invoices for freelancers and small businesses',
    category: 'Business',
    icon: 'Receipt',
    fields: [
      { id: 'invoiceNumber', label: 'Invoice Number', type: 'text', required: true },
      { id: 'clientName', label: 'Client Name', type: 'text', required: true },
      { id: 'clientAddress', label: 'Client Address', type: 'textarea', required: true },
      { id: 'services', label: 'Services/Products', type: 'textarea', required: true },
      { id: 'amount', label: 'Total Amount', type: 'number', required: true },
      { id: 'dueDate', label: 'Due Date', type: 'date', required: true }
    ]
  },
  {
    id: 'presentation',
    title: 'Presentation Outline Creator',
    description: 'Structure compelling presentations for business and academic purposes',
    category: 'Academic',
    icon: 'Monitor',
    fields: [
      { id: 'presentationTitle', label: 'Presentation Title', type: 'text', required: true },
      { id: 'audience', label: 'Target Audience', type: 'text', required: true },
      { id: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
      { id: 'keyPoints', label: 'Key Points', type: 'textarea', required: true },
      { id: 'objective', label: 'Presentation Objective', type: 'textarea', required: true }
    ]
  },
  {
    id: 'meetingMinutes',
    title: 'Meeting Minutes Template',
    description: 'Professional meeting minutes and action item tracker',
    category: 'Business',
    icon: 'Clock',
    fields: [
      { id: 'meetingTitle', label: 'Meeting Title', type: 'text', required: true },
      { id: 'date', label: 'Meeting Date', type: 'date', required: true },
      { id: 'attendees', label: 'Attendees', type: 'textarea', required: true },
      { id: 'agenda', label: 'Agenda Items', type: 'textarea', required: true },
      { id: 'decisions', label: 'Decisions Made', type: 'textarea' },
      { id: 'actionItems', label: 'Action Items', type: 'textarea' }
    ]
  },
  {
    id: 'pressRelease',
    title: 'Press Release Generator',
    description: 'Professional press releases for announcements and news',
    category: 'Marketing',
    icon: 'Megaphone',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', required: true },
      { id: 'companyName', label: 'Company Name', type: 'text', required: true },
      { id: 'location', label: 'Location', type: 'text', required: true },
      { id: 'announcement', label: 'Main Announcement', type: 'textarea', required: true },
      { id: 'quote', label: 'Executive Quote', type: 'textarea' },
      { id: 'contactInfo', label: 'Contact Information', type: 'textarea', required: true }
    ]
  },
  {
    id: 'jobDescription',
    title: 'Job Description Creator',
    description: 'Comprehensive job descriptions that attract the right candidates',
    category: 'Professional',
    icon: 'Users',
    fields: [
      { id: 'jobTitle', label: 'Job Title', type: 'text', required: true },
      { id: 'department', label: 'Department', type: 'text', required: true },
      { id: 'jobSummary', label: 'Job Summary', type: 'textarea', required: true },
      { id: 'responsibilities', label: 'Key Responsibilities', type: 'textarea', required: true },
      { id: 'qualifications', label: 'Required Qualifications', type: 'textarea', required: true },
      { id: 'benefits', label: 'Benefits & Perks', type: 'textarea' }
    ]
  }
];