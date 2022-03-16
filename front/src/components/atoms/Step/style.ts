import { Process, ProcessType } from '@/../@types/utils';
import styled, { css } from 'styled-components';

export const StepWrap = styled.div`
  white-space: nowrap;
  position: relative;
  display: inline-block;
  padding-left: 0;
  flex: 1;
  overflow: hidden;
  vertical-align: top;
`;

export const StepIconWrap = styled.div<{ type: ProcessType }>`
  display: inline-block;
  vertical-align: top;
  width: 32px;
  height: 32px;
  margin: 0 8px 0 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
    segoe ui emoji, segoe ui symbol, noto color emoji;
  line-height: 32px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  transition: background-color 0.3s, border-color 0.3s;
  border-color: var(--ant-primary-color);
  margin: 0 auto;
  & > span {
    position: relative;
    top: -1.5px;
    line-height: 1;
  }

  ${({ type }) => {
    if (type === Process.FINISHED) {
      return css`
        background-color: #fff;
        border-color: rgb(146, 84, 222);
        & > span {
          color: rgb(146, 84, 222);
        }
      `;
    }
    if (type === Process.PROCESS) {
      return css`
        background-image: linear-gradient(
          to right,
          rgb(146, 84, 222) 0%,
          rgb(196, 29, 127) 100%
        );
        border-color: rgb(146, 84, 222);
        & > span {
          color: #fff;
        }
      `;
    }
    return css`
      background-color: #fff;
      border-color: #00000040;
      & > span {
        color: #00000040;
      }
    `;
  }}
  @media (max-width: 767px) {
    display: block;
    margin: 0 auto;
  }
`;

export const StepContentWrap = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: left;
  margin-left: 10px;

  @media (max-width: 767px) {
    display: block;
    text-align: center;
    margin: 0 auto;
  }
`;

export const StepTitle = styled.div<{ type: string }>`
  position: relative;
  display: inline-block;
  padding-right: 16px;
  font-size: 16px;
  line-height: 32px;
  color: #000000d9;

  &::after {
    @media (min-width: 768px) {
      position: absolute;
      top: 16px;
      left: 100%;
      display: block;
      width: 9999px;
      height: 1px;
      background: #f0f0f0;
      content: '';

      ${({ type }) =>
        type === 'finished' &&
        css`
          background-image: linear-gradient(
            to right,
            rgb(146, 84, 222) 0%,
            rgb(196, 29, 127) 100%
          );
        `}
    }
  }
  @media (max-width: 767px) {
    padding-right: 0;
    display: none;
  }
`;

export const StepDescription = styled.div`
  display: block;
  color: #00000073;
  max-width: 160px;
  white-space: normal;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: 767px) {
    color: #000000d9;
    font-weight: 600;
  }
`;
