import { RECEIVE_SYMPTOM_LIST } from '../actions';

const INITIAL_STATE = {
  _id: null,
  name: '',
  group_members: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_SYMPTOM_LIST:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};
