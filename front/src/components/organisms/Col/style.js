import styled, { css } from 'styled-components';

export const ColContainer = styled.div`
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
  ${({ md }) => md && css`
    flex: 0 0 ${((100 / 24) * md).toFixed(8)}%;
    max-width: ${((100 / 24) * md).toFixed(8)}%;
  `}
`;
