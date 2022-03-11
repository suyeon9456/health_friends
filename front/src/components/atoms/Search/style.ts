import { SizeType, SizeTypeT } from '@/../@types/utils';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

export const SearchWrap = styled.span<{ size?: SizeTypeT }>`
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s;
  display: inline-flex;
  &::before {
    width: 0;
    visibility: hidden;
    content: "\a0";
  }
  &:hover, &:focus {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  &:focus-within {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & > input {
    padding: 0;
    border: none;
    outline: none;
    padding-left: 10px;
    &:focus{
      border: none;
      outline: none;
      box-shadow: none;
    }
  }

  ${({ size }) => {
    if (size === SizeType.SMALL) {
      return css`
        height: 24px;
        & > input {
          height: 21px;
        }
      `;
    }
    if (size === SizeType.LARGE) {
      return css`
        height: 40px;
        & > input {
          height: 24px;
        }
      `;
    }
    return css`
      height: 32px;
      & > input {
        height: 21px;
      }
    `;
  }}
`;

export const EnterIconWrapper = styled.span`
  display: flex;
  flex: none;
  align-items: center;
`;

export const SearchLoadingIcon = styled(LoadingOutlined)`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

export const SearchIcon = styled(SearchOutlined)`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

export const SearchInput = styled.input<{ 
  size: any,
  value: string,
 }>`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  width: 100%;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  transition: all .3s;
  border: 0;
  border-radius: 2px;
  display: inline-flex;

  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 24px;
      `;
    }
    if (size === 'large') {
      return css`
        height: 40px;
      `;
    }
    return css`
      height: 32px;
    `;
  }}
`;
