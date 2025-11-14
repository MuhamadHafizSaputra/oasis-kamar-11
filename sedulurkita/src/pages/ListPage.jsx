// src/pages/ListPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import UmkmCard from "../components/UmkmCard.jsx";
import FilterModal from "../components/FilterModal.jsx"; // <-- 1. IMPOR MODAL

import maplibregl from "maplibre-gl";
import { Map, Marker, Popup, GeolocateControl, useMap } from "@vis.gl/react-maplibre";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import MapGeocoder from "../components/MapGeocoder.jsx";
import DynamicDataLoader from "../components/DynamicDataLoader.jsx";

import { geocode, searchApiUmkm } from "../lib/api.js";

const MAP_PADDING = { top: 100, bottom: 40, left: 40, right: 40 };
const SPECIFIC_LOCATION_ZOOM = 16.5;

// (Helper getCategoryMarker tidak berubah)
function getCategoryMarker(category) {
  switch (category) {
    case "Makanan": return <span className="text-2xl">🍲</span>;
    case "Produk": return <span className="text-2xl">📦</span>;
    case "Jasa": return <span className="text-2xl">🛠️</span>;
    case "Belanja": return <span className="text-2xl">🛍️</span>;
    default: return <span className="text-2xl">📍</span>;
  }
}

// (Helper getUserLocation tidak berubah)
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
      resolve(null);
    },
    { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
  );
});

// (InitialMapAction tidak berubah)
function InitialMapAction({ geolocateControlRef, setOriginalUmkm, setIsInSearchMode }) {
  const { default: map } = useMap();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!map || hasRun) return;
    const query = searchParams.get('q');
    const location = searchParams.get('loc');
    const runSearch = async (q) => {
      console.log(`Menjalankan pencarian awal untuk teks: ${q}`);
      const foundUmkmList = await searchApiUmkm(q, null, null);
      if (foundUmkmList && foundUmkmList.length > 0) {
        console.log(`Ditemukan ${foundUmkmList.length} UMKM:`, foundUmkmList);
        setOriginalUmkm(foundUmkmList); 
        setIsInSearchMode(true);
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
        setIsInSearchMode(false);
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
      runSearch(query);
    } else if (location === 'terdekat' && geolocateControlRef.current) {
      console.log("Menjalankan pencarian lokasi terdekat...");
      setIsInSearchMode(false);
      geolocateControlRef.current.trigger();
      setHasRun(true);
      setSearchParams({}, { replace: true });
    }
  }, [map, searchParams, setSearchParams, hasRun, geolocateControlRef, setOriginalUmkm, setIsInSearchMode]);
  return null;
}


