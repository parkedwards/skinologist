import styled from 'styled-components';
import { flex, media } from '../utils/style-helpers';

export default styled.div`
  height: 50%;
  width: 100%;
  ${flex('column', 'center', 'center')};
  position: relative;
`;

export const MainInput = styled.input`
  font-family: Roboto;
  outline: none;
  border: none;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  background-color: transparent;
  color: #606060;
  z-index: 1;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border: 2px solid white;
  border-radius: 50px;
  width: 600px;
  height: 70px;

  transition: all 400ms ease-out;

  color: transparent;
  text-shadow: 0 0 0 white;

  ${media.mobile`
    font-size: 16px;
    padding: 10px;
    width: 300px;
    height: 35px;
    font-weight: normal;
    border: 2px solid white;
    transform: translateY(-80px);
    position: absolute;
    
    ${props =>
    props.isTextPresent &&
      `
      position: absolute;
      transform: translateY(-100px);
    `};
  `};

  &:focus {
    border: 2px solid ${props => props.theme.yellow};
    background: ${props => props.theme.yellow};
    opacity: 0.8;

    ${media.mobile`
      border: 1px solid ${props => props.theme.yellow};;
    `};
  }

  ${props =>
    props.isTextPresent > 0 &&
    ` 
      position: absolute;
      transform: translateY(-350px);
  `};

  ::placeholder {
    color: white !important;
    font-size: 25px;
    font-weight: 300;
    vertical-align: middle !important;
    opacity: 1 !important;

    ${media.mobile`
      font-size: 16px;
    `};
  }
`;
