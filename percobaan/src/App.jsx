// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ListPage from "./pages/ListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutPage from "./pages/AboutPage.jsx"; // 1. Impor halaman baru
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        
        {/* Rute dinamis untuk profil. 
          Misal: /umkm/1
        */}
        <Route path="/about" element={<AboutPage />} /> {/* 2. Tambahkan rute baru */}
        <Route path="/umkm/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;