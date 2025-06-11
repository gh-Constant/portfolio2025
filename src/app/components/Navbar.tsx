'use client'  

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

//TODO #2 : Add a animation when hovering the items of the navbar

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const NAVBAR_HEIGHT = 64; // px, adjust if your navbar height changes

  // Navigation items with translations
  const navigationItems = [
    { name: t('nav.projects'), href: '#projects', badge: '9' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.resume'), href: '/resume.pdf', external: true },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className="bg-white text-black border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center" style={{ height: NAVBAR_HEIGHT }}>
        <Link href="/" className="text-xl nohemi-heading-lg font-semibold uppercase tracking-wider interactive cursor-hover-target">{siteConfig.name}</Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="relative group uppercase tracking-wider pb-1 flex items-center interactive offbit-font cursor-hover-target"
            >
              {item.name}{item.badge && <sup>{item.badge}</sup>}
              {item.external && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              )}
            </a>
          ))}
          <LanguageSwitch />
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none cursor-hover-target"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span 
            className="block w-7 h-1 bg-black mb-1 rounded origin-center"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 8 : 0
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="block w-7 h-1 bg-black mb-1 rounded origin-center"
            animate={{
              opacity: isOpen ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span 
            className="block w-7 h-1 bg-black rounded origin-center"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>
      {/* Mobile Menu Panel (derolls from under navbar) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, 
              opacity: 1 
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] // power2.out equivalent
            }}
            style={{
              position: 'fixed',
              top: NAVBAR_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 40,
              background: 'white',
              overflow: 'hidden',
            }}
            className="md:hidden shadow-lg"
          >
            <motion.div 
              className="flex flex-col items-start px-8 py-8 space-y-8 text-3xl font-serif h-full w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {navigationItems.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href} 
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center interactive offbit-font"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                >
                  {item.name.charAt(0) + item.name.slice(1).toLowerCase()}{item.badge && <sup className="text-base">{item.badge}</sup>}
                  {item.external && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  )}
                </motion.a>
              ))}
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + navigationItems.length * 0.1, duration: 0.3 }}
              >
                <LanguageSwitch />
              </motion.div>
              <motion.a 
                href={siteConfig.contact.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)} 
                className="flex items-center interactive text-base nohemi-heading-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + siteConfig.navigation.main.length * 0.1, duration: 0.3 }}
              >
                Linkedin
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;