import {
  UPDATE_SEARCH_FIELD,
  ACCEPT_SEARCH_RESULTS,
  FETCH_INGREDIENT_DETAIL,
  RECEIVE_INGREDIENT_DETAIL,
  FETCH_SYMPTOM_LIST,
  RECEIVE_SYMPTOM_LIST,
} from './';

export const update_search_field = value => ({
  type: UPDATE_SEARCH_FIELD,
  value,
});

export const search_term = () => async (dispatch, getState, api) => {
  // get field data from state
  const { ui: { search } } = getState();
  try {
    if (search.length > 1) {
      const { data: matches } = await api.queryInput(search);

      // alphabetically sorted
      const sorted = matches.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      if (sorted.length > 0) {
        dispatch({
          type: ACCEPT_SEARCH_RESULTS,
          matches: sorted,
        });
      }
    }
  } catch (error) {
    // something to handle this error
  }
};

export const fetch_details = id => async (dispatch, getState, api) => {
  dispatch({ type: FETCH_INGREDIENT_DETAIL });

  try {
    const { data: { ing_id, ...details } } = await api.fetchDetails(id);

    dispatch({
      type: RECEIVE_INGREDIENT_DETAIL,
      details,
    });
  } catch (err) {
    // {{ TODO: }} redirect to a 404 route here...
    throw Error(err);
  }
};

export const fetch_symptom_list = id => async (dispatch, getState, api) => {
  let response;
  dispatch({ type: FETCH_SYMPTOM_LIST });
  try {
    response = await api.fetchSymptomList(id);
  } catch (err) {
    throw Error(err);
  }

  if (response != null) {
    dispatch({
      type: RECEIVE_SYMPTOM_LIST,
      payload: response.data,
    });
  }
};
