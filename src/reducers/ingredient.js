import { RECEIVE_INGREDIENT_DETAIL } from '../actions';

const INITIAL_STATE = {
  _id: null,
  name: null,
  what_is_it: null,
  key_benefits: null,
  side_effects: null,
  how_to_wear: null,
  who_can_use: null,
  mapped_cats: null,
};

const ingredient = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_INGREDIENT_DETAIL:
      return action.details;
    default:
      return state;
  }
};

export default ingredient;
