import styled, { css } from 'styled-components';

export const MenuList = styled.ul`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  -moz-font-feature-settings: 'tnum', "tnum";
  font-feature-settings: 'tnum', "tnum";
  margin-bottom: 0;
  padding-left: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  text-align: left;
  list-style: none;
  background: #fff;
  outline: none;
  -webkit-box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  -webkit-transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  -moz-transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  line-height: 52px;
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  -webkit-box-shadow: none;
  box-shadow: none;
  display: flex;
  box-shadow: 0 2px 8px #f0f1f2;
  z-index: 10;
  height: 60px;
  &::before {
    display: table;
    content: '';
  }
`;

export const MenuItem = styled.li`
  position: relative;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -moz-transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-top: -1px;
  margin-bottom: 0;
  padding: 0 20px;
  top: 1px;
  display: inline-block;
  transition: border-color 0.3s, background 0.3s;

  &::after {
    position: absolute;
    right: 20px;
    bottom: 0;
    left: 20px;
    border-bottom: 2px solid transparent;
    transition: border-color .3s cubic-bezier(.645,.045,.355,1);
    content: "";
  }

  ${({ align }) => align === 'right' && css`
    opacity: 1;
    order: 2;
    float: right;
    margin-left: auto;
  `}
  @media (min-width: 768px) {
    ${({ type }) => {
    if (type === 'tablet-phone') {
      return css`
        display: none;
      `;
    }

    return css`
      display: inline-block;
    `;
  }}
  }

  @media (max-width: 767px) {
    ${({ type }) => {
    if (type === 'pc') {
      return css`
        display: none;
      `;
    }
    return css`
      display: inline-block;
    `;
  }}
  }

  &:hover {
    & > span > a {
      color: #9254de;
    }
    &::after {
      border-bottom: 2px solid #9254de;
    }
  }
`;

export const MenuTitle = styled.span`
  transition: color 0.3s;
  position: relative;
  display: block;
  margin: 0;
  white-space: nowrap;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -moz-transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export const MenuText = styled.a`
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
  touch-action: manipulation;
  color: rgba(0, 0, 0, 0.85);
  vertical-align: middle;
`;
