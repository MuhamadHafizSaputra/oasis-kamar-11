// seed.js
import 'dotenv/config';
import db from './db.js';
import { umkmData } from './mockData.js'; // Pastikan Anda sudah me-rename file data Anda

async function seedDatabase() {
  try {
    console.log('Menghubungkan ke database...');
    await db.connect();
    
    console.log('Menghapus data lama...');
    // Kita hapus dengan urutan terbalik (child dulu, baru parent)
    await db.query('DELETE FROM products');
    await db.query('DELETE FROM reviews');
    await db.query('DELETE FROM umkm');

    console.log('Memasukkan data baru...');

    // Kita gunakan 'for...of' agar bisa menggunakan 'await' di dalamnya
    for (const umkm of umkmData) {
      
      // 1. Masukkan ke tabel 'umkm'
      const umkmQuery = `
        INSERT INTO umkm (
          id, name, category, subcategory, phone, price_min, price_max, 
          owner, rating, reviews, location, latitude, longitude, 
          images, description, details, tags, video_url
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
        ) RETURNING id;
      `;
      
      // Pastikan kolom di database Anda adalah JSONB atau TEXT
      const umkmValues = [
        umkm.id,
        umkm.name,
        umkm.category,
        umkm.subcategory,
        umkm.phone,
        umkm.priceRange[0], // price_min
        umkm.priceRange[1], // price_max
        JSON.stringify(umkm.owner), // Asumsi kolom 'owner' adalah JSONB/TEXT
        umkm.rating,
        umkm.reviews,
        umkm.location,
        umkm.latitude,
        umkm.longitude,
        JSON.stringify(umkm.images), // Asumsi kolom 'images' adalah JSONB/TEXT
        umkm.description,
        JSON.stringify(umkm.details), // Asumsi kolom 'details' adalah JSONB/TEXT
        JSON.stringify(umkm.tags),     // Asumsi kolom 'tags' adalah JSONB/TEXT
        umkm.video_url
      ];

      const newUmkm = await db.query(umkmQuery, umkmValues);
      const newUmkmId = newUmkm.rows[0].id;
      
      console.log(`- Memasukkan UMKM: ${umkm.name} (ID: ${newUmkmId})`);

      // 2. Masukkan ke tabel 'products'
      if (umkm.products && umkm.products.length > 0) {
        for (const product of umkm.products) {
          const productQuery = `
            INSERT INTO products (umkm_id, name, price, description, image_url) 
            VALUES ($1, $2, $3, $4, $5)
          `;
          await db.query(productQuery, [
            newUmkmId, 
            product.name, 
            product.price, 
            product.description, 
            product.image_url
          ]);
        }
        console.log(`  > ${umkm.products.length} produk dimasukkan.`);
      }

      // 3. Masukkan ke tabel 'reviews'
      if (umkm.reviewsList && umkm.reviewsList.length > 0) {
        for (const review of umkm.reviewsList) {
          // "user" adalah kata kunci SQL, jadi kita gunakan tanda kutip ganda
          const reviewQuery = `
            INSERT INTO reviews (umkm_id, "user", rating, text, date) 
            VALUES ($1, $2, $3, $4, $5)
          `;
          await db.query(reviewQuery, [
            newUmkmId, 
            review.user, 
            review.rating, 
            review.text, 
            new Date(review.date) // Konversi string tanggal ke objek Date
          ]);
        }
        console.log(`  > ${umkm.reviewsList.length} ulasan dimasukkan.`);
      }
    }

    console.log('Seeding selesai!');

  } catch (err) {
    console.error('Error saat seeding database:', err);
  } finally {
    await db.end(); // Tutup koneksi
    console.log('Koneksi database ditutup.');
  }
}

// Jalankan fungsi seeding
seedDatabase();