// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ListPage from "./pages/ListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx"; 
import RegisterPage from "./pages/RegisterPage.jsx"; 
import AccountProfilePage from "./pages/AccountProfilePage.jsx";
// 1. IMPOR HALAMAN BARU
import LivePage from "./pages/LivePage.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/umkm/:id" element={<ProfilePage />} />
        {/* 2. TAMBAHKAN ROUTE BARU */}
        <Route path="/live/:id" element={<LivePage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;