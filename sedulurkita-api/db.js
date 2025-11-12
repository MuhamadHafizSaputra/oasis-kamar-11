// db.js (BARU)
import 'dotenv/config'; 
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // --- TAMBAHKAN BARIS INI ---
  family: 4, // Memaksa koneksi melalui IPv4
  // ---------------------------
});

export default {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
  end: () => pool.end(),
};