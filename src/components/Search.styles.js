import styled from 'styled-components';
import { flex, media } from '../utils/style-helpers';

export default styled.div`
  height: 50%;
  width: 100%;
  ${flex('column', 'center', 'center')};
`;

export const MainInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 3px solid white;
  text-align: left;
  font-size: 25px;
  background-color: transparent;
  color: #606060;
  
  ::placeholder {
    color: #606060;
    font-size: 15px;
  }

  ${media.mobile`
    font-size: 25px;
    width: 80%;
  `};
`;
