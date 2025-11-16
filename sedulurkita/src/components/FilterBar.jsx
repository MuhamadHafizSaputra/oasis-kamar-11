// src/components/FilterBar.jsx
import React from "react";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// --- PERUBAHAN 1: Tambahkan 'className' sebagai prop ---
const FilterDropdown = ({ label, value, onChange, children, className }) => (
  // --- Terapkan 'className' di sini ---
  <div className={`relative ${className}`}>
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

export default function FilterBar({ activeFilters, setActiveFilters, onAdvancedFilterClick }) {
  
  const handleFilterChange = (key, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="py-4 border-b border-gray-200">
      {/* --- PERUBAHAN 2: Modifikasi container ini ---
        - 'flex-wrap' diubah menjadi 'flex-nowrap'
        - 'overflow-x-auto' ditambahkan untuk scroll horizontal
        - 'no-scrollbar' ditambahkan (dari index.css Anda) untuk menyembunyikan scrollbar
        - 'pb-2' ditambahkan untuk memberi sedikit ruang di bawah
      */}
      <div className="flex flex-nowrap items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        
        {/* --- PERUBAHAN 3: Tambahkan 'flex-shrink-0' agar teks tidak gepeng --- */}
        <span className="flex flex-shrink-0 items-center px-2 py-2 font-medium text-sm text-gray-700">
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
          Filter:
        </span>

        {/* Filter Kategori */}
        <FilterDropdown
          label="Kategori"
          value={activeFilters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="flex-shrink-0" // <-- Tambahkan flex-shrink-0
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
          className="flex-shrink-0" // <-- Tambahkan flex-shrink-0
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
          className="flex-shrink-0" // <-- Tambahkan flex-shrink-0
        >
          <option value={0}>Semua Rating</option>
          <option value={95}>95% +</option>
          <option value={90}>90% +</option>
          <option value={80}>80% +</option>
        </FilterDropdown>

        {/* Tombol Filter Lanjutan */}
        <button
          onClick={onAdvancedFilterClick}
          // <-- Tambahkan flex-shrink-0
          className="flex flex-shrink-0 items-center pl-4 pr-5 py-2 border rounded-full font-medium text-sm 
                     hover:bg-indigo-50 hover:border-indigo-300 text-indigo-700"
        >
          <SparklesIcon className="w-5 h-5 mr-1.5" />
          Filter Lanjutan
        </button>
        
        {/* Spacer kecil di akhir agar tidak menempel di tepi */}
        <div className="flex-shrink-0 w-1"></div>
      </div>
    </div>
  );
}