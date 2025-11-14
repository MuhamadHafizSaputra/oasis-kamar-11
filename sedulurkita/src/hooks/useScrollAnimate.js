// src/hooks/useScrollAnimate.js
import { useRef, useCallback, useEffect } from 'react';

export function useScrollAnimate() {
  
  // 1. Ref untuk menyimpan SATU observer
  const observer = useRef(null);
  
  // 2. useEffect ini akan mengelola SIKLUS HIDUP observer
  useEffect(() => {
    
    // 3. Buat observer-nya TEPAT SATU KALI saat hook digunakan (mount)
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Saat elemen masuk ke layar
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible'); // Tambahkan kelas
            
            // Setelah animasi selesai, berhenti mengamati
            if (observer.current) {
              observer.current.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.1, // Muncul saat 10% elemen terlihat
        rootMargin: "0px 0px -50px 0px", // Mulai 50px sebelum
      }
    );

    // 4. Simpan observer saat ini ke variabel lokal
    //    Ini penting untuk cleanup yang aman
    const currentObserver = observer.current;

    // 5. FUNGSI CLEANUP: Dipanggil saat komponen (spt HomePage) di-unmount
    return () => {
      if (currentObserver) {
        // Matikan observer sepenuhnya
        currentObserver.disconnect();
      }
    };
  }, []); // [] = Hanya berjalan sekali saat mount dan cleanup saat unmount

  // 6. Callback ref (addRef) sekarang SANGAT sederhana
  //    Tugasnya HANYA menambahkan elemen ke observer yang sudah ada
  const addRef = useCallback((el) => {
    // Pastikan elemen ada DAN observer sudah dibuat
    if (el && observer.current) {
      observer.current.observe(el);
    }
  }, []); // [] = Stabil, karena observer.current adalah ref yang mutable

  return addRef;
}