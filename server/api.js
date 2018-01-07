const { Router } = require('express');
const {
  queryIngById,
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
} = require('./controller');

const api = new Router();

// api.get('/ingredients', (req, res) => {
//   console.log('inside of GET /ingredients');
// });

api.get('/categories/:id', (req, res) => {
  console.log('inside of GET CATEGORIES');
});

api.get(
  '/details/:id',
  (req, res, next) => {
    const ID = req.params.id;
    if (!ID) {
      return res.status(404).end('invalid id');
    }
    next();
  },
  queryIngById,
);

api.get(
  '/search/?',
  (req, res, next) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
      return res.status(404).end('invalid query');
    }
    next();
  },
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
);

module.exports = api;
