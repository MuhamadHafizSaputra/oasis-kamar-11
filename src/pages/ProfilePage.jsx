// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // (Poin 1)
import { umkmData } from "../data/mockData";
import PhotoGrid from "../components/PhotoGrid";

// (Poin 2) Impor Ikon-ikon baru
import {
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ClockIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

// (Poin 3) Impor komponen Peta
import { Map, Marker, NavigationControl } from "@vis.gl/react-maplibre";

// Helper component untuk menampilkan bintang rating
const StarRating = ({ rating, maxRating = 5 }) => (
  <div className="flex items-center">
    {[...Array(maxRating)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

// Helper untuk format Rupiah
const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export default function ProfilePage() {
  const { id } = useParams();
  const [isDescExpanded, setIsDescExpanded] = useState(false); 

  // DIUBAH: Cari UMKM yang sesuai. 
  // Kita ubah 'id' dari string URL menjadi angka (Number)
  const umkm = umkmData.find(item => item.id === Number(id));

  // DIUBAH: Tambahkan penanganan jika UMKM tidak ditemukan
  if (!umkm) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-10 text-center">
        <h1 className="text-4xl font-bold">UMKM tidak ditemukan</h1>
        <p className="text-xl text-gray-600 mt-4">
          Maaf, data untuk UMKM dengan ID {id} tidak ada.
        </p>
      </div>
    );
  }
  const shortDescription = umkm.description.substring(0, 200) + "...";
  const priceRange = umkm.details.priceRange
  ? `${formatCurrency(umkm.details.priceRange[0])} - ${formatCurrency(umkm.details.priceRange[1])}`
  : "Harga tidak tersedia"; // Or use formatCurrency(0) if you prefer
  // Line 66 Fix:
const paymentMethods = umkm.details.paymentMethods 
  ? umkm.details.paymentMethods.join(", ") 
  : "Tidak ada data pembayaran";

// Line 67 Fix:
const totalRatingAvg = umkm.reviewsList && umkm.reviewsList.length > 0
  ? umkm.reviewsList.reduce((acc, r) => acc + r.rating, 0) / umkm.reviewsList.length
  : 0; // Default to 0 if no reviews
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* ===== BAGIAN 1: HEADER & GALERI (HERO) ===== */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold">{umkm.name}</h1>
        <div className="flex flex-wrap items-center text-lg mt-2 gap-x-4 gap-y-1">
          {/* Kategori */}
          <span className="font-semibold text-indigo-600">
            {umkm.category} {umkm.subcategory && `· ${umkm.subcategory}`}
          </span>
          <span className="text-gray-500 hidden md:inline">|</span>
          {/* Rating */}
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="font-semibold">{umkm.rating}%</span>
            <span className="text-gray-600 ml-1">({umkm.reviews} ulasan)</span>
          </div>
          {/* Lokasi */}
          <div className="flex items-center">
            <MapPinIcon className="w-5 h-5 text-gray-600 mr-1.5" />
            <span className="text-gray-700 underline cursor-pointer hover:text-indigo-600">
              {umkm.location}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Foto */}
      <PhotoGrid images={umkm.images} />

      {/* ===== BAGIAN 2: KONTEN UTAMA (2 KOLOM) ===== */}
      <div className="flex flex-col lg:flex-row justify-between mt-10 gap-12">
        
        {/* --- KOLOM KIRI: DETAIL UTAMA --- */}
        <div className="w-full lg:w-3/5">
          
          {/* 3. Deskripsi Usaha */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">
              Tentang {umkm.name}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {isDescExpanded ? umkm.description : shortDescription}
            </p>
            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="font-semibold text-indigo-600 hover:text-indigo-800 mt-2 flex items-center"
            >
              {isDescExpanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
              {isDescExpanded ? (
                <ChevronUpIcon className="w-5 h-5 ml-1" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-1" />
              )}
            </button>
          </section>

          <hr className="my-8" />

          {/* 2. Informasi Singkat (Detail) */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Detail Tempat</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CurrencyDollarIcon className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Rentang Harga</span>
                  <p className="text-gray-600">{priceRange}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCardIcon className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Metode Pembayaran</span>
                  <p className="text-gray-600">{paymentMethods}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">✨</span>
                <div>
                  <span className="font-semibold">Fasilitas</span>
                  <p className="text-gray-600">
                    {umkm.details.facilities.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-8" />

          {/* 5. Lokasi di Peta */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Lokasi di Peta</h2>
            <div className="h-96 w-full rounded-lg overflow-hidden border">
              <Map
                initialViewState={{
                  longitude: umkm.longitude,
                  latitude: umkm.latitude,
                  zoom: 18,
                }}
                mapStyle="https://tiles.openfreemap.org/styles/liberty"
                className="map-container"
              >
                <NavigationControl position="top-right" />
                <Marker
                  longitude={umkm.longitude}
                  latitude={umkm.latitude}
                  anchor="bottom"
                >
                  <span className="text-3xl">🛍️</span>
                </Marker>
              </Map>
            </div>
          </section>

          <hr className="my-8" />

          {/* 6. Ulasan Pelanggan */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Ulasan Pelanggan
            </h2>
            {/* Ringkasan Ulasan */}
            <div className="flex items-center mb-6">
              <StarRating rating={Math.round(totalRatingAvg)} />
              <span className="font-bold text-lg ml-2">
                {totalRatingAvg.toFixed(1)} dari 5
              </span>
              <span className="text-gray-600 ml-2">
                · {umkm.reviews} total ulasan
              </span>
            </div>
            
            {/* Daftar Ulasan */}
            <div className="space-y-6">
              {umkm.reviewsList && umkm.reviewsList.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-gray-700 mt-2">{review.text}</p>
                </div>
              ))}
            </div>
            {/* Tombol Tulis Ulasan */}
            <button className="mt-6 px-4 py-2 border border-gray-800 rounded-lg font-semibold hover:bg-gray-100">
              Tulis Ulasan Anda
            </button>
          </section>

        </div>

        {/* --- KOLOM KANAN: KONTAK & PEMILIK (SIDEBAR) --- */}
        <div className="w-full lg:w-2/5">
          <div className="sticky top-24 p-6 bg-white border rounded-lg shadow-lg">
            
            {/* Tombol Aksi */}
            <div className="space-y-3">
              <a
                href={`tel:${umkm.phone}`}
                className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Hubungi Sekarang
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${umkm.latitude},${umkm.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-800 rounded-lg font-semibold hover:bg-gray-100"
              >
                <MapPinIcon className="w-5 h-5 mr-2" />
                Arahkan ke Sini
              </a>
            </div>

            {/* 7. Informasi Pemilik */}
            {umkm.owner && (
              <>
                <hr className="my-6" />
                <h3 className="text-lg font-semibold mb-3">
                  Informasi Pemilik
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="font-semibold">{umkm.owner.name}</p>
                    <p className="text-sm text-gray-500">
                      Bergabung {umkm.owner.joined}
                    </p>
                  </div>
                </div>
                {umkm.owner.verified && (
                  <div className="flex items-center text-green-600 mt-3">
                    <CheckBadgeIcon className="w-5 h-5 mr-1" />
                    <span className="font-semibold text-sm">
                      Pemilik Terverifikasi
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Terakhir Diperbarui */}
            {umkm.lastUpdated && (
              <div className="flex items-center text-sm text-gray-500 mt-6">
                <ClockIcon className="w-4 h-4 mr-1.5" />
                Info diperbarui pada {umkm.lastUpdated}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}