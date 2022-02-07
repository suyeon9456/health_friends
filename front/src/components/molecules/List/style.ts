import styled, { css } from 'styled-components';

export const ListCard = styled.div`
  padding: 10px;
  ${({ style }) => style && css`
    ...style  
  `}
`;
