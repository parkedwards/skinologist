const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const { log } = console;
const { NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  require('dotenv').config();
} else {
  require('dotenv').config({ path: path.join(__dirname, '../dev.env') });
}

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use('*', cors()); // enable pre-flight CORS

app.use(express.static(path.join(__dirname, '../build')));
app.use('/api', require('./api'));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../build'));
});

app.all('*', (req, res) => res.status(404).end('Page Not Found'));

// check out grider's express setup in Lyrical-GraphQL
app.listen(PORT, () => {
  log(`SKINOLOGY is up and running on port ${PORT}`);
});
