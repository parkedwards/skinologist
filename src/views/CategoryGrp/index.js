import React, { Component } from 'react';

class CategoryGroup extends Component {
  render() {
    return (
      <div>
        Category Group page for {this.props.match.params.id}
      </div>
    );
  }
}

export default CategoryGroup;