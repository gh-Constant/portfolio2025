import React from 'react';
import Logo3D from '../components/Logo3D';

const HeroSection: React.FC = () => {
  return (
    <section className="flex min-h-screen  items-center justify-center bg-transparent relative overflow-hidden">
      {/* 3D Model Background Layer */}
      <div className="absolute inset-0 z-0">
        <Logo3D />
      </div>
      
      {/* Text Foreground Layer */}
      <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/4 z-10">
        <h1 className="text-center w-full px-4">
          <span className="offbit-font block text-[clamp(3.5rem,22.5vw,20rem)] leading-none text-black">
            
          </span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;