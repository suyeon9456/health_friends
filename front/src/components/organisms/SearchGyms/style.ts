import styled, { css } from 'styled-components';

export const SearchWrapper = styled.section`
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
  box-sizing: border-box;
  height: 581px;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

export const GymWrapper = styled.div<{
  foldedGym: boolean;
  foldedFriends: boolean;
}>`
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
  transition: all 0.35s;

  ${({ foldedGym }) =>
    foldedGym &&
    css`
      top: -600px;
    `}

  @media (min-width: 768px) {
    width: calc(100% - 43px);
    max-width: 381px;
    height: 100%;
    border-radius: 0 5px 5px 0;
    ${({ foldedGym }) =>
      foldedGym &&
      css`
        top: 0;
        left: -400px;
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

export const SearchListWrapper = styled.div<{ browserHeight: number }>`
  position: relative;
  width: 100%;
  max-height: 390px;
  padding: 0 24px;
  color: #000000d9;
  background: #fff;
  min-height: 390px;
  @media (min-width: 768px) {
    max-height: none;
    ${({ browserHeight }) =>
      browserHeight &&
      css`
        height: ${browserHeight - 246}px;
      `}
  }
  overflow-y: auto;
`;
