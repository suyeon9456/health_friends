import styled, { css } from 'styled-components';

export const SearchFriendsWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  max-height: 535px;
  left: 0;
  top: 589px;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #ffffff;
  border-radius: 5px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  z-index: 5;
  transition: all .35s;

  ${({ foldedGym }) => foldedGym && css`
    top: calc(0% + 40px);
  `}
  
  @media (min-width: 768px) {
    width: calc(100% - 40px);
    max-height: none;
    height: 100%;
    left: calc(100% - 1px);
    top: 10px;
    ${({ foldedGym }) => foldedGym && css`
      top: 10px;
      left: calc(0% + 40px);
    `}
  }

  ${({ foldedFriends }) => foldedFriends && css`
    display: none;
  `}
`;

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
  width: 100%;
  color: #000000d9;
  background: #fff;
  overflow-y: auto;

  & > div {
    border-left: none;
    border-right: none;
    border-top: none;
    margin: 10px 0;
    width: 100%;
  }
`;
