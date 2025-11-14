// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Map, Marker, NavigationControl } from "@vis.gl/react-maplibre";
import { StarIcon } from "@heroicons/react/24/solid"; 
import LazyImage from "../components/LazyImage"; 
import VideoFacade from "../components/VideoFacade"; 
import { getOptimizedImageUrl } from "../lib/imageUtils"; 

// Import the custom hooks
import { useCountUp } from "../hooks/useCountUp.js";
import { useScrollAnimate } from "../hooks/useScrollAnimate.js";

// Helper untuk format Rupiah
const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

// Helper for tags
const tagDisplayNames = {
  fully_handmade: "100% Fully Handmade",
  hand_woven: "Hand-Woven",
  hand_carved: "Hand-Carved",
  natural_dyes: "Uses Natural Dyes",
  small_batch: "Small-Batch Production",
  locally_sourced: "Locally Sourced Materials",
  female_founded: "Female-Founded",
  artisan_coop: "Artisan Co-op",
  family_owned: "Family-Owned Business",
  social_enterprise: "Social Enterprise",
  rural_community: "Rural Community",
  empowers_women: "Empowers Women",
  empowers_disabled: "Empowers Disabled Persons",
  eco_friendly: "Eco-Friendly Materials",
  preserves_cultural_heritage: "Preserves Cultural Heritage",
  fair_trade: "Fair Trade Certified",
  community_empowerment: "Community Empowerment",
  made_to_order: "Made-to-Order",
  personalizable: "Personalizable",
  custom_orders: "Accepts Custom Orders",
};

const getTagDisplayName = (tag) => tagDisplayNames[tag] || tag;

