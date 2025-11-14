// src/hooks/useCountUp.js
import { useEffect, useRef } from 'react';

// Hook ini akan menganimasikan angka dari 0 ke target
export function useCountUp(target, suffix = '+') {
  const ref = useRef(null);

  useEffect(() => {
    // Simpan elemen DOM ke variabel lokal
    const element = ref.current; 
    
    // Buat observer HANYA untuk hook ini
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let current = 0;
            // Pastikan target adalah angka
            const validTarget = Number(target) || 0;
            const increment = validTarget / 100;
            const duration = 1500; // ms
            const stepTime = Math.floor(duration / 100);

            const timer = setInterval(() => {
              current += increment;
              if (current >= validTarget) {
                clearInterval(timer);
                current = validTarget;
              }
              // Cek ref.current lagi di dalam timer
              if (ref.current) {
                ref.current.textContent = Math.floor(current) + suffix;
              }
            }, stepTime);

            // Animasikan progress bar (jika ada)
            const progressBarContainer = entry.target.nextElementSibling?.nextElementSibling;
            if (progressBarContainer) {
              const progressBar = progressBarContainer.querySelector('div');
              if (progressBar) {
                progressBar.style.width = '0%'; // Mulai dari 0
                progressBar.style.transition = `width ${duration / 1000}s ease-out`;
                
                requestAnimationFrame(() => {
                  // Logika progres bar dari ProfilePage
                  let widthPercent = 5; // Default
                  if (target > 20) {
                     widthPercent = Math.floor(target / 5);
                  }
                  // Logika dari ProfilePage.jsx (untuk stat 'reviews' dan 'artisans')
                  if (entry.target.textContent.includes('Ulasan')) { 
                     widthPercent = Math.min(target / 5, 100);
                  } else if (entry.target.textContent.includes('Tim')) {
                     widthPercent = Math.min(target / 2, 100);
                  } else if (entry.target.textContent.includes('Atribut')) {
                     widthPercent = Math.min(target * 10, 100);
                  }
                  
                  progressBar.style.width = `${Math.min(widthPercent, 100)}%`;
                });
              }
            }
            
            // Berhenti mengamati elemen ini
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    // Amati elemen jika ada
    if (element) {
      observer.observe(element);
    }

    // FUNGSI CLEANUP YANG BENAR
    // Ini akan dipanggil saat komponen (ProfilePage) unmount
    return () => {
      // Matikan observer sepenuhnya
      observer.disconnect();
    };

  }, [target, suffix]); // Dependensi sudah benar

  return ref; 
}