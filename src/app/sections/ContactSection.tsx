// src/app/sections/ContactSection.tsx

'use client'
import { Parallax } from 'react-scroll-parallax';
import { useLanguage } from '../contexts/LanguageContext';

//TODO: #4 #3 Make the contact section parallax better, a little taller and fix the background not blending with the section (we can see it where the rounded corners of the last section reveals the black background of the section/page/layout)

const ContactSection = () => {
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
          <div className="relative mt-8 w-fit mx-auto">
            <a
              href="mailto:constantsuchet@gmail.com"
              className="relative px-12 py-4 border border-white rounded-full text-white nohemi-heading-md text-lg block hover:bg-white hover:text-black transition-all duration-300 z-10 min-w-[280px] text-center cursor-hover-target interactive"
            >
              {t('contact.button')}
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-12">
            <a href="https://github.com/gh-Constant" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/constantsuchet" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default ContactSection;