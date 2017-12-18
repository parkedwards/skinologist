import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import ResultList from './ResultList';
import { update_search_field, search_term } from '../actions/search';

const MainInput = props => (
  <div className="input-field">
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="main-input">Enter an ingredient:</label>
      <input
        id="main-input"
        type="text"
        onChange={props.onFieldUpdate}
        value={props.search}
        className="validate"
      />
    </form>
    <ResultList results={props.matches} search={props.search} />
  </div>
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
      dispatch(update_search_field(value));
      throttled_search();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainInput);

// type checking:
MainInput.propTypes = {
  search: PropTypes.string.isRequired,
  onFieldUpdate: PropTypes.func.isRequired,
  matches: PropTypes.arrayOf(PropTypes.string).isRequired,
};
