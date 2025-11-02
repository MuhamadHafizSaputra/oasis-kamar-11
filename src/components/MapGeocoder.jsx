// src/components/MapGeocoder.jsx
import { useState } from 'react';
import { useMap } from '@vis.gl/react-maplibre';
// DIUBAH: Impor 'geocode' DAN 'searchLocalUmkm'
import { geocode, searchLocalUmkm } from '../lib/api.js'; 

const MAP_PADDING = { top: 100, bottom: 40, left: 40, right: 40 };
const SPECIFIC_LOCATION_ZOOM = 16.5;

export default function MapGeocoder() {
  const { default: map } = useMap();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!map || query.trim().length === 0) return;

    setIsLoading(true);

    // --- LOGIKA PENCARIAN BARU (HYBRID) ---

    // 1. Coba cari sebagai nama UMKM lokal
    const foundUmkm = searchLocalUmkm(query);

    if (foundUmkm) {
      // --- KASUS 1: UMKM DITEMUKAN ---
      // Langsung terbang ke lokasi UMKM
      console.log("UMKM lokal ditemukan:", foundUmkm);
      
      map.flyTo({
        center: [foundUmkm.longitude, foundUmkm.latitude],
        zoom: SPECIFIC_LOCATION_ZOOM, // Zoom langsung ke UMKM
        padding: MAP_PADDING,
        duration: 2000,
      });

    } else {
      // --- KASUS 2: UMKM TIDAK DITEMUKAN, cari sebagai LOKASI ---
      console.log("UMKM lokal tidak ditemukan. Mencari sebagai lokasi...");
      const result = await geocode(query);

      if (result) {
        // Logika flyTo vs fitBounds (yang sudah ada)
        const largeAreaTypes = ['administrative', 'boundary', 'city', 'region'];
        const isLargeArea = largeAreaTypes.includes(result.type);

        if (isLargeArea && result.boundingbox) {
          const [minLat, maxLat, minLng, maxLng] = result.boundingbox.map(parseFloat);
          const bounds = [[minLng, minLat], [maxLng, maxLat]];
          map.fitBounds(bounds, { padding: MAP_PADDING, duration: 2000 });
        } else {
          const lon = parseFloat(result.lon);
          const lat = parseFloat(result.lat);
          map.flyTo({
            center: [lon, lat],
            zoom: SPECIFIC_LOCATION_ZOOM,
            padding: MAP_PADDING,
            duration: 2000,
          });
        }
      } else {
        alert(`Lokasi atau UMKM "${query}" tidak ditemukan di area Jogja.`);
      }
    }
    
    setIsLoading(false);
    // --- AKHIR LOGIKA PENCARIAN BARU ---
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // DIUBAH: Ganti placeholder
          placeholder="Cari UMKM atau lokasi di Jogja..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
        {/* ... (Sisa JSX tidak berubah) ... */}
        <button 
          type="submit" 
          disabled={isLoading} 
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}