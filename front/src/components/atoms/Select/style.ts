import { SizeType, SizeTypeT } from '@/../@types/utils';
import styled, { css } from 'styled-components';

export const SelectContainer = styled.select<{ selectsize?: SizeTypeT }>`
  position: relative;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  outline: none;
  width: 100%;
  padding: 0 11px;

  ${({ selectsize }) => {
    if (selectsize === SizeType.SMALL) {
      return css`
        height: 24px;
      `;
    }
    if (selectsize === SizeType.LARGE) {
      return css`
        height: 40px;
      `;
    }

    return css`height: 32px;`;
  }}

  &:hover, &:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
`;

export const Options = styled.option`
`;
