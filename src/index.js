import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './utils/configureStore';

import App from './components/App';
import MainInput from './components/MainInput';
import IngredientDetail from './components/IngredientDetail';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MainInput} />
        <Route path="detail/:id" component={IngredientDetail} />
        {/* other route tags here */}
      </Route>
    </Router>
  </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
