import React, { useState, useEffect } from 'react';
import Logo3D from '../components/Logo3D';
import LoadingScreen from '../components/LoadingScreen'; // Import LoadingScreen

const HeroSection: React.FC = () => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isScreenVisible, setIsScreenVisible] = useState(true);

  const handleLoadingComplete = () => {
    setIsScreenVisible(false);
  };

  return (
    <>
      {isScreenVisible && (
        <LoadingScreen 
          logoSrc="/assets/logo-optimized.glb" // Replace with your actual logo path if different
          onLoadingComplete={handleLoadingComplete}
          isModelLoaded={isModelLoaded}
        />
      )}
    <section className="flex min-h-screen  items-center justify-center bg-transparent relative overflow-hidden">
      {/* 3D Model Background Layer */}
      <div className={`absolute inset-0 z-0 ${isScreenVisible ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Logo3D onLoad={() => setIsModelLoaded(true)} />
      </div>
      
      {/* Text Foreground Layer */}
      <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/4 z-10">
        <h1 className="text-center w-full px-4">
          <span className="offbit-font block text-[clamp(3.5rem,22.5vw,20rem)] leading-none text-black">
            
          </span>
        </h1>
      </div>
    </section>
    </>
  );
};

export default HeroSection;