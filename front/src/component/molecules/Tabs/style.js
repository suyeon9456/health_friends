import styled, { css } from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;

  ${({ block }) => block && css`
    & > button {
      flex-grow: 1
    }
  `}
`;
