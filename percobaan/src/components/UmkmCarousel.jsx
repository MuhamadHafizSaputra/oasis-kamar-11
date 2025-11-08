// src/components/UmkmCarousel.js
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function UmkmCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () =>
    setCurrentSlide((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () =>
    setCurrentSlide((curr) => (curr === images.length - 1 ? 0 : curr + 1));

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
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
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