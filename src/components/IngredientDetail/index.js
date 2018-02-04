import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withTheme } from 'styled-components';

import Styles from './styles';
import Tile from './../Tile';
import { fetch_details } from '../../actions/search';
import { sections } from '../../utils/constants';

class IngredientDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
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
    const { match: { params: { id: ing_id } }, onPageLoad, ingredient } = this.props;

    // don't refetch if this is the ingredient in our store already
    if (`${ingredient._id}` !== ing_id) {
      onPageLoad(ing_id);
    }
  };

  renderTiles = () => {
    const { _id, mapped_cats, ...data } = this.props.ingredient;
    return sections.map(o => {
      const props = {
        display: o.display,
        data: data[o.key],
        icon: o.icon,
      };

      return <Tile key={o.key} {...props} />;
    });
  };

  render() {
    const {
      _id,
      name,
      mapped_cats, // create separate categories tile
    } = this.props.ingredient;

    if (!_id) {
      // placholder - create good spinner
      return <span>fetching data...</span>;
    }

    return (
      <Styles>
        <Link to={{ pathname: '/', state: { fromBackBtn: true } }}>Back to Search</Link>
        <h2>{name.toUpperCase()}</h2>
        <div id="tile-container">{this.renderTiles()}</div>
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

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(IngredientDetail));
