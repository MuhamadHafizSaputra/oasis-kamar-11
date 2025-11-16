// src/pages/AboutPage.jsx
import React from 'react';
import { SparklesIcon, HeartIcon, UsersIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import imageHafiz from '../data/myteam/image1.jpeg';
import imageHasbi from '../data/myteam/image2.jpeg';
import imageDavin from '../data/myteam/image3.jpeg';

// Data Misi
const missions = [
  {
    name: 'Temukan yang Unik',
    description: 'Membantu Anda menjelajahi ribuan UMKM tersembunyi di Jogja, dari kuliner otentik hingga kerajinan tangan yang mempesona.',
    icon: SparklesIcon,
  },
  {
    name: 'Dukung Lokal',
    description: 'Mendorong perekonomian lokal dengan memastikan setiap transaksi Anda membantu pengusaha kecil dan keluarga mereka secara langsung.',
    icon: HeartIcon,
  },
  {
    name: 'Terhubung Langsung',
    description: 'Menyediakan platform di mana Anda bisa mendapatkan informasi lokasi, kontak, dan cerita di balik setiap usaha.',
    icon: UsersIcon,
  },
];

// Data Tim (Placeholder)
const team = [
  {
    name: 'Muhammad Hafiz Saputra',
    role: 'Founder / CEO',
    imageUrl: imageHafiz,
  },
  {
    name: 'Muhammad Khairul Hasbi',
    role: 'Database Administrator',
    imageUrl: imageHasbi,
  },
  {
    name: 'Vincentius Davin Febrillianagata',
    role: 'UI/UX Designer',
    imageUrl: imageDavin,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-beige">
      {/* 1. Hero Section */}
      <div className="relative bg-white isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
            Dari Jogja, Untuk Jogja.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-center max-w-3xl mx-auto">
            SedulurKita lahir dari kecintaan kami pada denyut nadi Yogyakarta—Usaha Mikro, Kecil, dan Menengah (UMKM) yang membuatnya istimewa. Kami percaya di setiap sudut kota, ada cerita, rasa, dan karya yang menunggu untuk ditemukan.
          </p>
        </div>
      </div>

      {/* 2. Misi Kami */}
      <div className="bg-white py-20 sm:py-24 mt-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-[#DA9A3D]">
              MISI KAMI
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Menghubungkan Hati, Menghidupkan Usaha
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {missions.map((misi) => (
                <div key={misi.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFCA8E]">
                      <misi.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {misi.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{misi.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* 3. Tim Kami (Placeholder) */}
      <div className="bg-white py-20 sm:py-24 mt-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tim Kami</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Kami adalah sekelompok pengembang, desainer, dan pegiat lokal yang bersemangat untuk membawa UMKM Jogja ke panggung digital.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {team.map((person) => (
              <li key={person.name}>
                <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={person.imageUrl} alt="" />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}