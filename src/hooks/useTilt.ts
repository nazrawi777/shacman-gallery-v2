import { useRef, useCallback, useEffect, useState } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  disabled?: boolean;
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
) {
  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 400,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || disabled || prefersReducedMotion) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    },
    [disabled, maxTilt, perspective, scale, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current || disabled || prefersReducedMotion) return;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }, [disabled, perspective, prefersReducedMotion]);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || prefersReducedMotion) return;

    element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    element.style.transformStyle = 'preserve-3d';

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, speed, disabled, prefersReducedMotion]);

  return ref;
}

export default useTilt;
