// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid";
import axios from "axios";

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
  
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/umkm/${id}`)
      .then(response => {
        // --- PERBAIKAN DATA DARI API ---
        // Pastikan semua data JSON di-parse dengan benar
        const data = response.data;
        const parsedUmkm = {
          ...data,
          images: Array.isArray(data.images) ? data.images : JSON.parse(data.images || '[]'),
          paymentMethods: Array.isArray(data.payment_methods) ? data.payment_methods : JSON.parse(data.payment_methods || '[]'),
          owner: typeof data.owner === 'object' ? data.owner : JSON.parse(data.owner || '{}'),
          details: typeof data.details === 'object' ? data.details : JSON.parse(data.details || '{}'),
          reviewsList: Array.isArray(data.reviewsList) ? data.reviewsList : [],
          priceRange: [data.price_min, data.price_max] // Ambil dari kolom baru
        };
        setUmkm(parsedUmkm);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching UMKM data:", err);
        setError("Error fetching data.");
        setLoading(false);
      });
  }, [id]);

  // 1. Tampilkan status Loading
  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  // 2. Tampilkan status Error
  if (error || !umkm) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-10 text-center">
        <h1 className="text-4xl font-bold">UMKM tidak ditemukan</h1>
        <p className="text-xl text-gray-600 mt-4">
          Maaf, data untuk UMKM dengan ID {id} tidak ada.
        </p>
      </div>
    );
  }

  // --- PERBAIKAN UTAMA: PINDAHKAN INI KE BAWAH ---
  // 3. Deklarasikan variabel SETELAH data dipastikan ada
  const shortDescription = umkm.description.substring(0, 200) + "...";
  
  const priceRangeText = (umkm.priceRange && umkm.priceRange[0] && umkm.priceRange[1])
    ? `${formatCurrency(umkm.priceRange[0])} - ${formatCurrency(umkm.priceRange[1])}`
    : "Harga tidak tersedia";

  const paymentMethodsText = (umkm.paymentMethods && umkm.paymentMethods.length > 0)
    ? umkm.paymentMethods.join(", ") 
    : "Tidak ada data pembayaran";

  const facilitiesText = (umkm.details.facilities && umkm.details.facilities.length > 0)
    ? umkm.details.facilities.join(", ")
    : "Tidak ada data fasilitas";

  const totalRatingAvg = umkm.reviewsList.length > 0
    ? umkm.reviewsList.reduce((acc, r) => acc + r.rating, 0) / umkm.reviewsList.length
    : 0;
  // --- AKHIR PERBAIKAN ---

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* ===== BAGIAN 1: HEADER & GALERI (HERO) ===== */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold">{umkm.name}</h1>
        <div className="flex flex-wrap items-center text-lg mt-2 gap-x-4 gap-y-1">
          <span className="font-semibold text-indigo-600">
            {umkm.category} {umkm.subcategory && `· ${umkm.subcategory}`}
          </span>
          <span className="text-gray-500 hidden md:inline">|</span>
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="font-semibold">{umkm.rating}%</span>
            <span className="text-gray-600 ml-1">({umkm.reviews} ulasan)</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-5 h-5 text-gray-600 mr-1.5" />
            <span className="text-gray-700 underline cursor-pointer hover:text-indigo-600">
              {umkm.location}
            </span>
          </div>
        </div>
      </div>

      <PhotoGrid images={umkm.images} />

      {/* ===== BAGIAN 2: KONTEN UTAMA (2 KOLOM) ===== */}
      <div className="flex flex-col lg:flex-row justify-between mt-10 gap-12">
        
        {/* --- KOLOM KIRI: DETAIL UTAMA --- */}
        <div className="w-full lg:w-3/5">
          
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

          <section>
            <h2 className="text-2xl font-semibold mb-4">Detail Tempat</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CurrencyDollarIcon className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Rentang Harga</span>
                  <p className="text-gray-600">{priceRangeText}</p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCardIcon className="w-6 h-6 mr-3 text-gray-700 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Metode Pembayaran</span>
                  <p className="text-gray-600">{paymentMethodsText}</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3">✨</span>
                <div>
                  <span className="font-semibold">Fasilitas</span>
                  <p className="text-gray-600">{facilitiesText}</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="my-8" />

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

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Ulasan Pelanggan
            </h2>
            <div className="flex items-center mb-6">
              <StarRating rating={Math.round(totalRatingAvg)} />
              <span className="font-bold text-lg ml-2">
                {totalRatingAvg.toFixed(1)} dari 5
              </span>
              <span className="text-gray-600 ml-2">
                · {umkm.reviewsList.length} total ulasan
              </span>
            </div>
            
            <div className="space-y-6">
              {umkm.reviewsList.map((review) => (
                <div key={review.review_id || review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                      {(review.user_name || '?').charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{review.user_name || 'Anonymous'}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("id-ID")}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-gray-700 mt-2">{review.text}</p>
                </div>
              ))}
            </div>
            <button className="mt-6 px-4 py-2 border border-gray-800 rounded-lg font-semibold hover:bg-gray-100">
              Tulis Ulasan Anda
            </button>
          </section>
        </div>

        {/* --- KOLOM KANAN: KONTAK & PEMILIK (SIDEBAR) --- */}
        <div className="w-full lg:w-2/5">
          <div className="sticky top-24 p-6 bg-white border rounded-lg shadow-lg">
            
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
                      Bergabung {new Date(umkm.owner.joined).toLocaleDateString("id-ID")}
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

            {umkm.last_updated && (
              <div className="flex items-center text-sm text-gray-500 mt-6">
                <ClockIcon className="w-4 h-4 mr-1.5" />
                Info diperbarui pada {new Date(umkm.last_updated).toLocaleDateString("id-ID")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}