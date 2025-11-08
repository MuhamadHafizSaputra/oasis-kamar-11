// src/components/FilterBar.jsx
import React from "react";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  SparklesIcon, // <-- Impor ikon baru
} from "@heroicons/react/24/outline";

// Helper component kecil untuk membuat dropdown kita rapi
const FilterDropdown = ({ label, value, onChange, children }) => (
  <div className="relative">
    <label htmlFor={`filter-${label}`} className="sr-only">
      {label}
    </label>
    <select
      id={`filter-${label}`}
      value={value}
      onChange={onChange}
      className="appearance-none cursor-pointer pl-4 pr-10 py-2 border rounded-full font-medium text-sm hover:bg-gray-100 bg-white"
    >
      {children}
    </select>
    <ChevronDownIcon className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

// --- TAMBAHKAN PROPS 'onAdvancedFilterClick' ---
export default function FilterBar({ activeFilters, setActiveFilters, onAdvancedFilterClick }) {
  
  const handleFilterChange = (key, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center px-2 py-2 font-medium text-sm text-gray-700">
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
          Filter:
        </span>

        {/* Filter Kategori */}
        <FilterDropdown
          label="Kategori"
          value={activeFilters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          <option value="Makanan">Makanan</option>
          <option value="Produk">Produk</option>
          <option value="Jasa">Jasa</option>
          <option value="Belanja">Belanja</option>
        </FilterDropdown>

        {/* Filter Harga (berdasarkan priceFrom) */}
        <FilterDropdown
          label="Harga"
          value={activeFilters.price}
          onChange={(e) => handleFilterChange("price", e.target.value)}
        >
          <option value="all">Semua Harga</option>
          <option value="murah">Murah (di bawah Rp 20rb)</option>
          <option value="sedang">Sedang (Rp 20rb - Rp 50rb)</option>
          <option value="mahal">Mahal (di atas Rp 50rb)</option>
        </FilterDropdown>

        {/* Filter Rating */}
        <FilterDropdown
          label="Rating"
          value={activeFilters.rating}
          onChange={(e) => handleFilterChange("rating", Number(e.target.value))}
        >
          <option value={0}>Semua Rating</option>
          <option value={95}>95% +</option>
          <option value={90}>90% +</option>
          <option value={80}>80% +</option>
        </FilterDropdown>

        {/* --- TOMBOL FILTER LANJUTAN BARU --- */}
        <button
          onClick={onAdvancedFilterClick} // <-- Gunakan prop
          className="flex items-center pl-4 pr-5 py-2 border rounded-full font-medium text-sm 
                     hover:bg-indigo-50 hover:border-indigo-300 text-indigo-700"
        >
          <SparklesIcon className="w-5 h-5 mr-1.5" />
          Filter Lanjutan
        </button>
        {/* --- AKHIR TOMBOL BARU --- */}
        
      </div>
    </div>
  );
}