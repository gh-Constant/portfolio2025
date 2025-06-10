// src/app/components/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const pathname = usePathname();
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showText] = useState(true);
  const [shouldShowLoading, setShouldShowLoading] = useState(true);

  // Check if this is a client-side navigation (not initial page load)
  useEffect(() => {
    // Also check if the page was loaded via Next.js router (client-side navigation)
    const hasNavigationAPI = typeof window !== 'undefined' && 'navigation' in window;
    const isNextJSNavigation = hasNavigationAPI || sessionStorage.getItem('nextjs-navigation');
    
    // Don't show loading screen for client-side navigation or if coming from another page
    if (isNextJSNavigation || document.referrer.includes(window.location.origin)) {
      setShouldShowLoading(false);
      setIsVisible(false);
    }
    
    // Mark that we've navigated within the app
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nextjs-navigation', 'true');
    }
  }, [pathname]);

  useEffect(() => {
    // Don't run loading animation if we shouldn't show loading
    if (!shouldShowLoading) return;
    
    let currentProgress = 0;
    const targetProgress = 100;
    let animationFrameId: number;
    let lastPauseTime = 0;
    let nextPauseDuration = 0;
    const initialDelay = 500; // Wait 500ms before starting

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const shouldPause = () => {
      // Pause more frequently at lower percentages, less at higher
      const pauseChance = currentProgress < 30 ? 0.02 : (currentProgress < 70 ? 0.01 : 0.005);
      return Math.random() < pauseChance;
    };

    const animateLoading = (timestamp: number) => {
      if (!lastPauseTime) lastPauseTime = timestamp; // Initialize lastPauseTime

      let currentSpeedFactor = 1;
      if (timestamp < lastPauseTime + nextPauseDuration) {
        // During a "pause", significantly slow down the animation
        currentSpeedFactor = 0.1; // Drastically reduce speed instead of a hard stop
      } else {
        // Check if a new pause should start
        if (shouldPause()) {
          lastPauseTime = timestamp;
          nextPauseDuration = 300 + Math.random() * 700; // Pause for 300-1000ms
          currentSpeedFactor = 0.1; // Start the slowdown for the new pause
        }
      }

      // Increment progress
      const baseProgressStep = 0.2 + Math.random() * 0.4; // Base step, slightly reduced randomness
      const progressStep = baseProgressStep * currentSpeedFactor;
      currentProgress += progressStep;
      const easedProgress = targetProgress * easeOutCubic(Math.min(currentProgress / targetProgress, 1));

      if (easedProgress < targetProgress) {
        setLoadingPercentage(Math.min(Math.floor(easedProgress), targetProgress));
        animationFrameId = requestAnimationFrame(animateLoading);
      } else {
        setLoadingPercentage(targetProgress);
        // Ensure the slide-up animation doesn't start prematurely if we are in a slowdown phase
        if (currentSpeedFactor === 1) { 
            setTimeout(() => setIsVisible(false), 500); // Delay before starting slide-up
        } else {
            // If ending during a slowdown, wait for the slowdown period to effectively end
            const remainingPause = (lastPauseTime + nextPauseDuration) - timestamp;
            setTimeout(() => setIsVisible(false), Math.max(500, remainingPause + 100));
        }
      }
    };

    const startAnimationWithDelay = () => {
        animationFrameId = requestAnimationFrame(animateLoading);
    };

    const timeoutId = setTimeout(startAnimationWithDelay, initialDelay);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    }
  }, [shouldShowLoading]);

  return (
    <AnimatePresence>
      {isVisible && shouldShowLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} // Smoother cubic-bezier for slide
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gridTemplateRows: '1fr auto 1fr',
            alignItems: 'center',
            padding: '2rem',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${loadingPercentage}%`,
              height: '100%',
              backgroundColor: 'white',
              zIndex: -1,
              transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother transition for the progress bar
            }}
          />
          <div></div>
          <motion.p
            initial={{ transform: 'translateY(0%)' }}
            animate={{ transform: showText ? 'translateY(0%)' : 'translateY(100%)' }}
            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
            style={{
              fontFamily: 'var(--font-offbit)',
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              color: 'white',
              mixBlendMode: 'difference',
              gridColumn: '1 / 2',
              gridRow: '2 / 3',
              textAlign: 'left',
              lineHeight: '1',
              paddingLeft: '5vw',
              overflow: 'hidden',
            }}
          >
            {loadingPercentage}
          </motion.p>
          <div></div>
          <div></div>
          <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              src="/images/loading-image.png"
              alt="Loading Logo"
              width={400} // Increased logo size
              height={400} // Increased logo size
              priority
              style={{ mixBlendMode: 'difference' }}
            />
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;