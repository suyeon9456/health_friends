import styled, { css } from 'styled-components';

export const SearchWrapper = styled.section`
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  box-sizing: border-box;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

export const SearchSidebar = styled.div`
  position: relative;
  width: 100%;
  height: 43px;
  padding: 5px 24px;
  background-color: #fff;
  border-radius: 5px;
  border-bottom: 1px solid #f0f0f0;
  z-index: 10;

  & > div {
      height: 100%;
      overflow: hidden;
      & > span {
        margin-top: 4px;
      }
      & > button {
        float: right;
        padding: 0;
        color: #00000073;
        font-size: 16px;
        padding-left: 7px;
        ${({ foldedGym }) => !foldedGym && css`
          color: #b37feb;
        `}
      }
    }
  
  @media (min-width: 768px) {
    border: 0;
    width: 40px;
    height: 100%;
    padding: 16px 0;
    float: left;
    text-align: center;
    border-right: 1px solid #f0f0f0;
    & > div {
      & > span {
        margin: 0;
        margin-bottom: 10px;
      }
  
      & > button {
        width: 100%;
        font-size: 16px;
        padding-left: 7px;
      }
    }
  }
`;

export const FoldButton = styled.div`
  position: absolute;
  width: 20px;
  height: 60px;
  left: 50%;
  top: calc(100% - 20px);
  background-color: #fff;
  border-radius: 0 5px 5px 0;
  border: 1px solid #f0f0f0;
  border-left: none;
  text-align: center;
  box-shadow: 0 2px 8px #e8e9e9;
  cursor: pointer;
  transition: all .35s;
  transform: rotate( 90deg );
  z-index: 100;

  & > span {
    color: #00000073;
    line-height: 56px;
  }
  &:hover {
    & > span {
      color: #b37feb;
    }
  }
  ${({ foldedGym }) => foldedGym && css`
    top: 34px !important;
  `}

  @media (min-width: 768px) {
    width: 20px;
    height: 60px;
    left: 100%;
    top: calc(50% - 50px + 10px);
    transform: none;
    ${({ foldedGym }) => foldedGym && css`
      top: calc(50% - 50px + 10px) !important;
      left: 41px !important;
    `}
  }
`;

export const GymWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  left: 0;
  top: 0;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #ffffff;
  box-sizing: border-box;
  overflow-y: auto;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  z-index: 6;
  transition: all .35s;

  ${({ foldedGym }) => foldedGym && css`
    top: -600px;
  `}
  
  @media (min-width: 768px) {
    width: calc(100% - 40px);
    height: 100%;
    border-radius: 0 5px 5px 0;
    ${({ foldedGym }) => foldedGym && css`
      top: 0; 
      left: -500px;
    `}
  }
`;

export const SearchHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 16px 24px;
  color: #000000d9;
  background: #fff;

  & > span {
    color: #00000073;
  }
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
`;

export const SearchTitle = styled.div`
  margin: 0;
  color: #000000d9;
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  padding-top: 5px;
`;

export const SearchFormWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 16px 24px;
  color: #000000d9;
  background: #fff;
`;

export const SearchListWrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 390px;
  padding: 0 24px;
  color: #000000d9;
  background: #fff;
  min-height: 390px;
  @media (min-width: 768px) {
    max-height: none;
    ${({ browserHeight }) => browserHeight && css`
      height: ${browserHeight - 246}px;
    `}
  }
  overflow-y: auto;
`;
