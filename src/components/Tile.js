import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './Tile.styles';

class Tile extends Component {
  static propTypes = {
    display: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  // helper
  isMappable = () =>
    typeof this.props.data[0] === 'object' &&
    typeof this.props.data[0]._id !== 'undefined';

  // render content within grid boxes
  renderContent = () => {
    const { data } = this.props;

    // --- if data does not exist ---
    if (!data) return <div className="content-row">None</div>;

    // --- if data is mappable (categories or symptoms) ---
    // --- render pills ---
    if (this.isMappable()) {
      return data.map(d => (
        <div key={d._id} className="tag-pill">
          <Link to={`/symptom/${d._id}`}>{d.name}</Link>
        </div>
      ));
    }

    // --- standard string data ---
    return data.map(d => (
      <div key={d} className="content-row">
        {d}
      </div>
    ));
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
