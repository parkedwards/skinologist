import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // maybe swap for sagas at some point

import api from './api';

import ui from '../reducers/ui';
import ingredient from '../reducers/ingredient';
import symptom from '../reducers/symptom';

const configureStore = () => {
  const rootReducer = combineReducers({
    ui,
    ingredient,
    symptom,
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(api))),
  );
  return store;
};

export default configureStore;
