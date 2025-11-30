'use client'

import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import { ParallaxProvider } from 'react-scroll-parallax';
import GridLines from './components/GridLines';

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="relative bg-black min-h-screen w-full">
        <div className="relative bg-white flex flex-col
          rounded-b-[4rem] overflow-hidden border-[8px] border-white shadow-xl"
        >
          <GridLines />
          <main className="flex-1">
            <HeroSection />
            <AboutSection />
          </main>
          <div className="relative">
            <ProjectsSection />
          </div>
        </div>
        <div className="relative">
          <GridLines />
          <ContactSection />
        </div>
      </div>
    </ParallaxProvider>
  );
}