import React from 'react';
import { Utensils, ShoppingBag, Hammer, Search } from "lucide-react";

const SearchSection = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl w-full">
        <div className="flex flex-col space-y-8">
              <div className="flex justify-center gap-12">
                <div className="flex flex-col items-center">
                  <div className="border border-gray-200 p-4 rounded-full hover:border-gray-300">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <span className="mt-2 text-sm">Makanan</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border border-gray-200 p-4 rounded-full hover:border-gray-300">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="mt-2 text-sm">Produk</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border border-gray-200 p-4 rounded-full hover:border-gray-300">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <span className="mt-2 text-sm">Jasa</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="border border-gray-200 p-4 rounded-full hover:border-gray-300">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <span className="mt-2 text-sm">Belanja</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Mau cari apa di Jogja?"
                  className="w-full px-12 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 bg-gray-50/50"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              </div>
          </div>
      </div>
  );
};

export default SearchSection;