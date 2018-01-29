const { Router } = require('express');
const {
  ingredientDetailById,
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
  checkForParamInRequest,
} = require('./controller');

const api = new Router();

// api.get('/ingredients', (req, res) => {
//   console.log('inside of GET /ingredients');
// });

api.get('/categories/:id', (req, res) => {
  console.log('inside of GET CATEGORIES');
});

api.get(
  '/symptoms/:id',
  (req, res) => {
    console.log('inside of GET SYMPTOMS');
  },
  checkForParamInRequest('params', 'id', 'invalid id'),
);

api.get(
  '/details/:id',
  checkForParamInRequest('params', 'id', 'invalid id'),
  ingredientDetailById,
);

api.get(
  '/search/?',
  checkForParamInRequest('query', 'term', 'invalid query'),
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
);

module.exports = api;
