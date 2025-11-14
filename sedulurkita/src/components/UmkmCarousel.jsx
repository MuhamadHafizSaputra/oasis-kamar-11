// src/components/UmkmCarousel.jsx
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function UmkmCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- PERBAIKAN 1: Ubah fungsi 'prev' untuk menerima 'e' (event) ---
  const prev = (e) => {
    e.stopPropagation(); // 2. Hentikan event agar tidak 'bubble' ke Link
    e.preventDefault(); // 3. Hentikan aksi default tombol
    setCurrentSlide((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  };
  
  // --- PERBAIKAN 1: Ubah fungsi 'next' untuk menerima 'e' (event) ---
  const next = (e) => {
    e.stopPropagation(); // 2. Hentikan event
    e.preventDefault(); // 3. Hentikan aksi default tombol
    setCurrentSlide((curr) => (curr === images.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
      <div
        className="flex transition-transform ease-out duration-300 h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Tombol Navigasi (Poin 5) */}
      <div className="absolute inset-0 flex items-center justify-between p-2">
        {/* PERBAIKAN 4: onClick={prev} sudah benar.
          React akan otomatis mengirim 'event' ke fungsi 'prev(e)'
        */}
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        {/* PERBAIKAN 4: onClick={next} juga sudah benar */}
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white z-10"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Indikator Titik */}
      <div className="absolute bottom-2 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-white rounded-full ${
                currentSlide === i ? "p-1.5" : "bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}