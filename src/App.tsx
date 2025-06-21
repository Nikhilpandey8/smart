import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import TemplatesSection from './components/TemplatesSection';
import AssignmentSection from './components/AssignmentSection';
import ToolsSection from './components/ToolsSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header />
        <main>
          <Hero />
          <TemplatesSection />
          <AssignmentSection />
          <ToolsSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;