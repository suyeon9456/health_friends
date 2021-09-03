import styled, { css } from 'styled-components';

export const SearchWrapper = styled.section`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-top: 10px;
  overflow-y: auto;
  height: 100%;
  /* max-height: 100vh; */
  overflow: hidden;
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
  padding: 0 24px;
  color: #000000d9;
  background: #fff;
  ${({ browserHeight }) => browserHeight && css`
    height: ${browserHeight - 246}px;
  `}
  overflow-y: auto;
`;
