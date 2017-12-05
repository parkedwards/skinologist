import React, { Component } from 'react';

class ResultList extends Component {
  renderList() {
    const { list } = this.props;
    return list.map(result => (
      <li className="collection-item">{result.title}</li>
    ));
  }

  render() {
    const { list } = this.props;
    if (!list.length) return null;
    return <ul className="collection">{this.renderList()}</ul>;
  }
}

export default ResultList;
