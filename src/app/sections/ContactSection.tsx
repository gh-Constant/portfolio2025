// src/app/sections/ContactSection.tsx

'use client'
import { Parallax } from 'react-scroll-parallax';
import { useMagnetic } from '@/hooks/use-magnetic';
import { useLanguage } from '../contexts/LanguageContext';

//TODO: #4 #3 Make the contact section parallax better, a little taller and fix the background not blending with the section (we can see it where the rounded corners of the last section reveals the black background of the section/page/layout)

const ContactSection = () => {
  const { elementRef, backgroundRef } = useMagnetic({ maxDistance: 0.7, minDistance: 0.5 });
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative z-10 min-h-[60vh] w-full bg-[#111] flex flex-col items-center justify-center">
      <Parallax speed={-20}>
        <div className="relative">
          <h2 className="text-[clamp(2rem,8vw,7rem)] nohemi-heading-xl mb-4 text-white text-center leading-none">
            {t('contact.title').split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </h2>
          <div className="relative mt-8 w-fit mx-auto overflow-hidden" ref={elementRef}>
            <div
              ref={backgroundRef}
              className="absolute inset-0 bg-white rounded-full pointer-events-none z-0 opacity-0"
              style={{ transform: 'translate3d(0,0,0)', top: '-100%', left: '0%' }}
            />
            <a
              href="mailto:constantsuchet@gmail.com"
              className="relative px-12 py-4 border border-white rounded-full text-white nohemi-heading-md text-lg block hover:text-black transition-colors duration-300 z-10 min-w-[280px] text-center cursor-hover-target"
            >
              {t('contact.button')}
            </a>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default ContactSection;