const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

require('colors');
require('dotenv').config();

const db = require('./server/db');

// tables
(async () => {
  try {
    // transaction
    await db.query('BEGIN');

    await db.query(`
      CREATE TABLE IF NOT EXISTS ingredients (
        _id SERIAL PRIMARY KEY,
        name VARCHAR(80),
        what_is_it JSONB,
        key_benefits JSONB,
        side_effects JSONB,
        how_to_wear JSONB,
        who_can_use JSONB
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        _id SERIAL PRIMARY KEY,
        name VARCHAR(80)
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ing_cat (
        _id SERIAL PRIMARY KEY,
        ing_id INTEGER,
        cat_id INTEGER
      )
    `);
    await db.query('COMMIT');
  } catch (error) {
    console.log('<----- ERROR with Table Creation ----->'.bold.red);
    await db.query('ROLLBACK');
  }
})();

// categories
(async () => {
  try {
    const readFile = promisify(fs.readFile);
    const data = JSON.parse(await readFile(path.join(__dirname, '/data.json'), 'utf8'));

    const preFormatted = data
      .map(ing => ing['Product Category'] || null)
      .filter(arr => arr != null && arr[0] !== '')
      .reduce((arr, chunk) => [...arr, ...chunk], []);

    // unique
    const categories = Array.from(new Set(preFormatted));

    categories.forEach(async category => {
      const query = {
        text: 'INSERT INTO categories(name) VALUES($1)',
        values: [category],
      };

      try {
        await db.query(query);
        console.log('category inserted successfully'.green);
        console.log(category);
      } catch (error) {
        console.log('----------------------------------------->');
        console.log('issue inserting category'.red);
        console.log(error);
        console.log(category);
      }
    });
  } catch (error) {
    console.log('<----- ERROR with categories INSERTS ----->'.bold.red);
  }
})();
