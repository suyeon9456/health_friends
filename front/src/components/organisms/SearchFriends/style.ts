import styled, { css } from 'styled-components';

export const SearchHeader = styled.div`
  position: relative;
  display: table;
  width: 100%;
  padding: 16px 24px;
  color: #000000d9;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;

  & > div {
    display: table-cell;
    width: 90%;
  }
  & > button {
    display: table-cell;
    padding: 0;
    color: #00000073;
    font-size: 20px;
    padding-left: 8px;
    flex-grow: 1;
  }
`;

export const SearchTitle = styled.div`
  margin: 0;
  color: #000000d9;
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  padding-top: 5px;
`;

export const FriendsListWrapper = styled.div`
  position: relative;
  padding: 0 14px;
  width: 100%;
  color: #000000d9;
  background: #fff;
  overflow-y: auto;

  & > div {
    border-left: none;
    border-right: none;
    border-top: none;
    width: 100%;
  }
`;
