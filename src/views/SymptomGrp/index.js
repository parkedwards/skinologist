import React, { Component } from 'react';

class SymptomGroup extends Component {
  render() {
    return (
      <div>
        Symptom Group page for {this.props.match.params.id}
      </div>
    );
  }
}

export default SymptomGroup;