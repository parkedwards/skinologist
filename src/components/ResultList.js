import React, { Component } from 'react';

class ResultList extends Component {
  renderList() {}

  render() {
    const { list } = this.props;
    if (!list.length) return null;
    return <div />;
  }
}

export default ResultList;
