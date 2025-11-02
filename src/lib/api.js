// src/lib/api.js
import { JOGJA_BOUNDING_BOX } from "./constants.js";
import { umkmData } from '../data/mockData.jsx'; 

// --- FUNGSI BARU UNTUK MENCARI UMKM LOKAL ---
/**
 * Mencari UMKM secara lokal dari mockData.js berdasarkan nama.
 * @param {string} query Teks pencarian
 * @returns {object | null} Objek UMKM yang ditemukan atau null
 */
export function searchLocalUmkm(query) {
  console.log(`Mencari lokal untuk: "${query}"`);
  const normalizedQuery = query.toLowerCase();
  
  // Cari di dalam umkmData apakah ada nama yang cocok
  const foundUmkm = umkmData.find(umkm => 
    umkm.name.toLowerCase().includes(normalizedQuery)
  );

  return foundUmkm || null; // Kembalikan UMKM yang ditemukan atau null
}
// --- AKHIR FUNGSI BARU ---


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

// ... (Fungsi getListingsInBounds dan getUmkmInBounds tidak berubah) ...
export async function getListingsInBounds(bounds) {
  console.log("Mock API: Fetching listings...");
  await new Promise(resolve => setTimeout(resolve, 100));
  const visibleListings = []; 
  console.log(`Mock API: Found ${visibleListings.length} listings.`);
  return visibleListings;
}

export async function getUmkmInBounds(bounds) {
  console.log("Mock API: Fetching UMKM from mockData.js...");
  await new Promise(resolve => setTimeout(resolve, 300));

  const visibleUmkm = umkmData.filter(umkm => {
    if (!umkm.latitude || !umkm.longitude) { 
      return false;
    }
    return (
      umkm.longitude >= bounds.getWest() &&
      umkm.longitude <= bounds.getEast() &&
      umkm.latitude >= bounds.getSouth() &&
      umkm.latitude <= bounds.getNorth()
    );
  });
  
  console.log(`Mock API: Found ${visibleUmkm.length} UMKM.`);
  return visibleUmkm;
}