import styled, { css } from 'styled-components';

// export const FormInputWrap = styled.div<{ label?: any }>`
//  min-height: 100px;

//  ${({ label }) => !label && css`
//     min-height: 60px;
//  `}
// `;

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
