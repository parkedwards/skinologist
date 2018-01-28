import styled from 'styled-components';
import { flex, media } from '../utils/style-helpers';

export default styled.div`
  margin: 25px 0;
  
  ${media.mobile`
    margin: 25px 0;
  `};

  .header-wrap {
    ${flex('row', 'space-between', 'center')};
    margin: 3px 0;
    
    ${media.mobile`
    `};
  }

  .tile-header {
    font-size: 20px;
    font-weight: bold;
    ${media.mobile`
      font-size: 16px;
    `};
  }

  .content-wrap {
    font-size: 17px;
    ${'' /* width: 100%; */}
    box-sizing: border-box;
    padding: 0 7px;
    border: 1px solid white;

    ${media.mobile`
      font-size: 14px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 7px;
      border: 1px solid white;
    `};
  }

  .content-row {
    margin: 12px 0;
    ${media.mobile`
      margin: 12px 0;
    `};
  }

  .tag-pill {
    font-weight: 400;
    border: 2px solid white;
    padding: 5px 15px;
    margin: 7px;
    background: white;
    border-radius: 50px;
    display: inline-flex;
    user-select: none;
    transition: all 400ms ease;
    color: #222222;

    &:hover {
      color: white;
      border: 2px solid white;
      background: none;
    }
  }
`;
