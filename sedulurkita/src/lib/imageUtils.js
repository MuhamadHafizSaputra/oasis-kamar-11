// src/lib/imageUtils.js

/**
 * Mengoptimalkan URL gambar.
 * Saat ini dioptimalkan khusus untuk Unsplash (berdasarkan mockData Anda).
 */
export function getOptimizedImageUrl(url, width = 800, quality = 80) {
  if (!url) return "https://via.placeholder.com/400x300?text=No+Image";

  // Cek apakah ini URL Unsplash
  if (url.includes("images.unsplash.com")) {
    const urlObj = new URL(url);
    urlObj.searchParams.set("w", width);
    urlObj.searchParams.set("q", quality);
    urlObj.searchParams.set("auto", "format"); // Menggunakan WebP/AVIF jika didukung browser
    urlObj.searchParams.set("fit", "crop");
    return urlObj.toString();
  }

  // Jika menggunakan layanan lain (misal Cloudinary), tambahkan logika di sini
  
  return url;
}