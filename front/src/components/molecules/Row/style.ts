import styled, { css } from 'styled-components';

export const RowContainer = styled.div<{ justify?: string }>`
  row-gap: 0px;
  display: flex;
  flex-flow: row wrap;
  background: rgb(248, 249, 251);

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}
`;
