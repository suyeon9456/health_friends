import styled, { css } from 'styled-components';

export const TabNav = styled.button<{
  value: string,
  selectedValue: string
}>`
  position: relative;
  display: flex;
  justify-content: center;
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
      color: #9254de;
    }
  }

  ${({ value, selectedValue }) => value === selectedValue && css`
    border-bottom-color: #fff;
    color: #9254de;
    background: #fff;
    & > div {
      color: #9254de;
    }
    &:hover {
    & > div {
      color: #9254de;
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
