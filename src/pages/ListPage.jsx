// src/pages/ListPage.js
import React from "react";
import FilterBar from "../components/FilterBar";
import UmkmCard from "../components/UmkmCard";
import { umkmData } from "../data/mockData";

export default function ListPage() {
  return (
    <div className="flex h-[calc(100vh-80px)]"> {/* 80px = tinggi navbar (estimasi) */}
      
      {/* Kolom Kiri: Filter dan Daftar (Poin 4) */}
      <div className="w-full lg:w-3/5 overflow-y-auto px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">
          {umkmData.length} UMKM ditemukan di Jogja
        </h2>
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {umkmData.map((umkm) => (
            <UmkmCard key={umkm.id} umkm={umkm} />
          ))}
        </div>
      </div>

      {/* Kolom Kanan: Peta (Poin 4) */}
      <div className="hidden lg:block w-2/5 h-full">
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <p className="text-gray-600 font-medium">
            Placeholder Peta - Anda bisa integrasikan map di sini
          </p>
        </div>
      </div>
    </div>
  );
}