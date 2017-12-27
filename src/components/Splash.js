import React, { Component } from 'react';
import { Wrapper } from './Splash.styles';

class Splash extends Component {
  static onScrollClick = () => {
    const el = document.getElementById('search-section');
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  render() {
    return (
      <Wrapper>
        <i className="material-icons" id="hamburger-menu">
          menu
        </i>
        <h3 id="header-text">
          <strong>my</strong> skinologist
        </h3>
        <i
          role="button"
          tabIndex={0}
          className="material-icons"
          id="scroll-indicator"
          onClick={Splash.onScrollClick}
          onKeyDown={Splash.onScrollClick} // placeholder
        >
          keyboard_arrow_down
        </i>
      </Wrapper>
    );
  }
}

export default Splash;
