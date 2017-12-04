import React, { Component } from 'react';
import ResultList from './ResultList';

class MainInput extends Component {
  constructor(props) {
    super(props);
    this.state = { entry: '' };
    this.onFieldUpdate = this.onFieldUpdate.bind(this);
  }

  onFieldUpdate(e) {
    e.preventDefault();
    this.setState({
      entry: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="main-input">Enter an ingredient:</label>
          <input
            id="main-input"
            type="text"
            onChange={this.onFieldUpdate}
            value={this.state.entry}
            className="validate"
          />
        </form>
        <ResultList list={[]} />
      </div>
    );
  }
}

export default MainInput;
