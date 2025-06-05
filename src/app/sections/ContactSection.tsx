// src/app/sections/ContactSection.tsx

'use client'
import { Parallax } from 'react-scroll-parallax';

//TODO: #4 #3 Make the contact section parallax better, a little taller and fix the background not blending with the section (we can see it where the rounded corners of the last section reveals the black background of the section/page/layout)

const ContactSection = () => (
  <section className="relative z-10 min-h-[60vh] w-full bg-[#111] flex flex-col items-center justify-center">
    <Parallax speed={-20}>
      <div className="relative">
        <h2 className="text-[clamp(2rem,8vw,7rem)] offbit-font mb-4 text-white text-center leading-none">
          Lets create <br />
          <span className="block">great things <span className="italic">together</span></span>
        </h2>
        <a
          href="mailto:constantsuchet@gmail.com"
          className="mt-8 px-8 py-4 cursor-hover-target border border-white rounded-full text-white offbit-font text-lg hover:bg-white hover:text-black transition block w-fit mx-auto"
        >
          constantsuchet@gmail.com
        </a>
      </div>
    </Parallax>
  </section>
);

export default ContactSection;