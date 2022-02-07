import styled, { css } from 'styled-components';

export const ProgressWrap = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  font-size: 14px;
`;

export const ProgressOuter = styled.div`
  width: 100%;
`;

export const ProgressInner = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  vertical-align: middle;
  background-color: #f5f5f5;
  border-radius: 100px;
`;

export const Bar = styled.div<{ percent: number }>`
  position: relative;
  background-image: linear-gradient(to right, rgb(146, 84, 222) 0%, rgb(196, 29, 127) 100%);
  border-radius: 100px;
  transition: all .4s cubic-bezier(.08,.82,.17,1) 0s;
  ${({ percent }) => css`
      width: ${percent}%;
  `}
  height: 8px;
`;

export const ProgressText = styled.span`
  display: inline-block;
  width: 2em;
  margin-left: 8px;
  color: #000000d9;
  font-size: 1em;
  line-height: 1;
  white-space: nowrap;
  text-align: left;
  vertical-align: middle;
  word-break: normal;
`;
