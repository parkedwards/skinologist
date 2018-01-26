import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { BrowserRouter, Route } from 'react-router-dom';

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/detail/:id" component={IngredientDetail} />
  </div>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
