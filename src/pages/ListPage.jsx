// src/pages/ListPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import UmkmCard from "../components/UmkmCard.jsx";

import maplibregl from "maplibre-gl"; 
import { Map, Marker, Popup, GeolocateControl, useMap } from "@vis.gl/react-maplibre";
import MapGeocoder from "../components/MapGeocoder.jsx";
import DynamicDataLoader from "../components/DynamicDataLoader.jsx";

import { geocode, searchApiUmkm } from "../lib/api.js"; 

const MAP_PADDING = { top: 100, bottom: 40, left: 40, right: 40 };
const SPECIFIC_LOCATION_ZOOM = 16.5;

// --- Helper untuk Ikon Kategori ---
function getCategoryMarker(category) {
  switch (category) {
    case "Makanan":
      return <span className="text-2xl">🍜</span>;
    case "Produk":
      return <span className="text-2xl">🎨</span>;
    case "Jasa":
      return <span className="text-2xl">🔧</span>;
    case "Belanja":
      return <span className="text-2xl">🏪</span>;
    default:
      return <span className="text-2xl">🛍️</span>;
  }
}

// Helper untuk mendapatkan lokasi (menggunakan Promise)
const getUserLocation = () => new Promise((resolve) => {
  if (!navigator.geolocation) {
    console.warn("Geolocation tidak didukung.");
    resolve(null);
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      resolve({ 
        lat: position.coords.latitude, 
        lon: position.coords.longitude 
      });
    },
    (error) => {
      console.warn("Gagal mendapatkan lokasi:", error.message);
      resolve(null); // Gagal atau pengguna menolak
    },
    { 
      enableHighAccuracy: false, 
      timeout: 5000, 
      maximumAge: 60000 
    }
  );
});


function InitialMapAction({ geolocateControlRef, setUmkm, setIsInSearchMode }) {
  const { default: map } = useMap();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasRun, setHasRun] = useState(false); 

  useEffect(() => {
    if (!map || hasRun) return;

    const query = searchParams.get('q');
    const location = searchParams.get('loc');

    const runSearch = async (q) => {
      console.log("Mencoba mendapatkan lokasi pengguna (dari Initial Action)...");
      const userLoc = await getUserLocation();
      const lat = userLoc ? userLoc.lat : null;
      const lon = userLoc ? userLoc.lon : null;
      
      const foundUmkmList = await searchApiUmkm(q, lat, lon);

      if (foundUmkmList && foundUmkmList.length > 0) {
        // --- ATURAN 3: DITEMUKAN UMKM ---
        console.log(`Ditemukan ${foundUmkmList.length} UMKM:`, foundUmkmList);
        setUmkm(foundUmkmList);
        setIsInSearchMode(true); // <-- KUNCI DAFTAR (Masuk Mode Pencarian)

        if (foundUmkmList.length === 1) {
          const umkm = foundUmkmList[0];
          map.flyTo({ center: [umkm.longitude, umkm.latitude], zoom: SPECIFIC_LOCATION_ZOOM, padding: MAP_PADDING, duration: 1500 });
        } else {
          const bounds = new maplibregl.LngLatBounds();
          foundUmkmList.forEach(umkm => {
            bounds.extend([umkm.longitude, umkm.latitude]);
          });
          map.fitBounds(bounds, { padding: {top: 150, bottom: 50, left: 50, right: 50}, duration: 1500 });
        }

      } else {
        // --- ATURAN 2: DITEMUKAN LOKASI ---
        setIsInSearchMode(false); // <-- LEPAS KUNCI (Masuk Mode Eksplorasi)
        const result = await geocode(q);
        if (result) {
          const largeAreaTypes = ['administrative', 'boundary', 'city', 'region'];
          const isLargeArea = largeAreaTypes.includes(result.type);
          if (isLargeArea && result.boundingbox) {
            const [minLat, maxLat, minLng, maxLng] = result.boundingbox.map(parseFloat);
            map.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: MAP_PADDING, duration: 1500 });
          } else {
            map.flyTo({ center: [parseFloat(result.lon), parseFloat(result.lat)], zoom: SPECIFIC_LOCATION_ZOOM, padding: MAP_PADDING, duration: 1500 });
          }
        }
      }
      setHasRun(true); 
      setSearchParams({}, { replace: true }); 
    };

    if (query) {
      console.log("Menjalankan pencarian awal untuk:", query);
      runSearch(query);
    } else if (location === 'terdekat' && geolocateControlRef.current) {
      // --- ATURAN 1 (Terdekat): Masuk Mode Eksplorasi ---
      console.log("Menjalankan pencarian lokasi terdekat...");
      setIsInSearchMode(false); // <-- LEPAS KUNCI
      geolocateControlRef.current.trigger(); 
      setHasRun(true); 
      setSearchParams({}, { replace: true }); 
    }

  }, [map, searchParams, setSearchParams, hasRun, geolocateControlRef, setUmkm, setIsInSearchMode]);

  return null; 
}


