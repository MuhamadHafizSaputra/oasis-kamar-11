// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Gunakan warna yang lebih kontras seperti yang Anda minta */}
          <Link to="/" className="text-2xl font-bold text-[#DA9A3D]" onClick={closeMenu}>
            SedulurKita
          </Link>

          {/* Tautan Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/list"
              className="text-gray-600 hover:text-[#FFCA8E]"
            >
              Cari UMKM
            </Link>
            
            {/* --- MODIFIKASI DI SINI --- */}
            <Link
              to="/about" // Ganti dari <a> ke <Link>
              className="text-gray-600 hover:text-[#FFCA8E]"
            >
              Tentang Kami
            </Link>
            {/* --- AKHIR MODIFIKASI --- */}

            <a
              href="#"
              className="px-4 py-2 bg-[#FFCA8E] text-white rounded-full hover:bg-[#fcc07e]"
            >
              Login
            </a>
          </div>

          {/* Tombol Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Menu Mobile (Dropdown) */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pb-3 pt-2 space-y-1 bg-white border-t border-gray-200">
          <Link
            to="/list"
            className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-[#FFCA8E] hover:bg-gray-50"
            onClick={closeMenu}
          >
            Cari UMKM
          </Link>

          {/* --- MODIFIKASI DI SINI --- */}
          <Link
            to="/about" // Ganti dari <a> ke <Link>
            className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-[#FFCA8E] hover:bg-gray-50"
            onClick={closeMenu}
          >
            Tentang Kami
          </Link>
          {/* --- AKHIR MODIFIKASI --- */}

          <a
            href="#"
            className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-[#FFCA8E] hover:bg-gray-50"
            onClick={closeMenu}
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}