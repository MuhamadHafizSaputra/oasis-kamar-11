import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sedulurkita_db',
  password: '021004', // ganti sesuai
  port: 5432
});

export default pool;
