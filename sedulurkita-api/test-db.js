const pool = require('./db')

pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Connected to PostgreSQL!')
    console.log(res.rows)
  })
  .catch(err => {
    console.error('❌ Connection failed:', err)
  })
  .finally(() => {
    pool.end()
  })
