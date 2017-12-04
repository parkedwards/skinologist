import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {
  const rootReducer = combineReducers({
    state: (state = {}) => state,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default configureStore;
