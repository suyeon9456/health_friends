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

  ${({ enterButton }) => enterButton && css`
  
    float: left;
    width: 100%;
    margin-bottom: 0;
    
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: table-cell;
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
  min-height: 32px;
  line-height: 1.5715;
  vertical-align: bottom;
  transition: all .3s,height 0s;
`;

export const SearchWrapper = styled.span`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  ${({ enterButton }) => enterButton && css`
    float: left;
    width: 100%;
    margin-bottom: 0;
  `}
`;

export const EnterButtonWrapper = styled.span`
  width: 1px;
  white-space: nowrap;
  vertical-align: middle;

  position: relative;
  padding: 0 11px;
  color: #000000d9;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all .3s;

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  left: -1px;
  padding: 0;
  border: 0;

  display: table-cell;
`;

export const EnterButton = styled.button`
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #000000d9;
  background: #fff;
  border-color: #d9d9d9;

  color: #fff;
  background: #9254de;
  border-color: #9254de;
  &:hover, &:focus {
    color: #fff;
    background: #b37feb;
    border-color: #b37feb;
  }
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;

  height: 32px;

  padding-top: 0;
  padding-bottom: 0;
  border-radius: 0 2px 2px 0;

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
