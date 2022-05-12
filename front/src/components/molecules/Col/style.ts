import styled, { css } from 'styled-components';

export const ColContainer = styled.div<{
  span?: number;
  xs?: number;
  md?: number;
  childBlock?: boolean;
}>`
  display: block;
  position: relative;
  min-height: 1px;
  ${({ span }) =>
    span &&
    css`
      flex: 0 0 ${((100 / 24) * span).toFixed(8)}%;
      max-width: ${((100 / 24) * span).toFixed(8)}%;
    `}
  ${({ xs }) =>
    xs &&
    css`
      flex: 0 0 ${((100 / 24) * xs).toFixed(8)}%;
      max-width: ${((100 / 24) * xs).toFixed(8)}%;
    `}
  ${({ childBlock }) =>
    childBlock &&
    css`
      flex: none;
      width: 100%;
      max-width: 1280px;
    `}
  @media (min-width: 768px) {
    ${({ md }) =>
      md &&
      css`
        flex: 0 0 ${((100 / 24) * md).toFixed(8)}%;
        max-width: ${((100 / 24) * md).toFixed(8)}%;
      `}
  }
`;
