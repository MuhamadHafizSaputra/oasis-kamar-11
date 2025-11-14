// src/components/LazyImage.jsx
import React, { useState } from "react";
import { getOptimizedImageUrl } from "../lib/imageUtils";

export default function LazyImage({ src, alt, className, width = 800 }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // URL gambar ukuran kecil (untuk blur placeholder)
  const tinyUrl = getOptimizedImageUrl(src, 50, 20); 
  // URL gambar target
  const optimizedUrl = getOptimizedImageUrl(src, width, 80);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder Blur (dimuat duluan) */}
      <img
        src={tinyUrl}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100 blur-md"
        }`}
      />

      {/* Gambar Asli (Loading Lazy) */}
      <img
        src={optimizedUrl}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}