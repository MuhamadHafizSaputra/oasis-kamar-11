// src/lib/constants.ts

/**
 * Bounding Box untuk Daerah Istimewa Yogyakarta.
 * Format: [minLng, minLat, maxLng, maxLat]
 * Digunakan untuk membatasi pencarian geocoding.
 */
export const JOGJA_BOUNDING_BOX = [
  110.012, // min Longitude
  -8.210,  // min Latitude
  110.840, // max Longitude
  -7.523   // max Latitude
];