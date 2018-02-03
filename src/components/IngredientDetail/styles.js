import styled from 'styled-components';
import { flex, media } from '../../utils/style-helpers';

export default styled.div`
  ${flex('column', 'center', 'center')};
  font-family: Lato;
  font-weight: normal;

  background-color: #222222;
  height: 100vh;
  color: white;

  ${media.mobile`
    height: 100%;
  `}

  #tile-container {
    ${media.mobile`
      padding: 0 25px;
      width: 100%;
      box-sizing: border-box;
    `}
  }
`;
