// src/components/VideoFacade.jsx
import React, { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function VideoFacade({ videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Ekstrak Video ID (asumsi format YouTube embed)
  // Format input: https://www.youtube.com/embed/VIDEO_ID
  const videoId = videoUrl?.split("/").pop()?.split("?")[0];
  
  // Thumbnail kualitas tinggi dari YouTube
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
    : null;

  if (isPlaying) {
    return (
      <div className="w-full h-full">
        <iframe
          src={`${videoUrl}?autoplay=1&rel=0`}
          className="w-full h-full rounded-lg"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Video UMKM"
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full bg-gray-200 cursor-pointer group rounded-lg overflow-hidden"
      onClick={() => setIsPlaying(true)}
    >
      {thumbnailUrl && (
        <img 
          src={thumbnailUrl} 
          alt="Video Thumbnail" 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <PlayIcon className="w-8 h-8 text-[#DA9A3D] ml-1" />
        </div>
      </div>
    </div>
  );
}