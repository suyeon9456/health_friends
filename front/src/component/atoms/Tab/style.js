import styled, { css } from 'styled-components';

export const TabNav = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  margin-left: 2px;
  border-radius: 2px 2px 0 0;
  padding: 8px 16px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  &:hover {
    & > div {
      color: #40a9ff;
    }
  }

  ${({ value, selectedTabValue }) => value === selectedTabValue && css`
    border-bottom-color: #fff;
    color: #1890ff;
    background: #fff;
    & > div {
      color: #1890ff;
    }
    &:hover {
    & > div {
      color: #1890ff;
    }
  }
  `}
`;

export const TabNavText = styled.div`
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  outline: none;
  transition: all .3s;
`;
