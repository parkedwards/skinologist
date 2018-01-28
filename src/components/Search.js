import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import Styles, { MainInput } from './Search.styles';

import ResultList from './ResultList';
import { update_search_field, search_term } from '../actions/search';

const Search = props => (
  <Styles id="search-section">
    <MainInput
      id="main-input"
      type="text"
      onChange={props.onFieldUpdate}
      value={props.search}
      matches={props.matches}
      className="validate"
      placeholder="enter a symptom or ingredient!"
    />
    <ResultList results={props.matches} search={props.search} />
  </Styles>
);

const mapStateToProps = state => {
  const { ui } = state;
  return {
    search: ui.search,
    matches: ui.matches,
  };
};

const mapDispatchToProps = dispatch => {
  const throttled_search = debounce(() => {
    dispatch(search_term());
  }, 300);

  return {
    onFieldUpdate(e) {
      const { target: { value } } = e;
      const cleaned = value.toUpperCase();
      dispatch(update_search_field(cleaned));
      throttled_search();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

// type checking:
Search.propTypes = {
  search: PropTypes.string.isRequired,
  onFieldUpdate: PropTypes.func.isRequired,
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
};
