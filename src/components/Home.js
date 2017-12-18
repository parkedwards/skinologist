import React from 'react';
import { Wrapper } from './Home.styles';

import Splash from './Splash';
import Search from './Search';

const Home = () => (
  <Wrapper>
    <Splash />
    <Search />
  </Wrapper>
);

export default Home;
