import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './styles';

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
      // if (search.length > 1) return '???';
      return null;
    }

    return <Styles>{this.renderResults()}</Styles>;
  }
}

export default ResultList;