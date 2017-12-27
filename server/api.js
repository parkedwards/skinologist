const { Router } = require('express');
const Sifter = require('sifter');
const redis = require('redis');

const { REDIS_URL } = process.env;
const redis_client = redis.createClient(REDIS_URL);
// handle redis exceptions
redis_client.on('error', err => {
  console.log(`Error ${err}`);
});

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

api.get(
  '/search/?',
  (req, res, next) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
      return res.status(404).end('Page Not Found');
      // return res.redirect('/404'); // check out express docs for more cannonical error handling
    }
    next();
  },
  fetchItemsFromCache,
  queryDB,
  sendResult,
);

module.exports = api;

function fetchItemsFromCache(req, res, next) {
  // const searchTerm = req.query.term;
  const ingredientsList = 'ingredientsList';
  redis_client.get(ingredientsList, (err, cachedData) => {
    if (err) console.log(err); // it's ok to pass through to query DB if error with redis retrieve
    if (cachedData != null) res.locals.ingredients = cachedData;
    next();
  });
}

function queryDB(req, res, next) {
  if (!res.locals.ingredients) {
    // db query here
    // also cache the return data
    return next();
  }
  // if cached data has already been added to res.locals
  next();
}

function sendResult(req, res, next) {
  const searchTerm = req.query.term;

  const { items: scores } = sifter.search(searchTerm, {
    fields: ['Name'],
    sort: [{ field: 'name', direction: 'asc' }],
    conjunction: 'and',
    limit: 100,
  });

  const results = scores.map(score => data[score.id]);

  return res.status(200).json(results);
}
