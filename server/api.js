const { Router } = require('express');
const Sifter = require('sifter');

const terms = [
  { name: 'Aloe Vera', id: 1 },
  { name: 'Alpha Hydroxy Acids (AHA)', id: 2 },
  { name: 'Alpha Lipoic Acid (ALA)', id: 3 },
  { name: 'Azelaic Acid', id: 4 },
  { name: 'Beta Hydroxy Acid (BHA)', id: 5 },
  { name: 'Biotin (Vitamin B7)', id: 6 },
  { name: 'Evening Primrose Oil', id: 7 },
  { name: 'Vitamin K', id: 8 },
  { name: 'Vitamin E', id: 9 },
  { name: 'Tea Tree Oil', id: 10 },
];

const sifter = new Sifter(terms);

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
    fields: ['name'],
    sort: [{ field: 'name', direction: 'asc' }],
    limit: 100,
  });

  const results = scores.map(score => terms[score.id]);

  return res.status(200).json(results);
});

module.exports = api;
