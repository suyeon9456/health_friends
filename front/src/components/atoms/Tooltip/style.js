import styled from 'styled-components';

export const StyledTooltipWrap = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: absolute;
  z-index: 1070;
  display: block;
  width: max-content;
  max-width: 250px;
  visibility: visible;
`;

export const StyledTooltipArrowWrap = styled.div`
  left: 50%;
  transform: translateX(-50%);
  bottom: -13px;
  position: absolute;
  display: block;
  width: 13.07106781px;
  height: 13.07106781px;
  overflow: hidden;
  background: 0 0;
  pointer-events: none;
`;

export const StyledTooltipArrow = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 5px;
  height: 5px;
  margin: auto;
  background-color: #000000bf;
  content: "";
  pointer-events: auto;

  box-shadow: 3px 3px 7px #00000012;
  transform: translateY(-6.53553391px) rotate(
  45deg
  );
`;

export const StyledTootip = styled.div`
  min-width: 30px;
  min-height: 32px;
  padding: 6px 8px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  word-wrap: break-word;
  background-color: #000000bf;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
`;
