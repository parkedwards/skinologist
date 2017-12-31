import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class ResultList extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    search: PropTypes.string.isRequired,
  };

  renderResults = () => {
    // {{ TODO: }}
    // result array will look diff, with ID info etc.
    // make sure to map properly when that is in place
    const { results } = this.props;
    return results.map(result => (
      <li key={result.name}>
        <Link to={`/detail/${result._id}`}>{result.name}</Link>
      </li>
    ));
  };

  render() {
    const { results, search } = this.props;
    if (!results.length) {
      if (search.length > 1) return '???';
      return null;
    }

    return (
      <ul style={{ fontFamily: 'Shadows Into Light Two', fontSize: '20px', textAlign: 'center' }}>
        {this.renderResults()}
      </ul>
    );
  }
}

export default ResultList;
