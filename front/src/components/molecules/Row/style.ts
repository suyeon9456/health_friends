import styled, { css } from 'styled-components';

export const RowContainer = styled.div<{
  justify?: string;
  childBlock?: boolean;
}>`
  row-gap: 0px;
  display: flex;
  flex-flow: row wrap;
  background: rgb(248, 249, 251);

  ${({ childBlock }) =>
    childBlock &&
    css`
      display: block;
      flex-flow: none;
    `}

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}
`;
