import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

export const InputWrapper = styled.span`
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  display: inline-flex;

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
  }
  & > span {
    margin-left: 4px;
    display: flex;
    flex: none;
    align-items: center;
  }

  & > span > .anticon {
    cursor: pointer;
  }
`;

export const InputContainer = styled.input`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
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

  ${({ passwordType }) => passwordType !== 'password' && css`
    &:hover, &:focus {
      border-color: #40a9ff;
      border-right-width: 1px !important;
    }
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  `}

  ${({ type }) => type === 'search' && css`
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    padding: 4px 11px;
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 0;
    border-radius: 2px;
    transition: all .3s;
    display: inline-flex;
  `}

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
  }}
`;

export const TextareaWrapper = styled.div`
  ${({ showCount }) => showCount && css`
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

export const Textarea = styled.textarea`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: inline-block;
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

  max-width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 1.5715;
  vertical-align: bottom;
  transition: all .3s,height 0s;

  &:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const SearchWrapper = styled.span`
  position: relative;
  display: inline-block;
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
`;

export const EnterIconWrapper = styled.span`
  display: flex;
  flex: none;
  align-items: center;
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
