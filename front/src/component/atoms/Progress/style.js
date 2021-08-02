import styled, { css } from 'styled-components';

export const ProgressWrapper = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  font-size: 14px;
`;

export const ProgressOuter = styled.div`
  margin-right: calc(-2em - 8px);
  padding-right: calc(2em + 8px);
  display: inline-block;
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

export const ProgressBar = styled.div`
  position: relative;
  /* background-color: #9254de; */
  /* background-image: linear-gradient(to right, rgb(146, 84, 222) 0%, rgb(16, 142, 233) 100%); */
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
