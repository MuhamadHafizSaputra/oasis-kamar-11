// src/components/FeaturedUmkm.jsx (atau di mana pun kamu mau)

import React, { useState, useEffect } from 'react';

function FeaturedUmkm() {
  // 1. Siapkan "wadah" untuk data
  //    'umkmData' -> tempat menyimpan datanya (awalnya array kosong)
  //    'setUmkmData' -> fungsi untuk memasukkan data ke wadah
  const [umkmData, setUmkmData] = useState([]);
  
  // State untuk menangani loading & error (Best practice!)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Siapkan "pemicu" untuk mengambil data
  useEffect(() => {
    
    // Alamat API backend yang sudah kita uji tadi
    const apiUrl = 'https://sedulurkita-api.vercel.app/api/umkm/featured';

    console.log('Mencoba mengambil data dari:', apiUrl);

    // 3. Ambil data menggunakan fetch()
    fetch(apiUrl)
      .then(response => {
        // Jika server tidak merespons dengan 'OK' (misal: error 404 atau 500)
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return response.json(); // Ubah respons menjadi data JSON
      })
      .then(data => {
        // 4. Masukkan data JSON ke "wadah" (useState)
        console.log('Data berhasil diterima:', data);
        setUmkmData(data);
        setLoading(false); // Selesai loading
      })
      .catch(err => {
        // Tangani jika ada error (misal: server mati atau salah URL)
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false); // Selesai loading (meskipun error)
      });

  // Tanda '[]' di akhir berarti: "Jalankan useEffect ini HANYA SEKALI
  // saat komponen pertama kali dimuat."
  }, []);

  // --- Bagian Tampilan (Render) ---

  // Tampilkan pesan loading
  if (loading) {
    return <div>Sedang memuat data UMKM...</div>;
  }

  // Tampilkan pesan error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // 5. Tampilkan data jika berhasil
  return (
    <div>
      <h2>UMKM Unggulan</h2>
      
      {/* Jika tidak ada data, tampilkan pesan */}
      {umkmData.length === 0 ? (
        <p>Tidak ada data UMKM unggulan.</p>
      ) : (
        // Jika ada data, kita .map() (looping) datanya
        <ul>
          {umkmData.map(umkm => (
            // 'key' sangat penting untuk React saat looping
            <li key={umkm.id}>
              <h3>{umkm.name}</h3>
              <p>{umkm.location}</p>
              {/* Kamu bisa tambahkan data lain di sini */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeaturedUmkm;