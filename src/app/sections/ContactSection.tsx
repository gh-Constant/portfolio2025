// src/app/sections/ContactSection.tsx

'use client'
import { Parallax } from 'react-scroll-parallax';
import { useMagnetic } from '@/hooks/use-magnetic';

//TODO: #4 #3 Make the contact section parallax better, a little taller and fix the background not blending with the section (we can see it where the rounded corners of the last section reveals the black background of the section/page/layout)

const ContactSection = () => {
  const { elementRef, backgroundRef } = useMagnetic({ maxDistance: 0.7, minDistance: 0.5 });

  return (
    <section className="relative z-10 min-h-[60vh] w-full bg-[#111] flex flex-col items-center justify-center">
      <Parallax speed={-20}>
        <div className="relative">
          <h2 className="text-[clamp(2rem,8vw,7rem)] offbit-font mb-4 text-white text-center leading-none">
            Let's create <br />
            <span className="block">great things <span className="italic">together</span></span>
          </h2>
          <div className="relative mt-8 w-fit mx-auto overflow-hidden" ref={elementRef}>
            <div
              ref={backgroundRef}
              className="absolute inset-0 bg-white rounded-full pointer-events-none z-0 opacity-0"
              style={{ transform: 'translate3d(0,0,0)', top: '-100%', left: '0%' }}
            />
            <a
              href="mailto:constantsuchet@gmail.com"
              className="relative px-12 py-4 border border-white rounded-full text-white cursor- offbit-font text-lg block hover:text-black transition-colors duration-300 z-10 min-w-[280px] text-center"
            >
              Let's Create Something Amazing
            </a>
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default ContactSection;