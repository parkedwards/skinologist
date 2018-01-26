import React from 'react';
import { withTheme } from 'styled-components';
import { updateBodyClr } from '../utils/constants';
import Styles from './Home.styles';

import Splash from './Splash';
import Search from './Search';

const Home = ({ theme }) => {
  updateBodyClr(theme.mainBg); // updates body color

  return (
    <Styles>
      <Splash />
      <Search />
    </Styles>
  );
};

export default withTheme(Home);
