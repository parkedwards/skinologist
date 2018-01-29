import styled from 'styled-components';
import { media } from '../utils/style-helpers';

export default styled.div`
  width: 100vw;
  height: 200vh;
  font-family: Roboto;
  text-align: center;
  background: url('https://s3-us-west-1.amazonaws.com/my-skinologist/contact-lens.png')
    no-repeat center center fixed;
  background-size: contain;
  background-color: white;

  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  ${media.mobile`
    background-size: cover;
  `};

  #img-overlay {
    position: absolute;
    width: 100%;
    height: 200vh;
    background: black;
    opacity: 0.4;
  }
`;
