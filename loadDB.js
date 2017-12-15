const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

require('colors');
require('dotenv').config();

const db = require('./server/db');

// db.query(`DROP TABLE ingredients`);

(async () => {
  try {
    await db.query('BEGIN');
    await db.query(`
      CREATE TABLE IF NOT EXISTS ingredients (
        _id SERIAL PRIMARY KEY,
        name VARCHAR(80)
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS ing_tags (
        _id SERIAL PRIMARY KEY,
        ing_id INTEGER,
        tag_id INTEGER
      )
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS tags (
        _id SERIAL PRIMARY KEY,
        ing_id INTEGER,
        tag_id INTEGER
      )
    `);
    await db.query('COMMIT');
  } catch (error) {
    console.log('<----- ERROR with Table Creation ----->'.bold.red);
    await db.query('ROLLBACK');
  }
})();

(async () => {
  try {
    const readFile = promisify(fs.readFile);
    const data = await readFile(path.join(__dirname, '/data.json'), 'utf8');
    console.log(data);
    await db.query('BEGIN');

    await db.query('COMMIT');
  } catch (error) {
    console.log('<----- ERROR with INSERTS ----->'.bold.red);
    await db.query('ROLLBACK');
  }
})();
