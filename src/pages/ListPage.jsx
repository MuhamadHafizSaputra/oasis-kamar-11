// src/pages/ListPage.jsx
// DIUBAH: Impor hooks baru
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar.jsx";
import UmkmCard from "../components/UmkmCard.jsx";

// DIUBAH: Impor GeolocateControl dan useMap
import { Map, Marker, Popup, GeolocateControl, useMap } from "@vis.gl/react-maplibre";
import MapGeocoder from "../components/MapGeocoder.jsx";
import DynamicDataLoader from "../components/DynamicDataLoader.jsx";
// DIUBAH: Impor fungsi pencarian
import { geocode, searchLocalUmkm } from "../lib/api.js"; 

// Konstanta untuk navigasi peta
const MAP_PADDING = { top: 100, bottom: 40, left: 40, right: 40 };
const SPECIFIC_LOCATION_ZOOM = 16.5;


/**
 * Komponen "tak terlihat" yang HANYA bertugas menjalankan
 * pencarian/navigasi awal berdasarkan URL params saat peta dimuat.
 */
function InitialMapAction({ geolocateControlRef }) {
  const { default: map } = useMap();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasRun, setHasRun] = useState(false); // Mencegah re-run

  useEffect(() => {
    // Hanya jalankan sekali saat peta siap dan belum pernah dijalankan
    if (!map || hasRun) return;

    const query = searchParams.get('q');
    const location = searchParams.get('loc');

    const runSearch = async (q) => {
      // Logika ini sama dengan di MapGeocoder
      const foundUmkm = searchLocalUmkm(q);
      if (foundUmkm) {
        map.flyTo({ center: [foundUmkm.longitude, foundUmkm.latitude], zoom: SPECIFIC_LOCATION_ZOOM, padding: MAP_PADDING, duration: 1500 });
      } else {
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
      setHasRun(true); // Tandai sudah berjalan
      setSearchParams({}, { replace: true }); // Hapus params dari URL
    };

    if (query) {
      console.log("Menjalankan pencarian awal untuk:", query);
      runSearch(query);
    } else if (location === 'terdekat' && geolocateControlRef.current) {
      console.log("Menjalankan pencarian lokasi terdekat...");
      geolocateControlRef.current.trigger(); // Picu tombol geolocate
      setHasRun(true); // Tandai sudah berjalan
      setSearchParams({}, { replace: true }); // Hapus params dari URL
    }

  }, [map, searchParams, setSearchParams, hasRun, geolocateControlRef]);

  return null; // Komponen ini tidak me-render apapun
}


export default function ListPage() {
  const [listings, setListings] = useState([]); 
  const [umkm, setUmkm] = useState([]);
  const [selectedUmkm, setSelectedUmkm] = useState(null);
  
  // DIUBAH: Definisikan ref untuk GeolocateControl
  const geolocateControlRef = useRef(null);

  const initialViewState = {
    longitude: 110.3777,
    latitude: -7.7705,
    zoom: 12,
  };

  return (
    <div className="flex h-[calc(100vh-80px)]"> 
      
      {/* Kolom Kiri (Daftar) */}
      <div className="w-full lg:w-3/5 overflow-y-auto px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">
          {umkm.length} UMKM ditemukan di area peta
        </h2>
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {umkm.map((item) => (
            <UmkmCard key={item.id} umkm={item} />
          ))}
        </div>
      </div>

      {/* Kolom Kanan (Peta) */}
      <div className="hidden lg:block w-2/5 h-full relative">
        <Map
          id="default"
          initialViewState={initialViewState}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          className="map-container"
        >
          <MapGeocoder />
          <DynamicDataLoader 
            onDataLoaded={({ listings, umkm }) => {
              setListings(listings);
              setUmkm(umkm);
            }}
          />
          
          {/* DIUBAH: Tambahkan GeolocateControl DENGAN ref */}
          <GeolocateControl 
            ref={geolocateControlRef}
            position="top-right"
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ maxZoom: 15 }}
            showUserLocation={true}
          />
          
          {/* DIUBAH: Tambahkan komponen logika baru kita */}
          <InitialMapAction geolocateControlRef={geolocateControlRef} />

          {/* Render Marker & Popup (sudah benar) */}
          {umkm.map((item) => (
            <Marker
              key={item.id}
              longitude={item.longitude}
              latitude={item.latitude}
              anchor="bottom"
              onClick={() => setSelectedUmkm(item)}
            >
              <span className="text-2xl cursor-pointer">🛍️</span>
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
              </div>
            </Popup>
          )}

        </Map>
      </div>
    </div>
  );
}