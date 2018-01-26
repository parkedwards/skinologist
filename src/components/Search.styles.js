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

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border: 3px solid white;
  border-radius: 7px;
  width: 600px;
  height: 70px;

  transition: all 400ms ease-out;

  color: transparent;
  text-shadow: 0 0 0 white;

  &:focus {
    ${'' /* border: 3px solid #83e0ae; */}
    background: #83e0ae;
  }

  ${props =>
    props.value.length > 0 &&
    `
    transform: translateY(-250px);
  `};

  ::placeholder {
    color: white;
    font-size: 25px;
    font-weight: normal;
    line-height: 1.5;
  }

  ${media.mobile`
    font-size: 25px;
    padding: 10px;
    width: 300px;
    height: 35px;
    font-weight: 400;
    
    border: 2px solid white;
    
    &:focus {
      border: 2px solid #83E0AE;
    }

    ::placeholder {
      font-size: 20px;
    }

    ${props =>
    props.value.length > 0 &&
      `
      transform: translateY(-50px);
  `};
  `};
`;
