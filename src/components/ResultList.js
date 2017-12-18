import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultList extends Component {
  renderResults() {
    // {{ TO DO: }}
    // result array will look diff, with ID info etc.
    // make sure to map properly when that is in place
    const { results } = this.props;
    return results.map(result => <li>{result.name}</li>);
  }

  render() {
    const { results, search } = this.props;
    if (!results.length) {
      if (search.length > 1) return '???';
      return null;
    }

    return <ul>{this.renderResults()}</ul>;
  }
}

export default ResultList;

ResultList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired,
  search: PropTypes.string.isRequired,
};
