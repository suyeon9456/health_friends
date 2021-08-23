import styled, { css } from 'styled-components';

export const MenuList = styled.ul`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  line-height: 1.5715;
  -moz-font-feature-settings: 'tnum', "tnum";
  font-feature-settings: 'tnum', "tnum";
  margin-bottom: 0;
  padding-left: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 0;
  text-align: left;
  list-style: none;
  background: #fff;
  outline: none;
  -webkit-box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  -webkit-transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  -moz-transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  line-height: 46px;
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  -webkit-box-shadow: none;
  box-shadow: none;
  display: flex;
  &::before {
    display: table;
    content: '';
  }
`;

export const MenuItem = styled.li`
  position: relative;
  display: block;
  margin: 0;
  padding: 0 20px;
  white-space: nowrap;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -moz-transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.3s, background 0.3s, padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin-top: -1px;
  margin-bottom: 0;
  padding: 0 20px;
  position: relative;
  top: 1px;
  display: inline-block;
  transition: border-color 0.3s, background 0.3s;

  ${({ type }) => type === 'search' && css`
    opacity: 1;
    order: 2;
    float: right;
    margin-left: auto;
  `}
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
  color: #1890ff;
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
