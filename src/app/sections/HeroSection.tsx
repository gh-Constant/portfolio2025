import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-transparent relative overflow-hidden">
      {/* 3D Model Background Layer */}
      <div className="absolute inset-0 z-0">
      
      </div>
      
      {/* Text Foreground Layer */}
      <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/4 z-10">
        <h1 className="text-center w-full px-4">
          <span className="fleur-de-leah-regular block text-[clamp(5rem,30vw,25rem)] leading-none text-black">
            Constant
          </span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;