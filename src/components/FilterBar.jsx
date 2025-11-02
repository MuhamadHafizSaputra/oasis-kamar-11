// src/components/FilterBar.js
import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function FilterBar() {
  // Anda bisa tambahkan state dan logic untuk filter di sini
  const filters = ["Kategori", "Harga", "Rating", "Buka Sekarang"];

  return (
    <div className="py-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <button className="flex items-center px-4 py-2 border rounded-full font-medium text-sm hover:bg-gray-100">
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
          Filter
        </button>
        {filters.map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 border rounded-full font-medium text-sm hover:bg-gray-100"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}