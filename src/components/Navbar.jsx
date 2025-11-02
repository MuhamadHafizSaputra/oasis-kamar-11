// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SedulurKita
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/list"
              className="text-gray-600 hover:text-indigo-600"
            >
              Cari UMKM
            </Link>
            <a href="#" className="text-gray-600 hover:text-indigo-600">
              Tentang Kami
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}