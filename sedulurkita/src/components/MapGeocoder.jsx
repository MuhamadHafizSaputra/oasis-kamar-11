// src/components/MapGeocoder.jsx
import { useState } from 'react';
import maplibregl from 'maplibre-gl'; 
// Hapus 'useMap'
import { geocode, searchApiUmkm } from '../lib/api.js';

const MAP_PADDING = { top: 100, bottom: 40, left: 40, right: 40 };
const SPECIFIC_LOCATION_ZOOM = 16.5; // Zoom untuk 1 UMKM spesifik
const LOCATION_AREA_ZOOM = 5; // Zoom untuk 1 Titik Lokasi (dari Nominatim)


// Terima 'map' sebagai prop
export default function MapGeocoder({ setUmkm, setIsInSearchMode, userLocation, map }) {
  // Hapus baris 'useMap()'
  
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // (Helper 'searchUmkmDatabase' tidak berubah)
  const searchUmkmDatabase = async () => {
    console.log(`Aturan 2 GAGAL. Mencoba Aturan 3 (Database) untuk: "${query}"`);
    const foundUmkmList = await searchApiUmkm(
      query, 
      userLocation?.lat, 
      userLocation?.lon
    );

    if (foundUmkmList && foundUmkmList.length > 0) {
      console.log(`Aturan 3 (Database) SUKSES. Ditemukan ${foundUmkmList.length} UMKM.`);
      setUmkm(foundUmkmList);
      setIsInSearchMode(true); 
      
      if (foundUmkmList.length === 1) {
        const umkm = foundUmkmList[0];
        map.flyTo({
          center: [umkm.longitude, umkm.latitude],
          zoom: SPECIFIC_LOCATION_ZOOM,
          padding: MAP_PADDING,
          duration: 2000,
        });
      } else {
        const bounds = new maplibregl.LngLatBounds();
        foundUmkmList.forEach(umkm => {
          bounds.extend([umkm.longitude, umkm.latitude]);
        });
        map.fitBounds(bounds, { padding: {top: 150, bottom: 50, left: 50, right: 50}, duration: 2000 });
      }
    } else {
      console.log("Aturan 2 & 3 GAGAL. Tidak ditemukan.");
      alert(`Lokasi atau UMKM "${query}" tidak ditemukan di area Jogja.`);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!map) return; // Pengecekan 'map' dari prop
    
    if (query.trim().length === 0) {
      setIsInSearchMode(false); 
      map.fire('moveend'); 
      return;
    }

    setIsLoading(true);

    // 1. Coba cari di Database UMKM TERLEBIH DAHULU (Aturan 3)
    console.log(`Mencoba Aturan 3 (Database) untuk: "${query}"`);
    const foundUmkmList = await searchApiUmkm(
      query, 
      userLocation?.lat, 
      userLocation?.lon
    );

    if (foundUmkmList && foundUmkmList.length > 0) {
      // **SUKSES UMKM (ATURAN 3: Contoh "Gudeg")**
      console.log(`Aturan 3 (Database) SUKSES. Ditemukan ${foundUmkmList.length} UMKM.`);
      setUmkm(foundUmkmList);
      setIsInSearchMode(true); 
      if (foundUmkmList.length === 1) {
        const umkm = foundUmkmList[0];
        map.flyTo({
          center: [umkm.longitude, umkm.latitude],
          zoom: SPECIFIC_LOCATION_ZOOM,
          padding: MAP_PADDING,
          duration: 2000,
        });
      } else {
        const bounds = new maplibregl.LngLatBounds();
        foundUmkmList.forEach(umkm => {
          bounds.extend([umkm.longitude, umkm.latitude]);
        });
        map.fitBounds(bounds, { padding: {top: 150, bottom: 50, left: 50, right: 50}, duration: 2000 });
      }
    } else {
      
      // **GAGAL UMKM -> Coba cari sebagai LOKASI (Aturan 2)**
      console.log(`Aturan 3 GAGAL. Mencoba Aturan 2 (Geocode) untuk: "${query}"`);
      const geocodeResult = await geocode(query); // Ini memanggil Nominatim

      if (geocodeResult) {
        // **SUKSES LOKASI (ATURAN 2: Contoh "UGM", "UNY")**
        console.log(`Aturan 2 (Nominatim) SUKSES.`);
        setIsInSearchMode(false); 

        // --- BACA FORMAT NOMINATIM ---
        if (geocodeResult.boundingbox) {
          // Kasus "UGM"
          const [minLat, maxLat, minLng, maxLng] = geocodeResult.boundingbox.map(parseFloat);
          const bounds = [[minLng, minLat], [maxLng, maxLat]];
          map.fitBounds(bounds, { padding: MAP_PADDING, duration: 2000 });
        
        } else if (geocodeResult.lon && geocodeResult.lat) {
          // Kasus "UNY" / "Malioboro" (Hanya titik)
          const lon = parseFloat(geocodeResult.lon);
          const lat = parseFloat(geocodeResult.lat);
          map.flyTo({
            center: [lon, lat],
            zoom: LOCATION_AREA_ZOOM, // Gunakan zoom 13.5
            padding: MAP_PADDING,
            duration: 2000,
          });
        }
        // --- AKHIR FORMAT NOMINATIM ---
        
      } else {
        // **GAGAL SEMUA**
        console.log("Aturan 2 & 3 GAGAL. Tidak ditemukan.");
        alert(`Lokasi atau UMKM "${query}" tidak ditemukan di area Jogja.`);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm px-4">
      {/* (Form tidak berubah) */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari UMKM atau lokasi di Jogja..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
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