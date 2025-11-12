// src/hooks/useCountUp.js
import { useEffect, useRef } from 'react';

// Hook ini akan menganimasikan angka dari 0 ke target
export function useCountUp(target, suffix = '+') {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let current = 0;
            const increment = target / 100;
            const duration = 1500; // ms
            const stepTime = Math.floor(duration / 100);

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                clearInterval(timer);
                current = target;
              }
              if (ref.current) {
                ref.current.textContent = Math.floor(current) + suffix;
              }
            }, stepTime);

            // Animasikan progress bar (jika ada)
            const progressBarContainer = entry.target.nextElementSibling?.nextElementSibling;
            if (progressBarContainer) {
              const progressBar = progressBarContainer.querySelector('div');
              if (progressBar) {
                progressBar.style.width = `${target}%`;
                progressBar.style.transition = `width ${duration / 1000}s ease-out`;
              }
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, suffix]);

  return ref; // Kembalikan ref untuk di-attach ke elemen
}