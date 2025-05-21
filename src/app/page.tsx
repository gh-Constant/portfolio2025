'use client'

import HeroSection from './sections/HeroSection';
import ContactSection from './sections/ContactSection';
import { ParallaxProvider } from 'react-scroll-parallax';
import GridLines from './components/GridLines';

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="relative bg-black min-h-screen w-full">
        <GridLines />
        <div className="relative min-h-screen bg-white flex flex-col
          rounded-b-[2.5rem] overflow-hidden border-[8px] border-white shadow-xl"
        >
          <main className="flex-1">
            <HeroSection />
          </main>
        </div>
        <ContactSection />
      </div>
    </ParallaxProvider>
  );
}