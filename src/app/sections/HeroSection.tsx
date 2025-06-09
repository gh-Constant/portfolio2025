import React, { useState, useEffect } from 'react';
import Logo3D from '../components/Logo3D';

const HeroSection: React.FC = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // It's good practice to also handle cases where the component might unmount
  // before the model loads, though less critical here since it's a main section.
  useEffect(() => {
    // Potential cleanup if needed, e.g., if Logo3D had a way to cancel loading
    return () => {
      // Cleanup logic here
    };
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center bg-transparent relative overflow-hidden">
      {/* 3D Model Background Layer */}
      {/* The Logo3D component will only be fully visible once loaded due to its internal structure or styling if any */}
      {/* We ensure it's part of the DOM to allow its onLoad to trigger */}
      <div className={`absolute -top-20 inset-x-0 bottom-0 z-0 transition-opacity duration-500 ${isModelLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Logo3D onLoad={() => setIsModelLoaded(true)} />
      </div>
      
      {/* Text Foreground Layer */}
      {/* This text will be visible regardless of the 3D model's loading state */}
      <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/4 z-10">
        <h1 className="text-center w-full px-4">
          <span className="nohemi-caption block text-[clamp(3.5rem,22.5vw,20rem)] leading-none text-black">
          </span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;