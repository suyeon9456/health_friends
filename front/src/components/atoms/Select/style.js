import styled, { css } from 'styled-components';

export const SelectContainer = styled.select`
  position: relative;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  outline: none;
  width: 100%;
  padding: 0 11px;

  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 24px;
      `;
    }
    if (size === 'large') {
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

  /* background: #fff <DownOutlined /> no-repeat right .75rem center/8px 10px; */
`;

export const Options = styled.option`
`;
