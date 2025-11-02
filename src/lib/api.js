// src/lib/api.js
import { JOGJA_BOUNDING_BOX } from "./constants.js";

// PENTING: Impor data statis UMKM dari file-mu
// Pastikan path-nya benar dan berakhiran .js
import { umkmData } from '../data/mockData.jsx'; 

/**
 * Mengambil data geocoding, DIBATASI HANYA DI DALAM JOGJA.
 */
export async function geocode(query) {
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

/**
 * Mock API untuk mengambil Listings (Data Camp/Sewa).
 * Saat ini kita belum punya data, jadi kembalikan array kosong.
 */
export async function getListingsInBounds(bounds) {
  console.log("Mock API: Fetching listings...");
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulasi delay
  
  const visibleListings = []; 
  
  console.log(`Mock API: Found ${visibleListings.length} listings.`);
  return visibleListings;
}

/**
 * Mock API untuk mengambil UMKM.
 * FUNGSI INI MEMBACA DAN MEMFILTER 'umkmData' DARI 'mockData.js'.
 */
export async function getUmkmInBounds(bounds) {
  console.log("Mock API: Fetching UMKM from mockData.js...");
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulasi delay

  // Filter data berdasarkan latitude/longitude
  const visibleUmkm = umkmData.filter(umkm => {
    // Pastikan data-mu punya latitude & longitude
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