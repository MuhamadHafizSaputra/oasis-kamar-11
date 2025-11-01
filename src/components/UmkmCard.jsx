// src/components/UmkmCard.js
import React from "react";
import UmkmCarousel from "./UmkmCarousel";
import { StarIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function UmkmCard({ umkm }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <UmkmCarousel images={umkm.images} />
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-800">{umkm.name}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">{umkm.rating}%</span>
            <span className="text-gray-500 text-sm">({umkm.reviews})</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPinIcon className="w-4 h-4 mr-1.5" />
          <span>
            {umkm.location} &middot; {umkm.distance}
          </span>
        </div>
        <p className="text-gray-700">
          Mulai dari{" "}
          <span className="font-semibold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(umkm.priceFrom)}
          </span>
          / malam
        </p>
      </div>
    </div>
  );
}