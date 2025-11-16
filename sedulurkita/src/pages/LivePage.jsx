// src/pages/LivePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { 
  PaperAirplaneIcon, 
  HeartIcon, 
  ShoppingBagIcon,
  UserCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";
import { umkmData } from "../data/mockData"; // Pastikan path ini sesuai

// Mock pesan chat awal
const INITIAL_CHAT = [
  { id: 1, user: "Siti Aminah", text: "Wah, prosesnya teliti banget ya bu 😍" },
  { id: 2, user: "Budi Santoso", text: "Ini tahan berapa lama warnanya?" },
  { id: 3, user: "Rina M", text: "Sudah saya checkout ya kak!" },
  { id: 4, user: "Anda", text: "Terima kasih atas pertanyaannya, Budi! Warnanya tahan hingga 6 bulan dengan perawatan yang tepat. Untuk Live videonya belum ada ya kak.", isMe: true },
];

export default function LivePage() {
  const { id } = useParams();
  const [umkm, setUmkm] = useState(null);
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [newMessage, setNewMessage] = useState("");
  const [isLoved, setIsLoved] = useState(false);
  const chatEndRef = useRef(null);
  // Logika judul dinamis
  const title = umkm ? `LIVE: ${umkm.name}` : "Nonton Live - SedulurKita";
  useDocumentTitle(title);

  // Cari data UMKM berdasarkan ID
  useEffect(() => {
    // Kita cari dari mockData (karena di real app mungkin fetch API)
    const found = umkmData.find((u) => u.id === parseInt(id));
    setUmkm(found);
  }, [id]);

  // Auto scroll chat ke bawah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: "Anda", // Ceritanya user yang sedang login
      text: newMessage,
      isMe: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  if (!umkm) return <div className="text-center py-20">Memuat Live...</div>;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* --- KOLOM KIRI: VIDEO PLAYER --- */}
      <div className="flex-1 relative flex flex-col">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/70 to-transparent flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </Link>
            <div className="bg-red-600 px-3 py-1 rounded text-xs font-bold animate-pulse">
              LIVE
            </div>
            <div>
              <h1 className="font-bold text-lg text-shadow">{umkm.name}</h1>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <UserCircleIcon className="w-3 h-3" /> {umkm.subcategory}
              </p>
            </div>
          </div>
          <div className="bg-black/40 px-3 py-1 rounded-full text-xs font-medium">
            👀 1.2k Penonton
          </div>
        </div>

        {/* Video Placeholder (Iframe Youtube / Video Tag) */}
        <div className="flex-1 bg-black flex items-center justify-center relative group">
           {/* Gambar sebagai placeholder video jika tidak ada URL video asli */}
           <img 
             src={umkm.images[0]} 
             alt="Live preview" 
             className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
           />
           <div className="z-10 text-center p-8 bg-black/50 rounded-xl backdrop-blur-sm border border-white/10">
             <h3 className="text-2xl font-bold mb-2">Live Streaming Demo</h3>
             <p className="text-gray-300">
               (Video Player akan muncul di sini)
             </p>
             <button className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
               ▶ Putar
             </button>
           </div>
        </div>

        {/* Featured Product (Overlay di Bawah Video) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent lg:hidden">
           {/* Versi Mobile: Produk muncul di atas chat nanti, atau di sini */}
        </div>
      </div>

      {/* --- KOLOM KANAN: CHAT & PRODUK (Sidebar) --- */}
      <div className="lg:w-96 bg-white text-gray-900 flex flex-col h-[40vh] lg:h-auto border-l border-gray-200 relative z-20 rounded-t-2xl lg:rounded-none shadow-2xl lg:shadow-none translate-y-0 transition-transform">
        
        {/* Tab Produk Unggulan */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
              <img 
                src={umkm.images[1] || umkm.images[0]} 
                alt="Produk" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-gray-800">Paket {umkm.subcategory}</p>
              <p className="text-[#DA9A3D] font-bold text-sm">
                Rp {new Intl.NumberFormat('id-ID').format(umkm.priceFrom)}
              </p>
            </div>
            <button className="bg-[#DA9A3D] text-white p-2 rounded-lg hover:bg-[#b88230]">
              <ShoppingBagIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Area Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
              {!msg.isMe && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                  {msg.user.charAt(0)}
                </div>
              )}
              <div className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${
                msg.isMe 
                  ? 'bg-[#DA9A3D] text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {!msg.isMe && <p className="text-xs font-bold text-gray-500 mb-0.5">{msg.user}</p>}
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Chat */}
        <div className="p-3 border-t border-gray-100 bg-white">
          {/* Floating Reaction Buttons */}
          <div className="absolute bottom-20 right-4 flex flex-col gap-2 pointer-events-none">
             <div className={`pointer-events-auto p-2 rounded-full shadow-lg cursor-pointer transition-all transform hover:scale-110 ${isLoved ? 'bg-pink-100 text-pink-600' : 'bg-white text-gray-400'}`} onClick={() => setIsLoved(!isLoved)}>
                <HeartIcon className={`w-6 h-6 ${isLoved ? 'fill-current' : ''}`} />
             </div>
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tulis komentar..."
              className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#DA9A3D] text-sm"
            />
            <button 
              type="submit"
              className="bg-[#DA9A3D] text-white p-2 rounded-full hover:bg-[#b88230] transition-colors disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}