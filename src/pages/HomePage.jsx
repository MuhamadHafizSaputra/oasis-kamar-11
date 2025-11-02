// src/pages/HomePage.js
import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import FeaturedCard from "../components/FeaturedCard.jsx";
import { umkmData } from "../data/mockData"; // Data dummy

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header dan SearchBar */}
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

      {/* Featured Cards (Poin 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {umkmData.map((item) => (
          <FeaturedCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}