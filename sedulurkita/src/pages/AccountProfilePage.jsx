// src/pages/AccountProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircleIcon, CameraIcon } from '@heroicons/react/24/solid';

export default function AccountProfilePage() {
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Isi form dengan data user saat ini ketika halaman dimuat
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || ''); // Email biasanya read-only
      setPreviewUrl(user.profile_picture || null);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Buat preview gambar lokal agar user bisa melihat sebelum upload
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Gunakan FormData karena kita mengirim file
      const formData = new FormData();
      formData.append('name', name);
      if (selectedFile) {
        formData.append('profile_picture', selectedFile);
      }

      await updateProfile(formData);
      
      setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Gagal memperbarui profil.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Background */}
        <div className="h-32 bg-[#DA9A3D]"></div>

        <div className="px-8 pb-8">
          {/* Foto Profil Section */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-full h-full text-gray-300" />
                )}
              </div>
              
              {/* Tombol Upload Overlay */}
              <label 
                htmlFor="photo-upload" 
                className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white cursor-pointer hover:bg-indigo-700 shadow-md transition-transform hover:scale-110"
              >
                <CameraIcon className="w-5 h-5" />
                <input 
                  id="photo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Edit Profil
          </h1>

          {/* Pesan Error/Sukses */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg text-center ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#DA9A3D] focus:border-transparent outline-none transition-all"
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-all
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#DA9A3D] hover:bg-[#c58b36] hover:shadow-lg'
                }`}
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}