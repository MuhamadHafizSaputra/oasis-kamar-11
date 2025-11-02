// src/pages/HomePage.jsx
import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import FeaturedCard from "../components/FeaturedCard.jsx";
import CtaCard from "../components/CtaCard.jsx";
// HAPUS Impor ini: import AboutUs from "../components/AboutUs.jsx"; 
import { umkmData } from "../data/mockData"; // Data dummy

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header dan SearchBar (Tidak Berubah) */}
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Temukan UMKM Jogja
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Dari kuliner lezat, kerajinan unik, hingga jasa lokal—semua ada di
          sini.
        </p>
        <SearchBar />
      </div>

      {/* Featured Cards (Tidak Berubah) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {umkmData.slice(0, 2).map((item, index) => (
          <FeaturedCard
            key={item.id}
            id={item.id}
            category={item.category}
            description={item.name}
            imageUrl={item.images[0]}
            buttonText="Lihat Detail"
            colorTheme={index === 0 ? "purple" : "orange"}
          />
        ))}
      </div>

      {/* CTA Card (Tidak Berubah) */}
      <CtaCard />

      {/* HAPUS Komponen <AboutUs /> dari sini */}
      
    </div>
  );
}