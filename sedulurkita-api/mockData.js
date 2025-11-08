export const umkmData = [
  {
    id: 1,
    name: "Gudeg Yu Djum - Wijilan",
    category: "Makanan",
    subcategory: "Gudeg Tradisional",
    phone: "0274512345",
    priceRange: [20000, 50000],
    paymentMethods: ["Tunai", "QRIS", "GoPay", "OVO"],
    lastUpdated: "2025-10-30",
    reviewsList: [
      {
        id: "r1",
        user: "Budi Santoso",
        rating: 5,
        text: "Gudegnya paling legendaris! ...",
        date: "2025-10-28",
      },
      {
        id: "r2",
        user: "Anita Wijaya",
        rating: 4,
        text: "Tempatnya klasik dan otentik. ...",
        date: "2025-10-25",
      },
    ],
    owner: {
      name: "Keluarga Yu Djum",
      joined: "2024-01-15",
      verified: true,
    },
    rating: 99,
    reviews: 303,
    location: "Jl. Wijilan No. 167, Kraton",
    distance: "10 min",
    priceFrom: 25000,
    latitude: -7.8053,
    longitude: 110.3708,
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1981&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Pusat gudeg kering legendaris di Yogyakarta...",
    details: {
      type: "Restoran",
      facilities: ["Parkir", "Toilet", "Area Makan Luas", "Mushola"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "preserves_cultural_heritage", "locally_sourced_materials"]
  },
  {
    id: 2,
    name: "Kopi Joss Lik Man",
    category: "Makanan",
    subcategory: "Angkringan",
    phone: "081234567890",
    priceRange: [3000, 15000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-11-01",
    reviewsList: [/* ... */],
    owner: {
      name: "Lik Man",
      joined: "2024-02-10",
      verified: true,
    },
    rating: 95,
    reviews: 450,
    location: "Utara Stasiun Tugu",
    distance: "5 min",
    priceFrom: 5000,
    latitude: -7.7827,
    longitude: 110.3672,
    images: [
      "https://images.unsplash.com/photo-1606843043322-c1f31f90b63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1511920183353-52326045634b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Pelopor Kopi Joss (kopi dengan arang) di Yogyakarta. ...",
    details: {
      type: "Angkringan",
      facilities: ["Tempat Duduk Lesehan", "Toilet Umum Terdekat"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["preserves_cultural_heritage", "small_batch"]
  },
  {
    id: 3,
    name: "Mirota Batik Malioboro",
    category: "Belanja",
    subcategory: "Batik & Kerajinan",
    phone: "0274588524",
    priceRange: [15000, 1000000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-15",
    reviewsList: [/* ... */],
    owner: {
      name: "Mirota Group",
      joined: "2024-01-20",
      verified: true,
    },
    rating: 97,
    reviews: 1200,
    location: "Jl. Malioboro No.9",
    distance: "0 min",
    priceFrom: 30000,
    latitude: -7.7949,
    longitude: 110.3659,
    images: [
      "https://images.unsplash.com/photo-1578491793108-d1e3e05f560a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1620799140414-b291c3d9b736?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko souvenir dan batik terlengkap di Malioboro. ...",
    details: {
      type: "Toko Oleh-oleh",
      facilities: ["AC", "Toilet", "Lift", "Rest Area"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["locally_sourced_materials", "preserves_cultural_heritage", "empowers_women", "family_owned"]
  },
  {
    id: 4,
    name: "Pasar Beringharjo",
    category: "Belanja",
    subcategory: "Pasar Tradisional",
    phone: "0274515871",
    priceRange: [5000, 500000],
    paymentMethods: ["Tunai", "QRIS (Sebagian Tenant)"],
    lastUpdated: "2025-10-01",
    reviewsList: [/* ... */],
    owner: {
      name: "Pemerintah Kota Yogyakarta",
      joined: "2024-01-01",
      verified: true,
    },
    rating: 96,
    reviews: 850,
    location: "Jl. Malioboro",
    distance: "2 min",
    priceFrom: 10000,
    latitude: -7.7984,
    longitude: 110.3662,
    images: [
      "https://images.unsplash.com/photo-1543088243-e35f83b23c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1599586120428-c6f34a26e033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Pasar tradisional terbesar dan tertua di Yogyakarta. ...",
    details: {
      type: "Pasar Tradisional",
      facilities: ["Toilet Umum", "Area Parkir Luas", "ATM Center"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["locally_sourced_materials", "preserves_cultural_heritage", "community_empowerment"]
  },
  {
    id: 5,
    name: "Sewa Motor Mandiri",
    category: "Jasa",
    subcategory: "Rental Kendaraan",
    phone: "085612341234",
    priceRange: [60000, 150000],
    paymentMethods: ["Tunai", "Transfer Bank"],
    lastUpdated: "2025-10-28",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Mandiri",
      joined: "2024-03-05",
      verified: false,
    },
    rating: 98,
    reviews: 150,
    location: "Dekat Stasiun Lempuyangan",
    distance: "15 min",
    priceFrom: 60000,
    latitude: -7.7937,
    longitude: 110.3781,
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1623871638006-e26b133c4ead?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa penyewaan motor harian di Yogyakarta. ...",
    details: {
      type: "Rental Motor",
      facilities: ["Helm", "Jas Hujan", "Layanan Antar Jemput"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 6,
    name: "Bakpia Pathok 25",
    category: "Produk",
    subcategory: "Oleh-oleh",
    phone: "0274567890",
    priceRange: [30000, 50000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-29",
    reviewsList: [/* ... */],
    owner: {
      name: "Keluarga Pathok 25",
      joined: "2024-01-12",
      verified: true,
    },
    rating: 97,
    reviews: 620,
    location: "Jl. KS Tubun (Pathuk)",
    distance: "10 min",
    priceFrom: 35000,
    latitude: -7.7925,
    longitude: 110.3601,
    images: [
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Salah satu merek Bakpia Pathok paling terkenal. ...",
    details: {
      type: "Toko Oleh-oleh",
      facilities: ["Area Produksi Terbuka", "Parkir Bus", "Toilet"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "locally_sourced_materials", "small_batch", "preserves_cultural_heritage"]
  },
  {
    id: 7,
    name: "Jasa Tur Becak Kraton",
    category: "Jasa",
    subcategory: "Tur Wisata",
    phone: "081987654321",
    priceRange: [50000, 150000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-10-20",
    reviewsList: [/* ... */],
    owner: {
      name: "Paguyuban Becak Wisata",
      joined: "2024-05-15",
      verified: false,
    },
    rating: 94,
    reviews: 80,
    location: "Alun-Alun Utara",
    distance: "12 min",
    priceFrom: 50000,
    latitude: -7.8048,
    longitude: 110.3643,
    images: [
      "https://images.unsplash.com/photo-1555860163-30588aaa6b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1594480545281-c7f76b05264b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Keliling area Kraton, Tamansari, dan Wijilan menggunakan becak tradisional. ...",
    details: {
      type: "Jasa Tur",
      facilities: ["Pemandu Lokal", "Spot Foto"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["preserves_cultural_heritage", "community_empowerment", "custom_orders", "locally_sourced_materials"]
  },
  {
    id: 8,
    name: "Lumpia Samijaya",
    category: "Makanan",
    subcategory: "Jajanan",
    phone: "0274513938",
    priceRange: [6000, 7000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-11-01",
    reviewsList: [/* ... */],
    owner: {
      name: "Samijaya",
      joined: "2024-02-18",
      verified: true,
    },
    rating: 98,
    reviews: 710,
    location: "Jl. Malioboro (Depan Hotel Mutiara)",
    distance: "1 min",
    priceFrom: 6000,
    latitude: -7.7928,
    longitude: 110.3658,
    images: [
      "https://images.unsplash.com/photo-1631102914562-b53c617c5b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1618190920038-7698d6c75b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Lumpia legendaris di Malioboro. ...",
    details: {
      type: "Kaki Lima",
      facilities: ["Hanya Takeaway"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["small_batch", "family_owned"]
  },
  {
    id: 9,
    name: "ViaVia Artisan Bakery",
    category: "Produk",
    subcategory: "Bakery",
    phone: "0274381578",
    priceRange: [15000, 70000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-25",
    reviewsList: [/* ... */],
    owner: {
      name: "ViaVia Group",
      joined: "2024-03-11",
      verified: true,
    },
    rating: 96,
    reviews: 230,
    location: "Prawirotaman",
    distance: "20 min",
    priceFrom: 20000,
    latitude: -7.8166,
    longitude: 110.3705,
    images: [
      "https://images.unsplash.com/photo-1563050158-a0c3021a8a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1509735837536-83d38b552d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Bakery yang menjual roti-roti artisan, kue, dan produk organik. ...",
    details: {
      type: "Bakery",
      facilities: ["Kafe", "Toko Organik", "Wifi"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["social_enterprise", "eco_friendly", "small_batch", "locally_sourced_materials", "empowers_women", "natural_dyes"]
  },
  {
    id: 10,
    name: "Tempo Gelato Prawirotaman",
    category: "Makanan",
    subcategory: "Dessert",
    phone: "0274373272",
    priceRange: [25000, 50000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-30",
    reviewsList: [/* ... */],
    owner: {
      name: "Tempo Gelato",
      joined: "2024-01-30",
      verified: true,
    },
    rating: 98,
    reviews: 1500,
    location: "Prawirotaman",
    distance: "20 min",
    priceFrom: 25000,
    latitude: -7.817,
    longitude: 110.37,
    images: [
      "https://images.unsplash.com/photo-1567197343946-f63ee142353a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1627999138243-91285731f82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Kedai gelato paling populer di Jogja ...",
    details: {
      type: "Kedai Gelato",
      facilities: ["AC", "Toilet", "Area Duduk Indoor & Outdoor"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "small_batch"]
  },
  {
    id: 11,
    name: "Toko Buku Toga Mas",
    category: "Belanja",
    subcategory: "Toko Buku",
    phone: "0274542545",
    priceRange: [10000, 300000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-22",
    reviewsList: [/* ... */],
    owner: {
      name: "Toga Mas",
      joined: "2024-02-14",
      verified: true,
    },
    rating: 95,
    reviews: 310,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 15000,
    latitude: -7.785,
    longitude: 110.3731,
    images: [
      "https://images.unsplash.com/photo-1531988042231-E42a2b124027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko buku besar dengan koleksi lengkap dan harga diskon. ...",
    details: {
      type: "Toko Buku",
      facilities: ["AC", "Area Baca", "Toilet"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 12,
    name: "Laundry Express Kiloan",
    category: "Jasa",
    subcategory: "Laundry",
    phone: "087712341234",
    priceRange: [5000, 8000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-11-01",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Budi",
      joined: "2024-06-01",
      verified: false,
    },
    rating: 93,
    reviews: 65,
    location: "Suryodiningratan",
    distance: "15 min",
    priceFrom: 5000,
    latitude: -7.8123,
    longitude: 110.3655,
    images: [
      "https://images.unsplash.com/photo-1593078330545-322b7f7b1f57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1610557892470-55d7e80c0b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa laundry kiloan cepat 1 hari jadi. ...",
    details: {
      type: "Laundry",
      facilities: ["Setrika Uap", "Layanan Antar Jemput"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 13,
    name: "Bakmi Pak Pele",
    category: "Makanan",
    subcategory: "Bakmi Jawa",
    phone: "081812345678",
    priceRange: [20000, 30000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-27",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Pele",
      joined: "2024-02-22",
      verified: true,
    },
    rating: 96,
    reviews: 280,
    location: "Alun-Alun Utara",
    distance: "12 min",
    priceFrom: 20000,
    latitude: -7.8037,
    longitude: 110.3662,
    images: [
      "https://images.unsplash.com/photo-1626700051175-68151f005a88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1625938135216-9b1611c38d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Bakmi Jawa legendaris di dekat Kraton. ...",
    details: {
      type: "Warung Kaki Lima",
      facilities: ["Lesehan", "Area Makan Terbuka"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["preserves_cultural_heritage", "small_batch", "family_owned"]
  },
  {
    id: 14,
    name: "Dagadu Djokdja",
    category: "Produk",
    subcategory: "Pakaian",
    phone: "0274512341",
    priceRange: [80000, 200000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-18",
    reviewsList: [/* ... */],
    owner: {
      name: "PT. Aseli Dagadu Djokdja",
      joined: "2024-01-10",
      verified: true,
    },
    rating: 95,
    reviews: 410,
    location: "Alun-Alun Utara",
    distance: "12 min",
    priceFrom: 100000,
    latitude: -7.8041,
    longitude: 110.3653,
    images: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Merek kaos ikonik Yogyakarta dengan desain yang cerdas...",
    details: {
      type: "Toko Pakaian",
      facilities: ["AC", "Kamar Pas", "Desain Toko Unik"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["preserves_cultural_heritage", "locally_sourced_materials"]
  },
  {
    id: 15,
    name: "Sate Kere Mbah Suwarni",
    category: "Makanan",
    subcategory: "Sate",
    phone: "081512341234",
    priceRange: [15000, 25000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-10-24",
    reviewsList: [/* ... */],
    owner: {
      name: "Mbah Suwarni",
      joined: "2024-04-10",
      verified: false,
    },
    rating: 94,
    reviews: 190,
    location: "Jl. Godean (Dekat Pasar Telo)",
    distance: "15 min",
    priceFrom: 15000,
    latitude: -7.791,
    longitude: 110.358,
    images: [
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1603052210283-a989f661fb3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Sate 'kere' (terbuat dari gajih/lemak sapi)...",
    details: {
      type: "Warung Tenda",
      facilities: ["Lesehan"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["female_founded", "small_batch", "preserves_cultural_heritage", "family_owned"]
  },
  {
    id: 16,
    name: "Cokelat Monggo",
    category: "Produk",
    subcategory: "Cokelat",
    phone: "0274373192",
    priceRange: [20000, 100000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-26",
    reviewsList: [/* ... */],
    owner: {
      name: "Cokelat Monggo",
      joined: "2024-02-17",
      verified: true,
    },
    rating: 97,
    reviews: 300,
    location: "Tugu",
    distance: "5 min",
    priceFrom: 25000,
    latitude: -7.7818,
    longitude: 110.367,
    images: [
      "https://images.unsplash.com/photo-1511381939415-e3401f17b925?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1605287413136-253c55bd1cb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Cokelat premium asli Jogja dengan berbagai varian rasa unik...",
    details: {
      type: "Toko Cokelat",
      facilities: ["AC", "Tester Produk", "Kafe Kecil"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["locally_sourced_materials", "small_batch", "eco_friendly", "social_enterprise", "preserves_cultural_heritage"]
  },
  {
    id: 17,
    name: "Studio Foto Java",
    category: "Jasa",
    subcategory: "Fotografi",
    phone: "0274512312",
    priceRange: [100000, 500000],
    paymentMethods: ["Tunai", "QRIS", "Transfer Bank"],
    lastUpdated: "2025-10-23",
    reviewsList: [/* ... */],
    owner: {
      name: "Java Foto",
      joined: "2024-03-20",
      verified: true,
    },
    rating: 95,
    reviews: 110,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 150000,
    latitude: -7.7845,
    longitude: 110.375,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1600096194534-960fada6207f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa foto studio profesional dan foto wisuda. ...",
    details: {
      type: "Studio Foto",
      facilities: ["Studio AC", "Properti Foto", "Ruang Ganti"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 18,
    name: "Nasi Pecel SGPC Bu Wiryo",
    category: "Makanan",
    subcategory: "Pecel",
    phone: "0274514222",
    priceRange: [15000, 25000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-28",
    reviewsList: [/* ... */],
    owner: {
      name: "Keluarga Bu Wiryo",
      joined: "2024-02-01",
      verified: true,
    },
    rating: 96,
    reviews: 400,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 18000,
    latitude: -7.7831,
    longitude: 110.3725,
    images: [
      "https://images.unsplash.com/photo-1562635446-56063659250a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1628102322441-21c9b6f8c37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Nasi pecel legendaris yang sudah ada sejak puluhan tahun lalu. ...",
    details: {
      type: "Warung Makan",
      facilities: ["Area Makan Luas", "Parkir"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "preserves_cultural_heritage", "female_founded"]
  },
  {
    id: 19,
    name: "Toko Progo",
    category: "Belanja",
    subcategory: "Grosir",
    phone: "0274515285",
    priceRange: [1000, 1000000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-15",
    reviewsList: [/* ... */],
    owner: {
      name: "Progo Group",
      joined: "2024-01-25",
      verified: true,
    },
    rating: 93,
    reviews: 350,
    location: "Pusat Kota",
    distance: "5 min",
    priceFrom: 5000,
    latitude: -7.7963,
    longitude: 110.3695,
    images: [
      "https://images.unsplash.com/photo-1580992734408-b47c0c2c2f6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Supermarket grosir yang menjual segala kebutuhan rumah tangga...",
    details: {
      type: "Grosir",
      facilities: ["Parkir Luas", "Food Court", "Toilet"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 20,
    name: "Jamu Gendong Mbah Waginem",
    category: "Produk",
    subcategory: "Herbal",
    phone: "081112341234",
    priceRange: [3000, 10000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-11-01",
    reviewsList: [/* ... */],
    owner: {
      name: "Mbah Waginem",
      joined: "2024-07-01",
      verified: false,
    },
    rating: 98,
    reviews: 75,
    location: "Pasar Kranggan",
    distance: "5 min",
    priceFrom: 5000,
    latitude: -7.7844,
    longitude: 110.3668,
    images: [
      "https://images.unsplash.com/photo-1620921282046-e179e0a16c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1552392372-d591060b3780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Penjual jamu gendong tradisional dengan ramuan otentik...",
    details: {
      type: "Kaki Lima",
      facilities: ["Minum di tempat", "Bawa Pulang"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["fully_handmade", "natural_dyes", "female_founded", "preserves_cultural_heritage", "locally_sourced_materials", "empowers_women", "small_batch"]
  },
  {
    id: 21,
    name: "Soto Kadipiro",
    category: "Makanan",
    subcategory: "Soto",
    phone: "0274373192",
    priceRange: [12000, 25000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-29",
    reviewsList: [/* ... */],
    owner: {
      name: "Keluarga Kadipiro",
      joined: "2024-02-05",
      verified: true,
    },
    rating: 97,
    reviews: 550,
    location: "Jl. Wates",
    distance: "20 min",
    priceFrom: 15000,
    latitude: -7.8015,
    longitude: 110.3534,
    images: [
      "https://images.unsplash.com/photo-1587324438345-e8720c0c66fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1604251759491-3046f3378174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Soto ayam kampung legendaris dengan kuah bening...",
    details: {
      type: "Restoran",
      facilities: ["Parkir Luas", "Toilet", "Tempat Duduk Banyak"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "preserves_cultural_heritage"]
  },
  {
    id: 22,
    name: "Toko Perak Ansor",
    category: "Belanja",
    subcategory: "Kerajinan Perak",
    phone: "0274375107",
    priceRange: [50000, 5000000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-21",
    reviewsList: [/* ... */],
    owner: {
      name: "Ansor Silver",
      joined: "2024-03-15",
      verified: true,
    },
    rating: 96,
    reviews: 180,
    location: "Kotagede",
    distance: "25 min",
    priceFrom: 100000,
    latitude: -7.8282,
    longitude: 110.392,
    images: [
      "https://images.unsplash.com/photo-1611195325838-68811f267a57?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1611956414163-0c464b19c23f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Pusat kerajinan perak di Kotagede. ...",
    details: {
      type: "Toko Kerajinan",
      facilities: ["Workshop", "Showroom AC", "Parkir"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["hand_carved", "fully_handmade", "family_owned", "preserves_cultural_heritage", "small_batch", "made_to_order", "custom_orders"]
  },
  {
    id: 23,
    name: "Pijat Refleksi Sehat",
    category: "Jasa",
    subcategory: "Kebugaran",
    phone: "088812341234",
    priceRange: [60000, 150000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-27",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Sehat",
      joined: "2024-05-10",
      verified: false,
    },
    rating: 94,
    reviews: 90,
    location: "Jl. Kaliurang (Bawah)",
    distance: "15 min",
    priceFrom: 75000,
    latitude: -7.778,
    longitude: 110.3755,
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1617936132034-c3b8813d6404?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa pijat refleksi dan pijat tradisional untuk kebugaran. ...",
    details: {
      type: "Jasa Kebugaran",
      facilities: ["Ruangan AC", "Terapis Profesional", "Minuman Jahe"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 24,
    name: "Oseng Mercon Bu Narti",
    category: "Makanan",
    subcategory: "Pedas",
    phone: "081312341234",
    priceRange: [25000, 40000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-29",
    reviewsList: [/* ... */],
    owner: {
      name: "Bu Narti",
      joined: "2024-03-01",
      verified: true,
    },
    rating: 95,
    reviews: 600,
    location: "Jl. KH. Ahmad Dahlan",
    distance: "10 min",
    priceFrom: 25000,
    latitude: -7.8011,
    longitude: 110.362,
    images: [
      "https://images.unsplash.com/photo-1572695211072-a43b2323e05a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1604251759491-3046f3378174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Pelopor oseng-oseng super pedas (mercon) di Yogyakarta. ...",
    details: {
      type: "Warung Tenda",
      facilities: ["Lesehan", "Minuman Dingin"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["female_founded", "preserves_cultural_heritage", "small_batch", "family_owned"]
  },
  {
    id: 25,
    name: "Jejamuran",
    category: "Makanan",
    subcategory: "Restoran Unik",
    phone: "0274868172",
    priceRange: [15000, 40000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-25",
    reviewsList: [/* ... */],
    owner: {
      name: "Jejamuran",
      joined: "2024-02-28",
      verified: true,
    },
    rating: 97,
    reviews: 700,
    location: "Jl. Magelang (Agak Utara)",
    distance: "30 min",
    priceFrom: 20000,
    latitude: -7.731,
    longitude: 110.3582,
    images: [
      "https://images.unsplash.com/photo-1576686001018-30640f0c0211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1600185810766-9d3e7e311c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Restoran unik dengan semua menu terbuat dari jamur. ...",
    details: {
      type: "Restoran",
      facilities: ["Parkir Luas", "Toko Oleh-oleh Jamur", "Mushola"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["locally_sourced_materials", "small_batch", "family_owned"]
  },
  {
    id: 26,
    name: "Toko Mebel Rotan",
    category: "Produk",
    subcategory: "Mebel",
    phone: "081612341234",
    priceRange: [100000, 2000000],
    paymentMethods: ["Tunai", "Transfer Bank"],
    lastUpdated: "2025-10-19",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Rotan",
      joined: "2024-06-11",
      verified: false,
    },
    rating: 94,
    reviews: 50,
    location: "Jl. Prawirotaman",
    distance: "20 min",
    priceFrom: 150000,
    latitude: -7.8175,
    longitude: 110.371,
    images: [
      "https://images.unsplash.com/photo-1594026112273-091a079f6b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1618220790829-c88f71a0636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Pusat kerajinan mebel dan dekorasi rumah berbahan dasar rotan. ...",
    details: {
      type: "Toko Mebel",
      facilities: ["Workshop", "Showroom"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["fully_handmade", "locally_sourced_materials", "hand_woven", "custom_orders", "family_owned"]
  },
  {
    id: 27,
    name: "Cuci Sepatu Express",
    category: "Jasa",
    subcategory: "Cuci Sepatu",
    phone: "085712341234",
    priceRange: [30000, 100000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-30",
    reviewsList: [/* ... */],
    owner: {
      name: "Mas Clean",
      joined: "2024-04-12",
      verified: false,
    },
    rating: 96,
    reviews: 120,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 30000,
    latitude: -7.786,
    longitude: 110.3745,
    images: [
      "https://images.unsplash.com/photo-1551107696-a3b472d0b586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d18ab3437a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa cuci sepatu (sneakers, kanvas, kulit) profesional. ...",
    details: {
      type: "Jasa Cuci",
      facilities: ["Cuci Cepat", "Repaint", "Unyellowing"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 28,
    name: "Toko Oleh-Oleh Raminten",
    category: "Belanja",
    subcategory: "Oleh-oleh",
    phone: "0274512345",
    priceRange: [5000, 100000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-26",
    reviewsList: [/* ... */],
    owner: {
      name: "Raminten Group",
      joined: "2024-02-19",
      verified: true,
    },
    rating: 95,
    reviews: 250,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 10000,
    latitude: -7.7839,
    longitude: 110.372,
    images: [
      "https://images.unsplash.com/photo-1582298538104-fe2e74c2d561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1599586120428-c6f34a26e033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko oleh-oleh yang menjual pernak-pernik unik...",
    details: {
      type: "Toko Oleh-oleh",
      facilities: ["AC", "Parkir"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "preserves_cultural_heritage", "female_founded"]
  },
  {
    id: 29,
    name: "Wedang Ronde Mbah Payem",
    category: "Makanan",
    subcategory: "Minuman",
    phone: "081412341234",
    priceRange: [8000, 10000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-10-27",
    reviewsList: [/* ... */],
    owner: {
      name: "Mbah Payem",
      joined: "2024-03-12",
      verified: false,
    },
    rating: 97,
    reviews: 200,
    location: "Jl. Kauman",
    distance: "10 min",
    priceFrom: 8000,
    latitude: -7.803,
    longitude: 110.364,
    images: [
      "https://images.unsplash.com/photo-1588785292021-d7f02d515a40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1630440533342-6031d7e296a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Wedang Ronde legendaris yang menjadi langganan Sultan. ...",
    details: {
      type: "Kaki Lima",
      facilities: ["Lesehan"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["female_founded", "preserves_cultural_heritage", "small_batch", "family_owned"]
  },
  {
    id: 30,
    name: "Jasa Lukis Wajah Malioboro",
    category: "Jasa",
    subcategory: "Seni",
    phone: "081712341234",
    priceRange: [50000, 200000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-20",
    reviewsList: [/* ... */],
    owner: {
      name: "Komunitas Pelukis",
      joined: "2024-07-07",
      verified: false,
    },
    rating: 93,
    reviews: 60,
    location: "Jl. Malioboro",
    distance: "0 min",
    priceFrom: 100000,
    latitude: -7.7935,
    longitude: 110.3655,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1482160549825-59ac1b23cb6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Para seniman jalanan yang menawarkan jasa lukis sketsa wajah cepat...",
    details: {
      type: "Jasa Seni",
      facilities: ["Lukis di Tempat", "Bisa Pesan"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["fully_handmade", "made_to_order", "personalizable", "custom_orders", "community_empowerment"]
  },
  {
    id: 31,
    name: "Kerajinan Kulit Asli",
    category: "Produk",
    subcategory: "Kerajinan Kulit",
    phone: "081222333444",
    priceRange: [50000, 500000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-22",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Kulit",
      joined: "2024-04-18",
      verified: false,
    },
    rating: 95,
    reviews: 110,
    location: "Jl. Malioboro",
    distance: "1 min",
    priceFrom: 70000,
    latitude: -7.794,
    longitude: 110.3657,
    images: [
      "https://images.unsplash.com/photo-1605812863642-19e98b0a96b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1524580323223-a589077271b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko yang menjual berbagai produk kerajinan kulit asli...",
    details: {
      type: "Toko Kerajinan",
      facilities: ["Bisa Custom", "Showroom"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["fully_handmade", "small_batch", "locally_sourced_materials", "personalizable", "custom_orders"]
  },
  {
    id: 32,
    name: "Rujak Es Krim Pak Nardi",
    category: "Makanan",
    subcategory: "Dessert",
    phone: "081333444555",
    priceRange: [10000, 15000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-28",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Nardi",
      joined: "2024-03-25",
      verified: false,
    },
    rating: 96,
    reviews: 210,
    location: "Pakualaman",
    distance: "15 min",
    priceFrom: 10000,
    latitude: -7.8018,
    longitude: 110.375,
    images: [
      "https://images.unsplash.com/photo-1615478503195-039c4c70b8f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Kombinasi unik rujak buah segar dengan es krim puter...",
    details: {
      type: "Kaki Lima",
      facilities: ["Area Duduk Terbatas"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["small_batch", "family_owned"]
  },
  {
    id: 33,
    name: "Toko Mas Kranggan",
    category: "Belanja",
    subcategory: "Perhiasan",
    phone: "0274512121",
    priceRange: [300000, 10000000],
    paymentMethods: ["Tunai", "Debit", "Transfer Bank"],
    lastUpdated: "2025-10-23",
    reviewsList: [/* ... */],
    owner: {
      name: "Keluarga Kranggan",
      joined: "2024-02-11",
      verified: true,
    },
    rating: 94,
    reviews: 85,
    location: "Pasar Kranggan",
    distance: "5 min",
    priceFrom: 500000,
    latitude: -7.7842,
    longitude: 110.3665,
    images: [
      "https://images.unsplash.com/photo-1606802236881-b7de9c6a0b99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1611860363533-8ade5f4d88a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko perhiasan emas dengan model lengkap dan harga bersaing. ...",
    details: {
      type: "Toko Perhiasan",
      facilities: ["Terima Jual Beli", "Sertifikat"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 34,
    name: "Servis Laptop Cepat",
    category: "Jasa",
    subcategory: "Servis Elektronik",
    phone: "089912341234",
    priceRange: [50000, 500000],
    paymentMethods: ["Tunai", "QRIS", "Transfer Bank"],
    lastUpdated: "2025-10-29",
    reviewsList: [/* ... */],
    owner: {
      name: "Mas Tekno",
      joined: "2024-05-01",
      verified: false,
    },
    rating: 95,
    reviews: 130,
    location: "Jl. Godean (Dekat Kota)",
    distance: "15 min",
    priceFrom: 50000,
    latitude: -7.7895,
    longitude: 110.355,
    images: [
      "https://images.unsplash.com/photo-1587573089734-09cb69c0f11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa perbaikan laptop, instal ulang, dan upgrade hardware. ...",
    details: {
      type: "Servis Elektronik",
      facilities: ["Gratis Cek Kerusakan", "Garansi Servis"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 35,
    name: "Gudeg Pawon",
    category: "Makanan",
    subcategory: "Gudeg Tradisional",
    phone: "081212345678",
    priceRange: [20000, 35000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-10-26",
    reviewsList: [/* ... */],
    owner: {
      name: "Keluarga Gudeg Pawon",
      joined: "2024-03-10",
      verified: true,
    },
    rating: 98,
    reviews: 650,
    location: "Dekat UTY Glagahsari",
    distance: "20 min",
    priceFrom: 20000,
    latitude: -7.8105,
    longitude: 110.3845,
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1981&q=80",
    ],
    description:
      "Pengalaman unik makan gudeg otentik langsung dari 'pawon' (dapur). ...",
    details: {
      type: "Warung Makan",
      facilities: ["Suasana Tradisional", "Antri"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "preserves_cultural_heritage", "small_batch", "locally_sourced_materials"]
  },
  {
    id: 36,
    name: "Toko Kain Kiloan",
    category: "Belanja",
    subcategory: "Kain",
    phone: "0274371234",
    priceRange: [20000, 100000],
    paymentMethods: ["Tunai", "Debit"],
    lastUpdated: "2025-10-17",
    reviewsList: [/* ... */],
    owner: {
      name: "Toko Kain",
      joined: "2024-04-20",
      verified: false,
    },
    rating: 93,
    reviews: 70,
    location: "Jl. Bantul (Bawah)",
    distance: "20 min",
    priceFrom: 25000,
    latitude: -7.82,
    longitude: 110.36,
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Menjual berbagai macam kain sisa garmen secara kiloan. ...",
    details: {
      type: "Toko Kain",
      facilities: ["Banyak Pilihan", "Parkir"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 37,
    name: "Perlengkapan Jahit Benang Emas",
    category: "Produk",
    subcategory: "Alat Jahit",
    phone: "0274511222",
    priceRange: [1000, 50000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-24",
    reviewsList: [/* ... */],
    owner: {
      name: "Benang Emas",
      joined: "2024-03-18",
      verified: false,
    },
    rating: 94,
    reviews: 45,
    location: "Dekat Pasar Beringharjo",
    distance: "3 min",
    priceFrom: 2000,
    latitude: -7.7988,
    longitude: 110.367,
    images: [
      "https://images.unsplash.com/photo-1517694466633-f7d7c6f0e4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1599723002633-87f583095034?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko kecil yang menjual segala kebutuhan menjahit. ...",
    details: {
      type: "Toko Alat Jahit",
      facilities: ["Lengkap"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 38,
    name: "House of Raminten",
    category: "Makanan",
    subcategory: "Restoran Unik",
    phone: "0274547315",
    priceRange: [5000, 40000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-29",
    reviewsList: [/* ... */],
    owner: {
      name: "Raminten Group",
      joined: "2024-02-19",
      verified: true,
    },
    rating: 96,
    reviews: 1100,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 15000,
    latitude: -7.784,
    longitude: 110.3722,
    images: [
      "https://images.unsplash.com/photo-1549488344-1f9b8d243a93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Restoran dengan konsep Jawa yang sangat kental. ...",
    details: {
      type: "Restoran",
      facilities: ["Suasana Unik", "Toilet", "Spot Foto", "Buka 24 Jam (TBC)"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "preserves_cultural_heritage", "female_founded"]
  },
  {
    id: 39,
    name: "Penjahit Jas Rapi",
    category: "Jasa",
    subcategory: "Tailor",
    phone: "081111222333",
    priceRange: [800000, 3000000],
    paymentMethods: ["Tunai", "Transfer Bank"],
    lastUpdated: "2025-10-21",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Rapi",
      joined: "2024-04-14",
      verified: false,
    },
    rating: 97,
    reviews: 80,
    location: "Jl. C. Simanjuntak",
    distance: "15 min",
    priceFrom: 1000000,
    latitude: -7.7788,
    longitude: 110.3721,
    images: [
      "https://images.unsplash.com/photo-1593030103057-01a40b99176f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1497032628192-86f99079de7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Jasa jahit (tailor) khusus jas pria. ...",
    details: {
      type: "Tailor",
      facilities: ["Pengukuran di Tempat", "Pilihan Kain"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["made_to_order", "custom_orders", "fully_handmade", "family_owned"]
  },
  {
    id: 40,
    name: "Ayam Goreng Bu Tini",
    category: "Makanan",
    subcategory: "Ayam Goreng",
    phone: "0274511111",
    priceRange: [20000, 35000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-28",
    reviewsList: [/* ... */],
    owner: {
      name: "Bu Tini",
      joined: "2024-02-25",
      verified: true,
    },
    rating: 95,
    reviews: 320,
    location: "Dekat Tugu",
    distance: "5 min",
    priceFrom: 22000,
    latitude: -7.781,
    longitude: 110.368,
    images: [
      "https://images.unsplash.com/photo-1626645737525-375da14d5138?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1562967914-01efa7e87832?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Ayam goreng kampung empuk dengan kremesan gurih. ...",
    details: {
      type: "Restoran",
      facilities: ["Parkir", "Toilet", "Lalapan Ambil Sendiri"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["female_founded", "family_owned", "preserves_cultural_heritage"]
  },
  {
    id: 41,
    name: "Toko Wayang Kulit",
    category: "Produk",
    subcategory: "Kerajinan Kulit",
    phone: "081222333555",
    priceRange: [30000, 2000000],
    paymentMethods: ["Tunai", "Transfer Bank"],
    lastUpdated: "2025-10-20",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Dalang",
      joined: "2024-04-22",
      verified: false,
    },
    rating: 96,
    reviews: 60,
    location: "Kraton",
    distance: "10 min",
    priceFrom: 50000,
    latitude: -7.806,
    longitude: 110.365,
    images: [
      "https://images.unsplash.com/photo-1624622089339-a8c6f2f0c7e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1624622089304-45330368310e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Menjual wayang kulit asli berbagai ukuran...",
    details: {
      type: "Toko Kerajinan",
      facilities: ["Workshop", "Edukasi Singkat"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["fully_handmade", "hand_carved", "preserves_cultural_heritage", "family_owned", "made_to_order", "custom_orders", "personalizable"]
  },
  {
    id: 42,
    name: "Es Buah PK",
    category: "Makanan",
    subcategory: "Dessert",
    phone: "081555666777",
    priceRange: [10000, 15000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-29",
    reviewsList: [/* ... */],
    owner: {
      name: "Keluarga PK",
      joined: "2024-03-02",
      verified: false,
    },
    rating: 95,
    reviews: 280,
    location: "Pakualaman",
    distance: "15 min",
    priceFrom: 10000,
    latitude: -7.801,
    longitude: 110.3755,
    images: [
      "https://images.unsplash.com/photo-1600091323386-e4a6b10a20f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1504439031068-01d00c3c6f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Es buah legendaris dengan isian komplit...",
    details: {
      type: "Kaki Lima",
      facilities: ["Banyak Pilihan Topping", "Area Duduk"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned", "small_batch"]
  },
  {
    id: 43,
    name: "Pusat Gerabah Kasongan",
    category: "Belanja",
    subcategory: "Kerajinan Gerabah",
    phone: "0274371111",
    priceRange: [5000, 1000000],
    paymentMethods: ["Tunai", "QRIS (Sebagian Tenant)"],
    lastUpdated: "2025-10-18",
    reviewsList: [/* ... */],
    owner: {
      name: "Paguyuban Kasongan",
      joined: "2024-02-01",
      verified: true,
    },
    rating: 97,
    reviews: 400,
    location: "Kasongan (Agak ke Selatan)",
    distance: "30 min",
    priceFrom: 5000,
    latitude: -7.846,
    longitude: 110.3472,
    images: [
      "https://images.unsplash.com/photo-1549033391-8c1c463e5b33?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1578904764805-7f5378130835?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Desa wisata yang menjadi pusat kerajinan gerabah dan keramik...",
    details: {
      type: "Pasar Kerajinan",
      facilities: ["Banyak Showroom", "Workshop", "Parkir Luas"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["community_empowerment", "fully_handmade", "locally_sourced_materials", "rural_community", "preserves_cultural_heritage", "custom_orders"]
  },
  {
    id: 44,
    name: "Bengkel Motor Pak Man",
    category: "Jasa",
    subcategory: "Bengkel",
    phone: "081212123434",
    priceRange: [15000, 300000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-25",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Man",
      joined: "2024-05-16",
      verified: false,
    },
    rating: 94,
    reviews: 115,
    location: "Jl. Bantul",
    distance: "20 min",
    priceFrom: 20000,
    latitude: -7.818,
    longitude: 110.3615,
    images: [
      "https://images.unsplash.com/photo-1581223681816-a09e1ac7c86a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1621644752281-0f7238a063c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Bengkel umum non-resmi yang jujur dan terpercaya. ...",
    details: {
      type: "Bengkel",
      facilities: ["Ganti Oli", "Servis Ringan", "Tambal Ban"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["family_owned"]
  },
  {
    id: 45,
    name: "Toko Klontong Bu Sri",
    category: "Belanja",
    subcategory: "Warung",
    phone: "0274371122",
    priceRange: [1000, 50000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-11-01",
    reviewsList: [/* ... */],
    owner: {
      name: "Bu Sri",
      joined: "2024-01-11",
      verified: false,
    },
    rating: 93,
    reviews: 50,
    location: "Ngampilan",
    distance: "10 min",
    priceFrom: 1000,
    latitude: -7.8025,
    longitude: 110.359,
    images: [
      "https://images.unsplash.com/photo-1590300136236-01f301402a7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1588977221655-6638549e623c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Warung kelontong yang menjual kebutuhan sehari-hari...",
    details: {
      type: "Warung",
      facilities: ["Lengkap", "Harga Eceran"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["female_founded", "family_owned"]
  },
  {
    id: 46,
    name: "Lesehan Terang Bulan",
    category: "Makanan",
    subcategory: "Lesehan",
    phone: "081888777666",
    priceRange: [15000, 30000],
    paymentMethods: ["Tunai"],
    lastUpdated: "2025-10-24",
    reviewsList: [/* ... */],
    owner: {
      name: "Pak Kumis",
      joined: "2024-08-01",
      verified: false,
    },
    rating: 92,
    reviews: 180,
    location: "Jl. Malioboro",
    distance: "0 min",
    priceFrom: 20000,
    latitude: -7.7945,
    longitude: 110.3658,
    images: [
      "https://images.unsplash.com/photo-1604251759491-3046f3378174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Salah satu dari banyak warung lesehan di Malioboro...",
    details: {
      type: "Lesehan",
      facilities: ["Makan di Tempat", "Live Music (Musisi Jalanan)"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 47,
    name: "Gramedia Sudirman",
    category: "Belanja",
    subcategory: "Toko Buku",
    phone: "0274561234",
    priceRange: [10000, 500000],
    paymentMethods: ["Tunai", "QRIS", "Debit", "Kartu Kredit"],
    lastUpdated: "2025-10-25",
    reviewsList: [/* ... */],
    owner: {
      name: "Gramedia",
      joined: "2024-01-15",
      verified: true,
    },
    rating: 96,
    reviews: 500,
    location: "Jl. Jend. Sudirman",
    distance: "10 min",
    priceFrom: 10000,
    latitude: -7.7836,
    longitude: 110.3705,
    images: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1533669061430-65c2e0d7b835?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Toko buku Gramedia terbesar di Yogyakarta. ...",
    details: {
      type: "Toko Buku",
      facilities: ["AC", "Kafe", "Alat Tulis", "Parkir"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 48,
    name: "Klinik Hewan Jogja",
    category: "Jasa",
    subcategory: "Klinik Hewan",
    phone: "0274555666",
    priceRange: [80000, 1000000],
    paymentMethods: ["Tunai", "QRIS", "Debit"],
    lastUpdated: "2025-10-30",
    reviewsList: [/* ... */],
    owner: {
      name: "Drh. Hewan",
      joined: "2024-03-30",
      verified: true,
    },
    rating: 97,
    reviews: 160,
    location: "Jl. Kaliurang (Bawah)",
    distance: "15 min",
    priceFrom: 80000,
    latitude: -7.7765,
    longitude: 110.376,
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1596797882510-0da13101d21c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Klinik dokter hewan 24 jam dengan fasilitas UGD...",
    details: {
      type: "Klinik Hewan",
      facilities: ["Dokter Jaga", "Grooming", "Pet Shop"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: []
  },
  {
    id: 49,
    name: "Toko Jamu Instan",
    category: "Produk",
    subcategory: "Herbal",
    phone: "081999888777",
    priceRange: [8000, 50000],
    paymentMethods: ["Tunai", "QRIS"],
    lastUpdated: "2025-10-21",
    reviewsList: [/* ... */],
    owner: {
      name: "Toko Herbal",
      joined: "2024-05-20",
      verified: false,
    },
    rating: 94,
    reviews: 70,
    location: "Pasar Beringharjo",
    distance: "2 min",
    priceFrom: 10000,
    latitude: -7.7986,
    longitude: 110.366,
    images: [
      "https://images.unsplash.com/photo-1556706990-0f31750c48d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1620921282046-e179e0a16c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Menjual berbagai macam jamu dan rempah dalam bentuk bubuk instan. ...",
    details: {
      type: "Toko Herbal",
      facilities: ["Bisa Kirim", "Lengkap"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["locally_sourced_materials", "natural_dyes", "preserves_cultural_heritage", "small_batch"]
  },
  {
    id: 50,
    name: "Jasa Desain Grafis 'Logo Cepat'",
    category: "Jasa",
    subcategory: "Desain",
    phone: "085112341234",
    priceRange: [150000, 500000],
    paymentMethods: ["Transfer Bank", "QRIS"],
    lastUpdated: "2025-10-28",
    reviewsList: [/* ... */],
    owner: {
      name: "Mas Grafis",
      joined: "2024-08-15",
      verified: false,
    },
    rating: 95,
    reviews: 40,
    location: "Kotabaru",
    distance: "10 min",
    priceFrom: 200000,
    latitude: -7.7855,
    longitude: 110.3735,
    images: [
      "https://images.unsplash.com/photo-1609921141834-7d169ae659e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1611162617213-7d724e0f2042?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
    ],
    description:
      "Freelancer jasa desain logo, brosur, dan kebutuhan branding UMKM. ...",
    details: {
      type: "Jasa Desain",
      facilities: ["Konsultasi Online", "Revisi 3x"],
    },
    // --- TAGS DITAMBAHKAN ---
    tags: ["social_enterprise", "personalizable", "custom_orders", "made_to_order"]
  },
];