'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  maxDistance?: number;
  minDistance?: number;
}

export const useMagnetic = ({ maxDistance = 0.5, minDistance = 0.1 }: MagneticButtonProps = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    const bg = backgroundRef.current;
    if (!el || !bg) return;

    let active = false;

    const getDirectionStyles = (x: number, y: number, enter: boolean) => {
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      
      // Calculate initial position based on angle
      const startLeft = Math.cos(angle * (Math.PI / 180)) * 100;
      const startTop = Math.sin(angle * (Math.PI / 180)) * 100;
      
      return {
        left: enter ? '0%' : `${startLeft}%`,
        top: enter ? '0%' : `${startTop}%`,
        opacity: enter ? 1 : 0,
        scale: enter ? 1 : 0.8,
        duration: 0.4,
        ease: enter ? 'power2.out' : 'power2.in'
      };
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const threshold = rect.width * (active ? maxDistance : minDistance);

      if (distance < threshold) {
        active = true;
        // Calculate movement with smooth dampening as cursor approaches edges
        const dampening = Math.max(0.2, 1 - (distance / threshold));
        const maxMove = rect.width * 0.15; // Maximum movement range
        const moveX = Math.min(Math.max(dx * dampening * 0.6, -maxMove), maxMove);
        const moveY = Math.min(Math.max(dy * dampening * 0.6, -maxMove), maxMove);
        
        gsap.to(el, {
          x: moveX,
          y: moveY,
          rotation: moveX * 0.03, // Reduced rotation for smoother effect
          duration: 0.4,
          ease: 'power2.out',
        });
      } else if (active) {
        active = false;
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    const animateBg = (e: MouseEvent, enter: boolean) => {
      const rect = el.getBoundingClientRect();
      const dx = e.pageX - rect.left - rect.width / 2;
      const dy = e.pageY - rect.top - rect.height / 2;
      
      const styles = getDirectionStyles(dx, dy, enter);
      
      gsap.to(bg, {
        ...styles,
        transformOrigin: enter ? 'center center' : `${50 + (dx / rect.width) * 50}% ${50 + (dy / rect.height) * 50}%`,
      });
    };

    window.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', (e) => animateBg(e, true));
    el.addEventListener('mouseleave', (e) => animateBg(e, false));

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', (e) => animateBg(e, true));
      el.removeEventListener('mouseleave', (e) => animateBg(e, false));
    };
  }, [maxDistance, minDistance]);

  return { elementRef, backgroundRef };
};
