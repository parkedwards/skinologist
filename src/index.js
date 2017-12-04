import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import MainInput from './components/MainInput';

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainInput} />
      {/* other route tags here */}
    </Route>
  </Router>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
