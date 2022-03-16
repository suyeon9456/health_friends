import styled, { css } from 'styled-components';

export const TabsWrapper = styled.div<{ block: boolean }>`
  display: flex;
  width: 100%;

  ${({ block }) =>
    block &&
    css`
      & > button {
        flex-grow: 1;
      }
    `}
`;
