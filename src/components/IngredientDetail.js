import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetch_details } from '../actions/search';

class IngredientDetail extends Component {
  static propTypes = {
    params: PropTypes.shape({}).isRequired,
    onPageLoad: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { params: { id: ing_id } } = this.props;
    this.props.onPageLoad(ing_id);
  };

  render() {
    return (
      <div>
        <h2>HEY!</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(fetch_details(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientDetail);
