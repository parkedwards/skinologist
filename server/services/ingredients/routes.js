const { Router } = require('express');
const { testFunc } = require('./controller');

const ingredientRoutes = new Router();

ingredientRoutes.get('/', testFunc);

module.exports = ingredientRoutes;
