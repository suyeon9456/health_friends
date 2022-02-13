import styled, { css } from 'styled-components';

export const BoxContent = styled.div`
  width: 100%;
  height: auto;
  border-top: 0;
  padding: 16px;
`;

export const GymListWrap = styled.div`
  width: 100%;
  max-height: 260px;
  overflow-y: auto;
`;

export const ListCard = styled.div`
  padding: 10px;
  ${({ style }) => style && css`
    ...style  
  `}
`;
