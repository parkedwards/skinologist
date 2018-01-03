const redis = require('redis');
const db = require('./db');

const { REDIS_URL } = process.env;
const redis_client = redis.createClient(REDIS_URL);

// handle redis exceptions
redis_client.on('error', err => {
  console.log(`Error ${err}`);
});

const chalk = require('chalk');
const Sifter = require('sifter');

const { log } = console;

async function queryIngById(req, res) {
  const { rows: { 0: data } } = await db.query(`SELECT * FROM ingredients WHERE _id=${req.params.id}`);
  return res.status(200).json(data);
}

function fetchItemsFromCache(req, res, next) {
  const ingredientsList = 'ingredientsList';

  redis_client.get(ingredientsList, (err, cachedData) => {
    if (err) console.log(err); // it's ok to pass through to query DB if error with redis retrieve
    if (cachedData != null) {
      log(chalk.green('[ -------- FETCHING ingredients FROM REDIS  -------- ]'));
      res.locals.ingredients = cachedData;
    }

    return next();
  });
}

async function queryIngredientsDB(req, res, next) {
  if (!res.locals.ingredients) {
    // query db
    log(chalk.magenta('[ -------- QUERYING postgres FOR INGREDIENTS  -------- ]'));
    const { rows } = await db.query('SELECT _id, name FROM ingredients');
    const stringPayload = JSON.stringify(rows);

    // cache results
    log(chalk.blue('[ -------- RE-CACHING query results  -------- ]'));
    redis_client.setex('ingredientsList', 3600, stringPayload);

    // add payload to 'locals' key of response cycle
    res.locals.ingredients = stringPayload;
  }
  // if cached data has already been added to res.locals
  return next();
}

function searchAndSend(req, res) {
  const { ingredients } = res.locals;
  const parsedData = JSON.parse(ingredients);

  const searchTerm = req.query.term;

  log(chalk.yellow('[ -------- Instantiating Sifter  -------- ]'));
  // can you move this Sifter instantiation so that you don't have to do it every time?
  const sifter = new Sifter(parsedData);
  const { items: scores } = sifter.search(searchTerm, {
    fields: ['name'],
    sort: [{ field: 'name', direction: 'asc' }],
    conjunction: 'and',
    limit: 100,
  });

  // sifter scoring give back array indices, so need to map back to original data set
  const results = scores.map(score => parsedData[score.id]);
  return res.status(200).json(results);
}

module.exports = {
  queryIngById,
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
};
