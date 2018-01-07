import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './Tile.styles';

class Tile extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  renderContent = () => {
    // what if data is null?
    const { data } = this.props;
    if (!data) return <div>None</div>;

    return data.map(d => <div key={d} className="content-row">{d}</div>);
  };

  render() {
    const { display, icon } = this.props;
    return (
      <Styles>
        <div className="header-wrap">
          <i className="material-icons">{icon}</i>
          <span className="tile-header">{display.toUpperCase()}</span>
        </div>
        <div className="content-wrap">{this.renderContent()}</div>
      </Styles>
    );
  }
}

export default Tile;
