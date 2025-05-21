import React from "react";
import Logo3D from "../components/Logo3D";

const HeroSection: React.FC = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-transparent relative overflow-hidden">
      <Logo3D />
      <div className="absolute inset-x-0 top-1/4 transform -translate-y-1/4 z-10">
        <h1 className="text-center w-full px-4">
          <span className="fleur-de-leah-regular block text-[clamp(5rem,30vw,25rem)] leading-none">Constant</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection; 