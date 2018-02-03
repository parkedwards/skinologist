import React from 'react';
import { withTheme } from 'styled-components';
import Styles from './styles';

import Splash from '../Splash';
import Search from '../Search/';

const Home = ({ theme }) => (
  <Styles>
    <div id="img-overlay" />
    <Splash />
    <Search />
  </Styles>
);

export default withTheme(Home);
