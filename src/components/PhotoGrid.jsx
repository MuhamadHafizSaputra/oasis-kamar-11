// src/components/PhotoGrid.js
import React from "react";

export default function PhotoGrid({ images }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden">
      {/* Gambar Utama */}
      <div className="col-span-2 row-span-2">
        <img
          src={images[0]}
          alt="Main"
          className="w-full h-full object-cover cursor-pointer hover:opacity-90"
        />
      </div>
      {/* 4 Gambar Kecil */}
      {images.slice(1, 5).map((img, index) => (
        <div key={index} className={index > 1 ? "col-span-1" : "col-span-1"}>
          <img
            src={img}
            alt={`Thumb ${index + 1}`}
            className="w-full h-full object-cover cursor-pointer hover:opacity-90"
          />
        </div>
      ))}
      {/* Anda bisa tambahkan tombol "Lihat Semua Foto" di sini */}
    </div>
  );
}