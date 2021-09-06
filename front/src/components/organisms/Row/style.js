import styled, { css } from 'styled-components';

export const RowContainer = styled.div`
  row-gap: 0px;
  display: flex;
  flex-flow: row wrap;

  ${({ justify }) => justify && css`
    justify-content: ${justify};
  `}
`;
