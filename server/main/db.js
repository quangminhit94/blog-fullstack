const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: 'dbname3.cz1sxf44hjhp.us-east-2.rds.amazonaws.com',
  database: 'dbname3',
  password: 'postgres',
  post: 5432,
  ssl: {
    rejectUnauthorized : false,
    ca   : fs.readFileSync("keypair1.pem").toString(),
    key  : fs.readFileSync("keypair1.pem").toString(),
    cert : fs.readFileSync("keypair1.pem").toString(),
  }
})

module.exports = pool