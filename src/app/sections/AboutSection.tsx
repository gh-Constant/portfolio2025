'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full py-20 bg-white text-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl nohemi-heading-lg mb-8">
          {t('about.title') || 'About Me'}
        </h2>
        <div className="prose prose-lg max-w-none nohemi-body text-gray-800 space-y-6">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
          <p>{t('about.p4')}</p>
          <p>
            Explore my <Link href="/#projects" className="underline hover:text-blue-600 transition-colors">projects</Link> to see my work in action, or <Link href="#contact" className="underline hover:text-blue-600 transition-colors">contact me</Link> to discuss potential collaborations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