export default function ListPage() {
  const [listings, setListings] = useState([]);
  const [originalUmkm, setOriginalUmkm] = useState([]);
  const [filteredUmkm, setFilteredUmkm] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    price: 'all',
    rating: 0,
  });
  
  // --- 2. TAMBAHKAN STATE BARU UNTUK MODAL & TAGS ---
  const [activeTags, setActiveTags] = useState(new Set());
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  // --- AKHIR STATE BARU ---

  const [selectedUmkm, setSelectedUmkm] = useState(null);
  const [isInSearchMode, setIsInSearchMode] = useState(false);
  const geolocateControlRef = useRef(null);
  const { default: map } = useMap();

  const initialViewState = {
    longitude: 110.3777,
    latitude: -7.7705,
    zoom: 12,
  };

  
  // --- 3. PERBARUI LOGIKA FILTER DI SINI ---
  useEffect(() => {
    let itemsToFilter = [...originalUmkm];

    // 1. Terapkan filter Kategori (Tidak berubah)
    if (activeFilters.category !== 'all') {
      itemsToFilter = itemsToFilter.filter(
        (umkm) => umkm.category === activeFilters.category
      );
    }

    // 2. Terapkan filter Harga (Tidak berubah)
    if (activeFilters.price !== 'all') {
      itemsToFilter = itemsToFilter.filter((umkm) => {
        const price = umkm.price_from || umkm.priceFrom;
        if (!price) return false;
        if (activeFilters.price === 'murah') return price < 20000;
        if (activeFilters.price === 'sedang') return price >= 20000 && price <= 50000;
        if (activeFilters.price === 'mahal') return price > 50000;
        return true;
      });
    }

    // 3. Terapkan filter Rating (Tidak berubah)
    if (activeFilters.rating > 0) {
      itemsToFilter = itemsToFilter.filter(
        (umkm) => umkm.rating >= activeFilters.rating
      );
    }

    // 4. LOGIKA BARU: Terapkan filter Tags Lanjutan
    if (activeTags.size > 0) {
      const selectedTags = Array.from(activeTags);

      itemsToFilter = itemsToFilter.filter((umkm) => {
        // Cek dulu apakah UMKM ini punya data 'tags'
        // Jika tidak, otomatis false (tidak lolos filter)
        if (!umkm.tags || !Array.isArray(umkm.tags)) {
          return false;
        }
        
        // Cek apakah data 'tags' UMKM ini punya SEMUA tag yang dipilih
        return selectedTags.every((tag) => umkm.tags.includes(tag));
      });
    }
    // --- AKHIR LOGIKA BARU ---

    setFilteredUmkm(itemsToFilter);

    // 5. TAMBAHKAN 'activeTags' KE DEPENDENCY ARRAY
  }, [originalUmkm, activeFilters, activeTags]); 
  // --- AKHIR LOGIKA FILTER ---


  return (
    // --- 6. GUNAKAN FRAGMENT (<>) ---
    <>
      <div className="flex h-[calc(100vh-80px)]">
        {/* Kolom Kiri (Daftar) */}
        <div className="w-full lg:w-3/5 overflow-y-auto px-6 py-4">
          
          <h2 className="text-2xl font-bold mb-2">
            {isInSearchMode 
              ? `${filteredUmkm.length} Hasil Pencarian`
              : filteredUmkm.length > 0 
                ? `${filteredUmkm.length} UMKM ditemukan di peta`
                : "Memuat UMKM di area peta..."}
          </h2>
          
          {/* --- 7. TAMBAHKAN PROP 'onAdvancedFilterClick' --- */}
          <FilterBar 
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            onAdvancedFilterClick={() => setIsFilterModalOpen(true)}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredUmkm.length > 0 ? (
              // Jika ada data, tampilkan seperti biasa
              filteredUmkm.map((item) => (
                <UmkmCard key={item.id} umkm={item} />
              ))
            ) : (
              // JIKA KOSONG, tampilkan pesan ini
              <div className="md:col-span-2 text-center py-16 px-6"> {/* Hapus bg-gray-50 rounded-lg border border-gray-200 */}
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" 
                  />
                </svg>
                
                <h3 className="mt-3 text-xl font-semibold text-gray-900">
                  Mulai Menjelajah Peta
                </h3>
                <p className="mt-1 text-md text-gray-600">
                  Geser atau perbesar peta di sebelah kanan untuk melihat UMKM di area yang Anda inginkan.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan (Peta) (Tidak berubah) */}
        <div className="hidden lg:block w-2/5 h-full relative">
          <Map
            id="default"
            initialViewState={initialViewState}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
            className="map-container"
          >
            <MapGeocoder 
              setUmkm={setOriginalUmkm} 
              setIsInSearchMode={setIsInSearchMode} 
            />
            
            <DynamicDataLoader 
              onDataLoaded={({ listings, umkm }) => {
                if (!isInSearchMode) {
                  setListings(listings);
                  setOriginalUmkm(umkm);
                }
              }}
            />
            
            <GeolocateControl 
              ref={geolocateControlRef}
              position="top-right"
              positionOptions={{ enableHighAccuracy: true }}
              showUserLocation={true}
              showAccuracyCircle={false} 
              className="!hidden" 
              onGeolocate={(e) => {
                if (map) {
                  map.flyTo({
                    center: [e.coords.longitude, e.coords.latitude],
                    zoom: 17, 
                    duration: 2000
                  });
                }
              }}
            />

            <button
              onClick={() => {
                if (geolocateControlRef.current) {
                  geolocateControlRef.current.trigger();
                }
              }}
              className="absolute top-[76px] right-2.5 bg-white p-2.5 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 z-10
                         transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Find my location"
              title="Temukan lokasi saya"
            >
              <CursorArrowRaysIcon className="w-6 h-6 text-gray-700" />
            </button>
            
            <InitialMapAction 
              geolocateControlRef={geolocateControlRef} 
              setOriginalUmkm={setOriginalUmkm} 
              setIsInSearchMode={setIsInSearchMode} 
            />

            {filteredUmkm.map((item) => (
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
                  {selectedUmkm.calculated_distance ? (
                    <p className="text-xs text-gray-500">
                      {selectedUmkm.calculated_distance.toFixed(2)} km dari Anda
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      {selectedUmkm.distance}
                    </p>
                  )}
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>

      {/* --- 8. RENDER MODAL DI SINI --- */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
      />
    </>
  );
}