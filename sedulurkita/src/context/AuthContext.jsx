import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Tentukan URL dasar API Anda
// KESALAHAN 1 DIPERBAIKI:
// Port 5173/5731 adalah port FRONTEND Anda.
// API_URL harus menunjuk ke port BACKEND Anda (yaitu 3001 dari server.js Anda)
const API_URL = 'http://localhost:3001/api/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true); // State untuk loading awal

  // 2. Cek local storage saat aplikasi dimuat
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // 3. Verifikasi token ke backend untuk mendapatkan data user
      // KESALAHAN 2 DIPERBAIKI:
      // Ganti URL hardcode Vercel dengan API_URL lokal
      axios.get(`${API_URL}/me`) // Menggunakan /me dari routes/auth.js
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          // Token tidak valid/expire
          localStorage.removeItem('token');
          setToken(null);
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  // 4. Fungsi untuk LOGIN
  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;
    
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  };

  // 5. Fungsi untuk REGISTER
  const register = async (name, email, password) => {
    // URL ini sekarang sudah benar menunjuk ke http://localhost:3001/api/auth/register
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  };

  // 6. Fungsi untuk LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading, // Tambahkan loading
    isAuthenticated: !!token,
  };

  // Jangan render app sebelum selesai verifikasi token
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};