export default function ProfilePage() {
  const { id } = useParams();
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize the scroll-animation hook
  const addScrollAnimateRef = useScrollAnimate();

  useEffect(() => {
    axios
      .get(`https://sedulurkita-api.vercel.app/api/umkm/${id}`)
      .then((response) => {
        const data = response.data;
        const parsedUmkm = {
          ...data,
          images: Array.isArray(data.images)
            ? data.images
            : JSON.parse(data.images || "[]"),
          paymentMethods: Array.isArray(data.payment_methods)
            ? data.payment_methods
            : JSON.parse(data.payment_methods || "[]"),
          owner:
            typeof data.owner === "object"
              ? data.owner
              : JSON.parse(data.owner || "{}"),
          details:
            typeof data.details === "object"
              ? data.details
              : JSON.parse(data.details || "{}"),
          reviewsList: Array.isArray(data.reviewsList) ? data.reviewsList : [],
          priceRange: [data.price_min, data.price_max],
          tags: Array.isArray(data.tags)
            ? data.tags
            : JSON.parse(data.tags || "[]"),
          
          video_url: data.video_url || null, 
          products: Array.isArray(data.products) ? data.products : [],
        };
        setUmkm(parsedUmkm);
        setLoading(false);
      })
      .catch((err) => { 
        console.error("Error fetching UMKM data:", err);
        setError("Error fetching data.");
        setLoading(false);
      });
  }, [id]);

  // --- Initialize count-up hook *after* data is loaded ---
  // (Mengaktifkan kembali reviewsRef)
  const reviewsRef = useCountUp(umkm ? umkm.reviews : 0, "+"); 
  const tagsRef = useCountUp(umkm ? umkm.tags.length : 0, "+");
  const artisansRef = useCountUp(umkm ? (umkm.reviews > 20 ? Math.floor(umkm.reviews / 5) : 5) : 0, "+");


  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

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
  
  const heroDescription = umkm.description.length > 150
    ? umkm.description.substring(0, 150) + "..."
    : umkm.description;

  const commitmentTags = umkm.tags.filter(tag => 
    tag.startsWith("fully_") || tag.startsWith("hand_") || tag.startsWith("locally_") || tag.startsWith("natural_") || tag.startsWith("small_") || tag.startsWith("eco_") || tag.startsWith("preserves_")
  );

  const badgeTags = umkm.tags.filter(tag =>
    tag.startsWith("female_") || tag.startsWith("artisan_") || tag.startsWith("family_") || tag.startsWith("social_") || tag.startsWith("rural_") || tag.startsWith("empowers_") || tag.startsWith("fair_") || tag.startsWith("community_")
  );

  let makerTitle = "Meet The Maker";
  if (umkm.category === "Makanan") {
    makerTitle = "Meet The Chef";
  } else if (umkm.category === "Jasa") {
    makerTitle = "Meet The Founders";
  }

  let collectionTitle = "Produk Unggulan Kami"; 
  if (umkm.category === "Jasa") {
    collectionTitle = "Paket Layanan Kami";
  } else if (umkm.category === "Makanan") {
    collectionTitle = "Menu Unggulan Kami";
  }

  // --- LOGIKA RATING 0-10 ---
  const rawRating = umkm.rating || 0;
  const displayRating = (rawRating / 10).toString().replace('.', ',');

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
        {/* ... (Tidak ada perubahan di sini) ... */}
        <div className="absolute inset-0">
          <img
            src={getOptimizedImageUrl(umkm.images[0], 1200)} 
            alt={`${umkm.name} hero image`}
            className="w-full h-full object-cover animate-fadeInScale"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4 animate-fadeInSlideUp">
            {umkm.name}
          </h1>
          
          <p
            className="text-xl md:text-2xl font-light max-w-2xl animate-fadeInSlideUp"
            style={{ animationDelay: "0.1s" }}
          >
            {umkm.subcategory || heroDescription}
          </p>
          <a
            href="#maker"
            className="mt-8 px-8 py-3 bg-[#9c724b] text-white rounded-full text-lg font-semibold hover:bg-[#8c6644] transition-all duration-300 transform hover:scale-105 animate-fadeInSlideUp"
            style={{ animationDelay: "0.2s" }}
          >
            Pelajari Cerita Kami
          </a>
        </div>
      </section>

      {/* Meet the Maker Section */}
      <section id="maker" className="py-20 bg-white">
        {/* ... (Tidak ada perubahan di sini) ... */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 h-[400px]" ref={addScrollAnimateRef}> 
               <LazyImage 
                 src={umkm.images[1]} 
                 alt={`Pemilik ${umkm.name}`}
                 className="rounded-lg shadow-xl h-full w-full"
                 width={600} 
               />
            </div>
            <div className="md:w-1/2" ref={addScrollAnimateRef}>
              <h2 className="text-sm font-semibold uppercase text-[#9c724b] tracking-widest">
                {makerTitle}
              </h2>
              <h3 className="text-4xl font-bold font-serif text-[#473524] mt-2 mb-6">
                {umkm.owner.name}
              </h3>
              <div className="space-y-4 text-lg text-[#59412c] leading-relaxed">
                <p ref={addScrollAnimateRef}>
                  {umkm.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Product Section */}
      <section className="py-20 bg-[#f8f5f2]">
        {/* ... (Tidak ada perubahan di sini) ... */}
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16" ref={addScrollAnimateRef}>
            <h2 className="text-sm font-semibold uppercase text-[#9c724b] tracking-widest">
              Behind the Product
            </h2>
            <h3 className="text-4xl font-bold font-serif text-[#473524] mt-2">
              Proses Kami
            </h3>
            <p className="text-lg text-[#59412c] mt-4 leading-relaxed">
              Ini bukan pabrik. Ini adalah studio. Lihat keahlian, kesabaran, dan warisan yang ada di setiap item.
            </p>
          </div>

          {umkm.video_url && (
              <div className="mb-16" ref={addScrollAnimateRef}>
                <div className="w-full max-w-4xl mx-auto aspect-video rounded-lg shadow-xl overflow-hidden border-2 border-transparent hover:border-[#9c724b] transition-colors duration-300">
                  <VideoFacade videoUrl={umkm.video_url} />
                </div>
              </div>
            )}

          <h4 className="text-2xl font-serif font-bold text-center mb-8 text-[#473524]" ref={addScrollAnimateRef}>
            Dari Bahan Menjadi Harta Karun
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group" ref={addScrollAnimateRef}>
              <img
                src={umkm.images[2] || "https://images.unsplash.com/photo-1594911768684-96142750a7c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                alt="Proses 1"
                className="rounded-lg shadow-lg w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-center font-semibold text-lg mt-4">
                1. Pemilihan Bahan Baku
              </p>
            </div>
            <div className="group" ref={addScrollAnimateRef}>
              <img
                src={umkm.images[3] || "https://images.unsplash.com/photo-1541480099952-b6a6c4e0b02f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                alt="Proses 2"
                className="rounded-lg shadow-lg w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-center font-semibold text-lg mt-4">
                2. Proses Pengerjaan Tangan
              </p>
            </div>
            <div className="group" ref={addScrollAnimateRef}>
              <img
                src={umkm.images[4] || "https://images.unsplash.com/photo-1588665714856-5471f4503723?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                alt="Proses 3"
                className="rounded-lg shadow-lg w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-center font-semibold text-lg mt-4">
                3. Finishing & Pewarnaan Alami
              </p>
            </div>
          </div>

          {commitmentTags.length > 0 && (
            <div className="max-w-2xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg" ref={addScrollAnimateRef}>
              <h4 className="text-2xl font-serif font-bold mb-6 text-[#473524]">
                Komitmen Kami
              </h4>
              <ul className="space-y-4">
                {commitmentTags.map((tag) => (
                  <li key={tag} className="flex items-center gap-4 group">
                    <svg
                      className="w-6 h-6 text-green-600 flex-shrink-0 transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-lg text-[#59412c]">
                      <b>{getTagDisplayName(tag)}</b>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16" ref={addScrollAnimateRef}>
            <h2 className="text-sm font-semibold uppercase text-[#9c724b] tracking-widest">
              Dampak Komunitas
            </h2>
            <h3 className="text-4xl font-bold font-serif text-[#473524] mt-2">
              Pembelian dengan Tujuan
            </h3>
            <p className="text-lg text-[#59412c] mt-4 leading-relaxed">
              Dukungan Anda adalah investasi sosial. Lihat dampak nyata yang kita buat bersama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            
            {/* --- BLOK 1: TOTAL ULASAN (DIKEMBALIKAN) --- */}
            <div ref={addScrollAnimateRef}>
              <svg
                className="w-16 h-16 text-[#9c724b] mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
              <h4 ref={reviewsRef} className="text-5xl font-bold text-[#715237]">
                {`0+`}
              </h4>
              <p className="text-xl font-semibold text-[#59412c] mt-2">
                Total Ulasan
              </p>
              <div className="w-24 h-2 bg-[#d8caba] rounded mx-auto mt-3 overflow-hidden">
                <div
                  className="h-full bg-[#9c724b]"
                  style={{ width: `${Math.min(umkm.reviews / 5, 100)}%` }} 
                ></div>
              </div>
              <p className="text-[#715237] mt-2">
                Menunjukkan kepuasan dan kepercayaan pelanggan.
              </p>
            </div>
            {/* --- AKHIR BLOK 1 --- */}
            
            {/* Stat 2: Tags */}
            <div ref={addScrollAnimateRef}>
              {/* ... (Tidak ada perubahan di sini) ... */}
              <svg 
                className="w-16 h-16 text-[#9c724b] mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5l5.414 5.414a2 2 0 010 2.828L12.828 16a2 2 0 01-2.828 0L5 11V5a2 2 0 012-2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l-2 2 5 5 2-2"></path>
              </svg>
              <h4 ref={tagsRef} className="text-5xl font-bold text-[#715237]">
                {`0+`}
              </h4>
              <p className="text-xl font-semibold text-[#59412c] mt-2">
                Atribut Unik
              </p>
              <div className="w-24 h-2 bg-[#d8caba] rounded mx-auto mt-3 overflow-hidden">
                <div 
                  className="h-full bg-[#9c724b]" 
                  style={{ width: `${Math.min(umkm.tags.length * 10, 100)}%` }}
                ></div>
              </div>
              <p className="text-[#715237] mt-2">
                Fitur dan nilai yang membuat UMKM ini spesial.
              </p>
            </div>

            {/* Stat 3: Artisans (Example) */}
            <div ref={addScrollAnimateRef}>
              {/* ... (Tidak ada perubahan di sini) ... */}
              <svg
                className="w-16 h-16 text-[#9c724b] mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 18 0z"
                ></path>
              </svg>
              <h4 ref={artisansRef} className="text-5xl font-bold text-[#715237]">
                {`0+`}
              </h4>
              <p className="text-xl font-semibold text-[#59412c] mt-2">
                Perkiraan Tim
              </p>
              <div className="w-24 h-2 bg-[#d8caba] rounded mx-auto mt-3 overflow-hidden">
                <div 
                  className="h-full bg-[#9c724b]" 
                  style={{ width: `${Math.min(umkm.reviews / 2, 100)}%` }}
                ></div>
              </div>
              <p className="text-[#715237] mt-2">
                Perkiraan jumlah tim berdasarkan skala usaha.
              </p>
            </div>
          </div>

          {badgeTags.length > 0 && (
            <div className="mt-20 text-center" ref={addScrollAnimateRef}>
              {/* ... (Tidak ada perubahan di sini) ... */}
              <h4 className="text-xl font-serif font-bold mb-6 text-[#473524]">
                Tanda Kepercayaan Kami
              </h4>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                {badgeTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#ece6df] text-[#59412c] text-sm font-semibold rounded-full hover:bg-[#d8caba] transition-colors duration-200"
                  >
                    {getTagDisplayName(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* "Our Collection" Section */}
      {umkm.products && umkm.products.length > 0 && (
        <section id="collection" className="py-20 bg-white">
          {/* ... (Tidak ada perubahan di sini) ... */}
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16" ref={addScrollAnimateRef}>
              <h2 className="text-sm font-semibold uppercase text-[#9c724b] tracking-widest">
                {collectionTitle}
              </h2>
              <h3 className="text-4xl font-bold font-serif text-[#473524] mt-2">
                Bawa Pulang Sepotong Warisan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {umkm.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group"
                  ref={addScrollAnimateRef}
                >
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1567900000780-1634f1954f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <h5 className="text-xl font-semibold text-[#473524]">
                      {product.name}
                    </h5>
                    {product.description && (
                      <p className="text-[#715237] mt-1">{product.description}</p>
                    )}
                    <p className="text-lg font-bold text-[#59412c] mt-3">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-[#f8f5f2]">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-16" ref={addScrollAnimateRef}>
            <h2 className="text-sm font-semibold uppercase text-[#9c724b] tracking-widest">
              Kata Mereka
            </h2>
            <h3 className="text-4xl font-bold font-serif text-[#473524] mt-2">
              Ulasan Pelanggan
            </h3>
            <p className="text-lg text-[#59412c] mt-4 leading-relaxed">
              Apa kata mereka yang sudah merasakan produk dan layanan kami.
            </p>
          </div>

          {umkm.reviewsList && umkm.reviewsList.length > 0 ? (
            <>
              {/* --- RINGKASAN RATING DIPINDAH KE SINI --- */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-[#ece6df] max-w-5xl mx-auto mb-12" ref={addScrollAnimateRef}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                  {/* Skor Angka */}
                  <div className="text-center">
                    <h4 className="text-6xl font-bold text-[#715237]">
                      {displayRating}
                    </h4>
                    <p className="text-xl font-semibold text-[#59412c] mt-1">
                      / 10
                    </p>
                  </div>
                  {/* Bintang dan Progress Bar */}
                  <div className="flex-1 w-full md:w-auto">
                    <div className="flex items-center justify-center md:justify-start text-yellow-400">
                      {/* Bintang berdasarkan rating 0-100 (dikonversi ke 0-5) */}
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-8 w-8 ${i < Math.round(rawRating / 20) ? "text-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <div className="w-full h-2 bg-[#d8caba] rounded mt-3 overflow-hidden">
                      <div
                        className="h-full bg-[#9c724b]"
                        style={{ width: `${umkm.rating}%` }} // Menggunakan rating 0-100%
                      ></div>
                    </div>
                    <p className="text-[#715237] mt-2 text-center md:text-left">
                      Berdasarkan {umkm.reviews} ulasan pelanggan.
                    </p>
                  </div>
                </div>
              </div>
              {/* --- AKHIR RINGKASAN RATING --- */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {umkm.reviewsList.map((review) => (
                  <div key={review.id} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#ece6df]" ref={addScrollAnimateRef}>
                    {/* ... (isi kartu review tidak berubah) ... */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-full bg-[#d8caba] flex items-center justify-center text-[#59412c] font-bold text-xl">
                          {review.user.charAt(0)}
                      </div>
                      <div>
                          <p className="font-bold text-[#473524] text-lg">{review.user}</p>
                          <div className="flex text-yellow-500 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`} />
                            ))}
                          </div>
                      </div>
                      <span className="ml-auto text-sm text-[#9c724b] font-medium bg-[#f8f5f2] px-3 py-1 rounded-full">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-[#59412c] italic text-lg leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
             <div className="text-center py-12 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
                <p className="text-gray-500 italic">Belum ada ulasan untuk UMKM ini.</p>
             </div>
          )}
        </div>
      </section>

      {/* Visit Us Section - DYNAMIC MAP */}
      <section id="visit-us" className="py-20 bg-white">
        {/* ... (Tidak ada perubahan di sini) ... */}
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-8" ref={addScrollAnimateRef}>
            <h2 className="text-sm font-semibold uppercase text-[#9c724b] tracking-widest">
              Kunjungi Kami
            </h2>
            <h3 className="text-4xl font-bold font-serif text-[#473524] mt-2">
              Lokasi Kami
            </h3>
            <p className="text-lg text-[#59412c] mt-4 leading-relaxed">
              Kami berlokasi di {umkm.location}.
            </p>
          </div>
          <div
            className="w-full h-[450px] rounded-lg shadow-xl overflow-hidden"
            ref={addScrollAnimateRef}
          >
            <Map
              initialViewState={{
                longitude: umkm.longitude,
                latitude: umkm.latitude,
                zoom: 16,
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
                <span className="text-3xl">📍</span>
              </Marker>
            </Map>
          </div>
        </div>
      </section>
    </main>
  );
}