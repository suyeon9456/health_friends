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

  .anticon + span {
    margin-left: 8px;
  }

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

${({ type, loading }) => {
    if (type === 'primary') {
      return loading
        ? css`
          color: #fff;
          background: #b37feb;
          border-color: #b37feb;
          pointer-events: none;
          /* &:hover, &:focus {
            color: #fff;
            background: #b37feb;
            border-color: #b37feb;
          } */
        `
        : css`
        color: #fff;
        background: #9254de;
        border-color: #9254de;
        &:hover, &:focus {
          color: #fff;
          background: #b37feb;
          border-color: #b37feb;
        }
      `;
    }
    if (type === 'text') {
      return loading
        ? css`
          background: transparent;
          border-color: transparent;
          box-shadow: none;
          pointer-events: none;
          color: #b37feb;
        `
        : css`
            color: rgba(0, 0, 0, 0.85);
            background: transparent;
            border-color: transparent;
            box-shadow: none;
            &:hover, &:focus {
              color: #b37feb;
            }
          `;
    }
    return loading
      ? css`
        color: #b37feb;
        background: #fff;
        border-color: #b37feb;
        pointer-events: none;
      `
      : css`
        color: rgba(0, 0, 0, 0.85);
        background: #fff;
        border-color: #d9d9d9;
        &:hover, &:focus {
          color: #b37feb;
          background: #fff;
          border-color: #b37feb;
        }
      `;
  }}

  ${({ block }) => block && css`
    width: 100%;
  `}

  ${({ disabled, type }) => {
    if (disabled) {
      if (type === 'text') {
        return css`
          color: #00000040;
          text-shadow: none;
          box-shadow: none;
          pointer-events: none;
        `;
      }
      return css`
        color: #00000040;
        background: #f5f5f5;
        border-color: #d9d9d9;
        text-shadow: none;
        box-shadow: none;
        pointer-events: none;
      `;
    }
  }}

`;