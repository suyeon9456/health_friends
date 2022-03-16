import styled, { css } from 'styled-components';

export const TextareaWrap = styled.div<{ showCount: boolean }>`
  ${({ showCount }) =>
    showCount &&
    css`
      &::after {
        text-align: left;
        float: right;
        color: rgba(0, 0, 0, 0.45);
        white-space: nowrap;
        content: attr(data-count);
        pointer-events: none;
      }
    `}
`;

export const TextareaBox = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  max-width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 1.5715;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;

  &:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;
