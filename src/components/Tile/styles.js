import styled from 'styled-components';
import { flex, media } from '../../utils/style-helpers';

export default styled.div`
  margin: 25px;

  ${media.mobile`
    margin: 25px 0;
    width: 100%;
  `};

  .header-wrap {
    ${flex('row', 'space-between', 'center')};
    margin: 4px 15px;

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
    ${flex('column', 'space-around', 'center')};
    font-size: 17px;
    box-sizing: border-box;
    padding: 0 15px;
    height: 300px;
    width: 500px;

    transition: all 300ms ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border: 3px solid ${props => props.theme.bunker};
    background-color: ${props => props.theme.bunker};
    color: ${props => props.theme.monsoon};

    &:hover {
      border: 3px solid ${props => props.theme.mediumTurqoise};
      background: black;
      color: white;
    }

    ${media.mobile`
      font-size: 14px;
      width: 100%;
      height: 250px;
      box-sizing: border-box;
      padding: 0 7px;
    `};
  }

  .content-row {
    text-align: center;
  }

  .tag-pill {
    font-weight: 400;
    border: 2px solid ${props => props.theme.monsoon};
    color: #222222;
    background: ${props => props.theme.monsoon};
    padding: 5px 15px;
    margin: 7px;
    border-radius: 150px;
    display: inline-flex;
    user-select: none;
    transition: all 400ms ease;

    ${media.mobile`
      color: white;
      border: 2px solid ${props => props.theme.mediumTurqoise};
      background: none;    
    `};

    &:hover {
      color: white;
      border: 2px solid ${props => props.theme.mediumTurqoise};
      background: none;
    }
  }
`;
