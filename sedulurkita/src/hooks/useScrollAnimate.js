// src/hooks/useScrollAnimate.js
import { useEffect, useRef } from 'react';

// Hook ini akan menambahkan kelas 'is-visible' saat elemen masuk ke viewport
export function useScrollAnimate() {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Mulai animasi sedikit sebelum elemen penuh terlihat
      }
    );

    const currentElements = elementsRef.current;
    currentElements.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      currentElements.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Fungsi untuk mendaftarkan elemen ke ref array
  const addRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return addRef; // Kembalikan fungsi 'addRef'
}