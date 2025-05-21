'use client'

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

function getTimeString() {
  const now = new Date();
  return now.toLocaleTimeString('fr-FR', { hour12: false, timeZone: 'Europe/Paris' }) + ' GMT+1';
}

const BottomBar: React.FC = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(getTimeString()); // Set time on mount
    const interval = setInterval(() => {
      setTime(getTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mix-blend-difference" style={{ fontFamily: 'inherit' }}>
      <div className="flex items-center justify-between px-3 sm:px-8 py-2 sm:py-3 w-full">
        {/* Email on the left, responsive with ellipsis */}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="flex-1 min-w-0 text-xs sm:text-base font-mono underline text-white hover:text-blue-300 transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ letterSpacing: 1 }}
          title={siteConfig.contact.email}
        >
          {siteConfig.contact.email}
        </a>
        {/* Centered Location */}
        <div className="flex-1 flex justify-center items-center text-xs sm:text-base font-semibold text-white">
          <span style={{ letterSpacing: 2 }}>{siteConfig.location}</span>
        </div>
        {/* Time on the right */}
        <div className="flex-1 flex justify-end text-xs sm:text-base font-mono tracking-widest text-white overflow-hidden text-ellipsis whitespace-nowrap">
          {time ?? ''}
        </div>
      </div>
    </div>
  );
};

export default BottomBar; 