const { Router } = require('express');
const ingredientRoutes = require('./services/ingredients/routes');

const api = new Router();

api.get('/ingredients', ingredientRoutes);

module.exports = api;
