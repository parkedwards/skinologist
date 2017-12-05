const pg = require('pg');
const config = require('./config');

console.log(config);
const pool = new pg.Pool(config);

pool.connect(err => {
  if (err) console.error(err);
  else console.log('Connected to SKINOLOGY-DB!');
});

pool.query(`
  CREATE TABLE IF NOT EXISTS "ingredients_main" (
    _id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    description JSONB,
    benefits JSONB,
    how JSONB,
    notes JSONB
  )
`);

pool.query(`
  CREATE TABLE IF NOT EXISTS "ings_cats" (
    ing_id INTEGER,
    cat_id INTEGER
  )
`);

pool.query(`
  CREATE TABLE IF NOT EXISTS "categories_main" (
    _id SERIAL PRIMARY KEY,
    name VARCHAR(100)
  )
`);

module.exports = pool;
