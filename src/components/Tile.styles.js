import styled, { keyframes } from 'styled-components';
import { flex, media } from '../utils/style-helpers';

export default styled.div`
  ${media.mobile`
    margin: 25px 0;
  `};

  .header-wrap {
    ${media.mobile`
      ${flex('row', 'space-between', 'center')};
      margin: 3px 0;
    `};
  }

  .content-wrap {
    ${media.mobile`
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 5px;
      border: 1px solid white;
    `};
  }

  .content-row {
    ${media.mobile`
      margin: 12px 0;
    `};
  }
`;
