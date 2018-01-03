import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetch_details } from '../actions/search';

class IngredientDetail extends Component {
  static propTypes = {
    params: PropTypes.shape({}).isRequired,
    onPageLoad: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { params: { id: ing_id }, onPageLoad } = this.props;
    onPageLoad(ing_id);
  };

  render() {
    const {
      _id,
      name,
      what_is_it,
      key_benefits,
      side_effects,
      how_to_wear,
      who_can_use,
      mapped_cats,
    } = this.props.ingredient;

    if (!_id) {
      // placholder - create good spinner
      return <span>Loading...</span>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h2>{name.toUpperCase()}</h2>
        {mapped_cats && (
          <div>
            <h3>Categories:</h3>
            {mapped_cats.map(cat => <div>{cat.name}</div>)}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ ingredient }) => ({
  ingredient,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(fetch_details(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientDetail);
