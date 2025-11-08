import React from 'react';
import { Utensils, ShoppingBag, Hammer } from "lucide-react";

const CategoryIcons = () => {
  return (
    <div className="flex justify-center gap-8 mb-8">
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-full">
          <Utensils className="w-6 h-6" />
        </div>
        <span className="mt-2">Makanan</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-full">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <span className="mt-2">Produk</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-full">
          <Hammer className="w-6 h-6" />
        </div>
        <span className="mt-2">Jasa</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-full">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <span className="mt-2">Belanja</span>
      </div>
    </div>
  );
};

export default CategoryIcons;