const { Router } = require('express');
const Sifter = require('sifter');

// placeholder stuff
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

let data;
let sifter;
(async () => {
  const readFile = promisify(fs.readFile);
  data = JSON.parse(await readFile(path.join(__dirname, '../data.json')), 'utf8');
  sifter = new Sifter(data);
})();

const api = new Router();

api.get('/ingredients', (req, res) => {
  console.log('inside of GET /ingredients');
});

api.get('/details/:id', (req, res) => {
  console.log('inside of GET /details/:id');
  // return ingredient-specific details for detail page
});

api.get('/search/?', (req, res, next) => {
  const searchTerm = req.query.term;
  if (!searchTerm) {
    next();
  }

  const { items: scores } = sifter.search(searchTerm, {
    fields: ['Name'],
    sort: [{ field: 'name', direction: 'asc' }],
    limit: 100,
  });

  const results = scores.map(score => data[score.id]);

  return res.status(200).json(results);
});

module.exports = api;
