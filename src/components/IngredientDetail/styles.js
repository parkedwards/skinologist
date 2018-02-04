import styled from 'styled-components';
import { flex, media } from '../../utils/style-helpers';

export default styled.div`
  ${flex('column', 'flex-start', 'center')};
  font-family: Lato;
  font-weight: normal;

  background-color: black;
  min-height: 100vh;
  color: white;
  padding: 50px 0;
  box-sizing: border-box;

  ${media.mobile`
    height: 100%;
  `};

  #tile-container {
    ${flex('row', 'center', 'center')};
    max-width: 80%;
    flex-wrap: wrap;

    ${media.mobile`
      padding: 0 25px;
      width: 100%;
    `};
  }
`;
