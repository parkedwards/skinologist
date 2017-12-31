const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const chalk = require('chalk');

const { log } = console;
const readFile = promisify(fs.readFile);

// db stuff
require('dotenv').config();
const db = require('./server/db');

// tables
(async () => {
  // [------------ DROP TABLES (dev) ----------------]
  try {
    // TO DO: REMOVE WHEN DOING LIVE RUN
    await db.query('DROP TABLE ingredients');
    await db.query('DROP TABLE categories');
    await db.query('DROP TABLE ing_cat');
  } catch (error) {
    log(chalk.red('<< error dropping tables >>'));
    log(error);
  }

  try {
    // transaction to create tables
    await db.query('BEGIN');
    await db.query(`
      CREATE TABLE IF NOT EXISTS ingredients (
        _id SERIAL PRIMARY KEY,
        name VARCHAR(80),
        symptoms JSONB,
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

    // [------------ START INSERTS ----------------]
    // read data.json
    const data = JSON.parse(await readFile(path.join(__dirname, '/data.json'), 'utf8'));

    // "global" id reference for cross inserts :(
    const idStorage = {
      ingredients: {},
      categories: {},
    };

    // [ --------------- CATEGORIES --------------- ]
    const preFormatted = data
      .map(ing => ing['Product Category'] || null)
      .filter(arr => arr != null && arr[0] !== '')
      .reduce((arr, chunk) => [...arr, ...chunk], []);

    // unique categories
    const categories = Array.from(new Set(preFormatted));
    const cat_inserts = categories.map(categoryName =>
      (async () => {
        const category_cleansed = normalizeInput(categoryName, true);
        const query = `
          INSERT INTO categories(name) SELECT '${category_cleansed}'
          WHERE NOT EXISTS (
            SELECT name FROM categories WHERE name = '${category_cleansed}'
          )
          RETURNING *;
        `;

        try {
          const { rows } = await db.query(query);
          const { name, _id } = rows[0];

          idStorage.categories[name] = _id; // add to idStorage

          log('----------------------------------------->');
          log(chalk.cyan('category inserted successfully: '), chalk.green(name));
        } catch (error) {
          log('----------------------------------------->');
          log(chalk.red('issue inserting category: '), chalk.red(category_cleansed));
          log(error);
        }
      })());

    await Promise.all(cat_inserts);

    // [ --------------- INGREDIENTS --------------- ]
    const ing_inserts = data.map(ing =>
      (async () => {
        const {
          Name,
          Symptoms,
          'What is it?': WhatIsIt,
          'Key Benefits': Benefits,
          'Side Effects': Effects,
          'When / How to Wear?': How,
          'Who can use it?': Who,
          'Product Category': Category,
        } = ing;

        const name_cleansed = normalizeInput(Name, true);

        const text = `
          INSERT INTO ingredients(name, symptoms, what_is_it, key_benefits, side_effects, how_to_wear, who_can_use) VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
        const values = [
          name_cleansed,
          normalizeInput(Symptoms),
          normalizeInput(WhatIsIt),
          normalizeInput(Benefits),
          normalizeInput(Effects),
          normalizeInput(How),
          normalizeInput(Who),
        ];

        const query = { text, values };

        try {
          const { rows } = await db.query(query);
          const { name, _id } = rows[0];

          idStorage.ingredients[name] = _id;

          log('----------------------------------------->');
          log(chalk.magenta('ingredient inserted successfully: '), chalk.green(name));

          // [ --------------- CAT MAPPING --------------- ]
          if (Category && Category[0] !== '') {
            Category.forEach(async cat => {
              const cat_name = normalizeInput(cat, true);
              const cat_id = idStorage.categories[cat_name];
              try {
                await db.query(`INSERT INTO ing_cat(ing_id, cat_id) VALUES(${_id}, ${cat_id})`);

                log('-----------------------------------------');
                log(
                  chalk.cyan('mapped successfully: '),
                  chalk.green(`${_id}`),
                  chalk.yellow(`${cat_id}`),
                );
              } catch (error) {
                log('----------------------------------------->');
                log(chalk.magenta('issue mapping: '), chalk.yellow(name_cleansed));
                log(error);
              }
            });
          }
        } catch (error) {
          log('----------------------------------------->');
          log(chalk.yellow('issue inserting ingredient: '), chalk.red(name_cleansed));
          log(error);
        }
      })());

    await Promise.all(ing_inserts);
  } catch (error) {
    // log('<----- ERROR with Table Creation ----->'.bold.red);
    // await db.query('ROLLBACK');
  }
})();

// sanitizes inputs + JSON.stringify
function normalizeInput(input, label = false) {
  if (label) {
    return input.toLowerCase().trim();
  }
  if ((input && input[0] === '') || !input) {
    return 'null';
  }
  return JSON.stringify(input);
}
