// maybe some helper functions with commonly outputted CSS selector / values
import { css } from 'styled-components';

export const flex = (direction = 'row', main, secondary) => css`
  display: flex;
  flex-direction: ${direction};
  ${main && `justify-content: ${main};`} ${secondary && `align-items: ${secondary};`};
`;

const sizes = {
  desktop: 992,
  mobile: 650,
};

export const media = Object.keys(sizes).reduce((accum, label) => {
  const emSize = sizes[label] / 16;
  accum[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;

  return accum;
}, {});
