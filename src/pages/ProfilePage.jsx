// src/pages/ProfilePage.js
import React from "react";
import { useParams } from "react-router-dom"; // Untuk mengambil ID dari URL
import { umkmData } from "../data/mockData"; // Kita pakai data dummy
import PhotoGrid from "../components/PhotoGrid";
import { StarIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function ProfilePage() {
  // Dalam aplikasi nyata, Anda akan fetch data berdasarkan ID
  // Di sini kita ambil data pertama sebagai contoh
  const umkm = umkmData[0]; 

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* Header (Nama, Rating, Lokasi) */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold">{umkm.name}</h1>
        <div className="flex items-center text-lg mt-2 space-x-4">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="font-semibold">{umkm.rating}%</span>
            <span className="text-gray-600 ml-1">({umkm.reviews} reviews)</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-5 h-5 text-gray-600 mr-1.5" />
            <span className="text-gray-700">{umkm.location}</span>
          </div>
        </div>
      </div>

      {/* Grid Foto (Poin 6, dari Gambar 7) */}
      <PhotoGrid images={umkm.images} />

      {/* Konten Utama (Poin 6, dari Gambar 8 & 9) */}
      <div className="flex justify-between mt-10 gap-16">
        {/* Kolom Kiri: Deskripsi & Detail */}
        <div className="w-full lg:w-3/5">
          <h2 className="text-2xl font-semibold mb-3">
            Tentang {umkm.name}
          </h2>
          <p className="text-gray-700 leading-relaxed">{umkm.description}</p>

          <hr className="my-8" />

          {/* Bagian seperti "Vehicle details" (Gambar 9) */}
          <h2 className="text-2xl font-semibold mb-4">Detail Tempat</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-lg mr-3">🏢</span>
              <span className="text-gray-800">Tipe: {umkm.details.type}</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg mr-3">✨</span>
              <span className="text-gray-800">
                Fasilitas: {umkm.details.facilities.join(", ")}
              </span>
            </div>
            {/* Tambahkan detail lain di sini */}
          </div>
        </div>

        {/* Kolom Kanan: Dihilangkan (Poin 6) */}
        {/* Bagian booking dan harga sengaja dihilangkan sesuai permintaan Anda */}
      </div>
    </div>
  );
}