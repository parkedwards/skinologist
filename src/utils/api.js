import $ from 'axios';

let BASE_URL;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3000/api';
} else {
  // add production endpoint here
  BASE_URL = '/api';
}

export default {
  queryInput: term => $.get(`${BASE_URL}/search/?term=${term}`),
  fetchDetails: id => $.get(`${BASE_URL}/details/${id}`),
  fetchCategory: id => {},
};
