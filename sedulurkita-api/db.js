// db.js
import pg from 'pg';

// Connect to your local database
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sedulurkita_db', // The database you created
  password: 'rahasia',
  port: 5432,
});

export default pool;