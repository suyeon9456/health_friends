import styled from 'styled-components';

export const StepsWrapper = styled.div`
  box-sizing: border-box;
  margin: 16px 0;
  padding: 0;
  color: #000000d9;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  display: flex;
  width: 100%;
  text-align: initial;
  cursor: pointer;

  & > div:not(:first-child) {
    padding-left: 16px;
  }

  & > div:last-child > div > div {
    &::after {
      display: none;
    }
  }
`;
