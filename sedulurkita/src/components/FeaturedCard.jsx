// src/components/FeaturedCard.jsx
import React from "react";
import { Link } from "react-router-dom"; // Impor Link untuk tombol

// Definisikan tema warna agar mirip gambar
const themes = {
  brown: {
    bg: "bg-[#6B4E31]",
    title: "text-white",
    description: "text-white",
    buttonBg: "bg-white",
    buttonText: "text-black",
  },
};

export default function FeaturedCard({
  id,
  category,
  description,
  imageUrl,
  buttonText,
  colorTheme = "brown",
}) {
  const theme = themes[colorTheme] || themes.brown;

  return (
    // --- MODIFIKASI TOTAL STRUKTUR KARTU ---
    <div className="rounded-xl overflow-hidden shadow-lg 
                   transform transition-all duration-300 
                   hover:shadow-2xl hover:-translate-y-1">
      
      {/* 1. Bagian Gambar */}
      <div className="h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={description}
        />
      </div>

      {/* 2. Bagian Konten (Solid) */}
      <div className={`p-5 ${theme.bg} flex justify-between items-center`}>
        {/* Teks di kiri */}
        <div className="flex-1 pr-4">
          <h4
            className={`text-xs font-bold uppercase tracking-wider ${theme.title}`}
          >
            {category}
          </h4>
          <p className={`text-lg font-semibold ${theme.description} mt-1`}>
            {description}
          </p>
        </div>
        {/* Tombol di kanan */}
        <div className="flex-shrink-0">
          <Link
            to={`/umkm/${id}`}
            className={`px-5 py-2.5 ${theme.buttonBg} ${theme.buttonText} font-semibold rounded-full text-sm hover:bg-gray-100 transition-colors`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
    // --- AKHIR MODIFIKASI ---
  );
}