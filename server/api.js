const { Router } = require('express');

const api = new Router();

api.get('/ingredients', (req, res) => {
  console.log('inside of GET /ingredients');
});

api.get('/search/?', (req, res, next) => {
  if (!req.query.term) {
    next();
  }
});

module.exports = api;
