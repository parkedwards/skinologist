import { combineReducers } from 'redux';
import { UPDATE_SEARCH_FIELD, ACCEPT_SEARCH_RESULTS } from '../actions';

const search = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD:
      return action.value;
    default:
      return state;
  }
};

const matches = (state = [], action) => {
  switch (action.type) {
    case ACCEPT_SEARCH_RESULTS:
      return action.matches;
    case UPDATE_SEARCH_FIELD:
      if (!action.value.length) return [];
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  search,
  matches,
});
