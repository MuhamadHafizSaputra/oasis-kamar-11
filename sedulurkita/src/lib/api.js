// src/lib/api.js
import { JOGJA_BOUNDING_BOX } from "./constants.js";
// Hapus impor mockData, sudah tidak terpakai di sini
// import { umkmData } from '../data/mockData.jsx'; 
import axios from 'axios';

/**
 * Mencari UMKM dari API.
 * @param {string} query Teks pencarian
 * @param {number | null} lat Garis lintang pengguna (opsional)
 * @param {number | null} lon Garis bujur pengguna (opsional)
 * @returns {Array | null} Array UMKM yang ditemukan atau null
 */
export async function searchApiUmkm(query, lat, lon) {
  console.log(`Mencari dari API untuk: "${query}"`);
  
  // --- PERUBAHAN DI SINI: Tambahkan lat/lon ke parameter ---
  const params = { q: query };
  if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
    console.log(`Dengan lokasi: ${lat}, ${lon}`);
  }
  // --- AKHIR PERUBAHAN ---

  try {
    // Panggil endpoint /api/umkm/search
    const response = await axios.get('https://sedulurkita-api.vercel.app/api/umkm/search', { params });
    
    const umkmList = response.data; // Ini adalah array

    // Jika array kosong, kembalikan null agar geocoder bisa lanjut
    if (umkmList.length === 0) {
      console.log("UMKM tidak ditemukan via API, akan lanjut mencari lokasi.");
      return null;
    }

    // Transformasi data untuk setiap item dalam array
    return umkmList.map(umkm => ({
      ...umkm,
      priceFrom: umkm.price_from,
      // Perbaiki juga parsing JSON untuk images
      images: Array.isArray(umkm.images) ? umkm.images : JSON.parse(umkm.images || '[]'),
      // Tambahkan 'distance' jika ada (dari backend)
      distance: umkm.distance || null 
    }));

  } catch (error) {
    console.log("UMKM tidak ditemukan via API, akan lanjut mencari lokasi.");
    return null;
  }
}

/**
 * Mengambil data geocoding (LOKASI), DIBATASI HANYA DI DALAM JOGJA.
 */
export async function geocode(query) {
  // ... (Fungsi ini tidak berubah)
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("viewbox", JOGJA_BOUNDING_BOX.join(','));
  url.searchParams.set("bounded", "1");

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error("Geocoding request failed");
      return null;
    }
    const results = await response.json();
    if (results && results.length > 0) {
      return results[0]; 
    }
    console.warn(`Lokasi "${query}" tidak ditemukan di area Jogja.`);
    return null;
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
}

// ... (Fungsi getListingsInBounds tidak berubah) ...
export async function getListingsInBounds(bounds) {
  console.log("Mock API: Fetching listings...");
  await new Promise(resolve => setTimeout(resolve, 100));
  const visibleListings = []; 
  console.log(`Mock API: Found ${visibleListings.length} listings.`);
  return visibleListings;
}

export async function getUmkmInBounds(bounds) {
  console.log("Live API: Fetching UMKM from backend...");
  
  // Get the corners from the map
  const minLng = bounds.getWest();
  const maxLng = bounds.getEast();
  const minLat = bounds.getSouth();
  const maxLat = bounds.getNorth();

  try {
    const response = await axios.get('https://sedulurkita-api.vercel.app/api/umkm', {
      params: { minLng, minLat, maxLng, maxLat }
    });
    
    const transformedData = response.data.map(umkm => ({
      ...umkm,
     priceFrom: umkm.price_from || umkm.price_min, 
      images: Array.isArray(umkm.images) ? umkm.images : JSON.parse(umkm.images || '[]'),
    }));
    
    console.log(`Live API: Found ${transformedData.length} UMKM.`);
    return transformedData; // <-- Return the new, fixed data

  } catch (error) {
    console.error("Error fetching UMKM in bounds:", error);
    return [];
  }
}