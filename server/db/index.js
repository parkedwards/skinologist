const { Pool } = require('pg');
const config = require('./config');

const { log } = console;

const pool = new Pool(config);

pool.connect(err => {
  if (err) console.error(err);
  else log('Connected to SKINOLOGY-DB!');
});

// refactor to fit query patterns...
// some issues with async / await.  maybe promisify?
// module.exports = {
//   query: async (text, params, callback) => {
//     const start = Date.now();
//     return pool.query(text, params, (err, res) => {
//       const duration = Date.now() - start;
//       // log(chalk.blue('executed query >>'), { text, duration, rows: res.rowCount });
//       if (callback) {
//         callback(err, res);
//       }
//     });
//   },
// };

module.exports = pool;
