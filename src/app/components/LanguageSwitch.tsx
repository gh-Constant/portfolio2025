'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// SVG Flag Components
const USFlag = () => (
  <svg viewBox="0 0 24 16" className="w-6 h-4">
    <rect width="24" height="16" fill="#B22234"/>
    <path d="M0,1.85h24M0,3.69h24M0,5.54h24M0,7.38h24M0,9.23h24M0,11.08h24M0,12.92h24M0,14.77h24" stroke="white" strokeWidth="1.23"/>
    <rect width="9.6" height="7.38" fill="#3C3B6E"/>
    <g fill="white">
      <circle cx="1.2" cy="1.23" r="0.4"/>
      <circle cx="2.4" cy="1.23" r="0.4"/>
      <circle cx="3.6" cy="1.23" r="0.4"/>
      <circle cx="4.8" cy="1.23" r="0.4"/>
      <circle cx="6" cy="1.23" r="0.4"/>
      <circle cx="7.2" cy="1.23" r="0.4"/>
      <circle cx="8.4" cy="1.23" r="0.4"/>
      <circle cx="1.8" cy="2.15" r="0.4"/>
      <circle cx="3" cy="2.15" r="0.4"/>
      <circle cx="4.2" cy="2.15" r="0.4"/>
      <circle cx="5.4" cy="2.15" r="0.4"/>
      <circle cx="6.6" cy="2.15" r="0.4"/>
      <circle cx="7.8" cy="2.15" r="0.4"/>
      <circle cx="1.2" cy="3.08" r="0.4"/>
      <circle cx="2.4" cy="3.08" r="0.4"/>
      <circle cx="3.6" cy="3.08" r="0.4"/>
      <circle cx="4.8" cy="3.08" r="0.4"/>
      <circle cx="6" cy="3.08" r="0.4"/>
      <circle cx="7.2" cy="3.08" r="0.4"/>
      <circle cx="8.4" cy="3.08" r="0.4"/>
      <circle cx="1.8" cy="4" r="0.4"/>
      <circle cx="3" cy="4" r="0.4"/>
      <circle cx="4.2" cy="4" r="0.4"/>
      <circle cx="5.4" cy="4" r="0.4"/>
      <circle cx="6.6" cy="4" r="0.4"/>
      <circle cx="7.8" cy="4" r="0.4"/>
      <circle cx="1.2" cy="4.92" r="0.4"/>
      <circle cx="2.4" cy="4.92" r="0.4"/>
      <circle cx="3.6" cy="4.92" r="0.4"/>
      <circle cx="4.8" cy="4.92" r="0.4"/>
      <circle cx="6" cy="4.92" r="0.4"/>
      <circle cx="7.2" cy="4.92" r="0.4"/>
      <circle cx="8.4" cy="4.92" r="0.4"/>
      <circle cx="1.8" cy="5.85" r="0.4"/>
      <circle cx="3" cy="5.85" r="0.4"/>
      <circle cx="4.2" cy="5.85" r="0.4"/>
      <circle cx="5.4" cy="5.85" r="0.4"/>
      <circle cx="6.6" cy="5.85" r="0.4"/>
      <circle cx="7.8" cy="5.85" r="0.4"/>
      <circle cx="1.2" cy="6.77" r="0.4"/>
      <circle cx="2.4" cy="6.77" r="0.4"/>
      <circle cx="3.6" cy="6.77" r="0.4"/>
      <circle cx="4.8" cy="6.77" r="0.4"/>
      <circle cx="6" cy="6.77" r="0.4"/>
      <circle cx="7.2" cy="6.77" r="0.4"/>
      <circle cx="8.4" cy="6.77" r="0.4"/>
    </g>
  </svg>
);

const FrenchFlag = () => (
  <svg viewBox="0 0 24 16" className="w-6 h-4">
    <rect width="8" height="16" fill="#002395"/>
    <rect x="8" width="8" height="16" fill="white"/>
    <rect x="16" width="8" height="16" fill="#ED2939"/>
  </svg>
);

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english'), flag: <USFlag /> },
    { code: 'fr', name: t('language.french'), flag: <FrenchFlag /> },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-hover-target"
        aria-label={t('language.switch')}
      >
        <span className="flex items-center">{currentLanguage?.flag}</span>
        <span className="offbit-font uppercase tracking-wider text-sm">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 min-w-[120px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'fr');
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  language === lang.code ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                <span className="flex items-center">{lang.flag}</span>
                <span className="offbit-font text-sm">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitch;