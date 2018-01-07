import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Styles from './IngredientDetail.styles';
import Tile from './Tile';
import { fetch_details } from '../actions/search';
import { sections } from '../utils/constants';

class IngredientDetail extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    ingredient: PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      what_is_it: PropTypes.array,
      mapped_cats: PropTypes.array,
    }).isRequired,
    onPageLoad: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { params: { id: ing_id }, onPageLoad } = this.props;
    onPageLoad(ing_id);
  };

  renderTiles = () => {
    const { _id, mapped_cats, ...data } = this.props.ingredient;
    return (
      <div id="tile-container">
        {sections.map(o => {
          const props = {
            display: o.display,
            data: data[o.key],
            icon: o.icon,
          };

          return <Tile key={o.key} {...props} />;
        })}
      </div>
    );
  };

  render() {
    const {
      _id,
      name,
      mapped_cats, // create separate categories tile
    } = this.props.ingredient;

    if (!_id) {
      // placholder - create good spinner
      return <span>Loading...</span>;
    }

    return (
      <Styles>
        <Link to="/">Back</Link>
        <h1>{name.toUpperCase()}</h1>
        {this.renderTiles()}
      </Styles>
    );
  }
}

// maybe just use local state
const mapStateToProps = ({ ingredient }) => ({
  ingredient,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(fetch_details(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientDetail);
