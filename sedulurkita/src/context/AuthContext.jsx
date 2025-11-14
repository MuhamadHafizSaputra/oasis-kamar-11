// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// --- PERBAIKAN URL API ---
// Gunakan URL backend yang sama dengan yang ada di HomePage/ProfilePage
// Jangan gunakan localhost kecuali Anda menjalankan server backend sendiri di port 3001
const API_URL = 'https://sedulurkita-api.vercel.app/api/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Set header global agar setiap request membawa token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      axios.get(`${API_URL}/me`)
        .then(response => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Gagal verifikasi token:", error);
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

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token, user } = response.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return response.data;
    } catch (error) {
      // Lempar error agar bisa ditangkap di LoginPage
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      return response.data;
    } catch (error) {
      // Lempar error agar bisa ditangkap di RegisterPage
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = async (formData) => {
    try {
      const response = await axios.put(`${API_URL}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = response.data.user;
      setUser(updatedUser);
      return { success: true, message: 'Profil berhasil diperbarui!' };
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};