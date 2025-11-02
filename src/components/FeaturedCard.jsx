// src/components/FeaturedCard.js
import React from "react";

export default function FeaturedCard({ title, description, imageUrl }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg relative cursor-pointer 
                   transform transition-all duration-300 
                   hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]"> {/* (Poin 2) */}
      <img
        className="w-full h-80 object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/90 mt-1">{description}</p>
      </div>
    </div>
  );
}