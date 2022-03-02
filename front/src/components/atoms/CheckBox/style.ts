import styled, { css } from 'styled-components';

export const Label = styled.label`
  touch-action: manipulation;

  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-flex;
  align-items: baseline;
  line-height: unset;
  cursor: pointer;

  &::after {
    display: inline-block;
    width: 0;
    overflow: hidden;
    content: "\a0";
  }
`;

export const BasicCheckBoxWrap = styled.span`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  top: 0.2em;
  line-height: 1;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
`;

export const BasicCheckBox = styled.input`
  touch-action: manipulation;
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  box-sizing: border-box;
  padding: 0;
`;

export const BasicCheckBoxInner = styled.span<{ checked: boolean }>`
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 16px;
  height: 16px;
  direction: ltr;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  border-collapse: separate;
  transition: all .3s;

  ${({ checked }) => checked && css`
    background-color: rgb(146,84,222);
    border-color: rgb(146,84,222);
  `}

  &::after {
    position: absolute;
    top: 50%;
    left: 21.5%;
    width: 5.71428571px;
    height: 9.14285714px;
    display: table;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1) translate(-50%,-50%);
    opacity: 1;
    transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
    content: " ";
  }
`;

export const BasicCheckBoxText = styled.span`
  padding-right: 8px;
  padding-left: 8px;
`;
