// src/components/AboutUs.jsx
import React from 'react';
import { SparklesIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline';

// Data untuk poin-poin utama
const features = [
  {
    name: 'Temukan yang Unik',
    description: 'Jelajahi ribuan UMKM tersembunyi di Jogja, dari kuliner otentik hingga kerajinan tangan yang mempesona.',
    icon: SparklesIcon,
  },
  {
    name: 'Dukung Lokal',
    description: 'Setiap transaksi Anda membantu pengusaha lokal, keluarga mereka, dan perekonomian komunitas secara langsung.',
    icon: HeartIcon,
  },
  {
    name: 'Terhubung Langsung',
    description: 'Dapatkan informasi lokasi, kontak, dan cerita di balik setiap usaha. Jadilah lebih dari sekadar pembeli.',
    icon: UsersIcon,
  },
];

export default function AboutUs() {
  return (
    // Kita gunakan bg-white agar kontras dengan latar belakang beige
    <div className="bg-white py-20 sm:py-24 rounded-2xl shadow-lg mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header Teks */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#DA9A3D]">
            TENTANG KAMI
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Menghubungkan Hati, Menghidupkan Usaha
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            SedulurKita lahir dari kecintaan kami pada Jogja dan semangat UMKM-nya. Misi kami adalah menjadi jembatan digital yang memudahkan Anda menemukan, mendukung, dan menjadi bagian dari cerita sukses usaha lokal.
          </p>
        </div>

        {/* Poin-poin Fitur */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFCA8E]">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}