// server.js
import 'dotenv/config'; // BARIS INI PALING ATAS
import express from 'express';
import cors from 'cors';
import db from './db.js';
// HAPUS 'import axios from 'axios';'

const app = express();
const port = 3001;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- API ENDPOINTS ---

// HAPUS SEMUA ENDPOINT '/api/geocode' (MAPBOX) DARI SINI

// 1. Endpoint untuk HomePage.jsx (Featured)
// (Tidak berubah)
app.get('/api/umkm/featured', async (req, res) => {
  console.log("Request received for /api/umkm/featured");
  try {
    const query = 'SELECT * FROM umkm ORDER BY id LIMIT 2';
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching featured UMKM:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Endpoint untuk Pencarian (MapGeocoder & SearchBar)
app.get('/api/umkm/search', async (req, res) => {
  const { q, lat, lon } = req.query;

  if (!q) {
    return res.json([]);
  }

  console.log(`Searching (Smart) for: ${q}`);

  try {
    let query;
    let queryParams = [`%${q}%`]; // $1
    
    // --- PERBAIKAN DI SINI ---
    // Hapus 'OR description ILIKE $1' DAN 'OR location ILIKE $1'
    
    if (lat && lon) {
      console.log(`Calculating distance from: ${lat}, ${lon}`);
      query = `
        SELECT *, 
          ( 6371 * acos(
            cos( radians($2) )
            * cos( radians( latitude ) )
            * cos( radians( longitude ) - radians($3) )
            + sin( radians($2) )
            * sin( radians( latitude ) )
          ) ) AS calculated_distance 
        FROM umkm
        WHERE 
            name ILIKE $1 
            OR category ILIKE $1
            OR subcategory ILIKE $1
        ORDER BY calculated_distance ASC; 
      `;
      queryParams.push(lat, lon); // $2 dan $3
    } else {
      query = `
        SELECT * FROM umkm
        WHERE 
            name ILIKE $1 
            OR category ILIKE $1
            OR subcategory ILIKE $1;
      `;
    }
    // --- AKHIR PERBAIKAN ---

    const result = await db.query(query, queryParams);
    res.json(result.rows);

  } catch (err) {
    console.error("Error searching UMKM:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Endpoint untuk ProfilePage.jsx
// (Tidak berubah)
app.get('/api/umkm/:id', async (req, res) => {
  const { id } = req.params;
  
  if (isNaN(id)) {
      return res.status(400).json({ error: 'ID must be a number' });
  }

  try {
    const umkmQuery = 'SELECT * FROM umkm WHERE id = $1';
    const reviewsQuery = 'SELECT * FROM reviews WHERE umkm_id = $1';
    const productsQuery = 'SELECT * FROM products WHERE umkm_id = $1';
    
    const [umkmResult, reviewsResult, productsResult] = await Promise.all([
      db.query(umkmQuery, [id]),
      db.query(reviewsQuery, [id]),
      db.query(productsQuery, [id])
    ]);

    if (umkmResult.rows.length === 0) {
      return res.status(404).json({ error: 'UMKM not found' });
    }
    
    const umkm = umkmResult.rows[0];
    umkm.reviewsList = reviewsResult.rows;
    umkm.products = productsResult.rows; 

    res.json(umkm);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. Endpoint untuk ListPage.jsx (DynamicDataLoader)
// (Tidak berubah)
app.get('/api/umkm', async (req, res) => {
  const { minLng, minLat, maxLng, maxLat } = req.query;
  try {
    const query = `
      SELECT * FROM umkm 
      WHERE longitude >= $1 AND longitude <= $2 
      AND latitude >= $3 AND latitude <= $4
    `;
    const result = await db.query(query, [minLng, maxLng, minLat, maxLat]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});