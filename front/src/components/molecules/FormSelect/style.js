import styled, { css } from 'styled-components';

export const FormSelectWrap = styled.div`
 min-height: 100px;
 margin: 0 auto;
 max-width: 600px;

 ${({ size }) => size === 'small' && css`
    min-height: 60px;
 `}

 & > select {
  margin-top: 10px;
 }
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
`;

export const Essential = styled.span`
  color: #ff4d4f;
  &::before {
    content: ' *';
  }
`;
