// src/app/components/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const targetProgress = 100;
    let animationFrameId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateLoading = () => {
      currentProgress += 0.5; // Base increment
      const easedProgress = targetProgress * easeOutCubic(currentProgress / targetProgress);

      if (easedProgress < targetProgress) {
        setLoadingPercentage(Math.min(Math.floor(easedProgress), targetProgress));
        animationFrameId = requestAnimationFrame(animateLoading);
      } else {
        setLoadingPercentage(targetProgress);
        setTimeout(() => setIsVisible(false), 500); // Delay before starting slide-up
      }
    };

    animationFrameId = requestAnimationFrame(animateLoading);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
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
              transition: 'width 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335)', // Non-linear progress bar
            }}
          />
          <div></div>
          <p
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
            }}
          >
            {loadingPercentage}
          </p>
          <div></div>
          <div></div>
          <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              src="/images/loading-image.png"
              alt="Loading Logo"
              width={300}
              height={300}
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