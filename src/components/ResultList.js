import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ResultList extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    search: PropTypes.string.isRequired,
  };

  renderResults = () => {
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
      <ul
        style={{
          fontFamily: 'Shadows Into Light Two',
          fontSize: '20px',
          textAlign: 'center',
        }}
      >
        {this.renderResults()}
      </ul>
    );
  }
}

export default ResultList;
