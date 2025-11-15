// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';

import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  Globe2, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube 
} from 'lucide-react';

import SearchBar from '../components/SearchBar.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function HomePage() {
  // Panggil hook di dalam komponen, sebelum return
  useDocumentTitle("SedulurKita - Temukan Cerita di Balik Produk");
  const [heroImage, setHeroImage] = useState(null); 
  const [heroImageAlt, setHeroImageAlt] = useState("Memuat gambar..."); 

  // --- LOGIKA DRAG TO SCROLL (SMOOTH + INERTIA) ---
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velX, setVelX] = useState(0); 
  const momentumID = useRef(null);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    cancelAnimationFrame(momentumID.current);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    beginMomentumTracking();
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    const prevScrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setVelX(scrollRef.current.scrollLeft - prevScrollLeft);
  };

  const beginMomentumTracking = () => {
    cancelAnimationFrame(momentumID.current);
    const scrollContainer = scrollRef.current;
    const friction = 0.95; 
    let currentVelX = velX;

    const momentumLoop = () => {
      if (Math.abs(currentVelX) > 0.5) { 
        scrollContainer.scrollLeft += currentVelX;
        currentVelX *= friction; 
        momentumID.current = requestAnimationFrame(momentumLoop);
      }
    };
    momentumLoop();
  };
  // --- LOGIKA SELESAI ---

  useEffect(() => {
      const umkmIdForHero = 1; 
      fetch(`https://sedulurkita-api.vercel.app/api/umkm/${umkmIdForHero}`)
        .then(response => {
          if (!response.ok) throw new Error('Respon jaringan tidak OK');
          return response.json();
        })
        .then(data => {
          // Data yang diterima adalah objek UMKM tunggal
          if (data) {
            let images = data.images;
            if (typeof images === 'string') images = JSON.parse(images || "[]");
            if (Array.isArray(images) && images.length > 0) {
              setHeroImage(images[4]); // Ambil gambar pertama
              setHeroImageAlt(data.name); // Gunakan nama UMKM sebagai alt text
            } else {
              // Fallback jika UMKM ini tidak punya gambar
              setHeroImageAlt("Gambar tidak tersedia untuk " + data.name);
              setHeroImage("https://images.unsplash.com/photo-1579546929518-e6b779f04177?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); // Default fallback image
            }
          } else {
            // Fallback jika UMKM tidak ditemukan
            setHeroImageAlt("UMKM tidak ditemukan.");
            setHeroImage("https://images.unsplash.com/photo-1579546929518-e6b779f04177?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); // Default fallback image
          }
        })
        .catch(error => {
          console.error("Error fetching hero image:", error);
          setHeroImageAlt("Gagal memuat gambar dari server.");
          // Default fallback image jika ada error fetching
          setHeroImage("https://images.unsplash.com/photo-1579546929518-e6b779f04177?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        });
    }, []);

  return (
    <div className="bg-white text-gray-900 antialiased">
      <main>
        {/* Hero Section */}
        <section className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
            <div className="max-w-3xl text-center md:text-left">
              
              {/* --- PERUBAHAN DI SINI --- */}
              <h1 
                className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 font-serif animate-fadeInSlideUp" // <-- DIUBAH
              >
                Beyond the Product.
                <br />
                <span className="text-[#DA9A3D]">Discover the Story.</span>
              </h1>
              
              {/* --- PERUBAHAN DI SINI --- */}
              <p 
                className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl animate-fadeInSlideUp" // <-- DIUBAH
                style={{ animationDelay: '0.1s' }} // Delay kecil agar muncul setelah judul
              >
                Direktori ini menghubungkan Anda dengan jantung Yogyakarta: para pembuat, pengrajin, dan wirausahawan yang menuangkan gairah mereka ke dalam setiap kreasi.
              </p>
              
              {/* --- PERUBAHAN DI SINI --- */}
              <div 
                className="mt-0 w-full max-w-xl animate-fadeInSlideUp" // <-- DIUBAH
                style={{ animationDelay: '0.2s' }} // Delay lagi
              >
                <SearchBar />
              </div>
              {/* --- AKHIR PERUBAHAN --- */}
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-full lg:w-1/2">
            {heroImage && (
              <img src={heroImage} alt={heroImageAlt} className="w-full h-full object-cover opacity-30 md:opacity-100" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 25% 100%)' }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent md:bg-gradient-to-r md:from-white md:via-white/60 md:to-transparent"></div>
          </div>
        </section>

        {/* Live Section (Ini sudah benar menggunakan animate-scroll-fade-up) */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 font-serif animate-scroll-fade-up" // <-- TETAP
              >
                Live dari Workshop
              </h2>
              <Link to="/list" className="flex items-center text-[#DA9A3D] font-medium hover:underline">
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div 
              ref={scrollRef}
              className={`flex space-x-6 pb-8 overflow-x-auto no-scrollbar touch-pan-x transition-all duration-75
                ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}
              `}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              
              {/* Kartu 1: Batik */}
              <div className="snap-center flex-shrink-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-scroll-fade-up">
                <div className="relative h-48">
                  {/* URL GAMBAR DIPERBARUI */}
                  <img 
                    src="https://batikgiriloyo.com/wp-content/uploads/2013/08/Ibu-Ibu-Giriloyo.jpg" 
                    alt="Live Batik Making" 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="p-5 select-none"> 
                  <h3 className="font-bold text-lg text-gray-900 truncate">Ibu Dian sedang membatik</h3>
                  <p className="text-sm text-gray-600 mt-1">Batik Tulis Asli</p>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    Laweyan, Surakarta
                  </div>
                  <Link 
                    to="/live/3" 
                    className="mt-4 block w-full text-center bg-indigo-100 text-indigo-700 font-medium py-2 rounded-lg hover:bg-indigo-200 transition-colors pointer-events-auto"
                  >
                    Tonton Live
                  </Link>
                </div>
              </div>

              {/* Kartu 2: Gudeg (Memasak) */}
              <div className="snap-center flex-shrink-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-scroll-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="relative h-48">
                  {/* URL GAMBAR DIPERBARUI */}
                  <img 
                    src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1637409292/wxbg9pdljaolcc8wtumd.jpg" 
                    alt="Live Cooking Gudeg" 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="p-5 select-none">
                  <h3 className="font-bold text-lg text-gray-900 truncate">Pak Budi memasak Gudeg</h3>
                  <p className="text-sm text-gray-600 mt-1">Warung Sido Mampir</p>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    Yogyakarta
                  </div>
                  <Link 
                    to="/live/1" 
                    className="mt-4 block w-full text-center bg-pink-100 text-pink-700 font-medium py-2 rounded-lg hover:bg-pink-200 transition-colors pointer-events-auto"
                  >
                    Tonton Live
                  </Link>
                </div>
              </div>

              {/* Kartu 3: Bakpia (GANTI KULIT KE BAKPIA) */}
              <div className="snap-center flex-shrink-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-scroll-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="relative h-48">
                  {/* Gambar Bakpia yang menggugah selera */}
                  <img 
                    src="https://www.gudeg.net/cni-content/uploads/modules/posts/20191003113408.JPG" 
                    alt="Live Pembuatan Bakpia" 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="p-5 select-none">
                  <h3 className="font-bold text-lg text-gray-900 truncate">Proses oven Bakpia panas</h3>
                  <p className="text-sm text-gray-600 mt-1">Bakpia Pathok 25</p>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    Pathuk, Yogyakarta
                  </div>
                  <Link 
                    to="/live/6" 
                    className="mt-4 block w-full text-center bg-green-100 text-green-700 font-medium py-2 rounded-lg hover:bg-green-200 transition-colors pointer-events-auto"
                  >
                    Tonton Live
                  </Link>
                </div>
              </div>

              {/* Kartu 4: Pasar (Event) */}
              <div className="snap-center flex-shrink-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-scroll-fade-up" style={{ animationDelay: '0.3s' }}>
                <div className="relative h-48">
                   {/* URL GAMBAR DIPERBARUI */}
                  <img 
                    src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Market Day" 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    EVENT
                  </span>
                </div>
                <div className="p-5 select-none">
                  <h3 className="font-bold text-lg text-gray-900 truncate">Pasar Mingguan Beringharjo</h3>
                  <p className="text-sm text-gray-600 mt-1">Pasar Tradisional</p>
                  <div className="flex items-center text-sm text-gray-500 mt-3">
                    <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    Malioboro, Yogyakarta
                  </div>
                  <Link 
                    to="/live/4" 
                    className="mt-4 block w-full text-center bg-amber-100 text-amber-700 font-medium py-2 rounded-lg hover:bg-amber-200 transition-colors pointer-events-auto"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
        
        <section id="makers" className="py-16 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div 
                className="rounded-lg overflow-hidden shadow-2xl animate-scroll-fade-up" // <-- TETAP
              >
                <img  
                  src="https://hassa.co.id/wp-content/uploads/2024/09/batik-tulis-4.webp"
                  alt="Portrait of Ibu Dian, a batik maker"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:-ml-8 animate-scroll-fade-up" // <-- TETAP
                   style={{ animationDelay: '0.1s' }}> 
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight">
                  Penjaga Soga Cokelat
                </h2>
                <p className="mt-6 text-xl text-gray-700 italic">
                  "Ini bukan sekadar kain. Ini adalah cerita nenek saya, jiwa desa saya, dan janji untuk masa depan. Setiap tetes lilin adalah doa."
                </p>
                <p className="mt-4 text-lg text-gray-800 font-semibold">
                  — Ibu Dian, Pembuat Batik Generasi ke-3
                </p>
                <p className="mt-4 text-gray-600">
                  Di sebuah desa kecil di Laweyan, Ibu Dian melanjutkan tradisi yang telah ada di keluarganya selama lebih dari satu abad. Ketika yang lain beralih ke metode cetak yang lebih cepat, ia dengan sabar menghabiskan 30 hari untuk satu lembar Tulis...
                </p>
                <Link to="/list?q=Batik" className="inline-block mt-8 bg-[#DA9A3D] text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
                  Baca Ceritanya
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Section (Ini sudah benar menggunakan animate-scroll-fade-up) */}
        <section id="explore" className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 font-serif mb-12 animate-scroll-fade-up" // <-- TETAP
            >
              Jelajahi Berdasarkan Cerita
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              
              <Link 
                to="/list?q=Kerajinan" 
                className="relative h-96 rounded-lg overflow-hidden shadow-xl group animate-scroll-fade-up" // <-- TETAP
              >
                <img src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/222/2024/09/27/WhatsApp-Image-2024-09-26-at-152944-1681658266.jpeg" alt="Handicrafts" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white font-serif">Pewaris Budaya</h3>
                  <p className="text-gray-200 mt-1">Barang kerajinan tangan otentik.</p>
                </div>
              </Link>
              
              <Link 
                to="/list?q=Makanan" 
                className="relative h-96 rounded-lg overflow-hidden shadow-xl group animate-scroll-fade-up" // <-- TETAP
                style={{ animationDelay: '0.1s' }}
              >
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80" alt="Food" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white font-serif">Rasa Lokal</h3>
                  <p className="text-gray-200 mt-1">Resep & rasa turun temurun.</p>
                </div>
              </Link>
              
              <Link 
                to="/list?q=Jasa" 
                className="relative h-96 rounded-lg overflow-hidden shadow-xl group animate-scroll-fade-up" // <-- TETAP
                style={{ animationDelay: '0.2s' }}
              >
                <img src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=500&q=80" alt="Services" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white font-serif">Pikiran Kreatif</h3>
                  <p className="text-gray-200 mt-1">Jasa modern & seni digital.</p>
                </div>
              </Link>
              
              <Link 
                to="/list?q=Belanja" 
                className="relative h-96 rounded-lg overflow-hidden shadow-xl group animate-scroll-fade-up" // <-- TETAP
                style={{ animationDelay: '0.3s' }}
              >
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80" alt="Groceries" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white font-serif">Produk Komunitas</h3>
                  <p className="text-gray-200 mt-1">Segar, lokal, dan terpercaya.</p>
                </div>
              </Link>
            </div>
          </div>
         </section>

        {/* Mission Section (Ini sudah benar menggunakan animate-scroll-fade-up) */}
        <section id="about" className="py-16 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#DA9A3D] font-serif animate-scroll-fade-up" // <-- TETAP
            >
              Lebih dari Direktori.
              <br />
              Ini adalah Gerakan.
            </h2>
            <p 
              className="mt-6 text-xl text-gray-700 leading-relaxed animate-scroll-fade-up" // <-- TETAP
              style={{ animationDelay: '0.1s' }}
            >
              Kami percaya bahwa setiap UMKM memiliki cerita yang layak untuk diceritakan. Kami di sini untuk menghubungkan Anda dengan orang-orang, semangat, dan kebanggaan di balik setiap produk. Saat Anda berbelanja dari direktori kami, Anda tidak only membeli barang—Anda mendukung mimpi dan melestarikan budaya.
            </p>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div 
                className="flex flex-col items-center animate-scroll-fade-up" // <-- TETAP
              >
                <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="mt-4 text-xl font-semibold text-gray-900">Pembuat Terverifikasi</h4>
                <p className="text-gray-600 mt-1">Setiap profil diperiksa oleh tim kami.</p>
              </div>
              <div 
                className="flex flex-col items-center animate-scroll-fade-up" // <-- TETAP
                style={{ animationDelay: '0.1s' }}
              >
                <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h4 className="mt-4 text-xl font-semibold text-gray-900">Koneksi Langsung</h4>
                <p className="text-gray-600 mt-1">Ngobrol dan bertransaksi secara langsung.</p>
              </div>
              <div 
                className="flex flex-col items-center animate-scroll-fade-up" // <-- TETAP
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-16 h-16 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center">
                  <Globe2 className="w-8 h-8" />
                </div>
                <h4 className="mt-4 text-xl font-semibold text-gray-900">Lestarikan Budaya</h4>
                <p className="text-gray-600 mt-1">Dukung masa depan warisan lokal.</p>
              </div>
            </div>
          </div>
         </section>
      </main>
       <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2">
                <span className="w-10 h-10 bg-[#DA9A3D] rounded-full flex items-center justify-center">
                  <span className="font-bold text-white text-lg">S</span>
                </span>
                <span className="font-bold text-2xl text-white">Sedulur<span className="text-[#DA9A3D]">Kita</span></span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-xs">
                Menghubungkan Anda dengan orang-orang dan semangat di balik produk lokal terbaik Yogyakarta.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-200 uppercase tracking-wider">Jelajahi</h5>
              <ul className="mt-4 space-y-3">
                <li><Link to="/list?q=Kerajinan" className="hover:text-white transition-colors">Kerajinan</Link></li>
                <li><Link to="/list?q=Makanan" className="hover:text-white transition-colors">Kuliner</Link></li>
                <li><Link to="/list?q=Jasa" className="hover:text-white transition-colors">Jasa</Link></li>
                <li><Link to="/list?q=Belanja" className="hover:text-white transition-colors">Belanja</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-200 uppercase tracking-wider">Tentang</h5>
              <ul className="mt-4 space-y-3">
                <li><Link to="/about" className="hover:text-white transition-colors">Misi Kami</Link></li>
                <li><Link to="/list" className="hover:text-white transition-colors">Cari UMKM</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-200 uppercase tracking-wider">Dukungan</h5>
              <ul className="mt-4 space-y-3">
                <li><Link to="/register" className="hover:text-white transition-colors">Gabung jadi Mitra</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; 2024 SedulurKita. Dibuat dengan ❤️ di Jogja.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}