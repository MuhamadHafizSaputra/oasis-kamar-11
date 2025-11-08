// seed.js
import db from './db.js';
import { umkmData } from './mockData.js';
// !!! PENTING: Ganti path ini agar menunjuk ke file mockData.jsx Anda
// src/data/mockData.jsx
async function seedDatabase() {
  try {
    for (const item of umkmData) {
      const result = await db.query(
        `INSERT INTO umkm 
          (name, category, subcategory, phone, price_range_min, price_range_max, payment_methods, last_updated, owner_name, owner_joined, owner_verified, rating, reviews, location, distance, price_from, latitude, longitude, images, description, details_type, details_facilities, tags)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)
        RETURNING id`,
        [
          item.name,
          item.category,
          item.subcategory,
          item.phone,
          item.priceRange[0],
          item.priceRange[1],
          item.paymentMethods,
          item.lastUpdated,
          item.owner.name,
          item.owner.joined,
          item.owner.verified,
          item.rating,
          item.reviews,
          item.location,
          item.distance,
          item.priceFrom,
          item.latitude,
          item.longitude,
          item.images,
          item.description,
          item.details.type,
          item.details.facilities,
          item.tags ?? []  // <--- tambahkan ini
        ]
      );

      const umkmId = result.rows[0].id;

      for (const review of item.reviewsList) {
        await db.query(
          `INSERT INTO reviews (umkm_id, user_name, rating, review_text, review_date)
           VALUES ($1,$2,$3,$4,$5)`,
          [umkmId, review.user, review.rating, review.text, review.date]
        );
      }
    }

    console.log("✅ Seeding selesai.");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    db.end();
  }
}

seedDatabase();
