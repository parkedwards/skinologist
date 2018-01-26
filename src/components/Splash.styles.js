import styled, { keyframes } from 'styled-components';
import { flex, media } from '../utils/style-helpers';

const fadeInFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default styled.div`
  height: 50%;
  width: 100%;
  ${flex('row', 'center', 'center')};

  #header-text {
    color: white;
    margin: 0;
    font-size: 65px;
    font-weight: lighter;
    animation: 2s ${fadeInFromTop} ease;
    user-select: none;

    ${media.mobile`
      font-size: 45px;
  `};
  }

  #hamburger-menu {
    font-size: 55px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    animation: 1s ${fadeInFromTop} ease;
    color: white;

    ${media.mobile`
      font-size: 45px;
  `};
  }

  #scroll-indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    margin: auto;
    font-size: 55px;
    cursor: pointer;

    &:focus {
      outline: 0;
    }

    ${media.mobile`
      font-size: 45px;
      bottom: 5px;
      outline: none;
  `};
  }
`;
