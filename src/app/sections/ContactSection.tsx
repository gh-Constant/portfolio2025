// src/app/sections/ContactSection.tsx

'use client'
import { Parallax } from 'react-scroll-parallax';

const ContactSection = () => (
  <section className="relative z-10 min-h-[60vh] w-full bg-black flex flex-col items-center justify-center">
    <Parallax speed={-20}>
      <div className="relative">
        <h2 className="text-[clamp(2rem,8vw,7rem)] font-serif mb-4 text-white mix-blend-difference text-center leading-none">
          Let&apos;s create <br />
          <span className="block">great things <span className="italic">together.</span></span>
        </h2>
        <a
          href="mailto:hello@yourdomain.com"
          className="mt-8 px-8 py-4 border border-white rounded-full text-white mix-blend-difference text-lg hover:bg-white hover:text-black transition block w-fit mx-auto"
        >
          hello@yourdomain.com
        </a>
      </div>
    </Parallax>
  </section>
);

export default ContactSection;