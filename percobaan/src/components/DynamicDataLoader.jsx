// src/components/DynamicDataLoader.jsx
import { useEffect, useCallback, useRef } from 'react';
import { useMap } from '@vis.gl/react-maplibre';

// Perbaiki impor ini agar eksplisit ke file .js
import { getListingsInBounds, getUmkmInBounds } from '../lib/api.js';

// HAPUS baris 'import type ...' dari sini.

export default function DynamicDataLoader({ onDataLoaded }) {
  const { default: map } = useMap();

  const onDataLoadedRef = useRef(onDataLoaded);
  onDataLoadedRef.current = onDataLoaded;

  const handleMapMoveEnd = useCallback(async () => {
    if (!map) return;
    const bounds = map.getBounds();

    // Panggil kedua API secara paralel
    const [newListings, newUmkm] = await Promise.all([
      getListingsInBounds(bounds),
      getUmkmInBounds(bounds)
    ]);

    onDataLoadedRef.current({ listings: newListings, umkm: newUmkm });
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on('moveend', handleMapMoveEnd);
    map.on('load', handleMapMoveEnd);
    return () => {
      map.off('moveend', handleMapMoveEnd);
      map.off('load', handleMapMoveEnd);
    };
  }, [map, handleMapMoveEnd]);

  return null; // Tidak me-render apapun
}