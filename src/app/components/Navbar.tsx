'use client'  

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { siteConfig } from '@/config/site';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const topBar = useRef<HTMLSpanElement>(null);
  const midBar = useRef<HTMLSpanElement>(null);
  const botBar = useRef<HTMLSpanElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const NAVBAR_HEIGHT = 64; // px, adjust if your navbar height changes

  // Hamburger animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(topBar.current, { rotate: 45, y: 8, duration: 0.3, transformOrigin: 'center' });
      gsap.to(midBar.current, { opacity: 0, duration: 0.2 });
      gsap.to(botBar.current, { rotate: -45, y: -8, duration: 0.3, transformOrigin: 'center' });
    } else {
      gsap.to(topBar.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(midBar.current, { opacity: 1, duration: 0.2, delay: 0.1 });
      gsap.to(botBar.current, { rotate: 0, y: 0, duration: 0.3 });
    }
  }, [isOpen]);

  // Mobile menu derolling animation
  useEffect(() => {
    const panel = menuPanelRef.current;
    if (!panel) return;
    const fullHeight = `calc(100vh - ${NAVBAR_HEIGHT}px)`;
    if (isOpen) {
      gsap.to(panel, {
        height: fullHeight,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        display: 'block',
        pointerEvents: 'auto',
      });
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
    }
  }, [isOpen]);

  return (
    <nav className="bg-white text-black border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center" style={{ height: NAVBAR_HEIGHT }}>
        <div className="text-xl font-semibold uppercase tracking-wider interactive">{siteConfig.name}</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {siteConfig.navigation.main.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="relative group hover:text-gray-700 uppercase tracking-wider pb-1 flex items-center interactive"
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              )}
            </a>
          ))}
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span ref={topBar} className="block w-7 h-1 bg-black mb-1 rounded origin-center transition-all"></span>
          <span ref={midBar} className="block w-7 h-1 bg-black mb-1 rounded origin-center transition-all"></span>
          <span ref={botBar} className="block w-7 h-1 bg-black rounded origin-center transition-all"></span>
        </button>
      </div>
      {/* Mobile Menu Panel (derolls from under navbar) */}
      <div
        ref={menuPanelRef}
        style={{
          position: 'fixed',
          top: NAVBAR_HEIGHT,
          left: 0,
          right: 0,
          zIndex: 40,
          background: 'white',
          height: 0,
          opacity: 0,
          overflow: 'hidden',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        className="md:hidden shadow-lg"
      >
        <div className="flex flex-col items-start px-8 py-8 space-y-8 text-3xl font-serif h-full w-full">
          {siteConfig.navigation.main.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setIsOpen(false)} 
              className="flex items-center hover:text-gray-700 interactive"
            >
              {item.name.charAt(0) + item.name.slice(1).toLowerCase()}{item.badge && <sup className="text-base">{item.badge}</sup>}
              {item.external && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              )}
            </a>
          ))}
          <a 
            href={siteConfig.contact.linkedin} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)} 
            className="flex items-center hover:text-gray-700 interactive text-base"
          >
            Linkedin
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 