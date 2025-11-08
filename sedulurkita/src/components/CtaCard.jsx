// src/components/CtaCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaCard() {
  // Saya menggunakan warna oranye yang mirip dengan FeaturedCard sebelumnya.
  // Ganti URL gambar ini dengan gambar pilihan Anda.
  const backgroundImageUrl = "https://images.unsplash.com/photo-1631002164896-004e2058d6e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170://images.unsplash.com/photo-1501959915573-a53b09502102?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg mt-12">
      {/* Background Image */}
      <img
        src={backgroundImageUrl}
        alt="Pemandangan Jogja"
        className="w-full h-full object-cover"
      />

      {/* Box Konten di Kiri */}
      <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 
                     bg-orange-600 p-8 rounded-2xl shadow-xl max-w-md
                     transform transition-all duration-300 hover:shadow-2xl">
        
        <h2 className="text-3xl font-bold text-white leading-tight">
          Punya Bisnis UMKM Sendiri?
        </h2>
        <p className="text-white/90 mt-4 mb-6">
          Daftarkan usaha Anda di SedulurKita dan jangkau lebih banyak pelanggan di Yogyakarta.
        </p>
        
        {/* Tombol Putih */}
        <Link
          to="/register" // Anda bisa ganti link tujuannya nanti
          className="inline-block px-6 py-3 bg-white text-orange-700 font-semibold rounded-full text-md hover:bg-gray-100 transition-colors"
        >
          Daftarkan Usaha Anda
        </Link>
      </div>
    </div>
  );
}