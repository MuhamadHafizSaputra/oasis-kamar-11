// src/components/PhotoGrid.jsx
import React from "react";
import LazyImage from "./LazyImage"; // Impor LazyImage

export default function PhotoGrid({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden">
      {/* Gambar Utama (Besar) */}
      <div className="col-span-2 row-span-2 relative group">
        <LazyImage
          src={images[0]}
          alt="Main"
          className="w-full h-full cursor-pointer group-hover:opacity-90"
          width={600} // Ukuran lebih besar
        />
      </div>
      {/* 4 Gambar Kecil */}
      {images.slice(1, 5).map((img, index) => (
        <div key={index} className="col-span-1 relative group">
          <LazyImage
            src={img}
            alt={`Thumb ${index + 1}`}
            className="w-full h-full cursor-pointer group-hover:opacity-90"
            width={300} // Ukuran kecil cukup 300px
          />
        </div>
      ))}
    </div>
  );
}