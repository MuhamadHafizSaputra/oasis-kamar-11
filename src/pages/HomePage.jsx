// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import FeaturedCard from "../components/FeaturedCard.jsx";
import CtaCard from "../components/CtaCard.jsx";
import axios from "axios";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  // 5. Tambahkan useEffect untuk fetch data saat komponen dimuat
  useEffect(() => {
    axios.get('http://localhost:3001/api/umkm/featured')
      .then(response => {
        // 6. Data dari API perlu di-transform (fix snake_case & JSON)
        const transformedData = response.data.map(umkm => ({
          ...umkm,
          priceFrom: umkm.price_from,
          images: Array.isArray(umkm.images) ? umkm.images : JSON.parse(umkm.images || '[]')
        }));
        setFeatured(transformedData);
      })
      .catch(error => {
        console.error("Error fetching featured UMKM:", error);
      });
  }, []);

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
        {featured.map((item, index) => (
          <FeaturedCard
            key={item.id}
            id={item.id}
            category={item.category}
            description={item.name}
            imageUrl={item.images[0]} // Ini akan bekerja setelah data ditransform
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