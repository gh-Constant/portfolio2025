import HeroSection from './sections/HeroSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      {/* You can add other sections or content outside the HeroSection if needed */}
    </main>
  );
}
