import styled from 'styled-components';
import { flex, media } from '../utils/style-helpers';

export const Wrapper = styled.div`
  height: 50%;
  width: 100%;
  ${flex('column', 'center', 'center')};
`;

export const MainInput = styled.input`
  outline: none;
  border: none;
  font-size: 50px;
  border-bottom: 3px solid #c4dfd8;
  text-align: center;
`;
