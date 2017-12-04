const pg = require('pg');
const config = require('./config');

const pool = new pg.Pool(config);

pool.connect(err => {
  if (err) console.error(err);
  else console.log('Connected to SKINOLOGY-DB!');
});

module.exports = pool;
