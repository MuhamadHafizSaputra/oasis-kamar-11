// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

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
        <Route path="/umkm/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;