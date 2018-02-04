import styled from 'styled-components';
import { flex } from '../../utils/style-helpers';

export default styled.div`
  ${flex('column', 'flex-start', 'center')};
  z-index: 1;
  color: white;
  font-size: 23px;
  flex-wrap: wrap;
  flex-flow: column wrap;
  max-height: 500px;
  width: 80%;

  .result-item {
    ${flex('column', 'center', 'center')};
    margin: 5px;
    width: 400px;
    height: 50px;
    border-radius: 50px;
    border: 3px solid transparent;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 300ms ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    &:hover {
      border: 3px solid ${props => props.theme.teal};
      color: ${props => props.theme.teal};
    }
  }
`;
