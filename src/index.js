import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import './index.css'; // <body /> formatting
import registerServiceWorker from './registerServiceWorker';

import configureStore from './utils/configureStore';
import theme from './utils/theme';

import Home from './components/Home';
import IngredientDetail from './components/IngredientDetail';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/detail/:id" component={IngredientDetail} />
      </Router>
    </ThemeProvider>
  </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
