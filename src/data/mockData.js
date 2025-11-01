// src/data/mockData.js

export const umkmData = [
  {
    id: 1,
    name: "Gudeg Yu Djum",
    category: "Makanan",
    rating: 99,
    reviews: 303,
    location: "Sleman, DIY",
    distance: "15 min",
    priceFrom: 25000,
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Gudeg Yu Djum adalah salah satu ikon kuliner Yogyakarta yang paling terkenal. Menyajikan gudeg kering dengan rasa otentik dan bumbu yang meresap.",
    details: {
      type: "Restoran",
      facilities: ["Parkir Luas", "Toilet", "Mushola", "Area Merokok"],
    },
  },
  {
    id: 2,
    name: "Klinik Kopi",
    category: "Produk", // Atau Minuman, sesuai data Anda
    rating: 98,
    reviews: 150,
    location: "Sleman, DIY",
    distance: "25 min",
    priceFrom: 20000,
    images: [
      "https://images.unsplash.com/photo-1511920183353-52326045634b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Tempat ngopi unik di Yogyakarta yang menawarkan pengalaman minum kopi langsung dari ahlinya. Tidak ada WiFi, fokus pada interaksi dan rasa kopi.",
    details: {
      type: "Kedai Kopi",
      facilities: ["Parkir", "Toilet"],
    },
  },
  // Tambahkan data UMKM lainnya di sini...
];

export const featuredData = [
  {
    id: 1,
    title: "Kuliner Populer",
    description: "Jelajahi rasa otentik Jogja yang paling dicari.",
    imageUrl:
      "https://images.unsplash.com/photo-1526318896980-cfd1c02a7703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 2,
    title: "Kerajinan Tangan Unik",
    description: "Temukan produk lokal dan bawa pulang kenangan.",
    imageUrl:
      "https://images.unsplash.com/photo-1578491793108-d1e3e05f560a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
];