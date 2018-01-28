import styled from 'styled-components';
import { flex, media } from '../utils/style-helpers';

export default styled.div`
  height: 50%;
  width: 100%;
  ${flex('column', 'center', 'center')};
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
    font-size: 25px;
    padding: 10px;
    width: 300px;
    height: 35px;
    font-weight: 400;
    
    border: 2px solid white;
  `};

  &:focus {
    border: 2px solid #83e0ae;
    background: #83e0ae;
    opacity: 0.7;

    ${media.mobile`
      border: 1px solid #83E0AE;
    `};
  }

  ${props =>
    props.value.length > 0 &&
    `
    position: absolute;
    transform: translateY(-300px);

    ${media.mobile`
      transform: translateY(-50px);
    `}
  `};

  ::placeholder {
    color: white !important;
    font-size: 25px;
    font-weight: bold;
    vertical-align: middle;
    opacity: 1 !important;

    ${media.mobile`
      font-size: 20px;
    `};
  }
`;
