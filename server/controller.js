const redis = require('redis');
const chalk = require('chalk');
const Sifter = require('sifter');
const db = require('./db');

const { log } = console;

// [ -------- REDIS -------- ]
const { REDIS_URL } = process.env;
const redis_client = redis.createClient(REDIS_URL);

redis_client.on('error', err => {
  log(chalk.red('[ --- REDIS CONNECTION ERROR  --- ]'));
  log(`Error ${err}`);
});

redis_client.on('connect', () => {
  log(chalk.green('[ --- CONNECTED TO REDIS  --- ]'));
});
// [ -------- REDIS -------- ]

async function symptomGroupById(req, res) {
  const ID = req.params.id;
  log(chalk.cyan('[ --- FETCHING Symptom ID: '), chalk.red(ID), chalk.cyan(' --- ]'));

  const { rows } = await db.query(`
    SELECT
      s._id as symptom_id,
      s.name as symptom_name,
      i._id as ingredient_id,
      i.name as ingredient_name
    FROM symptoms s
    JOIN ing_sympt l ON l.sympt_id = s._id
    JOIN ingredients i ON i._id = l.ing_id
    WHERE s._id = ${ID}
    ORDER BY ingredient_name ASC;
  `); // returns array of ingredients, but each has the same symptom id + name

  if (!rows.length) {
    return res.status(404).end('invalid id');
  }

  const { symptom_id, symptom_name } = rows[0];
  const group_members = rows.map(ing => {
    const { ingredient_id, ingredient_name } = ing;
    return { ingredient_id, ingredient_name };
  });

  return res.status(200).json({
    _id: symptom_id,
    name: symptom_name,
    group_members,
  });
}

// {{ TODO: }} loop this fetch through redis caching pattern as well
async function ingredientDetailById(req, res) {
  const ID = req.params.id;
  log(chalk.cyan('[ --- FETCHING Ingredient ID: '), chalk.red(ID), chalk.cyan(' --- ]'));

  const { rows: { 0: results } } = await db.query(`
    SELECT
      _id,
      name,
      what_is_it,
      sm.mapped_symptoms as symptoms,
      key_benefits,
      side_effects,
      how_to_wear,
      who_can_use,
      cm.mapped_cats as categories
    FROM ingredients i
    LEFT JOIN (
        SELECT
          m.ing_id as ing_id,
          array_to_json(array_agg(c)) as mapped_cats
        FROM categories c JOIN ing_cat m ON m.cat_id = c._id
        GROUP BY 1
        ) cm
    ON i._id = cm.ing_id
    LEFT JOIN (
        SELECT
          m.ing_id as ing_id,
          array_to_json(array_agg(s)) as mapped_symptoms
        FROM symptoms s JOIN ing_sympt m ON m.sympt_id = s._id
        GROUP BY 1
        ) sm
    ON i._id = sm.ing_id
    WHERE i._id = ${ID};
  `);

  if (!results) {
    return res.status(404).end('invalid id');
  }
  return res.status(200).json(results);
}

function fetchItemsFromCache(req, res, next) {
  const ingredientsList = 'ingredientsList';

  redis_client.get(ingredientsList, (err, cachedData) => {
    if (err) {
      log(chalk.red('[ --- ERROR fetching from redis  --- ]'));
      log(err); // it's ok to pass through to query DB if error with redis retrieve
    }

    if (cachedData != null) {
      log(chalk.green('[ --- FETCHING ingredients FROM REDIS  --- ]'));
      res.locals.ingredients = cachedData;
    }

    return next();
  });
}

async function queryIngredientsDB(req, res, next) {
  if (!res.locals.ingredients) {
    // query db
    log(chalk.magenta('[ --- QUERYING postgres FOR INGREDIENTS  --- ]'));
    const { rows } = await db.query(`
      SELECT _id, name, mapped_symptoms as symptoms FROM ingredients i
      LEFT JOIN (
        SELECT
          m.ing_id as ing_id,
          array_to_json(array_agg(s.name)) as mapped_symptoms
        FROM symptoms s JOIN ing_sympt m ON m.sympt_id = s._id
        GROUP BY 1
        ) sm
      ON i._id = sm.ing_id;
    `);
    const stringPayload = JSON.stringify(rows);

    // cache results
    log(chalk.blue('[ --- RE-CACHING query results...  --- ]'));
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

  log(chalk.yellow('[ --- Instantiating Sifter  --- ]'));
  // can you move this Sifter instantiation so that you don't have to do it every time?
  const sifter = new Sifter(parsedData);
  const { items: scores } = sifter.search(searchTerm, {
    fields: ['name', 'symptoms'],
    sort: [{ field: 'name', direction: 'asc' }],
    conjunction: 'and',
    limit: 100,
  });

  // sifter scoring give back array indices, so need to map back to original data set
  const results = scores.map(score => parsedData[score.id]);
  return res.status(200).json(results);
}

// configurable middleware
function checkForParamInRequest(location, paramName, error) {
  return (req, res, next) => {
    const param = req[location][paramName];
    if (!param) {
      return res.status(404).end(error);
    }
    next();
  };
}

module.exports = {
  symptomGroupById,
  ingredientDetailById,
  fetchItemsFromCache,
  queryIngredientsDB,
  searchAndSend,
  checkForParamInRequest,
};
