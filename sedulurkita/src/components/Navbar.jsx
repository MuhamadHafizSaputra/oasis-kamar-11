// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext.jsx"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth(); 
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* --- BAGIAN LOGO DIPERBARUI --- */}
          {/* The text span is removed, leaving only the image inside the Link */}
          <Link to="/" className="flex items-center group" onClick={closeMenu}>
            <img 
              src="/images/LogoSedulurKita.png" 
              alt="Logo SedulurKita" 
              className="h-10 w-auto object-contain" 
            />
            {/* The <span> tag with "SedulurKita" text has been removed */}
          </Link>
          {/* --- AKHIR BAGIAN LOGO --- */}

          {/* Tautan Navigasi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/list"
              className="text-gray-600 hover:text-[#FFCA8E]"
            >
              Cari UMKM
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-[#FFCA8E]"
            >
              Tentang Kami
            </Link>

            {/* Logika Tampilan Login/Logout */}
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-gray-700 hover:text-[#DA9A3D] font-medium">
                  Hi, {user?.name || 'Pengguna'}!
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-[#FFCA8E] text-white rounded-full hover:bg-[#fcc07e]"
              >
                Login
              </Link>
            )}
            
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
          <Link
            to="/about"
            className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-[#FFCA8E] hover:bg-gray-50"
            onClick={closeMenu}
          >
            Tentang Kami
          </Link>
          
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-[#FFCA8E] hover:bg-gray-50"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-[#FFCA8E] hover:bg-gray-50"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
}