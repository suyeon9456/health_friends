import styled, { css } from 'styled-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Size } from '@/../@types/atoms';

export const InputNumberWrap = styled.span<{ size?: Size }>`
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  display: inline-flex;

  &:hover, &:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  &:focus-within {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

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
    return css`
      height: 32px;
    `;
  }}
`;

export const NumberHandlerWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 22px;
  height: 100%;
  background: #fff;
  border-radius: 0 2px 2px 0;
  transition: opacity .24s linear .1s;
`;

export const NumberHandlerUp = styled.span`
  display: block;
  width: 100%;
  height: 50%;
  overflow: hidden;
  color: #00000073;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  border-left: 1px solid #d9d9d9;
  border-top-right-radius: 2px;
  transition: all .1s linear;
  touch-action: manipulation;
  cursor: pointer;
  position: relative;
`;

export const NumberHandlerUpInner = styled(UpOutlined)`
  top: 50%;
  margin-top: -5px;
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  min-width: auto;
  margin-right: 0;
  font-size: 10px;
`;

export const NumberHandlerDown = styled.span`
  display: block;
  width: 100%;
  height: 50%;
  overflow: hidden;
  color: #00000073;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  border-left: 1px solid #d9d9d9;
  border-bottom-right-radius: 2px;
  transition: all .1s linear;
  touch-action: manipulation;
  /* cursor: not-allowed; */
  cursor: pointer;
  position: relative;
`;

export const NumberHandlerDownInner = styled(DownOutlined)`
  top: 50%;
  margin-top: -5px;
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  min-width: auto;
  margin-right: 0;
  font-size: 10px;
`;

export const InputNumberBox = styled.input`
  position: relative;
  display: inline-block;
  list-style: none;
  box-sizing: border-box;
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
  width: 95%;
  min-width: 0;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border-radius: 2px;
  padding: 0;
  border: none;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  -moz-appearance: textfield;
`;
