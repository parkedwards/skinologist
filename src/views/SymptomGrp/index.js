import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Styles from './styles';

import { fetch_symptom_list } from '../../actions/search';

class SymptomGroup extends Component {
  static propTypes = {
    match: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    symptom: PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      group_members: PropTypes.array,
    }).isRequired,
    fetchOnLoad: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    const { match: { params: { id: sympt_id } }, fetchOnLoad, symptom } = this.props;

    if (`${symptom._id}` !== sympt_id) {
      fetchOnLoad(sympt_id);
    }
  };

  renderList = () => {
    const { symptom: { group_members } } = this.props;
    return group_members.map(member => (
      <Link to={`/detail/${member.ingredient_id}`} key={member.ingredient_id}>
        <div className="symptom-member">{member.ingredient_name}</div>
      </Link>
    ));
  };

  render() {
    const { name } = this.props.symptom;
    return (
      <Styles>
        <h2>{name.toUpperCase()}</h2>
        <div className="group-wrap">{this.renderList()}</div>
      </Styles>
    );
  }
}

export default connect(
  state => ({
    symptom: state.symptom,
  }),
  dispatch => ({
    fetchOnLoad: id => dispatch(fetch_symptom_list(id)),
  }),
)(SymptomGroup);
