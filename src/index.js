import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import SymptomGrp from './views/SymptomGrp';
import CategoryGrp from './views/CategoryGrp';

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

class Routing extends Component {
  componentDidUpdate = () => {
    const { location: { state } } = this.props;
    if (state && state.fromBackBtn) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/detail/:id" component={IngredientDetail} />
        <Route path="/symptom/:id" component={SymptomGrp} />
        <Route path="/category/:id" component={CategoryGrp} />
      </div>
    );
  }
}

const App = withRouter(Routing);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
