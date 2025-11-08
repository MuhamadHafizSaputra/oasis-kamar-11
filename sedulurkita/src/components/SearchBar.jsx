// src/components/SearchBar.jsx
import React, { useState } from "react";
// DIUBAH: Impor useNavigate
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";

const categories = [
  {
    name: "Makanan",
    icon: CakeIcon,
    subcategories: ["Gudeg", "Bakmi", "Angkringan"],
  },
  {
    name: "Produk",
    icon: ShoppingBagIcon,
    subcategories: ["Batik", "Kerajinan", "Kaos"],
  },
  { name: "Jasa", icon: WrenchScrewdriverIcon, subcategories: ["Laundry", "Tur", "Pijat"] },
  {
    name: "Belanja",
    icon: BuildingStorefrontIcon,
    subcategories: ["Oleh-oleh", "Minimarket", "Pasar"],
  },
];

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  // DIUBAH: Tambahkan state untuk query & panggil hook navigate
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // DIUBAH: Fungsi untuk menangani submit pencarian
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Pindah ke /list dengan membawa query pencarian
      navigate(`/list?q=${encodeURIComponent(query)}`);
    }
  };

  // DIUBAH: Fungsi untuk menangani klik "UMKM Terdekat"
  const handleNearMeClick = () => {
    // Pindah ke /list dengan parameter khusus
    navigate(`/list?loc=terdekat`);
  };

  // Handle klik kategori dan subkategori 
  const handleCategoryClick = (categoryName) => {
    navigate(`/list?q=${encodeURIComponent(categoryName)}`);
    // Opsi: Reset isFocused agar dropdown tertutup jika perlu
    setIsFocused(false);
  }

  const handleSubcategoryClick = (subcategoryName) => {
    navigate(`/list?q=${encodeURIComponent(subcategoryName)}`);
    // Opsi: Reset isFocused agar dropdown tertutup jika perlu
    setIsFocused(false);
  }
  // --- AKHIR PERUBAHAN BARU ---

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
      {/* Bagian Kategori (DIBUAT FUNGSIONAL) */}
      <div className="flex justify-around mb-4">
        {categories.map((category) => (
          <div key={category.name} className="relative group">
            {/* Tombol Kategori Utama: Sekarang memanggil handleCategoryClick */}
            <button 
              className="flex flex-col items-center w-20 text-center text-gray-700 hover:text-indigo-600"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="p-3 bg-gray-100 rounded-full group-hover:bg-indigo-100">
                <category.icon className="w-6 h-6" />
              </div>
              <span className="mt-1 text-sm font-medium">{category.name}</span>
            </button>
            {/* Dropdown Subkategori: Sekarang memanggil handleSubcategoryClick */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                {category.subcategories.map((sub) => (
                  <a 
                    key={sub} 
                    href={`/list?q=${encodeURIComponent(sub)}`} // Link untuk SEO/fallback
                    onClick={(e) => {
                      e.preventDefault(); // Mencegah navigasi <a> default
                      handleSubcategoryClick(sub); // Menggunakan fungsi navigate
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {sub}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DIUBAH: Bungkus search box dengan <form> */}
      <form className="relative" onSubmit={handleSearchSubmit}>
        <div className="flex items-center w-full">
          <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Mau cari apa di Jogja?"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            // DIUBAH: Hubungkan ke state
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <button type="submit" className="hidden">Cari</button>
        </div>

        {/* Dropdown "UMKM Terdekat" */}
        {isFocused && (
          <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-40">
            <ul>
              {/* DIUBAH: Gunakan onMouseDown agar dieksekusi sebelum onBlur */}
              <li 
                className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onMouseDown={handleNearMeClick}
              >
                <MapPinIcon className="w-6 h-6 mr-3 text-indigo-600" />
                <div>
                  <p className="font-semibold">UMKM Terdekat</p>
                  <p className="text-sm text-gray-500">
                    Temukan dari lokasi Anda saat ini
                  </p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}