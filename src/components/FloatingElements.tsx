import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements: React.FC = () => {
  const elements = [
    { size: 60, color: 'bg-blue-400/20', delay: 0, duration: 6 },
    { size: 80, color: 'bg-purple-400/20', delay: 1, duration: 8 },
    { size: 40, color: 'bg-teal-400/20', delay: 2, duration: 7 },
    { size: 100, color: 'bg-pink-400/20', delay: 0.5, duration: 9 },
    { size: 50, color: 'bg-indigo-400/20', delay: 1.5, duration: 6.5 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-xl ${element.color}`}
          style={{
            width: element.size,
            height: element.size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3, 0.3]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;