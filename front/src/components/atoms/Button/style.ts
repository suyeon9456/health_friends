import styled, { css } from 'styled-components';
import {
  ButtonType,
  ButtonTypeT,
  SizeType,
  SizeTypeT,
} from '@/../@types/utils';

interface Button {
  size: SizeTypeT;
  styleType?: ButtonTypeT;
  buttonLoading: boolean;
  block: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const StyledButton = styled.button<Button>`
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
      case SizeType.SMALL:
        return css`
          height: 24px;
          padding: 0px 7px;
          font-size: 12px;
          border-radius: 2px;
        `;
      case SizeType.LARGE:
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

  ${({ styleType, buttonLoading }) => {
    if (styleType === ButtonType.ERROR) {
      return css`
        color: #fff;
        background: #ff4d4f;
        border-color: #ff4d4f;
        box-shadow: 0 12px 12px -11px #ff4d4f80;
        &:hover,
        &:focus {
          color: #fff;
          background: #ff7779;
          border-color: #ff7779;
        }
      `;
    }
    if (styleType === ButtonType.SUCCESS) {
      return css`
        color: #1890ff;
        background: #fff;
        border-color: #91d5ff;
        &:hover,
        &:focus {
          color: #1890ff;
          background: #e6f7ff;
          border-color: #91d5ff;
        }
      `;
    }
    if (styleType === ButtonType.WARNING) {
      return css`
        color: #fff;
        background: #faad14;
        border-color: #faad14;
        box-shadow: 0 12px 12px -11px #faad1480;
        &:hover,
        &:focus {
          color: #fff;
          background: #ffcb66;
          border-color: #ffcb66;
        }
      `;
    }
    if (styleType === ButtonType.LINEPRIMARY) {
      return buttonLoading
        ? css`
            color: #faad14;
            background: #ff4d4f;
            border-color: #ffe58f;
            pointer-events: none;
          `
        : css`
            color: #9254de;
            background: #fff;
            border-color: #9254de;
            &:hover,
            &:focus {
              /* color: #fff; */
              background: #e9d8fd;
              border-color: #b37feb;
            }
          `;
    }
    if (styleType === ButtonType.PRIMARY) {
      return buttonLoading
        ? css`
            color: #fff;
            background: #b37feb;
            border-color: #b37feb;
            pointer-events: none;
          `
        : css`
            color: #fff;
            background: #9254de;
            border-color: #9254de;
            &:hover,
            &:focus {
              color: #fff;
              background: #b37feb;
              border-color: #b37feb;
            }
          `;
    }
    if (styleType === ButtonType.SIGNATURE) {
      return buttonLoading
        ? css`
            color: #fff;
            background: #b37feb;
            /* border-color: #b37feb; */
            pointer-events: none;
          `
        : css`
            color: #fff;
            background-image: linear-gradient(
              to right,
              rgb(146, 84, 222) 0%,
              rgb(196, 29, 127) 100%
            );
            /* border-color: #9254de; */
            &:hover,
            &:focus {
              color: #fff;
              background-image: linear-gradient(
                to right,
                rgb(146, 84, 222) 0%,
                rgb(196, 29, 127) 100%
              );
              /* background: #b37feb; */
              /* border-color: #b37feb; */
              box-shadow: 0px 8px 10px 2px #e8e9e9;
            }
          `;
    }
    if (styleType === ButtonType.TEXT) {
      return buttonLoading
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
            &:hover,
            &:focus {
              color: #b37feb;
            }
          `;
    }
    return buttonLoading
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
          &:hover,
          &:focus {
            color: #b37feb;
            background: #fff;
            border-color: #b37feb;
          }
        `;
  }}

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}

  ${({ disabled, styleType }) => {
    if (disabled) {
      if (styleType === ButtonType.TEXT) {
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
