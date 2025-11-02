// src/pages/ListPage.js
import React, { useState } from "react"; 
// DIUBAH: Tambahkan ekstensi .jsx
import FilterBar from "../components/FilterBar.jsx";
import UmkmCard from "../components/UmkmCard.jsx";

// 2. Impor semua komponen Peta (ini sudah benar)
import { Map, Marker, Popup } from "@vis.gl/react-maplibre";
import MapGeocoder from "../components/MapGeocoder.jsx";
import DynamicDataLoader from "../components/DynamicDataLoader.jsx";

export default function ListPage() {
  // ... (Sisa file ini sudah benar)
  const [listings, setListings] = useState([]); 
  const [umkm, setUmkm] = useState([]);
  const [selectedUmkm, setSelectedUmkm] = useState(null);

  const initialViewState = {
    longitude: 110.3777,
    latitude: -7.7705,
    zoom: 12,
  };

  return (
    <div className="flex h-[calc(100vh-80px)]"> 
      
      {/* Kolom Kiri: Filter dan Daftar */}
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

      {/* Kolom Kanan: Peta */}
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