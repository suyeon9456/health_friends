import styled, { css } from 'styled-components';

export const ColContainer = styled.div<{ span?: number, xs?: number, md?: number }>`
  display: block;
  position: relative;
  min-height: 1px;
  ${({ span }) => span && css`
    flex: 0 0 ${((100 / 24) * span).toFixed(8)}%;
    max-width: ${((100 / 24) * span).toFixed(8)}%;
  `}
  ${({ xs }) => xs && css`
    flex: 0 0 ${((100 / 24) * xs).toFixed(8)}%;
    max-width: ${((100 / 24) * xs).toFixed(8)}%;
  `}
  @media (min-width: 768px) {
    ${({ md }) => md && css`
      flex: 0 0 ${((100 / 24) * md).toFixed(8)}%;
      max-width: ${((100 / 24) * md).toFixed(8)}%;
    `}
  }
`;
