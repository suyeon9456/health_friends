import styled, { css } from 'styled-components';

export const Sidebar = styled.div`
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
