// src/lib/api.js
import { JOGJA_BOUNDING_BOX } from "./constants.js";
import axios from 'axios';

const API_BASE_URL = 'https://sedulurkita-api.vercel.app/api';

/**
 * Mencari UMKM dari API.
 * (Tidak berubah, sudah benar)
 */
export async function searchApiUmkm(query, lat, lon) {
  
  const params = { q: query };
  if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/umkm/search`, { params });
    
    const umkmList = response.data; 

    if (umkmList.length === 0) {
      console.log("UMKM tidak ditemukan via API, akan lanjut mencari lokasi.");
      return null;
    }

    return umkmList.map(umkm => ({
      ...umkm,
      priceFrom: umkm.price_min,
      images: Array.isArray(umkm.images) ? umkm.images : JSON.parse(umkm.images || '[]'),
      distance: umkm.distance || null,
      calculated_distance: umkm.calculated_distance || null 
    }));

  } catch (error) {
    console.error("Error saat searchApiUmkm:", error.message); 
    console.log("UMKM tidak ditemukan via API, akan lanjut mencari lokasi.");
    return null;
  }
}

// --- FUNGSI GEOCODE DIPERBARUI ---
/**
 * Mengambil data geocoding (LOKASI) dari NOMINATIM (Gratis).
 */
export async function geocode(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("viewbox", JOGJA_BOUNDING_BOX.join(','));
  url.searchParams.set("bounded", "1");

  try {
    // Kita panggil Nominatim langsung dari frontend
    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error("Geocoding request failed");
      return null;
    }
    const results = await response.json();
    if (results && results.length > 0) {
      return results[0]; // Kembalikan hasil Nominatim
    }
    console.warn(`Lokasi "${query}" tidak ditemukan di area Jogja.`);
    return null;
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
}
// --- AKHIR FUNGSI GEOCODE ---


/**
 * (Fungsi ini tidak berubah)
 */
export async function getListingsInBounds(bounds) {
  // ... (kode tidak berubah)
  console.log("Mock API: Fetching listings...");
  await new Promise(resolve => setTimeout(resolve, 100));
  const visibleListings = []; 
  console.log(`Mock API: Found ${visibleListings.length} listings.`);
  return visibleListings;
}

/**
 * (Fungsi ini tidak berubah)
 */
export async function getUmkmInBounds(bounds) {
  // ... (kode tidak berubah)
  console.log("Live API: Fetching UMKM from backend...");
  
  const minLng = bounds.getWest();
  const maxLng = bounds.getEast();
  const minLat = bounds.getSouth();
  const maxLat = bounds.getNorth();

  try {
    const response = await axios.get(`${API_BASE_URL}/umkm`, {
      params: { minLng, minLat, maxLng, maxLat }
    });
    
    const transformedData = response.data.map(umkm => ({
      ...umkm,
     priceFrom: umkm.price_from || umkm.price_min, 
      images: Array.isArray(umkm.images) ? umkm.images : JSON.parse(umkm.images || '[]'),
    }));
    
    console.log(`Live API: Found ${transformedData.length} UMKM.`);
    return transformedData; 

  } catch (error) {
    console.error("Error fetching UMKM in bounds:", error);
    return [];
  }
}