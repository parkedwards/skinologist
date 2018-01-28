import {
  UPDATE_SEARCH_FIELD,
  ACCEPT_SEARCH_RESULTS,
  RECEIVE_INGREDIENT_DETAIL,
} from './';

export const update_search_field = value => ({
  type: UPDATE_SEARCH_FIELD,
  value,
});

export const search_term = () => async (dispatch, getState, api) => {
  // get field data from state
  const { ui: { search } } = getState();
  try {
    if (search.length) {
      const { data: matches } = await api.queryInput(search);

      // alphabetically sorted
      const sorted = matches.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      dispatch({
        type: ACCEPT_SEARCH_RESULTS,
        matches: sorted,
      });
    }
  } catch (error) {
    // something to handle this error
  }
};

export const fetch_details = id => async (dispatch, getState, api) => {
  try {
    const { data: { ing_id, ...details } } = await api.fetchDetails(id);

    dispatch({
      type: RECEIVE_INGREDIENT_DETAIL,
      details,
    });
  } catch (error) {
    throw Error(error);
  }
};