export default function ListPage() {
  const [listings, setListings] = useState([]); 
  const [umkm, setUmkm] = useState([]);
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  
  const [isInSearchMode, setIsInSearchMode] = useState(false);
  
  const geolocateControlRef = useRef(null);

  const initialViewState = {
    longitude: 110.3777,
    latitude: -7.7705,
    zoom: 12,
  };

  return (
    <div className="flex h-[calc(100vh-80px)]"> 
      
      <div className="w-full lg:w-3/5 overflow-y-auto px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">
          {isInSearchMode 
            ? `${umkm.length} Hasil Pencarian`
            : umkm.length > 0 
              ? `${umkm.length} UMKM ditemukan di peta`
              : "Memuat UMKM di area peta..."}
        </h2>
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {umkm.map((item) => (
            <UmkmCard key={item.id} umkm={item} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block w-2/5 h-full relative">
        <Map
          id="default"
          initialViewState={initialViewState}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          className="map-container"
        >
          <MapGeocoder 
            setUmkm={setUmkm} 
            setIsInSearchMode={setIsInSearchMode} 
          />
          
          <DynamicDataLoader 
            onDataLoaded={({ listings, umkm }) => {
              if (!isInSearchMode) {
                setUmkm(umkm);
                setListings(listings);
              }
            }}
          />
          
          <GeolocateControl 
            ref={geolocateControlRef}
            position="top-right"
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ maxZoom: 15 }}
            showUserLocation={true}
          />
          
          <InitialMapAction 
            geolocateControlRef={geolocateControlRef} 
            setUmkm={setUmkm} 
            setIsInSearchMode={setIsInSearchMode} 
          />

          {umkm.map((item) => (
            <Marker
              key={item.id}
              longitude={item.longitude}
              latitude={item.latitude}
              anchor="bottom"
              onClick={() => setSelectedUmkm(item)}
            >
              {getCategoryMarker(item.category)}
            </Marker>
          ))}

          {selectedUmkm && (
            <Popup
              longitude={selectedUmkm.longitude}
              latitude={selectedUmkm.latitude}
              anchor="bottom"
              onClose={() => setSelectedUmkm(null)}
              closeOnClick={false}
              offset={40}
            >
              <div>
                <h3 className="font-bold">{selectedUmkm.name}</h3>
                <p className="text-sm">{selectedUmkm.category}</p>
                
                {/* --- PERBAIKAN DI SINI --- */}
                {/* Tampilkan 'calculated_distance' (angka) jika ada, */}
                {/* jika tidak, baru tampilkan 'distance' (teks) */}
                {selectedUmkm.calculated_distance ? (
                  <p className="text-xs text-gray-500">
                    {selectedUmkm.calculated_distance.toFixed(2)} km dari Anda
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    {selectedUmkm.distance}
                  </p>
                )}
                {/* --- AKHIR PERBAIKAN --- */}

              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}