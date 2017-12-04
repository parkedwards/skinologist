const db = require('./model');

module.exports = {
  testFunc: (req, res) => db.query('select * from ingredients'),
};
