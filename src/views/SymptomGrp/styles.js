import styled from 'styled-components';
import { flex, media } from '../../utils/style-helpers';

export default styled.div`
  ${flex('column', 'flex-start', 'center')};
  min-height: 100vh;
  font-family: Lato;
  font-weight: normal;
  padding: 20px 0;

  background-color: #000000;
  color: ${props => props.theme.monsoon};

  ${media.mobile`
    height: 100%;
  `};

  h2 {
    color: white;
  }

  .group-wrap {
  }

  .symptom-member {
    ${flex('column', 'center', 'center')};
    flex: 1 0 auto;
    margin: 5px;
    width: 800px;
    height: 50px;
    border-radius: 50px;
    border: 3px solid ${props => props.theme.bunker};
    background-color: ${props => props.theme.bunker};
    transition: all 300ms ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &:hover {
      border: 3px solid ${props => props.theme.mediumTurqoise};
      background: black;
      color: white;
    }
  }
`;
