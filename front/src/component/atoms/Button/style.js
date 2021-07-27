import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  touch-action: manipulation;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          height: 24px;
          padding: 0px 7px;
          font-size: 14px;
          border-radius: 2px;
        `;
      case 'large':
        return css`
          height: 40px;
          padding: 6.4px 15px;
          font-size: 16px;
          border-radius: 2px;
        `;
      default:
        return css`
          height: 32px;
          padding: 4px 15px;
          font-size: 14px;
          border-radius: 2px;
        `;
    }
  }}

${({ type }) => {
    switch (type) {
      case 'primary':
        return css`
          color: #fff;
          background: #9254de;
          border-color: #9254de;
        `;
      case 'text':
        return css`
          color: rgba(0, 0, 0, 0.85);
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        `;
      // case 'danger':
      //   return css`
      //     color: #fff;
      //     background: #ff4d4f;
      //     border-color: #ff4d4f;
      //   `;
      default:
        return css`
          color: rgba(0, 0, 0, 0.85);
          background: #fff;
          border-color: #d9d9d9;
        `;
    }
  }}
  span {
    ${({ icon }) => icon && css`
        margin-left: 8px;
      `}
  }

`;
