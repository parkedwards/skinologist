const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const { log } = console;
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use('*', cors()); // enable pre-flight CORS

app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', require('./api'));

app.all('*', (req, res) => res.status(404).end('Page Not Found'));

// check out grider's express setup in Lyrical-GraphQL
app.listen(PORT, () => {
  log(`SKINOLOGY is up and running on port ${PORT}`);
});
