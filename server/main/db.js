const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'dbname3.cz1sxf44hjhp.us-east-2.rds.amazonaws.com',
  database: 'dbname3',
  password: 'dbname3',
  post: 5432,
  ssl: true
})

module.exports = pool