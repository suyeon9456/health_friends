import styled, { css } from 'styled-components';

export const FilterWrap = styled.div`

`;

export const FilterSelectorWrap = styled.div`
  width: 120px;
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
  display: inline-block;
  cursor: pointer;
`;

export const FilterSelector = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  padding: 0 11px;
  position: relative;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
`;

export const FilterSelectorText = styled.span`
  right: 25px;
  position: absolute;
  inset: 0 11px;
  line-height: 2;
`;

export const FilterArrrowWrap = styled.span`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 50%;
  right: 11px;
  width: 12px;
  height: 12px;
  margin-top: -6px;
  color: #00000040;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  pointer-events: none;
`;

export const FilterContent = styled.div`
  display: inline-block;
  z-index: 5;
  top: 50px;
  left: 10px;
  position: absolute;
  background-color: #fff;
  padding: 12px;
  color: #000000d9;
  border: 1px solid #f0f0f0;
  width: 300px;
  border-radius: 5px; 

  ${({ show }) => !show && css`
    display: none;
  `}
`;

export const CheckBoxGroup = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-block;
`;
