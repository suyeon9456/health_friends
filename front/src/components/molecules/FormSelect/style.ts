import styled, { css } from 'styled-components';
import { SizeType, SizeTypeT } from '@/../@types/utils';

export const FormSelectWrap = styled.div<{ size?: SizeTypeT; }>`
 min-height: 100px;
 margin: 0 auto;
 max-width: 600px;

 ${({ size }) => size === SizeType.SMALL && css`
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
