const { Router } = require('express');
const {
  symptomGroupById,
  ingredientDetailById,
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
  checkForParamInRequest,
} = require('./controller');

const api = new Router();

// request ingredients that have category_id 'xx'
api.get('/categories/:id', (req, res) => {
  console.log('inside of GET CATEGORIES');
});

// request ingredients that have symptom_id 'xx'
api.get(
  '/symptoms/:id',
  checkForParamInRequest('params', 'id', 'invalid id'),
  symptomGroupById,
);

// request ingredient detail by ID
api.get(
  '/details/:id',
  checkForParamInRequest('params', 'id', 'invalid id'),
  ingredientDetailById,
);

// keyword search
api.get(
  '/search/?',
  checkForParamInRequest('query', 'term', 'invalid query'),
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
);

module.exports = api;
